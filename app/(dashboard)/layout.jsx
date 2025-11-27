import '.././globals.css';

export default function DashboardLayout({
    children,
    issues_summary,
    latest_issues,
    chart_bar,
}) {
    return (
        <html lang="en">
            <body>
                <div className="flex flex-col md:flex-row gap-4 sm:px-20 py-10">
                    <div className="flex w-full overflow-hidden flex-col flex-1 gap-6">
                        {issues_summary}
                        {chart_bar}
                    </div>
                    <div className="flex-1 w-full overflow-hidden">
                        {latest_issues}
                    </div>
                </div>
                {children}
            </body>
        </html>
    );
}
