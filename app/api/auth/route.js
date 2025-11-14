import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
export async function POST(request) {
    const { name, email, password } = await request.json();
    try {
        // we can also validate name & email here
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) {
            return NextResponse.json(
                { success: false, error: 'This email already exists' },
                { status: 409 }
            );
        }
        const newUser = await prisma.user.create({
            data: { name, email, password: hashPassword },
        });

        return NextResponse.json(
            { success: true, message: 'User signed up successfully' },
            { status: 201 }
        );
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
