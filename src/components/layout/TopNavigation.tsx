import { Link } from "react-router-dom"
import { Bell, Menu, User, Search } from "lucide-react"

export default function TopNavigation() {
  return (
    <header className="sticky top-0 z-40 flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background/95 backdrop-blur px-4 sm:px-6">
      <button className="lg:hidden shrink-0">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </button>
      <div className="w-full flex-1">
        <form className="hidden sm:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full bg-background appearance-none pl-8 pr-4 py-2 text-sm outline-none border border-input rounded-md focus:border-transparent focus:ring-2 focus:ring-ring focus:ring-offset-2 max-w-sm"
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            3
          </span>
        </button>
        <Link to="/profile" className="flex h-8 w-8 items-center justify-center rounded-full border bg-secondary shrink-0">
          <User className="h-4 w-4 text-secondary-foreground" />
        </Link>
      </div>
    </header>
  )
}
