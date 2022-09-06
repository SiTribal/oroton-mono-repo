import { useEffect, useRef } from 'react'
import s from './BoardSizePicker.module.css'


interface iProp {
  boardSizeCallback?: (boardSize: number) => void
  boardSize?: number
}

const BoardSizePicker: React.FC<iProp> = ({ boardSizeCallback, boardSize = 0 }: iProp) => {

  const boardSizeRef = useRef<Array<HTMLLIElement | null | undefined>>([])

  const handleChange = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const { value } = e.currentTarget
    if (boardSizeCallback) {
      boardSizeCallback(parseInt(value))
      boardSizeRef.current.forEach(el => {
        if ((el?.value) === parseInt(value)) {
          el.classList.add(s.active)
        }else{
          el?.classList.remove(s.active)
        }
      })
    }
  }

  useEffect(() => {
    boardSizeRef.current.forEach(el => {
      if ((el?.value) === boardSize) {
        el?.classList.add(s.active)
      }else{
        el?.classList.remove(s.active)
      }
    })
  }, [boardSize])

  return (
    <div className={s.container}>
        <h3>Board Size</h3>
        <div>
          {Array(15)
            .fill('_')
            .map((size, i) => (
              <li
              key={i}
                onMouseEnter={e =>
                  handleChange(
                    (e as unknown) as React.MouseEvent<
                      HTMLInputElement,
                      MouseEvent
                    >
                  )
                }
                ref={el => (boardSizeRef.current[i] = el)}
                value={i + 1}
                className={s.hover}
              >
                {i + 1}
              </li>
            ))}
        </div>
      </div>
  )
}

export default BoardSizePicker
