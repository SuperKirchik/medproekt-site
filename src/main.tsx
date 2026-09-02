import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const A = "/assets/";
const CONSENT_VERSION = "02.09.2026";
const COOKIE_STORAGE_KEY = "medproekt-cookie-consent-v2";
document.documentElement.dataset.site = "medproekt";
const services = [
  ["01", "Купирование запоев", "Профессиональная медицинская помощь."],
  ["02", "Лечение алкоголизма", "Индивидуальная программа лечения."],
  ["03", "Врач-нарколог на дом", "Медицинская помощь с выездом."],
  ["04", "Кодировка алкозависимости", "Современные методы кодирования."],
];
const servicePages = [
  {
    slug: "kupirovanie-zapoev",
    title: "Купирование запоев",
    prices: [
      { name: "Стандартная терапия", price: "от 3 500 ₽" },
      { name: "Усиленная терапия", price: "от 3 500 ₽" },
      { name: "Комплексная терапия", price: "от 3 500 ₽" },
      { name: "Терапия при длительном запое", price: "от 3 500 ₽" },
      { name: "Премиальная терапия", price: "от 3 500 ₽" },
    ],
  },
  {
    slug: "lechenie-alkogolizma",
    title: "Лечение алкоголизма",
    prices: [
      { name: "Первичная консультация", price: "от 3 500 ₽" },
      { name: "Амбулаторное лечение", price: "от 3 500 ₽" },
      { name: "Комплексная терапия", price: "от 3 500 ₽" },
      { name: "Стационарное лечение", price: "от 3 500 ₽" },
      { name: "Индивидуальная программа лечения", price: "от 3 500 ₽" },
    ],
  },
  {
    slug: "vrach-narkolog-na-dom",
    title: "Врач-нарколог на дом",
    prices: [
      { name: "Стандартный выезд врача", price: "от 3 500 ₽" },
      { name: "Срочный выезд врача", price: "от 3 500 ₽" },
      { name: "Выезд + консультация", price: "от 3 500 ₽" },
      { name: "Выезд + терапия", price: "от 3 500 ₽" },
      { name: "Расширенная помощь на дому", price: "от 3 500 ₽" },
    ],
  },
  {
    slug: "kodirovka-alkozavisimosti",
    title: "Кодировка алкозависимости",
    prices: [
      { name: "Медикаментозное кодирование", price: "от 3 500 ₽" },
      { name: "Кодирование на 6 месяцев", price: "от 3 500 ₽" },
      { name: "Кодирование на 1 год", price: "от 3 500 ₽" },
      { name: "Кодирование на 3 года", price: "от 3 500 ₽" },
      { name: "Комбинированное кодирование", price: "от 3 500 ₽" },
    ],
  },
];
const faq = [
  [
    "Как я могу оплатить услуги?",
    "Вы можете оплатить услуги клиники любым удобным для вас способом:\n\n• мы принимаем банковские карты любой платежной системы;\n• в кассе оплата осуществляется наличными согласно полученной от администратора квитанции;\n• внести денежные средства можно круглосуточно благодаря сервису «Сбербанк Онлайн».\n\nПолучить подробную информацию о способах оплаты можно у менеджеров. Рассчитываться за услуги за себя и своих близких в нашей клинике просто и удобно!",
  ],
  [
    "У вас есть лицензии/сертификаты?",
    "Наша частная клиника имеет необходимые лицензии и сертификаты. Это официально зарегистрированное медицинское учреждение, которое оказывает наркологическую помощь в России. Каждая услуга, предоставляемая пациентам, зарегистрирована в соответствующей лицензии. У сотрудников центра есть сертификаты о регулярном повышении квалификации. Выданные нам документы размещены на сайте клиники. Проверка лицензии осуществляется на сайте Росздравнадзора. Введите ее номер в поисковую строку, и вам в течение нескольких минут будет предоставлена нужная информация.",
  ],
  [
    "Можно ли заранее определить результат лечения?",
    "Результат лечения зависит от состояния человека, его мотивации, соблюдения рекомендаций и других индивидуальных факторов. После консультации и диагностики специалист предложит подходящий план помощи и объяснит ожидаемые этапы лечения.",
  ],
  [
    "Я не хочу распространять свои персональные данные, могу получить услуги анонимно?",
    "В предусмотренных законом случаях обращение возможно без раскрытия лишних сведений. Клиника ограничивает доступ к информации и соблюдает требования о врачебной тайне и защите персональных данных. Условия конкретной услуги можно уточнить у специалиста.",
  ],
  [
    "Я могу самостоятельно решить проблему?",
    "Самостоятельные попытки могут сопровождаться срывами и рисками для здоровья. Специалист оценит состояние, обсудит мотивацию и предложит возможные варианты медицинской и психологической помощи. Решение о лечении принимается индивидуально после консультации.",
  ],
  [
    "Мне поможет одна консультация?",
    "На первой консультации врач уточняет обстоятельства обращения, изучает доступную медицинскую информацию и при необходимости рекомендует обследование. Затем специалист объясняет возможные варианты помощи и условия их проведения. Результат зависит от индивидуальных факторов и дальнейшего соблюдения рекомендаций.",
  ],
];
const advantages = [
  [
    "Полная анонимность",
    "Не передаём сведения третьим лицам и бережно относимся к вашей ситуации.",
  ],
  [
    "Помощь круглосуточно",
    "Принимаем обращения 24/7 и готовы быстро подсказать, что делать прямо сейчас.",
  ],
  [
    "Персональный план",
    "Подбираем лечение с учётом состояния, истории и потребностей человека.",
  ],
  [
    "Врачи рядом",
    "Состояние пациента контролирует опытная медицинская команда.",
  ],
];
const treatmentSteps = [
  [
    "01",
    "Консультация",
    "Обсуждаем ситуацию, отвечаем на вопросы и определяем необходимую помощь.",
    "timeline-consultation.svg",
  ],
  [
    "02",
    "Диагностика",
    "Оцениваем состояние пациента и выявляем медицинские риски.",
    "timeline-diagnostic.png",
  ],
  [
    "03",
    "План лечения",
    "Составляем персональную программу лечения и восстановления.",
    "timeline-plan.png",
  ],
  [
    "04",
    "Сопровождение",
    "Контролируем состояние и остаёмся рядом на каждом этапе.",
    "timeline-support.png",
  ],
];
function Button({
  children,
  outline = false,
}: {
  children: React.ReactNode;
  outline?: boolean;
}) {
  return (
    <button className={outline ? "btn outline" : "btn"}>{children}</button>
  );
}
function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);
  return (
    <header className="nav">
      <a className="header-logo" href="/" aria-label="На главную">
        <img src={A + "logo.png"} />
      </a>
      <div className="header-contact">
        <a className="header-phone" href="tel:88006000895">
          <i className="phone-icon" aria-hidden="true" />
          <span>8 800 600-08-95</span>
        </a>
        <address>
          <i className="location-icon" aria-hidden="true" />
          <span>
            <strong>г. Екатеринбург,</strong> ул. Первомайская, д. 77, оф. 69
          </span>
        </address>
      </div>
      <button
        className={`menu-toggle${menuOpen ? " is-open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={menuOpen ? "is-open" : ""}>
        <a href="/contacts">Контакты</a>
        <div
          className={`services-dropdown${servicesOpen ? " is-open" : ""}`}
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <button
            type="button"
            onClick={() => setServicesOpen((value) => !value)}
            aria-expanded={servicesOpen}
          >
            Услуги
          </button>
          <div>
            {servicePages.map((service) => (
              <a
                key={service.slug}
                href={`/services/${service.slug}`}
                onClick={() => {
                  setServicesOpen(false);
                  setMenuOpen(false);
                }}
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>
        <div
          className={`services-dropdown about-dropdown${
            aboutOpen ? " is-open" : ""
          }`}
          onMouseEnter={() => setAboutOpen(true)}
          onMouseLeave={() => setAboutOpen(false)}
        >
          <button
            type="button"
            onClick={() => setAboutOpen((value) => !value)}
            aria-expanded={aboutOpen}
          >
            О нас
          </button>
          <div>
            <a
              href="/licenses"
              onClick={() => {
                setAboutOpen(false);
                setMenuOpen(false);
              }}
            >
              Лицензии
            </a>
            <a
              href="/contacts"
              onClick={() => {
                setAboutOpen(false);
                setMenuOpen(false);
              }}
            >
              Расположение
            </a>
          </div>
        </div>
        <a
          className="btn call-btn"
          href="tel:88006000895"
          onClick={() => setMenuOpen(false)}
        >
          Вызвать врача
        </a>
      </nav>
    </header>
  );
}
function SiteFooter() {
  return (
    <footer>
      <img src={A + "logo.png"} />
      <nav className="footer-main-links">
        <a href="/#services">Услуги</a>
        <a href="/#services">Цены</a>
        <a href="/#treatment">Методы лечения</a>
        <a href="/contacts">О центре</a>
        <a href="/contacts">Контакты</a>
      </nav>
      <div className="footer-legal-links">
        <a href="/privacy">Политика обработки персональных данных</a>
        <a href="/consent">Согласие на обработку персональных данных</a>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new Event("medproekt:cookie-settings"))
          }
        >
          Настройки cookie
        </button>
      </div>
      <hr />
      <div>© 2026 МедПроект. Все права защищены.</div>
      <div id="licenses" className="legal-details">
        <strong>Общество с ограниченной ответственностью «Медпроект»</strong>
        <br />
        Юридический адрес: 620049, г. Екатеринбург, ул. Первомайская, д. 77, оф.
        69
        <br />
        ИНН 6670531826
        <br />
        ОГРН 1256600045118
        <br />
        Телефон: 8 800 600-08-95
        <br />
        Регистрационный номер лицензии: Л041-01021-66/05268235
      </div>
    </footer>
  );
}
function ServicePage({ service }: { service: (typeof servicePages)[number] }) {
  return (
    <>
      <SiteHeader />
      <section className="service-page light">
        <div className="service-page-inner">
          <h1>{service.title}</h1>
          <div
            className="price-table"
            role="table"
            aria-label={`Цены: ${service.title}`}
          >
            <div className="price-row price-head" role="row">
              <span role="columnheader">Наименование</span>
              <span role="columnheader">Цена</span>
            </div>
            {service.prices.map((item) => (
              <div className="price-row" role="row" key={item.name}>
                <span role="cell">{item.name}</span>
                <strong role="cell">{item.price}</strong>
              </div>
            ))}
          </div>
          <a className="btn service-call-btn" href="tel:88006000895">
            Позвонить нам
          </a>
          <MedicalDisclaimer />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
function LicensesPage() {
  return (
    <>
      <SiteHeader />
      <section className="licenses-page light">
        <div className="licenses-inner">
          <div className="licenses-heading">
            <span>Документы клиники</span>
            <h1>Лицензии</h1>
          </div>
          <div className="license-images">
            <img
              src="/license-page-1.png"
              alt="Лицензия ООО Медпроект, страница 1"
            />
            <img
              src="/license-page-2.png"
              alt="Лицензия ООО Медпроект, страница 2"
            />
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
function MedicalDisclaimer() {
  return (
    <p className="medical-disclaimer">
      Имеются противопоказания. Необходима консультация специалиста.
    </p>
  );
}
const policySections = [
  [
    "1. Общие положения",
    [
      "1.1. Настоящая Политика определяет порядок и условия обработки персональных данных посетителей сайта https://24medproekt.ru/ (далее - Сайт) Обществом с ограниченной ответственностью «Медпроект» (далее - Оператор).",
      "1.2. Сведения об Операторе: ООО «Медпроект», ИНН 6670531826, ОГРН 1256600045118, адрес: 620049, г. Екатеринбург, ул. Первомайская, д. 77, оф. 69, телефон: 8 800 600-08-95.",
      "1.3. Политика разработана в соответствии с Конституцией Российской Федерации, Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и иными применимыми нормативными актами Российской Федерации.",
      "1.4. Политика действует в отношении данных, получаемых через формы обратной связи, при телефонных обращениях, а также при использовании файлов cookie и систем веб-аналитики.",
      "1.5. Оператор не осуществляет рекламные рассылки и рекламные звонки на основании согласия, даваемого через формы Сайта. Для такой рекламы потребуется отдельное предварительное согласие.",
    ],
  ],
  [
    "2. Категории субъектов и данных",
    [
      "2.1. Субъекты персональных данных - посетители Сайта и лица, направляющие обращения или заказывающие обратный звонок.",
      "2.2. Через формы и технические средства Сайта могут обрабатываться: имя; номер телефона; выбранная услуга; дата и время отправки заявки; факт установки флажка согласия, версия согласия, дата и время; адрес страницы, идентификатор формы и события; IP-адрес, cookie, браузер, ОС, устройство и действия на Сайте.",
      "2.3. Оператор не ставит целью обработку специальных категорий данных, включая сведения о здоровье, диагнозах и лечении, или биометрических данных. Форма Сайта не предназначена для передачи таких сведений.",
    ],
  ],
  [
    "3. Цели, основания и сроки",
    [
      "Ответ на заявку, обратный звонок: имя, телефон, выбранная услуга и сведения о заявке. Основание - согласие и действия по запросу субъекта. До достижения цели, затем в течение срока, установленного Оператором и применимым законодательством.",
      "Работа и безопасность Сайта: IP, технические журналы и параметры. Основание - законный интерес в обеспечении безопасности. В необходимый срок, как правило не более 12 месяцев.",
      "Веб-аналитика: cookie, IP, устройство, браузер, страницы, действия, источник. Основание - согласие через cookie-баннер. До отзыва либо в пределах срока cookie и настроек сервиса.",
    ],
  ],
  [
    "4. Действия с данными",
    [
      "4.1. Оператор может осуществлять сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу (предоставление, доступ) привлекаемым лицам, блокирование, удаление и уничтожение данных автоматизированным и неавтоматизированным способом.",
      "4.2. Оператор не распространяет данные и не размещает их в открытом доступе без отдельного законного основания.",
    ],
  ],
  [
    "5. Лица, участвующие в обработке",
    [
      "АО «ТаймВэб» (ИНН 7810353960) - размещение Сайта и серверной инфраструктуры; оператор корпоративной электронной почты - доставка и хранение заявок после его согласования Оператором; ООО «Яндекс» - Яндекс.Метрика после согласия на аналитические cookie; работники и подрядчики Оператора с необходимым доступом и обязанностями по конфиденциальности.",
    ],
  ],
  [
    "6. Передача заявок по электронной почте",
    [
      "6.1. Заявка обрабатывается сервером Сайта и направляется в защищённый корпоративный почтовый ящик Оператора. В письмо включаются данные заявки и сведения, подтверждающие согласие.",
      "6.2. Оператор должен использовать сервер и почтовую инфраструктуру, обеспечивающие выполнение применимых требований о локализации персональных данных на территории Российской Федерации.",
      "6.3. Доступ к почтовому ящику предоставляется только уполномоченным лицам. Оператор устанавливает сроки хранения и удаления писем с заявками.",
    ],
  ],
  [
    "7. Cookies и аналитика",
    [
      "7.1. Строго необходимые cookie используются для работы и безопасности. Яндекс.Метрика загружается только после выбора пользователя в cookie-баннере.",
      "7.2. Пользователь может принять или отклонить необязательные cookie и затем изменить выбор. Отклонение не ограничивает доступ к основному содержанию.",
    ],
  ],
  [
    "8. Права пользователя и отзыв",
    [
      "8.1. Пользователь вправе получать сведения об обработке, требовать уточнения, блокирования или удаления данных, возражать против обработки в предусмотренных законом случаях и отзывать согласие.",
      "8.2. Обращение можно направить почтой по адресу Оператора либо позвонить по номеру 8 800 600-08-95 для получения инструкции. В обращении указываются ФИО, контакт для ответа, суть требования и сведения, позволяющие определить соответствующую заявку. Оператор вправе запросить разумное подтверждение личности.",
    ],
  ],
  [
    "9. Безопасность и изменения Политики",
    [
      "9.1. Оператор принимает необходимые правовые, организационные и технические меры защиты от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, предоставления, распространения и иных неправомерных действий.",
      "9.2. После достижения цели или отзыва согласия данные удаляются или уничтожаются в предусмотренные законом сроки, если отсутствует другое законное основание обработки.",
      "9.3. Актуальная редакция Политики постоянно доступна на Сайте. Новая редакция применяется с момента публикации, если в ней не указано иное.",
    ],
  ],
];
const consentParagraphs = [
  "Устанавливая флажок рядом с текстом «Я даю согласие на обработку персональных данных» и нажимая кнопку отправки формы, я свободно, своей волей и в своём интересе даю ООО «Медпроект», ИНН 6670531826, ОГРН 1256600045118, адрес: 620049, г. Екатеринбург, ул. Первомайская, д. 77, оф. 69, телефон: 8 800 600-08-95, согласие на следующих условиях.",
  "1. Персональные данные: имя, номер телефона, выбранная услуга, дата и время заявки, адрес страницы, идентификатор формы и события, а также сведения, подтверждающие предоставление согласия.",
  "2. Цели: принятие и обработка обращения; связь со мной по заявке; предоставление запрошенной информации; организация обратного звонка; подтверждение факта обращения и защита прав и законных интересов сторон.",
  "3. Действия: сбор, запись, систематизация, накопление, хранение, уточнение, извлечение, использование, предоставление доступа привлекаемым лицам, блокирование, удаление и уничтожение автоматизированным и неавтоматизированным способом.",
  "4. Для указанных целей Оператор вправе поручить обработку АО «ТаймВэб» в части размещения сайта и инфраструктуры, а также согласованному оператору корпоративной электронной почты в части доставки и хранения заявок. Эти лица обязаны обеспечивать конфиденциальность и безопасность данных.",
  "5. Настоящее согласие не является согласием на рекламные рассылки или рекламные звонки и не разрешает распространение моих данных в открытом доступе.",
  "6. Форма Сайта не предназначена для передачи сведений о здоровье, диагнозах, лечении, интимной жизни и иных специальных категорий данных. Настоящее согласие не предназначено для обработки таких сведений.",
  "7. Согласие действует до достижения целей либо до отзыва, если отсутствует иное законное основание. Отзыв можно направить почтой по адресу Оператора. По телефону 8 800 600-08-95 можно получить инструкцию по подаче заявления.",
  "8. Отзыв не влияет на законность обработки до его получения. Оператор вправе продолжить обработку при наличии предусмотренных законом оснований.",
  "9. До предоставления согласия я ознакомился(лась) с Политикой в отношении обработки персональных данных ООО «Медпроект», размещённой на Сайте.",
];
function LegalPage({ kind }: { kind: "privacy" | "consent" }) {
  const privacy = kind === "privacy";
  return (
    <>
      <SiteHeader />
      <article className="legal-page light">
        <h1>
          {privacy
            ? "Политика в отношении обработки персональных данных"
            : "Согласие на обработку персональных данных"}
        </h1>
        <p className="legal-lead">для сайта https://24medproekt.ru/</p>
        {privacy
          ? policySections.map(([title, paragraphs]) => (
              <section key={title as string}>
                <h2>{title}</h2>
                {(paragraphs as string[]).map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </section>
            ))
          : consentParagraphs.map((text) => <p key={text}>{text}</p>)}
        <p>
          <strong>Дата редакции: 02.09.2026.</strong>
        </p>
      </article>
      <SiteFooter />
    </>
  );
}
function CookieBanner() {
  const [visible, setVisible] = useState(
    () => !localStorage.getItem(COOKIE_STORAGE_KEY)
  );
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const loadMetrika = () => {
    if (document.querySelector('script[data-metrika="112181042"]')) return;
    const script = document.createElement("script");
    script.async = true;
    script.dataset.metrika = "112181042";
    script.src = "https://mc.yandex.ru/metrika/tag.js?id=112181042";
    script.onload = () => {
      const w = window as Window & { ym?: (...args: unknown[]) => void };
      w.ym?.(112181042, "init", {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: "dataLayer",
        referrer: document.referrer,
        url: location.href,
        accurateTrackBounce: true,
        trackLinks: true,
      });
    };
    const w = window as Window & { ym?: (...args: unknown[]) => void };
    w.ym =
      w.ym ||
      function (...args: unknown[]) {
        ((w.ym as unknown as { a?: unknown[] }).a =
          (w.ym as unknown as { a?: unknown[] }).a || []).push(args);
      };
    document.head.appendChild(script);
  };
  const save = (allowAnalytics: boolean) => {
    localStorage.setItem(
      COOKIE_STORAGE_KEY,
      JSON.stringify({
        necessary: true,
        analytics: allowAnalytics,
        updatedAt: new Date().toISOString(),
      })
    );
    setAnalytics(allowAnalytics);
    setVisible(false);
    setSettings(false);
    if (allowAnalytics) loadMetrika();
  };
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (stored) {
      try {
        const value = JSON.parse(stored);
        setAnalytics(Boolean(value.analytics));
        if (value.analytics) loadMetrika();
      } catch {
        localStorage.removeItem(COOKIE_STORAGE_KEY);
        setVisible(true);
      }
    }
    const reopen = () => {
      setSettings(true);
      setVisible(true);
    };
    window.addEventListener("medproekt:cookie-settings", reopen);
    return () =>
      window.removeEventListener("medproekt:cookie-settings", reopen);
  }, []);
  if (!visible) return null;
  return (
    <aside
      className="cookie-banner"
      role="dialog"
      aria-label="Согласие на использование cookies"
    >
      <div>
        <p>
          Мы используем необходимые cookie для работы сайта. С вашего согласия
          мы также используем Яндекс.Метрику для аналитики посещений и
          источников обращений. Подробнее - в{" "}
          <a href="/privacy">Политике обработки персональных данных</a>.
        </p>
        {settings && (
          <label className="cookie-option">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
            />
            <span>Аналитические cookie (Яндекс.Метрика)</span>
          </label>
        )}
      </div>
      <div className="cookie-actions">
        <button className="btn" type="button" onClick={() => save(true)}>
          Принять
        </button>
        <button
          className="btn outline"
          type="button"
          onClick={() => save(false)}
        >
          Отклонить необязательные
        </button>
        {settings ? (
          <button
            className="btn outline"
            type="button"
            onClick={() => save(analytics)}
          >
            Сохранить настройки
          </button>
        ) : (
          <button
            className="btn outline"
            type="button"
            onClick={() => setSettings(true)}
          >
            Настроить
          </button>
        )}
      </div>
    </aside>
  );
}
function ApplicationForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    if (data.get("consent") !== "yes") {
      setStatus("error");
      setMessage(
        "Для отправки заявки необходимо дать согласие на обработку персональных данных."
      );
      return;
    }
    const apiUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
    setStatus("sending");
    setMessage("");
    try {
      if (!apiUrl) throw new Error("API URL is not configured");
      const response = await fetch(`${apiUrl}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          phone: String(data.get("phone") || ""),
          service: String(data.get("service") || ""),
          consent: true,
          consentVersion: CONSENT_VERSION,
          page: window.location.pathname || "/",
          formId: "main-application",
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
      setMessage("Заявка отправлена. Мы скоро свяжемся с вами.");
    } catch {
      setStatus("error");
      setMessage(
        "Не удалось отправить заявку. Позвоните нам по номеру 8 800 600-08-95."
      );
    }
  };
  return (
    <section id="application-form" className="light form">
      <h2>Оставьте заявку</h2>
      <p>Мы перезвоним в течение часа. Или позвоните сами.</p>
      <form onSubmit={submit}>
        <label>
          Имя, название компании
          <input name="name" autoComplete="name" maxLength={120} required />
        </label>
        <label>
          Телефон
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
            required
          />
        </label>
        <label>
          Интересующая услуга
          <select name="service" defaultValue="">
            <option value="">Выберите услугу (необязательно)</option>
            {servicePages.map((service) => (
              <option value={service.slug} key={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <label className="consent-checkbox" htmlFor="application-consent">
          <input
            id="application-consent"
            name="consent"
            type="checkbox"
            value="yes"
          />
          <span>
            Я даю{" "}
            <a href="/consent" target="_blank">
              согласие на обработку персональных данных
            </a>{" "}
            и подтверждаю, что ознакомился(лась) с{" "}
            <a href="/privacy" target="_blank">
              Политикой в отношении обработки персональных данных
            </a>
            .
          </span>
        </label>
        <label className="form-honeypot" aria-hidden="true">
          Сайт
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Отправляется…" : "Отправить"}
        </button>
        {message && (
          <p className={`form-status ${status}`} role="status">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
function App() {
  const [open, setOpen] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);
  useEffect(() => {
    const node = servicesRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleAnchor = (event: MouseEvent) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      const anchor = origin.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      event.preventDefault();
      setMenuOpen(false);
      const top =
        window.scrollY +
        target.getBoundingClientRect().top -
        (window.innerWidth <= 767 ? 76 : 0);
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", handleAnchor);
    return () => document.removeEventListener("click", handleAnchor);
  }, []);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mobile = window.innerWidth <= 767;
        const scale = mobile ? 1 : Math.min(window.innerWidth / 2560, 1);
        document.documentElement.style.setProperty(
          "--app-scale",
          String(scale)
        );
        viewport.style.height = mobile
          ? "auto"
          : `${canvas.scrollHeight * scale}px`;
      });
    };
    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(canvas);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);
  const cleanPath = window.location.pathname.replace(/\/+$/, "");
  if (cleanPath === "/privacy" || cleanPath === "/consent")
    return (
      <div ref={viewportRef} className="scale-viewport">
        <main ref={canvasRef} className="app-scale legal-route">
          <LegalPage kind={cleanPath === "/privacy" ? "privacy" : "consent"} />
        </main>
      </div>
    );
  if (cleanPath === "/licenses")
    return (
      <div ref={viewportRef} className="scale-viewport">
        <main ref={canvasRef} className="app-scale licenses-route">
          <LicensesPage />
        </main>
      </div>
    );
  const serviceSlug = cleanPath.startsWith("/services/")
    ? cleanPath.split("/").pop()
    : null;
  const currentService = servicePages.find(
    (service) => service.slug === serviceSlug
  );
  if (currentService)
    return (
      <div ref={viewportRef} className="scale-viewport">
        <main ref={canvasRef} className="app-scale service-route">
          <ServicePage service={currentService} />
        </main>
      </div>
    );
  const isContactsPage = cleanPath === "/contacts";
  if (isContactsPage)
    return (
      <div ref={viewportRef} className="scale-viewport">
        <main ref={canvasRef} className="app-scale contacts-page">
          <header className="nav">
            <a className="header-logo" href="/" aria-label="На главную">
              <img src={A + "logo.png"} />
            </a>
            <div className="header-contact">
              <a className="header-phone" href="tel:88006000895">
                <i className="phone-icon" aria-hidden="true" />
                <span>8 800 600-08-95</span>
              </a>
              <address>
                <i className="location-icon" aria-hidden="true" />
                <span>
                  <strong>г. Екатеринбург,</strong> ул. Первомайская, д. 77, оф.
                  69
                </span>
              </address>
            </div>
            <button
              className={`menu-toggle${menuOpen ? " is-open" : ""}`}
              type="button"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
            <nav className={menuOpen ? "is-open" : ""}>
              <a href="/contacts">Контакты</a>
              <div
                className={`services-dropdown${
                  servicesMenuOpen ? " is-open" : ""
                }`}
                onMouseEnter={() => setServicesMenuOpen(true)}
                onMouseLeave={() => setServicesMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesMenuOpen((value) => !value)}
                  aria-expanded={servicesMenuOpen}
                >
                  Услуги
                </button>
                <div>
                  {servicePages.map((service) => (
                    <a
                      key={service.slug}
                      onClick={() => setServicesMenuOpen(false)}
                      href={`/services/${service.slug}`}
                    >
                      {service.title}
                    </a>
                  ))}
                </div>
              </div>
              <div
                className={`services-dropdown about-dropdown${
                  aboutMenuOpen ? " is-open" : ""
                }`}
                onMouseEnter={() => setAboutMenuOpen(true)}
                onMouseLeave={() => setAboutMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setAboutMenuOpen((value) => !value)}
                  aria-expanded={aboutMenuOpen}
                >
                  О нас
                </button>
                <div>
                  <a href="/licenses" onClick={() => setAboutMenuOpen(false)}>
                    Лицензии
                  </a>
                  <a href="/contacts" onClick={() => setAboutMenuOpen(false)}>
                    Расположение
                  </a>
                </div>
              </div>
              <a
                className="btn call-btn"
                href="tel:88006000895"
                onClick={() => setMenuOpen(false)}
              >
                Вызвать врача
              </a>
            </nav>
          </header>
          <section className="contact-page-hero dark">
            <p className="contact-page-eyebrow">Контакты клиники</p>
            <h1>Мы рядом и всегда на связи</h1>
            <div className="contact-page-details">
              <a href="tel:88006000895">
                <i className="phone-icon" aria-hidden="true" />
                <span>
                  <small>Телефон, круглосуточно</small>
                  <strong>8 800 600-08-95</strong>
                </span>
              </a>
              <address>
                <i className="location-icon" aria-hidden="true" />
                <span>
                  <small>Адрес клиники</small>
                  <strong>
                    г. Екатеринбург,
                    <br />
                    ул. Первомайская, д. 77, оф. 69
                  </strong>
                </span>
              </address>
            </div>
          </section>
          <section className="contact-page-map light">
            <div>
              <span>Как нас найти</span>
              <h2>Постройте удобный маршрут</h2>
              <p>
                Интерактивная карта поможет рассмотреть расположение клиники и
                построить маршрут.
              </p>
              <a
                className="btn"
                href="https://yandex.ru/maps/?text=%D0%B3.%20%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3%2C%20%D1%83%D0%BB.%20%D0%9F%D0%B5%D1%80%D0%B2%D0%BE%D0%BC%D0%B0%D0%B9%D1%81%D0%BA%D0%B0%D1%8F%2C%20%D0%B4.%2077%2C%20%D0%BE%D1%84.%2069"
                target="_blank"
                rel="noreferrer"
              >
                Открыть в Яндекс Картах
              </a>
            </div>
            <iframe
              className="yandex-map"
              src="https://yandex.ru/map-widget/v1/?mode=search&text=%D0%B3.%20%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3%2C%20%D1%83%D0%BB.%20%D0%9F%D0%B5%D1%80%D0%B2%D0%BE%D0%BC%D0%B0%D0%B9%D1%81%D0%BA%D0%B0%D1%8F%2C%20%D0%B4.%2077%2C%20%D0%BE%D1%84.%2069&z=16"
              title="Яндекс Карта — Медпроект"
              loading="lazy"
              allowFullScreen
            />
          </section>
          <SiteFooter />
        </main>
      </div>
    );
  return (
    <div ref={viewportRef} className="scale-viewport">
      <main ref={canvasRef} className="app-scale" id="home">
        <header className="nav">
          <a className="header-logo" href="#home" aria-label="На главную">
            <img src={A + "logo.png"} />
          </a>
          <div className="header-contact">
            <a className="header-phone" href="tel:88006000895">
              <i className="phone-icon" aria-hidden="true" />
              <span>8 800 600-08-95</span>
            </a>
            <address>
              <i className="location-icon" aria-hidden="true" />
              <span>
                <strong>г. Екатеринбург,</strong> ул. Первомайская, д. 77, оф.
                69
              </span>
            </address>
          </div>
          <button
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={menuOpen ? "is-open" : ""}>
            <a href="/contacts">Контакты</a>
            <div
              className={`services-dropdown${
                servicesMenuOpen ? " is-open" : ""
              }`}
              onMouseEnter={() => setServicesMenuOpen(true)}
              onMouseLeave={() => setServicesMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesMenuOpen((value) => !value)}
                aria-expanded={servicesMenuOpen}
              >
                Услуги
              </button>
              <div>
                {servicePages.map((service) => (
                  <a
                    key={service.slug}
                    onClick={() => setServicesMenuOpen(false)}
                    href={`/services/${service.slug}`}
                  >
                    {service.title}
                  </a>
                ))}
              </div>
            </div>
            <div
              className={`services-dropdown about-dropdown${
                aboutMenuOpen ? " is-open" : ""
              }`}
              onMouseEnter={() => setAboutMenuOpen(true)}
              onMouseLeave={() => setAboutMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setAboutMenuOpen((value) => !value)}
                aria-expanded={aboutMenuOpen}
              >
                О нас
              </button>
              <div>
                <a href="/licenses" onClick={() => setAboutMenuOpen(false)}>
                  Лицензии
                </a>
                <a href="/contacts" onClick={() => setAboutMenuOpen(false)}>
                  Расположение
                </a>
              </div>
            </div>
            <a
              className="btn call-btn"
              href="tel:88006000895"
              onClick={() => setMenuOpen(false)}
            >
              Вызвать врача
            </a>
          </nav>
        </header>
        <section className="hero">
          <div className="hero-copy">
            <h1>
              МедПроект —{" "}
              <span className="hero-title-nowrap">профессиональная</span> помощь
              при&nbsp;запоях и&nbsp;зависимостях
            </h1>
            <p className="hero-slogan">
              Не&nbsp;ждите, пока станет хуже
              <br />
              Позвоните — мы&nbsp;подскажем, что&nbsp;делать
            </p>
            <div>
              <a className="btn call-btn" href="tel:88006000895">
                Вызвать врача
              </a>
              <a className="btn outline" href="#application-form">
                Оставить заявку
              </a>
            </div>
          </div>
          <div className="hero-art">
            <img
              className="hero-back"
              src={A + "hero-back-370.webp"}
              width="370"
              height="622"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              alt="Интерьер клиники"
            />
            <img
              className="hero-person"
              src={A + "hero-person-540.webp"}
              srcSet={`${A}hero-person-540.webp 540w, ${A}hero-person-1080.webp 1080w`}
              sizes="(max-width: 767px) 86vw, 536px"
              width="1080"
              height="1456"
              loading="eager"
              decoding="async"
              alt="Врач клиники"
            />
            <ul className="hero-services">
              <li>Срочный вывод из&nbsp;запоя</li>
              <li>Кодирование от&nbsp;алкоголизма</li>
              <li>Реабилитация</li>
              <li>Оперативный выезд</li>
              <li>Поддержка при&nbsp;срыве</li>
            </ul>
          </div>
        </section>
        <section className="light advantages">
          <div className="advantages-head">
            <h2>Преимущества</h2>
            <p>
              Действуем профессионально, спокойно и с уважением к каждому
              человеку.
            </p>
          </div>
          <div className="advantages-grid">
            {advantages.map((item, index) => (
              <article key={item[0]}>
                <i
                  className={
                    [
                      "anonymous-icon",
                      "always-open-icon",
                      "personal-plan-icon",
                      "doctors-icon",
                    ][index]
                  }
                  aria-hidden="true"
                />
                <h3>{item[0]}</h3>
                <p>{item[1]}</p>
              </article>
            ))}
          </div>
          <div className="advantages-actions">
            <a className="btn advantages-primary" href="tel:88006000895">
              Позвонить
            </a>
            <a href="#services">Наши услуги →</a>
          </div>
        </section>
        <section
          ref={servicesRef}
          id="services"
          className="light services compact-services"
        >
          <div className="services-content">
            <h2>Услуги</h2>
            <div className="services-list">
              {services.map((s, index) => (
                <article
                  className="service"
                  style={
                    { "--delay": `${index * 110}ms` } as React.CSSProperties
                  }
                  key={s[0]}
                >
                  <b>{s[0]}</b>
                  <div>
                    <h3>{s[1]}</h3>
                    <p>{s[2]}</p>
                  </div>
                  <a
                    href={`/services/${servicePages[index].slug}`}
                    aria-label={`Подробнее: ${s[1]}`}
                  >
                    Подробнее →
                  </a>
                </article>
              ))}
            </div>
          </div>
          <div className="services-collage" aria-label="Фотографии клиники">
            {[1, 2, 3].map((number, index) => (
              <img
                key={number}
                className={
                  ["collage-one", "collage-two", "collage-three"][index]
                }
                src={`${A}services-collage-${number}-360.webp`}
                srcSet={`${A}services-collage-${number}-360.webp 360w, ${A}services-collage-${number}-720.webp 720w`}
                sizes="(max-width: 767px) 46vw, 300px"
                width="720"
                height="480"
                loading="lazy"
                decoding="async"
                alt={
                  [
                    "Консультация врача",
                    "Медицинская помощь",
                    "Психологическая консультация",
                  ][index]
                }
              />
            ))}
          </div>
        </section>
        <section id="treatment" className="dark treatment-timeline">
          <div className="timeline-head">
            <h2>Как проходит лечение</h2>
            <p>
              Понятный и последовательный путь: от первого разговора до
              устойчивого восстановления под наблюдением специалистов.
            </p>
            <div>
              <a className="btn call-btn" href="tel:88006000895">
                Позвонить врачу
              </a>
              <a href="#contacts">Оставить заявку →</a>
            </div>
          </div>
          <div className="timeline-track">
            {treatmentSteps.map((step, index) => (
              <article
                className={
                  index % 2
                    ? "timeline-step step-top"
                    : "timeline-step step-bottom"
                }
                key={step[0]}
              >
                <img
                  src={A + step[3]}
                  width="180"
                  height="180"
                  loading="lazy"
                  decoding="async"
                  alt=""
                />
                <div className="timeline-dot" />
                <div className="timeline-copy">
                  <h3>
                    {Number(step[0])}. {step[1]}
                  </h3>
                  <p>{step[2]}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="light split">
          <div>
            <span>Наш подход</span>
            <h2>Лечение, в котором важен человек</h2>
            <p>
              Мы не работаем по шаблону. План лечения строится вокруг истории,
              состояния и целей конкретного человека.
            </p>
            <a className="btn call-btn" href="tel:88006000895">
              Позвонить нам
            </a>
          </div>
          <img
            src={A + "approach-640.webp"}
            srcSet={`${A}approach-640.webp 640w, ${A}approach-1280.webp 1280w`}
            sizes="(max-width: 767px) 100vw, 616px"
            width="1280"
            height="853"
            loading="lazy"
            decoding="async"
            alt="Консультация со специалистом"
          />
        </section>
        <section className="dark stats">
          <div>
            <span>Результаты</span>
            <h2>Цифры, за которыми стоят люди</h2>
          </div>
          <div className="stat-grid">
            {[
              ["10+", "лет практики"],
              ["24/7", "на связи"],
              ["Деликатно", "и конфиденциально"],
              ["1:1", "личный план"],
            ].map((x) => (
              <article key={x[0]}>
                <strong>{x[0]}</strong>
                <p>{x[1]}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="light faq">
          <h2>Частые вопросы</h2>
          <p>Ответы на то, что важно знать перед обращением.</p>
          {faq.map(([question, answer], i) => {
            const isOpen = open === i;
            return (
              <article
                className={isOpen ? "is-open" : ""}
                key={question}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <h3>
                  {question}
                  <b>{isOpen ? "−" : "+"}</b>
                </h3>
                <div className={`faq-answer${isOpen ? " is-open" : ""}`}>
                  <div>
                    <p>{answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
        <ApplicationForm />
        <MedicalDisclaimer />
        <section id="contacts" className="dark contacts reference-contacts">
          <div className="contact-heading">
            <h2>Свяжитесь с нами</h2>
          </div>
          <div className="contact-grid">
            <article>
              <i>☎</i>
              <h3>Телефон</h3>
              <p>Звоните в любое время. Если не ответим, перезвоним сами.</p>
              <a href="tel:88006000895">8 800 600-08-95</a>
            </article>
            <article>
              <i>⌖</i>
              <h3>Адрес</h3>
              <p>
                Мы находимся в тихом месте. Точный адрес можно уточнить при
                звонке.
              </p>
              <a href="#clinic-map">
                г. Екатеринбург, ул. Первомайская, д. 77, оф. 69
              </a>
            </article>
            <article>
              <i>◷</i>
              <h3>Часы</h3>
              <p>Работаем круглосуточно. Приём по записи и без.</p>
              <span>Круглосуточно</span>
            </article>
          </div>
          <div id="clinic-map" className="contact-location">
            <iframe
              className="yandex-map"
              src="https://yandex.ru/map-widget/v1/?mode=search&text=%D0%B3.%20%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3%2C%20%D1%83%D0%BB.%20%D0%9F%D0%B5%D1%80%D0%B2%D0%BE%D0%BC%D0%B0%D0%B9%D1%81%D0%BA%D0%B0%D1%8F%2C%20%D0%B4.%2077%2C%20%D0%BE%D1%84.%2069&z=16"
              title="Яндекс Карта — Медпроект"
              loading="lazy"
              allowFullScreen
            />
            <div>
              <h2>Где мы находимся</h2>
              <p>Точный маршрут и ориентиры сообщим при записи.</p>
              <a
                href="https://yandex.ru/maps/?text=%D0%B3.%20%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3%2C%20%D1%83%D0%BB.%20%D0%9F%D0%B5%D1%80%D0%B2%D0%BE%D0%BC%D0%B0%D0%B9%D1%81%D0%BA%D0%B0%D1%8F%2C%20%D0%B4.%2077%2C%20%D0%BE%D1%84.%2069"
                target="_blank"
                rel="noreferrer"
              >
                Открыть в Яндекс Картах →
              </a>
            </div>
          </div>
        </section>
        <SiteFooter />
      </main>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <CookieBanner />
  </>
);
