import CreateIssueForm from '@/app/issues/_components/IssueForm';
import React from 'react';

export const metadata = {
    title: 'Create new issue',
    description: 'Create a new issue here'
}


const page = () => {
    return <CreateIssueForm />;
};

export default page;
