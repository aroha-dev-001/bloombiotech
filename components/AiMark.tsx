export function AiMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-grid h-9 w-9 shrink-0 place-items-center rounded-full bg-leaf ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none">
        <circle cx="12" cy="12" r="3.2" fill="currentColor" />
        <circle cx="12" cy="4.2" r="1.15" fill="currentColor" />
        <circle cx="19.2" cy="8.2" r="1.15" fill="currentColor" />
        <circle cx="19.2" cy="15.8" r="1.15" fill="currentColor" />
        <circle cx="12" cy="19.8" r="1.15" fill="currentColor" />
        <circle cx="4.8" cy="15.8" r="1.15" fill="currentColor" />
        <circle cx="4.8" cy="8.2" r="1.15" fill="currentColor" />
        <path
          d="M12 7.4v1.2M16.4 9.6l-.9.7M16.4 14.4l-.9-.7M12 16.6v-1.2M7.6 14.4l.9-.7M7.6 9.6l.9.7"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
