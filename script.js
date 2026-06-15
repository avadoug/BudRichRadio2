function escapeHtml(value) {
  return value.replace(/[&<>]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[char]));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy || '');
      const old = button.textContent;
      button.textContent = 'Copied to the wire';
      setTimeout(() => { button.textContent = old; }, 1300);
    } catch (error) {
      button.textContent = 'Copy failed';
    }
  });
});

document.querySelectorAll('[data-copy-target]').forEach((button) => {
  button.addEventListener('click', async () => {
    const el = document.getElementById(button.dataset.copyTarget);
    if (!el) return;
    try {
      await navigator.clipboard.writeText(el.innerText);
      const old = button.textContent;
      button.textContent = 'Copied archive';
      setTimeout(() => { button.textContent = old; }, 1300);
    } catch (error) {
      button.textContent = 'Copy failed';
    }
  });
});

const printBtn = document.querySelector('.print-btn');
if (printBtn) {
  printBtn.addEventListener('click', () => window.print());
}

const search = document.getElementById('archiveSearch');
if (search) {
  const pre = document.querySelector('#fullText pre');
  const originalText = pre ? pre.textContent : '';
  search.addEventListener('input', () => {
    if (!pre) return;
    const q = search.value.trim();
    if (!q) {
      pre.innerHTML = escapeHtml(originalText);
      return;
    }
    const safe = escapeHtml(originalText);
    const re = new RegExp(escapeRegExp(q), 'gi');
    pre.innerHTML = safe.replace(re, (match) => `<mark>${match}</mark>`);
  });
}

const headlines = [
  'NO MIDS, NO MYTHS',
  'ABUNDANCE THROUGH KNOWLEDGE',
  'THE SCREEN FOLLOWS THE FOCUS',
  'FROM COST TO SURPLUS',
  'GROW SMARTER, SMOKE BETTER'
];

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'h') {
    document.title = `${headlines[Math.floor(Math.random() * headlines.length)]} | Bud Rich Radio`;
  }
});
