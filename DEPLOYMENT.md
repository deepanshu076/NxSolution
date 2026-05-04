# Deployment & Build Guide for NxSolution

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn package manager
- Supabase account with project set up

## Environment Setup

### 1. Create `.env.local` file

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### 2. Required Environment Variables

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Gemini API (for AI features)
GEMINI_API_KEY=your-gemini-key-here
```

**Get these values from:**

- **Supabase URL & Key**: Project Settings → API in Supabase Dashboard
- **Gemini API Key**: Google Cloud Console (if using AI features)

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:5173` (Vite default)

### 3. Run Type Checking

```bash
npm run lint
```

## Production Build

### 1. Build for Production

```bash
npm run build
```

This generates optimized assets in the `dist/` directory.

### 2. Preview Production Build Locally

```bash
npm run preview
```

## Deployment Options

### Option A: Node.js Server (Express + Vite)

**Recommended for full-stack deployment**

#### Build Steps:

```bash
npm install --production
npm run build
NODE_ENV=production node server.ts
```

#### Environment Variables (Production):

Set these on your hosting platform:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `NODE_ENV=production`

#### Hosting Platforms:

- **Heroku**: `npm install -g heroku-cli` then `git push heroku main`
- **Railway**: Connect GitHub repo, set env vars
- **Render**: Similar to Railway, connect GitHub
- **DigitalOcean App Platform**: Upload repo and configure
- **AWS EC2**: SSH into instance, clone repo, run Node server
- **Azure App Service**: Deploy via Azure CLI or GitHub Actions

#### Server Configuration:

- Port: `3000` (configurable via env var)
- Health check endpoint: `/api/health`
- Static files served from `dist/`
- SPA fallback: `GET *` → `index.html`

### Option B: Static Hosting (SPA)

**For platforms that only serve static files**

#### Build Steps:

```bash
npm run build
```

#### Upload Contents:

Upload everything from `dist/` directory to your static hosting.

#### Hosting Platforms:

- **Vercel**: Connect GitHub, auto-deploys on push
- **Netlify**: Connect GitHub, auto-deploys on push
- **GitHub Pages**: Upload to `gh-pages` branch
- **AWS S3 + CloudFront**: Upload to S3, configure CloudFront
- **Azure Static Web Apps**: Connect GitHub repo
- **Firebase Hosting**: Use Firebase CLI to deploy

#### Configuration:

- Set environment variables in platform UI
- Configure SPA routing (fallback to `index.html` for all routes)
- Enable compression (gzip)

## Database Migrations

### Supabase Schema Setup

Required tables in your Supabase project:

```sql
-- Profiles (auto-created by Supabase Auth)
-- Used for user info and roles

-- System Settings Table
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_name TEXT DEFAULT 'NxSolution',
  app_description TEXT,
  support_email TEXT,
  support_phone TEXT,
  timezone TEXT DEFAULT 'UTC',
  currency TEXT DEFAULT 'USD',
  max_file_upload_mb INTEGER DEFAULT 10,
  maintenance_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

Run this SQL in your Supabase SQL editor to set up the system_settings table.

## Performance Optimization

### 1. Bundle Size Warnings

Current build: ~914 kB (237 kB gzipped)

To reduce bundle size:

- Use dynamic imports for heavy components
- Implement route-based code splitting
- Enable Vite's `manualChunks` in vite.config.ts

### 2. Recommended Vite Config Enhancements

```javascript
// vite.config.ts
export const rollupOptions = {
  output: {
    manualChunks: {
      react: ["react", "react-dom"],
      supabase: ["@supabase/supabase-js"],
      motion: ["motion/react"],
    },
  },
};
```

### 3. Enable Compression

On your server/CDN, enable gzip compression for:

- `.js`, `.css`, `.html`, `.json` files

## Security Checklist

- [ ] All sensitive keys in `.env.local` (not committed to git)
- [ ] `.env.local` added to `.gitignore`
- [ ] Supabase RLS policies configured for auth
- [ ] CORS configured if using separate domain for API
- [ ] SSL/TLS enabled on production server
- [ ] No hardcoded secrets in source code
- [ ] npm dependencies up-to-date (`npm audit`)

## Monitoring & Logging

### Health Check Endpoint

```bash
curl http://your-domain/api/health
```

Response: `{ "status": "ok", "timestamp": "2026-05-04T..." }`

### Log Aggregation

Set up logging from:

- Server logs (Express)
- Client console errors (Sentry, LogRocket)
- Supabase logs (Dashboard → Logs)

## Troubleshooting

### Build Issues

**"Cannot find module '@/src/...'"**

- Verify `tsconfig.json` paths configuration
- Run `npm install`

**TypeScript errors on deploy**

- Run `npm run lint` locally first
- Check Node version compatibility

### Runtime Issues

**Supabase Connection Error**

- Verify env vars are set correctly
- Check Supabase project is active
- Ensure CORS is configured

**Blank page / 404 on SPA routes**

- Ensure server redirects all routes to `index.html`
- Check Express static middleware configuration

## Rollback Plan

1. Keep previous deployment tag: `git tag v1.0.0`
2. On failure, deploy previous version: `git checkout v1.0.0`
3. Or maintain blue-green deployment on your platform

## CI/CD Example (GitHub Actions)

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run lint
      - run: npm run build
      - name: Deploy to production
        run: # Your deployment command here
```

## Support & Resources

- **Vite Docs**: https://vitejs.dev/
- **React Docs**: https://react.dev/
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
