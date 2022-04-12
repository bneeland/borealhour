import Head from 'next/head'
import Search from '../components/Search'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Borealdusk - Weather - Search</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Search />
    </div>
  )
}
