# Architecture & Design

## Overview

NxSolution follows a **three-tier architecture** pattern:

```
┌─────────────────────────────────────┐
│      Presentation Layer (React)     │
│    Pages, Components, UI Primitives │
└────────────────┬────────────────────┘
                 │
┌─────────────────▼────────────────────┐
│      Service Layer (TypeScript)      │
│  Business Logic, Data Formatting     │
└────────────────┬────────────────────┘
                 │
┌─────────────────▼────────────────────┐
│    Data Layer (Supabase/PostgreSQL)  │
│    Database, Authentication          │
└─────────────────────────────────────┘
```

## Directory Structure

### `/src/pages`

- **Responsibility**: Top-level route components
- **Pattern**: Each page is a route and manages its own state
- **Examples**: `Home.tsx`, `Domains.tsx`, `admin/DomainsAdmin.tsx`
- **Guidelines**:
  - Keep minimal business logic (defer to services)
  - Use hooks for state management
  - Import components for composition

### `/src/components`

- **Responsibility**: Reusable UI components
- **Structure**:
  - `admin/` – Admin-specific components (AdminLayout, modals)
  - `auth/` – Authentication UI (ProtectedRoute, Login wrapper)
  - `layout/` – Page layout components (Navbar, Footer)
  - `home/` – Homepage-specific sections
  - `ui/` – Primitive UI components (Toast, ConfirmDialog)
- **Guidelines**:
  - Small, focused components (< 200 lines)
  - Accept props for configuration
  - Handle presentation only; defer business logic to pages/services

### `/src/services`

- **Responsibility**: API abstraction layer for Supabase
- **Pattern**: One service file per entity
- **Examples**: `domains.service.ts`, `leads.service.ts`, `settings.service.ts`
- **Structure**:

  ```typescript
  export type DomainType = {
    /* ... */
  };

  export async function getDomains(): Promise<DomainType[]> {
    // Query logic
  }

  export async function createDomain(payload: DomainType) {
    // Insert logic
  }
  ```

