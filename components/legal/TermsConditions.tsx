import LegalLayout from "./LegalLayout";
import type { LegalSection } from "./types";

const sections: LegalSection[] = [
    {
        id: "original-content",
        heading: "Original content",
        blocks: [
            { type: "p", text: "Invictus Publishing is committed to providing original and plagiarism-free content where originality is applicable to the service purchased." },
            { type: "p", text: "Where applicable, we may provide plagiarism or originality reports to assist in verifying the originality of delivered content." },
            { type: "p", text: "Please note that text contained within images, videos, graphics, or other media that cannot be read or indexed by plagiarism-detection tools may not be included in such checks." },
            { type: "p", text: "Customers requiring more comprehensive or specialized plagiarism verification may independently use additional third-party services. Such services are not included in standard pricing unless expressly stated in the applicable order." },
        ],
    },
    {
        id: "ownership",
        heading: "Complete ownership of delivered content",
        blocks: [
            { type: "note", text: "Unless otherwise stated in the applicable order or agreement, completed and paid-for content delivered to the customer **becomes the customer's property upon delivery**." },
            { type: "p", text: "Invictus Publishing does not require customers to publicly acknowledge Invictus Publishing when using delivered content unless otherwise agreed in writing." },
            { type: "p", text: "Subject to applicable third-party rights and licensing restrictions, customers may publish, distribute, edit, or otherwise use delivered content for their intended purposes." },
        ],
    },
    {
        id: "orders-payments",
        heading: "Orders and payments",
        blocks: [
            { type: "p", text: "An order is considered confirmed once the required payment has been successfully received by Invictus Publishing or its authorized payment provider." },
            { type: "p", text: "Customers are responsible for providing accurate project information, requirements, specifications, materials, and instructions necessary to complete their order." },
            { type: "p", text: "Additional work or requests outside the original scope of an order may be subject to additional charges and delivery time." },
        ],
    },
    {
        id: "revisions",
        heading: "Revisions and changes",
        blocks: [
            { type: "p", text: "Where revisions are included with a purchased service, they will be provided according to the scope and number of revisions specified for that service." },
            { type: "p", text: "Requests that substantially change the original project requirements may be treated as additional work and may incur additional charges." },
        ],
    },
    {
        id: "customer-responsibilities",
        heading: "Customer responsibilities",
        blocks: [
            { type: "p", text: "Customers are responsible for providing accurate information, materials, approvals, account access, and other resources reasonably required to complete their project." },
            { type: "p", text: "Delays caused by missing information, delayed responses, approvals, or materials from the customer may affect the agreed delivery timeline." },
        ],
    },
    {
        id: "images-copyright",
        heading: "Images and copyright",
        blocks: [
            { type: "p", text: "Invictus Publishing respects intellectual property rights and aims to avoid unauthorized use of copyrighted images and other materials." },
            { type: "p", text: "Where appropriate, we may recommend image sources or provide links to images for customers to review and obtain independently." },
            { type: "p", text: "Customers are responsible for ensuring that images, photographs, graphics, fonts, trademarks, or other third-party materials they provide or request for use have the necessary permissions or licenses." },
            { type: "p", text: "Where a third-party license or payment is required, the customer is responsible for obtaining such rights unless otherwise agreed in writing." },
        ],
    },
    {
        id: "intellectual-property",
        heading: "Intellectual property",
        blocks: [
            { type: "p", text: "Unless ownership is expressly transferred under an applicable order or agreement, trademarks, logos, website content, designs, graphics, software, and other proprietary materials belonging to Invictus Publishing remain the property of Invictus Publishing or their respective licensors." },
            { type: "p", text: "Such materials may not be reproduced, distributed, modified, or commercially exploited without appropriate authorization." },
        ],
    },
    {
        id: "limitation-of-liability",
        heading: "Limitation of liability",
        blocks: [
            { type: "p", text: "To the fullest extent permitted by applicable law, Invictus Publishing shall not be liable for indirect, incidental, consequential, special, or reputational losses arising from the use of our website, products, or services." },
            { type: "p", text: "Invictus Publishing shall not be responsible for losses resulting from circumstances beyond our reasonable control, including internet interruptions, technical failures, third-party service failures, unauthorized access, malware, viruses, or other events outside our reasonable control." },
            { type: "p", text: "Nothing in these Terms & Conditions is intended to exclude or limit any liability that cannot legally be excluded or limited under applicable law." },
        ],
    },
    {
        id: "third-party",
        heading: "Third-party services and links",
        blocks: [
            { type: "p", text: "Our website may contain links to third-party websites, payment providers, publishing platforms, social media platforms, or other services." },
            { type: "p", text: "These third parties operate independently and may have their own terms and privacy policies. Invictus Publishing is not responsible for the availability, content, security, or practices of third-party services." },
        ],
    },
    {
        id: "changes",
        heading: "Changes to these terms",
        blocks: [
            { type: "p", text: "Invictus Publishing reserves the right to update or modify these Terms & Conditions from time to time." },
            { type: "p", text: "Updated terms will be published on this page. Customers are encouraged to review this page periodically." },
            { type: "p", text: "Continued use of our website or services after updated terms are published may constitute acceptance of the revised terms, where permitted by applicable law." },
        ],
    },
    {
        id: "agreement",
        heading: "Agreement to these terms",
        blocks: [
            { type: "p", text: "By placing an order, making a payment, purchasing a product or service, or using the Invictus Publishing website, you acknowledge that you have read, understood, and agreed to these Terms & Conditions." },
            { type: "note", text: "If you do not agree with these terms, please do not place an order or use our services." },
        ],
    },
];

export default function TermsConditions() {
    return (
        <LegalLayout
            current="terms"
            title="Terms & Conditions"
            intro="These Terms & Conditions constitute an agreement between you, the customer or client, and **Invictus Publishing**. By placing an order, purchasing a product or service, or using our website, you acknowledge that you have read, understood, and agreed to be bound by these terms."
            sections={sections}
        />
    );
}