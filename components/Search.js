import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Combobox } from '@headlessui/react'

export default function Search(props) {
  const [locationQuery, setLocationQuery] = useState('')
  const [autocompleteLocation, setAutocompleteLocation] = useState('')
  const [weatherData, setWeatherData] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const getAutocompleteData = (input) => {
    return axios({
      method: 'get',
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?key=${process.env.NEXT_PUBLIC_VISUAL_CROSSING_API_KEY}&contentType=json`,
    })
      .then(response => response.data)
      .catch(error => console.log(error.response.data))
  }

  function locationInputHandler(e) {
    const input = e.target.value

    setLocationQuery(input)

    input.length >= 3
      ? getAutocompleteData(input).then(data => {
        if (data) {
          setAutocompleteLocation([data.resolvedAddress])
          setWeatherData(data)
        } else {
          setAutocompleteLocation('')
        }
      })
      : setAutocompleteLocation('')
  }

  function locationSelectionHandler(e) {
    setSelectedLocation(e)

    props.onSelectLocation(weatherData)
  }

  // console.log('autocompleteData')
  // console.log(autocompleteData)


  return (
    <div className="border">

      <Combobox value={selectedLocation} onChange={e => locationSelectionHandler(e)}>
        <Combobox.Input
          onChange={locationInputHandler}
          autoComplete="off"
          className="w-full"
        />
        <Combobox.Options>
          {autocompleteLocation && autocompleteLocation.map((person) => (
            <Combobox.Option key={person} value={person}>
              {({ active, selected }) => (
                <li className={active ? 'bg-blue-500' : ''}>{person}</li>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>

    </div>
  )
}
