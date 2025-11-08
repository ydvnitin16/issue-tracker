import IssuesTable from './IssuesTable';
import React from 'react';

const page = async () => {
    const res = await fetch('http://localhost:3000/api/issues');
    const issues = await res.json();

    return <IssuesTable issues={issues} />;
};

export default page;
