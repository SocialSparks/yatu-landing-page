/**
 * The glyphs that are not Yatu's own: the networks we publish on, the two
 * stores, and the copy affordance. The first three come from the design system
 * (Icons24Whatsapp / Icons24Instagram / Icons24Copy), inlined so there is no
 * runtime dependency on the DS bundle.
 *
 * They paint with currentColor - except the Google Play mark, whose four shards
 * are the logo itself and carry their own fills.
 */

type IconProps = { size?: number };

export function WhatsappIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.38-1.99-1.23-.74-.65-1.23-1.46-1.38-1.71-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42l-.47-.01c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.18 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17.93.9 2.18 1.46 3.42 1.6V9.8a9.14 9.14 0 0 1-3.38-.78c-.46-.21-.89-.48-1.31-.76-.01 2.92.01 5.84-.02 8.75a7.42 7.42 0 0 1-1.35 3.94 7.35 7.35 0 0 1-5.91 3.21 7.15 7.15 0 0 1-4.08-1.03 7.4 7.4 0 0 1-3.65-5.72c-.02-.5-.03-1-.01-1.49a7.4 7.4 0 0 1 2.58-4.96 7.2 7.2 0 0 1 6.15-1.72c.02 1.48-.04 2.96-.04 4.44a3.36 3.36 0 0 0-3.02.37 3.3 3.3 0 0 0-1.36 1.75c-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87a3.4 3.4 0 0 0 2.77-1.61c.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
    </svg>
  );
}

export function AppleIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.36 1.43c0 1.14-.42 2.2-1.25 3.03-1 1-2.13 1.57-3.36 1.47a2.9 2.9 0 0 1-.03-.41c0-1.09.5-2.25 1.32-3.06.46-.47 1.05-.86 1.76-1.17.7-.3 1.37-.47 2-.5.01.21.02.42.02.64Zm4.54 15.67c-.35.8-.76 1.53-1.24 2.2-.65.92-1.19 1.55-1.6 1.9-.64.58-1.33.88-2.07.9-.53 0-1.17-.15-1.91-.46-.75-.3-1.43-.45-2.06-.45-.66 0-1.36.15-2.11.45-.75.31-1.35.47-1.81.49-.71.03-1.41-.28-2.11-.93-.44-.38-1.01-1.03-1.69-1.96a13.6 13.6 0 0 1-1.8-3.45 12.5 12.5 0 0 1-.76-4.12c0-1.52.33-2.83.99-3.93a5.8 5.8 0 0 1 2.07-2.09 5.57 5.57 0 0 1 2.8-.79c.56 0 1.3.17 2.22.51.92.34 1.51.51 1.77.51.2 0 .85-.2 1.96-.6 1.05-.37 1.93-.52 2.66-.46 1.96.16 3.44.93 4.42 2.33-1.76 1.06-2.63 2.55-2.61 4.46.02 1.48.56 2.72 1.61 3.7.48.45 1.01.8 1.6 1.04-.13.37-.27.73-.43 1.07Z" />
    </svg>
  );
}

export function GooglePlayIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.61 1.81 13.79 12 3.61 22.19A1.5 1.5 0 0 1 3 20.98V3.02c0-.47.24-.9.61-1.21Z"
        fill="#00A0FF"
      />
      <path
        d="m17.51 15.72-3.72-3.72 3.72-3.72 4.39 2.5c.99.56.99 1.88 0 2.44l-4.39 2.5Z"
        fill="#FFBC00"
      />
      <path
        d="M17.51 15.72 13.79 12 3.61 22.19c.37.31.92.35 1.36.1l12.54-6.57Z"
        fill="#FF3A44"
      />
      <path
        d="M17.51 8.28 4.97 1.71a1.13 1.13 0 0 0-1.36.1L13.79 12l3.72-3.72Z"
        fill="#00C853"
      />
    </svg>
  );
}

export function CopyIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.5 15H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
