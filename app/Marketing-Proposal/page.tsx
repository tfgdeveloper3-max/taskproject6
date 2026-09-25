import type { Metadata } from "next";
import LightningCursor from "@/components/Lightningcursor";
import MarketingProposal from "@/components/pages/Marketing-Proposal";
import ProposalNavbar from "@/components/Proposalnavbar";
import { ProposalFooter } from "@/components/ProposalFooter";

export const metadata: Metadata = {
    title: "Book Marketing & Promotional Campaigns | Invictus Publishing",
    description:
        "Email campaigns, book signings, author branding, Times Square video promotion, influencer marketing, Book-to-Screen, and BookTalk from Invictus Publishing.",
};

export default function MarketingProp() {
    return (
        <>
            <LightningCursor />
            <ProposalNavbar />
            <MarketingProposal />
            <ProposalFooter />
        </>
    );
}
