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
    handleSubmit: Exclude<React.ComponentProps<"form">["onSubmit"], undefined>
    handleInput: Record<keyof T, (options: HandleOptions) => Pick<React.ComponentProps<"input">, "value" | "onChange">>
    values: T
    setValue: <K extends keyof T>(name: K, value: T[K]) => void
    disableSubmitButton: boolean
}>

export const useSimpleFormik = <T extends UV>({ initialValues, onSubmit }: Options<T>): Return<T> => {
    const [values, setValues] = React.useState(initialValues)

    const updateValue = useCallback((name: string, value: string) =>
        setValues(val => ({ ...val, [name]: value })), [])

    return {
        handleSubmit(e) {
            e.preventDefault()
            onSubmit(values)
        },
        handleInput: new Proxy({} as Return<T>["handleInput"], {
            get(_t, name: string): Return<Record<string, string>>["handleInput"][string] {
                return () => ({
                    value: values[name],
                    onChange: e => updateValue(name, e.target.value)
                })
            }
        }),
        values,
        setValue(name, value) {
            //@ts-ignore
            updateValue(name, value)
        },
        disableSubmitButton: Object.entries(values).some(([, val]) => !val)
    }
}