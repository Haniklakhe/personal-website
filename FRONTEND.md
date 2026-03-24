# ⚛️ Frontend Setup Guide

Complete guide for setting up and running the React frontend.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend running on http://localhost:5000

## Installation

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

Dependencies:
- `react`: UI library
- `react-dom`: React DOM rendering
- `react-router-dom`: Page routing
- `axios`: HTTP client for API calls
- `vite`: Build tool and dev server

### 3. Create Environment File
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

## Running the Frontend

### Development Mode
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build
```bash
npm run build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navigation.jsx   # Top navigation bar
│   │   ├── Hero.jsx         # Hero section
│   │   ├── About.jsx        # About me section
│   │   ├── Experience.jsx   # Work experience
│   │   ├── Projects.jsx     # Projects showcase
│   │   ├── Publications.jsx # Publications list
│   │   ├── Contact.jsx      # Contact form
│   │   └── *.module.css     # Component styles
│   ├── admin/               # Admin panel
│   │   ├── AdminPanel.jsx
│   │   └── AdminPanel.css
│   ├── pages/              # Page components
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   ├── index.css           # Global styles
│   └── App.css
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── package.json
├── .env.example
└── .gitignore
```

## Component Overview

### Navigation (`Navigation.jsx`)
- Fixed header with logo
- Links to sections: Home, About, Experience, Projects, Publications, Contact
- Mobile-responsive burger menu

### Hero (`Hero.jsx`)
- Homepage hero section
- Profile picture, name, title
- Status badges (current positions)
- Quick stats (publications, years, GPA, etc.)
- Call-to-action buttons

### About (`About.jsx`)
- Biography section
- Skills grouped by category: Technical, Programming, Languages
- Contact information
- Social media links

### Experience (`Experience.jsx`)
- Timeline of work experiences
- Sorted by current status first
- Shows period, role, organization, description, responsibilities
- Visual indicator for current jobs

### Projects (`Projects.jsx`)
- Grid layout of projects
- Shows title, category, description, tags
- Hover effects for interactivity
- Status badges (In Progress, Completed)

### Publications (`Publications.jsx`)
- Grouped by year (newest first)
- Links to DOI/URL
- Shows authors, journal, venue
- Publication type badges

### Contact (`Contact.jsx`)
- Contact form with fields: name, email, subject, message
- Direct contact info: email, phone, location
- Form validation and success message

## Styling

### CSS Architecture
- Global styles in `index.css` (colors, fonts, basic elements)
- Component-scoped styles using CSS modules (`Component.module.css`)
- Design system with CSS variables:

```css
:root {
  --primary: #0d8a8a;        /* Teal */
  --primary-dark: #0a6e6e;
  --secondary: #b8924a;      /* Gold */
  --accent: #2a9d6e;         /* Green */
  --font-serif: 'Playfair Display';
  --font-sans: 'Inter';
  --font-mono: 'JetBrains Mono';
}
```

### Customizing Design

**Change color scheme** in `src/index.css`:
```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
}
```

**Change fonts** in `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont');

:root {
  --font-serif: 'Your Font';
}
```

## API Integration

### How Data Flows

1. **App.jsx** fetches data from backend API:
```javascript
useEffect(() => {
  const fetchData = async () => {
    const profile = await axios.get('/api/profile');
    const experience = await axios.get('/api/experience');
    // ...set state
  };
  fetchData();
}, []);
```

2. **Components receive data as props**:
```jsx
<Hero profile={profile} />
<Experience items={experience} />
```

3. **Components render the data**:
```jsx
<h1>{profile.firstName} {profile.lastName}</h1>
```

### Adding New Sections

1. **Create component** (`src/components/NewSection.jsx`):
```jsx
export default function NewSection({ data }) {
  return <section>...</section>;
}
```

2. **Export styles** (`src/components/NewSection.module.css`)

3. **Import in App.jsx**:
```jsx
import NewSection from './components/NewSection';
```

4. **Fetch from API** in App's useEffect:
```jsx
const newData = await axios.get('/api/new-data');
```

