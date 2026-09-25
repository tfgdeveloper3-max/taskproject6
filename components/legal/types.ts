export type PolicyKey = "privacy" | "terms" | "refund";

export type ListItem = string | { title: string; text: string };

export type ContentBlock =
    | { type: "p"; text: string }
    | { type: "note"; text: string }
    | { type: "list"; items: ListItem[] };

export interface LegalSection {
    id: string;
    heading: string;
    blocks: ContentBlock[];
}

export interface Highlight {
    value: string;
    label: string;
}

export interface LegalLayoutProps {
    current?: PolicyKey;
    title: string;
    intro: string;
    updated?: string;
    highlights?: Highlight[];
    sections: LegalSection[];
}