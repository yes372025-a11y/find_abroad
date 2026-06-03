import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";

export const metadata: Metadata = { title: "Success Stories" };

const stories = [
  { name: "Priya Sharma", from: "India", to: "University of Toronto, Canada", program: "MBA", scholarship: "$15,000/yr scholarship", rating: 5, quote: "Find Abroad connected me with a scholarship I never knew existed. The counselors were exceptional." },
  { name: "Rahul Menon", from: "India", to: "TU Munich, Germany", program: "MS Computer Science", scholarship: "Fully funded DAAD scholarship", rating: 5, quote: "From zero knowledge about German universities to a fully-funded admit — Find Abroad made it happen." },
  { name: "Ananya Patel", from: "India", to: "University College London, UK", program: "MSc Finance", scholarship: "Partial merit scholarship", rating: 5, quote: "The loan checker was spot on. I got approved for exactly the amount predicted." },
  { name: "Vikram Singh", from: "India", to: "University of Melbourne, Australia", program: "MS Data Science", scholarship: "University scholarship", rating: 5, quote: "Booked a consultation on a whim. Six months later I had an Australian student visa." },
];

export default function SuccessStoriesPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Typography variant="h3" fontWeight={800} mb={1.5}>Success Stories</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, mb: 8 }}>
          Real students. Real results. Here's how Find Abroad changed their lives.
        </Typography>
        <Grid container spacing={3}>
          {stories.map((s) => (
            <Grid item xs={12} md={6} key={s.name}>
              <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", height: "100%" }}>
                <CardContent sx={{ p: 4 }}>
                  <Rating value={s.rating} readOnly size="small" sx={{ color: "#f59e0b", mb: 2 }} />
                  <Typography variant="body1" sx={{ fontStyle: "italic", mb: 3, lineHeight: 1.7, color: "text.secondary" }}>
                    "{s.quote}"
                  </Typography>
                  <Box>
                    <Typography fontWeight={700}>{s.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{s.program} · {s.to}</Typography>
                    <Chip label={s.scholarship} size="small" color="success" sx={{ mt: 1.5, fontWeight: 600 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
