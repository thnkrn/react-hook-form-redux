import PropTypes from 'prop-types'
import React, { useCallback, useMemo, useState } from 'react'
import InputBase from '../input-base'
import InputLayout from '../input-layout'
import Textarea from '../textarea'

// Source: https://emailregex.com/
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const NUMBER_ONLY_REGEX = /^[0-9]*$/

/**
 * @param {string} param0.className classname of the top most wrapper element.
 * @param {function | Object} param0.inputRef input element's ref ( can be function or object)
 * @param {boolean} param0.fullWidth flag to set the component display with full width.
 * @param {function} param0.onChange event callback when value inside textfield was changed
 * @param {string} param0.name input's name
 * @param {string} param0.type input's type
 * @param {string} param0.label textfield's label
 * @param {Element} param0.helperText the text that show below input
 * @param {string | number} param0.value value of textfield
 * @param {string | number} param0.defaultValue intial value of textfield
 * @param {boolean} param0.error flag to display error apearrance
 * @param {boolean} param0.disabled flag to disable textfield
 * @param {element} param0.prefix the adornment that will be show at start of input
 * @param {element} param0.postfix the adornment that will be show at end of input
 * @param {Object} param0.inputProps props of input inside textfield
 * @param {boolean} param0.shrink flag to set label to be alway on the top of input
 * @param {string} param0.placeholder input's placeholder
 * @param {number} param0.adornmentWidth width of prefix/postfix
 * @param {number} param0.minRows number of minimun row (only for multiline)
 * @param {number} props.maxRows number of max rows (only for multiline)
 * @param {number} param0.minCols number of minimun column (only for multiline)
 * @param {boolean} param0.multiline number of minimun row (only for multiline)
 * @param {number} param0.maxLength max light of text inside of input (only for multiline)
 */
function TextField({
  adornmentWidth,
  className,
  defaultValue,
  disabled,
  error,
  fullWidth,
  helperText,
  inputProps,
  inputRef,
  label,
  maxLength,
  minCols,
  minRows,
  maxRows,
  multiline,
  name,
  onChange,
  placeholder,
  postfix,
  prefix,
  shrink,
  type,
  hideUnderline,
  value,
}) {
  // ? Use useState instead of useRef to trigger re-render when values changed.
  const [inputBaseRef, setInputBaseRef] = useState()
  const [isFocus, setIsFocus] = useState(false)

  const handleRef = useCallback(
    (ref) => {
      setInputBaseRef(ref)
      if (typeof inputRef === 'function') {
        inputRef(ref)
        // eslint-disable-next-line no-prototype-builtins
      } else if (inputRef?.current) {
        // eslint-disable-next-line no-param-reassign
        inputRef.current = ref
      }
    },
    [inputRef],
  )

  const isFloatLabel = useMemo(() => {
    if (shrink) {
      return true
    }

    if (label && placeholder) {
      return true
    }

    if (defaultValue || value) {
      return true
    }

    const ref = inputBaseRef
    if (ref) {
      return isFocus || !!ref.value
    }

    return false
  }, [inputBaseRef, isFocus, label, defaultValue, shrink, placeholder, value])

  return (
    <InputLayout
      className={className}
      error={error}
      fullWidth={fullWidth}
      helperText={helperText}
      label={label}
      shiftLabelLeft={!!prefix}
      shiftWidth={adornmentWidth}
      shrink={shrink || isFloatLabel}
    >
      {multiline ? (
        <Textarea
          textareaRef={handleRef}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={onChange}
          fullWidth={fullWidth}
          defaultValue={defaultValue}
          value={value}
          name={name}
          error={error}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          minRows={minRows}
          maxRows={maxRows}
          minCols={minCols}
          {...inputProps}
        />
      ) : (
        <InputBase
          inputRef={handleRef}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={onChange}
          fullWidth={fullWidth}
          defaultValue={defaultValue}
          value={value}
          type={type}
          name={name}
          hideUnderline={hideUnderline}
          adornmentWidth={adornmentWidth}
          error={error}
          disabled={disabled}
          placeholder={placeholder}
          postfix={postfix}
          maxLength={maxLength}
          prefix={prefix}
          {...inputProps}
        />
      )}
    </InputLayout>
  )
}

TextField.defaultProps = {
  adornmentWidth: undefined,
  className: undefined,
  defaultValue: undefined,
  disabled: false,
  error: false,
  fullWidth: false,
  helperText: undefined,
  inputProps: undefined,
  inputRef: undefined,
  label: '',
  maxLength: undefined,
  minCols: undefined,
  minRows: undefined,
  maxRows: undefined,
  multiline: false,
  hideUnderline: false,
  name: '',
  onChange: undefined,
  placeholder: undefined,
  postfix: undefined,
  prefix: undefined,
  shrink: false,
  type: undefined,
  value: undefined,
}

TextField.propTypes = {
  adornmentWidth: PropTypes.number,
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.node,
  inputProps: PropTypes.shape({}),
  inputRef: PropTypes.oneOfType([
    PropTypes.shape({
      current: PropTypes.shape({}),
    }),
    PropTypes.func,
  ]),
  label: PropTypes.string,
  maxLength: PropTypes.number,
  minCols: PropTypes.number,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  multiline: PropTypes.bool,
  hideUnderline: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  postfix: PropTypes.element,
  prefix: PropTypes.element,
  shrink: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default TextField
