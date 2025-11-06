import IssuesList from '@/components/section/IssuesList';
import React from 'react';

const page = async () => {
    const res = await fetch('http://localhost:3000/api/issues');
    const issues = await res.json();

    return <IssuesList issues={issues} />;
};

export default page;
