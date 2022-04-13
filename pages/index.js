import { useState } from 'react'
import Head from 'next/head'
import Search from '../components/search2'
import Forecast from '../components/forecast'

export default function Home() {
  const [weatherData, setWeaterData] = useState()

  function selectedLocationHandler(weatherData) {
    console.log('selectedLocation through props')
    console.log(weatherData)
    setWeaterData(weatherData)
  }

  return (
    <div>
      <Head>
        <title>Borealdusk - weather</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex">
        <div className="flex-none">
          Borealdusk
        </div>
        <div className="flex-1">
          <Search onSelectLocation={(weatherData) => selectedLocationHandler(weatherData)} />
        </div>
        <div className="flex-none">
          Settings
        </div>
      </div>


      {weatherData && (
        <>
          <Forecast weatherData={weatherData} />
        </>
      )}
    </div>
  )
}
