import { FileText, Github, Linkedin, Mail } from "lucide-react";
import type { Social } from "@/data/site";

function Letterboxd({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="5.5" cy="12" r="4" fill="#FF8000" />
      <circle cx="12" cy="12" r="4" fill="#00E054" fillOpacity="0.9" />
      <circle cx="18.5" cy="12" r="4" fill="#40BCF4" fillOpacity="0.9" />
    </svg>
  );
}

function Goodreads({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11.5" cy="9.5" r="5" />
      <path d="M16.5 4.5v11a5 5 0 0 1-9.6 1.9" />
    </svg>
  );
}

export function SocialIcon({ icon, className = "h-6 w-6" }: { icon: Social["icon"]; className?: string }) {
  switch (icon) {
    case "github":
      return <Github className={className} />;
    case "linkedin":
      return <Linkedin className={className} />;
    case "mail":
      return <Mail className={className} />;
    case "resume":
      return <FileText className={className} />;
    case "goodreads":
      return <Goodreads className={className} />;
    case "letterboxd":
      return <Letterboxd className={className} />;
  }
}
