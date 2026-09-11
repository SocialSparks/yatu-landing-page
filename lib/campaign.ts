/**
 * Campaign data that Yatu is willing to send to analytics.
 *
 * URLs elsewhere on the site sometimes contain functional values (for example
 * an e-mail on the confirmation page). Building the measured page URL from
 * this allow-list keeps those values out of GA while retaining standard UTM
 * attribution for posters, newsletters and social links.
 */
const UTM_KEYS = [
  "utm_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_source_platform",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];
export type Campaign = Partial<Record<UtmKey, string>>;

const MAX_VALUE_LENGTH = 100;

function clean(value: string | null): string | undefined {
  if (!value) return undefined;
  const cleaned = value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, MAX_VALUE_LENGTH);
  return cleaned || undefined;
}

/**
 * Reads standard UTMs and supports the short `?src=...` form used on simple QR
 * codes. The shortcut is normalised to a complete QR campaign before GA sees
 * it, so both URL styles land in the standard acquisition reports.
 */
export function campaignFromSearch(search: string): Campaign {
  const input = new URLSearchParams(search);
  const campaign: Campaign = {};

  for (const key of UTM_KEYS) {
    const value = clean(input.get(key));
    if (value) campaign[key] = value;
  }

  const sourceShortcut = clean(input.get("src"));
  if (sourceShortcut && !campaign.utm_source) {
    campaign.utm_source = sourceShortcut;
    campaign.utm_medium ??= "qr";
    campaign.utm_campaign ??= sourceShortcut;
  }

  return campaign;
}

export function measuredPageLocation(origin: string, pathname: string, search: string): string {
  const url = new URL(pathname, origin);
  const campaign = campaignFromSearch(search);

  for (const key of UTM_KEYS) {
    const value = campaign[key];
    if (value) url.searchParams.set(key, value);
  }

  return url.toString();
}

/** Friendly parameter names for GA custom events. */
export function campaignEventParameters(search: string): Record<string, string> {
  const campaign = campaignFromSearch(search);
  return {
    ...(campaign.utm_id ? {campaign_id: campaign.utm_id} : {}),
    ...(campaign.utm_source ? {campaign_source: campaign.utm_source} : {}),
    ...(campaign.utm_medium ? {campaign_medium: campaign.utm_medium} : {}),
    ...(campaign.utm_campaign ? {campaign_name: campaign.utm_campaign} : {}),
    ...(campaign.utm_content ? {campaign_content: campaign.utm_content} : {}),
    ...(campaign.utm_term ? {campaign_term: campaign.utm_term} : {}),
    ...(campaign.utm_source_platform
      ? {campaign_source_platform: campaign.utm_source_platform}
      : {}),
  };
}

/** Keeps a campaign visible in the existing form `source` column. */
export function campaignFormSource(fallback: string, search: string): string {
  const campaign = campaignFromSearch(search);
  const detail = [
    campaign.utm_source,
    campaign.utm_medium,
    campaign.utm_campaign,
    campaign.utm_content,
  ].filter((value): value is string => Boolean(value));

  return detail.length ? `${fallback}:${detail.join("/")}`.slice(0, 200) : fallback;
}
