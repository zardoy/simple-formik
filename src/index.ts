import React, { useCallback } from "react"

type UV = Record<string, string>

type HandleOptions = {}

type Options<T extends UV> = {
    initialValues: T
    onSubmit: (values: T) => void
    /** All fields are required, if some of them isn't filled, `disableSubmitButton` will be `false` */
    allRequired: true
}

type Return<T extends UV> = Readonly<{
    handleForm: Pick<React.ComponentProps<"form">, "onSubmit">
    handleInput: (name: keyof T, options?: HandleOptions) => Pick<React.ComponentProps<"input">, "value" | "onChange">
    values: T
    setValue: <K extends keyof T>(name: K, value: T[K]) => void
    handleButton: { type: "submit", disabled: boolean }
}>

export const useSimpleFormik = <T extends UV>({ initialValues, onSubmit }: Options<T>): Return<T> => {
    const [values, setValues] = React.useState(initialValues)

    const updateValue = useCallback((name: string, value: string) =>
        setValues(val => ({ ...val, [name]: value })), [])

    return {
        handleForm: {
            onSubmit(e) {
                e.preventDefault()
                onSubmit(values)
            }
        },
        handleInput(name) {
            return {
                value: values[name],
                //@ts-ignore
                onChange: e => updateValue(name, e.target.value)
            }
        },
        values,
        setValue(name, value) {
            //@ts-expect-error what? symbol?
            updateValue(name, value)
        },
        handleButton: {
            type: "submit",
            disabled: Object.entries(values).some(([, val]) => !val)
        }
    }
}