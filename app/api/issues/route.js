import { authOptions } from '@/app/auth/authOptions';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const issues = await prisma.issue.findMany();
        return NextResponse.json(
            { success: true, message: 'Issues fetched successfully', issues },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { user } = await getServerSession(authOptions);
        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Not authorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        if (!body || !body.title || body.title.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Missing title' },
                { status: 400 }
            );
        }

        const issue = await prisma.issue.create({
            data: {
                title: body.title,
                description: body.description || '',
                status: 'open',
                createdById: user.id,
            },
        });

        return NextResponse.json(
            { success: true, message: 'Issue created successfully.', issue },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
