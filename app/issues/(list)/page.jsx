import IssuesTable from './IssuesTable';
import React from 'react';

const page = async () => {
    const res = await fetch('http://localhost:3000/api/issues');
    const data = await res.json();
    if(!res.ok){
        throw new Error("Issue not found")
    }

    return <IssuesTable issues={data.issues} />;
};

export default page;
