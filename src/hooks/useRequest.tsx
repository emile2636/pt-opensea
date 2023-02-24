import { useState, useEffect } from "react";

const useRequest = <T,>(
  callback: () => Promise<T>,
  dependancies: any[] = []
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<undefined | T>(undefined);

  useEffect(() => {
    setLoading(true);
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
  }, [...dependancies]);

  return {
    loading,
    data,
  };
};

export default useRequest;
