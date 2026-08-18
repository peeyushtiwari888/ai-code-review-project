import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    update()

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    mql.addEventListener("change", onChange)
    window.addEventListener("resize", update)

    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", update)
    }
  }, [])

  return isMobile
}
