import React, { useEffect } from 'react'

const useScrollToBottom = (
  ref: React.RefObject<HTMLDivElement>,
  observer?: any
) => {
  useEffect(() => {
    if (!ref.current) return
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [ref, observer])
}

export default useScrollToBottom
