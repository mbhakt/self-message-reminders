import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import {
  useCreateTemplate,
  useDeleteTemplate,
  useTemplates,
  useUpdateTemplate,
} from "../hooks/use-templates";
import type { Template } from "../types";

interface EditState {
  id: bigint;
  name: string;
  text: string;
}

export default function Templates() {
  const { data: templates, isLoading } = useTemplates();
  const createTemplate = useCreateTemplate();
  const updateTemplate = useUpdateTemplate();
  const deleteTemplate = useDeleteTemplate();

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");
  const [editState, setEditState] = useState<EditState | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Template | null>(null);

  const handleCreate = () => {
    if (!newName.trim() || !newText.trim()) return;
    createTemplate.mutate(
      { name: newName.trim(), text: newText.trim() },
      {
        onSuccess: () => {
          toast.success("Template created");
          setNewName("");
          setNewText("");
          setShowForm(false);
        },
        onError: () => toast.error("Failed to create template"),
      },
    );
  };

  const handleUpdate = () => {
    if (!editState || !editState.name.trim() || !editState.text.trim()) return;
    updateTemplate.mutate(
      {
        id: editState.id,
        name: editState.name.trim(),
        text: editState.text.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Template updated");
          setEditState(null);
        },
        onError: () => toast.error("Failed to update template"),
      },
    );
  };

  const handleDelete = () => {
    if (!pendingDelete) return;
    deleteTemplate.mutate(pendingDelete.id, {
      onSuccess: () => {
        toast.success("Template deleted");
        setPendingDelete(null);
      },
      onError: () => {
        toast.error("Failed to delete template");
        setPendingDelete(null);
      },
    });
  };

  const startEdit = (tpl: Template) => {
    setShowForm(false);
    setEditState({ id: tpl.id, name: tpl.name, text: tpl.text });
  };

  return (
    <>
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card flex-shrink-0">
          <p className="text-sm text-muted-foreground">
            {templates
              ? `${templates.length} template${templates.length !== 1 ? "s" : ""}`
              : ""}
          </p>
          <Button
            size="sm"
            onClick={() => {
              setShowForm((v) => !v);
              setEditState(null);
            }}
            data-ocid="templates.open_modal_button"
            className="gap-1.5"
          >
            <Plus size={15} />
            New Template
          </Button>
        </div>

        {/* Create form */}
        {showForm && (
          <div
            className="px-4 py-3 border-b border-border bg-muted/30 flex-shrink-0"
            data-ocid="templates.create_form"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tpl-name" className="text-xs font-semibold">
                  Template Name
                </Label>
                <Input
                  id="tpl-name"
                  data-ocid="templates.name_input"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Morning check-in"
                  className="bg-card"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tpl-text" className="text-xs font-semibold">
                  Message Text
                </Label>
                <Textarea
                  id="tpl-text"
                  data-ocid="templates.text_textarea"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Type the template message…"
                  rows={3}
                  className="resize-none bg-card"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowForm(false);
                    setNewName("");
                    setNewText("");
                  }}
                  data-ocid="templates.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleCreate}
                  disabled={
                    !newName.trim() ||
                    !newText.trim() ||
                    createTemplate.isPending
                  }
                  data-ocid="templates.submit_button"
                >
                  {createTemplate.isPending ? "Saving…" : "Save Template"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* List */}
        {isLoading ? (
          <div
            className="flex flex-col gap-3 p-4"
            data-ocid="templates.loading_state"
          >
            {["t1", "t2", "t3"].map((k) => (
              <Skeleton key={k} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <ScrollArea className="flex-1">
            {!templates || templates.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center gap-3 py-16 px-4 text-center"
                data-ocid="templates.empty_state"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <p className="font-display font-semibold text-foreground">
                  No templates yet
                </p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Create reusable message presets to quickly fill your compose
                  area.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 p-4">
                {templates.map((tpl, i) =>
                  editState?.id === tpl.id ? (
                    <div
                      key={String(tpl.id)}
                      className="flex flex-col gap-2 p-3 rounded-xl border border-primary/40 bg-card"
                      data-ocid={`templates.item.${i + 1}`}
                    >
                      <Input
                        data-ocid={`templates.edit_name_input.${i + 1}`}
                        value={editState.name}
                        onChange={(e) =>
                          setEditState({ ...editState, name: e.target.value })
                        }
                        className="text-sm font-semibold bg-background"
                      />
                      <Textarea
                        data-ocid={`templates.edit_text_textarea.${i + 1}`}
                        value={editState.text}
                        onChange={(e) =>
                          setEditState({ ...editState, text: e.target.value })
                        }
                        rows={3}
                        className="resize-none text-sm bg-background"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditState(null)}
                          data-ocid={`templates.cancel_button.${i + 1}`}
                        >
                          <X size={14} className="mr-1" /> Cancel
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleUpdate}
                          disabled={updateTemplate.isPending}
                          data-ocid={`templates.save_button.${i + 1}`}
                        >
                          <Check size={14} className="mr-1" />
                          {updateTemplate.isPending ? "Saving…" : "Save"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={String(tpl.id)}
                      className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group"
                      data-ocid={`templates.item.${i + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-primary truncate">
                          {tpl.name}
                        </p>
                        <p className="text-sm text-foreground mt-0.5 line-clamp-2">
                          {tpl.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                        <button
                          type="button"
                          aria-label="Edit template"
                          data-ocid={`templates.edit_button.${i + 1}`}
                          onClick={() => startEdit(tpl)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete template"
                          data-ocid={`templates.delete_button.${i + 1}`}
                          onClick={() => setPendingDelete(tpl)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </ScrollArea>
        )}
      </div>

      <DeleteConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete this template?"
        description="This template will be permanently deleted."
        onConfirm={handleDelete}
        isDeleting={deleteTemplate.isPending}
      />
    </>
  );
}
