import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import DashboardRootIcon from "@mui/icons-material/DashboardOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpenOutlined";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ManageAccountsIcon from "@mui/icons-material/ManageAccountsOutlined";
import AssignmentIcon from "@mui/icons-material/AssignmentOutlined";
import WorkflowIcon from "@mui/icons-material/AccountTreeOutlined";
import AnalyticsIcon from "@mui/icons-material/AnalyticsOutlined";
import SidebarWidgets from "../sidebar/SidebarWidgets";
import useAppStore from "../../store/useAppStore";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 260;

const Sidebar = () => {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardRootIcon />, path: "/" },
    { text: "Cases", icon: <FolderOpenIcon />, path: "/cases" },
    { text: "Alerts", icon: <NotificationsIcon />, path: "/alerts" },
    { text: "Reports", icon: <DescriptionIcon />, path: "/reports" },
  ];

  const adminItems = [
    {
      text: "Manage Dashboards",
      icon: <DashboardRootIcon sx={{ fontSize: "1.2rem" }} />,
    },
    {
      text: "Manage Status",
      icon: <AnalyticsIcon sx={{ fontSize: "1.2rem" }} />,
    },
    {
      text: "Manage Action",
      icon: <AssignmentIcon sx={{ fontSize: "1.2rem" }} />,
    },
    {
      text: "Manage Workflow",
      icon: <WorkflowIcon sx={{ fontSize: "1.2rem" }} />,
    },
  ];

  const [adminOpen, setAdminOpen] = React.useState(true);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isSidebarOpen ? drawerWidth : 72,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isSidebarOpen ? drawerWidth : 72,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      <Toolbar sx={{ height: 110 }} />
      <Box
        sx={{
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {isSidebarOpen && (
          <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: ".625rem",
                bgcolor: "#D71E28",
                color: "#fff",
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: "#fff",
                  borderRadius: 0.5,
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 800, fontSize: "1.125rem", lineHeight: 1.2 }}
              >
                CaseFlow React App
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 600 }}
              >
                Case Manager
              </Typography>
            </Box>
          </Box>
        )}

        <List sx={{ px: 1.5, mt: 1 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ display: "block", mb: 0.5 }}
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 44,
                  justifyContent: isSidebarOpen ? "initial" : "center",
                  px: 2,
                  borderRadius: ".625rem",
                  backgroundColor:
                    location.pathname === item.path ? "#D71E28" : "transparent",
                  color:
                    location.pathname === item.path ? "#fff" : "text.secondary",
                  "&:hover": {
                    backgroundColor:
                      location.pathname === item.path
                        ? "#D71E28"
                        : "rgba(0,0,0,0.10)",
                  },
                  transition: "all 0.2s",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isSidebarOpen ? 2 : "auto",
                    justifyContent: "center",
                    color: location.pathname === item.path ? "#fff" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isSidebarOpen && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "0.85rem",
                      fontWeight: location.pathname === item.path ? 700 : 600,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}

          {/* Administration Section */}
          <ListItem disablePadding sx={{ display: "block", mt: 2 }}>
            <ListItemButton
              onClick={() => setAdminOpen(!adminOpen)}
              sx={{
                minHeight: 44,
                justifyContent: isSidebarOpen ? "initial" : "center",
                px: 2,
                borderRadius: ".625rem",
                color: "text.secondary",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                <ManageAccountsIcon />
              </ListItemIcon>
              {isSidebarOpen && (
                <>
                  <ListItemText
                    primary="Administration"
                    primaryTypographyProps={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  />
                  {adminOpen ? (
                    <ExpandLess sx={{ fontSize: "1.1rem" }} />
                  ) : (
                    <ExpandMore sx={{ fontSize: "1.1rem" }} />
                  )}
                </>
              )}
            </ListItemButton>
            {isSidebarOpen && adminOpen && (
              <List component="div" disablePadding sx={{ pl: 3 }}>
                {adminItems.map((admin) => (
                  <ListItemButton
                    key={admin.text}
                    sx={{ py: 0.5, px: 2, borderRadius: ".625rem", mb: 0.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
                      {admin.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={admin.text}
                      primaryTypographyProps={{
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: "text.secondary",
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            )}
          </ListItem>
        </List>

        <Divider sx={{ my: 2, mx: 2, opacity: 0.5 }} />

        <SidebarWidgets open={isSidebarOpen} />

        <Box sx={{ mt: "auto", p: 1.5 }}>
          <ListItemButton
            onClick={toggleSidebar}
            sx={{
              borderRadius: ".625rem",
              minHeight: 40,
              width: 40,
              p: 0,
              justifyContent: "center",
              bgcolor: "#f8fafc",
              border: "1px solid #e2e8f0",
            }}
          >
            <ChevronLeftIcon
              sx={{
                transform: isSidebarOpen ? "none" : "rotate(180deg)",
                transition: "transform 0.3s",
                fontSize: "1.2rem",
                color: "text.secondary",
              }}
            />
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
