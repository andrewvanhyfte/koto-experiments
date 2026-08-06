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

/** Figma Icon / Search — 10×10 */
export function SearchIcon({ className = "size-2.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
    >
      <path
        d="M4.22804 6.99775C5.75771 6.99775 6.99775 5.75771 6.99775 4.22804C6.99775 2.69837 5.75771 1.45833 4.22804 1.45833C2.69837 1.45833 1.45833 2.69837 1.45833 4.22804C1.45833 5.75771 2.69837 6.99775 4.22804 6.99775Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.2004 8.20081L6.53605 6.53646"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma Icon / Share — 10×10 */
export function ShareIcon({ className = "size-2.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 5.34998L5 1.58278"
        stroke="currentColor"
        strokeLinecap="square"
      />
      <path
        d="M3.5 1.9L5 0.65L6.5 1.9"
        stroke="currentColor"
        strokeLinecap="square"
      />
      <path
        d="M7.75 3.15L8.75 3.15V8.64999H1.25L1.25 3.15H2.25"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="square"
      />
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
      fill="none"
      aria-hidden
    >
      <path d="M5.20068 0L5.19795 1.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M1.96484 4.77737H0.464844"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M2.92822 2.4765L1.86756 1.41584"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M5.70061 9.209L4 3.5L9.709 5.20061L7.13794 6.63794L5.70061 9.209Z"
        fill="currentColor"
      />
    </svg>
  );
}
