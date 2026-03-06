import { useAuthActions } from "@/hooks/use-auth-actions";
import { LayoutDashboard, MessageCircle, User, LogOut, ClipboardCheck, Menu, X } from "lucide-react"
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
    {name: "Dashboard", href: "/admin/", icon: LayoutDashboard},
    {name: "Chat", href: "/admin/chat", icon: MessageCircle},
    {name: "Profile", href: "/admin/profile", icon: User},
    {name: "Tasks", href: "/admin/tasks", icon: ClipboardCheck},
]

const Navbar = () => {
        const { logout } = useAuthActions();
        const [open, setOpen] = useState(false)

        return (
                <header className="bg-surface shadow-lg border-b border-border">
                        <nav className="container mx-auto flex items-center gap-4 py-3 relative">
                                <div className="flex items-center gap-4 w-full">
                                    <span className="text-primary text-2xl font-bold">PracticaChat</span>

                                    <button
                                        aria-label="Toggle menu"
                                        onClick={() => setOpen(v => !v)}
                                        className="ml-auto md:hidden p-2 rounded-md hover:bg-border"
                                    >
                                        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                    </button>

                                    <div className="hidden md:flex md:items-center md:gap-4 md:ml-4">
                                        {navigation.map(item => (
                                            <NavLink
                                                key={item.name}
                                                to={item.href}
                                                className={({isActive}) => (
                                                    cn(
                                                        isActive ? "bg-primary text-surface font-semibold shadow-sm" : "text-muted hover:text-primary",
                                                        "flex items-center gap-2 px-3 py-2 rounded-md transition"
                                                    )
                                                )}
                                                end
                                            >
                                                <item.icon className="w-5 h-5" />
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>

                                </div>

                                <div className="hidden md:block ml-auto">
                                    <Button 
                                            onClick={logout}
                                            variant="destructive"
                                            size="sm"
                                            className="flex items-center gap-2 px-3 py-2 rounded-md"
                                    >
                                            <LogOut className="w-5 h-5" />
                                            Logout
                                    </Button>
                                </div>

                                {/* Mobile menu */}
                                {open && (
                                    <div className="md:hidden absolute left-0 right-0 top-full bg-surface/95 backdrop-blur-sm border-t border-border shadow-md p-4 z-50">
                                        <div className="flex flex-col gap-2">
                                            {navigation.map(item => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}
                                                    onClick={() => setOpen(false)}
                                                    className={({isActive}) => (
                                                        cn(
                                                            isActive ? "bg-primary text-surface font-semibold shadow-sm" : "text-text hover:text-primary",
                                                            "flex items-center gap-2 px-3 py-2 rounded-md transition"
                                                        )
                                                    )}
                                                    end
                                                >
                                                    <item.icon className="w-5 h-5" />
                                                    {item.name}
                                                </NavLink>
                                            ))}

                                            <Button 
                                                onClick={() => { setOpen(false); logout() }}
                                                variant="destructive"
                                                size="sm"
                                                className="flex items-center gap-2 px-3 py-2 rounded-md w-full"
                                            >
                                                <LogOut className="w-5 h-5" />
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                )}

                        </nav>
                </header>
        )
}
export default Navbar