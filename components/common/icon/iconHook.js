import useIntersection from '../../custom-hooks/useIntersection'
import classNames from 'classnames'
import { useRef, useState, useEffect } from 'react'
import { ICON_SIZE, ICON_SIZE_CLASSES } from './const'

const useIconElement = ({
  className,
  lazyThreshold,
  size,
  disabled,
  onLoadCallback,
  onClick,
}) => {
  const refImgWrapper = useRef()
  const refImg = useRef()
  const [isShowImage, setIsShowImage] = useState(lazyThreshold === 0)
  const isIntersecting = useIntersection(refImgWrapper, {
    threshold: lazyThreshold,
  })
  const iconSize = ICON_SIZE[size]
  const classes = classNames('pomelo-icon', className, {
    [ICON_SIZE_CLASSES[iconSize]]: iconSize,
    'pomelo-icon-clickable': onClick,
    disabled,
  })

  const onLoad = () => {
    if (onLoadCallback) {
      onLoadCallback()
    }
  }

  useEffect(() => {
    if (lazyThreshold > 0) {
      setIsShowImage(isIntersecting)
    }
  }, [isIntersecting, lazyThreshold])

  return {
    classes,
    refImgWrapper,
    refImg,
    isShowImage,
    onLoad,
  }
}

export { useIconElement }
