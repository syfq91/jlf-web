# Public routes mockup

Visual-only htmx mockup of the **1. Public Routes (Unauthenticated)** section in
[`SCREEN_FEATURES_INVENTORY.md`](../../SCREEN_FEATURES_INVENTORY.md).

The layout follows the existing Jellyfin screens — centered standalone auth card,
profile list, server list, recovery steps — but the visual language is intentionally
different. Icons are from [Lucide](https://lucide.dev/) and screen navigation uses
[htmx](https://htmx.org/).

## Run it

```bash
node mockups/public-routes/serve.mjs
```

Open <http://localhost:4173>.

The sidebar switches between the mocked screens with `hx-get`, `hx-target`, and
`hx-push-url`, so each screen also works as a direct URL.

## Screens

| Screen | URL |
|---|---|
| Profile picker (`/login`) | `/login` |
| Manual sign-in | `/login/manual` |
| Quick Connect | `/quickconnect` |
| Add server | `/addserver` |
| Select server | `/selectserver` |
| Forgot password | `/forgotpassword` |
| PIN reset | `/forgotpasswordpin` |

## Notes

- Forms are intentionally inert. Submitting one shows a "visual mockup" toast.
- The PIN inputs auto-advance and support paste for preview purposes.
- htmx, Lucide, and the web fonts are loaded from CDNs, so the first load needs network access.
- Server responses return HTML fragments, not JSON. The tiny `serve.mjs` only serves
  the mockup files and injects the active fragment into the shell for direct URLs.
