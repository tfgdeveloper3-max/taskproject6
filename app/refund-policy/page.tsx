import type { Metadata } from "next";
import RefundPolicy from "@/components/legal/RefundPolicy";
import LightningCursor from "@/components/Lightningcursor";
import Navbar from "@/components/Navbar";
import { FooterSection } from "@/components/Footer";

export const metadata: Metadata = {
    title: "Refund Policy | Invictus Publishing",
    description:
        "When and how Invictus Publishing issues refunds, including time frames and fees.",
};

export default function Page() {
    return (
        <>
            <LightningCursor />
            <Navbar />
            <RefundPolicy />
            <FooterSection />
        </>
    );
}