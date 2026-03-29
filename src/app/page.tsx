import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main
      style={{
        fontFamily: "Georgia, serif",
        background: "#0a0a0b",
        color: "#e2ddd6",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      {/* Hero */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          minHeight: "88vh",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Left */}
        <div
          style={{
            padding: "clamp(2rem,5vw,5rem) clamp(1.5rem,4vw,3rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "system-ui,sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6b6860",
                marginBottom: "2rem",
              }}
            >
              a safe space to feel
            </div>
            <h1
              style={{
                fontSize: "clamp(2.2rem,5vw,4.2rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#e2ddd6",
                marginBottom: "1.5rem",
              }}
            >
              You don{"'"}t have
              <br />
              to carry this
              <br />
              <em style={{ color: "#c9a96e", fontStyle: "italic" }}>alone.</em>
            </h1>
            <p
              style={{
                fontFamily: "system-ui,sans-serif",
                fontSize: "0.88rem",
                color: "#6b6860",
                lineHeight: 1.7,
                maxWidth: "380px",
              }}
            >
              A quiet place for people going through heartbreak, grief, and
              loss. Vent anonymously. Feel heard. Know that others have survived
              this too.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                marginTop: "2.5rem",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/vent"
                style={{
                  fontFamily: "system-ui,sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: "#c9a96e",
                  color: "#0a0a0b",
                  padding: "0.75rem 2rem",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                write what you feel
              </Link>
              <Link
                href="/stories"
                style={{
                  fontFamily: "system-ui,sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#6b6860",
                  textDecoration: "none",
                }}
              >
                survival stories →
              </Link>
            </div>
          </div>
          <div
            style={{
              fontFamily: "system-ui,sans-serif",
              fontSize: "0.7rem",
              color: "#3a3835",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginTop: "3rem",
            }}
          >
            Vent anonymously · or sign in to track your journey
          </div>
        </div>

        {/* Right */}
        <div
          style={{
            padding: "clamp(2rem,5vw,5rem) clamp(1.5rem,4vw,3rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {[
            {
              quote: '"The wound is the place where the light enters you."',
              cite: "— Rumi",
            },
            {
              quote:
                '"I kept reaching for my phone to text them before I remembered. It\'s the smallest moments that hit the hardest."',
              cite: "— anonymous, 2 hours ago",
            },
            {
              quote:
                "\"Everyone keeps telling me I'll be fine. I just need someone to say it's okay to not be fine right now.\"",
              cite: "— anonymous, yesterday",
            },
          ].map((q, i) => (
            <div
              key={i}
              style={{
                paddingLeft: "1.5rem",
                borderLeft: "1px solid rgba(201,169,110,0.3)",
              }}
            >
              <blockquote
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "#a8a49e",
                  fontStyle: "italic",
                }}
              >
                {q.quote}
              </blockquote>
              <cite
                style={{
                  fontFamily: "system-ui,sans-serif",
                  fontSize: "0.7rem",
                  color: "#6b6860",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginTop: "0.6rem",
                  display: "block",
                  fontStyle: "normal",
                }}
              >
                {q.cite}
              </cite>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              gap: "2rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "2,847", label: "vents this week" },
              { num: "94%", label: "felt less alone" },
              { num: "∞", label: "judgment free" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: "2rem",
                    color: "#c9a96e",
                    fontWeight: 400,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "system-ui,sans-serif",
                    fontSize: "0.68rem",
                    color: "#6b6860",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: "0.2rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {[
          {
            num: "01",
            title: "Anonymous venting",
            desc: "No account. No name. Say everything you've been holding inside.",
          },
          {
            num: "02",
            title: "AI that listens",
            desc: "Not advice. Not toxic positivity. Just genuine acknowledgment of what you feel.",
          },
          {
            num: "03",
            title: "Survival stories",
            desc: "Real people who made it through. Proof this pain is survivable.",
          },
          {
            num: "04",
            title: "Daily check-ins",
            desc: "Track how you feel over time. Small steps forward still count.",
          },
        ].map((f, i) => (
          <div
            key={i}
            style={{
              padding: "clamp(1.5rem,3vw,2.5rem) clamp(1.5rem,3vw,2rem)",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontFamily: "system-ui,sans-serif",
                fontSize: "0.65rem",
                color: "#6b6860",
                letterSpacing: "0.1em",
                marginBottom: "1.5rem",
              }}
            >
              {f.num}
            </div>
            <div
              style={{
                fontSize: "1.1rem",
                color: "#e2ddd6",
                marginBottom: "0.8rem",
                fontWeight: 400,
              }}
            >
              {f.title}
            </div>
            <div
              style={{
                fontFamily: "system-ui,sans-serif",
                fontSize: "0.78rem",
                color: "#6b6860",
                lineHeight: 1.6,
              }}
            >
              {f.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(1.5rem,3vw,2rem) clamp(1.5rem,3vw,3rem)",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            fontSize: "0.9rem",
            color: "#6b6860",
            fontStyle: "italic",
            maxWidth: "500px",
          }}
        >
          "This feeling is temporary. You have survived every hard day so far.
          This one too will pass."
        </p>
        <Link
          href="/vent"
          style={{
            fontFamily: "system-ui,sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#c9a96e",
            textDecoration: "none",
          }}
        >
          start healing →
        </Link>
      </div>
    </main>
  );
}
