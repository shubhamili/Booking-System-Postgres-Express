import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-muted/40">
            <Sidebar />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout