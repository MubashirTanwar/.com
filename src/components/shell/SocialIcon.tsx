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

function Spotify({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#1ED760" />
      <g fill="none" stroke="#0b0b0b" strokeLinecap="round">
        <path d="M6.5 9.2c3.7-1.1 7.6-.8 11 1" strokeWidth="1.8" />
        <path d="M7.2 12.4c3-.8 6-.5 8.7.9" strokeWidth="1.5" />
        <path d="M7.8 15.3c2.3-.6 4.6-.4 6.6.7" strokeWidth="1.3" />
      </g>
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
    case "spotify":
      return <Spotify className={className} />;
  }
}
