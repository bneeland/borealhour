const chartColors = {
  stone: 'rgb(161 161 170)',
}

export function PrecipitationLabel({ x, y, width, height, value }) {
  return (
    <g>
      <text x={x + width / 2} y={y - 13} fill={chartColors.stone} className="text-sm" textAnchor="middle" dominantBaseline="middle">
        {( (parseInt(value.datetime.slice(0, 2))-1) % 3 === 0 ) && value.precipProb}
      </text>
      <text x={x + width / 2} y={y - 27} fill={chartColors.stone} className="text-xs" textAnchor="middle" dominantBaseline="middle">
        {( (parseInt(value.datetime.slice(0, 2))-1) % 3 === 0 ) && (( value.precipType && value.precipProb >= 10 ) && value.precipType[0].slice(0, 1).toUpperCase() + value.precipType[0].slice(1, ))}
      </text>
    </g>
  )
}

export function GenericLabel({ x, y, width, height, value }) {
  return (
    <g>
      <text x={x} y={y - 13} fill={chartColors.stone} className="text-sm" textAnchor="middle" dominantBaseline="middle">
        {( (parseInt(value.datetime.slice(0, 2))-1) % 3 === 0 ) && value.temp}
      </text>
    </g>
  )
}
