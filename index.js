/* ── Hamburger menu ── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
});

/* ── Nav active state ── */
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
    });
});

/* Intersection-based active nav */
const sections = ['home','about','gallery','profile','explore','contact','testimonials','stack'];
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (link) link.classList.add('active');
        }
    });
}, { threshold: 0.35 });
sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
});

/* ── About section ── */
const aboutData = [
    { tag: 'Page', title: 'About This Page', body: 'This web page is created for entertainment and demonstration purposes. It showcases a simple yet functional project built using only pure HTML, CSS, and JavaScript — without relying on external frameworks or libraries — highlighting how core web technologies can be combined to design an interactive, engaging experience from scratch.' },
    { tag: 'Me', title: 'About Me', body: 'Detail-oriented and organized, with a background in analytical thinking and communication. Willing to learn and adapt to new systems and procedures, motivated to grow while developing critical thinking skills in an IT Specialist (Support & Development) role.' },
    { tag: 'Portfolio', title: 'About the Portfolio', body: 'Built using pure HTML, CSS, and JavaScript. Semantic HTML ensures accessibility and clarity; CSS provides a clean, responsive design; and vanilla JavaScript handles DOM manipulation and interactivity. The project demonstrates the ability to develop a fully functional, visually appealing website using only the fundamental technologies of the web.' },
    { tag: 'Gallery', title: 'About the Gallery', body: 'Features preview images of certificates earned through the SoloLearn mobile application — a platform offering a variety of programming and technology courses. Each certificate is awarded upon completing lessons, quizzes, and assessments, reflecting self-directed learning and continuous skill development.' },
    { tag: 'Profile', title: 'About the Profile', body: 'The information shown is not guaranteed to be fully accurate or factual — it is intended for web testing and preview purposes only, demonstrating the implementation of HTML and CSS in building and designing web pages.' },
    { tag: 'Explore', title: 'About Explore', body: 'Features embedded iframe previews of web pages developed for practice. Each preview includes direct access links. Some projects are privately developed and may require credentials, while others are publicly accessible. This section showcases hands-on experience building and testing different web layouts and functionalities.' },
];

const aboutGrid = document.getElementById('aboutGrid');
aboutData.forEach(item => {
    aboutGrid.insertAdjacentHTML('beforeend', `
        <div class="about-card">
            <div class="about-card-header">
                <h3>${item.title}</h3>
                <span class="about-tag">${item.tag}</span>
            </div>
            <p class="about-body">${item.body}</p>
        </div>
    `);
});

/* ── Certifications Accordion ── */
const certData = [
    {
        name: 'HTML, CSS, JavaScript Courses',
        issuer: 'SoloLearn',
        status: 'done', // 'done' | 'wip'
        statusLabel: 'Completed',
        modules: [
            { name: 'Introduction to HTML',        done: 82,  total: 82  },
            { name: 'Introduction to CSS',         done: 74,  total: 74  },
            { name: 'Introduction to JavaScript',  done: 91,  total: 91  },
            { name: 'JavaScript Intermediate',     done: 68,  total: 68  },
            { name: 'Web Development',             done: 120, total: 120 },
        ]
    },
    {
        name: 'Responsive Web Design',
        issuer: 'freeCodeCamp',
        status: 'wip',
        statusLabel: 'In Progress',
        modules: [
            { name: 'HTML',      done: 302, total: 302  },
            { name: 'Computers', done: 16,  total: 16   },
            { name: 'CSS',       done: 1234, total: 1234 },
        ]
    },
];

const certAccordion = document.getElementById('certAccordion');

