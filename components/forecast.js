import { useState, useEffect } from 'react'
import PrecipitationLabel from './precipitationLabel'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, LabelList, } from 'recharts'
import { WiSnow, WiRain, WiFog, WiWindy, WiCloudy, WiDayCloudy, WiNightCloudy, WiDaySunny, WiNightClear, WiSleet, WiSnowflakeCold, WiRainMix, } from "react-icons/wi"
import WeatherIcon from '../components/weatherIcon'
import { HiChevronLeft, HiChevronRight, } from "react-icons/hi"
import { MajorHeading, MinorHeading, DataLabel, DataValue, DataArray, } from './typography'

const weekdays = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Monday',
  7: 'Monday',
}

const chartColors = {
  orange: 'rgb(234 88 12)',
  sky: 'rgb(3 105 161)',
  emerald: 'rgb(4 120 87)',
  pink: 'rgb(190 24 93)',
  zinc: 'rgb(161 161 170)',
}

function convertTime(inputDate) {
  const inputDateFull = new Date('1970-01-01T' + inputDate + 'Z').toLocaleTimeString([], { timeZone: 'UTC', })
  const outputDate = inputDateFull.slice(0, -9) + ' ' + inputDateFull.slice(-2, ).toLowerCase()
  return outputDate
}

export default function Forecast({ weatherData }) {
  console.log('weatherData')
  console.log(weatherData)

  const [focusDay, setFocusDay] = useState(weatherData.days[0].datetime)

  return (
    <>
      {/* Now */}
      <div className="p-4">
        <MajorHeading content={`Now (as of ${convertTime(weatherData.currentConditions.datetime)})`} />
        <div className="flex">
          <div className="flex-none flex items-center">
            <div className="flex flex-col items-center">
              <div><WeatherIcon type={weatherData.currentConditions.icon} size="xl" color="black" /></div>
              <DataValue content={weatherData.currentConditions.conditions} />
            </div>
          </div>
          <div className="flex-auto flex justify-center items-center w-80">
            <div className="text-4xl">
              <DataValue content={`${weatherData.currentConditions.temp} °C`} />
            </div>
          </div>
          <div className="flex-auto flex justify-center items-center w-60">
            <div className="w-full">
              <div className="flex">
                <div className="flex-1">
                  <DataLabel content="Precipitation" />
                </div>
                <div className="">
                  <DataValue content={weatherData.currentConditions.precipprob ? `${weatherData.currentConditions.precipprob}% probability` : `None`} />
                  <DataValue content={weatherData.currentConditions.preciptype && ` ${weatherData.currentConditions.preciptype}`} />
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <DataLabel content="Wind" />
                </div>
                <div className="">
                  <DataValue content={
                    `${weatherData.currentConditions.windspeed} km/h` +
                    (weatherData.currentConditions.winddir && ` ${weatherData.currentConditions.winddir}°`)
                  } />
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <DataLabel content="Cloud cover" />
                </div>
                <div className="">
                  <DataValue content={`${weatherData.currentConditions.cloudcover}%`} />
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <DataLabel content="Relative humidity" />
                </div>
                <div className="">
                  <DataValue content={`${weatherData.currentConditions.humidity}%`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today or focus day */}
      <div className="p-4 m-4 rounded-2xl bg-white shadow-sm">
        <div className="flex items-center">
          <div className="w-28">
            <MajorHeading content={new Date(weatherData.days.find(d => d.datetime === focusDay).datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })} />
          </div>
          <div className="flex items-center space-x-4">
          <button
            className="cursor-pointer disabled:cursor-default shadow-sm rounded-sm text-zinc-500 disabled:text-zinc-300 transition-all"
            disabled={focusDay === new Date().toLocaleString('sv').split(' ')[0]}
            onClick={() => setFocusDay(new Date(new Date().setTime(new Date(focusDay).getTime() - (1000*60*60*24))).toISOString().split('T')[0])}
          >
            <HiChevronLeft size={20} />
          </button>
          <button
            className="cursor-pointer disabled:cursor-default shadow-sm rounded-sm text-zinc-500 disabled:text-zinc-300 transition-all"
            disabled={focusDay === new Date(new Date().setTime(new Date(new Date().toLocaleString('sv').split(' ')[0]).getTime() + (1000*60*60*24*13))).toISOString().split('T')[0]}
            onClick={() => setFocusDay(new Date(new Date().setTime(new Date(focusDay).getTime() + (1000*60*60*24))).toISOString().split('T')[0])}
          >
            <HiChevronRight size={20} />
          </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center">
            <WeatherIcon type={weatherData.days.find(d => d.datetime === focusDay).icon} size="md" color="black" />
          </div>
          <div className="flex items-center">
            <div>
              <div>
                <DataValue content={weatherData.days.find(d => d.datetime === focusDay).conditions} />
              </div>
              <div className="text-sm">
                <DataValue content={weatherData.days.find(d => d.datetime === focusDay).description} />
              </div>
            </div>
          </div>
        </div>
        {/* Temperatures */}
        <div className="">
          <MinorHeading content="Temperature" />
          <div className="space-x-4">
            <span><DataLabel content="High" /> <DataValue content={weatherData.days.find(d => d.datetime === focusDay).tempmax} /></span>
            <span><DataLabel content="Low" /> <DataValue content={weatherData.days.find(d => d.datetime === focusDay).tempmin} /></span>
          </div>
          <div className="flex">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days.find(d => d.datetime === focusDay).hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey={hour => Math.round(hour.temp)} stroke={chartColors.orange} dot={false} animationDuration={300} label={{ fill: chartColors.zinc, fontSize: 14, position: 'top', offset: 10, }} />
                <XAxis dataKey={hour => convertTime(hour.datetime)} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Precipitation */}
        <div className="">
          <MinorHeading content="Precipitation" />
          <div className="flex">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days.find(d => d.datetime === focusDay).hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey={hour => Math.round(hour.precipprob)} stroke={chartColors.sky} dot={false} animationDuration={300}>
                  <LabelList dataKey={hour => ({ precipProb: Math.round(hour.precipprob), precipType: hour.preciptype})} content={<PrecipitationLabel />} />
                </Line>
                <XAxis dataKey={hour => convertTime(hour.datetime)} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wind speed */}
        <div className="">
          <MinorHeading content="Wind" />
          <div className="flex">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days.find(d => d.datetime === focusDay).hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey={hour => Math.round(hour.windspeed)} stroke={chartColors.emerald} dot={false} animationDuration={300} label={{ fill: chartColors.zinc, fontSize: 14, position: 'top', offset: 10, }} />
                <XAxis dataKey={hour => convertTime(hour.datetime)} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cloud cover */}
        <div className="">
          <MinorHeading content="Cloud cover" />
          <div className="flex">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days.find(d => d.datetime === focusDay).hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey={hour => hour.cloudcover === '100' ? hour.cloudcover : Math.round(hour.cloudcover)} stroke={chartColors.pink} dot={false} animationDuration={300} label={{ fill: chartColors.zinc, fontSize: 14, position: 'top', offset: 10, }} />
                <XAxis dataKey={hour => convertTime(hour.datetime)} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Humidity */}
        <div className="">
          <MinorHeading content="Humidity" />
          <div>
            <DataLabel content="Relative humidity" /> <DataValue content={`${weatherData.days.find(d => d.datetime === focusDay).humidity}%`} />
          </div>
        </div>

      </div>

      {/* Short-term */}
      <div>
        <div className="px-4 pt-4">
          <MajorHeading content="Forecast (short term)" />
        </div>
        <div className="px-4 pb-4 flex overflow-x-auto">
          {weatherData.days
            .slice(0, 5)
            // .filter(day => day !== weatherData.days.find(d => d.datetime === focusDay))
            .map(day => (
              <div
                key={day.datetime}
                className={`flex-none lg:flex-1 w-48 lg:w-full grid grid-rows-7 cursor-pointer w-full p-4 rounded-lg transition-all duration-300 pointer ${day.datetime === focusDay && 'bg-white shadow-sm rounded-sm'}`}
                onClick={() => setFocusDay(day.datetime)}
              >
                <div>
                  <DataLabel content={new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' })} />
                </div>
                <div>
                  <div className="flex justify-center">
                    <WeatherIcon type={day.icon} size="sm" color="black" />
                  </div>
                  <div>
                    <DataValue content={day.conditions} />
                  </div>
                  <div className="text-sm">
                    <DataValue content={day.description} />
                  </div>
                </div>
                <div>
                  <MinorHeading content="Temperature" />
                  <div className="space-x-4">
                    <span><DataLabel content="High" /> <DataValue content={day.tempmax} /></span>
                    <span><DataLabel content="Low" /> <DataValue content={day.tempmin} /></span>
                  </div>
                  <ResponsiveContainer width="95%" height={50} className="mx-auto">
                    <LineChart data={weatherData.days.find(d => d === day).hours}>
                      <Line type="monotone" dataKey="temp" stroke={chartColors.orange} dot={false} animationDuration={0} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <MinorHeading content="Precipitation" />
                  <div className="space-x-4">
                    <DataValue content={`${day.precip}%`} />
                    <DataArray content={day.preciptype} />
                  </div>
                  <ResponsiveContainer width="95%" height={50} className="mx-auto">
                    <LineChart data={weatherData.days.find(d => d === day).hours}>
                      <Line type="monotone" dataKey="precipprob" stroke={chartColors.sky} dot={false} animationDuration={0} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <MinorHeading content="Wind" />
                  <div className="space-x-4">
                    <DataValue content={`${day.windspeed} km/h`} />
                    <DataValue content={`${day.winddir}°`} />
                  </div>
                  <ResponsiveContainer width="95%" height={50} className="mx-auto">
                    <LineChart data={weatherData.days.find(d => d === day).hours}>
                      <Line type="monotone" dataKey="windspeed" stroke={chartColors.emerald} dot={false} animationDuration={0} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <MinorHeading content="Cloud cover" />
                  <div>
                    <DataValue content={`${day.cloudcover}%`} />
                  </div>
                  <ResponsiveContainer width="95%" height={50} className="mx-auto">
                    <LineChart data={weatherData.days.find(d => d === day).hours}>
                      <Line type="monotone" dataKey="cloudcover" stroke={chartColors.pink} dot={false} animationDuration={0} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <MinorHeading content="Humidity" />
                  <div>
                    <DataValue content={`${day.humidity}%`} />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Long-term */}
      <div>
        <div className="px-4 pt-4">
          <MajorHeading content="Forecast (long term)" />
        </div>
        <div className="px-4 pb-4 flex overflow-x-auto">
          {weatherData.days
            .slice(5, 14)
            // .filter(day => day !== weatherData.days.find(d => d.datetime === focusDay))
            .map((day, i) => (
              <div
                key={day.datetime}
                className={`flex-none xl:flex-1 w-48 xl:w-full grid grid-rows-7 cursor-pointer p-4 rounded-lg transition-all duration-300 ${day.datetime === focusDay && 'bg-white shadow-sm rounded-sm'}`}
                onClick={() => setFocusDay(day.datetime)}
              >
                <div>
                  <DataLabel content={new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })} />
                </div>
                <div>
                  <div className="flex justify-center">
                    <WeatherIcon type={day.icon} size="xs" color="black" />
                  </div>
                  <div>
                    <DataValue content={day.conditions} />
                  </div>
                  <div className="text-sm">
                    <DataValue content={day.description} />
                  </div>
                </div>
                <div>
                  <MinorHeading content="Temperature" />
                  <div>
                    <div><DataLabel content="High" /> <DataValue content={day.tempmax} /></div>
                    <div><DataLabel content="Low" /> <DataValue content={day.tempmin} /></div>
                  </div>
                </div>
                <div>
                  <MinorHeading content="Precipitation" />
                  <div className="space-x-4">
                    <DataValue content={`${day.precip}%`} />
                    <DataArray content={day.preciptype} />
                  </div>
                </div>
                <div>
                  <MinorHeading content="Wind" />
                  <div>
                    <DataValue content={`${day.windspeed} km/h`} />
                  </div>
                </div>
                <div>
                  <MinorHeading content="Cloud cover" />
                  <div>
                    <DataValue content={`${day.cloudcover}%`} />
                  </div>
                </div>
                <div>
                  <MinorHeading content="Humidity" />
                  <div>
                    <DataValue content={`${day.humidity}%`} />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
