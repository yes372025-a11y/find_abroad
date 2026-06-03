"use client";

import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";

// Modern dark theme with neon coral accent - appealing to college students
export const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF6B35",
      light: "#FF8F66",
      dark: "#E85A2A",
      contrastText: "#0A0A0B",
    },
    secondary: {
      main: "#00D9FF",
      contrastText: "#0A0A0B",
    },
    success: {
      main: "#10B981",
    },
    background: {
      default: "#0A0A0B",
      paper: "#141416",
    },
    text: {
      primary: "#FAFAFA",
      secondary: "#A1A1AA",
    },
    divider: "rgba(255,255,255,0.08)",
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
    h1: { fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em" },
    h2: { fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" },
    h3: { fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" },
    h4: { fontWeight: 600, letterSpacing: "-0.01em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.3)",
    "0 2px 8px rgba(0,0,0,0.4)",
    "0 4px 16px rgba(0,0,0,0.5)",
    "0 8px 24px rgba(0,0,0,0.6)",
    "0 12px 32px rgba(0,0,0,0.7)",
    ...Array(19).fill("0 16px 40px rgba(0,0,0,0.8)"),
  ] as any,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          fontWeight: 600,
          boxShadow: "none",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": { 
            boxShadow: "none",
            transform: "translateY(-1px)",
          },
        },
        containedPrimary: {
          background: "#FF6B35",
          color: "#0A0A0B",
          "&:hover": { 
            background: "#FF8F66",
          },
        },
        outlinedPrimary: {
          borderColor: "rgba(255,107,53,0.5)",
          color: "#FF6B35",
          "&:hover": {
            borderColor: "#FF6B35",
            background: "rgba(255,107,53,0.08)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "#141416",
          boxShadow: "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", size: "small" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": { 
            borderRadius: "10px",
            background: "rgba(255,255,255,0.03)",
            "& fieldset": {
              borderColor: "rgba(255,255,255,0.1)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255,107,53,0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF6B35",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { borderRadius: "10px" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(10,10,11,0.8)",
          backdropFilter: "blur(20px)",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          background: "#0A0A0B",
        },
        body: {
          background: "#0A0A0B",
          scrollbarWidth: "thin",
          scrollbarColor: "#27272a transparent",
        },
      },
    },
  },
});

export default function MuiThemeRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "mui" });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args: any[]) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
