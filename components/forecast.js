import { useState, useEffect } from 'react'
import { PrecipitationLabel, GenericLabel } from './labels'
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, } from 'recharts'
import { WiSnow, WiRain, WiFog, WiWindy, WiCloudy, WiDayCloudy, WiNightCloudy, WiDaySunny, WiNightClear, WiSleet, WiSnowflakeCold, WiRainMix, } from "react-icons/wi"
import WeatherIcon from '../components/weatherIcon'
import { HiChevronLeft, HiChevronRight, } from 'react-icons/hi'
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
  orangeDark: 'rgb(234 88 12)',
  orangeLight: 'rgb(255 237 213)',
  skyDark: 'rgb(2 132 199)',
  skyMedium: 'rgb(186 230 253)',
  skyLight: 'rgb(224 242 254)',
  emeraldDark: 'rgb(4 120 87)',
  emeraldLight: 'rgb(209 250 229)',
  pinkDark: 'rgb(190 24 93)',
  pinkLight: 'rgb(252 231 243)',
  stone: 'rgb(161 161 170)',
}

const unitSymbols = {
  temperature: {
    metric: '°C',
    us: '°F',
  },
  speed: {
    metric: 'km/h',
    us: 'MPH',
  }
}

function convertTime(inputDate) {
  const inputDateFull = new Date('1970-01-01T' + inputDate + 'Z').toLocaleTimeString([], { timeZone: 'UTC', })
  const outputDate = inputDateFull.slice(0, -6) + ' ' + inputDateFull.slice(-2, ).toLowerCase()
  return outputDate
}

