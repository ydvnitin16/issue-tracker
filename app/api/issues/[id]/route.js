import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({where: {id: id}})
    console.log('Issue: ',issue)
    if (!issue)
        return NextResponse.json(
            { message: 'Issue Not Found' },
            { status: 404 }
        );

    return NextResponse.json(issue, { status: 200 });
}
