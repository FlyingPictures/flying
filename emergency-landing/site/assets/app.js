(() => {
  'use strict';
  const lang = document.documentElement.lang;
  try {
    const saved = localStorage.getItem('flying-language');
    const explicit = new URLSearchParams(location.search).has('lang');
    if (!explicit && !location.pathname.includes('/packages/') && saved && saved !== lang) {
      const alternate = document.querySelector(`[data-language="${saved}"]`);
      if (alternate) { location.replace(alternate.href + location.hash); return; }
    }
    localStorage.setItem('flying-language', lang);
  } catch (_) { /* Private browsing remains usable. */ }
  const filters = document.querySelector('.filters');
  if (filters) {
    filters.hidden = false;
    filters.addEventListener('click', event => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let count = 0;
      document.querySelectorAll('.package-card').forEach(card => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.type !== button.dataset.filter;
        if (!card.hidden) count++;
      });
      const status = document.getElementById('filter-status');
      status.textContent = `${count} ${status.dataset.label}`;
    });
  }
  const dialog = document.getElementById('package-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const body = document.getElementById('dialog-body');
  let opener;
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-package]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const template = document.getElementById(`detail-${link.dataset.package}`);
    if (!template) return;
    event.preventDefault();
    opener = link;
    body.replaceChildren(template.content.cloneNode(true));
    const title = body.querySelector('.detail-title');
    title.id = 'dialog-title';
    dialog.setAttribute('aria-labelledby', title.id);
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    opener?.focus({ preventScroll: true });
  });
})();
