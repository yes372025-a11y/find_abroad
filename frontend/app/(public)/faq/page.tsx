import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  { q: "How do I apply to a university?", a: "Book a consultation — our experts guide you through every step, from shortlisting to visa." },
  { q: "What documents do I need?", a: "Typically: passport, transcripts, SOP, LORs, and language test scores (IELTS/TOEFL). Requirements vary by country." },
  { q: "Is Find Abroad free to use?", a: "Yes! Browsing universities, checking scholarships, and booking your first consultation are completely free." },
  { q: "How long does the application process take?", a: "Most applications take 3–6 months from shortlisting to offer. We help you stay on track." },
  { q: "Can I apply without work experience?", a: "Absolutely. Many top programs admit fresh graduates, especially for Masters programs." },
  { q: "Which countries do you support?", a: "USA, UK, Canada, Australia, Germany, and Ireland — with more being added." },
  { q: "How does the loan eligibility checker work?", a: "You fill in a quick 4-step form with your academic and financial profile, and we match you with eligible lenders." },
];

export default function FAQPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Typography variant="h3" fontWeight={800} mb={1.5}>Frequently Asked Questions</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, mb: 6 }}>
          Everything you need to know about studying abroad with Find Abroad.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {faqs.map((faq, i) => (
            <Accordion key={i} disableGutters elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: "12px !important", "&:before": { display: "none" } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1 }}>
                <Typography fontWeight={600}>{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 2.5 }}>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
