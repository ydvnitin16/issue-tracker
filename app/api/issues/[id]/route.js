import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: id },
        include: {
            assignedUser: { select: { id: true, name: true, email: true } },
        },
    });

    if (!issue)
        return NextResponse.json(
            { success: false, error: 'Issue Not Found' },
            { status: 404 }
        );

    return NextResponse.json(
        { success: true, message: 'Issue fetched successfully', issue },
        { status: 200 }
    );
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    if (!body || !body.title || body.title.trim() === '') {
        return NextResponse.json(
            { success: false, error: 'Title is empty' },
            { status: 400 }
        );
    }
    const issue = await prisma.issue.findUnique({ where: { id: id } });

    if (!issue)
        return NextResponse.json(
            { success: false, error: 'Issue Not Found' },
            { status: 404 }
        );

    const updatedIssue = await prisma.issue.update({
        where: { id },
        data: { title: body.title, description: body.description },
    });
    return NextResponse.json(
        { success: true, message: 'Issue updated successfully', updatedIssue },
        { status: 200 }
    );
}
