# முன்னூர் – மோளபாளையம் அருள்மிகு கல்யாண மரகதீஸ்வரர் திருக்கோயில்
## Arulmigu Kalyana Maragatheeswarar Temple — Full-Stack Application

Official production-ready, full-stack responsive web application for the historic Chola-era temple: **Arulmigu Kalyana Maragatheeswarar Temple**, situated in Munnur – Molapalayam, Tamil Nadu.

> *"கொங்கு நாட்டின் தொன்மையும் ஆன்மிகப் பெருமையும் கொண்ட திருத்தலம்"*

---

## 🌟 Architecture & Tech Stack

- **Frontend:** React 19, Tailwind CSS v4, React Router v7, Lucide Icons, Vite 8
- **Backend:** Node.js, Express 5, CORS, Dotenv, Mongoose
- **Database:** Local MongoDB (`mongodb://127.0.0.1:27017/temple_db`) with fallback & MongoDB Atlas cloud support
- **Mobile & Tablet Optimization:** Responsive layouts with quick thumb dock (`MobileBottomBar`), touch-friendly targets (48px+), viewport scaling, and tablet grid breakpoints
- **Admin Management Portal:** Dedicated management portal (`/admin`) for pooja requests, inquiries, live notices, and temple settings

---

## 📱 Mobile & Tablet Features

1. **Mobile Bottom Quick Bar (`MobileBottomBar.jsx`):**
   - Automatically appears on mobile phones and tablets (`<1024px`)
   - 1-tap thumb navigation for **Home**, **Book Pooja**, **Festivals**, **Instant Call** (`tel:+919585554005`), and **Google Maps Directions**
   - Built with iOS/Android safe-area insets (`env(safe-area-inset-bottom)`)
2. **Responsive Typography & Inputs:**
   - 16px font-size on all mobile inputs to prevent iOS automatic zoom
   - `inputMode="tel"`, `inputMode="email"` for automatic keyboard switching
3. **Adaptive Grids:**
   - Single column on smartphones (`<640px`)
   - Two columns on small/medium tablets (`640px - 1024px`)
   - Three/Four columns on desktops (`1024px+`)
4. **Touch-friendly Navigation Drawer:**
   - Smooth slide-out mobile drawer with quick call button and direct access to the Temple Admin Portal

---

## 🗄️ Database & Backend Endpoints

### Local MongoDB Connection
The application connects automatically to your local MongoDB service:
```
mongodb://127.0.0.1:27017/temple_db
```
*(Configurable via `MONGODB_URI` in `.env`)*

### API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server and MongoDB connection health status |
| `POST` | `/api/pooja-bookings` | Create new Pooja / Sankalpam booking |
| `GET` | `/api/pooja-bookings` | List all bookings (search & filter by status) |
| `GET` | `/api/pooja-bookings/lookup/:query` | Lookup booking by reference ID or phone number |
| `PATCH` | `/api/pooja-bookings/:id/status` | Update booking status (`Pending`, `Confirmed`, `Completed`, `Cancelled`) |
| `DELETE` | `/api/pooja-bookings/:id` | Delete booking record |
| `POST` | `/api/contacts` | Submit devotee inquiry / contact message |
| `GET` | `/api/contacts` | List inquiries (filter by status/purpose) |
| `PATCH` | `/api/contacts/:id/status` | Mark inquiry status (`New`, `In Review`, `Resolved`) |
| `GET` | `/api/announcements` | Get active announcements for live public notice board |
| `POST` | `/api/announcements` | Create new temple announcement / event notice |
| `DELETE` | `/api/announcements/:id` | Remove announcement |
| `GET` | `/api/settings` | Get live temple settings (darshan timings, festival date) |
| `PUT` | `/api/settings` | Update temple settings directly in MongoDB |

---

## ⚙️ Quick Start

### 1. Prerequisites
Ensure your local MongoDB service is running:
```powershell
# Windows PowerShell check
Get-Service -Name "*mongo*"
```

### 2. Environment Configuration
The `.env` file is pre-configured for local development:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/temple_db
NODE_ENV=development
```

### 3. Seed Initial Database Records
Populates sample announcements, pooja bookings, devotee inquiries, and default settings:
```bash
npm run seed
```

### 4. Run Full Stack in Development
Runs both the Express API server (port 5000) and the Vite frontend (port 5173 with proxy):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Access on Mobile Phone & Tablet (Same Wi-Fi)
Vite and Express are configured to listen on `0.0.0.0` (all local network interfaces).
To test on your physical phone or tablet:
1. Find your computer's local IP address (`ipconfig` on Windows, e.g. `192.168.1.5`).
2. Open Safari / Chrome on your phone or tablet connected to the same Wi-Fi.
3. Visit:
   ```
   http://192.168.1.X:5173
   ```
   or the production server on:
   ```
   http://192.168.1.X:5000
   ```

---

## 🚢 Production Build & Deployment

### Build and Run Standalone (Single Node Process)
Vite builds the optimized frontend into `dist/`, and Express automatically serves both the API and the static assets:
```bash
# 1. Build client bundle
npm run build

# 2. Start production server
npm start
```
Your entire full stack application is now running live on [http://localhost:5000](http://localhost:5000)!

### Deploy to Cloud (Render / Railway / VPS / Docker)
1. **Container Deployment (Docker):**
   A production-ready `Dockerfile` and `.dockerignore` are included:
   ```bash
   docker build -t temple-website .
   docker run -p 5000:5000 -e MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/temple_db" temple-website
   ```
2. **Platform as a Service (Render / Railway):**
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `MONGODB_URI` = Your MongoDB Atlas connection string
     - `NODE_ENV` = `production`
     - `PORT` = `5000`

---

## 🛕 Admin Management Portal
Navigate to `/admin` or click the **⚙️ நிர்வாகம் (Admin)** button in the navigation bar to access the Temple Management Dashboard:
- Review and approve devotee Pooja and Sankalpam requests.
- Verify devotee inquiries and prayer requests.
- Publish live announcements and festival alerts that display immediately on the homepage.
- Modify annual festival dates and confirmed daily darshan timings.
