import { useEffect } from "react";
import { useState } from "react";

const useFetch = (url, initialState) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false)
        setError('')});
  }, [url]);
  return { data, loading, error };
};
export default useFetch;
