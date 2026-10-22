/* Mobile menu */
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
const links = menu.querySelectorAll('a');

function setMenu(open) {
  menu.classList.toggle('open', open);
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
}
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
links.forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* Highlight the nav link of the section under the top-middle of the screen.
   The narrow rootMargin band works even for sections taller than the viewport. */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));

/* Footer year */
document.getElementById('year').textContent = new Date().getFullYear();
