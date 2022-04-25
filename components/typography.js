export function MajorHeading(props) {
  return (
    <div className="text-sm text-gray-500 uppercase my-4">
      {props.content}
    </div>
  )
}

export function MinorHeading(props) {
  return (
    <div className="text-xs text-gray-500 uppercase my-4">
      {props.content}
    </div>
  )
}

export function DataLabel(props) {
  return (
    <span className="text-gray-500 text-sm">
      {props.content}
    </span>
  )
}

export function DataValue(props) {
  return (
    <span className="font-space-mono">
      {props.content}
    </span>
  )
}

export function DataArray(props) {
  return (
    <span className="font-space-mono">
      {props.content && props.content.map((item, i) => (
        <>{item}{i !== props.content.length-1 && ', '}</>
      ))}
    </span>
  )
}
