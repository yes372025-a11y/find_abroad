"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { documentsApi } from "~/lib/api";
import { formatDate } from "~/lib/utils";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DOC_TYPES = [
  { value: "passport", label: "Passport" },
  { value: "sop", label: "Statement of Purpose" },
  { value: "lor", label: "Letter of Recommendation" },
  { value: "mark_sheet", label: "Mark Sheet / Transcript" },
  { value: "offer_letter", label: "Offer Letter" },
  { value: "bank_statement", label: "Bank Statement" },
  { value: "visa", label: "Visa" },
  { value: "other", label: "Other" },
];

export function DocumentVaultClient() {
  const [docType, setDocType] = useState("other");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["documents"],
    queryFn: () => documentsApi.list().then((r) => r.data),
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("document_type", docType);
      await documentsApi.upload(fd);
      toast.success("Document uploaded successfully");
      qc.invalidateQueries({ queryKey: ["documents"] });
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Upload card */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>Upload Document</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
              <FormControl size="small" sx={{ minWidth: 220 }}>
                <InputLabel>Document Type</InputLabel>
                <Select value={docType} label="Document Type" onChange={(e) => setDocType(e.target.value)} sx={{ borderRadius: 2.5 }}>
                  {DOC_TYPES.map((t) => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                disabled={uploading}
                sx={{ whiteSpace: "nowrap" }}
              >
                {uploading ? "Uploading..." : "Choose File"}
                <input ref={fileRef} type="file" hidden accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleUpload} />
              </Button>
            </Stack>
            {uploading && <LinearProgress sx={{ mt: 2.5, borderRadius: 1 }} />}
          </CardContent>
        </Card>

        {/* Documents list */}
        {isLoading && (
          <Grid container spacing={2}>
            {[1, 2, 3].map((i) => <Grid item xs={12} sm={6} md={4} key={i}><Skeleton variant="rounded" height={100} sx={{ borderRadius: 3 }} /></Grid>)}
          </Grid>
        )}

        {isError && <Alert severity="error" sx={{ borderRadius: 2.5 }}>Failed to load documents.</Alert>}

        {data && (
          data.items?.length === 0 ? (
            <Alert severity="info" sx={{ borderRadius: 2.5 }}>No documents uploaded yet. Start by uploading your passport or transcripts.</Alert>
          ) : (
            <Grid container spacing={2}>
              {data.items?.map((doc: any) => (
                <Grid item xs={12} sm={6} md={4} key={doc.id}>
                  <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                        <InsertDriveFileIcon sx={{ color: "primary.main", mt: 0.25 }} />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" fontWeight={600} sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {doc.file_name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">{DOC_TYPES.find((t) => t.value === doc.document_type)?.label ?? doc.document_type}</Typography>
                          {doc.uploaded_at && (
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25 }}>
                              {formatDate(doc.uploaded_at)}
                            </Typography>
                          )}
                        </Box>
                        {doc.is_verified ? (
                          <Chip icon={<CheckCircleIcon />} label="Verified" color="success" size="small" />
                        ) : (
                          <Chip icon={<HourglassTopIcon />} label="Pending" size="small" variant="outlined" />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )
        )}
      </Box>
    </>
  );
}
