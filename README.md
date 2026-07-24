# 🎨 Foliofy — Developer Portfolio CMS & Hosting Platform

**Your portfolio, your subdomain. Live in minutes.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-5.0-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC.svg)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development Setup](#local-development-setup)
  - [Environment Variables](#environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Performance](#-performance)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)

---

## 🌟 Overview

**Foliofy** is a multi-tenant portfolio hosting platform that lets developers create, manage, and deploy beautiful portfolio websites — no coding required. Users get a dedicated subdomain (e.g., `amanda.foliofy.com`), a powerful admin dashboard to manage content, and a public-facing portfolio site with customizable themes.

Built as a full-stack SaaS product, Foliofy demonstrates production-grade patterns: JWT authentication, multi-tenancy via subdomain routing, server-side state management, file upload handling, and automated deployment with Nginx and Gunicorn.

### Why Foliofy?

- **Zero-config portfolios:** Sign up, fill in your details, and your portfolio is live at your chosen subdomain.
- **Full control:** Edit every section — hero, about, skills, projects, blog — from a clean admin dashboard.
- **Themable:** Switch between multiple themes with a single click. Build your own theme by extending the system.
- **Blog engine:** Write and publish blog posts in Markdown. They appear on your portfolio instantly.
- **Multi-tenant architecture:** One codebase serves thousands of unique portfolios, each isolated by subdomain.
- **Production-ready:** Deployed with HTTPS, wildcard DNS, PostgreSQL, and Nginx reverse proxy.

---

## ✨ Features

### 🔐 Authentication & Multi-Tenancy
- JWT-based authentication with automatic token refresh
- Self-service registration with subdomain selection
- Profile auto-creation via Django signals
- Tenant identification via subdomain middleware

### 🎛️ Admin Dashboard (React SPA)
- Secure login/registration flow
- Profile management with avatar & resume upload
- CRUD operations for skills, projects, and blog posts
- Markdown editor with live preview
- Drag-and-drop project reordering (coming soon)
- Dashboard overview with stats cards

### 🌐 Public Portfolio Renderer
- Subdomain-based routing (e.g., `username.foliofy.com`)
- Multiple theme support (Default, Dark, Minimal)
- Responsive design for all device sizes
- SEO-friendly with dynamic meta tags
- Blog with Markdown rendering
- Social media links integration
- Downloadable resume

### ⚙️ Backend (Django REST Framework)
- RESTful API with ViewSets and routers
- Object-level permissions (users can only edit their own data)
- File upload handling (avatars, project images, resumes)
- Automatic slug generation for blog posts
- Public API endpoints for portfolio data
- Rate limiting and CORS protection
- Admin panel for superuser management

### 🚀 DevOps & Deployment
- Nginx reverse proxy with wildcard subdomain support
- Gunicorn application server with systemd service
- PostgreSQL database for production
- Let's Encrypt SSL with auto-renewal
- Static file serving via Nginx
- Environment-based configuration

---

## 🏗️ Architecture
┌──────────────────────────────────────────────────────────────┐
│ INTERNET │
│ │
│ foliofy.com ──────────────┐ amanda.foliofy.com ─────┐ │
│ │ │ │
└─────────────────────────────┼────────────────────────────┼────┘
│ │
▼ ▼
┌─────────────────────────────────────────┐
│ NGINX │
│ ┌─────────────┐ ┌──────────────────┐ │
│ │ Admin SPA │ │ Portfolio SPA │ │
│ │ (React) │ │ (React) │ │
│ └─────────────┘ └──────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ /api/* /api/public/* │
│ │ │ │
│ └────────┬───────────┘ │
│ ▼ │
│ ┌───────────────┐ │
│ │ Gunicorn │ │
│ │ (WSGI Server)│ │
│ └───────┬───────┘ │
│ │ │
│ ▼ │
│ ┌───────────────┐ │
│ │ Django + DRF │ │
│ │ (API Server) │ │
│ └───────┬───────┘ │
│ │ │
│ ▼ │
│ ┌───────────────┐ │
│ │ PostgreSQL │ │
│ │ (Database) │ │
│ └───────────────┘ │
└─────────────────────────────────────────┘


### Data Flow

1. **Admin User** logs in at `foliofy.com` → Nginx serves Admin SPA → SPA calls `/api/*` → Nginx proxies to Gunicorn → Django authenticates via JWT → Returns user-scoped data
2. **Visitor** goes to `amanda.foliofy.com` → Nginx serves Portfolio SPA → SPA calls `/api/public/*` → TenantMiddleware identifies `amanda` → Returns public portfolio data
3. **Registration** → User chooses subdomain → Backend creates User (username = subdomain) + Profile → Returns JWT tokens → Immediate dashboard access

### Key Design Decisions

- **Subdomain = Username:** Simplifies tenant identification. The middleware looks up the user by the subdomain directly.
- **Two Separate SPAs:** Admin and Portfolio are separate React apps. This keeps bundle sizes small and responsibilities clear.
- **Unix Socket Communication:** Gunicorn and Nginx communicate via a Unix socket, which is faster and more secure than TCP localhost.
- **Signals for Profile Creation:** Using Django's `post_save` signal ensures every User always has a Profile, preventing edge cases.

---

## 🛠️ Tech Stack

| Layer                | Technology                                      |
|----------------------|-------------------------------------------------|
| **Frontend (Admin)** | React 18, React Router, TanStack Query, React Hook Form, Zod, Tailwind CSS, Axios |
| **Frontend (Portfolio)** | React 18, React Router, TanStack Query, React Markdown, Tailwind CSS |
| **Backend**          | Django 5.0, Django REST Framework, SimpleJWT, Pillow |
| **Database**         | PostgreSQL 16 (production), SQLite (development) |
| **Web Server**       | Nginx                                           |
| **WSGI Server**      | Gunicorn                                        |
| **Authentication**   | JWT (access + refresh tokens)                   |
| **DevOps**           | Systemd, Let's Encrypt, Certbot                 |

---

## 📸 Screenshots

> *Add screenshots of your application here. Suggested captures:*
> - Login page
> - Registration page with subdomain preview
> - Admin dashboard home with stats cards
> - Profile editing form
> - Projects management page
> - Blog editor with Markdown preview
> - Public portfolio (Default theme)
> - Public portfolio (Dark theme)
> - Blog post view
> - Mobile responsive view

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10+** with `pip` and `venv`
- **Node.js 18+** with `npm`
- **PostgreSQL 16** (for production; SQLite works for local development)
- **Git**

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/foliofy.git
cd foliofy


2. Backend Setup (Django)
bash

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Create superuser (for admin access)
python manage.py createsuperuser

# Start development server
python manage.py runserver

The API is now running at http://localhost:8000.
3. Admin Dashboard Setup (React)
bash

cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

The admin dashboard is at http://localhost:5173.
4. Portfolio Renderer Setup (React)
bash

cd portfolio-renderer

# Install dependencies
npm install

# Start development server
npm run dev

The portfolio renderer is at http://localhost:5174.
5. Configure Local Subdomains (Optional)

To test multi-tenancy locally, add entries to your hosts file:
text

# /etc/hosts (Linux/macOS) or C:\Windows\System32\drivers\etc\hosts (Windows)
127.0.0.1   testuser.foliofy.com
127.0.0.1   amanda.foliofy.com

Then access http://testuser.foliofy.com:5174 to see the portfolio for user testuser.
Environment Variables

Create a .env file in the project root for local development (or export these variables):
bash

# Django Settings
DJANGO_SECRET_KEY=your-secret-key-here
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,.foliofy.com

# Database (for production PostgreSQL)
DB_NAME=foliofy
DB_USER=foliofy_user
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174

For the React apps, create .env files:

frontend/.env:
text

VITE_API_URL=http://localhost:8000/api

portfolio-renderer/.env:
text

VITE_API_URL=/api/public

📚 API Documentation
Authentication Endpoints
Method	Endpoint	Description	Auth Required
POST	/api/token/	Obtain JWT access & refresh tokens	No
POST	/api/token/refresh/	Refresh expired access token	No
POST	/api/register/	Register new user with profile	No
Authenticated Admin Endpoints (require JWT)
Method	Endpoint	Description
GET/POST	/api/profiles/	List/Create profile
GET/PUT/PATCH/DELETE	/api/profiles/{id}/	Retrieve/Update/Delete profile
GET/POST	/api/skills/	List/Create skills
GET/PUT/PATCH/DELETE	/api/skills/{id}/	Retrieve/Update/Delete skill
GET/POST	/api/projects/	List/Create projects
GET/PUT/PATCH/DELETE	/api/projects/{id}/	Retrieve/Update/Delete project
GET/POST	/api/blogposts/	List/Create blog posts
GET/PUT/PATCH/DELETE	/api/blogposts/{id}/	Retrieve/Update/Delete blog post
Public Portfolio Endpoints (no auth)
Method	Endpoint	Description
GET	/api/public/portfolio/	Get full portfolio data for current tenant
GET	/api/public/blog/	List published blog posts for current tenant
GET	/api/public/blog/{slug}/	Get single published blog post by slug
Request/Response Examples
<details> <summary><b>POST /api/register/</b></summary>

Request:
json

{
  "username": "amanda_j",
  "email": "amanda@example.com",
  "password": "securepass123",
  "password2": "securepass123",
  "subdomain": "amanda",
  "full_name": "Amanda Johnson"
}

Response (201):
json

{
  "access": "eyJhbGciOiJIUzI1NiIs...",
  "refresh": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "amanda",
    "email": "amanda@example.com",
    "full_name": "Amanda Johnson",
    "subdomain": "amanda"
  }
}

</details>
📁 Project Structure
text

foliofy/
├── config/                    # Django project configuration
│   ├── settings.py            # Main settings (dev/prod via env vars)
│   ├── urls.py                # Root URL routing
│   └── wsgi.py                # WSGI entry point for Gunicorn
│
├── core/                      # Main Django app
│   ├── models.py              # User, Profile, Skill, Project, BlogPost models
│   ├── serializers.py         # Admin API serializers + RegisterSerializer
│   ├── serializers_public.py  # Public API serializers
│   ├── views.py               # Admin ViewSets + RegisterView
│   ├── views_public.py        # Public portfolio & blog views
│   ├── urls.py                # Admin API routes
│   ├── urls_public.py         # Public API routes
│   ├── middleware.py           # TenantMiddleware (subdomain detection)
│   └── admin.py               # Django admin registration
│
├── frontend/                  # Admin Dashboard React SPA
│   ├── src/
│   │   ├── api/axios.js       # Axios instance with JWT interceptors
│   │   ├── context/AuthContext.jsx  # Authentication state management
│   │   ├── hooks/             # TanStack Query hooks
│   │   │   ├── useProfile.js
│   │   │   ├── useProjects.js
│   │   │   ├── useSkills.js
│   │   │   └── useBlogPosts.js
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route pages
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardHome.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── ProjectsPage.jsx
│   │   │   ├── SkillsPage.jsx
│   │   │   └── BlogPage.jsx
│   │   └── App.jsx            # Root component with routing
│   └── package.json
│
├── portfolio-renderer/        # Public Portfolio React SPA
│   ├── src/
│   │   ├── api/axios.js       # Axios instance (relative URLs)
│   │   ├── hooks/             # Portfolio & blog data hooks
│   │   ├── themes/            # Theme definitions
│   │   │   ├── default.js
│   │   │   ├── dark.js
│   │   │   └── minimal.js
│   │   ├── components/        # Portfolio sections
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/             # Portfolio pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── BlogListPage.jsx
│   │   │   └── BlogPostPage.jsx
│   │   └── App.jsx            # Root component with routing
│   └── package.json
│
├── requirements.txt           # Python dependencies
├── manage.py                  # Django management script
├── .gitignore
└── README.md                  # You are here!

🚢 Deployment
Production Architecture

See the Deployment Guide for detailed step-by-step instructions.

Quick overview:

    Provision a VPS (Ubuntu 22.04 recommended, minimum 1GB RAM)

    Install dependencies: Python, Node.js, Nginx, PostgreSQL, Certbot

    Clone repository and set up environment variables

    Build React SPAs: npm run build for both frontend apps

    Configure Gunicorn as a systemd service

    Configure Nginx with wildcard subdomain support

    Set up SSL with Let's Encrypt

    Configure DNS with wildcard A record pointing to VPS

Domain Configuration
Type	Name	Value	TTL
A	@	your-server-ip	3600
CNAME	www	foliofy.com	3600
A	*	your-server-ip	3600
🧪 Testing
Backend Tests
bash

# Run Django tests
python manage.py test

# Run with coverage
coverage run manage.py test
coverage report

Frontend Tests
bash

# Admin dashboard tests
cd frontend
npm test

# Portfolio renderer tests
cd portfolio-renderer
npm test

API Testing

Import the provided Postman collection for manual API testing.
⚡ Performance

    Lighthouse Score: 95+ on portfolio pages

    Bundle Size: ~150KB (admin), ~80KB (portfolio) gzipped

    API Response Time: <100ms for cached queries

    Time to First Byte: <200ms via Nginx static serving

    Database Queries: Optimized with select_related and prefetch_related

🔒 Security

    JWT tokens with configurable expiration (default: access 30min, refresh 1 day)

    CORS restricted to known origins

    HTTPS enforced via Let's Encrypt SSL

    Passwords hashed with Django's PBKDF2 algorithm

    SQL injection protection via Django ORM

    XSS protection via React's automatic escaping

    CSRF protection for Django admin

    Object-level permissions prevent cross-user data access

    File upload validation (type and size limits)

    Rate limiting on public endpoints (configurable via DRF throttling)

Security Headers (Nginx)
nginx

add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

🗺️ Roadmap
Phase 1 — Core Platform (Completed ✅)

    ☑

    User authentication with JWT
    ☑

    Profile, Skills, Projects, Blog CRUD
    ☑

    Admin dashboard
    ☑

    Public portfolio renderer
    ☑

    Subdomain-based multi-tenancy
    ☑

    Theme system (3 themes)

Phase 2 — Enhanced Features (In Progress 🚧)

    □

    Email verification on registration
    □

    Password reset flow
    □

    Drag-and-drop project reordering
    □

    Custom theme builder
    □

    Analytics dashboard (page views, visitor map)

Phase 3 — Monetization (Planned 📋)

    □

    Stripe subscription integration
    □

    Custom domain support
    □

    Premium themes
    □

    Portfolio analytics export
    □

    Team/agency accounts

Phase 4 — Advanced (Planned 📋)

    □

    CI/CD pipeline with GitHub Actions
    □

    Docker containerization
    □

    Kubernetes deployment
    □

    CDN integration for static assets
    □

    Internationalization (i18n)

🤝 Contributing

Contributions are welcome! Please read our Contributing Guide for details on our code of conduct and the process for submitting pull requests.
Development Workflow

    Fork the repository

    Create a feature branch: git checkout -b feature/amazing-feature

    Commit your changes: git commit -m 'Add amazing feature'

    Push to the branch: git push origin feature/amazing-feature

    Open a Pull Request

Code Style

    Python: Follow PEP 8 — use black for formatting

    JavaScript: Follow Airbnb Style Guide — use prettier for formatting

    Commit Messages: Follow Conventional Commits

📄 License

This project is licensed under the MIT License — see the LICENSE file for details.
🙏 Acknowledgments

    Django REST Framework — The backbone of our API

    TanStack Query — Beautiful server state management

    Tailwind CSS — Utility-first CSS that changed the game

    React Hook Form — Performant form handling

    Zod — TypeScript-first schema validation

    SimpleJWT — JWT for DRF

    Let's Encrypt — Free SSL for everyone

📞 Contact

Project Maintainer: [Your Name]

    GitHub: @yourusername

    Email: your.email@example.com

    Portfolio: yourusername.foliofy.com

Found a bug? Open an issue

Have a question? Start a discussion
<p align="center"> <b>Built with ❤️ using Django, React, and countless late nights.</b> </p><p align="center"> <sub>If this project helped you, consider giving it a ⭐️</sub> </p> ```