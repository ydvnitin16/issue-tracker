import { NextResponse } from 'next/server';
import { issues } from '../route.js';

export async function GET(request, { params }) {
    const { id } = await params;
    const issue = issues.find((issue) => issue.id === Number(id));
    if (!issue)
        return NextResponse.json(
            { message: 'Issue Not Found' },
            { status: 404 }
        );

    return NextResponse.json(issue, { status: 200 });
}
