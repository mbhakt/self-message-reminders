import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { InboxIcon, LayoutTemplate, PenSquare } from "lucide-react";

const NAV_TABS = [
  { to: "/inbox", label: "Inbox", icon: InboxIcon, ocid: "nav.inbox_tab" },
  {
    to: "/compose",
    label: "Compose",
    icon: PenSquare,
    ocid: "nav.compose_tab",
  },
  {
    to: "/templates",
    label: "Templates",
    icon: LayoutTemplate,
    ocid: "nav.templates_tab",
  },
] as const;

export default function Layout() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="flex flex-col h-dvh max-w-2xl mx-auto bg-card shadow-xl overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground shadow-md flex-shrink-0 z-10">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
            <span className="text-base font-bold font-display">S</span>
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-semibold text-base leading-tight truncate">
              Self Messages
            </h1>
            <p className="text-xs text-primary-foreground/70 leading-tight">
              Your personal notes &amp; reminders
            </p>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav
        className="flex border-b border-border bg-card flex-shrink-0"
        role="tablist"
        aria-label="Main navigation"
      >
        {NAV_TABS.map(({ to, label, icon: Icon, ocid }) => {
          const isActive = currentPath.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              role="tab"
              aria-selected={isActive}
              data-ocid={ocid}
              className={[
                "flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 text-xs font-medium transition-colors duration-200 relative",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-t-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Page content */}
      <main className="flex flex-col flex-1 overflow-hidden">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-2 px-4 bg-muted/40 border-t border-border text-center flex-shrink-0">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
