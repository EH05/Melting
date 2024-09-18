import { CoverType } from '@/types/constType'
import { ArrowUpRight, Mic } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface TypeBtnProps {
  bgColor: string
  title: string
  detail: string[]
  footer: string
  type: CoverType
}

export default function MusicTypeButton(props: TypeBtnProps) {
  const navigate = useNavigate()

  const clickEvent: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/music/list', { state: { type: props.type } })
  }
  return (
    <button
      type="button"
      className="w-full px-3 py-5 flex items-center justify-center text-black font-bold rounded-lg transition-colors "
      style={{ backgroundColor: props.bgColor }}
      onClick={clickEvent}
    >
      <div className="flex w-full flex-col items-start text-white me-3">
        <div className="text-1xl mb-5 font-semibold flex">
          {props.title}
          <Mic />
        </div>
        <div className="mb-5">
          {props.detail.map((text, index) => (
            <div className="font-thin text-start text-sm" key={index}>
              {text}
            </div>
          ))}
        </div>
        <div className="font-thin text-sm">{props.footer}</div>
      </div>
      <div>
        <ArrowUpRight className="text-white" />
      </div>
    </button>
  )
}
