import type { Metadata } from "next";
import TermsConditions from "@/components/legal/TermsConditions";
import LightningCursor from "@/components/Lightningcursor";
import Navbar from "@/components/Navbar";
import { FooterSection } from "@/components/Footer";

export const metadata: Metadata = {
    title: "Terms & Conditions | Invictus Publishing",
    description:
        "The terms that apply when you order products or services from Invictus Publishing.",
};

export default function Page() {
    return (
        <>
            <LightningCursor />
            <Navbar />
            <TermsConditions />
            <FooterSection />
        </>
    );
}