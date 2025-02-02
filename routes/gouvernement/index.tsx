import { Head } from "$fresh/runtime.ts"
import BackToHome from "../../components/BackToHome.tsx"
import { blueskyBlue } from "../../components/PerParty.tsx"
import {
  BlueskyHandle,
  politixGridStyle,
  politixStyle,
} from "../../components/Results.tsx"
import { hasRecentTweets } from "../../date-utils.ts"
import top from "../../ministres.json" with { type: "json" }

const title = "Vilka ministrar finns på X?"
const description =
  `Analys av statsrådens aktivitet på X och Bluesky.`

export default function Top() {
  return (
    <main style={{ maxWidth: "40rem", margin: "1rem auto" }}>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
          key="description"
        />
        <meta
          property="og:image"
          content="https://politix.top/gouvernement.png"
          key="og:image"
        />
      </Head>
      <BackToHome />
      <header
        style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
      >
        <span style={{ fontSize: "200%", marginRight: ".2rem" }}>🥇</span>
        <h1>{title}</h1>
      </header>
      <p>{description}</p>
      <p>
        En minister anses vara aktiv när hen har publicerat innehåll under de senaste 7 dagarna.
      </p>
      <br />
      <List />
    </main>
  )
}

const entries = Object.entries(top)
const priorityFilter = ([nom]) =>
  nom.includes("Macron") || nom.includes("Gouvernement")
const priorityEntries = entries.filter(priorityFilter)
const rest = entries.filter((e) => !priorityFilter(e))
const List = () => (
  <ul
    style={politixGridStyle}
  >
    {[...priorityEntries, ...rest].map(
      (
        [
          nom,
          {
            "x": xAt,
            bsky: bskyAt,
            avatar,
            activité: { x: xActivity, bsky: bskyActivity },
            analyseDate,
            deletedXAccount,
            notFoundXAccount,
          },
        ],
      ) => {
        const isActiveOnX = xActivity && Array.isArray(xActivity) &&
          hasRecentTweets(xActivity, analyseDate)
        console.log("hasRecentTweets", xActivity, analyseDate)
        const isActiveOnBluesky = bskyActivity && Array.isArray(bskyActivity) &&
          hasRecentTweets(bskyActivity, analyseDate)

        return (
          <li
            key={""}
            style={politixStyle(xAt, isActiveOnX, isActiveOnBluesky)}
          >
            <div style={{ maxWidth: "100%" }}>
              <div style={{ whiteSpace: "nowrap", overflow: "scroll" }}>
                {nom}
              </div>
            </div>
            <div>
              <small style={{ color: "#f1a8b7" }}>
                X {xAt || ": ej hittad"}
              </small>
            </div>
            <div>
              {isActiveOnX
                ? (
                  <div>
                    <details>
                      <summary>Aktiv på X</summary>
                      <ol>
                        {xActivity.map((date, i) => (
                          <li key={date + i}>{date}</li>
                        ))}
                      </ol>
                    </details>
                  </div>
                )
                : (
                  "Ej aktiv på X"
                )}
            </div>
            <div>
              {bskyAt != null &&
                (
                  <div>
                    <small style={{ whiteSpace: "nowrap" }}>
                      <BlueskyHandle
                        at={bskyAt}
                        invert={false}
                        avatar={avatar}
                      />
                    </small>
                    {isActiveOnBluesky
                      ? (
                        <details>
                          <summary
                            style={{
                              background: blueskyBlue,
                              padding: "0 .4rem 0 .2rem",
                              borderRadius: ".2rem",
                              marginTop: ".2rem",
                              lineHeight: "1.1rem",
                              width: "fit-content",
                            }}
                          >
                            Aktiv på Bluesky
                          </summary>
                          <ol>
                            {bskyActivity.map((date, i) => (
                              <li key={date + i}>{date}</li>
                            ))}
                          </ol>
                        </details>
                      )
                      : "Ej aktiv på Bluesky"}
                  </div>
                )}
            </div>
          </li>
        )
      },
    )}
  </ul>
)
