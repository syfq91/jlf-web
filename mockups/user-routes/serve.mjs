import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const shell = readFileSync(join(root, 'index.html'), 'utf8');

const routes = new Map([
    ['/', { fragment: 'home.html', title: 'Home' }],
    ['/home', { fragment: 'home.html', title: 'Home' }],
    ['/search', { fragment: 'search.html', title: 'Search' }],
    ['/movies', { fragment: 'movies.html', title: 'Movies' }],
    ['/tv', { fragment: 'shows.html', title: 'TV Shows' }],
    ['/shows', { fragment: 'shows.html', title: 'TV Shows' }],
    ['/music', { fragment: 'music.html', title: 'Music' }],
    ['/books', { fragment: 'books.html', title: 'Books' }],
    ['/musicvideos', { fragment: 'musicvideos.html', title: 'Music Videos' }],
    ['/homevideos', { fragment: 'homevideos.html', title: 'Home Videos' }],
    ['/boxsets', { fragment: 'boxsets.html', title: 'Collections' }],
    ['/playlists', { fragment: 'playlists.html', title: 'Playlists' }],
    ['/mixed', { fragment: 'mixed.html', title: 'Mixed Media' }],
    ['/livetv', { fragment: 'livetv.html', title: 'Live TV' }],
    ['/mypreferencesmenu', { fragment: 'preferences-menu.html', title: 'Settings' }],
    ['/mypreferencesdisplay', { fragment: 'preferences-display.html', title: 'Display' }],
    ['/userprofile', { fragment: 'user-profile.html', title: 'Profile' }],
    ['/quickconnect', { fragment: 'quick-connect.html', title: 'Quick Connect' }],
    ['/video', { fragment: 'video.html', title: 'Now Playing', screenClass: 'is-flush' }]
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
        send(res, 404, '<h1>404 Not Found</h1><p>This mockup only has the authenticated user routes.</p>');
        return;
    }

    const fragment = readFragment(route.fragment);

    if (req.headers['hx-request'] === 'true') {
        send(res, 200, fragment);
        return;
    }

    const page = shell
        .replace('{{title}}', route.title)
        .replace('{{screen_class}}', route.screenClass ?? '')
        .replace('{{screen}}', fragment);

    send(res, 200, page);
});

const port = Number(process.env.PORT) || 4173;

server.listen(port, () => {
    console.log(`User routes mockup running at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop.');
});
