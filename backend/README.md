# Personal Notes and Bookmark Manager Backend

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Auth
- dotenv, CORS, express-validator, axios

## Setup
1. Clone repo and `cd backend`
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bookmark_manager
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start server:
   ```sh
   npm run dev
   # or
   npm start
   ```

## API Endpoints

### Auth
- `POST /api/auth/signup` `{ name, email, password }` → `{ token }`
- `POST /api/auth/login` `{ email, password }` → `{ token }`

### Notes (JWT required)
- `POST /api/notes` `{ title, content, tags?, favorite? }`
- `GET /api/notes?q=search&tags=tag1,tag2`
- `GET /api/notes/:id`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

### Bookmarks (JWT required)
- `POST /api/bookmarks` `{ url, title?, description?, tags?, favorite? }`
- `GET /api/bookmarks?q=search&tags=tag1,tag2`
- `GET /api/bookmarks/:id`
- `PUT /api/bookmarks/:id`
- `DELETE /api/bookmarks/:id`

### Auth Header
Send JWT as: `Authorization: Bearer <token>`

## Validation
- Uses express-validator for all endpoints

## Error Handling
- Returns proper HTTP status codes and error messages

## (Optional) Example curl
```sh
curl -X POST http://localhost:5000/api/auth/signup -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","password":"1234"}'
``` 