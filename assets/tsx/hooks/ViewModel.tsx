import { useEffect, useState } from "react";

/**
 * @deprecated Make it work or remove.
 */
const useViewModel = <T = never>() => {
    const [ viewModel, setViewModel ] = useState<T | undefined>(undefined);

    useEffect(() => {
        const model = document.getElementById("view-model")?.textContent ?? "";
        setViewModel(JSON.parse(model));
    }, []);

    return viewModel as T;
};

export default useViewModel;