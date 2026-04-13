import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Breadcrumbs,
  Link as MuiLink,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { DataGrid } from "@mui/x-data-grid";

const initialClients = [
  {
    id: 1,
    name: "Acme Corp",
    industry: "Technology",
    contact: "John Doe",
    email: "john@acme.com",
    phone: "+1 555-0123",
    status: "Active",
    totalCases: 24,
    logo: "AC",
  },
  {
    id: 2,
    name: "Global Tech",
    industry: "Consulting",
    contact: "Sarah Miller",
    email: "sarah@global.com",
    phone: "+1 555-0124",
    status: "Active",
    totalCases: 12,
    logo: "GT",
  },
  {
    id: 3,
    name: "Secure IT",
    industry: "Security",
    contact: "Robert Chen",
    email: "robert@secure.com",
    phone: "+1 555-0125",
    status: "Pending",
    totalCases: 8,
    logo: "SI",
  },
  {
    id: 4,
    name: "Creative Labs",
    industry: "Design",
    contact: "Emily White",
    email: "emily@creative.com",
    phone: "+1 555-0126",
    status: "Active",
    totalCases: 31,
    logo: "CL",
  },
  {
    id: 5,
    name: "Old Guard Inc",
    industry: "Finance",
    contact: "Mark Wills",
    email: "mark@oldguard.com",
    phone: "+1 555-0127",
    status: "Inactive",
    totalCases: 5,
    logo: "OG",
  },
  {
    id: 6,
    name: "Skyward",
    industry: "Cloud",
    contact: "Anna Sky",
    email: "anna@skyward.com",
    phone: "+1 555-0128",
    status: "Active",
    totalCases: 19,
    logo: "SK",
  },
];

const Clients = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = initialClients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const columns = [
    {
      field: "name",
      headerName: "Client Name",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 32,
              height: 32,
              fontSize: "0.75rem",
            }}
          >
            {params.row.logo}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {params.value}
          </Typography>
        </Stack>
      ),
    },
    { field: "industry", headerName: "Industry", width: 150 },
    { field: "contact", headerName: "Contact Person", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === "Active"
              ? "success"
              : params.value === "Pending"
                ? "warning"
                : "default"
          }
          variant="outlined"
          sx={{ fontWeight: 700 }}
        />
      ),
    },
    { field: "totalCases", headerName: "Cases", width: 100, type: "number" },
    {
      field: "actions",
      headerName: "",
      width: 50,
      renderCell: () => (
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

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
            Clients
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
          Client Relations
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
          Add Client
        </Button>
      </Stack>

      {/* Toolbar */}
      <Paper sx={{ p: 2, mb: 4, borderRadius: 3, border: "1px solid #f0f0f0" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              placeholder="Search clients..."
              fullWidth
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
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
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, v) => v && setViewMode(v)}
                size="small"
                sx={{ bgcolor: "#f8fafc" }}
              >
                <ToggleButton value="table">
                  <ViewHeadlineIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="grid">
                  <ViewModuleIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {viewMode === "table" ? (
        <Paper
          sx={{
            height: 600,
            width: "100%",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <DataGrid
            rows={filteredClients}
            columns={columns}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#f8fafc",
                fontWeight: 700,
              },
            }}
          />
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredClients.map((client) => (
            <Grid key={client.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                sx={{
                  border: "1px solid #f0f0f0",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 3 }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 48,
                        height: 48,
                        fontWeight: 700,
                      }}
                    >
                      {client.logo}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {client.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {client.industry}
                      </Typography>
                    </Box>
                    <Chip
                      label={client.status}
                      size="small"
                      color={client.status === "Active" ? "success" : "default"}
                    />
                  </Stack>
                  <Stack spacing={1.5} sx={{ mb: 3 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      color="text.secondary"
                    >
                      <PhoneIcon fontSize="small" />
                      <Typography variant="body2">{client.phone}</Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      color="text.secondary"
                    >
                      <EmailIcon fontSize="small" />
                      <Typography variant="body2">{client.email}</Typography>
                    </Stack>
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 600, color: "text.secondary" }}
                    >
                      Primary: {client.contact}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 700, color: "primary.main" }}
                    >
                      {client.totalCases} Total Cases
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Clients;