certData.forEach((cert, idx) => {
    // Build module rows HTML
    const modulesHTML = cert.modules.map(m => {
        const pct = Math.round((m.done / m.total) * 100);
        const fillClass = m.done === m.total ? 'complete' : '';
        return `
            <div class="cert-module">
                <div class="cert-module-meta">
                    <span class="cert-module-name">${m.name}</span>
                    <span class="cert-module-count">${m.done} of ${m.total} completed</span>
                </div>
                <div class="cert-progress-track">
                    <div class="cert-progress-fill ${fillClass}" style="width:${pct}%"></div>
                </div>
            </div>
        `;
    }).join('');

    certAccordion.insertAdjacentHTML('beforeend', `
        <div class="cert-item" id="cert-${idx}">
            <button class="cert-trigger" aria-expanded="false" aria-controls="cert-body-${idx}">
                <div class="cert-trigger-left">
                    <span class="cert-name">${cert.name}</span>
                    <span class="cert-issuer">${cert.issuer}</span>
                </div>
                <div class="cert-trigger-right">
                    <span class="cert-badge ${cert.status}">${cert.statusLabel}</span>
                    <svg class="cert-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="4 6 8 10 12 6"/>
                    </svg>
                </div>
            </button>
            <div class="cert-body" id="cert-body-${idx}" role="region">
                <div class="cert-modules">
                    ${modulesHTML}
                </div>
            </div>
        </div>
    `);
});

// Accordion toggle logic
certAccordion.addEventListener('click', e => {
    const trigger = e.target.closest('.cert-trigger');
    if (!trigger) return;

    const item = trigger.closest('.cert-item');
    const isOpen = item.classList.contains('open');

    // Close all
    certAccordion.querySelectorAll('.cert-item').forEach(ci => {
        ci.classList.remove('open');
        ci.querySelector('.cert-trigger').setAttribute('aria-expanded', 'false');
    });

    // Open clicked (unless it was already open)
    if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
    }
});

/* ── Explore / modal ── */
const projects = [
    {
        icon: '🎓',
        title: 'Skool Web 101',
        tag: 'Education',
        meta: 'Take a limited exam',
        url: 'https://skool-web101.netlify.app/',
        desc: 'A web-based educational platform built with HTML, CSS, JavaScript, and Bootstrap, using Google Apps Script as the API and Google Sheets as the database. Users enter their email to access a dashboard. Demonstrates basic user flow, data handling, and front-end/cloud-backend integration.'
    },
    {
        icon: '🎬',
        title: 'Movie Watchlists & Reviews',
        tag: 'Entertainment',
        meta: 'Movie Watchlists (Private)',
        url: 'https://post-movie-watchlists.netlify.app/',
        desc: 'A web application using Bootstrap and Google Apps Script + Sheets for the database. Full access requires credentials. Allows users to post movies, write reviews, organize watchlists, and filter entries by posting date, viewing date, or author.'
    },
    {
        icon: '💬',
        title: 'Share a Forums',
        tag: 'Personal',
        meta: 'Post a forum (Private)',
        url: 'https://our-forums-webapp.netlify.app/',
        desc: 'A simple forum-style application requiring fixed credentials for full access. Built using a limited Firestore free-tier database, it enables users to create posts and interact with others — practicing basic CRUD operations within a constrained backend environment.'
    },
    {
        icon: '🎵',
        title: 'Music Poster Generator',
        tag: 'Entertainment',
        meta: 'Customize Music Poster (Limited)',
        url: 'https://custom-music-story.netlify.app/',
        desc: 'A lightweight tool that generates a poster-style image of a user\'s top 5 favorite music selections for a chosen month. Focused on creativity, layout design, and dynamic content generation.'
    },
];

const exploreGrid = document.getElementById('exploreGrid');
projects.forEach((p, i) => {
    exploreGrid.insertAdjacentHTML('beforeend', `
        <div class="project-card">
            <div class="project-card-body">
                <div class="project-top">
                    <div class="project-icon" aria-hidden="true">${p.icon}</div>
                    <div>
                        <p class="project-title">${p.title}</p>
                        <p class="project-tag">${p.tag}</p>
                    </div>
                </div>
                <p class="project-desc">${p.desc}</p>
            </div>
            <div class="project-footer">
                <button class="btn-sm btn-sm-ghost preview-trigger" data-index="${i}">Preview</button>
                <a href="${p.url}" target="_blank" rel="noopener" class="btn-sm btn-sm-primary">Visit ↗</a>
            </div>
        </div>
    `);
});

