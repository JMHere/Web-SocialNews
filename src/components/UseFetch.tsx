import { useState, useEffect } from "react";

const useFetch = (url: any) => {
    //const abortCont = new AbortController();

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    //{signal: abortCont.signal}

    useEffect(() => {
        fetch(url)
        .then(res => {
            if(!res.ok) {
                throw Error("Failed to get data")
            }
            return res.json();
        })
        .then(data => {
            setData(data)
            console.log(data)
            setIsLoading(false);
            setError(null);
        })
        .catch(err => {
            if (err.name == "AbortError") {
                console.log("fetch Aborted")
            } else {
                setIsLoading(false);
                setError(err.message);
            }
            
        })

        //return () => abortCont.abort();
    }, [url]);

    return { data, isLoading, error}
} 

export default useFetch;