import { useState } from 'react'
import Head from 'next/head'
import Search from '../components/search'
import Forecast from '../components/forecast'
import Splash from '../components/splash'
import { HiOutlineCog } from 'react-icons/hi'
import { Popover, Switch } from '@headlessui/react'
import { DataLabel, } from '../components/typography'

export default function Home() {
  const [weatherData, setWeatherData] = useState()
  const [focusDay, setFocusDay] = useState()
  const [units, setUnits] = useState('metric')

  function setLocationHandler(weatherData) {
    setWeatherData(weatherData)
    setFocusDay(weatherData.days[0].datetime)
  }

  return (
    <div className="bg-stone-100 pt-16">
      <Head>
        <title>Borealhour - weather</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex space-x-4 px-4 h-14 m-2 fixed inset-x-0 top-0 z-40 bg-white rounded shadow-sm border border-stone-100">
        <div className="flex-none flex items-center">
          Borealhour
        </div>
        <div className="flex-1 flex items-center">
          <Search units={units} onSelectLocation={weatherData => setLocationHandler(weatherData)} />
        </div>
        <div className="flex-none flex items-center">
          <Popover>
            <Popover.Button className="flex items-center text-zinc-600 hover:text-zinc-900 transition-all">
              <HiOutlineCog size={20} />
            </Popover.Button>
            <Popover.Panel className="absolute right-2 p-4 mt-2 shadow-md border border-stone-100 rounded bg-white z-50">
              <div className="grid">
                <div className="flex items-center space-x-3">
                  <div
                    onClick={() => setUnits('metric')}
                    className="cursor-pointer"
                  >
                    <DataLabel content="Metric (°C)" />
                  </div>
                  <Switch
                    checked={units === 'us'}
                    onChange={() => setUnits(units === 'metric' ? 'us' : 'metric')}
                    className="bg-zinc-300 shadow-inner border border-stone-100 relative inline-flex items-center h-6 rounded-full w-11"
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        units === 'us' ? 'translate-x-6' : 'translate-x-1'
                      } inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                  </Switch>
                  <div
                    onClick={() => setUnits('us')}
                    className="cursor-pointer"
                  >
                    <DataLabel content="Imperial (°F)" />
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      </div>

      {weatherData ? (
        <div>
          <Forecast weatherData={weatherData} units={units} focusDay={focusDay} setFocusDay={focusDay => setFocusDay(focusDay)} />
        </div>
      ) : (
        <div>
          <Splash />
        </div>
      )}
    </div>
  )
}
