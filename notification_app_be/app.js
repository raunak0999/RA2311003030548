const axios = require("axios");

// API URL
const API_URL = "http://20.207.122.201/evaluation-service/notifications";

// Priority weights
const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

// 🔁 Fallback sample data (in case API fails)
const sampleData = {
  notifications: [
    {
      ID: "d146095a",
      Type: "Result",
      Message: "mid-sem",
      Timestamp: "2026-04-22 17:51:30",
    },
    {
      ID: "b283218f",
      Type: "Placement",
      Message: "CSX Corporation hiring",
      Timestamp: "2026-04-22 17:51:18",
    },
    {
      ID: "81589ada",
      Type: "Event",
      Message: "farewell",
      Timestamp: "2026-04-22 17:51:06",
    },
    {
      ID: "0005513a",
      Type: "Result",
      Message: "mid-sem",
      Timestamp: "2026-04-22 17:50:54",
    },
  ],
};

// 🔧 Sorting function
function getTopNotifications(notifications, limit = 10) {
  return notifications
    .sort((a, b) => {
      // 1. Type priority
      const typeDiff = priorityMap[b.Type] - priorityMap[a.Type];
      if (typeDiff !== 0) return typeDiff;

      // 2. Latest timestamp first
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, limit);
}

// 🚀 Main function
async function main() {
  let notifications = [];

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: "Bearer test", // try token (may or may not work)
      },
    });

    notifications = response.data.notifications;
    console.log("✅ Data fetched from API\n");

  } catch (error) {
    console.log("⚠️ API failed (401 Unauthorized). Using sample data...\n");
    notifications = sampleData.notifications;
  }

  const topNotifications = getTopNotifications(notifications);

  console.log("🔥 Top Notifications:\n");

  topNotifications.forEach((n, index) => {
    console.log(
      `${index + 1}. [${n.Type}] ${n.Message} - ${n.Timestamp}`
    );
  });
}

// Run app
main();