"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useScholarships } from "~/hooks/use-scholarships";
import { formatDate, formatCurrency } from "~/lib/utils";

export function ScholarshipListClient() {
  const [search, setSearch] = useState("");
  const [fullyFunded, setFullyFunded] = useState<boolean | undefined>(undefined);

  const { data, isLoading } = useScholarships({
    search: search || undefined,
    fully_funded: fullyFunded,
    per_page: 12,
  });

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 5 }}>
        <TextField
          placeholder="Search scholarships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} /></InputAdornment>,
          }}
        />
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Funding Type</InputLabel>
          <Select
            value={fullyFunded === undefined ? "" : String(fullyFunded)}
            label="Funding Type"
            onChange={(e) => setFullyFunded(e.target.value === "" ? undefined : e.target.value === "true")}
            sx={{ borderRadius: 2.5 }}
          >
            <MenuItem value="">All Scholarships</MenuItem>
            <MenuItem value="true">Fully Funded</MenuItem>
            <MenuItem value="false">Partial</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {isLoading && (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid item xs={12} sm={6} lg={4} key={i}>
              <Skeleton variant="rounded" height={200} sx={{ borderRadius: 4 }} />
            </Grid>
          ))}
        </Grid>
      )}

      {data && (
        <Grid container spacing={3}>
          {data.items.map((s: any) => (
            <Grid item xs={12} sm={6} lg={4} key={s.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", transition: "all 0.2s", "&:hover": { boxShadow: 3, transform: "translateY(-2px)" } }}>
                <CardContent sx={{ flex: 1, p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.3 }}>{s.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{s.country}</Typography>
                    </Box>
                    {s.is_fully_funded && (
                      <Chip label="Fully Funded" size="small" color="success" sx={{ ml: 1, fontWeight: 600 }} />
                    )}
                  </Box>
                  {s.university && <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{s.university}</Typography>}
                  {s.max_amount_usd && (
                    <Typography variant="h6" color="primary.main" fontWeight={700} sx={{ mb: 1.5 }}>
                      Up to {formatCurrency(s.max_amount_usd)}
                    </Typography>
                  )}
                  {s.min_cgpa && <Typography variant="caption" color="text.secondary">Min CGPA: {s.min_cgpa}</Typography>}
                </CardContent>
                <CardActions sx={{ px: 3, pb: 2.5, justifyContent: "space-between" }}>
                  {s.deadline ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "text.secondary" }}>
                      <CalendarMonthIcon sx={{ fontSize: 14 }} />
                      <Typography variant="caption">Deadline: {formatDate(s.deadline)}</Typography>
                    </Box>
                  ) : <Box />}
                  {s.application_url && (
                    <Button
                      href={s.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      size="small"
                      sx={{ borderRadius: 99 }}
                    >
                      Apply
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
