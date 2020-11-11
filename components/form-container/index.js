import { FormContext, useForm } from 'react-hook-form'
import Form from './form'

function FormContainer() {
  const methods = useForm()
  const { handleSubmit } = methods

  const onSubmit = (data) => {
    console.log(data, 'data')
  }

  return (
    <FormContext {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} />
    </FormContext>
  )
}

export default FormContainer
