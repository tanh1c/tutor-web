---
layout: page
title: Deployment Guide
---

# HCMUT Tutor Platform - Deployment Guide

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free)
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select "Deploy from a branch"
4. Choose "gh-pages" branch
5. Your site will be available at: `https://yourusername.github.io/tutor-platform`

### Option 2: Vercel (Recommended - Free)
1. Connect your GitHub repository to Vercel
2. Import the project
3. Vercel will auto-detect Vite and deploy
4. Custom domain available

### Option 3: Netlify (Free)
1. Connect GitHub repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy automatically on every push

## 📦 Pre-deployment Checklist

- [x] Environment variables configured
- [x] Build optimization settings
- [x] Base URL configured for GitHub Pages
- [x] Error boundaries implemented
- [x] Performance optimizations applied

## 🔧 Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages (if configured)
npm run deploy
```

## 🌐 Environment Configuration

For production deployment, ensure:
1. API endpoints are correctly configured
2. Base URL matches your deployment URL
3. Environment variables are set properly

## 📈 Performance Optimizations

- Code splitting implemented
- Lazy loading for components
- Image optimization
- Bundle size optimization
- Caching strategies

## 🔒 Security Considerations

- Environment variables properly secured
- API keys not exposed in client code
- HTTPS enabled
- Content Security Policy configured