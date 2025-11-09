import React from 'react';
import IssueForm from '../../components/IssueForm';

const page = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:3000/api/issues/${id}`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error('Issue not found');
    }
    return <IssueForm issue={data.issue} />;
};

export default page;