/* ── Tech Stack ── */
const stackItems = [
    {
        emoji: '🌐',
        category: 'Markup',
        name: 'HTML5',
        detail: 'nav, section, figure, footer, h1–h6, ul/li, button, input, iframe — semantic structure throughout. No div soup.',
        tag: 'v5'
    },
    {
        emoji: '🎨',
        category: 'Stylesheet',
        name: 'CSS3 — Vanilla',
        detail: 'No frameworks. Custom properties (--tokens), CSS Grid, Flexbox, clamp() for fluid type/spacing, aspect-ratio, backdrop-filter, and @keyframes animations.',
        tag: 'No Framework'
    },
    {
        emoji: '⚙️',
        category: 'Scripting',
        name: 'JavaScript ES6+',
        detail: 'Vanilla JS — querySelector, insertAdjacentHTML, IntersectionObserver for scroll-aware nav, classList toggling, event delegation on grids and modals.',
        tag: 'No Framework'
    },
    {
        emoji: '📐',
        category: 'Layout',
        name: 'CSS Grid + Flexbox',
        detail: 'Page sections use CSS Grid with repeat(auto-fill, minmax()) for responsive columns. Nav, cards, and inline elements use Flexbox. No float or table hacks.',
        tag: 'Responsive'
    },
    {
        emoji: '📱',
        category: 'Breakpoints',
        name: 'Mobile-First Media Queries',
        detail: 'Base styles target mobile. Layouts expand at 600px (hamburger → inline nav), 640px (2-col grids), and 768px (hero side-by-side). Max content width: 820px.',
        tag: 'min-width'
    },
    {
        emoji: '🔤',
        category: 'Display Font',
        name: 'DM Serif Display',
        detail: 'Used for the hero title, section headings, and profile name. High-contrast serif — the italic cut is used for name emphasis in the hero.',
        tag: 'Google Fonts'
    },
    {
        emoji: '✍️',
        category: 'Body Font',
        name: 'DM Sans',
        detail: 'All body copy, UI labels, buttons, and nav links. Geometric low-contrast sans-serif, legible at 13–15px. Weights used: 300, 400, 500, 600, 700.',
        tag: 'Google Fonts'
    },
    {
        emoji: '💻',
        category: 'Monospace Font',
        name: 'JetBrains Mono',
        detail: 'Section eyebrows, badges, date labels, tag pills, and the footer. Adds a subtle developer texture to metadata without competing with body text.',
        tag: 'Google Fonts'
    },
    {
        emoji: '🖋️',
        category: 'Typography Scale',
        name: 'Fluid Type via clamp()',
        detail: 'Hero title: clamp(2.4rem, 6vw, 4rem). Section headings: clamp(1.6rem, 4vw, 2.2rem). Body: 15px base. Labels: 0.68–0.78rem. Line-height: 1.65–1.75.',
        tag: 'Fluid'
    },
    {
        emoji: '🌑',
        category: 'Color — Base',
        name: '#0f1117 — Ink',
        detail: 'Primary dark used for nav, hero background, profile card headers, and the footer. Near-black with a slight blue-gray cast to avoid pure harshness.',
        tag: '--ink'
    },
    {
        emoji: '⬜',
        category: 'Color — Surface',
        name: '#f5f6f8 — Light Surface',
        detail: 'Page background for About, Gallery, and Explore sections. Slightly warm off-white — softer than pure white, reduces eye strain on long scroll.',
        tag: '--surface-2'
    },
    {
        emoji: '🔵',
        category: 'Color — Accent',
        name: '#1a56e8 — Blue',
        detail: 'Primary interactive color: links, buttons, eyebrow labels, skill chips, and focus indicators. Darker hover state at #0e38b1. Dim tint #e8edfb for backgrounds.',
        tag: '--accent'
    },
    {
        emoji: '🟢',
        category: 'Color — Status',
        name: '#0d7a52 — Green',
        detail: 'Used exclusively for the "Current" employment badge on the work experience card. Green-dim tint (#e4f5ef) as the badge background.',
        tag: '--green'
    },
    {
        emoji: '🃏',
        category: 'Component',
        name: 'Card System',
        detail: 'Consistent card pattern: white bg (#fff), 1px border (#dde1e8), 12px border-radius, 1.25rem padding. Used in About, Profile, and Explore sections.',
        tag: 'Reusable'
    },
    {
        emoji: '🪟',
        category: 'Component',
        name: 'Modal / Preview',
        detail: 'Fixed backdrop with rgba(0,0,0,.5) overlay. Modal uses popIn @keyframes (scale + translateY). iframe sandboxed with allow-scripts, allow-same-origin, allow-forms.',
        tag: 'Accessible'
    },
    {
        emoji: '🎞️',
        category: 'Animation',
        name: 'Transitions + Keyframes',
        detail: 'Gallery caption: translateY slide-in on hover (0.25s ease). Modal: popIn scale+fade (0.16s). Nav menu: translateY(-110%) → 0 slide (0.25s). Button: translateY(-1px) lift.',
        tag: 'CSS Only'
    },
    {
        emoji: '🎯',
        category: 'UI/UX Approach',
        name: 'Content-First Minimalism',
        detail: 'No decorative illustrations or hero images. Hierarchy through typography weight, size, and spacing. Color is used sparingly — only for meaning and interaction.',
        tag: 'Intentional'
    },
    {
        emoji: '♿',
        category: 'Accessibility',
        name: 'ARIA + Semantic HTML',
        detail: 'Modal: role="dialog", aria-modal, aria-labelledby. Nav toggle: aria-expanded, aria-label. Decorative icons: aria-hidden="true". Skip-link ready with .sr-only utility.',
        tag: 'A11y'
    },
];

