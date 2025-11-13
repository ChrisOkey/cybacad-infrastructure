import React from "react";

export const Icon = ({ name, className = "" }: { name: string; className?: string }) => {
  const props: React.SVGProps<SVGSVGElement> = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };

  const icons: Record<string, React.ReactNode> = {
    Play: (
      <svg {...props}>
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    Loader: (
      <svg {...props}>
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
      </svg>
    ),
    Lightbulb: (
      <svg {...props}>
        <path d="M15 14c.2-1 .5-2 1-3 1-2.5 3.5-4 5.5-1-1.4 6.1-8.5 7.1-17 1.1-2.2 0-3.3-1.6-4.2-3.6.8-1 1.7-2 2.8-2.8.9-.7 1.8-1.4 2.9-2.1" />
        <path d="M10 20c.3-1.2.9-2 2-2 1.1 0 1.8.8 2 2M12 22a2 2 0 0 0 2-2 2 2 0 0 0-4 0 2 2 0 0 0 2 2z" />
      </svg>
    ),
    Terminal: (
      <svg {...props}>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    ChevronLeft: (
      <svg {...props}>
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ),
    ChevronRight: (
      <svg {...props}>
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    BookOpen: (
      <svg {...props}>
        <path d="M2 12s2 10 9 10 9-10 9-10" />
        <path d="M22 12s-2-10-9-10-9 10-9 10" />
        <path d="M12 2l-1 5-2 2-2-2-1-5" />
      </svg>
    ),
    Code: (
      <svg {...props}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  };

  return icons[name] || null;
};
