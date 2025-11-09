import React from 'react';
import IssueDetails from './IssueDetails.jsx';
import UpdateStatus from './UpdateStatus.jsx';

const page = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:3000/api/issues/${id}`);
    const data = await res.json();
    if(!res.ok){
        throw new Error("Issue not found")
    }

    return (
        <div className="flex flex-col md:flex-row gap-y-5 mt-20 md:px-20 sm:px-10 px-5">
            <IssueDetails issue={data.issue} /> {/* Server Component */}
            <UpdateStatus issue={data.issue} /> {/* Client Component */}
        </div>
    );
};

export default page;
