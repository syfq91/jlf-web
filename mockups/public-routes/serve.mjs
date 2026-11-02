import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const shell = readFileSync(join(root, 'index.html'), 'utf8');

const routes = new Map([
    ['/', { fragment: 'login.html', title: 'Profiles' }],
    ['/login', { fragment: 'login.html', title: 'Profiles' }],
    ['/login/manual', { fragment: 'login-manual.html', title: 'Manual sign-in' }],
    ['/quickconnect', { fragment: 'quick-connect.html', title: 'Quick Connect' }],
    ['/addserver', { fragment: 'add-server.html', title: 'Add server' }],
    ['/selectserver', { fragment: 'select-server.html', title: 'Select server' }],
    ['/forgotpassword', { fragment: 'forgot-password.html', title: 'Forgot password' }],
    ['/forgotpasswordpin', { fragment: 'reset-pin.html', title: 'PIN reset' }]
]);

const staticFiles = new Map([
    ['/styles.css', { file: 'styles.css', type: 'text/css; charset=utf-8' }],
    ['/app.js', { file: 'app.js', type: 'text/javascript; charset=utf-8' }]
]);

const send = (res, status, body, type = 'text/html; charset=utf-8') => {
    res.writeHead(status, {
        'Content-Type': type,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff'
    });
    res.end(body);
};

const readFragment = (file) => readFileSync(join(root, 'fragments', file), 'utf8');

const server = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        send(res, 405, '<h1>405 Method Not Allowed</h1>');
        return;
    }

    const staticFile = staticFiles.get(path);
    if (staticFile) {
        send(res, 200, readFileSync(join(root, staticFile.file), 'utf8'), staticFile.type);
        return;
    }

    const route = routes.get(path);
    if (!route) {
        send(res, 404, '<h1>404 Not Found</h1><p>This mockup only has the public routes.</p>');
        return;
    }

    const fragment = readFragment(route.fragment);
    const isHtmxRequest = req.headers['hx-request'] === 'true';

    if (isHtmxRequest) {
        send(res, 200, fragment);
        return;
    }

    const page = shell
        .replace('{{title}}', route.title)
        .replace('{{screen}}', fragment);

    send(res, 200, page);
});

const port = Number(process.env.PORT) || 4173;

server.listen(port, () => {
    console.log(`Public routes mockup running at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop.');
});
