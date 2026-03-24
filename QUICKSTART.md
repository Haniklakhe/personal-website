# ⚡ QUICKSTART - Get Your Website Running in 10 Minutes

## 🎯 Goal: Website running locally by end of this guide

### Videos & Resources
- Tutorial: (Add YouTube link when ready)
- GitHub: (Link to your repo)
- Support: (Contact email if needed)

---

## 📦 Prerequisites (5 minutes)

Before starting, download and install:
1. **Node.js 18+**: https://nodejs.org/
2. **Git**: https://git-scm.com/
3. **VS Code** (optional): https://code.visualstudio.com/

**Verify installation:**
```bash
node --version    # Should show v18+
npm --version
git --version
```

---

## 🚀 Start Your Website (5 minutes)

### Terminal 1: Start Backend

```bash
cd personal-website/backend
npm install
cp .env.example .env
# Edit .env and set: ADMIN_PASSWORD=admin
npm run dev
```

✅ See: `✅ Backend running on http://localhost:5000`

### Terminal 2: Start Frontend

```bash
cd personal-website/frontend
npm install
npm run dev
```

✅ Browser opens: http://localhost:3000

---

## 🌐 View Your Website

### 1. Homepage
```
http://localhost:3000
```
You should see:
- Hero section with your name
- Navigation bar
- Full page layout

### 2. Admin Panel
```
http://localhost:3000/admin
```

Login with password: `admin`

Update your content in real-time!

---

## 📝 Update Your Content (while running)

### Option A: Edit JSON Files Directly

**Profile**: `backend/src/data/profile.json`
```json
{
  "firstName": "YOUR NAME",
  "email": "your@email.com",
  "bio": "Your bio here"
}
```

**Experience**: `backend/src/data/experience.json`
Add your work history

**Projects**: `backend/src/data/projects.json`
Add your projects

**Publications**: `backend/src/data/publications.json`
Add your papers

Changes appear instantly on the website! 🔄

### Option B: Use Admin Panel

1. Go to http://localhost:3000/admin
2. Login with password
3. Edit sections
4. Click Save
5. Done!

---

## 🎨 Customize Colors & Design

Edit `frontend/src/index.css`:

```css
:root {
  --primary: #0d8a8a;  /* Change this to your color */
  --secondary: #b8924a;
}
```

Colors:
- Teal (#0d8a8a) - Current primary
- Gold (#b8924a) - Current secondary  
- Green (#2a9d6e) - Accent

Pick your favorite from:
- https://coolors.co
- https://color-hex.com

---

## 🌐 Deploy Online (Free!)

### Vercel (Recommended)

1. Push to GitHub:
```bash
cd personal-website
git add .
git commit -m "First commit"
git remote add origin https://github.com/YOURNAME/personal-website
git push -u origin main
```

2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repo
5. Deploy!

**Then deploy backend:**
```bash
cd backend
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard:
```
ADMIN_PASSWORD=your_password
JWT_SECRET=random_key
```

✅ Your website is now LIVE! 🎉

---

## 🆘 Quick Troubleshooting

### Website blank or loading
- Check browser console (F12)
- Is backend running?
- Is frontend running?

### Admin login not working
- Did you set ADMIN_PASSWORD in .env?
- Correct URL: http://localhost:3000/admin
- Try password: `admin`

### Styles look wrong
- Hard refresh: Ctrl+Shift+R
- Clear cache: Ctrl+Shift+Delete

### Can't start backend
```bash
# Try this:
npm install
npm run dev

# If port error:
npm run dev -- --port 5001
```

---

## 📚 Full Guides

For detailed information:

- **README.md** - Complete project documentation
- **BACKEND.md** - Backend setup & API details
- **FRONTEND.md** - Frontend components & styling
- **DEPLOYMENT.md** - Deploy to production

---

## ✅ Next Steps

1. ✅ **Running locally?** → Read the full README.md
2. ✅ **Want to deploy?** → Follow DEPLOYMENT.md
3. ✅ **Customize design?** → Check FRONTEND.md
4. ✅ **Update content?** → Use admin panel
5. ✅ **Share with world!** → Send link to portfolio

---

## 🎯 Success Checklist

- [ ] Backend running on 5000
- [ ] Frontend running on 3000
- [ ] Website loads at localhost:3000
- [ ] Can see hero section
- [ ] Admin panel accessible
- [ ] Can login with admin password
- [ ] Can edit content and see changes
- [ ] Navigation links work

---

## 🤔 Common Questions

**Q: How do I add my photo?**
A: Put image in `backend/uploads/` and update `profile.json` with path.

**Q: How do I change colors?**
A: Edit CSS variables in `frontend/src/index.css`

**Q: Can I change the layout?**
A: Yes! Edit components in `frontend/src/components/`

**Q: How do I add email notifications?**
A: Install nodemailer in backend, create email route. See BACKEND.md

**Q: Is this mobile friendly?**
A: Yes! Test by resizing browser or opening on phone.

---

## 🚀 Ready to Deploy?

```bash
# 1. Make sure everything works locally
npm run dev  # in both backend and frontend

# 2. Push to GitHub
git push origin main

# 3. Go to vercel.com and import project
# 4. Done!
```

---

## 📞 Need Help?

- ❌ Nothing works? → Clear everything and start fresh
- ❌ Port conflicts? → Use different ports (-port 5001)
- ❌ Still stuck? → Check the detailed README.md

---

**You're all set! Happy sharing your portfolio! 🎉**

*Last Updated: March 24, 2026*
