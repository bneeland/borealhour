import { useRouter } from 'next/router'
import Link from 'next/link'
import Search from '../components/Search'

import axios from 'axios'

export default function Location(props) {
  console.log(props.data)
  return (
    <div>
      <div><Link href="/">&larr; Back</Link></div>
      <Search />
      <p>Weather data for <code>{props.data.resolvedAddress}</code>.</p>
      <p><code>{props.data.description}</code></p>
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
    </div>
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
