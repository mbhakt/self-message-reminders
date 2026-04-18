import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Message } from "../types";

const MESSAGES_KEY = ["messages"] as const;

export function useMessages() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Message[]>({
    queryKey: MESSAGES_KEY,
    queryFn: async () => {
      if (!actor) return [];
      const msgs = await actor.listMessages();
      // Sort chronologically oldest → newest for chat display
      return [...msgs].sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSendMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.sendMessage(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MESSAGES_KEY });
    },
  });
}

export function useDeleteMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteMessage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MESSAGES_KEY });
    },
  });
}
