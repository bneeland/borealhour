export default function PrecipitationLabel(props) {
  const { x, y, width, height, value } = props

  return (
    <g>
      <text x={x} y={y - 13} fill="gray" className="text-sm" textAnchor="middle" dominantBaseline="middle">
        {value.precipProb}
      </text>
      <text x={x} y={y - 27} fill="gray" className="text-sm" textAnchor="middle" dominantBaseline="middle">
        {value.precipType && value.precipProb > 10 && value.precipType}
      </text>
    </g>
  )
}
