import PropTypes from 'prop-types'
import Select from 'components/common/select'
import TextField from 'components/common/textfield'
import { useFormContext, Controller } from 'react-hook-form'
import FORM_CONTENT from './const'
import './styles.scss'

function Form({ onSubmit }) {
  const { register, errors } = useFormContext()

  const firstNameRegister = register({
    required: FORM_CONTENT.firstNameRequiredErrorMsg,
    maxLength: {
      value: 32,
      message: FORM_CONTENT.firstNameLengthErrorMsg,
    },
  })

  const lastNameRegister = register({
    required: FORM_CONTENT.lastNameRequiredErrorMsg,
    maxLength: {
      value: 32,
      message: FORM_CONTENT.lastNameLengthErrorMsg,
    },
  })

  return (
    <form onSubmit={onSubmit}>
      <div className="form-wrapper">
        <div className="form-group">
          <TextField
            name="firstName"
            inputRef={firstNameRegister}
            fullWidth
            label={FORM_CONTENT.firstNameLabel}
            error={!!errors?.firstName}
            helperText={errors?.firstName?.message}
          />
        </div>

        <div className="form-group">
          <TextField
            name="lastName"
            inputRef={lastNameRegister}
            fullWidth
            label={FORM_CONTENT.lastNameLabel}
            error={!!errors?.lastName}
            helperText={errors?.lastName?.message}
          />
        </div>

        <div className="form-group">
          <Controller
            name="gender"
            rules={{ required: true }}
            defaultValue=""
            as={
              <Select
                label={FORM_CONTENT.genderLabel}
                fullWidth
                error={!!errors?.gender}
                helperText={
                  errors?.gender && FORM_CONTENT.genderRequiredErrorMsg
                }
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="1">choose 1</option>
                <option value="2">choose 2</option>
              </Select>
            }
          />

          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Form
