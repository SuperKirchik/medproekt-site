import express from "express";
import crypto from "node:crypto";
import nodemailer from "nodemailer";

const app = express();
const port = Number(process.env.PORT) || 8080;
const allowedOrigins = (process.env.ALLOWED_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);
const attempts = new Map();
const CONSENT_VERSION = "02.09.2026";
const smtpConfigured = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "MAIL_TO",
].every((name) => process.env[name]);
const mailer = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    })
  : null;

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(express.json({ limit: "20kb" }));
app.use((request, response, next) => {
  const origin = request.get("origin");
  const normalizedOrigin = origin?.replace(/\/$/, "");
  const localOrigin =
    normalizedOrigin &&
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(normalizedOrigin);
  if (
    normalizedOrigin &&
    (allowedOrigins.includes(normalizedOrigin) || localOrigin)
  ) {
    response.set("Access-Control-Allow-Origin", origin);
    response.set("Vary", "Origin");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  }
  if (request.method === "OPTIONS") {
    return normalizedOrigin &&
      (allowedOrigins.includes(normalizedOrigin) || localOrigin)
      ? response.sendStatus(204)
      : response.sendStatus(403);
  }
  next();
});

app.get("/health", (_request, response) => response.json({ ok: true }));

app.post("/api/lead", async (request, response) => {
  const origin = request.get("origin")?.replace(/\/$/, "");
  const isLocal =
    origin && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  if (origin && !allowedOrigins.includes(origin) && !isLocal)
    return response.status(403).json({ error: "Origin is not allowed" });

  const ip = request.ip || "unknown";
  const now = Date.now();
  const previous = attempts.get(ip) || 0;
  if (now - previous < 30_000)
    return response.status(429).json({ error: "Too many requests" });

  const name = String(request.body?.name || "").trim();
  const phone = String(request.body?.phone || "").trim();
  const service = String(request.body?.service || "").trim();
  const consent = request.body?.consent === true;
  const consentVersion = String(request.body?.consentVersion || "").trim();
  const sourcePage = String(request.body?.page || "").trim();
  const formId = String(request.body?.formId || "").trim();
  if (
    !name ||
    !phone ||
    name.length > 120 ||
    phone.length > 40 ||
    service.length > 80 ||
    !sourcePage ||
    sourcePage.length > 500 ||
    !formId ||
    formId.length > 100
  ) {
    return response.status(400).json({ error: "Некорректные данные формы" });
  }
  if (!consent || consentVersion !== CONSENT_VERSION)
    return response.status(400).json({
      error: "Необходимо подтвердить согласие на обработку персональных данных",
    });
  if (!mailer)
    return response
      .status(503)
      .json({ error: "Почтовая отправка не настроена" });
  attempts.set(ip, now);
  const id = crypto.randomUUID();
  const eventId = crypto.randomUUID();
  const createdAt = new Date();
  try {
    const lines = [
      `Заявка №${id}`,
      `Дата и время: ${createdAt.toISOString()}`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Услуга: ${service || "Не выбрана"}`,
      "",
      `Согласие: да`,
      `Версия согласия: ${consentVersion}`,
      `Страница: ${sourcePage}`,
      `Форма: ${formId}`,
      `ID события: ${eventId}`,
    ];
    await mailer.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      subject: `Новая заявка №${id}`,
      text: lines.join("\n"),
    });
    response.json({ ok: true, id });
  } catch (error) {
    const cause =
      error instanceof Error && error.cause instanceof Error
        ? `; cause: ${error.cause.message}`
        : "";
    const detail =
      error instanceof Error
        ? `${error.name}: ${error.message}${cause}`
        : "Unknown error";
    console.error("Email delivery failed:", detail);
    response.status(502).json({ error: "Не удалось отправить заявку" });
  }
});

app.listen(port, "0.0.0.0", () =>
  console.log(`Lead API listening on port ${port}`)
);
