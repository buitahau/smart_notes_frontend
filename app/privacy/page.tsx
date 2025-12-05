import type { Metadata } from "next";
import Link from "next/link";

type PolicySection = {
  title: string;
  body: string;
  bullets?: {
    label: string;
    description: string;
  }[];
};

const policySections: PolicySection[] = [
  {
    title: "Information We Collect",
    body: "We built Smart Notes to work with as little personal information as possible. The browser extension only asks for the data required to create and maintain your account.",
    bullets: [
      {
        label: "Email address",
        description:
          "Used to create your account, verify ownership during sign-in, and send critical account updates. No other personal identifiers, browsing data, or note content leave your browser from the extension."
      }
    ]
  },
  {
    title: "How We Use Your Email",
    body: "Your email address is processed strictly for product functionality:",
    bullets: [
      {
        label: "Authentication",
        description: "Identifies you during login and syncs your extension session securely with the Smart Notes service."
      },
      {
        label: "Account communication",
        description: "Delivers receipts, password resets, security alerts, and product changes that may impact your account."
      },
      {
        label: "Support",
        description: "Helps our support team locate your workspace when you reach out for assistance."
      }
    ]
  },
  {
    title: "Data Storage & Security",
    body: "Protecting the small amount of data we do collect is critical.",
    bullets: [
      {
        label: "Encrypted in transit",
        description: "All extension and web app traffic is encrypted with TLS to prevent interception."
      },
      {
        label: "Minimal retention",
        description: "We keep your email for as long as your account stays active. If you close the account, the email is permanently removed from our system backups within 30 days."
      },
      {
        label: "Limited access",
        description: "Only designated operators who need the information to support the service can view account records."
      }
    ]
  },
  {
    title: "Sharing & Disclosure",
    body: "Your email address is never sold or rented.",
    bullets: [
      {
        label: "No advertising usage",
        description: "We do not use your email for advertising or profiling."
      },
      {
        label: "Vendors",
        description: "Trusted infrastructure providers (such as email delivery services) only receive your email to perform the task we hired them for and must comply with our security requirements."
      },
      {
        label: "Legal requirements",
        description: "We may disclose information if required to comply with laws, protect users, or defend Smart Notes from fraud."
      }
    ]
  },
  {
    title: "Your Choices & Rights",
    body: "You stay in control of the email associated with your workspace.",
    bullets: [
      {
        label: "Access or update",
        description: "Sign in to the dashboard to update the email tied to your account or reach support for help."
      },
      {
        label: "Deletion",
        description: "Request deletion at any time via the in-app support menu or by emailing us. Once removed, the email cannot be recovered."
      },
      {
        label: "Communication preferences",
        description: "You may opt out of non-essential product emails at the bottom of each message. We will still send transactional emails, such as password resets."
      }
    ]
  },
  {
    title: "Browser Extension Permissions",
    body: "The Smart Notes extension runs primarily within your browser.",
    bullets: [
      {
        label: "Local-first content",
        description: "Your notes, highlights, and prompts stay on your device unless you explicitly sync them through the account dashboard."
      },
      {
        label: "Email-only requests",
        description: "Network calls from the extension include only the email tied to your account and the credentials required for authentication."
      },
      {
        label: "No passive tracking",
        description: "We do not monitor browsing history or page contents. The extension activates only when you use it."
      }
    ]
  },
  {
    title: "Children",
    body: "Smart Notes is not intended for individuals under 13. We do not knowingly collect emails from children, and requests to remove such data will be honored immediately."
  }
];

const lastUpdated = "December 5, 2024";

export const metadata: Metadata = {
  title: "Privacy Policy | Smart Notes",
  description: "Learn how the Smart Notes browser extension handles your email and protects your privacy."
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-4 text-center">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
            Privacy First
          </span>
          <h1 className="text-4xl font-semibold tracking-tight">Smart Notes Privacy Policy</h1>
          <p className="text-base text-slate-600">
            We collect the absolute minimum data required to power the Smart Notes extension. This page explains what we collect, why we collect it, and how you stay in control.
          </p>
          <p className="text-sm text-slate-500">Last updated: {lastUpdated}</p>
        </div>

        <div className="space-y-6">
          {policySections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
              <p className="mt-3 text-base text-slate-600">{section.body}</p>
              {section.bullets && (
                <ul className="mt-5 space-y-4">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.label} className="rounded-xl bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">{bullet.label}</p>
                      <p className="mt-1 text-sm text-slate-600">{bullet.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Questions or Requests?</h2>
          <p className="mt-3 text-base text-slate-600">
            If you have questions about this policy, need to access the email linked to your account, or want us to delete your information, contact the Smart Notes team at{" "}
            <a href="mailto:privacy@smartnotes.app" className="font-medium text-blue-700 hover:underline">
              privacy@smartnotes.app
            </a>
            .
          </p>
          <p className="mt-2 text-base text-slate-600">
            You can also manage your data directly from the dashboard inside the extension by updating or deleting the email associated with your workspace.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Return to Smart Notes
            </Link>
            <a
              href="mailto:privacy@smartnotes.app"
              className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-300"
            >
              Email Our Team
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
