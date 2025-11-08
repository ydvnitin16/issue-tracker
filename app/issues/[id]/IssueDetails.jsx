import React from 'react';
import Markdown from 'react-markdown';
import { formatDate } from '@/lib/utils/formatUtils.js';
import StatusBadge from '@/components/common/StatusBadge';

const IssueDetails = ({ issue }) => {
    return (
        <section className="flex flex-col flex-3 gap-8">
            <div>
                <h3 className="text-4xl md:text-6xl font-semibold py-3">
                    {issue.title}
                </h3>
                <div className="flex gap-10 items-center">
                    <StatusBadge status={issue.status} />
                    <p className=" relative rounded text-xl md:text-2xl font-semibold">
                        {formatDate(issue?.createdAt)}
                    </p>
                </div>
            </div>
            <div className="w-full py-6 px-4 border rounded-xl text-xl md:text-2xl">
                <Markdown>{issue.description}</Markdown>
            </div>
        </section>
    );
};

export default IssueDetails;
