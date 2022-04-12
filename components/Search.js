import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Combobox } from '@headlessui/react'

export default function Search() {
  const [query, setQuery] = useState('')
  const [autocompleteLocation, setAutocompleteLocation] = useState('')
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

    setQuery(input)

    input.length > 3
      ? getAutocompleteData(input).then(data => {
        if (data) {
          setAutocompleteLocation([data.resolvedAddress])
        } else {
          setAutocompleteLocation('')
        }
      })
      : setAutocompleteLocation('')
  }

  return (
    <div className="">
      {/*<form onSubmit={locationSubmitHandler}>
      <div>
        <input
          onChange={locationInputHandler}
          value={locationInput}
          type="text"
          id="location"
          name="location"
          placeholder="City, region, country, etc."
          autoComplete="off"
          className="border w-full"
        />
      </div>
        {autocompleteLocation && (
          <div className="absolute rounded-md shadow p-2 mt-1">{autocompleteLocation}</div>
        )}
      </form>*/}



      <Combobox value={selectedLocation} onChange={setSelectedLocation}>
        <Combobox.Input
          onChange={locationInputHandler}
          autoComplete="off"
          className="w-full"
        />
        <Combobox.Options>
          {autocompleteLocation && autocompleteLocation.map((person) => (
            <Combobox.Option key={person} value={person}>
              {({ active, selected }) => (
                <li className={active && 'bg-blue-500'}>{person}</li>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>



    </div>
  )
}
