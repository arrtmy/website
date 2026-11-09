import React from 'react';
import { Link } from 'react-router-dom';

const EMAIL = 'dostavka24.service@yandex.ru';

const features = [
  {
    icon: '🍽️',
    title: 'Любимые заведения',
    text: 'Рестораны, кафе и магазины города — в одном приложении.',
  },
  {
    icon: '⚡',
    title: 'Быстрая доставка',
    text: 'Прозрачная обработка заказа и понятный статус на каждом этапе.',
  },
  {
    icon: '🤝',
    title: 'Для бизнеса',
    text: 'Помогаем малому и среднему бизнесу принимать заказы онлайн.',
  },
];

const docs = [
  { to: '/public-offer', title: 'Публичная оферта', who: 'Клиентам' },
  { to: '/confidentiality', title: 'Политика конфиденциальности', who: 'Клиентам' },
  { to: '/nopublic-offer', title: 'Договор-оферта № П-2026', who: 'Партнерам' },
  { to: '/nopublic-offer-addendum', title: 'Доп. соглашение № 1', who: 'Партнерам' },
  { to: '/confidentiality-partners', title: 'Политика конфиденциальности', who: 'Партнерам' },
];

function About() {
  return (
    <div className="home">
      <section className="hero">
        <span className="eyebrow">Доставка еды и товаров · Анадырь</span>
        <h1 className="hero__title">
          Север Гоу — <span className="accent">заказ из любимых мест</span> в пару касаний
        </h1>
        <p className="hero__lead">
          Мы — технологическая платформа, которая объединяет рестораны, магазины и кафе города
          с жителями. Наша цель — сделать заказ еды и товаров из любимых заведений простым,
          доступным и надежным.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={`mailto:${EMAIL}`}>Написать нам</a>
          <a className="btn btn--ghost" href="#docs">Документы</a>
        </div>
      </section>

      <section className="features">
        {features.map((f) => (
          <div key={f.title} className="card feature">
            <div className="feature__icon" aria-hidden>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </section>

      <section id="docs" className="block">
        <h2 className="block__title">Документы</h2>
        <div className="docs-grid">
          {docs.map((d) => (
            <Link key={d.to} to={d.to} className="card doc-card">
              <span className="chip">{d.who}</span>
              <span className="doc-card__title">{d.title}</span>
              <span className="doc-card__arrow" aria-hidden>→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="block two-col">
        <div className="card">
          <h2 className="block__title">Поддержка</h2>
          <p>
            Если у вас возникли вопросы по работе сервиса или есть предложения по сотрудничеству,
            наша служба поддержки всегда на связи.
          </p>
          <a className="contact" href={`mailto:${EMAIL}`}>📧 {EMAIL}</a>
        </div>
        <div className="card">
          <h2 className="block__title">Реквизиты</h2>
          <dl className="req">
            <dt>Исполнитель</dt>
            <dd>ИП Жуков Артём Владимирович</dd>
            <dt>ИНН</dt>
            <dd>870902038496</dd>
            <dt>ОГРНИП</dt>
            <dd>326870000001178</dd>
            <dt>Адрес</dt>
            <dd>Россия, Чукотский АО, г. Анадырь, ул. Отке, д. 1, кв. 18</dd>
          </dl>
        </div>
      </section>
    </div>
  );
}

export default About;
