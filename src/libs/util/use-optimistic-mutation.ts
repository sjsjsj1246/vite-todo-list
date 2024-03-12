import { useQueryClient, type QueryKey, type MutationOptions, useMutation } from "@tanstack/react-query";

interface OptimisticMutationOptions<TQueryData, TVariables, TData> extends MutationOptions<TData, Error, TVariables> {
  queryKey: QueryKey;
  updateFn: (props: TVariables) => (prev: TQueryData | undefined) => TQueryData | undefined;
}

export default function useOptimisticMutation<TQueryData = unknown, TVariables = void, TData = unknown>({
  queryKey,
  updateFn,
  ...options
}: OptimisticMutationOptions<TQueryData, TVariables, TData>) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    onMutate: async (props: TVariables) => {
      await queryClient.cancelQueries({ queryKey });
      const oldData = queryClient.getQueryData<TQueryData>(queryKey);

      queryClient.setQueryData(queryKey, updateFn(props));

      return { oldData };
    },
    onError: (_: Error, __: TVariables, context: { oldData: TQueryData | undefined } | undefined) => {
      if (context) queryClient.setQueryData<TQueryData>(queryKey, context.oldData);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });
}
