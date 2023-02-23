import { useState, useEffect } from "react";

const useRequest = <T,>(callback: () => Promise<T>) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<undefined | T>(undefined);

  useEffect(() => {
    callback()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    data,
  };
};

export default useRequest;
