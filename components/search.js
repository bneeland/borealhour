import { useState, } from 'react'
import { Combobox } from '@headlessui/react'

export default function Search({
  units,
  getWeatherData,
  autocompleteLocation,
  setAutocompleteLocation,
  setWeatherData,
  selectedLocation,
  setSelectedLocation,
  setFocusDay,
}) {
  const [searchWeatherData, setSearchWeatherData] = useState()

  function locationInputHandler(e) {
    const _query = e.target.value

    if (_query.length >= 3) {
      getWeatherData(_query)
        .then(data => {
          if (data) {
            setAutocompleteLocation([data.resolvedAddress])
            setSearchWeatherData(data)
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
    setWeatherData(searchWeatherData)
    const currentDate = new Date().toLocaleString('sv', { timeZone: searchWeatherData.timezone }).split(' ')[0]
    setFocusDay(currentDate)

    // Set selected location in local storage
    localStorage.setItem('selectedLocation', e)
  }

  return (
    <div className="w-full">
      <Combobox value={selectedLocation} onChange={e => locationSelectionHandler(e)}>
        <Combobox.Input
          onChange={locationInputHandler}
          autoComplete="off"
          className="w-full px-2 py-1 bg-stone-100 shadow-inner border border-stone-100 rounded transition-all font-light"
          placeholder="Search for a location"
        />
        <Combobox.Options
          className={(autocompleteLocation[0] ? '' : 'hidden') + ' ' +
          'absolute py-2 mt-1 shadow-md border border-stone-100 rounded bg-white z-50'}
        >
          {autocompleteLocation && autocompleteLocation.map((location) => (
            <Combobox.Option key={Math.random()} value={location}>
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
