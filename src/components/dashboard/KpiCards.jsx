import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FolderIcon from "@mui/icons-material/FolderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrowOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import PendingIcon from "@mui/icons-material/PendingOutlined";

const stats = [
  {
    title: "Total Cases",
    value: "1,284",
    icon: <FolderIcon />,
    color: "#D71E28",
  },
  { title: "Open", value: "452", icon: <PlayArrowIcon />, color: "#FFCD41" },
  {
    title: "In-Progress",
    value: "623",
    icon: <PendingIcon />,
    color: "#6366f1",
  },
  {
    title: "Resolved",
    value: "209",
    icon: <CheckCircleIcon />,
    color: "#10b981",
  },
];

const KpiCards = () => {
  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              border: "1px solid #f0f0f0",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: ".625rem",
                    bgcolor: `${stat.color}15`,
                    color: stat.color,
                    display: "flex",
                    mr: 2,
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography>from last month</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default KpiCards;
