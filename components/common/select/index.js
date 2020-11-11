import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../icon'
import ICONS from '../icon/const'
import InputLayout from '../input-layout'
import './styles.scss'
import { SELECT_TYPE_CLASS, SELECT_TYPE } from './const'

/**
 * @description this component can apply any `<select />`'s props
 * @param {string} props.label label of dropdown
 * @param {string} props.helperText the message that show at the bottom of dropdown
 * @param {boolean} props.error flag to show with error appearance
 * @param {boolean} props.fullWidth flag to show select with fullWidth
 * @param {func} props.onChange event callback that will be triggle when the value of select was changed. `(changedValue, event) => void`
 * @param {element} props.children should be `<option />`
 * @param {string} props.type can be set from SELECT_TYPE eg. `standard` `float`
 * @param {string} props.className customize style of component
 * @param {function | Object} props.inputRef input element's ref (can be function or object)
 * @param {boolean} props.disable flag to show with disable appearance
 * @param {function} props.onclick event callback when clicked element
 * @param {boolean} props.preventExpand flag to prevent expand in select
 */
function Select({
  label,
  helperText,
  error,
  children,
  fullWidth,
  inputRef,
  onChange,
  type,
  className,
  disabled,
  onClick,
  preventExpand,
  ...props
}) {
  const selectType = SELECT_TYPE_CLASS[type] || SELECT_TYPE_CLASS.standard
  const classes = classNames(
    'dropdown__container',
    selectType,
    className,
    {
      error,
      disabled,
      'prevent-expand': preventExpand,
    },
  )

  const handleChanged = useCallback(
    (event) => {
      if (onChange) {
        onChange(event, event.target.value)
      }
    },
    [onChange],
  )

  const handleRef = useCallback(
    (ref) => {
      if (typeof inputRef === 'function') {
        inputRef(ref)
        // eslint-disable-next-line no-prototype-builtins
      } else if (inputRef?.hasOwnProperty('current')) {
        // eslint-disable-next-line no-param-reassign
        inputRef.current = ref
      }
    },
    [inputRef],
  )

  return (
    <InputLayout
      label={label}
      fullWidth={fullWidth}
      shrink
      helperText={helperText}
      error={error}
    >
      <div
        data-testid="dropdown-input-container"
        className={classes}
        onClick={onClick}
        role="button"
      >
        <select
          data-testid="dropdown-input"
          className={`dropdown__select${fullWidth ? ' full-width' : ''}`}
          onChange={handleChanged}
          ref={handleRef}
          {...props}
        >
          {children}
        </select>
        <div className="dropdown__icon">
          <Icon src={ICONS.dropdown} disabled={disabled} />
        </div>
      </div>
    </InputLayout>
  )
}

Select.defaultProps = {
  label: undefined,
  helperText: undefined,
  error: false,
  fullWidth: false,
  type: undefined,
  className: undefined,
  inputRef: undefined,
  onChange: undefined,
  onClick: undefined,
  disabled: undefined,
  preventExpand: undefined,
}

Select.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
  children: PropTypes.node.isRequired,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(SELECT_TYPE)),
  className: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.shape({
      current: PropTypes.shape({}),
    }),
    PropTypes.func,
  ]),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  preventExpand: PropTypes.bool,
}

export default Select
