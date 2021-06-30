import React from "react";
declare type UV = Record<string, string>;
declare type HandleOptions = {};
declare type Options<T extends UV> = {
    initialValues: T;
    onSubmit: (values: T) => void;
    /** All fields are required, if some of them isn't filled, `disableSubmitButton` will be `false` */
    allRequired: true;
};
declare type Return<T extends UV> = Readonly<{
    handleSubmit: Exclude<React.ComponentProps<"form">["onSubmit"], undefined>;
    handleInput: (name: keyof T, options?: HandleOptions) => Pick<React.ComponentProps<"input">, "value" | "onChange">;
    values: T;
    setValue: <K extends keyof T>(name: K, value: T[K]) => void;
    submitButtonDisabled: boolean;
}>;
export declare const useSimpleFormik: <T extends UV>({ initialValues, onSubmit }: Options<T>) => Readonly<{
    handleSubmit: Exclude<React.ComponentProps<"form">["onSubmit"], undefined>;
    handleInput: (name: keyof T, options?: HandleOptions | undefined) => Pick<React.ComponentProps<"input">, "value" | "onChange">;
    values: T;
    setValue: <K extends keyof T>(name: K, value: T[K]) => void;
    submitButtonDisabled: boolean;
}>;
export {};