const stackGrid = document.getElementById('stackGrid');
stackItems.forEach(s => {
    stackGrid.insertAdjacentHTML('beforeend', `
        <div class="stack-item">
            <div class="stack-item-top">
                <div class="stack-badge">${s.emoji}</div>
                <span class="stack-category">${s.category}</span>
            </div>
            <p class="stack-name">${s.name}</p>
            <p class="stack-detail">${s.detail}</p>
            <span class="stack-tag">${s.tag}</span>
        </div>
    `);
});

const backdrop       = document.getElementById('modalBackdrop');
const modalTitle     = document.getElementById('modalTitle');
const modalMeta      = document.getElementById('modalMeta');
const visitBtn       = document.getElementById('visitBtn');
const modalIframe    = document.getElementById('modalIframe');
const fallback       = document.getElementById('previewFallback');

function openModal(idx) {
    const p = projects[idx];
    modalTitle.textContent = p.title;
    modalMeta.textContent  = p.meta;
    visitBtn.onclick       = () => window.open(p.url, '_blank');
    if (p.url) {
        modalIframe.src           = p.url;
        modalIframe.style.display = 'block';
        fallback.style.display    = 'none';
    } else {
        modalIframe.src           = '';
        modalIframe.style.display = 'none';
        fallback.style.display    = 'flex';
    }
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    backdrop.classList.remove('open');
    modalIframe.src = '';
    document.body.style.overflow = '';
}

exploreGrid.addEventListener('click', e => {
    const btn = e.target.closest('.preview-trigger');
    if (btn) openModal(parseInt(btn.dataset.index));
});

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalClose2').addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── Contact form → mailto ── */
document.getElementById('cfSubmit').addEventListener('click', () => {
    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    if (!name && !message) return;
    const body = `Name: ${name || '(not provided)'}\nEmail: ${email || '(not provided)'}\n\n${message}`;
    const mailto = `mailto:escribanochemuel@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
});

/* ── Dynamic footer year ── */
document.getElementById('footerYear').textContent = new Date().getFullYear();
