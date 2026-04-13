import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D71E28", // CaseFlow React App Red
      light: "#EB2D37",
      dark: "#B11821",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFCD41", // CaseFlow React App Yellow
      contrastText: "#1e293b",
    },
    background: {
      default: "#f4f4f4",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily:
      'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    h1: { fontSize: "2.5rem", fontWeight: 700, color: "#1e293b" },
    h2: { fontSize: "2rem", fontWeight: 600, color: "#1e293b" },
    h3: { fontSize: "1.75rem", fontWeight: 600, color: "#1e293b" },
    h4: { fontSize: "1.5rem", fontWeight: 600, color: "#1e293b" },
    h5: { fontSize: "1.25rem", fontWeight: 600, color: "#1e293b" },
    h6: { fontSize: "1rem", fontWeight: 600, color: "#1e293b" },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 24px",
          borderRadius: 8,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedSecondary: {
          border: "1.5px solid #FFCD41",
          "&:hover": {
            backgroundColor: "#FFD766",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid #f0f0f0",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid #e2e8f0",
        },
      },
    },
  },
});

export default theme;
