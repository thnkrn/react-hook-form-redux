import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback } from 'react'

import './styles.scss'

const FONT_LINE_HEIGHT = 22

/**
 * @param {number} props.minRows number of minimum rows
 * @param {number} props.maxRows number of max rows
 * @param {number} props.minCols number of minimum column
 * @param {boolean} props.fullWidth flag to show textarea with fullWidth
 * @param {number} props.maxLength lenght of text inside of textarea
 * @param {boolean} props.error flag to show textarea with error appearance
 * @param {func} props.onChange event callback that triggler when value of textarea was changed
 * @param {string} props.value value of textarea
 */

function Textarea(props) {
  const {
    fullWidth,
    minRows,
    minCols,
    maxLength,
    error,
    textareaRef,
    onChange,
    value,
    maxRows,
    ...otherProps
  } = props

  const [textAreaBaseRef, setTextAreaBaseRef] = useState(textareaRef)

  const [baseScrollHeight, setBaseScrollHeight] = useState()
  const [isShowScrollbar, setIsShowScrollbar] = useState(false)

  const handleRef = useCallback(
    (ref) => {
      setTextAreaBaseRef(ref)
      if (typeof textareaRef === 'function') {
        textareaRef(ref)
      } else if (textareaRef?.current) {
        textareaRef.current = ref
      }
    },
    [textareaRef, setTextAreaBaseRef],
  )

  const detectScrollSize = useCallback(() => {
    if (textAreaBaseRef && baseScrollHeight) {
      textAreaBaseRef.rows = minRows

      const lineDiff = Math.ceil(
        (textAreaBaseRef?.scrollHeight - baseScrollHeight) / FONT_LINE_HEIGHT,
      )

      const calculatedRows = Math.max(minRows + lineDiff, minRows)

      const isMaxRowEmpty = maxRows === null || maxRows === undefined

      setIsShowScrollbar(!isMaxRowEmpty && calculatedRows > maxRows)

      textAreaBaseRef.rows = maxRows
        ? Math.min(calculatedRows, maxRows)
        : calculatedRows
    }
  }, [minRows, maxRows, textAreaBaseRef, baseScrollHeight])

  const handleOnChange = useCallback(
    (e) => {
      detectScrollSize()
      if (onChange) {
        onChange(e)
      }
    },
    [detectScrollSize, onChange],
  )

  useEffect(() => {
    const handleResize = () => {
      detectScrollSize()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [detectScrollSize])

  useEffect(() => {
    detectScrollSize()
  }, [detectScrollSize])

  useEffect(() => {
    // Incase of minRows less than 1
    const initialRow = Math.min(minRows, 1)

    if (textAreaBaseRef?.rows && !!initialRow) {
      textAreaBaseRef.rows = initialRow
    }
    setBaseScrollHeight(textAreaBaseRef?.scrollHeight)
  }, [baseScrollHeight, textAreaBaseRef, minRows])

  return (
    <div
      className={classnames('textarea__container', {
        'full-width': fullWidth,
        error,
      })}
    >
      <textarea
        onChange={handleOnChange}
        className={classnames('textarea__input', {
          'full-width': fullWidth,
          'show-scroll': isShowScrollbar,
        })}
        cols={minCols}
        maxLength={maxLength}
        ref={handleRef}
        value={value}
        {...otherProps}
      />
    </div>
  )
}

Textarea.defaultProps = {
  minRows: 2,
  maxRows: undefined,
  minCols: undefined,
  fullWidth: undefined,
  maxLength: undefined,
  value: undefined,
  onChange: undefined,
  textareaRef: undefined,
  error: false,
}

Textarea.propTypes = {
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  minCols: PropTypes.number,
  fullWidth: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  textareaRef: PropTypes.oneOfType([
    PropTypes.shape({
      current: PropTypes.shape({}),
    }),
    PropTypes.func,
  ]),
}

export default Textarea
