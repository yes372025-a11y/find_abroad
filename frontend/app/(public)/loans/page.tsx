import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LoanEligibilityWizard } from "~/components/forms/loan-eligibility-wizard";

export const metadata: Metadata = {
  title: "Education Loan Eligibility Checker",
  description: "Check loan eligibility in minutes.",
};

export default function LoansPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 860, mx: "auto" }}>
        <Typography variant="h3" fontWeight={800} mb={1.5}>Education Loan Checker</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, mb: 6 }}>
          Assess your eligibility and find the best lenders for your study abroad journey.
        </Typography>
        <LoanEligibilityWizard />
      </Box>
    </Box>
  );
}
