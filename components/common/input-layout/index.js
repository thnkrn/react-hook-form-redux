import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './styles.scss'

/**
 *
 * @param {string} param0.className classname of the top most wrapper element.
 * @param {boolean} param0.error flag to display error apearrance
 * @param {Element} param0.helperText the text that show below input
 * @param {string} param0.label textfield's label
 * @param {boolean} param0.shrink flag to set label to be alway on the top of input
 * @param {boolean} param0.fullWidth flag to set the component display with full width.
 * @param {Element} param0.children the component that to be wrap with this layout
 * @param {boolean} param0.shiftLabelLeft add padding to leftside of layout
 */
function InputLayout({
  children,
  className,
  error,
  fullWidth,
  helperText,
  label,
  shiftLabelLeft,
  shiftWidth,
  shrink,
}) {
  return (
    <div
      className={classnames(
        'input-layout__container',
        { 'full-width': fullWidth },
        className,
      )}
    >
      <div className="input-layout__input-wrapper">
        {children}
        {!!label && (
          <label
            htmlFor={label}
            className={classnames(
              'input-layout__label',
              {
                float: shrink,
                error,
              },
            )}
            style={shiftLabelLeft && !shrink ? { left: shiftWidth } : undefined}
          >
            {label}
          </label>
        )}
      </div>
      {/* Add the optional to reserve space for the default error message. */}
      {helperText && (
        <div
          className={`input-layout__helper-text${error ? ' error' : ''}`}
        >
          <span>{helperText}</span>
        </div>
      )}
    </div>
  )
}

InputLayout.defaultProps = {
  className: undefined,
  error: false,
  fullWidth: false,
  helperText: undefined,
  label: '',
  shiftLabelLeft: false,
  shiftWidth: 24,
  shrink: false,
}

InputLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.node,
  label: PropTypes.string,
  shiftLabelLeft: PropTypes.bool,
  shiftWidth: PropTypes.number,
  shrink: PropTypes.bool,
}

export default InputLayout
