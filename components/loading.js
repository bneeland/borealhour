import { HiOutlineSun } from 'react-icons/hi'

export default function Splash() {
  return (
    <div className="absolute inset-0 h-screen w-screen bg-stone-100 flex justify-center items-center text-gray-400">
      <div className="animate-spin">
        <HiOutlineSun size={40} />
      </div>
    </div>
  )
}