- **Guidelines**:
  - Export both types and functions
  - Use async/await for all DB calls
  - Throw errors (don't swallow); let caller handle
  - No component imports; purely data logic

### `/src/lib`

- **Responsibility**: Core utilities and providers
- **Files**:
  - `AuthContext.tsx` – Supabase auth provider, session management
  - `supabase.ts` – Supabase client initialization
  - `utils.ts` – General helper functions
- **Guidelines**:
  - AuthContext provides `user` and `logout()` to entire app
  - Supabase client is singleton (import once, reuse everywhere)

### `/src/constants`

- **Responsibility**: Static data and configurations
- **Files**:
  - `domains.ts` – Hardcoded domains data
  - `projects.ts` – Sample projects
  - `solutions.ts` – Solution templates
- **Guidelines**:
  - Use for seed data, not dynamic data from API
  - Keep organized by entity

### `/src/types`

- **Responsibility**: Shared TypeScript interfaces
- **Pattern**: Centralized type definitions for entities
- **Examples**: `Project`, `Product`, `Lead`, `SystemSettings`
- **Guidelines**:
  - Define once, import everywhere
  - Keep aligned with database schema
  - Use for type safety across services and components

## Data Flow Patterns

### Reading Data (List/Detail)

```typescript
// Page component
export default function DomainsAdmin() {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    // 1. Call service
    listDomains()
      // 2. Update state
      .then(data => setDomains(data))
      // 3. Handle errors with toast
      .catch(err => toast.error(err.message));
  }, []);

  // 4. Render
  return <div>{domains.map(d => <DomainRow key={d.id} {...d} />)}</div>;
}

// Service
export async function listDomains() {
  const { data, error } = await supabase
    .from('domains')
    .select('*');
  if (error) throw error;
  return data as Domain[];
}
```

### Creating/Updating Data

```typescript
// Modal component
export default function DomainModal({ open, onClose, onUpdated }) {
  const [name, setName] = useState('');
  const save = async () => {
    try {
      // 1. Call service
      const result = await createDomain({ name });
      // 2. Notify parent of change
      onUpdated?.(result);
      // 3. Show success
      toast.success('Created!');
      // 4. Close modal
      onClose();
    } catch (err) {
      // 5. Show error
      toast.error(err.message);
    }
  };
  return <form onSubmit={save}>...</form>;
}

// Service
export async function createDomain(payload: Domain) {
  const { data, error } = await supabase
    .from('domains')
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data as Domain;
}
```

### Protected Routes

```typescript
// App.tsx
<Route path="/admin/*" element={
  <ProtectedRoute>
    <AdminLayout>
      {/* Admin routes */}
    </AdminLayout>
  </ProtectedRoute>
} />

// ProtectedRoute component
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" />;

  return children;
}
```

## State Management

### Local State (Component Level)

```typescript
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(false);
```

### Shared State (Global)

```typescript
// AuthContext provides user, logout across entire app
const { user, logout } = useAuth();
```

### No External State Manager

- ✅ React Context for auth
- ❌ Redux (kept minimal for simplicity)
- ❌ Zustand/Jotai (not needed yet)

## Error Handling

### Service Layer (Throws)

```typescript
export async function getUser(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error; // Throw, don't handle
  return data;
}
```

### Component Layer (Catches & Displays)

```typescript
try {
  const user = await getUser(id);
  setUser(user);
} catch (err) {
  toast.error(err.message); // Show to user
}
```

## Authentication Flow

1. **Signup/Login** → Supabase Auth creates JWT
2. **JWT Storage** → Stored in `localStorage`
3. **AuthContext** → Reads JWT, provides user object
4. **Protected Routes** → Check if user exists
5. **Logout** → Clear JWT, redirect to login

## Admin CRUD Pattern

Every admin resource follows this pattern:

1. **Service** (`src/services/{entity}.service.ts`)
   - `list()`, `get()`, `create()`, `update()`, `delete()`

2. **Modal** (`src/components/admin/modals/{Entity}Modal.tsx`)
   - Form for create/edit
   - Calls service methods
   - Notifies parent via `onUpdated` callback

3. **Page** (`src/pages/admin/{Entity}Admin.tsx`)
   - Lists all items
   - Opens modal on edit
   - Handles delete with confirm dialog
   - Calls service methods directly

4. **Route** (`src/App.tsx`)
   - Wired to `/admin/{entity}`
   - Protected by `<ProtectedRoute>`

## Performance Considerations

### Current Build Size

- Main bundle: ~914 kB (237 kB gzipped)
- CSS: ~137 kB (19 kB gzipped)

### Optimization Opportunities

1. **Code Splitting**: Use `React.lazy()` for admin pages
2. **Bundle Analysis**: `npm run build -- --analyze`
3. **Image Optimization**: Lazy-load images, use modern formats
4. **Database Indexes**: Add indexes to frequently queried columns

## Testing Strategy

### Unit Tests

- Service functions: Jest + testing-library
- Utility functions: Jest

### Integration Tests

- Page + Service interactions
- Auth flows

### E2E Tests

- Critical user journeys (login → admin → CRUD)
- Playwright or Cypress

## Security

### Frontend Security

- ✅ No sensitive keys in code (use env vars)
- ✅ Protected routes with AuthContext
- ✅ JWT stored in localStorage (consider httpOnly cookies)
- ✅ Supabase RLS policies enforce authorization

### Backend Security

- ✅ Supabase handles auth
- ✅ No direct database access
- ✅ All queries go through Supabase API
- ✅ Enable RLS on all tables

### Environment Variables

- ✅ `.env.local` in `.gitignore`
- ✅ Use `VITE_` prefix for client-side vars
- ✅ Document all vars in `.env.example`

## Styling Architecture

### Tailwind CSS

- Utility-first approach
- Consistency through design tokens (colors, spacing, etc.)
- Responsive design with breakpoints (sm, md, lg, xl, 2xl)

### Custom Design System

- Colors: `slate-blue`, `brand-walnut`, `brand-black`, `accent-sky`, etc.
- Spacing: Tailwind defaults + custom scale
- Components use consistent patterns (rounded, shadows, transitions)

### Class Organization

```jsx
<button
  className="
  px-4 py-2              // Padding
  bg-brand-walnut        // Background
  text-white             // Text
  rounded-lg             // Shape
  shadow-lg              // Elevation
  hover:bg-brand-black   // Interaction
  transition-colors      // Animation
  disabled:opacity-60    // State
"
/>
```

## API Endpoints (Express Server)

### Health Check

```bash
GET /api/health
→ { status: "ok", timestamp: "..." }
```

### Mock Data (Development)

```bash
GET /api/domains
→ Array of domain objects
```

### All Other Routes

```bash
* (any path)
→ Serve React SPA (index.html)
```

## Deployment Architecture

### Development

```
npm run dev
→ Vite dev server (http://localhost:5173)
```

### Production (Express Server)

```
npm run build
NODE_ENV=production node server.ts
→ Express server on port 3000
→ Serves dist/ as static files
→ SPA fallback to index.html
```

### Production (Static Hosting)

```
npm run build
Upload dist/ to hosting (Vercel, Netlify, etc.)
```

## Future Improvements

1. **Testing Suite**: Add Jest + React Testing Library
2. **Form Management**: Consider react-hook-form for complex forms
3. **State Management**: Migrate to Zustand if global state grows
4. **Error Boundaries**: Add React Error Boundary for better error handling
5. **Performance**: Implement code-splitting for admin pages
6. **Analytics**: Add analytics tracking for user behavior
7. **Logging**: Centralized error logging (Sentry, LogRocket)
8. **Documentation**: OpenAPI/Swagger for API endpoints
