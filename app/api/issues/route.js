import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const issues = await prisma.issue.findMany();
        return NextResponse.json(issues);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body || !body.title) {
            return NextResponse.json(
                { error: 'Missing title' },
                { status: 400 }
            );
        }

        const created = await prisma.issue.create({
            data: {
                title: body.title,
                description: body.description || '',
                status: 'open'
            },
        });

        return NextResponse.json(created, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
