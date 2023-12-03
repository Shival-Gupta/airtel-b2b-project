import { Navbar } from "@/app/_components/navbar";

const DashboardLayout = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full">
            {children}
        </div>
    )
}

export default DashboardLayout;