# 🌐 Hanik Lakhe - Personal Website

A modern, professional personal website with a **Content Management System (CMS)** backend that allows you to manage your CV, projects, publications, and experience through an admin dashboard without touching code.

## 📋 Features

✅ **Modern Responsive Design** - Works beautifully on mobile, tablet, and desktop
✅ **Content Management System** - Update your content from a user-friendly admin panel
✅ **Fast & Optimized** - React frontend with Vite for optimal performance
✅ **Professional Layout** - Multiple sections: Home, About, Experience, Projects, Publications, Contact
✅ **Easy to Deploy** - Ready-to-deploy to Vercel (free tier), Railway, Render, or any Node.js host
✅ **API-First Architecture** - Separate frontend and backend for scalability
✅ **No Database Needed Initially** - Uses JSON files (can migrate to MongoDB later)
✅ **Admin Authentication** - Secure admin panel with password protection

---

## 🗂️ Project Structure

```
personal-website/
├── backend/                    # Node.js/Express API server
│   ├── src/
│   │   ├── server.js          # Main server file
│   │   ├── routes/            # API endpoints
│   │   │   ├── profile.js
│   │   │   ├── experience.js
│   │   │   ├── projects.js
│   │   │   ├── publications.js
│   │   │   └── admin.js       # CMS/admin endpoints
│   │   └── data/              # JSON data files
│   │       ├── profile.json
│   │       ├── experience.json
│   │       ├── projects.json
│   │       └── publications.json
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile             # For containerization
│
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── Hero.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Publications.jsx
│   │   │   └── Contact.jsx
│   │   ├── admin/             # Admin panel
│   │   │   └── AdminPanel.jsx
│   │   ├── App.jsx            # Main app
│   │   ├── main.jsx           # Entry point
│   │   └── styles             # CSS modules
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
└── README.md                   # This file
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js 18+** installed ([download](https://nodejs.org))
- **npm** or **yarn** package manager
- **Git** for version control

### Step 1: Clone & Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Edit .env and set your admin password
# ADMIN_PASSWORD=your_secure_password_here
# JWT_SECRET=your_random_secret_key

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000` ✅

### Step 2: Setup Frontend

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000` ✅

### Step 3: Access Admin Panel

Open your browser and navigate to:
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Login Password**: Use the password you set in `.env`

---

## 📝 Data Structure & How to Edit Content

### Profile (`backend/src/data/profile.json`)
Contains your main profile information:
```json
{
  "firstName": "Hanik",
  "lastName": "Lakhe",
  "title": "Water Engineer & Hydrologist",
  "email": "your@email.com",
  "bio": "...",
  "social": {
    "linkedin": "https://...",
    "researchgate": "https://..."
  }
}
```

### Experience (`backend/src/data/experience.json`)
Array of work experiences:
```json
[
  {
    "id": "exp-001",
    "role": "Job Title",
    "organization": "Company Name",
    "period": "Jan 2025 - Present",
    "responsibilities": ["Task 1", "Task 2"]
  }
]
```

### Projects (`backend/src/data/projects.json`)
Array of projects you've worked on:
```json
[
  {
    "id": "proj-001",
    "title": "Project Name",
    "category": "Research",
    "description": "...",
    "tags": ["Python", "GIS"]
  }
]
```

### Publications (`backend/src/data/publications.json`)
Array of your publications:
```json
[
  {
    "id": "pub-001",
    "title": "Paper Title",
    "authors": "You, Co-author",
    "journal": "Journal Name",
    "year": 2025,
    "doi": "10.xxxx/..."
  }
]
```

---

## 🎛️ Admin Panel - Content Management

### How to Update Content

1. **Go to Admin Panel**: http://localhost:3000/admin
2. **Login** with your admin password
3. **Choose a section**: Profile, Experience, Projects, Publications
4. **Edit content** in the friendly form interface
5. **Click "Save"** - changes take effect immediately!

### From Admin Panel You Can:
- ✏️ Edit your profile information
- ✏️ Add/Edit/Delete work experiences
- ✏️ Add/Edit/Delete projects
- ✏️ Add/Edit/Delete publications
- 📸 Upload profile photo (when implemented)

---

## 🌐 Deployment Guide

### Option 1: Vercel (Recommended - FREE)

**Deploy Backend to Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# From backend directory
cd backend
vercel
# Follow prompts, set environment variables in Vercel dashboard
```

**Deploy Frontend to Vercel:**
```bash
# From frontend directory
cd frontend
vercel
# Update VITE_API_URL to your backend URL in .env
```

