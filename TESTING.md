# Testing & Quality Assurance Guide

## Pre-Deployment Checklist

### Type Safety

- [ ] `npm run lint` passes (TypeScript type-check)
- [ ] No TypeScript errors in IDE
- [ ] All imports are resolved
- [ ] Type annotations are present on public APIs

### Build & Performance

- [ ] `npm run build` succeeds
- [ ] Production bundle loads (visible build sizes)
- [ ] No critical webpack/vite warnings
- [ ] Bundle size is reasonable (< 1 MB after gzip)

### Dependencies

- [ ] `npm audit` shows no critical vulnerabilities
- [ ] All dependencies are up-to-date (optional)
- [ ] Node version is 18+ (LTS recommended)

## Manual Testing Procedures

### Authentication Flow

1. **Signup**
   - [ ] Navigate to `/signup`
   - [ ] Fill form with valid email and password
   - [ ] Submit form
   - [ ] Verify user created in Supabase
   - [ ] Auto-redirect to dashboard or home

2. **Login**
   - [ ] Log out current user
   - [ ] Navigate to `/login`
   - [ ] Enter credentials
   - [ ] Verify successful login
   - [ ] Verify JWT in localStorage

3. **Protected Routes**
   - [ ] Try accessing `/dashboard` without login
   - [ ] Verify redirect to `/login`
   - [ ] Login and verify access to `/dashboard`
   - [ ] Try accessing `/admin` without admin role
   - [ ] Verify restricted access or redirect

4. **Logout**
   - [ ] Click logout button
   - [ ] Verify JWT cleared from localStorage
   - [ ] Verify redirect to home page

### Admin CRUD Operations

#### Domains Admin (`/admin/domains`)

1. **Read (List)**
   - [ ] Page loads with domain list
   - [ ] Each row displays name, slug, description
   - [ ] Filter works (if implemented)

2. **Create**
   - [ ] Click "Add Domain" button
   - [ ] Modal opens
   - [ ] Fill form fields
   - [ ] Submit form
   - [ ] Toast shows success
   - [ ] New domain appears in list

3. **Update**
   - [ ] Click Edit on any row
   - [ ] Modal opens with current data
   - [ ] Edit a field
   - [ ] Submit form
   - [ ] Toast shows success
   - [ ] List updates immediately

4. **Delete**
   - [ ] Click Delete on any row
   - [ ] Confirm dialog appears
   - [ ] Click Confirm
   - [ ] Toast shows success
   - [ ] Row disappears from list

#### Solutions Admin (`/admin/solutions`)

- [ ] All CRUD operations similar to Domains
- [ ] Solutions with problems list displays correctly
- [ ] Adding/removing problems works

#### Projects Admin (`/admin/projects`)

- [ ] All CRUD operations work
- [ ] Image upload/preview functions
- [ ] Technology tags can be added/removed

#### Products Admin (`/admin/products`)

- [ ] All CRUD operations work
- [ ] Product features can be edited
- [ ] Pricing fields accept numbers

#### Leads Admin (`/admin/leads`)

- [ ] All CRUD operations work
- [ ] Status can be changed (New → In Progress → Closed)
- [ ] Lead data displays correctly

#### Users Admin (`/admin/users`)

- [ ] User list displays with names, emails, roles
- [ ] Edit modal allows role and name changes
- [ ] Delete removes user from list

#### Settings Admin (`/admin/settings`)

- [ ] All form fields are editable
- [ ] Save persists settings to database
- [ ] Settings load on page refresh
- [ ] Maintenance mode toggle works

### UI/UX Components

#### Toast Notifications

1. **Create Operation**
   - [ ] Submit form
   - [ ] Green success toast appears
   - [ ] Toast auto-dismisses after 3 seconds
   - [ ] Multiple toasts stack vertically

2. **Error Handling**
   - [ ] Trigger an error (e.g., duplicate email)
   - [ ] Red error toast appears with error message
   - [ ] Toast can be manually closed

#### Confirm Dialog

- [ ] Delete confirmation appears on delete click
- [ ] Dialog shows title and description
- [ ] Confirm button triggers deletion
- [ ] Cancel button closes dialog

### Responsive Design

**Mobile (< 640px)**

- [ ] Navigation hamburger menu works
- [ ] Admin tables are scrollable
- [ ] Modal forms are readable
- [ ] Buttons are tappable (44+ px)

**Tablet (640px - 1024px)**

- [ ] Layout adapts properly
- [ ] Multi-column grids work
- [ ] Modals centered and sized correctly

**Desktop (> 1024px)**

- [ ] Full layout is visible
- [ ] No horizontal scrolling
- [ ] Spacing and alignment correct

### Performance Testing

#### Load Time

- [ ] Home page loads in < 3 seconds
- [ ] Admin pages load in < 2 seconds
- [ ] No significant delays when scrolling

#### Large Data Sets

- [ ] List with 100+ items loads and scrolls smoothly
- [ ] No memory leaks in browser DevTools

#### Network Throttling (DevTools)

- [ ] Test on Slow 3G
- [ ] App remains functional
- [ ] Error handling works (timeouts, failures)

### Cross-Browser Testing

| Browser       | Version | Status | Notes           |
| ------------- | ------- | ------ | --------------- |
| Chrome        | Latest  |        | Main target     |
| Firefox       | Latest  |        | High priority   |
| Safari        | Latest  |        | Important       |
| Edge          | Latest  |        | Windows support |
| Mobile Chrome | Latest  |        | Mobile primary  |
| Mobile Safari | Latest  |        | iOS support     |

