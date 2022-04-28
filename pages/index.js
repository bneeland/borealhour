import { useState, useEffect } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
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
  const [selectedLocation, setSelectedLocation] = useState('')
  const [autocompleteLocation, setAutocompleteLocation] = useState('')

  function getWeatherData(_query) {
    return axios({
      method: 'get',
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${_query}?unitGroup=${units}&key=${process.env.NEXT_PUBLIC_VISUAL_CROSSING_API_KEY}&contentType=json`,
    })
      .then(response => response.data)
      .catch(error => error.response.data)
  }

  function swrHandler(_message) {
    const _selectedLocation = localStorage.getItem('selectedLocation')

    if (_selectedLocation) {
      getWeatherData(_selectedLocation).then(data => {
        if (data) {
          // Only set the focus day if it's not currently set
          // of if it's set but it's earlier than current date based on selected location's timezone
          const currentDate = new Date().toLocaleString('sv', { timeZone: data.timezone }).split(' ')[0]
          if (!focusDay) {
            setFocusDay(currentDate)
          } else {
            if (focusDay < currentDate) {
              setFocusDay(currentDate)
            }
          }

          setAutocompleteLocation([data.resolvedAddress])
          setWeatherData(data)
        }
      })
      setSelectedLocation(_selectedLocation)
    }
  }

  useSWR('Get weather data on page load or focus', swrHandler)

  useEffect(() => {
    swrHandler()
  }, [units])

  return (
    <div className="bg-stone-100 pt-16">
      <Head>
        <title>Borealhour - weather</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex space-x-4 px-4 h-14 m-2 lg:mx-auto lg:w-1/2 fixed inset-x-0 top-0 z-40 bg-white rounded shadow-sm border border-stone-100">
        <div className="flex-none flex items-center">
          Borealhour
        </div>
        <div className="flex-1 flex items-center">
          <Search
            units={units}
            getWeatherData={getWeatherData}
            autocompleteLocation={autocompleteLocation}
            setAutocompleteLocation={setAutocompleteLocation}
            setWeatherData={setWeatherData}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            setFocusDay={setFocusDay}
          />
        </div>
        <div className="flex-none flex items-center">
          <Popover>
            <Popover.Button className="flex items-center text-zinc-600 hover:text-zinc-900 transition-all p-2 sm:p-0">
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

      {selectedLocation ? (
          <Forecast weatherData={weatherData} units={units} focusDay={focusDay} setFocusDay={focusDay => setFocusDay(focusDay)} />
      ) : (
          <Splash />
      )}
    </div>
  )
}
