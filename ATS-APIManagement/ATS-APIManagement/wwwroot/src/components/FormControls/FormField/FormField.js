import React from 'react';
import './form-field.scss';
import util from '../../../util';

export default class FormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { fieldValue: null, isError: false };
    }

    componentDidMount() {
        const { value } = this.props;

        this.setState({ fieldValue: value })
        !this.valueIsValid(value) && this.displayError();
        
    }

    handleChange = (e) => {
        const {
            isChecked,
            addValue,
            removeValue,
            displayError,
            clearError,
            underCharacterLimit,
            valueIsValid,
            handleStateChange } = this;

        const { checkboxOptions } = this.props
        let value = e.target.value;

        clearError();

        if (checkboxOptions) {
            value = isChecked(value) ? removeValue(value) : addValue(value);
        }

        if (!underCharacterLimit(value))
            return;


        handleStateChange(value)
        !valueIsValid(value) && displayError();
    }

    addValue = (value) => {
        let _fieldValue = this.state.fieldValue;
        _fieldValue.push(value);

        return _fieldValue;
    }

    removeValue = (value) => {
        let _fieldValue = this.state.fieldValue;

        _fieldValue.splice(_fieldValue.indexOf(value), 1);
        return _fieldValue;
    }

    handleStateChange = (value) => {
        this.setState({ fieldValue: value }, () => { util.callFunction(this.props, "onChange", value); });
    }

    underCharacterLimit = (value) => {
        const { characterLimit } = this.props;
        return !characterLimit || value.length <= characterLimit
    }

    valueIsValid = (value) => {
        const { isValid } = this.props;
        return !isValid || util.callFunction(this.props, "isValid", value);
    }

    clearError = () => {
        this.setState({ isError: false })
    }

    displayError = () => {
        this.setState({ isError: true })
    }

    isChecked = (checkValue) => {
        const { fieldValue } = this.state;
        return !!fieldValue && !!fieldValue.includes(checkValue);
    }

    isDate = () => {
        // bring these back if a date picker is needed

        // const { value } = this.props;
        // let _value = value || "";
        // return !isNaN(new Date(_value).getTime());

        return false;
    }

    render() {
        const { isError, fieldValue } = this.state;
        const { handleChange, isChecked, isDate } = this;
        const {
            label,
            className,
            error,
            instructionalText,
            placeholder,
            characterLimit,
            selectOptions,
            checkboxOptions,
        } = this.props;

        return (
            <div className={`form-field ${className ? className : ""}`}>
                {
                    characterLimit &&
                    <span className="character-limit">{fieldValue ? fieldValue.length : 0}/{characterLimit}</span>
                }

                {
                    label &&
                    <label>{label}</label>
                }

                {
                    !selectOptions && !checkboxOptions && !isDate() &&
                    <input type="text" value={fieldValue || ""} onChange={handleChange} placeholder={placeholder || ""} />
                }
                {
                    !selectOptions && !checkboxOptions && isDate() &&
                    <input type="date" value={fieldValue || ""} onChange={handleChange} />
                }
                {
                    selectOptions &&
                    <select value={fieldValue || ""} onChange={handleChange} >
                        {
                            placeholder &&
                            <option value="">{placeholder}</option>
                        }
                        {
                            selectOptions.map((item, key) =>
                                <option value={item} key={key}>{item}</option>
                            )
                        }
                    </select>
                }

                {
                    checkboxOptions &&
                    <fieldset>
                        <ul>
                            {
                                checkboxOptions.map((item, key) =>
                                    <li key={key}>
                                        <label className={isChecked(item.value) ? "selected" : ""}>
                                            <input type="checkbox" value={item.value} checked={isChecked(item.value)} onChange={handleChange} />
                                            {item.label}
                                        </label>
                                    </li>
                                )
                            }
                        </ul>
                    </fieldset>
                }

                {
                    instructionalText &&
                    <span className="instructional-text">{instructionalText}</span>
                }

                {
                    isError &&
                    <span className="error">{error || "value is invalid"}</span>
                }
            </div>
        )
    }
}