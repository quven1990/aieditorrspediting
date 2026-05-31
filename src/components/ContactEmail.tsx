import { CONTACT_EMAIL, PRIVACY_EMAIL } from "@/lib/site";

type Props = {
  email: "contact" | "privacy";
  className?: string;
};

export function ContactEmail({ email, className }: Props) {
  const address = email === "privacy" ? PRIVACY_EMAIL : CONTACT_EMAIL;
  return (
    <a href={`mailto:${address}`} className={className ?? "text-accent underline hover:opacity-90"}>
      {address}
    </a>
  );
}

export function ContactEmailsFooter() {
  return (
    <p className="mt-4 text-sm text-muted">
      Contact:{" "}
      <ContactEmail email="contact" /> · Privacy: <ContactEmail email="privacy" />
    </p>
  );
}
