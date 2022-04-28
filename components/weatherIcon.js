import { WiSnow, WiRain, WiFog, WiWindy, WiCloudy, WiDayCloudy, WiNightCloudy, WiDaySunny, WiNightClear, WiSleet, WiSnowflakeCold, WiRainMix, } from "react-icons/wi"

const iconConfig = {
  sizes: {
    xl: 90,
    lg: 70,
    md: 50,
    sm: 40,
    xs: 30,
  },
  colors: {
    black: '#000',
    gray: '#6b7280',
  }
}

export default function WeatherIcon(props) {
  const icons = {
    'snow': <WiSnow size={iconConfig.sizes[props.size]} color={iconConfig.colors[props.color]} title={props.type} />,
    'rain': <WiRain size={iconConfig.sizes[props.size]} color={iconConfig.colors[props.color]} title={props.type} />,
    'fog': <WiFog size={iconConfig.sizes[props.size]} color={iconConfig.colors[props.color]} title={props.type} />,
    'wind': <WiWindy size={iconConfig.sizes[props.size]} color={iconConfig.colors[props.color]} title={props.type} />,
    'cloudy': <WiCloudy size={iconConfig.sizes[props.size]} color={iconConfig.colors[props.color]} title={props.type} />,
    'partly-cloudy-day': <WiDayCloudy size={iconConfig.sizes[props.size]} color={iconConfig.colors[props.color]} title={props.type} />,
    'partly-cloudy-night': <WiNightCloudy size={iconConfig.sizes[props.size]} color={iconConfig.colors[props.color]} title={props.type} />,
    'clear-day': <WiDaySunny size={iconConfig.sizes[props.size]} color={iconConfig.colors[props.color]} title={props.type} />,
    'clear-night': <WiNightClear size={iconConfig.sizes[props.size]} color={iconConfig.colors[props.color]} title={props.type} />,
  }

  return (
    icons[props.type]
  )
}
