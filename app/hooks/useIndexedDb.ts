import { useQuery } from "@tanstack/react-query";
import { type OpenDBCallbacks, type DBSchema, openDB } from "idb";
export const useIndexedDb = <DBTypes extends DBSchema | unknown = unknown>(
  name: string,
  version?: number,
  config?: OpenDBCallbacks<DBTypes>,
) => {
  const {
    data: indexedDb,
    isLoading: isConnecting,
    isSuccess: isDbReady,
  } = useQuery({
    queryKey: ["indexed-db"],
    queryFn: async () => {
      try {
        const db = await openDB(name, version, config);
        return db;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    staleTime: Infinity,
  });
  return {
    indexedDb,
    isConnecting,
    isDbReady,
  };
};
