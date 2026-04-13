import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Stack,
  Divider,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  Breadcrumbs,
  Link as MuiLink,
  Card,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import ComputerIcon from "@mui/icons-material/Computer";

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

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
            Settings
          </Typography>
        </Breadcrumbs>
      </Stack>

      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        System Settings
      </Typography>

      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid #f0f0f0",
        }}
      >
        <Grid container sx={{ minHeight: 600 }}>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{ borderRight: "1px solid #f0f0f0", bgcolor: "#f8fafc" }}
          >
            <Tabs
              orientation="vertical"
              value={tabIndex}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  alignItems: "flex-start",
                  textAlign: "left",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 2,
                  px: 3,
                  "&.Mui-selected": { color: "primary.main", bgcolor: "#fff" },
                },
                "& .MuiTabs-indicator": { left: 0, right: "auto", width: 4 },
              }}
            >
              <Tab
                icon={<PersonIcon sx={{ mb: 0.5 }} />}
                iconPosition="start"
                label="Profile"
              />
              <Tab
                icon={<NotificationsIcon sx={{ mb: 0.5 }} />}
                iconPosition="start"
                label="Notifications"
              />
              <Tab
                icon={<SecurityIcon sx={{ mb: 0.5 }} />}
                iconPosition="start"
                label="Security"
              />
              <Tab
                icon={<ComputerIcon sx={{ mb: 0.5 }} />}
                iconPosition="start"
                label="Platform"
              />
            </Tabs>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Box sx={{ p: { xs: 3, md: 6 } }}>
              {tabIndex === 0 && (
                <Stack spacing={4}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "primary.main",
                        fontSize: "2rem",
                      }}
                    >
                      AD
                    </Avatar>
                    <Box>
                      <Button variant="outlined" size="small" sx={{ mb: 1 }}>
                        Change Avatar
                      </Button>
                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                      >
                        JPG, GIF or PNG. Max size of 800K
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="First Name"
                        fullWidth
                        defaultValue="Alex"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Last Name"
                        fullWidth
                        defaultValue="Doe"
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        label="Email Address"
                        fullWidth
                        defaultValue="alex.doe@wellsfargo.com"
                        disabled
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        label="Job Title"
                        fullWidth
                        defaultValue="Senior Case Manager"
                      />
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      pt: 2,
                    }}
                  >
                    <Button variant="text">Cancel</Button>
                    <Button variant="contained" sx={{ px: 4, fontWeight: 700 }}>
                      Save Changes
                    </Button>
                  </Box>
                </Stack>
              )}

              {tabIndex === 1 && (
                <Stack spacing={3}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Email Notifications
                  </Typography>
                  <Card variant="outlined" sx={{ borderRadius: ".625rem" }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="New case assignment"
                        />
                        <Divider />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Status updates on followed cases"
                        />
                        <Divider />
                        <FormControlLabel
                          control={<Switch />}
                          label="Weekly summary reports"
                        />
                        <Divider />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Security alerts"
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                  <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>
                    Push Notifications
                  </Typography>
                  <Card variant="outlined" sx={{ borderRadius: ".625rem" }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Desktop notifications"
                        />
                        <Divider />
                        <FormControlLabel
                          control={<Switch />}
                          label="Mention in comments"
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              )}

              {tabIndex === 2 && (
                <Stack spacing={4}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Change Password
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={12}>
                      <TextField
                        label="Current Password"
                        type="password"
                        fullWidth
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Divider />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Two-Factor Authentication
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "primary.main",
                      color: "#fff",
                      borderRadius: ".625rem",
                    }}
                  >
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Two-factor authentication adds an extra layer of security
                      to your account by requiring more than just a password to
                      log in.
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ fontWeight: 700, color: "primary.main" }}
                    >
                      Enable 2FA
                    </Button>
                  </Box>
                </Stack>
              )}

              {tabIndex === 3 && (
                <Stack spacing={4}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Display Preferences
                  </Typography>
                  <Stack spacing={2}>
                    <FormControlLabel
                      control={<Switch />}
                      label="Dark Mode (Beta)"
                    />
                    <Divider />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="High Contrast Accessibility"
                    />
                    <Divider />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Compact view by default"
                    />
                  </Stack>
                  <Divider />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "error.main" }}
                  >
                    Danger Zone
                  </Typography>
                  <Paper
                    sx={{
                      p: 3,
                      border: "1px solid #ef4444",
                      bgcolor: "#fef2f2",
                      borderRadius: ".625rem",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      Clear Local Cache
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      This will remove all locally stored drafts and application
                      state. This action cannot be undone.
                    </Typography>
                    <Button variant="contained" color="error">
                      Reset Local Data
                    </Button>
                  </Paper>
                </Stack>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Settings;
