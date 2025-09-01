import { useReducer } from "react";

type FormState<T> = {
    values: T;
    errors: Partial<Record<keyof T, string[]>>;
};

type Action<T> =
    | { type: "CHANGE"; field: keyof T; value: any }
    | { type: "ERROR"; field: keyof T; errors: string[] }
    | { type: "RESET"; initialState: FormState<T> };

function formReducer<T>(state: FormState<T>, action: Action<T>): FormState<T> {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                values: { ...state.values, [action.field]: action.value },
                errors: { ...state.errors, [action.field]: [] }, // clear errors on change
            };
        case "ERROR":
            return {
                ...state,
                errors: { ...state.errors, [action.field]: action.errors },
            };
        case "RESET":
            return action.initialState;
        default:
            return state;
    }
}

export default function useFormReducer<T extends Record<string, any>>(
    initialValues: T,
    validate?: (values: T) => Partial<Record<keyof T, string[]>>,
) {
    const [state, dispatch] = useReducer(formReducer<T>, {
        values: initialValues,
        errors: {},
    });

    const action = (field: keyof T, value: any) => {
        dispatch({ type: "CHANGE", field, value });
    };

    const setErrors = (field: keyof T, errors: string[]) => {
        dispatch({ type: "ERROR", field, errors });
    };

    const resetForm = () => {
        dispatch({
            type: "RESET",
            initialState: { values: initialValues, errors: {} },
        });
    };

    const validateForm = (): boolean => {
        if (!validate) return true;
        const validationErrors = validate(state.values);
        Object.entries(validationErrors).forEach(([field, errors]) => {
            if (errors?.length) {
                dispatch({ type: "ERROR", field: field as keyof T, errors });
            }
        });
        return Object.keys(validationErrors).length === 0;
    };

    return { state, action, setErrors, resetForm, validateForm };
}
