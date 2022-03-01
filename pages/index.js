import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [locationInput, setLocationInput] = useState('')
  const [autocompleteCity, setAutocompleteCity] = useState('')
  const [autocompleteCountry, setAutocompleteCountry] = useState('')

  const locationInputHandler = (e) => {
    const query = e.target.value
    setLocationInput(query)
    if (query.length >= 3) {
      getAutocompleteData(query)
        .then(data => {
          console.log(data)
          setAutocompleteCity(data.name)
          setAutocompleteCountry(data.country)
        })
    } else {
      setAutocompleteCity('')
      setAutocompleteCountry('')
    }
  }

  const getAutocompleteData = (query) => {
    return fetch(
      `https://api.api-ninjas.com/v1/city?name=${query}`,
      {
        headers: {
          'X-Api-Key': process.env.NEXT_PUBLIC_API_NINJAS_API_KEY
        }
      }
    )
      .then(response => response.json())
      .then(data => data[0])
      .catch(error => {
        console.error('Error: ', error)
      })
  }

  return (
    <div>
      <div>Search for location</div>
      <div>
        <input onChange={locationInputHandler} value={locationInput} type="text" id="location" name="location" />
      </div>
      <div>
        <input readOnly value={`${autocompleteCity} (${autocompleteCountry})`} type="text" id="autocomplete" name="autocomplete" />
      </div>
    </div>
  )
}
