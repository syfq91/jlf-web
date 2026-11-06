/* Visual mockup helpers: icons, active nav, screen chrome, mock feedback. */

const ROUTE_LABELS = {
    '/home': 'Home',
    '/search': 'Search',
    '/movies': 'Movies',
    '/tv': 'TV Shows',
    '/shows': 'TV Shows',
    '/music': 'Music',
    '/books': 'Books',
    '/livetv': 'Live TV',
    '/boxsets': 'Collections',
    '/playlists': 'Playlists',
    '/musicvideos': 'Music Videos',
    '/homevideos': 'Home Videos',
    '/mixed': 'Mixed Media',
    '/mypreferencesmenu': 'Settings',
    '/mypreferencesdisplay': 'Display',
    '/userprofile': 'Profile',
    '/quickconnect': 'Quick Connect',
    '/video': 'Now Playing'
};

const ROUTE_ALIASES = {
    '/': '/home',
    '/shows': '/tv'
};

const path = () => {
    const value = window.location.pathname.replace(/\/+$/, '');
    return value === '' ? '/home' : value;
};

const refreshIcons = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
};

const syncNav = () => {
    const current = path();
    const navPath = ROUTE_ALIASES[current] ?? current;

    document.querySelectorAll('[data-route]').forEach((link) => {
        link.classList.toggle('is-active', link.dataset.route === navPath);
    });

    const crumb = document.getElementById('crumb');
    if (crumb) crumb.textContent = ROUTE_LABELS[current] ?? 'Home';

    const screen = document.getElementById('screen');
    if (screen) screen.classList.toggle('is-flush', current === '/video');

    document.body.classList.toggle('is-player', current === '/video');
};

const syncChrome = () => {
    refreshIcons();
    syncNav();
};

/* Sidebar ---------------------------------------------------------------- */

const setSidebar = (open) => {
    document.getElementById('sidebar')?.classList.toggle('is-open', open);
    document.querySelector('.sidebar-scrim')?.classList.toggle('is-visible', open);
};

/* Toast ------------------------------------------------------------------ */

let toastTimer;

const showToast = (message) => {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
};

/* Interactions ----------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    syncChrome();

    document.querySelector('[data-sidebar-toggle]')?.addEventListener('click', () => {
        setSidebar(!document.getElementById('sidebar')?.classList.contains('is-open'));
    });

    document.querySelector('[data-sidebar-close]')?.addEventListener('click', () => setSidebar(false));
});

document.addEventListener('htmx:afterSwap', () => {
    window.setTimeout(syncChrome, 0);
});

document.addEventListener('htmx:afterSettle', syncChrome);
document.addEventListener('htmx:historyRestore', () => window.setTimeout(syncChrome, 0));
window.addEventListener('popstate', syncChrome);

document.addEventListener('click', (event) => {
    const mockButton = event.target.closest('[data-mock-label]');
    if (mockButton) {
        showToast(`${mockButton.dataset.mockLabel} is visual only in this mockup.`);
    }

    if (event.target.closest('.sidebar a')) setSidebar(false);
});

document.addEventListener('submit', (event) => {
    if (!event.target.matches('form[data-mock]')) return;

    event.preventDefault();

    const submit = event.target.querySelector('[type="submit"]');
    if (submit) {
        submit.classList.add('is-pressed');
        window.setTimeout(() => submit.classList.remove('is-pressed'), 220);
    }

    showToast('This is a visual mockup — form actions are not wired up.');
});
