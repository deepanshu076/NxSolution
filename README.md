<div align="center">
<img width="1200" height="475" alt="NxSolution Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# NxSolution – Digital Solutions Platform

A comprehensive React + TypeScript + Supabase platform for managing domains, solutions, projects, products, and leads with a full-featured admin dashboard.

## 🎯 Features

### Public Pages

- **Home**: Landing page with service overview
- **Domains**: Browse solution domains and subdomains
- **Projects**: View portfolio projects
- **Products**: Explore products and services
- **Solutions**: Detailed solutions information
- **Contact**: Contact form for inquiries
- **Enquiry Form**: Quote and demo request forms

### Admin Dashboard

- **Domains Admin**: Create, read, update, delete domains and subdomains
- **Solutions Admin**: Manage solutions and related problems
- **Projects Admin**: Full project management with multimedia
- **Products Admin**: Product catalog management
- **Leads Admin**: Track and manage customer leads
- **Users Admin**: User role and profile management
- **Settings Admin**: System configuration and preferences

### Technical Features

- ✅ Supabase authentication & authorization
- ✅ Real-time data synchronization
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for responsive design
- ✅ Toast notifications & confirmation dialogs
- ✅ Protected routes with role-based access
- ✅ Vite for fast development & builds
- ✅ Express server for production deployments

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Supabase account

### Installation

1. **Clone and install:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   ```

   Add your Supabase credentials:

   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Run development server:**

   ```bash
   npm run dev
   ```

   App opens at `http://localhost:5173`

### Development Commands

| Command           | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server             |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview production build             |
| `npm run lint`    | Run TypeScript type-check            |
| `npm run server`  | Run Express server (production mode) |

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/          # Admin layout & modals
│   ├── auth/           # Authentication components
│   ├── home/           # Homepage components
│   ├── layout/         # Navbar, Footer
│   └── ui/             # Toast, ConfirmDialog
├── pages/
│   ├── admin/          # Admin CRUD pages
│   └── *.tsx           # Public pages
├── services/           # Supabase API layer
├── lib/
│   ├── AuthContext.tsx # Auth provider
│   ├── supabase.ts     # Supabase client
│   └── utils.ts        # Utilities
├── constants/          # Data constants
├── types/              # TypeScript interfaces
├── App.tsx             # Main routes
└── main.tsx            # Entry point
```

## 🗄️ Database Schema

### Tables (Supabase)

- **profiles**: User profiles (auto-created by Supabase Auth)
- **domains**: Solution domains
- **subdomains**: Domain subdomains
- **solutions**: Solution offerings
- **solution_problems**: Problems solved by solutions
- **projects**: Portfolio projects
- **products**: Product catalog
- **leads**: Customer leads
- **system_settings**: App configuration

See [DEPLOYMENT.md](./DEPLOYMENT.md) for schema setup SQL.

## 🔐 Authentication

- Supabase Auth (email/password)
- JWT tokens stored in localStorage
- Protected routes with `<ProtectedRoute>` wrapper
- Role-based access control (admin/user)

**Login credentials:**

- Email: Use your Supabase user email
- Password: Set during signup or password reset

## 📱 Pages & Routes

### Public Routes

- `/` – Home
- `/about` – About page
- `/domains` – Domains listing
- `/domains/:domain` – Domain detail
- `/projects` – Projects listing
- `/products` – Products listing
- `/solutions` – Solutions listing
- `/contact` – Contact form
- `/login` – Sign in
- `/signup` – Create account

### Protected Routes

- `/dashboard` – User dashboard
- `/enquiry` – Enquiry form
- `/get-quote` – Quote request
- `/book-demo` – Demo booking (Coming soon)

### Admin Routes (Protected)

- `/admin` – Dashboard
- `/admin/domains` – Domain management
- `/admin/solutions` – Solution management
- `/admin/projects` – Project management
- `/admin/products` – Product management
- `/admin/leads` – Lead management
- `/admin/users` – User management
- `/admin/settings` – System settings

## 🛠️ Tech Stack

| Layer             | Technology                              |
| ----------------- | --------------------------------------- |
| **Frontend**      | React 18 + TypeScript                   |
| **Styling**       | Tailwind CSS + Tailwind CSS Vite plugin |
| **Build**         | Vite 6                                  |
| **Backend**       | Express.js (Node.js)                    |
| **Database**      | Supabase (PostgreSQL)                   |
| **Auth**          | Supabase Auth                           |
| **UI Animations** | motion/react                            |
| **Icons**         | lucide-react                            |
| **HTTP**          | Fetch API                               |

## 📦 Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.4.5",
  "@supabase/supabase-js": "^2.48.0",
  "tailwindcss": "^3.4.1",
  "motion": "^11.11.0",
  "lucide-react": "^0.408.0",
  "typescript": "^5.5.2",
  "vite": "^6.4.2"
}
```

## 🚢 Deployment

For production deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy

```bash
# Build
npm run build

# Deploy to hosting (Vercel, Netlify, Railway, etc.)
# Upload contents of `dist/` folder OR
# Run: NODE_ENV=production node server.ts
```

## 🔍 Testing

### Type Checking

```bash
npm run lint
```

### Build Testing

```bash
npm run build
npm run preview
```

### Manual Testing Checklist

- [ ] Login/Signup flows work
- [ ] Admin CRUD operations (create, read, update, delete)
- [ ] Toast notifications display
- [ ] Confirm dialogs work
- [ ] Protected routes redirect properly
- [ ] Mobile responsiveness
- [ ] Performance (check bundle size warnings)

## 📋 Environment Variables

| Variable                 | Required | Default     | Purpose                      |
| ------------------------ | -------- | ----------- | ---------------------------- |
| `VITE_SUPABASE_URL`      | ✅       | -           | Supabase project URL         |
| `VITE_SUPABASE_ANON_KEY` | ✅       | -           | Supabase anonymous key       |
| `GEMINI_API_KEY`         | ❌       | -           | Google Gemini API (optional) |
| `NODE_ENV`               | ❌       | development | Environment mode             |

## 🐛 Troubleshooting

### "Cannot find module '@/src/...'"

- Run `npm install`
- Restart dev server

### "Supabase connection error"

- Verify env vars are correct
- Check Supabase project is active
- Ensure CORS is configured

### "Blank page on admin routes"

- Ensure you're logged in
- Check browser console for errors
- Verify admin role in profiles table

### Build warnings about chunk size

- This is normal for feature-rich apps
- Optimize with dynamic imports if needed
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for optimization tips

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) – Production setup & hosting options
- [.env.example](./.env.example) – Environment variable template
- [tsconfig.json](./tsconfig.json) – TypeScript configuration
- [vite.config.ts](./vite.config.ts) – Vite build configuration

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/my-feature`
4. Open a Pull Request

## 📄 License

Apache 2.0 – See [LICENSE](./LICENSE) file

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

## 📞 Support

For issues, questions, or suggestions:

- Check existing issues on GitHub
- Review documentation files
- Check the troubleshooting section above

---

**Version:** 1.0.0  
**Last Updated:** May 2026  
**Status:** Production Ready ✅
