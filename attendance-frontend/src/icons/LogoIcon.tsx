export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
    >
      <rect x="6" y="6" width="36" height="36" rx="12" fill="currentColor" opacity="0.14" />
      <path
        d="M14 18.5C14 15.4624 16.4624 13 19.5 13H29.5C32.5376 13 35 15.4624 35 18.5V29.5C35 32.5376 32.5376 35 29.5 35H19.5C16.4624 35 14 32.5376 14 29.5V18.5Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path d="M18 24H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 18V30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}