### Accessibility Testing

- [ ] Keyboard navigation works (Tab through form)
- [ ] Color contrast ratios are adequate
- [ ] Form labels are associated with inputs
- [ ] Error messages are descriptive
- [ ] Screen reader compatible (basic test)
- [ ] No console errors/warnings

## Automated Testing Examples

### Service Layer (Jest)

```typescript
describe("domainsService", () => {
  test("listDomains returns array", async () => {
    const domains = await listDomains();
    expect(Array.isArray(domains)).toBe(true);
  });

  test("createDomain with payload creates new domain", async () => {
    const domain = await createDomain({ name: "Test" });
    expect(domain.id).toBeDefined();
  });
});
```

### Component Layer (React Testing Library)

```typescript
describe('DomainsAdmin', () => {
  test('renders domain list', async () => {
    render(<DomainsAdmin />);
    await waitFor(() => {
      expect(screen.getByText('Domains')).toBeInTheDocument();
    });
  });

  test('opens modal on add button click', async () => {
    render(<DomainsAdmin />);
    const addBtn = screen.getByText('Add Domain');
    fireEvent.click(addBtn);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
```

## Security Testing

### Authentication

- [ ] Session persists on page reload
- [ ] JWT expires after timeout
- [ ] Unauthorized users cannot access admin
- [ ] Logout clears all session data

### Data Validation

- [ ] Form rejects invalid email format
- [ ] Number fields reject non-numeric input
- [ ] Required fields show validation error
- [ ] Max file size is enforced

### SQL Injection Prevention

- [ ] Supabase parameterized queries protect against SQL injection
- [ ] No direct SQL concatenation in app

### CORS & CSP

- [ ] API calls to Supabase work correctly
- [ ] No CORS errors in console
- [ ] Content Security Policy headers enforced

## Monitoring & Logging

### Client-Side Logging

```typescript
// In critical sections
console.log("[ADMIN] Creating domain:", payload);
console.error("[ERROR] Failed to fetch domains:", error);
```

### Server-Side Logging

```typescript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

### Error Tracking (Optional)

```typescript
// Consider adding Sentry for production
import * as Sentry from "@sentry/react";

Sentry.captureException(error);
```

## Database Integrity Checks

### After Deployment

1. Verify Supabase connection works
2. Test CRUD operations create correct schema
3. Check RLS policies are enforced
4. Verify indexes exist on frequently queried columns
5. Test backup/restore process

### Data Validation

- [ ] All required fields populated
- [ ] No orphaned records (deleted parent, alive children)
- [ ] Foreign keys are valid
- [ ] Timestamps are correct

## Load Testing

### Tools

- Apache JMeter
- k6
- Artillery
- Locust

### Scenarios

1. **Normal Traffic**: 100 concurrent users
2. **Peak Traffic**: 1000 concurrent users
3. **Stress Test**: Until failure

### Metrics to Monitor

- Response time (p50, p95, p99)
- Error rate
- Throughput (requests/sec)
- CPU usage
- Memory usage

## Post-Deployment Validation

### Health Checks

```bash
# Test health endpoint
curl https://your-domain/api/health

# Response should be:
# { "status": "ok", "timestamp": "2026-05-04T..." }
```

### Smoke Tests

- [ ] Homepage loads
- [ ] Login page accessible
- [ ] Can login with valid credentials
- [ ] Admin pages accessible for admin users
- [ ] Can perform basic CRUD

### Monitoring Setup

- [ ] Error rate < 1%
- [ ] Response times < 500ms (p95)
- [ ] Uptime monitoring enabled
- [ ] Alerts configured for errors

## Continuous Integration/Deployment

### GitHub Actions Example

```yaml
name: CI/CD
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run lint
      - run: npm run build
      # Add test step
      - run: npm test
```

## Release Checklist

Before releasing to production:

1. **Code Quality**
   - [ ] All tests pass
   - [ ] No TypeScript errors
   - [ ] No console warnings
   - [ ] Code reviewed

2. **Documentation**
   - [ ] README updated
   - [ ] CHANGELOG updated
   - [ ] Environment variables documented
   - [ ] Breaking changes documented

3. **Deployment**
   - [ ] Backup created
   - [ ] Database migrations run
   - [ ] Environment variables set
   - [ ] Health checks passing

4. **Post-Deployment**
   - [ ] Smoke tests pass
   - [ ] Error monitoring active
   - [ ] Performance baseline established
   - [ ] Rollback plan ready

## Troubleshooting Common Issues

### Build Failures

- Check Node version: `node --version`
- Clear cache: `npm cache clean --force`
- Reinstall: `rm -rf node_modules && npm install`

### Runtime Errors

- Check console for errors
- Verify env vars are set
- Check network tab for failed requests
- Clear browser cache/localStorage

### Database Issues

- Verify Supabase connection
- Check RLS policies
- Verify schema exists
- Check data types match TypeScript types

### Performance Issues

- Profile with DevTools Performance tab
- Check for memory leaks
- Review large dependencies
- Consider code-splitting

## Success Criteria

✅ **Deployment is successful when:**

- [ ] All tests pass
- [ ] No critical errors in monitoring
- [ ] Response times acceptable
- [ ] Users report no issues
- [ ] Core features working
- [ ] Admin dashboard functional
- [ ] Database operations reliable
