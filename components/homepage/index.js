import './styles.scss'
import TextField from '../common/textfield'
import { SELECT_TYPE } from '../common/select/const'
import Select from '../common/select'

export default function Homepage() {
  return (
    <div>
      <TextField
        fullWidth
        label="1234"
      />
      <Select
        fullWidth
        type={SELECT_TYPE.float}
      >
        <option>
          choose 1
        </option>
        <option>
          choose 2
        </option>
      </Select>
    </div>
  )
}
