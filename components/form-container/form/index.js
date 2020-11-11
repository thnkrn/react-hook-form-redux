import TextField from '../../common/textfield'
import { SELECT_TYPE } from '../../common/select/const'
import Select from '../../common/select'
import './styles.scss'

export default function Form() {
  return (
    <div className="form-wrapper">
      <div className="form-group">
        <TextField fullWidth label="1234" />
      </div>

      <div className="form-group">
        <Select label="1234" fullWidth type={SELECT_TYPE.float}>
          <option>choose 1</option>
          <option>choose 2</option>
        </Select>
      </div>
    </div>
  )
}
