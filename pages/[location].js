import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Location(props) {
  console.log(props.data)
  return (
    <div>
      <div><Link href="/">&larr; Back</Link></div>
      <p>Weather data for <code>{props.data.resolvedAddress}</code>.</p>
      <p><code>{props.data.description}</code></p>
      <div>
        {props.data.days.map(day => (
          <div key={day.datetime}>
            <div>
              <code>{day.datetime}: High: {((day.tempmax - 32) * 5/9).toFixed(1)}&nbsp;&deg;C / Low: {((day.tempmin - 32) * 5/9).toFixed(1)}&nbsp;&deg;C</code>
            </div>
            {day.hours.map(hour => (
              <div key={hour.datetime}>
                <code>{hour.datetime}: {((hour.temp - 32) * 5/9).toFixed(1)}&nbsp;&deg;C</code>
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
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${process.env.NEXT_PUBLIC_VISUAL_CROSSING_API_KEY}&contentType=json`)
  const data = await response.json()
  return {
    props: {
      data: data
    }
  }
}
