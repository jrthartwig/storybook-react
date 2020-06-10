import React from 'react';
import FormField from '../components/FormControls/FormField/FormField';

export default {
    title: 'FormField',
    component: FormField,
    includeStories: []
}

const checkboxOptions = [
    { label: "option 1", value: "1" },
    { label: "option 2", value: "2" },
    { label: "option 3", value: "3" }
]

const validCheck = () => { return false }

export const WithLabel = () => <FormField label="Label"/>

export const WithCharacterLimit = () => <FormField characterLimit={20} /> 

export const WithOptions = () => <FormField label="Select Options" selectOptions={["option 1", "option 2", "and option 3"]}  />

export const WithCheckboxOptions = () => <FormField checkboxOptions={checkboxOptions} value={[1,2,3]} />

export const WithPlaceholderText = () => <FormField placeholder="this is a placeholder" />

export const WithInstructionalText = () => <FormField instructionalText="Here are some instructions" /> 

export const WithAnError = () => <FormField isValid={validCheck} error="This is an error message"/>