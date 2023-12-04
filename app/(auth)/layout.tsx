export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex justify-end pt-10 pr-5">
            <div className="max-w-2xl w-auto">
                {children}
            </div>
        </div>
    );
}