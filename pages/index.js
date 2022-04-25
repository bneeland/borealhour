import { useState } from 'react'
import Head from 'next/head'
import Search from '../components/search'
import Forecast from '../components/forecast'
import Splash from '../components/splash'

export default function Home() {
  const [weatherData, setWeaterData] = useState()

  function selectedLocationHandler(weatherData) {
    setWeaterData(weatherData)
  }

  return (
    <div className="bg-zinc-100 pt-16">
      <Head>
        <title>Borealhour - weather</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex space-x-4 px-4 h-14 m-2 fixed inset-x-0 top-0 z-40 bg-white rounded shadow-sm">
        <div className="flex-none flex items-center">
          Borealhour
        </div>
        <div className="flex-1 flex items-center">
          <Search onSelectLocation={(weatherData) => selectedLocationHandler(weatherData)} />
        </div>
        <div className="flex-none flex items-center">
          Settings
        </div>
      </div>

      {weatherData ? (
        <div>
          <Forecast weatherData={weatherData} />
        </div>
      ) : (
        <div>
          <Splash />
        </div>
      )}
    </div>
  )
}
