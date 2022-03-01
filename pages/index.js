import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [locationInput, setLocationInput] = useState('')
  const [autocompleteCity, setAutocompleteCity] = useState('')
  const [autocompleteCountry, setAutocompleteCountry] = useState('')
  const [lastLocationSearch, setLastLocationSearch] = useState(0)

  const minQueryLengthToSearch = 3

  const locationInputHandler = (e) => {
    const now = Date.now() // Get current timestamp
    const query = e.target.value
    setLocationInput(query)
    if (query.length >= minQueryLengthToSearch) { // Don't bother searching for city if query is less than 3 characters
      if ((now - lastLocationSearch) > (1000 * 0.1)) { // Don't run search more than once per X sec
        getAutocompleteData(query)
          .then(data => {
            if (data) {
              setAutocompleteCity(data.name)
              setAutocompleteCountry(data.country)
              setLastLocationSearch(Date.now()) // Rest the time of last location search
            } else {
              setAutocompleteCity('')
              setAutocompleteCountry('')
            }
          })
      }
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
        {autocompleteCity && <Link href={`/${autocompleteCity}`}><a>{`${autocompleteCity} (${autocompleteCountry})`}</a></Link>}
      </div>
    </div>
  )
}
