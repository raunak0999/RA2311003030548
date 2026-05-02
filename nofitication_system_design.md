# Stage 1

## Approach
- Fetch notifications from API
- Apply priority weights:
  Placement > Result > Event
- Sort by:
  1. Type (descending)
  2. Timestamp (latest first)
- Return top 10 notifications

## Edge Case
- API is protected and returns 401 Unauthorized
- Fallback sample data used for demonstration

## Optimization
- For real-time updates:
  Use Min Heap (Priority Queue) of size 10
  Time Complexity: O(log N)

## Tech
- Node.js
- Axios