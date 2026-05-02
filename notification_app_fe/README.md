# Notification System

## Stage 1 (Backend)
- Fetch notifications from API
- API returned 401 (protected), handled with fallback data
- Priority logic:
  Placement > Result > Event
- Sorted by:
  1. Type priority
  2. Timestamp (latest first)
- Returned top 10 notifications

## Stage 2 (Frontend)
- Built using React (runs on http://localhost:3000)
- Features:
  - View all notifications
  - Priority notifications page (top N)
  - Filter by type (Placement, Result, Event)
  - Mark notifications as Viewed/New
- Styled using Material UI

## How to run

### Backend
cd notification_app_be
npm install
node app.js


### Frontend

cd notification_app_fe
npm install
npm start


## Note
The provided API is protected and returns 401 Unauthorized.
Fallback sample data was used for demonstration.