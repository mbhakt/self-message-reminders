import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import { useDeleteMessage, useMessages } from "../hooks/use-messages";
import type { Message } from "../types";

function formatTime(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const d = new Date(ms);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const d = new Date(ms);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function groupByDate(
  messages: Message[],
): { date: string; messages: Message[] }[] {
  const map = new Map<string, Message[]>();
  for (const m of messages) {
    const key = formatDate(m.timestamp);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(m);
  }
  return Array.from(map.entries()).map(([date, msgs]) => ({
    date,
    messages: msgs,
  }));
}

function LoadingSkeleton() {
  return (
    <div
      className="flex flex-col gap-4 p-4 flex-1 overflow-y-auto"
      data-ocid="inbox.loading_state"
    >
      {([80, 56, 72, 48, 64] as const).map((w) => (
        <div key={w} className="flex justify-end">
          <Skeleton
            className="h-11 rounded-2xl rounded-br-sm"
            style={{ width: `${w * 1.5}px`, maxWidth: "75%" }}
          />
        </div>
      ))}
    </div>
  );
}

function DateDivider({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-2 my-3 px-2">
      <div
        className="flex-1 h-px"
        style={{ background: "oklch(var(--border) / 0.5)" }}
      />
      <span
        className="text-[11px] font-medium px-3 py-1 rounded-full"
        style={{
          background: "oklch(var(--muted) / 0.8)",
          color: "oklch(var(--muted-foreground))",
        }}
      >
        {date}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: "oklch(var(--border) / 0.5)" }}
      />
    </div>
  );
}

interface MessageBubbleProps {
  msg: Message;
  index: number;
  onDelete: (msg: Message) => void;
}

function MessageBubble({ msg, index, onDelete }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="flex justify-end group"
      data-ocid={`inbox.item.${index}`}
    >
      <div className="relative max-w-[80%] flex flex-col items-end gap-0.5">
        {/* Delete button — appears on hover/focus */}
        <button
          type="button"
          aria-label="Delete message"
          data-ocid={`inbox.delete_button.${index}`}
          onClick={() => onDelete(msg)}
          className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 p-1.5 rounded-full"
          style={{
            background: "oklch(var(--muted))",
            color: "oklch(var(--muted-foreground))",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "oklch(var(--destructive) / 0.12)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "oklch(var(--destructive))";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "oklch(var(--muted))";
            (e.currentTarget as HTMLButtonElement).style.color =
              "oklch(var(--muted-foreground))";
          }}
        >
          <Trash2 size={13} />
        </button>

        {/* Bubble */}
        <div
          className="message-sent rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed"
          style={{ wordBreak: "break-word" }}
        >
          {msg.content}
        </div>

        {/* Timestamp + checkmark */}
        <div className="flex items-center gap-1 pr-0.5">
          <span
            className="text-[10px]"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            {formatTime(msg.timestamp)}
          </span>
          {/* WhatsApp-style double checkmark */}
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            aria-hidden="true"
            style={{ color: "oklch(var(--primary))" }}
          >
            <path
              d="M1 4L4 7L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 4L8 7L13 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col flex-1 items-center justify-center gap-4 text-center py-16 px-6"
      data-ocid="inbox.empty_state"
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
        style={{ background: "oklch(var(--primary) / 0.12)" }}
      >
        <MessageCircle
          size={36}
          strokeWidth={1.5}
          style={{ color: "oklch(var(--primary))" }}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-display font-semibold text-base text-foreground">
          No messages yet
        </p>
        <p
          className="text-sm max-w-[220px]"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          Send yourself a note or reminder from the Compose tab.
        </p>
      </div>
      <div
        className="text-xs px-4 py-2 rounded-full font-medium"
        style={{
          background: "oklch(var(--primary) / 0.08)",
          color: "oklch(var(--primary))",
        }}
      >
        Tap Compose ✏️ to get started
      </div>
    </motion.div>
  );
}

export default function Inbox() {
  const { data: messages, isLoading } = useMessages();
  const deleteMessage = useDeleteMessage();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [pendingDelete, setPendingDelete] = useState<Message | null>(null);

  useEffect(() => {
    if (messages?.length) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages?.length]);

  const handleDelete = () => {
    if (!pendingDelete) return;
    deleteMessage.mutate(pendingDelete.id, {
      onSuccess: () => {
        toast.success("Message deleted");
        setPendingDelete(null);
      },
      onError: () => {
        toast.error("Failed to delete message");
        setPendingDelete(null);
      },
    });
  };

  if (isLoading) return <LoadingSkeleton />;

  const groups = groupByDate(messages ?? []);
  const isEmpty = !messages || messages.length === 0;

  return (
    <>
      <div
        className="flex flex-col flex-1 overflow-y-auto chat-scroll px-4 py-3"
        style={{ background: "var(--chat-bg)" }}
        data-ocid="inbox.list"
      >
        {isEmpty ? (
          <EmptyState />
        ) : (
          <AnimatePresence initial={false}>
            {groups.map(({ date, messages: group }, gi) => (
              <div key={date} className="flex flex-col gap-1">
                <DateDivider date={date} />
                {group.map((msg, mi) => (
                  <MessageBubble
                    key={String(msg.id)}
                    msg={msg}
                    index={gi * 100 + mi + 1}
                    onDelete={setPendingDelete}
                  />
                ))}
              </div>
            ))}
          </AnimatePresence>
        )}
        <div ref={bottomRef} className="h-2" />
      </div>

      <DeleteConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete this message?"
        description="This message will be permanently removed from your history."
        onConfirm={handleDelete}
        isDeleting={deleteMessage.isPending}
      />
    </>
  );
}
