import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports } from "./index-NqAwaR37.js";
import { e as cn, f as createSlot, B as Button, u as ue } from "./backend-By3SsGjH.js";
import { u as useTemplates, a as useCreateTemplate, b as useUpdateTemplate, c as useDeleteTemplate, T as Textarea, S as ScrollArea, X } from "./use-templates-f9nk0pb8.js";
import { S as Skeleton, T as Trash2, D as DeleteConfirmDialog } from "./DeleteConfirmDialog-Cne82APr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Templates() {
  const { data: templates, isLoading } = useTemplates();
  const createTemplate = useCreateTemplate();
  const updateTemplate = useUpdateTemplate();
  const deleteTemplate = useDeleteTemplate();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [newName, setNewName] = reactExports.useState("");
  const [newText, setNewText] = reactExports.useState("");
  const [editState, setEditState] = reactExports.useState(null);
  const [pendingDelete, setPendingDelete] = reactExports.useState(null);
  const handleCreate = () => {
    if (!newName.trim() || !newText.trim()) return;
    createTemplate.mutate(
      { name: newName.trim(), text: newText.trim() },
      {
        onSuccess: () => {
          ue.success("Template created");
          setNewName("");
          setNewText("");
          setShowForm(false);
        },
        onError: () => ue.error("Failed to create template")
      }
    );
  };
  const handleUpdate = () => {
    if (!editState || !editState.name.trim() || !editState.text.trim()) return;
    updateTemplate.mutate(
      {
        id: editState.id,
        name: editState.name.trim(),
        text: editState.text.trim()
      },
      {
        onSuccess: () => {
          ue.success("Template updated");
          setEditState(null);
        },
        onError: () => ue.error("Failed to update template")
      }
    );
  };
  const handleDelete = () => {
    if (!pendingDelete) return;
    deleteTemplate.mutate(pendingDelete.id, {
      onSuccess: () => {
        ue.success("Template deleted");
        setPendingDelete(null);
      },
      onError: () => {
        ue.error("Failed to delete template");
        setPendingDelete(null);
      }
    });
  };
  const startEdit = (tpl) => {
    setShowForm(false);
    setEditState({ id: tpl.id, name: tpl.name, text: tpl.text });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border bg-card flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: templates ? `${templates.length} template${templates.length !== 1 ? "s" : ""}` : "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => {
              setShowForm((v) => !v);
              setEditState(null);
            },
            "data-ocid": "templates.open_modal_button",
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
              "New Template"
            ]
          }
        )
      ] }),
      showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "px-4 py-3 border-b border-border bg-muted/30 flex-shrink-0",
          "data-ocid": "templates.create_form",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tpl-name", className: "text-xs font-semibold", children: "Template Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "tpl-name",
                  "data-ocid": "templates.name_input",
                  value: newName,
                  onChange: (e) => setNewName(e.target.value),
                  placeholder: "e.g. Morning check-in",
                  className: "bg-card"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tpl-text", className: "text-xs font-semibold", children: "Message Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "tpl-text",
                  "data-ocid": "templates.text_textarea",
                  value: newText,
                  onChange: (e) => setNewText(e.target.value),
                  placeholder: "Type the template message…",
                  rows: 3,
                  className: "resize-none bg-card"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => {
                    setShowForm(false);
                    setNewName("");
                    setNewText("");
                  },
                  "data-ocid": "templates.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  onClick: handleCreate,
                  disabled: !newName.trim() || !newText.trim() || createTemplate.isPending,
                  "data-ocid": "templates.submit_button",
                  children: createTemplate.isPending ? "Saving…" : "Save Template"
                }
              )
            ] })
          ] })
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-col gap-3 p-4",
          "data-ocid": "templates.loading_state",
          children: ["t1", "t2", "t3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-xl" }, k))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: !templates || templates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center gap-3 py-16 px-4 text-center",
          "data-ocid": "templates.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "📋" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No templates yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Create reusable message presets to quickly fill your compose area." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 p-4", children: templates.map(
        (tpl, i) => (editState == null ? void 0 : editState.id) === tpl.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col gap-2 p-3 rounded-xl border border-primary/40 bg-card",
            "data-ocid": `templates.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": `templates.edit_name_input.${i + 1}`,
                  value: editState.name,
                  onChange: (e) => setEditState({ ...editState, name: e.target.value }),
                  className: "text-sm font-semibold bg-background"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  "data-ocid": `templates.edit_text_textarea.${i + 1}`,
                  value: editState.text,
                  onChange: (e) => setEditState({ ...editState, text: e.target.value }),
                  rows: 3,
                  className: "resize-none text-sm bg-background"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => setEditState(null),
                    "data-ocid": `templates.cancel_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "mr-1" }),
                      " Cancel"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    onClick: handleUpdate,
                    disabled: updateTemplate.isPending,
                    "data-ocid": `templates.save_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, className: "mr-1" }),
                      updateTemplate.isPending ? "Saving…" : "Save"
                    ]
                  }
                )
              ] })
            ]
          },
          String(tpl.id)
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group",
            "data-ocid": `templates.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary truncate", children: tpl.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mt-0.5 line-clamp-2", children: tpl.text })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Edit template",
                    "data-ocid": `templates.edit_button.${i + 1}`,
                    onClick: () => startEdit(tpl),
                    className: "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 14 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Delete template",
                    "data-ocid": `templates.delete_button.${i + 1}`,
                    onClick: () => setPendingDelete(tpl),
                    className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                  }
                )
              ] })
            ]
          },
          String(tpl.id)
        )
      ) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmDialog,
      {
        open: !!pendingDelete,
        onOpenChange: (open) => !open && setPendingDelete(null),
        title: "Delete this template?",
        description: "This template will be permanently deleted.",
        onConfirm: handleDelete,
        isDeleting: deleteTemplate.isPending
      }
    )
  ] });
}
export {
  Templates as default
};
