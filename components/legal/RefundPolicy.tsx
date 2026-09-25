import LegalLayout from "./LegalLayout";
import type { LegalSection, Highlight } from "./types";

const highlights: Highlight[] = [
    { value: "1 hour", label: "Window to cancel after placing an order for a change of mind" },
    { value: "60%", label: "Processing fee that may apply to cancellations after the first hour" },
    { value: "30 days", label: "From delivery to submit a refund request" },
    { value: "$5,000/mo", label: "Installments for approved refunds on purchases above $15,000" },
];

const sections: LegalSection[] = [
    {
        id: "overview",
        heading: "Overview",
        blocks: [
            { type: "p", text: "If you have questions or concerns regarding our refund policy, please contact our customer service team before placing an order so that we can clarify the applicable terms." },
            { type: "p", text: "Invictus Publishing offers refunds only in specific circumstances and subject to the conditions outlined below." },
            { type: "note", text: "If approved, purchases above **$15,000** may be refunded through equal monthly installments of **$5,000**, unless otherwise agreed upon in writing." },
        ],
    },
    {
        id: "full-refund",
        heading: "Full refund",
        blocks: [
            { type: "p", text: "Invictus Publishing may provide a full refund in eligible circumstances." },
            { type: "p", text: "We value our customers and make reasonable efforts to assist when circumstances require an order to be cancelled." },
            { type: "p", text: "If work on your project has already started and you need to stop the project or request a refund, you should contact our customer support team as soon as possible." },
            { type: "p", text: "Our support team may review the current project status, work completed, resources used, and applicable order terms before determining what refund options may be available." },
            { type: "p", text: "A full refund is not automatically guaranteed once work has commenced." },
        ],
    },
    {
        id: "change-of-mind",
        heading: "Change of mind",
        blocks: [
            { type: "p", text: "If you change your mind and decide not to continue with your project after placing an order, you may request cancellation and a refund within the **first hour of placing the order**." },
            { type: "p", text: "For eligible cancellation requests made after the first hour, a **60% processing fee** may be deducted from the refundable amount." },
            { type: "p", text: "Once substantial work has commenced, the refundable amount may also be affected by the work already completed and resources allocated to the project." },
        ],
    },
    {
        id: "unsatisfactory-delivery",
        heading: "Incomplete or unsatisfactory delivery",
        blocks: [
            { type: "p", text: "Once work has been delivered, customers must first provide Invictus Publishing with a reasonable opportunity to address legitimate issues before requesting a refund." },
            { type: "p", text: "A refund request may be considered where the delivered work does not substantially comply with the project requirements clearly provided and documented by the customer at the time of ordering." },
            { type: "p", text: "Invictus Publishing aims to provide customer satisfaction and may offer revisions, corrections, reassignment, or rewriting where appropriate to bring the delivered work in line with the agreed requirements." },
            { type: "p", text: "Where applicable, customers may also be offered **reserved pages or services of equivalent value** for future use, subject to the terms of the original order." },
            { type: "p", text: "If Invictus Publishing remains unable to provide a reasonable solution after applicable revision and correction options have been exhausted, a partial or full refund may be considered based on the circumstances and mutually agreed terms." },
        ],
    },
    {
        id: "time-frame",
        heading: "Refund request time frame",
        blocks: [
            { type: "note", text: "Refund requests must generally be submitted within **30 days of the delivery date**." },
            { type: "p", text: "Refund requests submitted after this period may not be considered." },
            { type: "p", text: "Customers are responsible for reviewing the applicable refund terms and submitting any refund request within the required time period." },
        ],
    },
    {
        id: "no-refund",
        heading: "Cases where a refund may not be issued",
        blocks: [
            { type: "p", text: "A refund may not be issued in the following circumstances:" },
            {
                type: "list",
                items: [
                    "Minor issues such as grammatical errors, typographical errors, formatting issues, word-count discrepancies, or missing references may be addressed through revisions or corrections rather than a full refund.",
                    "Where appropriate, Invictus Publishing may offer a partial refund, discount, revision, or credit toward a future purchase.",
                    "Invictus Publishing is not responsible for delays caused by the customer, including delayed responses, missing information, failure to provide required materials, or delayed approvals.",
                    "Refunds will not generally be issued solely because a customer considers the writing quality unsatisfactory where the delivered work substantially meets the agreed project requirements and revision opportunities remain available.",
                    "For book marketing, publishing, or promotional projects, a refund may not be available where the customer fails to provide required access to book stores, publishing platforms, or social media channels when such access is necessary to perform the agreed services.",
                    "Refunds may not be available for services that have already been substantially completed or delivered, except where otherwise required by applicable law or expressly agreed in writing.",
                ],
            },
        ],
    },
    {
        id: "processing",
        heading: "Refund processing",
        blocks: [
            { type: "p", text: "Once a refund has been approved, Invictus Publishing will communicate the applicable refund amount and processing method to the customer." },
            { type: "p", text: "The time required for funds to appear in the customer's account may depend on the payment method, financial institution, payment processor, or other third-party service involved." },
            { type: "p", text: "Any applicable processing fees, completed work, third-party charges, or other deductions will be communicated to the customer where relevant." },
        ],
    },
    {
        id: "contact",
        heading: "Contact us",
        blocks: [
            { type: "p", text: "If you have questions about this Refund Policy or believe your order qualifies for a refund, please contact the **Invictus Publishing customer support team** with your order details." },
            { type: "p", text: "Our team will review your request and determine the applicable options according to the terms of your order and this Refund Policy." },
        ],
    },
];

export default function RefundPolicy() {
    return (
        <LegalLayout
            current="refund"
            title="Refund Policy"
            intro="Please read the following terms carefully to avoid any misunderstanding regarding the **Invictus Publishing Refund Policy**."
            highlights={highlights}
            sections={sections}
        />
    );
}