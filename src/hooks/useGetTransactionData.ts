import { useState, useEffect } from 'react';
import transactionsData from '../mock/data.json';

interface Transaction {
  transactionID: string;
  date: string;
  description: string;
  amount: number;
}

interface FetchResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export function useGetTransactionData(): FetchResult<Transaction[]> {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const mockFetch = (): Promise<{ json: () => Promise<Transaction[]> }> => {
      return new Promise((resolve) => {
        resolve({
          json: () => Promise.resolve(transactionsData),
        });
      });
    };

    const fetchData = async () => {
      try {
        const response = await mockFetch();

        if (!response) {
          throw new Error('No response from mock fetch');
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(String(err));
          }
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
