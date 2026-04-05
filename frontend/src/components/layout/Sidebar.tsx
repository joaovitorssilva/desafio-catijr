import { useState } from "react";
import { NavLink } from "react-router-dom";

const LayoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="1" width="6" height="9" rx="1.5" />
    <rect x="9" y="1" width="6" height="6" rx="1.5" />
    <rect x="9" y="9" width="6" height="6" rx="1.5" />
  </svg>
);

const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="1,12 5,7 8,9 11,5 15,3" />
    <line x1="1" y1="15" x2="15" y2="15" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="6,4 10,8 6,12" />
  </svg>
);
 
const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="10,4 6,8 10,12" />
  </svg>
);

type NavItem = {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/board", label: "Board", icon: <LayoutIcon /> },
  { to: "/dashboard", label: "Dashboard", icon: <ChartIcon /> },
];

type SidebarLinkProps = {
  item: NavItem;
  expanded: boolean;
}

function SidebarLink({ item, expanded }: SidebarLinkProps) {
  return (
    <NavLink
      to={item.to}
      title={!expanded ? item.label : undefined}
      className={({ isActive }) => [
        "relative flex items-center gap-[10px] h-9 rounded-lg text-sm whitespace-nowrap transition-colors duration-150 shrink-0",
        expanded ? "w-full justify-start" : "w-9 justify-center",
        isActive ? "bg-[#2e2e2e] text-white" : "text-[#666] hover:bg-[2a2a2a] hover:text-[#bbb]"
      ].join(" ")}

    >
      {({ isActive }) => (
        <>
          {isActive && expanded && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w[3px] h-5 rounded-r-sm bg-[#a78bfa]" />
          )}

          <span className="shrink-0">{item.icon}</span>
          {expanded && <span>{item.label}</span>}
        </>
      )}

    </NavLink>
  )
}

export function Sidebar() {
  const [expanded, setExpanded] = useState(false)

  return <>
    <aside
      className={[
        "flex flex-col h-full bg-bg border-r border-line gap-1 transition-all duration-300 shrink-0 overflow-hidden",
        expanded ? "w-[180px] items-start px-[10px] py-4" : "w-14 items-center py-4"
      ].join(" ")}>

      {NAV_ITEMS.map((item) => (
        <SidebarLink key={item.to} item={item} expanded={expanded} />
      ))}

      <div className= {["shrink-0 h-px bg-bgDark my-1.5", expanded ? "w-full" : "w-6"].join(" ")}/>

      <button
        onClick={() => setExpanded((prev) => (!prev))}
        title= {expanded ? "Recolher" : "Expandir"}
        className= {[
          "flex items-center gap-[10px] h-9 rounded-lg text-sm text-[#555] hover:text[#888] cursor-pointer",
          expanded ? "w-full px-[10px] justify-start" : " w-9 justify-center"
        ].join(" ")}
      >
        {expanded ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
        {expanded && <span>Recolher</span>}

      </button>

    </aside>
  </>
}