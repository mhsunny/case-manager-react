import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Button,
  Stack,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import GroupIcon from "@mui/icons-material/Group";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CommentIcon from "@mui/icons-material/Comment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import SortIcon from "@mui/icons-material/Sort";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TagIcon from "@mui/icons-material/Tag";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import StarIcon from "@mui/icons-material/Star";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import CustomCaseTable from "../components/cases/CustomCaseTable";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { ExpandMore } from "@mui/icons-material";
import "../assets/scss/pages/CaseManagement.scss";
import { useCases } from "../hooks/useCases";
import CircularProgress from "@mui/material/CircularProgress";

const CaseManagement = () => {
  const { cases, loading, error, createCase, updateCase, bulkUpdateCases, addCommentToCases } = useCases();
  const [tabIndex, setTabIndex] = useState(0); // 0: Pending, 1: Closed
  const [viewMode, setViewMode] = useState("table");
  const [selectionModel, setSelectionModel] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuickFilter, setActiveQuickFilter] = useState("All Cases");

  // Menu states
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [dashboardMenuAnchor, setDashboardMenuAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create"); // 'create' or 'edit'
  const [createFilterOpen, setCreateFilterOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [attachmentDialogOpen, setAttachmentDialogOpen] = useState(false);
  const [rfiDialogOpen, setRfiDialogOpen] = useState(false);

  const handleTabChange = (event, newValue) => setTabIndex(newValue);
  const handleViewModeChange = (event, nextView) => {
    if (nextView !== null) setViewMode(nextView);
  };

  // Filter Logic
  const filteredRows = useMemo(() => {
    let result = cases.filter((row) => {
      const isPending = row.status !== "Closed";
      if (tabIndex === 0 && !isPending) return false;
      if (tabIndex === 1 && isPending) return false;
      return true;
    });

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (row) =>
          row.name.toLowerCase().includes(query) ||
          row.id.toLowerCase().includes(query) ||
          row.description.toLowerCase().includes(query),
      );
    }

    // Quick Filter Logic (Mock)
    if (activeQuickFilter === "My Cases") {
      result = result.filter((row) => row.assignedTo === "Alex Johnson"); // Mock "My"
    } else if (activeQuickFilter === "Unassigned") {
      result = result.filter((row) => row.assignedTo === "Unassigned");
    } else if (activeQuickFilter === "High Priority") {
      result = result.filter((row) => row.priority === "High");
    }

    return result;
  }, [tabIndex, searchQuery, activeQuickFilter, cases]);

  // Export to Excel
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cases");
    XLSX.writeFile(wb, `WellFargo_Cases_${dayjs().format("YYYYMMDD")}.xlsx`);
  };

  const handleActionMenuOpen = (event, row) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    setDrawerMode("edit");
    setDrawerOpen(true);
    handleActionMenuClose();
  };

  const handleCreate = () => {
    setDrawerMode("create");
    setDrawerOpen(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "Case ID",
      width: 120,
      renderCell: (params) => (
        <Typography sx={{ color: "primary.main", fontWeight: 700 }}>
          {params.value}
        </Typography>
      ),
    },
    { field: "name", headerName: "Case Name", flex: 1, minWidth: 200 },
    { field: "type", headerName: "Case Type", width: 130 },
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
        const colors = { High: "error", Medium: "warning", Low: "info" };
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
    { field: "assignedTo", headerName: "Assigned To", width: 150 },
    { field: "businessUnit", headerName: "Business Unit", width: 150 },
    {
      field: "dateCreated",
      headerName: "Date Created",
      width: 150,
      valueFormatter: (value) => dayjs(value).format("MMM DD, YYYY"),
    },
    {
      field: "actions",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(e) => handleActionMenuOpen(e, params.row)}
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  const QuickFilterItem = ({ label, count, active, color, icon }) => (
    <Button
      variant="outlined"
      onClick={() => setActiveQuickFilter(label)}
      startIcon={icon}
      sx={{
        borderRadius: "50px", // Full pill
        px: 2,
        py: 0.5,
        fontSize: "0.85rem",
        textTransform: "none",
        minWidth: "auto",
        whiteSpace: "nowrap",
        fontWeight: 700,
        bgcolor: active ? (color || "#D71E28") : "#fff",
        borderColor: active ? (color || "#D71E28") : "#e2e8f0",
        color: active ? "#fff" : "#1e293b",
        "&:hover": {
          bgcolor: active ? (color || "#D71E28") : "#f8fafc",
        },
        "& .MuiButton-startIcon": {
          marginRight: "6px",
          color: active ? "#fff" : "inherit"
        }
      }}
    >
      {label}
      <Box
        component="span"
        sx={{
          ml: 1.5,
          px: 1,
          py: 0.25,
          borderRadius: "12px",
          fontSize: "0.75rem",
          fontWeight: 700,
          bgcolor: active ? "rgba(255,255,255,0.2)" : "#f1f5f9",
          color: active ? "#fff" : "#64748b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "24px"
        }}
      >
        {count}
      </Box>
    </Button>
  );

  const BulkActionBar = () => (
    <Paper
      elevation={3}
      sx={{
        p: 1.5,
        mb: 2,
        borderRadius: 3,
        bgcolor: "#f8fafc",
        border: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography
          variant="body2"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          {selectionModel.length} Cases Selected
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Button
          size="small"
          onClick={() => setAssignDialogOpen(true)}
          startIcon={<PersonAddIcon />}
          sx={{ textTransform: "none" }}
        >
          Assign To
        </Button>
        <Button
          size="small"
          onClick={() => setCommentDialogOpen(true)}
          startIcon={<CommentIcon />}
          sx={{ textTransform: "none" }}
        >
          Add Comment
        </Button>
        <Button
          size="small"
          onClick={() => setAttachmentDialogOpen(true)}
          startIcon={<AttachFileIcon />}
          sx={{ textTransform: "none" }}
        >
          Add Attachment
        </Button>
        <Button
          size="small"
          onClick={() => setRfiDialogOpen(true)}
          startIcon={<HelpCenterIcon />}
          sx={{ textTransform: "none" }}
        >
          RFI
        </Button>
      </Stack>
      <Button
        variant="text"
        size="small"
        color="error"
        onClick={() => setSelectionModel([])}
        sx={{ fontWeight: 600 }}
      >
        Clear Selection
      </Button>
    </Paper>
  );

  const GridItem = ({ row }) => (
    <Card
      sx={{ height: "100%", position: "relative", border: "1px solid #e2e8f0" }}
    >
      <div className="case-id-text">
        <span>{row.id}</span>
      </div>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{ color: "primary.main", fontWeight: 800 }}
          >
            {row.id}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => handleActionMenuOpen(e, row)}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Typography
          variant="h6"
          sx={{ fontSize: "1rem", fontWeight: 700, mb: 1, lineHeight: 1.2 }}
        >
          {row.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {row.description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={row.status}
            size="small"
            color={row.status === "Closed" ? "default" : "info"}
            variant="outlined"
          />
          <Chip
            label={row.priority}
            size="small"
            color={row.priority === "High" ? "error" : "warning"}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption" color="text.secondary">
            Created: {dayjs(row.dateCreated).format("MMM DD")}
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {row.assignedTo}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Box sx={{ px: 2, py: 1 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 2 }}
        >
          <Link
            underline="hover"
            color="inherit"
            href="#"
            sx={{
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <HomeIcon sx={{ fontSize: "1rem" }} />
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="#"
            sx={{ fontSize: "0.75rem" }}
          >
            Case Management
          </Link>
          <Typography
            color="text.primary"
            sx={{ fontSize: "0.75rem", fontWeight: 700 }}
          >
            Pending Cases
          </Typography>
        </Breadcrumbs>

        {/* Header with Title and Create Action */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              onClick={(e) => setDashboardMenuAnchor(e.currentTarget)}
              startIcon={<DashboardIcon />}
              endIcon={<ExpandMore />}
              sx={{
                borderRadius: ".625rem",
                textTransform: "none",
                fontWeight: 700,
                color: "text.primary",
                borderColor: "#e2e8f0",
                bgcolor: "#fff",
              }}
            >
              Custom Dashboards
            </Button>
            <Menu
              anchorEl={dashboardMenuAnchor}
              open={Boolean(dashboardMenuAnchor)}
              onClose={() => setDashboardMenuAnchor(null)}
              PaperProps={{
                elevation: 3,
                sx: { 
                  mt: 1, 
                  borderRadius: 2, 
                  minWidth: 260,
                  border: "1px solid #e2e8f0",
                  "& .MuiMenuItem-root": {
                    py: 1.5,
                    fontSize: "0.875rem",
                    color: "text.primary"
                  }
                }
              }}
              transformOrigin={{ horizontal: "left", vertical: "top" }}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            >
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>All Cases Dashboard</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>My Cases Dashboard</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>High Priority Dashboard</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>Team Performance Dashboard</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>Analytics Dashboard</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>Fraud Cases Dashboard</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>Compliance Overview</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>AML Monitoring Dashboard</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>Transaction Disputes</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>Regulatory Reports</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>SLA Performance</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>Executive Summary</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>Regional Analysis</MenuItem>
              <MenuItem onClick={() => setDashboardMenuAnchor(null)}>Customer Risk Profile</MenuItem>
              <Divider />
              <MenuItem 
                onClick={() => setDashboardMenuAnchor(null)}
                sx={{ color: "#D71E28 !important", fontWeight: 600 }}
              >
                + Create New Dashboard
              </MenuItem>
            </Menu>
          </Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            sx={{
              borderRadius: ".625rem",
              px: 3,
              py: 1,
              bgcolor: "#D71E28",
              fontWeight: 800,
              textTransform: "none",
            }}
          >
            Create Case
          </Button>
        </Stack>

        {/* AI Search Bar */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ position: "relative", mb: 1 }}>
            <TextField
              placeholder="AI-powered search across cases.. Try 'high priority fraud' or 'John Smith pending'"
              fullWidth
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#D71E28", mr: 1 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: ".625rem",
                  bgcolor: "#fff",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  px: 2,
                },
              }}
            />
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "text.secondary", mr: 1 }}
            >
              Searching in:
            </Typography>
            {[
              {
                label: "Case ID",
                icon: (
                  <TagIcon htmlColor="#D71E28" sx={{ fontSize: "0.9rem" }} />
                ),
              },
              {
                label: "Case Name",
                icon: (
                  <DescriptionIcon
                    htmlColor="#D71E28"
                    sx={{ fontSize: "0.9rem" }}
                  />
                ),
              },
              {
                label: "Description",
                icon: (
                  <DescriptionIcon
                    htmlColor="#D71E28"
                    sx={{ fontSize: "0.9rem" }}
                  />
                ),
              },
              {
                label: "Assigned To",
                icon: (
                  <GroupIcon htmlColor="#D71E28" sx={{ fontSize: "0.9rem" }} />
                ),
              },
            ].map((tag) => (
              <Chip
                key={tag.label}
                label={tag.label}
                icon={tag.icon}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  color: "black",
                  bgcolor: "#fff",
                  borderColor: "#e2e8f0",
                  p: 1.5,
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Tabs */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "inline-flex",
              p: 0.5,
              borderRadius: ".625rem",
              border: "1px solid #e2e8f0",
              bgcolor: "#fff",
            }}
          >
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              sx={{
                minHeight: 32,
                "& .MuiTabs-indicator": { display: "none" },
                "& .MuiTabs-flexContainer": { gap: 0.5 },
                "& .MuiTab-root": {
                  minHeight: 32,
                  py: 0.5,
                  px: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  borderRadius: ".5rem",
                  color: "#476391",
                  "&.Mui-selected": {
                    color: "#fff",
                    bgcolor: "#D71E28",
                  },
                },
              }}
            >
              <Tab label="Pending Cases (11)" />
              <Tab label="Closed Cases (4)" />
            </Tabs>
          </Box>
        </Box>

        {/* Quick Filters */}
        <Box sx={{ mb: 4, overflowX: "auto", pb: 1 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography
              variant="caption"
              sx={{
                mr: 1,
                fontWeight: 700,
                color: "#476391",
                whiteSpace: "nowrap",
                fontSize: "0.85rem",
              }}
            >
              Quick Filters:
            </Typography>
            {[
              {
                label: "All Cases",
                count: 11,
                active: true,
                icon: <AutoAwesomeIcon sx={{ fontSize: "1.1rem" }} />,
              },
              {
                label: "Trending",
                count: 5,
                active: false,
                icon: <TrendingUpIcon sx={{ fontSize: "1.1rem" }} />,
              },
              {
                label: "My Cases",
                count: 2,
                active: false,
                icon: <PersonOutlineIcon sx={{ fontSize: "1.1rem" }} />,
              },
              {
                label: "Unassigned",
                count: 0,
                active: false,
                icon: <PersonOffIcon sx={{ fontSize: "1.1rem" }} />,
              },
              {
                label: "High Priority",
                count: 5,
                active: false,
                icon: <ErrorOutlineIcon sx={{ fontSize: "1.1rem" }} />,
              },
              {
                label: "Created Today",
                count: 1,
                active: false,
                icon: <AccessTimeIcon sx={{ fontSize: "1.1rem" }} />,
              },
              {
                label: "This Week",
                count: 11,
                active: false,
                icon: <CalendarTodayIcon sx={{ fontSize: "1.1rem" }} />,
              },
            ].map((filter) => (
              <QuickFilterItem
                key={filter.label}
                {...filter}
                active={activeQuickFilter === filter.label}
              />
            ))}

            <Button
              startIcon={<AddIcon sx={{ fontSize: "1.1rem" }} />}
              variant="outlined"
              onClick={() => setCreateFilterOpen(true)}
              sx={{
                borderRadius: ".625rem",
                px: 2,
                py: 0.5,
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#D71E28",
                bgcolor: "#fff",
                border: "1px dashed #D71E28",
                textTransform: "none",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: "#fef2f2",
                },
              }}
            >
              Create Filter
            </Button>

            {/* {[].map((filter) => (
              <QuickFilterItem
                key={filter.label}
                {...filter}
                active={activeQuickFilter === filter.label}
              />
            ))} */}
          </Stack>
        </Box>

        {/* View Controls & Action Bar */}
        {/* Controls Row (View Mode, Export, Filter & Sort) */}
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              size="small"
              sx={{
                bgcolor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: ".625rem",
                p: "4px",
              }}
            >
              <ToggleButton
                value="table"
                sx={{
                  border: "none !important",
                  borderRadius: ".375rem !important",
                  px: 1.5,
                  py: 0.5,
                  fontWeight: 600,
                  textTransform: "none",
                  gap: 1,
                  color: "#475569",
                  "&.Mui-selected": {
                    bgcolor: "#D71E28",
                    color: "#fff",
                    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                    "&:hover": { bgcolor: "#b91c1c" },
                  },
                }}
              >
                <ViewHeadlineIcon sx={{ fontSize: "1.1rem" }} /> Table
              </ToggleButton>
              <ToggleButton
                value="grid"
                sx={{
                  border: "none !important",
                  borderRadius: ".375rem !important",
                  px: 1.5,
                  py: 0.5,
                  fontWeight: 600,
                  textTransform: "none",
                  gap: 1,
                  color: "#475569",
                  "&.Mui-selected": {
                    bgcolor: "#D71E28",
                    color: "#fff",
                    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                    "&:hover": { bgcolor: "#b91c1c" },
                  },
                }}
              >
                <ViewModuleIcon sx={{ fontSize: "1.1rem" }} /> Grid
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={handleExport}
              sx={{
                borderRadius: ".625rem",
                textTransform: "none",
                fontWeight: 700,
                color: "#D71E28",
                borderColor: "#e2e8f0",
                bgcolor: "#fff",
                height: 36,
              }}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
              sx={{
                borderRadius: ".625rem",
                textTransform: "none",
                fontWeight: 700,
                color: "text.primary",
                borderColor: "#e2e8f0",
                bgcolor: "#fff",
                height: 36,
              }}
            >
              Filter & Sort
            </Button>
          </Stack>
        </Stack>

        {/* Action Bar (Always visible) */}
        <Box
          sx={{
            mb: 2,
            bgcolor: selectionModel.length > 0 ? "#fef2f2" : "#f8fafc",
            border: selectionModel.length > 0 ? "1px solid #fecaca" : "1px solid #e2e8f0",
            borderRadius: ".625rem",
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s ease-in-out"
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: selectionModel.length > 0 ? "#D71E28" : "#e2e8f0",
                  color: selectionModel.length > 0 ? "#fff" : "#64748b",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  transition: "all 0.2s ease-in-out"
                }}
              >
                {selectionModel.length}
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#334155" }}
              >
                {selectionModel.length > 0
                  ? `${selectionModel.length} case${selectionModel.length > 1 ? "s" : ""} selected`
                  : "No cases selected"}
              </Typography>
            </Stack>
            
            <Divider orientation="vertical" flexItem sx={{ borderColor: "#cbd5e1", my: 0.5 }} />
            
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                disabled={selectionModel.length === 0}
                onClick={() => setAssignDialogOpen(true)}
                startIcon={<PersonAddIcon sx={{ fontSize: "1rem", color: "#64748b" }} />}
                sx={{
                  bgcolor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: ".375rem",
                  color: "#475569",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.80rem",
                  py: 0.5,
                  px: 1.5,
                  "&:hover": { bgcolor: "#f8fafc" },
                }}
              >
                Assign To
              </Button>
              <Button
                variant="outlined"
                disabled={selectionModel.length === 0}
                onClick={() => setCommentDialogOpen(true)}
                startIcon={<CommentIcon sx={{ fontSize: "1rem", color: "#64748b" }} />}
                sx={{
                  bgcolor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: ".375rem",
                  color: "#475569",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.80rem",
                  py: 0.5,
                  px: 1.5,
                  "&:hover": { bgcolor: "#f8fafc" },
                }}
              >
                Add Comment
              </Button>
              <Button
                variant="outlined"
                disabled={selectionModel.length === 0}
                onClick={() => setAttachmentDialogOpen(true)}
                startIcon={<AttachFileIcon sx={{ fontSize: "1rem", color: "#64748b" }} />}
                sx={{
                  bgcolor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: ".375rem",
                  color: "#475569",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.80rem",
                  py: 0.5,
                  px: 1.5,
                  "&:hover": { bgcolor: "#f8fafc" },
                }}
              >
                Add Attachment
              </Button>
              <Button
                variant="outlined"
                disabled={selectionModel.length === 0}
                onClick={() => setRfiDialogOpen(true)}
                startIcon={<HelpCenterIcon sx={{ fontSize: "1rem", color: "#64748b" }} />}
                sx={{
                  bgcolor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: ".375rem",
                  color: "#475569",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.80rem",
                  py: 0.5,
                  px: 1.5,
                  "&:hover": { bgcolor: "#f8fafc" },
                }}
              >
                RFI
              </Button>
            </Stack>
          </Stack>

          <Button
            size="small"
            variant="text"
            disabled={selectionModel.length === 0}
            startIcon={<CloseIcon sx={{ fontSize: "1rem" }} />}
            onClick={() => setSelectionModel([])}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.85rem",
              color: "#64748b",
              "&:hover": { bgcolor: "transparent", color: "#0f172a" },
            }}
          >
            Clear Selection
          </Button>
        </Box>

        {/* Main Table/Grid */}
        <Box sx={{ mb: 3 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, minHeight: 400, alignItems: 'center' }}>
               <CircularProgress color="primary" />
            </Box>
          ) : viewMode === "table" ? (
            <Paper
              sx={{
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
              }}
            >
              <CustomCaseTable
                rows={filteredRows}
                selected={selectionModel}
                onSelectAll={(e) => {
                  if (e.target.checked)
                    setSelectionModel(filteredRows.map((r) => r.id));
                  else setSelectionModel([]);
                }}
                onSelectOne={(id) => {
                  const selectedIndex = selectionModel.indexOf(id);
                  let newSelected = [];
                  if (selectedIndex === -1)
                    newSelected = [...selectionModel, id];
                  else
                    newSelected = selectionModel.filter((item) => item !== id);
                  setSelectionModel(newSelected);
                }}
                onActionClick={handleActionMenuOpen}
              />
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredRows.map((row) => (
                <Grid key={row.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                  <GridItem row={row} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Bulk Action Bar (Bottom) */}
        {selectionModel.length > 0 && <BulkActionBar />}

        {/* Menus */}
        <Menu
          anchorEl={actionMenuAnchor}
          open={Boolean(actionMenuAnchor)}
          onClose={handleActionMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            sx: {
              borderRadius: ".625rem",
              minWidth: 180,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
          }}
        >
          <MenuItem onClick={handleActionMenuClose}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleActionMenuClose}>
            <ListItemIcon>
              <PersonAddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Assign To</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleActionMenuClose}>
            <ListItemIcon>
              <CommentIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Comment</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleActionMenuClose}>
            <ListItemIcon>
              <AttachFileIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Attachment</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleActionMenuClose}>
            <ListItemIcon>
              <HelpCenterIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>RFI</ListItemText>
          </MenuItem>
        </Menu>

        <Drawer
          anchor="right"
          open={Boolean(filterMenuAnchor)}
          onClose={() => setFilterMenuAnchor(null)}
          PaperProps={{ sx: { width: 340, display: "flex", flexDirection: "column", bgcolor: "#fff" } }}
          sx={{ zIndex: 1300 }}
        >
          {/* Header */}
          <Box sx={{ p: 2, display: "flex", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
            <FilterListIcon sx={{ color: "#D71E28", mr: 1, fontSize: "1.25rem" }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a" }}>
              Filter & Sort Options
            </Typography>
          </Box>

          {/* Content Body */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", p: 0, "&::-webkit-scrollbar": { width: 6 }, "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 4 } }}>
            {/* Sort Section */}
            <Box sx={{ p: 2, borderBottom: "1px solid #e2e8f0" }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                 <SwapVertIcon sx={{ fontSize: "1rem", color: "#64748b" }} />
                 <Typography variant="body2" sx={{ fontWeight: 700, color: "#1e293b" }}>Sort By</Typography>
              </Stack>
              <Stack spacing={0.5}>
                {["Case Name", "Case ID"].map(item => (
                  <Box key={item} sx={{ p: 1, px: 2, borderRadius: 2, cursor: "pointer", "&:hover": {bgcolor: "#f8fafc"} }}>
                     <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b" }}>{item}</Typography>
                  </Box>
                ))}
                {/* Active Sort */}
                <Box sx={{ p: 1, px: 2, borderRadius: 2, bgcolor: "#fef2f2", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                     <Typography variant="body2" sx={{ fontWeight: 600, color: "#D71E28" }}>Date Created</Typography>
                     <ArrowDownwardIcon sx={{ color: "#D71E28", fontSize: "1rem" }} /> 
                </Box>
                {["Case Type", "Status", "Assigned To", "Priority", "Business Unit", "Date Updated"].map(item => (
                  <Box key={item} sx={{ p: 1, px: 2, borderRadius: 2, cursor: "pointer", "&:hover": {bgcolor: "#f8fafc"} }}>
                     <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b" }}>{item}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Filter Section: Priority */}
            <Box sx={{ p: 2, borderBottom: "1px solid #e2e8f0" }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#1e293b", mb: 1.5 }}>Priority</Typography>
              <Stack spacing={1}>
                {/* Priority Option */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pl: 1, pr: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Checkbox size="small" disableRipple sx={{ color: "#cbd5e1", p: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#0f172a" }}>High</Typography>
                  </Stack>
                  <Chip label="High" size="small" sx={{ bgcolor: "#fee2e2", color: "#b91c1c", fontWeight: 700, borderRadius: 1.5, height: 24 }} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pl: 1, pr: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Checkbox size="small" disableRipple sx={{ color: "#cbd5e1", p: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#0f172a" }}>Medium</Typography>
                  </Stack>
                  <Chip label="Medium" size="small" sx={{ bgcolor: "#fef3c7", color: "#b45309", fontWeight: 700, borderRadius: 1.5, height: 24 }} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pl: 1, pr: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Checkbox size="small" disableRipple sx={{ color: "#cbd5e1", p: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#0f172a" }}>Low</Typography>
                  </Stack>
                  <Chip label="Low" size="small" sx={{ bgcolor: "#dcfce7", color: "#15803d", fontWeight: 700, borderRadius: 1.5, height: 24 }} />
                </Box>
              </Stack>
            </Box>

            {/* Filter Section: Case Type */}
            <Box sx={{ p: 2, borderBottom: "1px solid #e2e8f0" }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#1e293b", mb: 1.5 }}>Case Type</Typography>
              <Stack spacing={0.5}>
                {["ITC Case", "ITNE Case", "MSE Case", "WLF Case"].map((type) => (
                  <Box key={type} sx={{ display: "flex", alignItems: "center", px: 1 }}>
                    <Checkbox size="small" disableRipple sx={{ color: "#cbd5e1", p: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#0f172a", ml: 1 }}>{type}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Filter Section: Assigned To */}
            <Box sx={{ p: 2, borderBottom: "1px solid #e2e8f0" }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#1e293b", mb: 1.5 }}>Assigned To</Typography>
              <Stack spacing={0.5}>
                {[
                  { name: "David Williams", initials: "DW" },
                  { name: "Emily Rodriguez", initials: "ER" },
                  { name: "John Smith", initials: "JS" },
                ].map((assignee) => (
                  <Box key={assignee.name} sx={{ display: "flex", alignItems: "center", px: 1 }}>
                    <Checkbox size="small" disableRipple sx={{ color: "#cbd5e1", p: 0.5 }} />
                    <Box sx={{ width: 24, height: 24, borderRadius: "50%", bgcolor: "#fee2e2", color: "#D71E28", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, ml: 1, mr: 1.5 }}>
                      {assignee.initials}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#0f172a" }}>{assignee.name}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Filter Section: Status */}
            <Box sx={{ p: 2, pb: 4 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#1e293b", mb: 1.5 }}>Status</Typography>
              <Stack spacing={0.5}>
                {["In Review", "Pending", "Ready"].map((status) => (
                  <Box key={status} sx={{ display: "flex", alignItems: "center", px: 1 }}>
                    <Checkbox size="small" disableRipple sx={{ color: "#cbd5e1", p: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#0f172a", ml: 1 }}>{status}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

          </Box>
        </Drawer>

        {/* Side Drawer for Form */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ sx: { width: { xs: "100%", sm: 640 }, p: 0, display: "flex", flexDirection: "column" } }}
          sx={{ zIndex: 1300 }}
        >
          {/* Header */}
          <Box sx={{ bgcolor: "#D71E28", color: "white", p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <DescriptionIcon />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {drawerMode === "create" ? "Create New Case" : "Edit Case"}
                </Typography>
              </Stack>
              <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "white", p: 0 }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Fill in the details below to create a new case. All fields marked with * are required.
            </Typography>
          </Box>

          {/* Scrollable Content Body */}
          <Box sx={{ p: 3, flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
            
            {/* Section 1: Customer Information */}
            <Box sx={{ border: "1px solid #e2e8f0", borderRadius: ".5rem", p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <PersonOutlineIcon sx={{ color: "#D71E28", fontSize: "1.2rem" }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b" }}>Customer Information</Typography>
              </Stack>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600, color: "#475569", display: 'block', mb: 0.5 }}>
                  Customer Name <span style={{color: "#D71E28"}}>*</span>
                </Typography>
                <TextField 
                  fullWidth 
                  placeholder="Enter customer full name" 
                  size="small" 
                  defaultValue={selectedRow?.name || ""}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }}
                />
              </Box>
            </Box>

            {/* Section 2: Case Details */}
            <Box sx={{ border: "1px solid #e2e8f0", borderRadius: ".5rem", p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <LocalOfferOutlinedIcon sx={{ color: "#D71E28", fontSize: "1.2rem" }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b" }}>Case Details</Typography>
              </Stack>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={6}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: "#475569", display: 'block', mb: 0.5 }}>
                    Case Type <span style={{color: "#D71E28"}}>*</span>
                  </Typography>
                  <TextField 
                    select 
                    fullWidth 
                    size="small" 
                    defaultValue={selectedRow?.type || ""} 
                    SelectProps={{ native: true }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }}
                  >
                    <option value="" disabled>Select type</option>
                    <option value="Technical">Technical</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Security">Security</option>
                    <option value="HR">HR</option>
                    <option value="Design">Design</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </TextField>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: "#475569", display: 'block', mb: 0.5 }}>
                    Priority <span style={{color: "#D71E28"}}>*</span>
                  </Typography>
                  <TextField 
                    select 
                    fullWidth 
                    size="small" 
                    defaultValue={selectedRow?.priority || ""} 
                    SelectProps={{ native: true }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }}
                  >
                    <option value="" disabled>Select priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </TextField>
                </Grid>
              </Grid>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: "#475569", display: 'block', mb: 0.5 }}>
                  Assign To <span style={{color: "#D71E28"}}>*</span>
                </Typography>
                <TextField 
                  select 
                  fullWidth 
                  size="small" 
                  defaultValue={selectedRow?.assignedTo || ""} 
                  SelectProps={{ native: true }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }}
                >
                  <option value="" disabled>Select team member</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Mike Johnson">Mike Johnson</option>
                </TextField>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600, color: "#475569", display: 'block', mb: 0.5 }}>Description</Typography>
                <TextField 
                  fullWidth 
                  multiline 
                  rows={3} 
                  placeholder="Enter case description and relevant details..." 
                  defaultValue={selectedRow?.description || ""}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }}
                />
              </Box>
            </Box>

            {/* Section 3: Comments */}
            <Box sx={{ border: "1px solid #e2e8f0", borderRadius: ".5rem", p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <ChatBubbleOutlineIcon sx={{ color: "#D71E28", fontSize: "1.2rem" }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b" }}>Comments</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <TextField 
                  fullWidth 
                  placeholder="Add a comment..." 
                  size="small" 
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }}
                />
                <Button 
                  variant="contained" 
                  sx={{ 
                    minWidth: 40, width: 40, p: 0, 
                    bgcolor: "#D71E28", 
                    borderRadius: ".375rem",
                    "&:hover": {bgcolor: "#b91c1c"} 
                  }}
                >
                  <AddIcon />
                </Button>
              </Stack>
            </Box>

            {/* Section 4: Attachments */}
            <Box sx={{ border: "1px solid #e2e8f0", borderRadius: ".5rem", p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <AttachFileIcon sx={{ color: "#D71E28", fontSize: "1.2rem" }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b" }}>Attachments</Typography>
              </Stack>
              <Box sx={{ 
                border: "1px dashed #cbd5e1", 
                borderRadius: ".5rem", 
                p: 4, 
                textAlign: "center"
              }}>
                <CloudUploadOutlinedIcon sx={{ color: "#94a3b8", fontSize: "2rem", mb: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>Drag & drop files here</Typography>
                <Typography variant="caption" sx={{ color: "#64748b" }}>or click to browse files</Typography>
              </Box>
            </Box>
          </Box>

          {/* Fixed Footer */}
          <Box sx={{ p: 2, borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end", gap: 2, bgcolor: "#fff" }}>
            <Button 
              variant="outlined" 
              onClick={() => setDrawerOpen(false)} 
              sx={{ 
                flex: 1, 
                borderColor: "#e2e8f0", 
                color: "#0f172a", 
                textTransform: "none", 
                fontWeight: 600, 
                height: 44, 
                borderRadius: ".375rem",
                "&:hover": {borderColor: "#cbd5e1", bgcolor: "#f8fafc"} 
              }}
            >
              <CloseIcon sx={{ fontSize: "1rem", mr: 1}}/> Cancel
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                flex: 1, 
                bgcolor: "#D71E28", 
                textTransform: "none", 
                fontWeight: 600, 
                height: 44, 
                borderRadius: ".375rem",
                "&:hover": {bgcolor: "#b91c1c"} 
              }}
            >
              <NoteAddIcon sx={{ fontSize: "1.2rem", mr: 1}}/> {drawerMode === "create" ? "Create Case" : "Save Case"}
            </Button>
          </Box>
        </Drawer>

        {/* Create Filter Dialog */}
        <Dialog open={createFilterOpen} onClose={() => setCreateFilterOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '.75rem', p: 1 } }}>
          <DialogTitle sx={{ pb: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ color: '#D71E28', fontWeight: 700 }}>
                Create Custom Filter
              </Typography>
              <IconButton onClick={() => setCreateFilterOpen(false)} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, mb: 1 }}>
              Build a custom filter to quickly access cases that match your criteria.
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155', display: 'block', mb: 0.5 }}>Filter Name <span style={{color: "#D71E28"}}>*</span></Typography>
                <TextField fullWidth placeholder="e.g., Critical Fraud Cases" size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155', display: 'block', mb: 0.5 }}>Description (optional)</Typography>
                <TextField fullWidth placeholder="Describe what this filter shows..." multiline rows={2} size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155', display: 'block', mb: 0.5 }}>Icon</Typography>
                <TextField select fullWidth size="small" defaultValue="Star" SelectProps={{ native: true }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }}>
                  <option value="Star">⭐ Star</option>
                  <option value="Flag">🚩 Flag</option>
                  <option value="Clock">🕒 Clock</option>
                </TextField>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>Filter Criteria</Typography>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155', display: 'block', mb: 0.5 }}>Priority</Typography>
                  <TextField select fullWidth size="small" defaultValue="All" SelectProps={{ native: true }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }}>
                    <option value="All">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </TextField>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155', display: 'block', mb: 0.5 }}>Case Type</Typography>
                  <TextField select fullWidth size="small" defaultValue="All" SelectProps={{ native: true }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }}>
                    <option value="All">All</option>
                    <option value="Technical">Technical</option>
                    <option value="Security">Security</option>
                    <option value="Maintenance">Maintenance</option>
                  </TextField>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155', display: 'block', mb: 0.5 }}>Assigned To</Typography>
                  <TextField select fullWidth size="small" defaultValue="All" SelectProps={{ native: true }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }}>
                    <option value="All">All</option>
                    <option value="Me">Me</option>
                    <option value="Unassigned">Unassigned</option>
                  </TextField>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155', display: 'block', mb: 0.5 }}>Date Range</Typography>
                  <TextField select fullWidth size="small" defaultValue="All Time" SelectProps={{ native: true }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem" } }}>
                    <option value="All Time">All Time</option>
                    <option value="Today">Today</option>
                    <option value="This Week">This Week</option>
                    <option value="This Month">This Month</option>
                  </TextField>
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
            <Button variant="outlined" onClick={() => setCreateFilterOpen(false)} sx={{ borderRadius: ".375rem", textTransform: "none", fontWeight: 600, color: '#475569', borderColor: '#cbd5e1' }}>Cancel</Button>
            <Button variant="contained" onClick={() => setCreateFilterOpen(false)} sx={{ borderRadius: ".375rem", textTransform: "none", fontWeight: 600, bgcolor: "#f87171", color: "white", "&:hover": {bgcolor: "#ef4444"} }}>
               Create Filter
            </Button>
          </DialogActions>
        </Dialog>

        {/* Assign Dialog */}
        <Dialog open={assignDialogOpen} onClose={() => setAssignDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '.75rem', p: 1 } }}>
          <DialogTitle sx={{ pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>Assign Cases</Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>Assign {selectionModel.length} selected case{selectionModel.length !== 1 ? 's' : ''} to a team member</Typography>
            </Box>
            <IconButton onClick={() => setAssignDialogOpen(false)} size="small"><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#1e293b', display: 'block', mb: 0.5 }}>Assign to</Typography>
              <TextField select fullWidth size="small" defaultValue="" SelectProps={{ native: true, displayEmpty: true }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem", bgcolor: "#f8fafc" } }}>
                <option value="" disabled>Select team member</option>
                <option value="Alex Johnson">Alex Johnson</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
                <option value="Michael Chen">Michael Chen</option>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
            <Button variant="outlined" onClick={() => setAssignDialogOpen(false)} sx={{ borderRadius: ".375rem", textTransform: "none", fontWeight: 600, color: '#1e293b', borderColor: '#e2e8f0' }}>Cancel</Button>
            <Button variant="contained" onClick={() => setAssignDialogOpen(false)} sx={{ borderRadius: ".375rem", textTransform: "none", fontWeight: 600, bgcolor: "#f18d94", color: "white", "&:hover": {bgcolor: "#ef4444"}, boxShadow: "none" }}>Assign Cases</Button>
          </DialogActions>
        </Dialog>

        {/* Attachment Dialog */}
        <Dialog open={attachmentDialogOpen} onClose={() => setAttachmentDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '.75rem', p: 1 } }}>
          <DialogTitle sx={{ pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center' }}>
                <AttachFileIcon sx={{ color: '#D71E28', mr: 1, fontSize: '1.25rem' }} /> Add Attachment
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>Add attachments to {selectionModel.length} selected case{selectionModel.length !== 1 ? 's' : ''}</Typography>
            </Box>
            <IconButton onClick={() => setAttachmentDialogOpen(false)} size="small"><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#1e293b', display: 'block', mb: 0.5 }}>Drag & Drop Files</Typography>
              <Box sx={{ border: '2px dashed #fca5a5', borderRadius: '.5rem', p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#fff' }}>
                <Box sx={{ bgcolor: '#fee2e2', borderRadius: '50%', p: 1.5, mb: 2 }}>
                  <CloudUploadOutlinedIcon sx={{ color: '#f87171', fontSize: '2rem' }} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>Drag and drop files here</Typography>
                <Typography variant="caption" sx={{ color: '#64748b', mb: 2 }}>or click the button below to browse</Typography>
                <Button variant="outlined" startIcon={<DescriptionIcon />} sx={{ borderRadius: '.375rem', textTransform: 'none', color: '#1e293b', borderColor: '#e2e8f0', fontWeight: 600 }}>Browse Files</Button>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
            <Button variant="outlined" onClick={() => setAttachmentDialogOpen(false)} sx={{ borderRadius: ".375rem", textTransform: "none", fontWeight: 600, color: '#1e293b', borderColor: '#e2e8f0' }}>Cancel</Button>
            <Button variant="contained" onClick={() => setAttachmentDialogOpen(false)} sx={{ borderRadius: ".375rem", textTransform: "none", fontWeight: 600, bgcolor: "#f18d94", color: "white", "&:hover": {bgcolor: "#ef4444"}, boxShadow: "none" }}><AttachFileIcon sx={{ fontSize: '1.1rem', mr: 0.5 }} /> Upload 0 Files</Button>
          </DialogActions>
        </Dialog>

        {/* Comment Dialog */}
        <Dialog open={commentDialogOpen} onClose={() => setCommentDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '.75rem', p: 1 } }}>
          <DialogTitle sx={{ pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>Add Comment</Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>Add a comment to {selectionModel.length} selected case{selectionModel.length !== 1 ? 's' : ''}</Typography>
            </Box>
            <IconButton onClick={() => setCommentDialogOpen(false)} size="small"><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#1e293b', display: 'block', mb: 0.5 }}>Comment</Typography>
              <TextField 
                fullWidth 
                placeholder="Enter your comment here..." 
                multiline 
                rows={3} 
                size="small" 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: ".375rem",
                    bgcolor: "#f8fafc",
                    "&.Mui-focused fieldset": { borderColor: "#fcd34d", borderWidth: "2px" } 
                  } 
                }} 
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
            <Button variant="outlined" onClick={() => setCommentDialogOpen(false)} sx={{ borderRadius: ".375rem", textTransform: "none", fontWeight: 600, color: '#1e293b', borderColor: '#e2e8f0' }}>Cancel</Button>
            <Button variant="contained" onClick={() => setCommentDialogOpen(false)} sx={{ borderRadius: ".375rem", textTransform: "none", fontWeight: 600, bgcolor: "#f18d94", color: "white", "&:hover": {bgcolor: "#ef4444"}, boxShadow: "none" }}>Add Comment</Button>
          </DialogActions>
        </Dialog>

        {/* RFI Dialog */}
        <Dialog open={rfiDialogOpen} onClose={() => setRfiDialogOpen(false)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '.75rem', p: 1 } }}>
          <DialogTitle sx={{ pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center' }}>
                <DescriptionIcon sx={{ color: '#D71E28', mr: 1, fontSize: '1.25rem' }} /> Request for Information (RFI)
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>Send an RFI to {selectionModel.length} selected case{selectionModel.length !== 1 ? 's' : ''}</Typography>
            </Box>
            <IconButton onClick={() => setRfiDialogOpen(false)} size="small"><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#1e293b', display: 'block', mb: 0.5 }}>Select RFI Template</Typography>
                <TextField 
                  select 
                  fullWidth 
                  size="small" 
                  defaultValue="" 
                  SelectProps={{ native: true, displayEmpty: true }} 
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: ".375rem", bgcolor: "#f8fafc", "&.Mui-focused fieldset": { borderColor: "#fcd34d", borderWidth: "1px" } } }}
                >
                  <option value="" disabled>Choose a template to load...</option>
                  <option value="Template 1">Additional Document Review</option>
                  <option value="Template 2">Customer Identity Verification</option>
                </TextField>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#1e293b', display: 'block', mb: 0.5 }}>RFI Content</Typography>
                <TextField 
                  fullWidth 
                  placeholder="Select a template above or enter custom RFI content..." 
                  multiline 
                  rows={4} 
                  size="small" 
                  sx={{ 
                    "& .MuiOutlinedInput-root": { 
                      borderRadius: ".375rem", 
                      bgcolor: '#f8fafc',
                      "&.Mui-focused fieldset": { borderColor: "#fca5a5" }
                    } 
                  }} 
                />
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5, px: 0.5 }}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>0 characters</Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>{selectionModel.length} cases will receive this RFI</Typography>
                </Stack>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
            <Button variant="outlined" onClick={() => setRfiDialogOpen(false)} sx={{ borderRadius: ".375rem", textTransform: "none", fontWeight: 600, color: '#1e293b', borderColor: '#e2e8f0' }}>Cancel</Button>
            <Button variant="contained" onClick={() => setRfiDialogOpen(false)} sx={{ borderRadius: ".375rem", textTransform: "none", fontWeight: 600, bgcolor: "#f18d94", color: "white", "&:hover": {bgcolor: "#ef4444"}, boxShadow: "none" }}><DescriptionIcon sx={{ fontSize: '1.1rem', mr: 0.5 }} /> Send RFI to {selectionModel.length} Cases</Button>
          </DialogActions>
        </Dialog>

      </Box>
    </>
  );
};

export default CaseManagement;
