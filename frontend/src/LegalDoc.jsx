import React, { useEffect, useMemo, useState } from 'react';

const LINK_RE = /(https?:\/\/[^\s,;)]+[^\s,;.)]|[\w.+-]+@[\w-]+\.[\w.-]*\w)/g;

function linkify(text) {
  const parts = text.split(LINK_RE);
  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    const href = part.includes('@') && !part.startsWith('http') ? `mailto:${part}` : part;
    return (
      <a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {part}
      </a>
    );
  });
}

// Превращает сырой текст документа в структуру: мета, разделы, пункты, списки.
function parse(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const meta = [];
  const sections = [];
  let current = null;

  const push = (block) => {
    if (!current) {
      current = { id: 'intro', title: null, blocks: [] };
      sections.push(current);
    }
    const last = current.blocks[current.blocks.length - 1];
    if (block.type === 'li' && last && last.type === 'ul') last.items.push(block.text);
    else if (block.type === 'li') current.blocks.push({ type: 'ul', items: [block.text] });
    else current.blocks.push(block);
  };

  for (const line of lines) {
    let m;
    if (!sections.length && /^(Дата|г\.\s)/.test(line)) {
      meta.push(line);
    } else if ((m = line.match(/^(\d+)\.\s+(\D.*)$/))) {
      current = { id: `s${m[1]}`, num: m[1], title: m[2], blocks: [] };
      sections.push(current);
    } else if ((m = line.match(/^(\d+(?:\.\d+)+\.?)\s+(.*)$/))) {
      push({ type: 'clause', num: m[1], text: m[2] });
    } else if ((m = line.match(/^[-•—]\s+(.*)$/))) {
      push({ type: 'li', text: m[1] });
    } else {
      push({ type: 'p', text: line });
    }
  }
  return { meta, sections };
}

function LegalDoc({ title, text }) {
  const { meta, sections } = useMemo(() => parse(text), [text]);
  const toc = useMemo(() => sections.filter((s) => s.title), [sections]);
  const [active, setActive] = useState(toc[0]?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [text]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -70% 0px' }
    );
    toc.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  const goTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="doc-layout">
      {toc.length > 2 && (
        <aside className="doc-toc">
          <div className="doc-toc__label">Содержание</div>
          <ol>
            {toc.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={active === s.id ? 'is-active' : ''} onClick={(e) => goTo(e, s.id)}>
                  <span className="doc-toc__num">{s.num}</span>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>
      )}

      <article className="doc">
        <header className="doc__head">
          <span className="eyebrow">Правовой документ</span>
          <h1 className="doc__title">{title}</h1>
          {meta.length > 0 && (
            <div className="doc__meta">
              {meta.map((m) => (
                <span key={m} className="chip">{m}</span>
              ))}
            </div>
          )}
        </header>

        {sections.map((s) => (
          <section key={s.id} id={s.id} className="doc__section">
            {s.title && (
              <h2>
                <span className="doc__secnum">{s.num}</span>
                {s.title}
              </h2>
            )}
            {s.blocks.map((b, i) => {
              if (b.type === 'clause')
                return (
                  <p key={i} className="clause">
                    <span className="clause__num">{b.num}</span>
                    <span>{linkify(b.text)}</span>
                  </p>
                );
              if (b.type === 'ul')
                return (
                  <ul key={i}>
                    {b.items.map((it, j) => (
                      <li key={j}>{linkify(it)}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{linkify(b.text)}</p>;
            })}
          </section>
        ))}
      </article>
    </div>
  );
}

export default LegalDoc;
