import { Head } from "$fresh/runtime.ts"
import BackToHome from "../../components/BackToHome.tsx"
import Results from "../../components/Results.tsx"

const title =
  "Vilka riksdagsledamöter är fortfarande på X? Vilka är på Bluesky?"
const description =
  `En analys av riksdagsledamöternas aktivitet på X och Bluesky.`

export default function Top() {
  return (
    <main style={{ maxWidth: "40rem", margin: "1rem auto" }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="description" />
        <meta
          property="og:image"
          content="https://politix.top/parlement.png"
          key="og:image"
        />
      </Head>
      <BackToHome />
      <header
        style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
      >
        <span style={{ fontSize: "200%" }}>🥇</span>
        <h1>{title}</h1>
      </header>
      <Results />
    </main>
  )
}
