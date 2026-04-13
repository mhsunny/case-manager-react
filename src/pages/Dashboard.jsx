import React from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Button,
  Paper,
  TextField,
  InputAdornment,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";
import KpiCards from "../components/dashboard/KpiCards";
import WeeklyTrendChart from "../components/dashboard/WeeklyTrendChart";
import CaseDistributionChart from "../components/dashboard/CaseDistributionChart";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "title", headerName: "Case Title", flex: 1, minWidth: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => {
      const colors = {
        Open: "info",
        "In Progress": "warning",
        Resolved: "success",
        Closed: "default",
      };
      return (
        <Chip
          label={params.value}
          color={colors[params.value]}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 600 }}
        />
      );
    },
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 120,
    renderCell: (params) => {
      const colors = {
        High: "error",
        Medium: "warning",
        Low: "info",
      };
      return (
        <Chip
          label={params.value}
          color={colors[params.value]}
          size="small"
          sx={{ fontWeight: 600 }}
        />
      );
    },
  },
  { field: "client", headerName: "Client", width: 150 },
  {
    field: "actions",
    headerName: "",
    width: 50,
    sortable: false,
    renderCell: () => (
      <IconButton size="small">
        <MoreVertIcon />
      </IconButton>
    ),
  },
];

const rows = [
  {
    id: 1024,
    title: "Network Outage - Building A",
    status: "In Progress",
    priority: "High",
    client: "Acme Corp",
  },
  {
    id: 1025,
    title: "Database Optimization",
    status: "Open",
    priority: "Medium",
    client: "Global Tech",
  },
  {
    id: 1026,
    title: "Security Audit Q1",
    status: "Resolved",
    priority: "High",
    client: "Secure IT",
  },
  {
    id: 1027,
    title: "New Employee Onboarding",
    status: "Open",
    priority: "Low",
    client: "Internal",
  },
  {
    id: 1028,
    title: "Legacy System Migration",
    status: "In Progress",
    priority: "High",
    client: "Old Guard Inc",
  },
  {
    id: 1029,
    title: "UI/UX Redesign - Mobile App",
    status: "Resolved",
    priority: "Medium",
    client: "Creative Labs",
  },
  {
    id: 1030,
    title: "Cloud Integration Support",
    status: "Open",
    priority: "Low",
    client: "Skyward",
  },
];

const Dashboard = () => {
  return (
    <Box sx={{ p: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <MuiLink
            underline="hover"
            color="inherit"
            href="/"
            sx={{ fontSize: "0.875rem" }}
          >
            Home
          </MuiLink>
          <Typography
            color="text.primary"
            sx={{ fontSize: "0.875rem", fontWeight: 500 }}
          >
            Dashboard
          </Typography>
        </Breadcrumbs>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Case Management
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: ".625rem",
            px: 3,
            border: "2px solid #FFCD41",
            fontWeight: 700,
          }}
        >
          Create Case
        </Button>
      </Stack>

      <Box sx={{ mb: 4 }}>
        <KpiCards />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <WeeklyTrendChart />
            <CaseDistributionChart />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            sx={{ p: 0, borderRadius: 3, overflow: "hidden", height: "100%" }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <TextField
                placeholder="Search cases..."
                size="small"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: ".625rem",
                    bgcolor: "#f8fafc",
                  },
                }}
              />
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                size="medium"
                sx={{ borderRadius: ".625rem", minWidth: 120 }}
              >
                Filters
              </Button>
            </Box>
            <Box sx={{ height: 600 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  border: "none",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f8fafc",
                    color: "text.secondary",
                    fontWeight: 700,
                  },
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
