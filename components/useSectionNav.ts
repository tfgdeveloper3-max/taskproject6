"use client";

import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";

export function useSectionNav() {
    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === "/";

    const goToSection = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
        if (!hash.startsWith("#")) return; // normal page link ho to kuch na karo
        e.preventDefault();

        if (isHome) {
            const el = document.getElementById(hash.slice(1));
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }

        router.push(`/${hash}`);
    };

    return { isHome, goToSection };
}