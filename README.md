# AI Ventrax CMS

This is a starter full-stack CMS:
- Public blog at `/`
- Admin dashboard at `/admin`
- Add/edit/delete articles
- Categories, featured image URL, excerpt, HTML content, author and draft/published status
- JSON file storage for a simple deployment

## Run locally
1. Install Node.js
2. Run `npm install`
3. Set `ADMIN_PASSWORD` environment variable to a strong password
4. Run `npm start`
5. Open `http://localhost:3000/admin`

## Production
Use a Node-compatible host such as Railway, Render, or another server platform. Set `ADMIN_PASSWORD` there.
For a real production site with many posts, replace the JSON file with PostgreSQL/another managed database and add CSRF/rate limiting, secure session cookies, image storage, backups and proper HTML sanitization.

The included public page is ready for AdSense/affiliate placement, but approval and earnings are not guaranteed.
