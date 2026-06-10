import type { Metadata } from "next";
import { LoansPage } from "~/components/sections/loans-page-client";

export const metadata: Metadata = {
  title: "Education Loan Eligibility Checker",
  description:
    "Check your education loan eligibility in minutes. Compare 20+ lenders — interest rates, collateral requirements, and moratorium periods — side by side.",
};

export default function LoansPageRoute() {
  return <LoansPage />;
}
