"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSimpleFormik = void 0;
const react_1 = __importStar(require("react"));
const useSimpleFormik = ({ initialValues, onSubmit }) => {
    const [values, setValues] = react_1.default.useState(initialValues);
    const updateValue = react_1.useCallback((name, value) => setValues(val => ({ ...val, [name]: value })), []);
    return {
        handleSubmit(e) {
            e.preventDefault();
            onSubmit(values);
        },
        handleInput: new Proxy({}, {
            get(_t, name) {
                return () => ({
                    value: values[name],
                    onChange: e => updateValue(name, e.target.value)
                });
            }
        }),
        values,
        setValue(name, value) {
            //@ts-ignore
            updateValue(name, value);
        },
        disableSubmitButton: Object.entries(values).some(([, val]) => !val)
    };
};
exports.useSimpleFormik = useSimpleFormik;