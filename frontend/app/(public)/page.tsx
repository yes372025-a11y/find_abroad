import type { Metadata } from 'next';
import { HeroSection } from '~/components/sections/hero';
import { FeaturesSection } from '~/components/sections/features';
import { DestinationsSection } from '~/components/sections/destinations';
import { LoanToolTeaser } from '~/components/sections/loan-tool-teaser';
import { TestimonialsSection } from '~/components/sections/testimonials';
import { CTASection } from '~/components/sections/cta';
import { StatsSection } from '~/components/sections/stats';

export const metadata: Metadata = {
  title: 'Find Abroad — Your Study Abroad Partner',
  description: 'Discover top universities, scholarships, and education loans.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <DestinationsSection />
      <LoanToolTeaser />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
