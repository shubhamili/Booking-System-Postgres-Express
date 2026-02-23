import {
    LayoutDashboard,
    Clapperboard,
    Armchair,
    Drama,
    Presentation,
    Ticket,
    HandCoins,
    Tickets,
    Theater,
} from "lucide-react"

export const sidebarLinks = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Movie",
        href: "/admin/movie",
        icon: Clapperboard,
    },
    {
        title: "Seat",
        href: "/admin/seat",
        icon: Armchair,
    },
    {
        title: "Seat Type",
        href: "/admin/seatType",
        icon: Armchair,
    },
    {
        title: "Shows",
        href: "/admin/shows",
        icon: Drama,
    },
    {
        title: "Screen",
        href: "/admin/screen",
        icon: Presentation,
    },
    {
        title: "Booking",
        href: "/admin/booking",
        icon: Ticket,
    },
    {
        title: "Price",
        href: "/admin/price",
        icon: HandCoins,
    },
    {
        title: "Theatre",
        href: "/admin/theatre",
        icon: Theater,
    },
]