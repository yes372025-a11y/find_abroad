import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";

export const metadata: Metadata = { title: "Blog" };

const posts = [
  { title: "Top 10 Universities for MS in Computer Science in 2025", tag: "Universities", date: "Jan 15, 2025", summary: "A comprehensive guide to the best CS programs globally — rankings, fees, and acceptance rates." },
  { title: "How to Get a Fully-Funded Scholarship Abroad", tag: "Scholarships", date: "Feb 3, 2025", summary: "Step-by-step guide to finding and winning scholarships that cover tuition, living, and more." },
  { title: "Education Loans Without Collateral: A Complete Guide", tag: "Loans", date: "Mar 12, 2025", summary: "Prodigy Finance, MPOWER, and other lenders that offer loans without requiring collateral." },
  { title: "Study in Germany for Free: Public Universities Explained", tag: "Study Abroad", date: "Apr 8, 2025", summary: "Germany offers world-class education at near-zero tuition. Here's what you need to know." },
  { title: "SOP Writing Tips That Actually Get You Admitted", tag: "Application", date: "May 5, 2025", summary: "Common mistakes to avoid and proven strategies to write a compelling Statement of Purpose." },
  { title: "Post-Study Work Visa Options by Country", tag: "Visa", date: "May 20, 2025", summary: "A comparison of post-study work permits in the USA, UK, Canada, Australia, Germany, and Ireland." },
];

export default function BlogPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Typography variant="h3" fontWeight={800} mb={1.5}>Blog</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, mb: 8 }}>
          Expert guides, tips, and insights to help you study abroad successfully.
        </Typography>
        <Grid container spacing={3}>
          {posts.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.title}>
              <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", height: "100%", transition: "all 0.2s", "&:hover": { boxShadow: 3, transform: "translateY(-2px)" } }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Chip label={p.tag} size="small" color="primary" variant="outlined" />
                    <Typography variant="caption" color="text.secondary">{p.date}</Typography>
                  </Box>
                  <Typography variant="subtitle1" fontWeight={700} mb={1.5} sx={{ lineHeight: 1.4 }}>{p.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{p.summary}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
