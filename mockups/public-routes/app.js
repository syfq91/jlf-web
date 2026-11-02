/* Visual mockup helpers: icons, active nav state, PIN inputs, mock feedback. */

const refreshIcons = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
};

const routePath = () => {
    const path = window.location.pathname.replace(/\/+$/, '');
    return path === '' ? '/login' : path;
};

const syncNav = () => {
    const current = routePath();

    document.querySelectorAll('[data-route]').forEach((link) => {
        link.classList.toggle('is-active', link.dataset.route === current);
    });
};

let toastTimer;

const showToast = (message) => {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
};

const syncServerChip = (card) => {
    const name = document.getElementById('server-name');
    const url = document.getElementById('server-url');

    if (name && card.dataset.server) name.textContent = card.dataset.server;
    if (url && card.dataset.serverUrl) url.textContent = card.dataset.serverUrl;
};

const handlePinInput = (event) => {
    const input = event.target.closest('[data-pin]');
    if (!input) return;

    input.value = input.value.replace(/\D/g, '').slice(0, 1);

    if (input.value) {
        const next = input.nextElementSibling;
        if (next?.matches('[data-pin]')) next.focus();
    }
};

const handlePinKeydown = (event) => {
    const input = event.target.closest('[data-pin]');
    if (!input || event.key !== 'Backspace' || input.value) return;

    const previous = input.previousElementSibling;
    if (previous?.matches('[data-pin]')) {
        previous.value = '';
        previous.focus();
    }
};

const handlePinPaste = (event) => {
    const input = event.target.closest('[data-pin]');
    if (!input) return;

    const digits = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 6);
    if (!digits) return;

    event.preventDefault();

    const row = input.closest('.pin-row');
    const pins = [...(row?.querySelectorAll('[data-pin]') ?? [])];

    pins.forEach((pin, index) => {
        pin.value = digits[index] ?? '';
    });

    pins[Math.min(digits.length, pins.length - 1)]?.focus();
};

document.addEventListener('DOMContentLoaded', () => {
    refreshIcons();
    syncNav();
});

document.addEventListener('htmx:afterSwap', () => {
    refreshIcons();
    window.setTimeout(syncNav, 0);
});

document.addEventListener('htmx:afterSettle', () => {
    refreshIcons();
    syncNav();
});

document.addEventListener('htmx:historyRestore', () => {
    refreshIcons();
    syncNav();
});

window.addEventListener('popstate', syncNav);

document.addEventListener('click', (event) => {
    const serverCard = event.target.closest('[data-server]');
    if (serverCard) syncServerChip(serverCard);

    const mockButton = event.target.closest('[data-mock-label]');
    if (mockButton) {
        showToast(`${mockButton.dataset.mockLabel} is visual only in this mockup.`);
    }
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

document.addEventListener('input', handlePinInput);
document.addEventListener('keydown', handlePinKeydown);
document.addEventListener('paste', handlePinPaste);
