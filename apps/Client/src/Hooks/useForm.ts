import { useState } from "react";

/**
 * Custom hook for managing form state and validation
 * @param {Object} initialState - Initial state of the form
 * @returns {Object} - Form utilities including:
 *   - state: Current form state
 *   - ChangeState: Handler for input changes with validation
 *   - SetState: Function to manually update form state
 *   - ErrorsState: Current validation errors
 *   - setErrors: Function to manually set errors
 */
export const useForm = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const [ErrorsState, setErrorsState] = useState(initialState);

  const SetState = (NewState: unknown) => {
    setState(NewState);
  };

  const ChangeState = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (value === "")
      setErrorsState({
        ...ErrorsState,
        [name]: `${name.toUpperCase()} is required`,
      });
    else setErrorsState({ ...ErrorsState, [name]: null });

    setState({ ...state, [name]: value });
  };

  const setErrors = (ErrorState: any) => {
    setErrorsState(ErrorState);
  };

  return { state, ChangeState, SetState, ErrorsState, setErrors };
};
