import React, { ReactElement } from 'react';
import './style.css';

interface FormInputProps extends React.HTMLProps<HTMLInputElement> {
    label: string;
    labelClassName?: string;
    isToggle?: boolean;
    setValue(name: string, value: string | boolean): void;
    errorMessage?: string;
}

const FormInput = (props: FormInputProps): ReactElement<HTMLDivElement> => {
    const {
        label: name,
        labelClassName = '',
        setValue,
        errorMessage = '',
        type = 'text',
        value = '',
        disabled = false,
        isToggle = false,
    } = {
        ...props,
    };

    const prepareLabel = (name: string): string => {
        return name
            .split(/([A-Z][a-z]+)/)
            .filter((v) => v)
            .join(' ')
            .toLowerCase();
    };

    const labelStyle = disabled ? 'is-disabled' + labelClassName : labelClassName;

    const handleInput = (event) => {
        setValue(name, event.target.value);
    };

    const handleToggle = () => {
        setValue(name, !value);
    };

    const inputAttributes = {
        name,
        type,
        value,
        disabled,
    };

    if (props.onFocus !== undefined) {
        inputAttributes['onFocus'] = props.onFocus;
    }

    if (type === 'checkbox') {
        inputAttributes['checked'] = value;
    }

    return (
        <div className={`form-input-wrapper ${isToggle ? 'toggle-wrapper' : ''}`}>
            <label className={labelStyle}>{prepareLabel(name)}</label>
            <input onChange={handleInput} {...inputAttributes} data-testid={`${name}-input`} />
            {Boolean(errorMessage) && (
                <div className="input-error" data-testid={`${name}-input-error`}>
                    {errorMessage}
                </div>
            )}
            {isToggle && (
                <div className="toggle">
                    <span onClick={handleToggle}></span>
                </div>
            )}
        </div>
    );
};

export default FormInput;