### Option 2: Railway (FREE tier available)

Railway auto-deploys from GitHub with minimal setup:
1. Push code to GitHub
2. Connect GitHub repo to Railway
3. Add environment variables
4. Done!

### Option 3: Render (FREE tier available)

Similar to Railway:
1. GitHub + Render connection
2. Auto-deploys on push
3. Set environment variables
4. Done!

### Option 4: Docker + Self-hosted

```bash
# Build Docker image
cd backend
docker build -t personal-website-backend .

# Run container
docker run -p 5000:5000 -e ADMIN_PASSWORD=secure personal-website-backend
```

---

## 🔐 Security Best Practices

1. **Change Admin Password**: Set a strong password in `.env`
2. **Use HTTPS**: Always use HTTPS in production (provided by Vercel/Railway/Render)
3. **Environment Variables**: Never commit `.env` file (already in `.gitignore`)
4. **JWT Tokens**: Tokens expire in 24 hours for security
5. **CORS**: Backend only accepts requests from your frontend URL

---

## 📱 Customization Guide

### Change Colors & Fonts

Edit `frontend/src/index.css`:
```css
:root {
  --primary: #0d8a8a;        /* Main teal color */
  --primary-dark: #0a6e6e;
  --secondary: #b8924a;      /* Accent gold */
  --font-serif: 'Playfair Display';
  --font-sans: 'Inter';
}
```

### Add New Sections

1. Create new data file in `backend/src/data/`
2. Create API route in `backend/src/routes/`
3. Create React component in `frontend/src/components/`
4. Import and use in `frontend/src/App.jsx`

### Customize Navigation

Edit `Navigation.jsx` to add more links:
```jsx
<li><a href="#your-section">Your Section</a></li>
```

---

## 🧪 API Documentation

### Public Endpoints

```
GET /api/profile              - Get profile info
GET /api/experience           - Get all experiences
GET /api/projects             - Get all projects
GET /api/publications         - Get all publications
GET /api/health               - Health check
```

### Admin Endpoints (Require Authentication)

```
POST /api/admin/login         - Login (returns JWT token)
PUT /api/admin/profile        - Update profile
POST /api/admin/experience    - Add/update experience
DELETE /api/admin/experience/:id
POST /api/admin/projects      - Add/update project
DELETE /api/admin/projects/:id
POST /api/admin/publications  - Add/update publication
DELETE /api/admin/publications/:id
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Make sure Node.js 18+ is installed
node --version

# Check if port 5000 is available
npm run dev
```

### Frontend can't connect to backend
- Check VITE_API_URL in frontend `.env`
- Make sure backend is running on port 5000
- Check CORS settings in `backend/src/server.js`

### Admin panel not working
- Clear browser cache & cookies
- Check admin password in backend `.env`
- Look at browser console for errors

---

## 📚 Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret_key
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Dependencies

### Backend
- **express**: Web framework
- **cors**: Cross-origin requests
- **jwt**: Authentication
- **bcryptjs**: Password hashing
- **multer**: File uploads
- **uuid**: Unique IDs

### Frontend
- **react**: UI library
- **react-router-dom**: Navigation
- **axios**: HTTP client
- **vite**: Build tool

---

## 🎯 Next Steps

1. ✅ Run locally and test all features
2. ✅ Update all your CV data in JSON files
3. ✅ Add your professional photo
4. ✅ Customize colors and fonts
5. ✅ Push code to GitHub
6. ✅ Deploy frontend to Vercel
7. ✅ Deploy backend to Vercel/Railway/Render
8. ✅ Set custom domain (optional)
9. ✅ Share with the world! 🚀

---

## 📞 Support & Further Development

### To Add Features Like:
- Database (MongoDB): Replace JSON file logic with DB queries
- Email notifications: Add nodemailer for contact form
- Photo uploads: Implement file upload handling
- Blog section: Add new routes and components
- Analytics: Integrate Google Analytics

Each of these is straightforward to add! Follow the same pattern as existing sections.

---

## 📄 License

This project is open source under MIT License. Feel free to customize and use for your personal website.

---

## 🎉 You Did It!

Your professional personal website is now ready! Time to:
- Share with potential employers/collaborators
- Add to your resume/CV
- Use in your email signature
- Share on LinkedIn, Twitter, etc.

**Live Preview**: Once deployed, your website will be accessible to the world! 🌍

---

**Last Updated**: March 24, 2026
**Created for**: Hanik Lakhe
**Maintained**: Yes ✓
