import { c as createLucideIcon, r as reactExports, u as useNavigate, j as jsxRuntimeExports, L as LayoutTemplate } from "./index-NqAwaR37.js";
import { B as Button, u as ue } from "./backend-By3SsGjH.js";
import { u as useTemplates, X, S as ScrollArea, T as Textarea } from "./use-templates-f9nk0pb8.js";
import { b as useSendMessage } from "./use-messages-quq9gwXo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function Compose() {
  const [content, setContent] = reactExports.useState("");
  const [showTemplates, setShowTemplates] = reactExports.useState(false);
  const sendMessage = useSendMessage();
  const { data: templates } = useTemplates();
  const navigate = useNavigate();
  const handleSend = () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    sendMessage.mutate(trimmed, {
      onSuccess: () => {
        ue.success("Message sent!");
        setContent("");
        navigate({ to: "/inbox" });
      },
      onError: () => {
        ue.error("Failed to send message. Please try again.");
      }
    });
  };
  const handleSelectTemplate = (tpl) => {
    setContent(tpl.text);
    setShowTemplates(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 overflow-hidden", children: [
    showTemplates && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col border-b border-border bg-card flex-shrink-0 max-h-56", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Quick Templates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Close templates",
            onClick: () => setShowTemplates(false),
            className: "text-muted-foreground hover:text-foreground transition-colors p-1 rounded",
            "data-ocid": "compose.close_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: !templates || templates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm text-muted-foreground text-center py-6 px-4",
          "data-ocid": "compose.templates_empty_state",
          children: "No templates yet. Create some in the Templates tab."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 flex flex-col gap-1", children: templates.map((tpl, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `compose.template_item.${i + 1}`,
          onClick: () => handleSelectTemplate(tpl),
          className: "w-full text-left px-3 py-2.5 rounded-lg hover:bg-accent/30 transition-colors duration-150 group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary truncate", children: tpl.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground line-clamp-2 mt-0.5", children: tpl.text })
          ]
        },
        String(tpl.id)
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "compose-input",
            className: "text-sm font-medium text-muted-foreground",
            children: "Write a message to yourself"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "compose-input",
            "data-ocid": "compose.textarea",
            value: content,
            onChange: (e) => setContent(e.target.value),
            onKeyDown: handleKeyDown,
            placeholder: "Type a note, reminder, or idea…",
            className: "flex-1 resize-none min-h-[160px] text-base leading-relaxed bg-card border-input",
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
          content.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            content.length,
            " chars · "
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "font-mono", children: "⌘ Enter" }),
          " to send"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            "data-ocid": "compose.templates_button",
            onClick: () => setShowTemplates((v) => !v),
            className: "gap-1.5 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { size: 15 }),
              "Templates"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "compose.submit_button",
            onClick: handleSend,
            disabled: !content.trim() || sendMessage.isPending,
            className: "gap-2 px-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 15 }),
              sendMessage.isPending ? "Sending…" : "Send"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  Compose as default
};
