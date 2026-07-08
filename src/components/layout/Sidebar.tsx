import { Link, useLocation } from "react-router-dom"
import { Home, FileText, Calendar, Users, Settings, PieChart, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const location = useLocation()
  
  const navItems = [
    { label: "Dashboard", href: "/", icon: Home },
    { label: "Policies", href: "/policies", icon: FileText },
    { label: "Renewals", href: "/renewals", icon: Calendar },
    { label: "Commissions", href: "/commissions", icon: PieChart },
    { label: "Users", href: "/users", icon: Users },
    { label: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <aside className="hidden w-[260px] flex-col border-r bg-background lg:flex">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary tracking-tight">
          <Shield className="h-6 w-6" />
          <span>AnverraGlobal</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                location.pathname === item.href ? "bg-secondary text-secondary-foreground" : ""
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
