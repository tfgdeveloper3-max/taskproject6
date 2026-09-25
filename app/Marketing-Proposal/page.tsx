import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { FooterSection } from "@/components/Footer";
import LightningCursor from "@/components/Lightningcursor";
import MarketingProposal from "@/components/pages/Marketing-Proposal";

export const metadata: Metadata = {
    title: "Book Marketing & Promotional Campaigns | Invictus Publishing",
    description:
        "Email campaigns, book signings, author branding, Times Square video promotion, influencer marketing, Book-to-Screen, and BookTalk from Invictus Publishing.",
};

export default function MarketingProp() {
    return (
        <>
            <LightningCursor />
            <Navbar />
            <MarketingProposal />
            <FooterSection />
        </>
    );
}
