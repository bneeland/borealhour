import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

export default function Search() {
  const [locationInput, setLocationInput] = useState('')
  const [autocompleteLocation, setAutocompleteLocation] = useState({})
  const [lastLocationSearch, setLastLocationSearch] = useState(0)

  const minQueryLengthToSearch = 3

  const locationInputHandler = (e) => {
    const query = e.target.value
    setLocationInput(query)
    if (query.length >= minQueryLengthToSearch) { // Don't bother searching for city if query is less than 3 characters
      getAutocompleteData(query)
        .then(data => {
          if (data) {
            setAutocompleteLocation({long: data.resolvedAddress})
          } else {
            setAutocompleteLocation({})
          }
        })
    } else {
      setAutocompleteLocation({})
    }
  }

  const getAutocompleteData = (query) => {
    return axios({
      method: 'get',
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?key=${process.env.NEXT_PUBLIC_VISUAL_CROSSING_API_KEY}&contentType=json`,
    })
      .then(response => response.data)
      .catch(error => console.log(error.response.data))
  }

  return (
    <div>
      <div>Search for location</div>
      <div>
        <input onChange={locationInputHandler} value={locationInput} type="text" id="location" name="location" placeholder="City, region, country, etc."/>
      </div>
      <div>
        {autocompleteLocation && <Link href={`/${autocompleteLocation.long}`}><a>{autocompleteLocation.long}</a></Link>}
      </div>
    </div>
  )
}
