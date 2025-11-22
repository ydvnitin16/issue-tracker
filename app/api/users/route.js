import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(
            {
                success: true,
                message: 'Users Fetched Successfully',
                users,
            },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
