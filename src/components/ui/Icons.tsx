type IconProps = {
  className?: string;
};

export function GridIcon({ className = "size-2.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="2.5" cy="2.5" r="1.2" />
      <circle cx="7.5" cy="2.5" r="1.2" />
      <circle cx="2.5" cy="7.5" r="1.2" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  );
}

export function MenuIcon({ className = "size-2.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="5" cy="5" r="1.5" />
    </svg>
  );
}

export function CloseIcon({ className = "size-2.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <line x1="1.5" y1="5" x2="8.5" y2="5" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "size-2.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M6.5 1.5 2.5 5 6.5 8.5" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "size-2.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M3.5 1.5 7.5 5 3.5 8.5" />
    </svg>
  );
}

export function SearchIcon({ className = "size-3" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <circle cx="5" cy="5" r="3.2" />
      <path d="M7.5 7.5 10.5 10.5" />
    </svg>
  );
}

export function ShareIcon({ className = "size-3" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M6 1.5v7M6 1.5 3.5 4M6 1.5 8.5 4M2.5 6.5v4h7v-4" />
    </svg>
  );
}

export function LocateIcon({ className = "size-2.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <circle cx="5" cy="5" r="2.2" />
      <path d="M5 1v1.2M5 7.8V9M1 5h1.2M7.8 5H9" />
    </svg>
  );
}

export function PlusIcon({ className = "size-2.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M5 1.5v7M1.5 5h7" />
    </svg>
  );
}

export function MinusIcon({ className = "size-2.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M1.5 5h7" />
    </svg>
  );
}

export function ExternalLinkIcon({ className = "size-2.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M3.5 1.5h5v5M8.5 1.5 4 6" />
    </svg>
  );
}

export function InteractiveIcon({ className = "size-2.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="currentColor"
      aria-hidden
    >
      <path d="M1.5 8.5 8 2" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M5.5 2H8v2.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="2.2" cy="2.2" r="0.7" />
      <circle cx="3.4" cy="1.2" r="0.45" />
    </svg>
  );
}
