# HostShield frontend

Historical frontend code for a waiver-management product. The original product has closed; this repository is retained as a code example rather than an active service.

It contains a Next.js application with separate dashboard interfaces for users, lawyers and administrators, plus the product's marketing website.

## Application areas

- User registration, profile and account screens.
- Waiver creation, document views, signature interfaces and request/review flows.
- Booking-related views and separate user, lawyer and administrator layouts.
- Payment and subscription-related screens using Stripe client libraries.
- A marketing website with responsive layouts, SCSS and animation modules.

These are frontend implementations. Role-specific pages are not, by themselves, evidence of server-enforced access control or a complete payment system.

## Repository layout

| Directory | Contents |
| --- | --- |
| `hostshield-nextjs-app` | Next.js 11 / React 17 application, Redux state, Tailwind and SCSS |
| `hostshield-homepage` | Marketing site with JavaScript, SCSS, Gulp 4, GSAP and AOS |

The application uses the Next.js **Pages Router**. It is not an App Router project.

## Inspecting the application locally

The packages use a historical dependency stack. Use an isolated development environment compatible with their lockfiles; bringing the project onto a current framework/runtime is separate maintenance work.

```bash
git clone https://github.com/MeguMax/hosthield-develop.git
cd hosthield-develop/hostshield-nextjs-app
npm install
npm run dev
```

The development application runs on `http://localhost:3000`.

Business operations depend on an external backend that is not included here. For a local integration, update the API base URL in `utils.js` to a service you control. The variable is named `PUBLIC_API_KEY`, but its value is used as a base URL.

The package also defines `npm run build`, `npm start` and `npm run lint`. Its legacy production server in `server.js` binds to port 80, or port 443 when local TLS files are present. `npm run dev` is the simpler entry point for inspecting the interface.

## Marketing website

From the repository root:

```bash
cd hostshield-homepage
npm install
npm run dev
```

The homepage package also provides `npm run watch` and `npm run prod`. See its Gulp configuration for the development server and output locations.

## Scope and credits

This repository is useful for reviewing frontend flows, component structure and integration boundaries. It does not include the complete backend, an active deployment or a self-contained live payment environment.

Original package credits and metadata are preserved. The homepage tooling package credits Goran Vezmar and declares ISC licensing; the Next.js application package does not declare a license. The existing Next.js starter documentation remains in `hostshield-nextjs-app/README.md`.
