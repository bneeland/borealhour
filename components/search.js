import { useState, useEffect, } from 'react'
import Link from 'next/link'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import { Combobox } from '@headlessui/react'

export default function Search(props) {
  const [autocompleteLocation, setAutocompleteLocation] = useState('')
  const [weatherData, setWeatherData] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  function getWeatherData(_query) {
    console.log('API call')
    return axios({
      method: 'get',
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${_query}?unitGroup=metric&key=${process.env.NEXT_PUBLIC_VISUAL_CROSSING_API_KEY_ALT}&contentType=json`,
    })
      .then(response => response.data)
      .catch(error => error.response.data)
  }

  function locationInputHandler(e) {
    const _query = e.target.value

    if (_query.length >= 3) {
      getWeatherData(_query).then(data => {
        if (data) {
          setAutocompleteLocation([data.resolvedAddress])
          setWeatherData(data)
        } else {
          setAutocompleteLocation('')
        }
      })
    } else {
      setAutocompleteLocation('')
    }
  }

  function locationSelectionHandler(e) {
    setSelectedLocation(e)

    props.onSelectLocation(weatherData)

    // Set selected location in local storage
    localStorage.setItem('selectedLocation', e)
  }

  function swrHandler(_message) {
    console.log(_message)

    const _selectedLocation = localStorage.getItem('selectedLocation')

    if (_selectedLocation) {
      getWeatherData(_selectedLocation).then(data => {
        if (data) {
          setAutocompleteLocation([data.resolvedAddress])
          setWeatherData(data)
          props.onSelectLocation(data)
        }
      })

      setSelectedLocation(_selectedLocation)
    }
  }

  useSWR('Get weather data on page load or focus', swrHandler)

  return (
    <div className="w-full">

      <Combobox value={selectedLocation} onChange={e => locationSelectionHandler(e)}>
        <Combobox.Input
          onChange={locationInputHandler}
          autoComplete="off"
          className="w-full px-2 py-1 bg-zinc-100 shadow-inner border border-zinc-100 rounded transition-all font-light"
          placeholder="Search for a location"
        />
        <Combobox.Options
          className={(autocompleteLocation[0] ? '' : 'hidden') + ' ' +
          'absolute py-2 mt-2 shadow-md border border-zinc-100  rounded bg-white z-50'}
        >
          {autocompleteLocation && autocompleteLocation.map((location) => (
            <Combobox.Option key={location} value={location}>
              {({ active, selected }) => (
                <div className={`${active ? 'bg-blue-500 text-white' : ''} px-6 cursor-pointer`}>{location}</div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>

    </div>
  )
}
