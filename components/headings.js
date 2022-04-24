export function Heading1(props) {
  return (
    <div
      className="text-sm text-gray-500 font-light uppercase my-2"
    >
      {props.content}
    </div>
  )
}

export function Heading2(props) {
  return (
    <div
      className="text-xs text-gray-500 font-light uppercase my-2"
    >
      {props.content}
    </div>
  )
}
