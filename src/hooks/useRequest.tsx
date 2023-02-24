import { useState, useEffect } from "react";

/**
 * Description placeholder
 * @date 2/24/2023 - 12:08:32 PM
 *
 * @template T
 * @param {() => Promise<T>} callback
 * @param {any[]} [dependencies=[]]
 * @returns {any, dependencies?: {}) => { loading: any; data: any; }}
 */
const useRequest = <T,>(
  callback: () => Promise<T>,
  dependencies: any[] = []
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
  }, [...dependencies]);

  return {
    loading,
    data,
  };
};

export default useRequest;
