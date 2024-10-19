import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useIndexedDb } from "./useIndexedDb";

const STORE_NAME = "fruits";
const DEFAULT_VALUE = 1;
const QUERY_KEY = ["count"];

export const useCount = () => {
  const queryClient = useQueryClient();
  const { indexedDb, isConnecting, isDbReady } = useIndexedDb(
    STORE_NAME,
    undefined,
    {
      async upgrade(database) {
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME);
        }
      },
    },
  );

  const { data: count, isLoading: isCountLoading } = useQuery<number>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      try {
        if (!indexedDb) {
          return [];
        }
        const key = await indexedDb.getKey(STORE_NAME, "count");

        if (!key) return DEFAULT_VALUE;

        const count = await indexedDb.get(STORE_NAME, key);
        return count ?? DEFAULT_VALUE;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: isDbReady,
  });

  const { mutateAsync: incrementByOne, isPending: isIncrementPending } =
    useMutation({
      mutationFn: async () => {
        console.log("Incrementing by one");
        if (!indexedDb) {
          throw new Error("STORE NOT READY");
        }
        const key = await indexedDb.getKey(STORE_NAME, "count");
        if (!key) {
          await indexedDb.add(STORE_NAME, DEFAULT_VALUE, "count");
          return;
        }
        const currentCount = await indexedDb.get(STORE_NAME, key);

        await indexedDb.put(STORE_NAME, currentCount + 1, "count");
      },
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEY,
        });
      },
    });

  const { mutateAsync: reset, isPending: isResetPending } = useMutation({
    mutationFn: async () => {
      if (!indexedDb) {
        throw new Error("STORE NOT READY");
      }
      await indexedDb.delete(STORE_NAME, "count");
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });

  return {
    indexedDb,
    count,
    isLoading: isConnecting || isCountLoading,
    isReady: isDbReady,
    incrementByOne,
    isIncrementPending,
    reset,
    isResetPending,
  };
};
