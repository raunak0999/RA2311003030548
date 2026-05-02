import React, { useState } from "react";
import { Container, Card, CardContent, Typography, Button, Select, MenuItem } from "@mui/material";

const data = [
  { id: 1, type: "Placement", message: "Hiring", time: "2026-04-22 17:51:18" },
  { id: 2, type: "Result", message: "Mid sem", time: "2026-04-22 17:51:30" },
  { id: 3, type: "Event", message: "Farewell", time: "2026-04-22 17:51:06" },
];

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function App() {
  const [filter, setFilter] = useState("All");
  const [viewed, setViewed] = useState([]);
  const [page, setPage] = useState("all");

  const handleClick = (id) => {
    if (!viewed.includes(id)) {
      setViewed([...viewed, id]);
    }
  };

  const filtered =
    filter === "All" ? data : data.filter((n) => n.type === filter);

  const sorted = [...filtered].sort((a, b) => {
    const typeDiff = priorityMap[b.type] - priorityMap[a.type];
    if (typeDiff !== 0) return typeDiff;
    return new Date(b.time) - new Date(a.time);
  });

  const top = sorted.slice(0, 2);
  const displayData = page === "priority" ? top : sorted;

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        📢 Notification App
      </Typography>

      {/* Navigation */}
      <Button variant="contained" onClick={() => setPage("all")} sx={{ mr: 1 }}>
        All
      </Button>
      <Button variant="outlined" onClick={() => setPage("priority")}>
        Priority
      </Button>

      <br /><br />

      {/* Filter */}
      <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
      </Select>

      {/* Notifications */}
      {displayData.map((n) => (
        <Card
          key={n.id}
          onClick={() => handleClick(n.id)}
          sx={{
            mt: 2,
            cursor: "pointer",
            backgroundColor: viewed.includes(n.id) ? "#f0f0f0" : "#fff",
          }}
        >
          <CardContent>
            <Typography variant="h6">
              {n.type} {viewed.includes(n.id) ? "(Viewed)" : "(New)"}
            </Typography>
            <Typography>{n.message}</Typography>
            <Typography variant="caption">{n.time}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default App;