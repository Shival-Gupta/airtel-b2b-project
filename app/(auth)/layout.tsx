export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex justify-end">
            <div className="max-w-2xl w-auto px-16 lg:px-32 mb-48">
                {children}
            </div>
        </div>
    );
}