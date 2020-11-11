import React from 'react'
import PropTypes from 'prop-types'

function ImagePlaceholder({ isStatic, imgRatio }) {
  return (
    <div
      className="image-placeholder"
      style={{ paddingTop: `${imgRatio * 100}%` }}
    >
      <svg
        className={`image-placeholder__logo${isStatic ? ' is-static' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.397 18.1002c.963.962 2.242 1.491 3.603 1.491 1.361 0 2.64-.529 3.602-1.491l.603-.603-1.801-1.802-.603.603c-.963.964-2.64.962-3.602 0l-5.404-5.403c-.481-.481-.746-1.12-.746-1.801 0-.681.265-1.32.746-1.801.962-.963 2.64-.963 3.603 0l.603.603 1.8-1.802-.602-.603c-.962-.962-2.241-1.491-3.602-1.491-1.361 0-2.64.529-3.602 1.491-.963.962-1.493 2.243-1.493 3.603 0 1.361.53 2.64 1.493 3.602l5.402 5.404zm10.2053-6.603l1.8 1.802.604-.603c.961-.962 1.492-2.241 1.492-3.602 0-1.36-.531-2.641-1.492-3.603-.962-.962-2.242-1.491-3.603-1.491-1.361 0-2.64.529-3.602 1.491l-6.006 6.006 1.8 1.802 6.007-6.006c.962-.963 2.64-.963 3.603 0 .48.481.746 1.12.746 1.801 0 .681-.266 1.32-.746 1.801l-.603.602zM2.8008 20.0941l-1.801-1.801 2.597-2.597 1.801 1.801-2.597 2.597zm10.3984-8.001l8 8.001 1.801-1.801-8.001-8.001-1.8 1.801z"
          fill="#000"
        />
      </svg>
    </div>
  )
}

ImagePlaceholder.defaultProps = {
  isStatic: false,
  imgRatio: 1,
}

ImagePlaceholder.propTypes = {
  isStatic: PropTypes.bool,
  imgRatio: PropTypes.number,
}

export default ImagePlaceholder
