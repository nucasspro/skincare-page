"use client";

import { MontserratFont } from '../../fonts';
import BrandStorySection from './components/sections/BrandStorySection';
import DeepProtectionSection from './components/sections/DeepProtectionSection';
import HeroSection from './components/sections/HeroSection';
import IngredientsSection from './components/sections/IngredientsSection';
import NewGenerationSection from './components/sections/NewGenerationSection';
import PDRNSection from './components/sections/PDRNSection';
import ReviewsSection from './components/sections/ReviewsSection';
import TestReportSection from './components/sections/TestReportSection';
import ThreeCBenefitsSection from './components/sections/ThreeCBenefitsSection';
import ThreeLayerProtectionSection from './components/sections/ThreeLayerProtectionSection';
import UsageSection from './components/sections/UsageSection';

export default function LandingPage() {
  return (
    <main className={`w-full min-h-screen bg-gradient-to-b from-white via-[#DDECFA] to-white text-black text-base leading-relaxed ${MontserratFont.variable} overflow-y-scroll overflow-x-hidden snap-y snap-mandatory` }>
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: New Generation Sunscreen */}
      <NewGenerationSection />

      {/* Section 3: 3-Layer Protection */}
      <ThreeLayerProtectionSection />

      {/* Section 4: Ingredients */}
      <IngredientsSection />

      {/* Section 5: PDRN - Có thể bạn chưa biết? */}
      <PDRNSection />

      {/* Section 6: 3C Công dụng "Không tưởng" */}
      <ThreeCBenefitsSection />

      {/* Section 7: Deep Protection & Nourishment */}
      <DeepProtectionSection />

      {/* Section 8: Test Report */}
      <TestReportSection />

      {/* Section 8: Usage Instructions */}
      <UsageSection />

      {/* Section 9: Customer Reviews */}
      <ReviewsSection />

      {/* Section 10: Brand Story */}
      <BrandStorySection />
    </main>
  );
}
