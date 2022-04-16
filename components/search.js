import { useState, useEffect, } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Combobox } from '@headlessui/react'

export default function Search(props) {
  // const [locationQuery, setLocationQuery] = useState('')
  const [autocompleteLocation, setAutocompleteLocation] = useState('')
  const [weatherData, setWeatherData] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  function getWeatherData(_query) {
    return axios({
      method: 'get',
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${_query}?unitGroup=metric&key=${process.env.NEXT_PUBLIC_VISUAL_CROSSING_API_KEY}&contentType=json`,
    })
      .then(response => response.data)
      .catch(error => error.response.data)
  }

  function locationInputHandler(e) {
    const _query = e.target.value

    // setLocationQuery(_query)

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

  // If location set in local storage, get weather data for it
  useEffect(() => {
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
  }, [props])

  return (
    <div className="w-full border">

      <Combobox value={selectedLocation} onChange={e => locationSelectionHandler(e)}>
        <Combobox.Input
          onChange={locationInputHandler}
          autoComplete="off"
          className="w-full p-1"
          placeholder="Search"
        />
        <Combobox.Options
          className={(autocompleteLocation[0] ? '' : 'hidden') + ' ' +
          'absolute py-2 mt-1 shadow-md rounded bg-white border z-50'}
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
