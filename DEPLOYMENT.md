# 🚀 Deployment Guide

Complete step-by-step guide to deploy your website to the internet.

## Quick Comparison

| Platform | Cost | Setup Time | Difficulty | Best For |
|----------|------|-----------|-----------|----------|
| **Vercel** | Free | 5 min | Easy | Frontend + Backend |
| **Railway** | Free tier | 5 min | Easy | Backend (Render for frontend) |
| **Render** | Free tier | 5 min | Easy | Backend (Vercel for frontend) |
| **Docker + VPS** | $5+/month | 30 min | Medium | Full control |

---

## ✅ Option 1: Vercel (RECOMMENDED - FREE)

Best for most users. Automatic deployment from GitHub, free tier, fast CDN.

### Step 1: Prepare GitHub Repository

```bash
# Initialize git (if not done)
cd personal-website
git init

# Create .gitignore (already included)
git add .
git commit -m "Initial commit: Personal website with CMS"

# Create repository on GitHub
# 1. Go to github.com/new
# 2. Name: personal-website
# 3. Public (optional)
# 4. Create repository

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/personal-website.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from backend directory
cd backend
vercel

# Follow prompts:
# 1. Link to your Vercel account (login/signup)
# 2. Project name: personal-website-backend
# 3. Framework: Other
# 4. Root: ./ (current directory)
```

**Set Environment Variables in Vercel Dashboard:**

