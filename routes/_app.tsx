import { type PageProps } from "$fresh/server.ts"
import { Head } from "$fresh/runtime.ts"

export default function App({ Component }: PageProps) {
  return (
    <html>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PolitiX - Vilka riksdagsledamöter är aktiva på X och Bluesky?</title>
        <meta
          name="description"
          content="PolitiX analyserar våra politikers aktivitet på X och Bluesky"
          key="description"
        />
        <meta
          property="og:image"
          content="https://politix.top/jaquette.png"
          key="og:image"
        />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <body>
        <Component />
      </body>
    </html>
  )
}
