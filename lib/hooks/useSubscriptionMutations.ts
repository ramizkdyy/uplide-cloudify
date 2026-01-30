import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubscription, updateSubscription, deleteSubscription } from "@/lib/api/subscriptions";
import { Subscription } from "@/lib/types";
import { toast } from "sonner";

export function useSubscriptionMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createSubscription,
    onMutate: async (newSubscription) => {
      await queryClient.cancelQueries({ queryKey: ["subscriptions"] });
      
      const previousSubscriptions = queryClient.getQueryData<Subscription[]>(["subscriptions"]);
      
      const optimisticSubscription = {
        ...newSubscription,
        id: `temp-${Date.now()}`,
      };
      
      queryClient.setQueryData<Subscription[]>(["subscriptions"], (old) =>
        old ? [...old, optimisticSubscription] : [optimisticSubscription]
      );

      return { previousSubscriptions };
    },
    onSuccess: () => {
      toast.success("Subscription added successfully");
    },
    onError: (err, newSubscription, context) => {
      queryClient.setQueryData(["subscriptions"], context?.previousSubscriptions);
      toast.error("Failed to add subscription");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Subscription> }) =>
      updateSubscription(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["subscriptions"] });
      
      const previousSubscriptions = queryClient.getQueryData<Subscription[]>(["subscriptions"]);
      
      queryClient.setQueryData<Subscription[]>(["subscriptions"], (old) =>
        old
          ? old.map((sub) => (sub.id === id ? { ...sub, ...data } : sub))
          : []
      );

      return { previousSubscriptions };
    },
    onSuccess: () => {
      toast.success("Subscription updated successfully");
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["subscriptions"], context?.previousSubscriptions);
      toast.error("Failed to update subscription");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSubscription,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["subscriptions"] });
      
      const previousSubscriptions = queryClient.getQueryData<Subscription[]>(["subscriptions"]);
      
      queryClient.setQueryData<Subscription[]>(["subscriptions"], (old) =>
        old ? old.filter((sub) => sub.id !== id) : []
      );

      return { previousSubscriptions };
    },
    onSuccess: () => {
      toast.success("Subscription deleted successfully");
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["subscriptions"], context?.previousSubscriptions);
      toast.error("Failed to delete subscription");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });

  return {
    createSubscription: createMutation.mutate,
    updateSubscription: updateMutation.mutate,
    deleteSubscription: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}