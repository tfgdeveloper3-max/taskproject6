import LegalLayout from "./LegalLayout";
import type { LegalSection } from "./types";

const sections: LegalSection[] = [
    {
        id: "information-we-collect",
        heading: "Information we collect",
        blocks: [
            { type: "p", text: "We may collect information from you when you register on our website, place an order, subscribe to our newsletter, contact us, or complete a form." },
            { type: "p", text: "Depending on the service or transaction, we may ask you to provide information such as:" },
            {
                type: "list",
                items: [
                    "Full name",
                    "Email address",
                    "Mailing or billing address",
                    "Phone number",
                    "Order and transaction details",
                    "Information related to your project or publishing requirements",
                    "Payment information where necessary to process an order",
                ],
            },
            { type: "p", text: "You may browse certain areas of our website without directly providing personal information." },
        ],
    },
    {
        id: "how-we-use",
        heading: "How do we use your information?",
        blocks: [
            { type: "p", text: "The information we collect may be used for the following purposes:" },
            {
                type: "list",
                items: [
                    { title: "To personalize your experience –", text: "To better understand your needs and preferences." },
                    { title: "To improve our website –", text: "To improve our website, products, services, and overall user experience." },
                    { title: "To provide customer support –", text: "To respond to questions, inquiries, and support requests." },
                    { title: "To process transactions –", text: "To process orders, payments, and deliver purchased products or services." },
                    { title: "To communicate with you –", text: "To send order updates, service-related communications, responses to inquiries, and, where permitted, newsletters or promotional communications." },
                    { title: "To maintain website security –", text: "To detect, prevent, and address fraudulent or unauthorized activity." },
                    { title: "To analyze website usage –", text: "To understand how visitors use our website and improve its functionality." },
                ],
            },
        ],
    },
    {
        id: "how-we-protect",
        heading: "How do we protect your information?",
        blocks: [
            { type: "p", text: "Invictus Publishing takes reasonable administrative, technical, and organizational measures to protect personal information submitted through our website." },
            { type: "p", text: "Where applicable, secure technologies such as SSL encryption may be used to protect information transmitted through our website." },
            { type: "p", text: "Payment transactions may be processed through authorized third-party payment providers. Invictus Publishing does not intentionally store complete credit card information on its own servers unless necessary and appropriately secured." },
        ],
    },
    {
        id: "cookies",
        heading: "Do we use cookies?",
        blocks: [
            { type: "p", text: "Yes. Invictus Publishing may use cookies and similar technologies to improve your browsing experience." },
            { type: "p", text: "Cookies may help us:" },
            {
                type: "list",
                items: [
                    "Remember preferences and settings.",
                    "Understand website traffic and usage.",
                    "Improve website functionality.",
                    "Analyze visitor interactions.",
                    "Support advertising and marketing activities where applicable.",
                ],
            },
            { type: "note", text: "You may disable cookies through your browser settings. However, disabling cookies may affect certain features or functionality of our website." },
        ],
    },
    {
        id: "disclosure",
        heading: "Do we disclose information to outside parties?",
        blocks: [
            { type: "note", text: "Invictus Publishing **does not sell, rent, or trade** your personally identifiable information." },
            { type: "p", text: "We may share information with trusted third-party service providers when necessary to operate our website, process payments, deliver services, provide technical support, conduct business operations, or otherwise fulfill your request." },
            { type: "p", text: "These service providers may only use information for legitimate purposes related to the services they provide to us." },
            { type: "p", text: "We may also disclose information where required or permitted by applicable law, legal process, or governmental request, or when necessary to protect the rights, property, or safety of Invictus Publishing, our customers, or others." },
            { type: "p", text: "Non-personally identifiable information may be used or shared for analytics, advertising, marketing, or other legitimate business purposes." },
        ],
    },
    {
        id: "third-party-links",
        heading: "Third-party links",
        blocks: [
            { type: "p", text: "Our website may contain links to third-party websites, services, platforms, or resources." },
            { type: "p", text: "These third-party websites operate independently and have their own privacy policies and terms. Invictus Publishing is not responsible for the privacy practices, content, security, or activities of third-party websites." },
            { type: "p", text: "We encourage you to review the privacy policies of any third-party website you visit." },
        ],
    },
    {
        id: "online-only",
        heading: "Online privacy policy only",
        blocks: [
            { type: "p", text: "This Privacy Policy applies to information collected through the Invictus Publishing website and does not necessarily apply to information collected through offline channels." },
        ],
    },
    {
        id: "consent",
        heading: "Your consent",
        blocks: [
            { type: "p", text: "By using our website, you consent to this Privacy Policy and its terms." },
            { type: "p", text: "Invictus Publishing may update this Privacy Policy from time to time. Any changes will be posted on this page, and you are encouraged to review this page periodically." },
        ],
    },
    {
        id: "contact",
        heading: "Contact us",
        blocks: [
            { type: "p", text: "If you have questions regarding this Privacy Policy or how Invictus Publishing handles your information, please contact us through the contact information provided on our website." },
        ],
    },
];

export default function PrivacyPolicy() {
    return (
        <LegalLayout
            current="privacy"
            title="Privacy Policy"
            intro="At **Invictus Publishing**, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, protect, and disclose information when you visit or use our website, purchase our products or services, or communicate with us."
            sections={sections}
        />
    );
}