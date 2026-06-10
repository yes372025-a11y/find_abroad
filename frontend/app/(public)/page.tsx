import type { Metadata } from 'next';
import { HeroSection } from '~/components/sections/hero';
import { ManifestoSection } from '~/components/sections/manifesto';
import { StatsSection } from '~/components/sections/stats';
import { FeaturesSection } from '~/components/sections/features';
import { DestinationsSection } from '~/components/sections/destinations';
import { LoanToolTeaser } from '~/components/sections/loan-tool-teaser';
import { TestimonialsSection } from '~/components/sections/testimonials';
import { CTASection } from '~/components/sections/cta';

export const metadata: Metadata = {
  title: 'Find Abroad — Your Study Abroad Partner',
  description: 'Discover top universities, scholarships, education loans, and expert counseling services. Transparent pricing from ₹0. Covers USA, UK, Canada, Australia, Germany, France, Ireland & New Zealand.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ManifestoSection />
      <FeaturesSection />
      <DestinationsSection />
      <LoanToolTeaser />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
