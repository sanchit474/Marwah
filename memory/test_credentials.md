# Test Credentials

## Admin (School Administrator)
- URL: `/admin` (redirects to `/admin/login` if not authenticated)
- Email: `sanchitbajpai09@gmail.com`
- Password: `Marwah@2026`
- Role: admin

## Auth
- Token-based (JWT Bearer), stored in localStorage key `mmps_token`
- Endpoints:
  - POST `/api/auth/login` -> { token, user }
  - GET  `/api/auth/me` (Bearer)

## Public endpoints
- POST `/api/admissions` (admission enquiry)
- POST `/api/contact` (contact message)
- GET  `/api/news`, GET `/api/news/{id}`

## Admin endpoints (Bearer required)
- GET `/api/admin/stats`
- GET/PATCH/DELETE `/api/admin/admissions[/{id}]`
- GET/PATCH/DELETE `/api/admin/contacts[/{id}]`
- POST/PUT/DELETE `/api/admin/news[/{id}]`
