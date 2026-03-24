# 🧠 Backend Setup Guide

Complete guide for setting up and running the backend API server.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Text editor (VS Code recommended)

## Installation

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

This installs all required packages:
- `express`: Web framework for building the API
- `cors`: Enable cross-origin requests
- `dotenv`: Manage environment variables
- `jsonwebtoken`: JWT authentication
- `bcryptjs`: Password encryption
- `multer`: Handle file uploads
- `uuid`: Generate unique IDs

### 3. Create Environment File
```bash
cp .env.example .env
```

Edit `.env` and configure:
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET=your_random_secret_key_here
```

## Running the Backend

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

You should see:
```
✅ Backend running on http://localhost:5000
📁 Data directory: /path/to/backend/src/data
```

## Project Structure

```
backend/
├── src/
│   ├── server.js           # Main server
│   ├── routes/
│   │   ├── profile.js      # GET profile endpoints
│   │   ├── experience.js   # GET experience endpoints
│   │   ├── projects.js     # GET projects endpoints
│   │   ├── publications.js # GET publications endpoints
│   │   └── admin.js        # Admin/CMS endpoints
│   └── data/
│       ├── profile.json        # Your profile data
│       ├── experience.json     # Work experience
│       ├── projects.json       # Projects/research
│       └── publications.json   # Papers/publications
├── package.json
├── .env.example
└── uploads/               # Future file uploads
```

## API Endpoints

### Public Endpoints (No Authentication Needed)

#### Get Profile
```
GET /api/profile
Response: { firstName, lastName, title, bio, social, stats, ... }
```

#### Get All Experiences
```
GET /api/experience
Response: [ { id, role, organization, period, responsibilities }, ... ]
```

#### Get All Projects
```
GET /api/projects
Response: [ { id, title, category, description, tags, ... }, ... ]
```

#### Get All Publications
```
GET /api/publications
Response: [ { id, title, authors, journal, year, doi, ... }, ... ]
```

#### Health Check
```
GET /api/health
Response: { status: "OK", timestamp: "2026-03-24T..." }
```

### Admin Endpoints (Require Authentication)

#### Login
```bash
POST /api/admin/login
Body: { "password": "your_admin_password" }
Response: { "token": "eyJhbGci...", "message": "Login successful" }
```

Use the token in subsequent requests:
```
Authorization: Bearer eyJhbGci...
```

#### Update Profile
```bash
PUT /api/admin/profile
Headers: { "Authorization": "Bearer TOKEN" }
Body: { "firstName": "Hanik", "title": "Water Engineer", ... }
Response: { "message": "Profile updated", "data": {...} }
```

#### Add/Update Experience
```bash
POST /api/admin/experience
Headers: { "Authorization": "Bearer TOKEN" }
Body: { "role": "...", "organization": "...", "period": "...", ... }
Response: { "message": "Experience item saved", "data": {...} }
```

#### Delete Experience
```bash
DELETE /api/admin/experience/exp-001
Headers: { "Authorization": "Bearer TOKEN" }
Response: { "message": "Experience item deleted" }
```

**Similar endpoints exist for projects and publications**

## Data Files

### profile.json Structure
```json
{
  "id": "profile-001",
  "firstName": "Hanik",
  "lastName": "Lakhe",
  "title": "Water Engineer & Hydrologist",
  "email": "hlakhe123.hl@gmail.com",
  "phone": "+66 96 520 9584",
  "location": "Pathum Thani, Thailand",
  "bio": "Graduate student with 5+ years research experience",
  "avatar": "/uploads/profile-photo.jpg",
  "social": {
    "linkedin": "https://linkedin.com/in/hanik-lakhe",
    "researchgate": "https://researchgate.net/profile/Hanik-Lakhe"
  },
  "stats": [
    { "number": "250+", "label": "Research Hours" },
    { "number": "15+", "label": "Publications" }
  ]
}
```

### experience.json Structure
```json
[
  {
    "id": "exp-001",
    "period": "Jun 2025 – Present",
    "role": "Student Research Assistant",
    "organization": "Global Water and Sanitation Centre (GWSC), AIT",
    "location": "Pathum Thani, Thailand",
    "current": true,
    "description": "Managing geospatial datasets...",
    "responsibilities": [
      "Prepare and manage geospatial datasets...",
      "Generate ArcGIS/QGIS maps..."
    ]
  }
]
```

### projects.json Structure
```json
[
  {
    "id": "proj-001",
    "title": "Flood Risk Assessment in Northern Thailand",
    "category": "Hydrological Modelling",
    "description": "Developed SWAT models...",
    "status": "In Progress",
    "tags": ["SWAT", "Hydrology", "GIS"],
    "image": "/uploads/project-001.jpg",
    "details": {
      "objectives": ["..."],
      "methods": ["..."],
      "outcomes": ["..."]
    }
  }
]
```

### publications.json Structure
```json
[
  {
    "id": "pub-001",
    "title": "Suspended Sediment Dynamics in Himalayan Rivers...",
    "authors": "Hanik Lakhe, Dr. Jane Smith, et al.",
    "year": 2026,
    "journal": "EGUsphere",
    "volume": "2024",
    "pages": "1-20",
    "doi": "10.5194/egusphere-2024-xyz",
    "url": "https://doi.org/10.5194/egusphere-2024-xyz"
  }
]
```

## Authentication Flow

1. **Login**: User sends password → Backend verifies → Returns JWT token
2. **Store Token**: Frontend stores token in localStorage
3. **Authenticated Requests**: Frontend sends token in `Authorization` header
4. **Token Validation**: Backend checks token validity → Allows/denies access
5. **Auto Logout**: Token expires in 24 hours for security

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment type | development/production |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `ADMIN_PASSWORD` | Password for admin panel | secure_password_123 |
| `JWT_SECRET` | Secret key for JWT signing | random_secret_key |

## Testing Endpoints

### Using cURL

```bash
# Get profile
curl http://localhost:5000/api/profile

