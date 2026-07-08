import { type ControllerProps, type FieldPath, type FieldValues, Controller, FormProvider } from "react-hook-form"

const Form = FormProvider

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return <Controller {...props} />
}

export { Form, FormField }
