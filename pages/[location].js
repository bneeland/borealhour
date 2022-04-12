import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Search from '../components/Search'

import axios from 'axios'

export default function Location(props) {
  const data = props.data
  console.log(props.data)

  function toCelcius(tempInF) {
    return `${((tempInF - 32) * 5/9).toFixed(1)}\xa0°C`
  }

  return (
    <>
      <Head>
        <title>Borealdusk - Weather - Data</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex">

        <div className="flex-none">
          Borealdusk
        </div>

        <div className="flex-1">
          <Search />
        </div>

      </div>


      <div>
        <h1>Today</h1>
        <div>
          <h2>Current</h2>
          <div>As of: {data.currentConditions.datetime}</div>
          <div>Conditions: {data.currentConditions.conditions}</div>
          <div>Temperature: {toCelcius(data.currentConditions.temp)}</div>
          <div>Precipitation: {data.currentConditions.precipprob && `${data.currentConditions.precipprob}% probability, `}{data.currentConditions.precip && `${data.currentConditions.precip} `}{data.currentConditions.preciptype && `${data.currentConditions.preciptype}`}</div>
          <div>Cloud cover: {data.currentConditions.cloudcover}%</div>
          <div>Humidity: {data.currentConditions.humidity}%</div>
        </div>
      </div>

      <hr />
      <div>
        {props.data.days.map(day => (
          <div key={day.datetime}>
            <div>
              <code>{day.datetime}: High: {((day.tempmax - 32) * 5/9).toFixed(1)}&nbsp;&deg;C / Low: {((day.tempmin - 32) * 5/9).toFixed(1)}&nbsp;&deg;C, POP: {day.precipprob}, {day.description}</code>
            </div>
            {day.hours.map(hour => (
              <div key={hour.datetime}>
                <code>{hour.datetime}: {((hour.temp - 32) * 5/9).toFixed(1)}&nbsp;&deg;C, POP: {hour.precipprob}, {hour.conditions}</code>
              </div>
            ))}
          </div>
        ))}
      </div>

    </>
  )
}

export async function getServerSideProps(context) {
  const location = context.params.location

  const data = await axios({
    method: 'get',
    url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${process.env.NEXT_PUBLIC_VISUAL_CROSSING_API_KEY}&contentType=json`,
  })
    .then(response => response.data)
    .catch(error => console.log(error.response.data))

  return {
    props: {
      data: data
    }
  }
}
