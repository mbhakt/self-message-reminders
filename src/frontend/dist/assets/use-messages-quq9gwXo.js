import { a as useQueryClient } from "./index-NqAwaR37.js";
import { a as useActor, b as useQuery, c as useMutation, d as createActor } from "./backend-By3SsGjH.js";
const MESSAGES_KEY = ["messages"];
function useMessages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: MESSAGES_KEY,
    queryFn: async () => {
      if (!actor) return [];
      const msgs = await actor.listMessages();
      return [...msgs].sort((a, b) => a.timestamp < b.timestamp ? -1 : 1);
    },
    enabled: !!actor && !isFetching
  });
}
function useSendMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content) => {
      if (!actor) throw new Error("Actor not available");
      return actor.sendMessage(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MESSAGES_KEY });
    }
  });
}
function useDeleteMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteMessage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MESSAGES_KEY });
    }
  });
}
export {
  useDeleteMessage as a,
  useSendMessage as b,
  useMessages as u
};
