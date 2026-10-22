import { SectionHeading } from "@/components/section-heading";
import { ACCENT } from "@/lib/content";
import type { LandingPage } from "@/lib/landing-content";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const GUTTER: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: 1120,
  margin: "0 auto",
  padding: "0 24px",
};

/**
 * One real split, worked line by line: the expenses, what each person paid and
 * owes, and the transfers that settle it. Shared by the settlement guide and
 * the Tricount comparison, which tell the same story to different readers.
 */
export function WorkedExample({
  worked,
  accent,
  background,
  rowsCaption,
  settleTitle,
}: {
  worked: NonNullable<LandingPage["worked"]>;
  accent: string;
  background: string;
  rowsCaption: string;
  settleTitle: string;
}) {
  return (
    <section style={{ background, padding: "clamp(56px,8vw,96px) 0" }}>
      <div data-r="gutter" style={GUTTER}>
        <SectionHeading
          badge="Un exemple chiffré"
          badgeBg={ACCENT.sunbeam}
          title={worked.title}
          lede={worked.lede}
          titleMaxCh={22}
          ledeMaxCh={52}
          marginBottom="clamp(30px,4vw,48px)"
        />

        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
          <div className="yq-table-wrap">
            <table className="yq-table">
              <caption>{rowsCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">Dépense</th>
                  <th scope="col">Montant</th>
                  <th scope="col">Payée par</th>
                  <th scope="col">Pour qui</th>
                </tr>
              </thead>
              <tbody>
                {worked.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td className="yq-num">{row.amount}</td>
                    <td>{row.who}</td>
                    <td>{row.forWhom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="yq-table-wrap">
            <table className="yq-table">
              <caption>Ce que chacun a payé, ce que chacun doit</caption>
              <thead>
                <tr>
                  <th scope="col">Qui</th>
                  <th scope="col">A payé</th>
                  <th scope="col">Doit</th>
                  <th scope="col">Solde</th>
                </tr>
              </thead>
              <tbody>
                {worked.balances.map((row) => (
                  <tr key={row.who}>
                    <th scope="row">{row.who}</th>
                    <td className="yq-num">{row.paid}</td>
                    <td className="yq-num">{row.owed}</td>
                    <td className="yq-num">{row.net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              background: "#F7F4ED",
              border: "1px solid #EBE7DE",
              borderLeft: `4px solid ${accent}`,
              borderRadius: 20,
              padding: "22px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: DISPLAY,
                fontSize: 20,
                lineHeight: 1.2,
                letterSpacing: "-.02em",
                color: "#2A343D",
              }}
            >
              {settleTitle}
            </span>
            <ul
              style={{
                margin: 0,
                padding: "0 0 0 20px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                fontFamily: UI,
                fontSize: 16,
                lineHeight: 1.5,
                color: "rgba(42,52,61,.78)",
              }}
            >
              {worked.settle.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <p
            style={{
              margin: 0,
              fontFamily: UI,
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "rgba(42,52,61,.7)",
              textWrap: "pretty",
            }}
          >
            {worked.note}
          </p>
        </div>
      </div>
    </section>
  );
}
