import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export const useAxios = (Params: AxiosRequestConfig) => {
  const [loading, setLoading] = useState(false);
  const [FetchData, setFetchData] = useState<any>(null);
  const [Err, setErr] = useState<string | null>(null);
  const [Alert, setAlert] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      console.log("Call API");

      try {
        setLoading(true);
        const { data }: any = await axios.request(Params);
        setFetchData(data);
        if (data.msg) setAlert(data.msg);
        setErr(null);
      } catch (error) {
        let ErrorMessage = "Server Error Try Again Later";
        if (error instanceof Error) {
          ErrorMessage = error.message;
        }
        setErr(ErrorMessage);
        setFetchData(null);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setAlert("");
        }, 5000);
      }
    };
    if (Params) fetchData();
    return () => {
      setLoading(false);
      setFetchData(null);
      setErr(null);
      setAlert("");
    };
  }, [Params]);
  return { loading, FetchData, Err, Alert };
};

export const useFetch = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [FetchData, setFetchData] = useState<any>(null);
  const [Err, setErr] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data }: any = await axios.get(url);

        setFetchData(data);
        setErr(null);
      } catch (error: any) {
        let ErrorMessage = "Server Error Try Again Later";
        if (error instanceof Error) {
          ErrorMessage = error.message;
        }
        if (error.response && error.response.data?.msg) {
          ErrorMessage = error.response.data.msg;
        }
        setErr(ErrorMessage);
        setFetchData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      setLoading(false);
      setFetchData(null);
      setErr(null);
    };
  }, [url]);
  return [FetchData, Err, loading];
};

export const useForm = (
  initialState: any
): [
  any,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (NewState: any) => void,
  any,
  (ErrorState: any) => void
] => {
  const [state, setState] = useState(initialState);
  const [ErrorsState, setErrorsState] = useState(initialState);
  const SetState = (NewState: unknown) => {
    setState(NewState);
  };
  const ChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  // Pass Init State
  // Pass Change State for on change event
  // Pass SetErrorState for set error state
  // Pass Set State for set state to null of init

  return [state, ChangeState, SetState, ErrorsState, setErrors];
};

export const useToggle = (
  initialState: boolean
): [boolean, () => void, (value: boolean) => void] => {
  const [Toggle, setToggle] = useState(initialState);
  const toggleState = () => {
    setToggle((state) => !state);
  };
  const ChangeState = (value: boolean) => {
    setToggle(value);
  };
  return [Toggle, toggleState, ChangeState];
};
