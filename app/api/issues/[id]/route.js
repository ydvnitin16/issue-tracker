import { authOptions } from '@/app/auth/authOptions';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
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
    const { user } = await getServerSession(authOptions);

    // check is authorized
    if (!user)
        return NextResponse.json(
            { success: false, error: 'Not authorized' },
            { status: 401 }
        );

    // is exists in the db
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser)
        return NextResponse.json(
            { success: false, error: 'User not found' },
            { status: 404 }
        );

    // is issue exists
    const issue = await prisma.issue.findUnique({ where: { id: id } });
    if (!issue)
        return NextResponse.json(
            { success: false, error: 'Issue Not Found' },
            { status: 404 }
        );

    // is he authorized to perform this action
    if (
        dbUser.role !== 'ADMIN' &&
        issue.createdById !== dbUser.id &&
        issue.assignedUserId !== dbUser.id
    ) {
        return NextResponse.json(
            { success: false, error: 'You are not allowed for this action' },
            { status: 405 }
        );
    }

    const body = await request.json();
    if (!body || !body.title || body.title.trim() === '') {
        return NextResponse.json(
            { success: false, error: 'Title is empty' },
            { status: 400 }
        );
    }

    const updatedIssue = await prisma.issue.update({
        where: { id },
        data: { title: body.title, description: body.description },
    });
    return NextResponse.json(
        { success: true, message: 'Issue updated successfully', updatedIssue },
        { status: 200 }
    );
}
