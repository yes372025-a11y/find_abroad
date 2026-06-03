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
import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useUniversities } from "~/hooks/use-universities";
import { formatCurrency } from "~/lib/utils";

interface Props { defaultCountry?: string; }

const countries = [
  { value: "", label: "All Countries" },
  { value: "usa", label: "USA" },
  { value: "uk", label: "UK" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "germany", label: "Germany" },
  { value: "ireland", label: "Ireland" },
];

export function UniversityListClient({ defaultCountry = "" }: Props) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState(defaultCountry);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useUniversities({
    search: search || undefined,
    country: country || undefined,
    page,
    per_page: 12,
  });

  return (
    <Box>
      {/* Filters */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 5 }}>
        <TextField
          placeholder="Search universities..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          sx={{ flex: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} /></InputAdornment>,
          }}
        />
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Country</InputLabel>
          <Select
            value={country}
            label="Country"
            onChange={(e) => { setCountry(e.target.value); setPage(1); }}
            sx={{ borderRadius: 2.5 }}
          >
            {countries.map((c) => (
              <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {isLoading && (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid item xs={12} sm={6} lg={4} key={i}>
              <Card sx={{ p: 2.5 }}>
                <Skeleton variant="rounded" width={48} height={48} sx={{ mb: 2 }} />
                <Skeleton variant="text" sx={{ fontSize: 18 }} width="75%" />
                <Skeleton variant="text" width="50%" />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {isError && <Alert severity="error" sx={{ borderRadius: 2.5 }}>Failed to load universities. Please try again.</Alert>}

      {data && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {data.meta.total} universities found
          </Typography>
          <Grid container spacing={3}>
            {data.items.map((uni: any) => (
              <Grid item xs={12} sm={6} lg={4} key={uni.id}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", transition: "all 0.2s", "&:hover": { boxShadow: 3, transform: "translateY(-2px)" } }}>
                  <CardContent sx={{ flex: 1, p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2.5 }}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.3 }}>{uni.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {uni.city ? `${uni.city}, ` : ""}{uni.country}
                        </Typography>
                      </Box>
                      {uni.world_ranking && (
                        <Chip label={`#${uni.world_ranking}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 700 }} />
                      )}
                    </Box>
                    <Grid container spacing={2}>
                      {uni.avg_tuition_usd && (
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Avg Tuition</Typography>
                          <Typography variant="body2" fontWeight={600}>{formatCurrency(uni.avg_tuition_usd)}/yr</Typography>
                        </Grid>
                      )}
                      {uni.min_cgpa && (
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Min CGPA</Typography>
                          <Typography variant="body2" fontWeight={600}>{uni.min_cgpa}</Typography>
                        </Grid>
                      )}
                      {uni.min_ielts && (
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Min IELTS</Typography>
                          <Typography variant="body2" fontWeight={600}>{uni.min_ielts}</Typography>
                        </Grid>
                      )}
                      {uni.intakes && (
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Intakes</Typography>
                          <Typography variant="body2" fontWeight={600}>{uni.intakes}</Typography>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ px: 3, pb: 2.5 }}>
                    <Button fullWidth variant="outlined" size="small" endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />} sx={{ borderRadius: 2.5 }}>
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {data.meta.pages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Pagination
                count={data.meta.pages}
                page={page}
                onChange={(_, v) => setPage(v)}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
