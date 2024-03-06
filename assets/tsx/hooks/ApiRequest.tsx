import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

const getCookieByName = (cookieName: string) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim();

        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return "";
};

export const redirect = (url: string) => window.location.replace(url);

export interface ApiRequestData {}

interface ResponseData {
    status?: number;
    statusText?: string;
    body?: unknown;
    error?: boolean;
}

type Config = {
    headers: Record<string, string>
};

const fromSuccess = (response: AxiosResponse): ResponseData => {
    return {
        status: response.status,
        statusText: response.statusText,
        body: response.data,
        error: false,
    };
};

const fromError = (error: AxiosError): ResponseData => {
    return {
        status: error.response?.status,
        statusText: error.response?.statusText,
        body: { code: error.code, message: error.message },
        error: true,
    };
};

const useApiRequest = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ data, setData ] = useState<ResponseData>({});
    const [ config, setConfig ] = useState<Config>({
        headers: {
            "Content-Type": "application/json",
        }
    });

    useEffect(() => {
        // data status statusText
        setConfig(prevConfig => ({
            headers: {
                ...prevConfig.headers,
                "X-CSRFToken": getCookieByName("csrftoken"),
                "X-AUTH": getCookieByName("sessionid"),
            }
        }));
    }, []);

    const get = (url: string) => {
        setIsLoading(true);

        axios
            .get(url)
            .then((response) => setData(fromSuccess(response)))
            .catch((error) => setData(fromError(error)))
            .finally(() => setIsLoading(false));
    };

    const post = (url: string, data: ApiRequestData, isForm = false) => {
        setIsLoading(true);

        if (isForm) {
            config.headers["Content-Type"] = "multipart/form-data";
        }

        axios
            .post(url, data, config)
            .then((response) => setData(fromSuccess(response)))
            .catch((error) => setData(fromError(error)))
            .finally(() => setIsLoading(false));
    };

    return {
        get,
        post,
        isLoading,
        data,
    };
};

export default useApiRequest;
