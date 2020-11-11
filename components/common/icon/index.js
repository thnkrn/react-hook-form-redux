import React from 'react'
import PropTypes, { string } from 'prop-types'
import Placeholder from '../../images/placeholder'
import './styles.scss'
import { useIconElement } from './IconHook'
import { ICON_SIZE } from './const'

/**
 * **Tips**
 * When adding new icon, should use
 * https://jakearchibald.github.io/svgomg/ to minify them first.
 */
/**
 * @param {string|string[]} param0.className custom style for this component\
 * @param {string} param0.src svg path (local/CDN)
 * @param {string} param0.alt icon text
 * @param {number} param0.lazyThreshold config for lazy loading between 0.0 to 1.0 (0 = not use lazy load)
 * @param {string} param0.size can be set to `small`(16x16px) `medium`(24x24px) `large`(32x32px) `jumbo`(48x48px)
 * @param {boolean} param0.disabled flag to disable icon
 * @param {function} param0.onLoadCallback action after image loaded
 * @param {function} param0.onClick Set the handler to handle `click` event
 */
function Icon({
  className,
  src,
  alt,
  lazyThreshold,
  size,
  disabled,
  onLoadCallback,
  onClick,
}) {
  const {
    classes,
    refImgWrapper,
    refImg,
    isShowImage,
    onLoad,
  } = useIconElement({
    className,
    lazyThreshold,
    size,
    disabled,
    onLoadCallback,
    onClick,
  })

  return (
    <span
      className={classes}
      ref={refImgWrapper}
      onClick={onClick}
      role="presentation"
    >
      {isShowImage ? (
        <img
          ref={refImg}
          src={src}
          alt={alt}
          className="icon-img"
          onLoad={onLoad}
        />
      ) : (
        <Placeholder imgRatio={1.2} />
      )}
    </span>
  )
}

Icon.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(string)]),
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  lazyThreshold: PropTypes.number,
  size: PropTypes.oneOf(Object.values(ICON_SIZE)),
  disabled: PropTypes.bool,
  onLoadCallback: PropTypes.func,
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  alt: '',
  lazyThreshold: 0,
  className: '',
  size: undefined,
  disabled: undefined,
  onLoadCallback: undefined,
  onClick: undefined,
}

export default Icon
