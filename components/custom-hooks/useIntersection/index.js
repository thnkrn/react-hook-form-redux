import { useRef, useState, useEffect } from 'react'
import shallowEqual from 'shallowequal'

function useIntersection(
  ref,
  { root = null, rootMargin = '0px', threshold = 0.5, once = true },
) {
  const [isIntersecting, setIntersecting] = useState(false)
  const opts = { root, rootMargin, threshold }
  const optionsRef = useRef(opts)

  // create a static reference object from IntersectionObserver options
  // to avoid re-rendering multiple times
  // because element ref if it's getting re-rendered, it will be new reference
  // that means it will do useEffect() again
  // const a = { x: '1' }
  // const b = { x: '1' }
  // a == b --> false | shallowEqual(a, b) --> true
  useEffect(() => {
    if (!shallowEqual(optionsRef.current, opts)) {
      optionsRef.current = opts
    }
  })

  useEffect(() => {
    if (ref.current === null) {
      return
    }

    let observer

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIntersecting(entry.isIntersecting)

          if (once && entry.isIntersecting && ref.current !== null) {
            observer.unobserve(ref.current)
          }
        },
        {
          ...optionsRef.current,
          root:
            optionsRef.current.root !== null
              ? optionsRef.current.root.current
              : null,
        },
      )

      observer.observe(ref.current)
    } else {
      // to support iOS 11
      setIntersecting(true)
    }

    return () => {
      if ('IntersectionObserver' in window) {
        if (observer && !once && ref.current !== null) {
          observer.unobserve(ref.current)
        }
      }
    }
  }, [optionsRef.current])

  return isIntersecting
}

export default useIntersection
