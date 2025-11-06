import ChartBarDefault from '@/components/section/ChartBarDefault';
import DashboardCard from '@/components/section/DashboardSectionCard';
import LatestIssues from '@/components/section/LatestIssues';
import React from 'react';

const Home = () => {
    
    return (
        <>
            <div className='flex flex-col md:flex-row gap-4 sm:px-20 py-10'>
                <div className='flex w-full overflow-hidden flex-col flex-1 gap-6'>
                    <DashboardCard />
                    <ChartBarDefault />
                </div>
                <div className='flex-1 w-full overflow-hidden'><LatestIssues /></div>
            </div>
        </>
    );
};

export default Home;
