import React from 'react';
import IssueDetails from '../components/IssueDetails.jsx';
import UpdateStatus from '../components/UpdateStatus.jsx';

const page = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:3000/api/issues/${id}`);
    const issue = await res.json();

    return (
        <div className="flex flex-col md:flex-row gap-y-5 mt-20 md:px-20 sm:px-10 px-5">
            <IssueDetails issue={issue} /> {/* Server Component*/}
            <UpdateStatus issue={issue} /> {/*Client Component*/}
        </div>
    );
};

export default page;
