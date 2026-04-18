import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { LayoutTemplate, Send, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSendMessage } from "../hooks/use-messages";
import { useTemplates } from "../hooks/use-templates";
import type { Template } from "../types";

export default function Compose() {
  const [content, setContent] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const sendMessage = useSendMessage();
  const { data: templates } = useTemplates();
  const navigate = useNavigate();

  const handleSend = () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    sendMessage.mutate(trimmed, {
      onSuccess: () => {
        toast.success("Message sent!");
        setContent("");
        navigate({ to: "/inbox" });
      },
      onError: () => {
        toast.error("Failed to send message. Please try again.");
      },
    });
  };

  const handleSelectTemplate = (tpl: Template) => {
    setContent(tpl.text);
    setShowTemplates(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Template picker panel */}
      {showTemplates && (
        <div className="flex flex-col border-b border-border bg-card flex-shrink-0 max-h-56">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Quick Templates
            </span>
            <button
              type="button"
              aria-label="Close templates"
              onClick={() => setShowTemplates(false)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
              data-ocid="compose.close_button"
            >
              <X size={14} />
            </button>
          </div>
          <ScrollArea className="flex-1">
            {!templates || templates.length === 0 ? (
              <p
                className="text-sm text-muted-foreground text-center py-6 px-4"
                data-ocid="compose.templates_empty_state"
              >
                No templates yet. Create some in the Templates tab.
              </p>
            ) : (
              <div className="p-2 flex flex-col gap-1">
                {templates.map((tpl, i) => (
                  <button
                    key={String(tpl.id)}
                    type="button"
                    data-ocid={`compose.template_item.${i + 1}`}
                    onClick={() => handleSelectTemplate(tpl)}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-accent/30 transition-colors duration-150 group"
                  >
                    <p className="text-xs font-semibold text-primary truncate">
                      {tpl.name}
                    </p>
                    <p className="text-sm text-foreground line-clamp-2 mt-0.5">
                      {tpl.text}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      )}

      {/* Compose area */}
      <div className="flex flex-col flex-1 p-4 gap-4">
        <div className="flex flex-col flex-1 gap-2">
          <label
            htmlFor="compose-input"
            className="text-sm font-medium text-muted-foreground"
          >
            Write a message to yourself
          </label>
          <Textarea
            id="compose-input"
            data-ocid="compose.textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a note, reminder, or idea…"
            className="flex-1 resize-none min-h-[160px] text-base leading-relaxed bg-card border-input"
            autoFocus
          />
          <p className="text-xs text-muted-foreground text-right">
            {content.length > 0 && <span>{content.length} chars · </span>}
            <kbd className="font-mono">⌘ Enter</kbd> to send
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="compose.templates_button"
            onClick={() => setShowTemplates((v) => !v)}
            className="gap-1.5 text-sm"
          >
            <LayoutTemplate size={15} />
            Templates
          </Button>
          <div className="flex-1" />
          <Button
            type="button"
            data-ocid="compose.submit_button"
            onClick={handleSend}
            disabled={!content.trim() || sendMessage.isPending}
            className="gap-2 px-5"
          >
            <Send size={15} />
            {sendMessage.isPending ? "Sending…" : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}
