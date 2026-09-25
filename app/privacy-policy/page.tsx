import type { Metadata } from "next";
import PrivacyPolicy from "@/components/legal/PrivacyPolicy";
import Navbar from "@/components/Navbar";
import { FooterSection } from "@/components/Footer";
import LightningCursor from "@/components/Lightningcursor";

export const metadata: Metadata = {
    title: "Privacy Policy | Invictus Publishing",
    description:
        "How Invictus Publishing collects, uses, protects, and discloses your information.",
};

export default function Page() {
    return (
        <>
            <LightningCursor />
            <Navbar />
            <PrivacyPolicy />
            <FooterSection />
        </>
    );
}