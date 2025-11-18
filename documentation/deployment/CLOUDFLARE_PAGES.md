# Cloudflare Pages Deployment Guide

## Overview

QA Elevate Frontend is deployed on Cloudflare Pages, providing global CDN distribution, edge computing, and automatic deployments from GitHub.

## Prerequisites

- GitHub repository with your code
- Cloudflare account (free tier works)
- Domain name (optional, Cloudflare provides free subdomain)

## Deployment Steps

### 1. Connect GitHub Repository

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Pages** in the sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Authorize Cloudflare to access your GitHub account
6. Select the `qaelevate-frontend` repository
7. Click **Begin setup**

### 2. Configure Build Settings

```yaml
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: /
Node version: 18
```

### 3. Environment Variables

Add these in the Cloudflare Pages settings:

```bash
NEXT_PUBLIC_API_URL=https://api.qaelevate.com
NODE_VERSION=18
```

### 4. Compatibility Settings

Create `wrangler.toml` in the project root:

```toml
name = "qaelevate-frontend"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"

[env.production]
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]
```

### 5. Deploy

Click **Save and Deploy**

Cloudflare will:
- Clone your repository
- Install dependencies (`npm install`)
- Run build command (`npm run build`)
- Deploy to edge network
- Provide a URL: `qaelevate-frontend.pages.dev`

## Automatic Deployments

### Production Deployments

Every push to `main` branch triggers a production deployment:

```bash
git add .
git commit -m "feat: Add new feature"
git push origin main
```

Cloudflare automatically:
1. Detects the push
2. Starts build process
3. Deploys to production
4. Updates DNS

### Preview Deployments

Every pull request gets a unique preview URL:

```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
# Open PR on GitHub
```

Preview URL: `abc123.qaelevate-frontend.pages.dev`

## Configuration Files

### wrangler.toml

Essential configuration for Cloudflare Pages:

```toml
name = "qaelevate-frontend"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"

# Production environment
[env.production]
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

# Preview environment
[env.preview]
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]
```

### next.config.cjs

Next.js configuration for Cloudflare:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for Cloudflare Pages
  images: {
    unoptimized: true, // Cloudflare handles image optimization
  },
  trailingSlash: true, // Better compatibility with CDN
};

module.exports = nextConfig;
```

### vercel.json (for build compatibility)

```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next"
}
```

## Custom Domain Setup

### 1. Add Domain to Cloudflare

1. Go to **Pages** → Your project
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain: `app.qaelevate.com`
5. Click **Continue**

### 2. Update DNS

Cloudflare provides DNS records:

```
CNAME app qaelevate-frontend.pages.dev
```

Add this to your DNS settings.

### 3. SSL/TLS

Cloudflare automatically provisions SSL certificate:

- **Free SSL**: Automatically enabled
- **Universal SSL**: Covers `*.qaelevate.com`
- **Edge certificates**: Issued within minutes

## Performance Optimization

### Edge Caching

Cloudflare caches static assets globally:

```javascript
// next.config.cjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### Image Optimization

Use Cloudflare Images for optimization:

```typescript
// Use Cloudflare Image Resizing
const imageUrl = `https://app.qaelevate.com/cdn-cgi/image/width=800,quality=85/${originalUrl}`;
```

### Code Splitting

Next.js automatically splits code:

```typescript
// Dynamic imports for better performance
const Dashboard = dynamic(() => import('@/app/dashboard/page'), {
  loading: () => <Loading />,
});
```

## Monitoring

### Analytics

Enable Cloudflare Web Analytics:

1. Go to **Pages** → Your project
2. Click **Analytics**
3. Enable **Web Analytics**

View:
- Page views
- Unique visitors
- Geographic distribution
- Load times

### Build Logs

View build logs in Cloudflare Dashboard:

1. Go to **Pages** → Your project
2. Click **Deployments**
3. Click on any deployment
4. View **Build logs**

### Error Tracking

Monitor errors with Cloudflare:

```typescript
// Report errors to Cloudflare
window.addEventListener('error', (event) => {
  fetch('/__/errors', {
    method: 'POST',
    body: JSON.stringify({
      message: event.error.message,
      stack: event.error.stack,
    }),
  });
});
```

## Rollback

### Revert to Previous Deployment

1. Go to **Pages** → Your project
2. Click **Deployments**
3. Find successful deployment
4. Click **···** menu
5. Click **Rollback to this deployment**

### Git Rollback

```bash
git revert HEAD
git push origin main
```

Cloudflare automatically deploys the reverted version.

## Troubleshooting

### Build Failures

**Issue**: Build fails with "nodejs_compat not set"

**Solution**: Add to `wrangler.toml`:

```toml
compatibility_flags = ["nodejs_compat"]
```

**Issue**: Build fails with "Module not found"

**Solution**: Check `package.json` dependencies:

```bash
npm install
npm run build # Test locally first
```

### Deployment Issues

**Issue**: Changes not reflecting

**Solution**: Clear Cloudflare cache:

1. Go to **Caching** → **Configuration**
2. Click **Purge Everything**

**Issue**: 404 errors on routes

**Solution**: Add `_redirects` file:

```
/*    /index.html   200
```

### Performance Issues

**Issue**: Slow load times

**Solution**: Enable compression in `next.config.cjs`:

```javascript
const nextConfig = {
  compress: true,
  poweredByHeader: false,
};
```

## Environment-Specific Configuration

### Production

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.qaelevate.com
NEXT_PUBLIC_ENV=production
```

### Preview

```bash
# .env.preview
NEXT_PUBLIC_API_URL=https://api-preview.qaelevate.com
NEXT_PUBLIC_ENV=preview
```

### Development

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENV=development
```

## CI/CD Integration

### GitHub Actions (Optional)

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: qaelevate-frontend
          directory: .next
```

## Best Practices

### 1. Use Environment Variables

```typescript
// ❌ Bad: Hardcoded
const API_URL = 'https://api.qaelevate.com';

// ✅ Good: Environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

### 2. Optimize Images

```typescript
// ❌ Bad: Large images
<img src="/banner.png" />

// ✅ Good: Optimized with Cloudflare
<img src="/cdn-cgi/image/width=800,quality=85/banner.png" />
```

### 3. Cache Effectively

```typescript
// ❌ Bad: No caching
fetch('/api/data');

// ✅ Good: Cache with revalidation
fetch('/api/data', {
  next: { revalidate: 3600 } // 1 hour
});
```

### 4. Monitor Performance

- Enable Web Analytics
- Set up error tracking
- Monitor Core Web Vitals
- Review build logs regularly

## Cost Optimization

### Free Tier Limits

Cloudflare Pages Free Tier includes:

- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ 1 build at a time
- ✅ Free SSL
- ✅ Free DDoS protection

### Upgrade Considerations

Consider upgrading if:

- Need more than 500 builds/month
- Want concurrent builds
- Need advanced security features
- Require custom SSL certificates

## Summary

Deploying to Cloudflare Pages provides:

- **Global CDN**: Fast worldwide access
- **Automatic Deployments**: Push to deploy
- **Preview URLs**: Test before production
- **Free SSL**: Secure by default
- **DDoS Protection**: Built-in security
- **Analytics**: Monitor performance
- **Rollback**: Easy version management

---

**Deploy globally in minutes with Cloudflare Pages!** 🚀
