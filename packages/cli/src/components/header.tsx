import { useEffect, useRef, useState } from 'react'

type HeaderProps = {
  status: number
  remaining: number
  total: number
}

export default function Header({ status, remaining, total }: HeaderProps) {
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [duration, setDuration] = useState<number>(0)
  const intervalRef = useRef<number>(undefined)

  useEffect(() => {
    if (status === 0) {
      setStartTime(Date.now())
    }
  }, [status])

  useEffect(() => {
    const calcDuration = () => {
      setDuration(Math.floor((Date.now() - startTime) / 1000))
    }

    if (status == 0) {
      intervalRef.current = setInterval(calcDuration, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [startTime, status])

  return (
    <div className="flex justify-between w-full">
      <div>
        {remaining} / {total}
      </div>
      <div>{duration} s</div>
    </div>
  )
}