1. Go to https://vercel.com/dashboard
2. Select `personal-website-backend` project
3. Settings → Environment Variables
4. Add:
   - `ADMIN_PASSWORD` = your secure password
   - `JWT_SECRET` = random 32-character string
   - `NODE_ENV` = production
   - `FRONTEND_URL` = your frontend URL (e.g., https://personal-website.vercel.app)

### Step 3: Deploy Frontend to Vercel

```bash
# Deploy from frontend directory
cd frontend
vercel

# Follow prompts:
# 1. Project name: personal-website
# 2. Framework: Vite
# 3. Root: ./ (current directory)
```

**Set Environment Variables:**

1. Go to frontend project settings on Vercel
2. Environment Variables
3. Add:
   - `VITE_API_URL` = Your backend URL (e.g., https://personal-website-backend.vercel.app/api)

### Step 4: Update Backend URL in Frontend

At the end, Vercel will give you URLs:
- **Backend URL**: `https://personal-website-backend.vercel.app`
- **Frontend URL**: `https://personal-website.vercel.app`

Update in Vercel dashboard:

**Backend Settings:**
```
FRONTEND_URL=https://personal-website.vercel.app
```

**Frontend Settings:**
```
VITE_API_URL=https://personal-website-backend.vercel.app/api
```

### Step 5: Test Production

1. Visit https://personal-website.vercel.app
2. Check if data loads correctly
3. Try admin panel
4. Test contact form

✅ **Done! Your website is live!**

---

## ✅ Option 2: Railway (Backend) + Vercel (Frontend)

Railway handles backend deployment automatically from GitHub.

### Backend Deployment to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project → GitHub repo
4. Select `personal-website` repository
5. Add environment variables:
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `FRONTEND_URL`
6. Railway auto-deploys! 🚀

**Get your Railway Backend URL:**
- It will be something like: `https://your-project.railway.app`
- Add `/api` for API endpoint: `https://your-project.railway.app/api`

### Frontend Deployment to Vercel

Follow the Vercel steps above, but use:
```
VITE_API_URL=https://your-project.railway.app/api
```

---

## ✅ Option 3: Render (Backend) + Vercel (Frontend)

Similar to Railway.

1. Go to https://render.com
2. Sign up with GitHub
3. New service → GitHub repo
4. Runtime: Node
5. Build command: `npm install && npm run build`
6. Start command: `node src/server.js`
7. Add environment variables
8. Deploy!

---

## 🐳 Option 4: Docker + Self-Hosted VPS

For full control, use Docker on DigitalOcean, Linode, or similar.

### Build Docker Image

```bash
cd backend
docker build -t personal-website-backend:latest .
```

### Push to Docker Hub

```bash
# Create account at docker.com
docker login

# Tag image
docker tag personal-website-backend:latest YOUR_USERNAME/personal-website-backend:latest

# Push
docker push YOUR_USERNAME/personal-website-backend:latest
```

### Deploy on VPS (DigitalOcean Example)

```bash
# SSH into VPS
ssh root@your-vps-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Run container
docker run -d \
  -p 5000:5000 \
  -e ADMIN_PASSWORD=your_password \
  -e JWT_SECRET=your_secret \
  -e NODE_ENV=production \
  YOUR_USERNAME/personal-website-backend:latest
```

---

## 🌐 Custom Domain Setup

### Option A: Use Vercel Domain

Free `.vercel.app` domain included.

### Option B: Bind Custom Domain

1. Buy domain from Namecheap, GoDaddy, etc.
2. In Vercel Settings → Domains
3. Add custom domain
4. Update DNS records at your registrar
5. Wait 24-48 hours for propagation

**Example DNS Records:**
```
A record: 76.76.19.21 (Vercel IP)
CNAME: www → yoursite.vercel.app
```

---

## 📊 Monitoring & Maintenance

### Check Health

```bash
# Frontend
curl https://your-frontend.vercel.app

# Backend
curl https://your-backend.vercel.app/api/health

# Response: { "status": "OK", "timestamp": "..." }
```

### View Logs

**Vercel:**
- Dashboard → Project → Deployments → View logs

**Railway:**
- Dashboard → Project → Deployments → Logs

**Render:**
- Service → Logs

### Auto-Deployment

Both Vercel and Railway auto-deploy when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update content"
git push origin main

# Wait ~2-5 minutes
# Deployment complete!
```

---

## 🔐 Security Checklist

Before going live:

- ✅ Changed admin password from default
- ✅ Generated strong JWT_SECRET
- ✅ Set NODE_ENV=production
- ✅ Configured CORS with correct frontend URL
- ✅ Used HTTPS (automatic on Vercel/Railway/Render)
- ✅ Updated admin login page warning/rate limiting

---

## ⚡ Performance Tips

### Frontend Optimization
```bash
# Build size check
npm run build
# Look at dist/ folder size

# Optimize images
# Use WebP format
# Compress with TinyPNG or similar
# Use responsive images
```

### Backend Optimization
- JSON files are fast for small projects
- Add Redis caching if needed
- Database migration to MongoDB for large scale

### Monitor Performance
- Vercel Analytics (free tier)
- Google PageSpeed Insights
- Railway metrics

---

## 🐛 Troubleshooting Deployment

### Frontend shows "Cannot connect to API"

**Check:**
1. Is backend deployed and running?
2. Is `VITE_API_URL` correct in frontend?
3. Is CORS configured correctly in backend?
4. Check browser console for exact error (F12)

**Fix in Vercel:**
1. Go to frontend settings
2. Verify `VITE_API_URL` environment variable
3. Trigger redeploy: Deployments → ... → Redeploy

### Backend not responding

**Check:**
1. Is environment variables set?
2. Are logs showing errors?
3. Is `FRONTEND_URL` correct?

**Fix:**
```bash
# View live logs
vercel logs
# or
railway logs
```

### CORS Error

**Error in browser console**: "Access to XMLHttpRequest blocked by CORS policy"

**Fix in backend:**
```javascript
// backend/src/server.js
const FRONTEND_URL = process.env.FRONTEND_URL;
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
```

Then redeploy with correct `FRONTEND_URL`.

---

## 📈 Post-Deployment

### Share Your Website

1. **LinkedIn**: Update URL in profile
2. **Email signature**: Add website link
3. **Resume/CV**: Include portfolio URL
4. **Twitter/Social**: Share announcement
5. **GitHub**: Add to profile README

### Analytics

Add Google Analytics (optional):

**frontend/index.html:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 🎉 Deployment Checklist

- ✅ Code pushed to GitHub
- ✅ Backend deployed (Vercel/Railway/Render)
- ✅ Frontend deployed (Vercel)
- ✅ Environment variables configured
- ✅ API URL correctly set in frontend
- ✅ Website accessible at public URL
- ✅ Admin panel working
- ✅ Contact form functional
- ✅ Navigation links working
- ✅ Responsive design tested on mobile
- ✅ Custom domain configured (if desired)
- ✅ Website shared with network

---

## 💡 Next Improvements

After initial launch:

1. **Email on Contact**: Nodemailer for contact form
2. **Analytics**: Google Analytics or Hotjar
3. **CDN Images**: Cloudinary for image hosting
4. **Database**: MongoDB for scalability
5. **Comments**: Add Disqus for projects
6. **Blog Section**: Add markdown blog
7. **Dark Mode**: CSS theme switcher
8. **API Docs**: Swagger/OpenAPI documentation

---

## 🆘 Need Help?

**Can't deploy?** Check:
1. GitHub repository is public
2. All files committed and pushed
3. Environment variables are set
4. Node version is 18+
5. Backend runs locally first

**Still stuck?** Create GitHub issue with error logs!

---

**Congratulations! 🎉 Your website is live on the internet!**

Share it with the world and start getting opportunities! 🚀

---

Last Updated: March 24, 2026
