import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Template } from "../types";

const TEMPLATES_KEY = ["templates"] as const;

export function useTemplates() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Template[]>({
    queryKey: TEMPLATES_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTemplates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTemplate() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, text }: { name: string; text: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createTemplate(name, text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATES_KEY });
    },
  });
}

export function useUpdateTemplate() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      text,
    }: { id: bigint; name: string; text: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateTemplate(id, name, text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATES_KEY });
    },
  });
}

export function useDeleteTemplate() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteTemplate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATES_KEY });
    },
  });
}
