export function BookLogo() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Book shape */}
      <path
        d="M30 20C25 20 20 25 20 30V90C20 95 25 100 30 100H90C95 100 100 95 100 90V30C100 25 95 20 90 20H30Z"
        fill="url(#bookGradient)"
      />

      {/* Book spine */}
      <path d="M60 20V100" stroke="currentColor" strokeWidth="2" className="text-primary/30" />

      {/* Keyhole */}
      <circle cx="60" cy="50" r="8" fill="white" />
      <rect x="58" y="58" width="4" height="12" fill="white" />

      {/* Pages effect */}
      <path
        d="M35 30L40 25M45 30L50 25M55 30L60 25"
        stroke="currentColor"
        strokeWidth="2"
        className="text-primary/40"
        strokeLinecap="round"
      />

      <defs>
        <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(34, 197, 94)" />
          <stop offset="100%" stopColor="rgb(132, 204, 22)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
