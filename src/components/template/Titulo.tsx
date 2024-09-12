import { type ElementType } from 'react'
// import NavConfig from '../NavConfig'

export interface TituloProps {
  principal: string
  secundario: string
  icone?: ElementType
  style?: React.CSSProperties
  className?: string
}
function Titulo(props: TituloProps) {
  return (
    <div
      className={`flex gap-4 pb-4 pt-4 mb-6 justify-between border-b-2 border-gray-300 ${props.className}`}
      style={props.style}
    >
      <div className="flex gap-4">
        {props.icone ? <props.icone size={50} stroke={1} /> : ''}
        <div>
          <h1 className="text-3xl font-bold">{props.principal}</h1>{' '}
          <h2 className="text-gray-500">{props.secundario}</h2>
        </div>
      </div>
    </div>
  )
}

export default Titulo
