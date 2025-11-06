import { NextResponse } from 'next/server';

let issues = [
    {
        id: 1,
        name: `Create the API routes`,
        status: 'open',
        created: new Date('December 17, 2025 03:24:00'),
    },
    {
        id: 2,
        name: `Fetch Data from the API route and show on the Issue list`,
        status: 'closed',
        created: new Date('September 01, 2023 03:24:00'),
    },
    {
        id: 3,
        name: `Create a New Issue Functionality Feature`,
        status: 'open',
        created: new Date('August 13, 2025 03:24:00'),
    },
    {
        id: 4,
        name: `Create a New Issue`,
        status: 'in progress',
        created: new Date('December 31, 2024 03:24:00'),
    },
    {
        id: 5,
        name: `Add authentication using JWT`,
        status: 'open',
        created: new Date('January 10, 2025 11:00:00'),
    },
    {
        id: 6,
        name: `Implement pagination in issue list`,
        status: 'closed',
        created: new Date('February 15, 2025 09:45:00'),
    },
    {
        id: 7,
        name: `Fix CORS error in frontend requests`,
        status: 'closed',
        created: new Date('March 01, 2024 13:30:00'),
    },
    {
        id: 8,
        name: `Add search functionality to issues`,
        status: 'in progress',
        created: new Date('April 11, 2025 08:15:00'),
    },
    {
        id: 9,
        name: `Optimize database queries`,
        status: 'closed',
        created: new Date('May 25, 2024 15:45:00'),
    },
    {
        id: 10,
        name: `Add dark mode toggle in UI`,
        status: 'open',
        created: new Date('June 20, 2025 17:10:00'),
    },
    {
        id: 11,
        name: `Create reusable button components`,
        status: 'closed',
        created: new Date('July 12, 2023 10:00:00'),
    },
    {
        id: 12,
        name: `Implement error boundary for React components`,
        status: 'open',
        created: new Date('August 03, 2025 19:24:00'),
    },
    {
        id: 13,
        name: `Add sorting by date and status`,
        status: 'in progress',
        created: new Date('September 15, 2024 14:00:00'),
    },
    {
        id: 14,
        name: `Refactor API call logic using Axios interceptors`,
        status: 'closed',
        created: new Date('October 22, 2025 09:20:00'),
    },
    {
        id: 15,
        name: `Add role-based authorization`,
        status: 'open',
        created: new Date('November 05, 2025 11:11:00'),
    },
    {
        id: 16,
        name: `Implement form validation with Yup`,
        status: 'closed',
        created: new Date('December 08, 2023 12:50:00'),
    },
    {
        id: 17,
        name: `Add responsive design for mobile screens`,
        status: 'in progress',
        created: new Date('January 17, 2024 22:15:00'),
    },
    {
        id: 18,
        name: `Setup CI/CD pipeline for deployment`,
        status: 'closed',
        created: new Date('February 24, 2025 07:40:00'),
    },
    {
        id: 19,
        name: `Write unit tests for backend routes`,
        status: 'open',
        created: new Date('March 30, 2025 16:35:00'),
    },
    {
        id: 20,
        name: `Fix UI glitches in Issue Details page`,
        status: 'closed',
        created: new Date('April 18, 2024 20:10:00'),
    },
    {
        id: 21,
        name: `Fix UI glitches in Issue Details page`,
        status: 'closed',
        created: new Date('April 18, 2024 20:10:00'),
    },
];

console.log(issues);
export async function GET(request) {
    return NextResponse.json(issues);
}

export async function POST(request) {
    const body = await request.json(); // parse body (Request Web API)
    const newIssue = { id: Date.now(), title: body.title };
    issues.push(newIssue);
    return NextResponse.json(newIssue, { status: 201 });
}