# Get experiences
curl http://localhost:5000/api/experience

# Login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"your_password"}'

# Update profile (requires token from login)
curl -X PUT http://localhost:5000/api/admin/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"firstName":"Hanik"}'
```

### Using Postman

1. Import the API endpoints
2. Set BASE_URL variable: `http://localhost:5000`
3. Test public endpoints first
4. Test admin login to get token
5. Use token for authenticated endpoints

## Troubleshooting

### Port 5000 Already in Use

```bash
# Find and kill process on port 5000 (macOS/Linux)
lsof -i :5000
kill -9 <PID>

# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Module Not Found Error

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### CORS Errors

Make sure `FRONTEND_URL` in `.env` matches your frontend URL:
```
FRONTEND_URL=http://localhost:3000
```

### JWT Token Expired

Tokens expire in 24 hours. User needs to login again to get a new token.

## File Management

### Add Profile Photo

1. Place image in `uploads/` folder
2. Update `profile.json`:
```json
{
  "avatar": "/uploads/profile-photo.jpg"
}
```

### Upload Directory

Create `uploads/` folder for future file uploads:
```bash
mkdir uploads
```

## Performance Tips

1. **Caching**: Responses are fast (JSON parsing is quick)
2. **Compression**: Consider adding gzip middleware for production
3. **Rate Limiting**: Add rate limiting for public endpoints if needed
4. **Pagination**: Add pagination for large lists in the future

## Security Checklist

- ✅ Change `ADMIN_PASSWORD` from default
- ✅ Use strong `JWT_SECRET` (random 32+ char string)
- ✅ Set `NODE_ENV=production` in production
- ✅ Use HTTPS in production (provided by hosting)
- ✅ Keep `.env` file private (already in .gitignore)
- ✅ Update dependencies regularly: `npm update`

## Next Steps

1. Customize data files with your information
2. Test all endpoints locally
3. Deploy to production (Vercel, Railway, etc.)
4. Update headers/CORS for production deployment

---

**Need help?** Check the main README.md for full documentation.
