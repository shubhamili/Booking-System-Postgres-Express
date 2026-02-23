import { NavLink } from "react-router-dom"
import { sidebarLinks } from "./sidebar-links"
import { cn } from "../../lib/utils"

const Sidebar = () => {
    return (
        <aside className="w-64 border-r bg-white h-screen flex flex-col">

            <div className="h-16 flex items-center px-6 border-b">
                <h2 className="text-xl font-semibold tracking-tight">
                    Admin Panel
                </h2>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon

                    return (
                        <NavLink
                            key={link.href}
                            to={link.href}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )
                            }
                        >
                            <Icon className="h-4 w-4" />
                            {link.title}
                        </NavLink>
                    )
                })}
            </nav>

            <div className="p-4 border-t">
                <button className="w-full text-sm text-muted-foreground hover:text-foreground">
                    Logout
                </button>
            </div>

        </aside>
    )
}

export default Sidebar