export default function Forecast({ weatherData, units, focusDay, setFocusDay }) {
  console.log(weatherData)
  return (
    <>
      {/* Current */}
      <div className="p-8 lg:p-12">
        <div className="flex space-x-2">
          <MajorHeading content="Current" /><DataLabel content={`(as of ${convertTime(weatherData.currentConditions.datetime)})`} />
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2">
          <div className="flex-1 sm:flex-none flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div><WeatherIcon type={weatherData.currentConditions.icon} size="lg" color="black" /></div>
              <DataValue content={weatherData.currentConditions.conditions} />
            </div>
          </div>
          <div className="flex-auto flex justify-center items-center sm:w-40 lg:w-80">
            <div className="text-5xl">
              <DataValue content={`${Math.round(weatherData.currentConditions.temp)} ${unitSymbols.temperature[units]}`} />
            </div>
          </div>
          <div className="flex-auto flex justify-center items-center sm:w-40 lg:w-20">
            <div className="w-full">
              <div className="flex">
                <div className="flex-1">
                  <DataLabel content="Precipitation" />
                </div>
                <div className="">
                  <DataValue content={weatherData.currentConditions.precipprob ? `${Math.round(weatherData.currentConditions.precipprob)}% probability` : `None`} />
                  <DataValue content={weatherData.currentConditions.preciptype && ` ${weatherData.currentConditions.preciptype}`} />
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <DataLabel content="Wind" />
                </div>
                <div className="">
                  <DataValue content={weatherData.currentConditions.windspeed && `${Math.round(weatherData.currentConditions.windspeed)} ${unitSymbols.speed[units]}`} />
                  &nbsp;
                  <DataValue content={weatherData.currentConditions.winddir && `${Math.round(weatherData.currentConditions.winddir)}°`} />
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
                  <DataValue content={`${Math.round(weatherData.currentConditions.humidity)}%`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today or focus day */}
      <div className="p-8 lg:p-12 rounded-3xl bg-white shadow-sm border-y border-stone-100">
        <div className="flex items-center mb-4">
          <div className="w-28">
            <MajorHeading
              content={focusDay && new Date(weatherData.days.find(d => d.datetime === focusDay).datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })}
              additionalClasses="mb-0"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="p-1 sm:p-0 cursor-pointer disabled:cursor-default shadow-sm active:shadow-inner disabled:active:shadow-sm border border-stone-100 rounded-sm disabled:text-zinc-300"
              disabled={focusDay === new Date().toLocaleString('sv', { timeZone: weatherData.timezone }).split(' ')[0]}
              onClick={() => setFocusDay(new Date(new Date().setTime(new Date(focusDay).getTime() - (1000*60*60*24))).toISOString().split('T')[0])}
            >
              <HiChevronLeft size={20} />
            </button>
            <button
              className="p-1 sm:p-0 cursor-pointer disabled:cursor-default shadow-sm active:shadow-inner disabled:active:shadow-sm border border-stone-100 rounded-sm disabled:text-zinc-300"
              disabled={focusDay === new Date(new Date().setTime(new Date(new Date().toLocaleString('sv', { timeZone: weatherData.timezone }).split(' ')[0]).getTime() + (1000*60*60*24*13))).toISOString().split('T')[0]}
              onClick={() => setFocusDay(new Date(new Date().setTime(new Date(focusDay).getTime() + (1000*60*60*24))).toISOString().split('T')[0])}
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center">
            {focusDay && <WeatherIcon type={weatherData.days.find(d => d.datetime === focusDay).icon} size="md" color="black" />}
          </div>
          <div className="flex items-center">
            <div>
              <div>
                <DataValue content={focusDay && weatherData.days.find(d => d.datetime === focusDay).conditions} />
              </div>
              <div className="text-sm">
                <DataValue content={focusDay && weatherData.days.find(d => d.datetime === focusDay).description} />
              </div>
            </div>
          </div>
        </div>
        {/* Temperatures */}
        <div className="">
          <MinorHeading content="Temperature" />
          <div className="space-x-4">
            <span><DataLabel content="High" /> <DataValue content={focusDay && Math.round(weatherData.days.find(d => d.datetime === focusDay).tempmax)} /></span>
            <span><DataLabel content="Low" /> <DataValue content={focusDay && Math.round(weatherData.days.find(d => d.datetime === focusDay).tempmin)} /></span>
          </div>
          <div className="flex">
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={focusDay && weatherData.days.find(d => d.datetime === focusDay).hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Area type="monotone" dataKey={hour => Math.round(hour.temp)} stroke={chartColors.orangeDark} fill={chartColors.orangeLight} dot={false} animationDuration={300}>
                  <LabelList dataKey={hour => ({ temp: Math.round(hour.temp), datetime: hour.datetime })} content={<GenericLabel />} />
                </Area>
                <XAxis dataKey={hour => convertTime(hour.datetime)} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Precipitation */}
        <div className="">
          <MinorHeading content="Precipitation" />
          <div className="flex">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={focusDay && weatherData.days.find(d => d.datetime === focusDay).hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Bar dataKey={hour => Math.round(hour.precipprob)} fill={chartColors.skyMedium} animationDuration={300}>
                  <LabelList dataKey={hour => ({ precipProb: Math.round(hour.precipprob), precipType: hour.preciptype, datetime: hour.datetime })} content={<PrecipitationLabel />} />
                </Bar>
                <XAxis dataKey={hour => convertTime(hour.datetime)} height={10} interval="preserveStart" axisLine={true} tickLine={false} tick={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wind speed */}
        <div className="">
          <MinorHeading content="Wind" />
          <div className="flex">
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={focusDay && weatherData.days.find(d => d.datetime === focusDay).hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Area type="monotone" dataKey={hour => Math.round(hour.windspeed)} stroke={chartColors.emeraldDark} fill={chartColors.emeraldLight} dot={false} animationDuration={300}>
                  <LabelList dataKey={hour => ({ temp: Math.round(hour.windspeed), datetime: hour.datetime })} content={<GenericLabel />} />
                </Area>
                <XAxis dataKey={hour => convertTime(hour.datetime)} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cloud cover */}
        <div className="">
          <MinorHeading content="Cloud cover" />
          <div className="flex">
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={focusDay && weatherData.days.find(d => d.datetime === focusDay).hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Area type="monotone" dataKey={hour => hour.cloudcover === '100' ? hour.cloudcover : Math.round(hour.cloudcover)} stroke={chartColors.pinkDark} fill={chartColors.pinkLight} dot={false} animationDuration={300}>
                  <LabelList dataKey={hour => ({ temp: Math.round(hour.cloudcover), datetime: hour.datetime })} content={<GenericLabel />} />
                </Area>
                <XAxis dataKey={hour => convertTime(hour.datetime)} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Humidity */}
        <div className="">
          <MinorHeading content="Humidity" />
          <div>
            <DataLabel content="Relative humidity" /> <DataValue content={focusDay && `${Math.round(weatherData.days.find(d => d.datetime === focusDay).humidity)}%`} />
          </div>
        </div>

      </div>

      {/* Short-term */}
      <div>
        <div className="px-8 lg:px-12 pt-8 lg:pt-12">
          <div className="flex space-x-2">
            <MajorHeading content="Forecast" /><DataLabel content="(short-term)" />
          </div>
        </div>
        <div className="px-4 lg:px-8 pb-4 lg:pb-8 flex overflow-x-auto">
          {weatherData.days
            .slice(0, 5)
            // .filter(day => day !== weatherData.days.find(d => d.datetime === focusDay))
            .map(day => (
              <div
                key={day.datetime}
                className={`flex-none lg:flex-1 w-48 lg:w-full grid grid-rows-7 cursor-pointer w-full p-4 border border-transparent rounded-sm transition-all duration-300 ${day.datetime === focusDay && 'bg-white shadow-sm border-stone-100 rounded-sm'}`}
                onClick={() => setFocusDay(day.datetime)}
              >
                <div className="mb-4">
                  <DataLabel content={new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' })} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <WeatherIcon type={day.icon} size="md" color="black" />
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
                    <span><DataLabel content="High" /> <DataValue content={Math.round(day.tempmax)} /></span>
                    <span><DataLabel content="Low" /> <DataValue content={Math.round(day.tempmin)} /></span>
                  </div>
                  <ResponsiveContainer width="95%" height={50} className="mx-auto">
                    <AreaChart data={weatherData.days.find(d => d === day).hours}>
                      <Area type="monotone" dataKey="temp" stroke={chartColors.orangeDark} fill={chartColors.orangeLight} dot={false} animationDuration={0} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <MinorHeading content="Precipitation" />
                  <div className="space-x-4">
                    <DataValue content={`${Math.round(day.precip)}%`} />
                    <DataArray content={day.preciptype} />
                  </div>
                  <ResponsiveContainer width="95%" height={50} className="mx-auto">
                    <BarChart data={weatherData.days.find(d => d === day).hours} >
                      <Bar dataKey="precipprob" fill={chartColors.skyMedium} animationDuration={300} />
                      <XAxis height={1} tickLine={false} tick={false} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <MinorHeading content="Wind" />
                  <div className="space-x-4">
                    <DataValue content={Math.round(day.windspeed)} />
                    <DataValue content={`${Math.round(day.winddir)}°`} />
                  </div>
                  <ResponsiveContainer width="95%" height={50} className="mx-auto">
                    <AreaChart data={weatherData.days.find(d => d === day).hours}>
                      <Area type="monotone" dataKey="windspeed" stroke={chartColors.emeraldDark} fill={chartColors.emeraldLight} dot={false} animationDuration={0} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <MinorHeading content="Cloud cover" />
                  <div>
                    <DataValue content={`${Math.round(day.cloudcover)}%`} />
                  </div>
                  <ResponsiveContainer width="95%" height={50} className="mx-auto">
                    <AreaChart data={weatherData.days.find(d => d === day).hours}>
                      <Area type="monotone" dataKey="cloudcover" stroke={chartColors.pinkDark} fill={chartColors.pinkLight} dot={false} animationDuration={0} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <MinorHeading content="Humidity" />
                  <div>
                    <DataValue content={`${Math.round(day.humidity)}%`} />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Long-term */}
      <div>
        <div className="px-8 lg:px-12 pt-8 lg:pt-12">
          <div className="flex space-x-2">
            <MajorHeading content="Forecast" /><DataLabel content="(long-term)" />
          </div>
        </div>
        <div className="px-4 lg:px-8 pb-4 lg:pb-8 flex overflow-x-auto">
          {weatherData.days
            .slice(5, 14)
            // .filter(day => day !== weatherData.days.find(d => d.datetime === focusDay))
            .map((day, i) => (
              <div
                key={day.datetime}
                className={`flex-none xl:flex-1 w-48 xl:w-full grid grid-rows-7 cursor-pointer p-4 border border-transparent rounded-sm transition-all duration-300 ${day.datetime === focusDay && 'bg-white shadow-sm border-stone-100 rounded-sm'}`}
                onClick={() => setFocusDay(day.datetime)}
              >
                <div className="mb-4">
                  <DataLabel content={new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })} />
                </div>
                <div className="space-y-2">
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
                  <div>
                    <div><DataLabel content="High" /> <DataValue content={Math.round(day.tempmax)} /></div>
                    <div><DataLabel content="Low" /> <DataValue content={Math.round(day.tempmin)} /></div>
                  </div>
                </div>
                <div>
                  <MinorHeading content="Precipitation" />
                  <div className="space-x-4">
                    <DataValue content={`${Math.round(day.precip)}%`} />
                    <DataArray content={day.preciptype} />
                  </div>
                </div>
                <div>
                  <MinorHeading content="Wind" />
                  <div>
                    <DataValue content={Math.round(day.windspeed)} />
                  </div>
                </div>
                <div>
                  <MinorHeading content="Cloud cover" />
                  <div>
                    <DataValue content={`${Math.round(day.cloudcover)}%`} />
                  </div>
                </div>
                <div>
                  <MinorHeading content="Humidity" />
                  <div>
                    <DataValue content={`${Math.round(day.humidity)}%`} />
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