5. **Render in return**:
```jsx
<NewSection data={newData} />
```

## Admin Panel

### Access Admin Panel
```
http://localhost:3000/admin
```

### Admin Features
- Login with password
- Edit profile information
- Add/Edit/Delete experiences
- Add/Edit/Delete projects
- Add/Edit/Delete publications
- Real-time updates (no page rebuild needed)

### How It Works
1. User enters admin password
2. Backend returns JWT token
3. Token stored in localStorage
4. All admin requests include token in header
5. Changes saved to JSON files on backend

## Performance Optimization

### Built-in Optimizations
- ✅ React 18 with fast rendering
- ✅ Vite for super-fast builds
- ✅ Code splitting (components loaded as needed)
- ✅ CSS modules (no style conflicts)

### Additional Tips
```javascript
// Lazy load components for large pages
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// Use React.memo to prevent unnecessary re-renders
const MemoizedComponent = React.memo(MyComponent);

// Optimize images
// Use WebP format, compress, use appropriate sizes
```

## Responsive Design

All components are mobile-first and responsive:

**Breakpoints:**
- Mobile: < 600px
- Tablet: 600px - 900px
- Desktop: > 900px

Test responsiveness:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes

## Environment Variables

### `.env` Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Backend API URL | http://localhost:5000/api |

### Using Environment Variables in Code

```javascript
const API_BASE = import.meta.env.VITE_API_URL;

axios.get(`${API_BASE}/profile`);
```

### Different Environments

**Development (.env.development)**:
```
VITE_API_URL=http://localhost:5000/api
```

**Production (.env.production)**:
```
VITE_API_URL=https://api.yoursite.com/api
```

## Building for Production

### Generate Optimized Build
```bash
npm run build
```

This creates `dist/` folder with optimized JavaScript, CSS, and HTML.

### Preview Production Build
```bash
npm run preview
```

### Deploy Build

Move `dist/` folder to your hosting (Vercel, Netlify, etc.)

## Form Handling

### Contact Form
The contact form in `Contact.jsx` currently:
1. Validates input
2. Shows success message
3. Clears form

To actually send emails:
1. Install `nodemailer` in backend
2. Create email endpoint
3. Connect form to that endpoint

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  await axios.post('/api/contact', formData);
};
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- --port 3001
```

### Backend Not Connecting
- Check `VITE_API_URL` in `.env`
- Verify backend is running on port 5000
- Check browser console for errors (F12)

### Styles Not Loading
```bash
# Clear cache and rebuild
rm -rf node_modules
npm install
npm run dev
```

### State Updates Not Showing
- Check if component is receiving props
- Add console.log to verify data:
```javascript
useEffect(() => {
  console.log('Profile received:', profile);
}, [profile]);
```

## Browser DevTools

### React DevTools Extension
1. Install [React DevTools](https://react-devtools-tutorial.vercel.app)
2. Inspect component hierarchy
3. View props and state
4. Time render performance

### Network Tab
Monitor API calls:
1. Open DevTools (F12)
2. Go to Network tab
3. Make requests
4. Check response times and payloads

## SEO Optimization

### Current SEO Setup
- Meta description in `index.html`
- Semantic HTML (h1, h2, section, article)
- Mobile responsive
- Fast loading times

### Future SEO Improvements
```html
<!-- Add to index.html -->
<meta name="keywords" content="water engineer, hydrologist, research">
<meta name="author" content="Hanik Lakhe">
<meta property="og:title" content="Hanik Lakhe">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
```

## Accessibility

### Current Features
- Semantic HTML
- Color contrast meets WCAG standards
- Keyboard navigation support
- Mobile accessible

### Test Accessibility
1. Use Google Lighthouse (DevTools > Lighthouse)
2. Run axe DevTools browser extension
3. Test with screen readers

## Next Steps

1. Test all components locally
2. Verify API integration
3. Customize styles and content
4. Build for production
5. Deploy to Vercel/Netlify

---

**Need help?** Check the main README.md for full documentation.
