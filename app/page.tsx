"use client";

import { useState } from "react";
import {TestimonialsSection} from "@/components/pages/Testimonial";
import WhyChooseUs from "@/components/pages/WhyChooseUs";
import Navbar from "@/components/Navbar";
import Hero from "@/components/pages/Hero";
import {LogoBar} from "@/components/pages/LogoBar";
import {GlobalSection} from "@/components/pages/GlobalSection";
import {WatchSection} from "@/components/pages/WatchSection";
import {PortfolioSection} from "@/components/pages/PortfolioSection";
import {StepIntoSection} from "@/components/pages/StepIntoSection";
import { WhyAuthorsSection } from "@/components/pages/WhyAuthorSection";
import { ProudSection } from "@/components/pages/ProudSection";
import {VideoTrailerSection} from "@/components/pages/VideoTrailerSection";
import { AuthorTestimonials } from "@/components/pages/AuthorTestimonial";
import {GetPremiumSection} from "@/components/pages/GetPremiumSection";
import {FAQSection} from "@/components/pages/FaqSection";
import {GetInTouchSection} from "@/components/pages/GetInTouchSection";
import {FooterSection} from "@/components/Footer";
import LightningCursor from "@/components/Lightningcursor";

export default function Home() {

  return (
    <main>
      <LightningCursor />
      <Navbar />
      <Hero />
      <LogoBar />
      <GlobalSection />
      <WatchSection />
      <PortfolioSection />
      <WhyChooseUs />
      <StepIntoSection />
      <WhyAuthorsSection />
      <ProudSection />
      <VideoTrailerSection />
      <AuthorTestimonials />
      <TestimonialsSection />
      <GetPremiumSection />
      <FAQSection />
      <GetInTouchSection />
      <FooterSection />
    </main>
  );
}