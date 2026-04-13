import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  Avatar,
  Link,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooksOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import ShieldIcon from "@mui/icons-material/ShieldOutlined";
import useAppStore from "../../store/useAppStore";
import { useState } from "react";

const Navbar = () => {
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (event) =>
    setProfileMenuAnchor(event.currentTarget);
  const handleProfileMenuClose = () => setProfileMenuAnchor(null);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#D71E28",
        color: "#fff",
        boxShadow: "none",
        borderBottom: "5px solid #FFCD41",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", height: 90 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              bgcolor: "#fff",
              p: 0.5,
              borderRadius: 1,
              mr: 2,
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#D71E28",
                borderRadius: 0.5,
              }}
            />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "30px",
              color: "#fff",
            }}
          >
            CaseFlow React App{" "}
            <Typography
              className="navbar-brand-subtitle"
              sx={{ fontSize: "1.125rem", fontWeight: 600 }}
            >
              | Case Management System
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
          >
            <Link
              href="#"
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                fontSize: "0.8rem",
                fontWeight: 500,
                opacity: 0.9,
                "&:hover": { opacity: 1 },
              }}
            >
              <LibraryBooksIcon sx={{ fontSize: "1.2rem" }} /> User Guide
            </Link>
            <Link
              href="#"
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                fontSize: "0.8rem",
                fontWeight: 500,
                opacity: 0.9,
                "&:hover": { opacity: 1 },
              }}
            >
              <SupportAgentIcon sx={{ fontSize: "1.2rem" }} /> Support
            </Link>
            <Link
              href="#"
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                fontSize: "0.8rem",
                fontWeight: 500,
                opacity: 0.9,
                "&:hover": { opacity: 1 },
              }}
            >
              <HelpOutlineIcon sx={{ fontSize: "1.2rem" }} /> Help
            </Link>
          </Stack>

          <IconButton
            color="inherit"
            sx={{ opacity: 0.9 }}
            onClick={handleProfileMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              elevation: 4,
              sx: {
                width: 320,
                mt: 1.5,
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                "& .MuiMenuItem-root": {
                  py: 1.25,
                  px: 2,
                },
              },
            }}
          >
            {/* Profile Info */}
            <Box sx={{ p: 2, pb: 1.5 }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#FDEAEA",
                    color: "#D71E28",
                    width: 48,
                    height: 48,
                  }}
                >
                  <PersonOutlineIcon sx={{ fontSize: "1.75rem" }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, lineHeight: 1.2, color: "#0f172a" }}
                  >
                    Sarah Mitchell
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#64748b", fontSize: "0.80rem" }}
                  >
                    sarah.mitchell@wellsfargo.com
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                gap={1}
                sx={{ mb: 1 }}
              >
                <Chip
                  icon={
                    <ShieldIcon
                      sx={{ color: "#fff !important", fontSize: "1rem" }}
                    />
                  }
                  label="Case Manager"
                  size="small"
                  sx={{
                    bgcolor: "#D71E28",
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: 1.5,
                    "& .MuiChip-icon": { ml: "4px" },
                  }}
                />
                <Chip
                  label="Senior Agent"
                  size="small"
                  sx={{
                    bgcolor: "#f1f5f9",
                    color: "#1e293b",
                    fontWeight: 600,
                    borderRadius: 1.5,
                  }}
                />
                <Chip
                  label="Team Lead"
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: "#e2e8f0",
                    color: "#1e293b",
                    fontWeight: 600,
                    borderRadius: 1.5,
                  }}
                />
              </Stack>
            </Box>

            <Divider sx={{ borderColor: "#e2e8f0" }} />

            {/* Performance */}
            <Box sx={{ p: 2 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: "#64748b",
                  display: "block",
                  mb: 1.5,
                }}
              >
                Your Performance
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ px: 2 }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: "#dc2626",
                      lineHeight: 1,
                      mb: 0.5,
                    }}
                  >
                    24
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#64748b", fontWeight: 500 }}
                  >
                    Cases
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: "#16a34a",
                      lineHeight: 1,
                      mb: 0.5,
                    }}
                  >
                    18
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#64748b", fontWeight: 500 }}
                  >
                    Resolved
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: "#2563eb",
                      lineHeight: 1,
                      mb: 0.5,
                    }}
                  >
                    95%
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#64748b", fontWeight: 500 }}
                  >
                    Rating
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Divider sx={{ borderColor: "#e2e8f0" }} />

            {/* Account Links */}
            <Box sx={{ py: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: "#64748b",
                  display: "block",
                  px: 2,
                  mb: 0.5,
                }}
              >
                Account
              </Typography>
              <MenuItem onClick={handleProfileMenuClose}>
                <ListItemIcon>
                  <PersonOutlineIcon
                    fontSize="small"
                    sx={{ color: "#475569" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="My Profile"
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    color: "#1e293b",
                  }}
                />
              </MenuItem>
              <MenuItem
                onClick={handleProfileMenuClose}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ListItemIcon>
                    <NotificationsNoneIcon
                      fontSize="small"
                      sx={{ color: "#475569" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Notifications"
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      color: "#1e293b",
                    }}
                  />
                </Box>
                <Badge
                  badgeContent={3}
                  color="error"
                  sx={{
                    mr: 2,
                    "& .MuiBadge-badge": {
                      bgcolor: "#D71E28",
                      fontWeight: 700,
                    },
                  }}
                />
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <ListItemIcon>
                  <CreditCardIcon fontSize="small" sx={{ color: "#475569" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Credentials"
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    color: "#1e293b",
                  }}
                />
              </MenuItem>
              <MenuItem
                onClick={handleProfileMenuClose}
                sx={{ bgcolor: "#f1f5f9", mx: 1, borderRadius: 1.5, my: 0.5 }}
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="small" sx={{ color: "#475569" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    color: "#1e293b",
                  }}
                />
              </MenuItem>
            </Box>

            <Divider sx={{ borderColor: "#e2e8f0" }} />

            {/* Log Out */}
            <Box sx={{ py: 0.5 }}>
              <MenuItem onClick={handleProfileMenuClose} sx={{ mt: 0.5 }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" sx={{ color: "#dc2626" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Log Out"
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    color: "#dc2626",
                    fontWeight: 500,
                  }}
                />
              </MenuItem>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
