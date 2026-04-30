# KBC Radio App

React/Vite frontend for the KBC listening experience.

## Environment

The frontend reads Strapi from `VITE_API_URL`.

For local development, `src/api/strapi.js` falls back to `http://localhost:1337`
when `VITE_API_URL` is not set.

For Netlify, set this environment variable before building:

```text
VITE_API_URL=https://your-strapi-service.onrender.com
```

Do not use `http://localhost:1337` in Netlify. Browser requests from the deployed
site would try to reach the visitor's own computer instead of the Render Strapi
service.
