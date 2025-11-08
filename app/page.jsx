import ChartBarDefault from './ChartBarDefault';
import DashboardCard from './DashboardSectionCard';
import LatestIssues from './LatestIssues';
import React from 'react';

const Home = async () => {
    const res = await fetch('http://localhost:3000/api/issues');
    const latestIssues = await res.json();

    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 sm:px-20 py-10">
                <div className="flex w-full overflow-hidden flex-col flex-1 gap-6">
                    <DashboardCard />
                    <ChartBarDefault />
                </div>
                <div className="flex-1 w-full overflow-hidden">
                    <LatestIssues latestIssues={latestIssues} />
                </div>
            </div>
        </>
    );
};

export default Home;
