// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
navToggle.addEventListener('click', () => navList.classList.toggle('open'));
navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));

// theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const root = document.documentElement;
  const isDark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.innerHTML = isDark ? '&#9728;' : '&#127769;';
});

// scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// active section highlighting (top nav + side dots)
const sections = ['home','about','work','projects','skills','fun','hobbies','contact'];
const navLinks = document.querySelectorAll('.nlink');
const dots = document.querySelectorAll('.side-dots a');
const sectionEls = sections.map(id => document.getElementById(id)).filter(Boolean);

function onScroll(){
  let current = sectionEls[0];
  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  sectionEls.forEach(sec => { if(sec.offsetTop <= scrollPos) current = sec; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current.id));
  dots.forEach(d => d.classList.toggle('active', d.dataset.target === current.id));
}
window.addEventListener('scroll', onScroll);
onScroll();
