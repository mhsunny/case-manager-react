import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const SidebarWidgets = ({ open }) => {
  if (!open) return null;

  return (
    <Box sx={{ px: 2, pb: 4, mt: 4 }}>
      {/* Weekly Trend Widget */}
      <Box sx={{ p: 2, borderRadius: "1rem", bgcolor: "#f8fafc", border: "1px solid #e2e8f0", mb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ bgcolor: "#D71E28", borderRadius: ".375rem", p: 0.5, display: 'flex', color: 'white' }}>
              <TrendingUpIcon sx={{ fontSize: "1rem" }} />
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
              Weekly Trend
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ color: "#059669", fontWeight: 700 }}>
            +12%
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.5} alignItems="flex-end" sx={{ height: 48, pt: 1 }}>
          {[50, 60, 55, 85, 80, 45, 55].map((h, i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                height: `${h}%`,
                bgcolor: i === 3 ? "#D71E28" : "#94a3b8",
                borderTopLeftRadius: ".125rem",
                borderTopRightRadius: ".125rem",
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Case Distribution Widget */}
      <Box sx={{ p: 2, borderRadius: "1rem", bgcolor: "#f0f6ff", border: "1px solid #dbeafe", mb: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Box sx={{ bgcolor: "#3b82f6", borderRadius: ".5rem", p: 0.5, display: 'flex', color: 'white' }}>
            <InfoOutlinedIcon sx={{ fontSize: "1rem" }} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e3a8a" }}>
            Case Distribution
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ position: "relative", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ 
              width: "100%", height: "100%", borderRadius: "50%", 
              border: "6px solid #10b981", 
              borderTopColor: "#ef4444", 
              borderRightColor: "#facc15", 
              transform: "rotate(45deg)" 
            }} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Stack spacing={0.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" sx={{ fontSize: "0.7rem", fontWeight: 600, color: "#334155" }}><span style={{color:"#ef4444", marginRight: "4px"}}>●</span> Active</Typography>
                <Typography variant="caption" sx={{ fontSize: "0.75rem", color: "#334155" }}>47</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" sx={{ fontSize: "0.7rem", fontWeight: 600, color: "#334155" }}><span style={{color:"#facc15", marginRight: "4px"}}>●</span> Pending</Typography>
                <Typography variant="caption" sx={{ fontSize: "0.75rem", color: "#334155" }}>23</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" sx={{ fontSize: "0.7rem", fontWeight: 600, color: "#334155" }}><span style={{color:"#10b981", marginRight: "4px"}}>●</span> Closed</Typography>
                <Typography variant="caption" sx={{ fontSize: "0.75rem", color: "#334155" }}>30</Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Status Cards */}
      <Stack spacing={1.5}>
        <Box sx={{ p: 1.5, borderRadius: "1rem", bgcolor: "#fff7ed", border: "1px solid #fed7aa", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ bgcolor: "#ea580c", borderRadius: ".5rem", p: 1, display: 'flex', color: 'white' }}>
              <WarningAmberIcon sx={{ fontSize: "1.25rem" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e293b", lineHeight: 1.2 }}>
                High Priority
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "0.65rem", color: "#64748b" }}>
                Needs attention
              </Typography>
            </Box>
          </Stack>
          <Typography variant="h6" sx={{ fontSize: "1.25rem", fontWeight: 800, color: "#ea580c" }}>8</Typography>
        </Box>

        <Box sx={{ p: 1.5, borderRadius: "1rem", bgcolor: "#ecfdf5", border: "1px solid #a7f3d0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ bgcolor: "#10b981", borderRadius: ".5rem", p: 1, display: 'flex', color: 'white' }}>
              <AccessTimeIcon sx={{ fontSize: "1.25rem" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e293b", lineHeight: 1.2 }}>
                Avg Response
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "0.65rem", color: "#64748b" }}>
                24h average
              </Typography>
            </Box>
          </Stack>
          <Typography variant="h6" sx={{ fontSize: "1.25rem", fontWeight: 800, color: "#059669" }}>2.3h</Typography>
        </Box>

        <Box sx={{ p: 1.5, borderRadius: "1rem", bgcolor: "#fefce8", border: "1px solid #fde047", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ bgcolor: "#eab308", borderRadius: ".5rem", p: 1, display: 'flex', color: 'white' }}>
              <WorkOutlineIcon sx={{ fontSize: "1.25rem" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e293b", lineHeight: 1.2 }}>
                Unassigned
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "0.65rem", color: "#64748b" }}>
                Awaiting assignment
              </Typography>
            </Box>
          </Stack>
          <Typography variant="h6" sx={{ fontSize: "1.25rem", fontWeight: 800, color: "#ca8a04" }}>5</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SidebarWidgets;
