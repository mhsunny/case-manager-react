import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: "auto",
        backgroundColor: "#fff",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              WELLS <span className="footer-brand-light">FARGO</span>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, maxWidth: 200 }}
            >
              Connecting you to the future of case management with seamless
              integration and AI-driven insights.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()} CaseFlow React App. All rights
              reserved.
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
            >
              RESOURCES
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                color="text.secondary"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Dashboard
              </Link>
              <Link
                href="#"
                color="text.secondary"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Case Management
              </Link>
              <Link
                href="#"
                color="text.secondary"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Client Relations
              </Link>
              <Link
                href="#"
                color="text.secondary"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Analytics
              </Link>
            </Box>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
            >
              SUPPORT
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                color="text.secondary"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Help Center
              </Link>
              <Link
                href="#"
                color="text.secondary"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Contact Us
              </Link>
              <Link
                href="#"
                color="text.secondary"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                API Documentation
              </Link>
              <Link
                href="#"
                color="text.secondary"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                System Status
              </Link>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
            >
              LEGAL
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                color="text.secondary"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                color="text.secondary"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                color="text.secondary"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Cookie Settings
              </Link>
              <Link
                href="#"
                color="text.secondary"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Security Guide
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
