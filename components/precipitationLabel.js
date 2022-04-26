const chartColors = {
  stone: 'rgb(161 161 170)',
}

export default function PrecipitationLabel(props) {
  const { x, y, width, height, value } = props

  return (
    <g>
      <text x={x} y={y - 13} fill={chartColors.stone} className="text-sm" textAnchor="middle" dominantBaseline="middle">
        {value.precipProb}
      </text>
      <text x={x} y={y - 27} fill={chartColors.stone} className="text-xs" textAnchor="middle" dominantBaseline="middle">
        {( value.precipType && value.precipProb >= 10 ) && value.precipType[0].slice(0, 1).toUpperCase() + value.precipType[0].slice(1, )}
      </text>
    </g>
  )
}
