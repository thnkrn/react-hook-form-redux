import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import classnames from 'classnames'
import './styles.scss'

/**
 * @param {function} param0.onChange event callback when value inside input was changed
 * @param {element} param0.prefix the adornment that will be show at start of input
 * @param {element} param0.postfix the adornment that will be show at end of input
 * @param {object} param0.inputRef the ref of input element
 * @param {boolean} param0.fullWidth flag to set the component display with full width.
 * @param {boolean} param0.disabled flag to disable input
 * @param {boolean} param0.error flag to set error appearance
 * @param {boolean} param0.hideUnderline flag to show/hide underline
 * @param {number} param0.adornmentWidth set width for prefix area
 */
function InputBase({
  onChange,
  inputRef,
  fullWidth,
  prefix,
  postfix,
  error,
  adornmentWidth,
  hideUnderline,
  ...props
}) {
  const adornmentStyles = useMemo(
    () => ({
      width: adornmentWidth,
    }),
    [adornmentWidth],
  )

  return (
    <div
      data-testid="input-wrapper"
      className={classnames('input__wrapper', {
        'full-width': fullWidth,
        error,
        'hide-underline': hideUnderline,
      })}
    >
      {prefix && (
        <div
          style={adornmentStyles}
          className="input__adornment start"
        >
          {prefix}
        </div>
      )}
      <input
        className="input__input"
        onChange={onChange}
        ref={inputRef}
        {...props}
      />
      {postfix && (
        <div
          style={adornmentStyles}
          className="input__adornment end"
        >
          {postfix}
        </div>
      )}
    </div>
  )
}

InputBase.defaultProps = {
  onChange: undefined,
  prefix: undefined,
  postfix: undefined,
  inputRef: undefined,
  fullWidth: false,
  error: false,
  hideUnderline: false,
  adornmentWidth: undefined,
}

InputBase.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.shape({
      current: PropTypes.shape({}),
    }),
    PropTypes.func,
  ]),
  fullWidth: PropTypes.bool,
  hideUnderline: PropTypes.bool,
  prefix: PropTypes.element,
  postfix: PropTypes.element,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  adornmentWidth: PropTypes.number,
}

export default React.memo(InputBase)
