'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const { prisma } = require('@/lib/prisma');

export const UpdateIssueStatus = async (id, status) => {
    try {
        if (!id || !status || status.trim() === '') {
            throw new Error('Missing issue id or status');
        }
        const issue = await prisma.issue.findUnique({ where: { id: id } });
        if (!issue) throw new Error('Issue not found');

        const updatedIssue = await prisma.issue.update({
            where: { id: id },
            data: { status: status },
        });
        revalidatePath('/issues');
        revalidatePath(`/issue/${id}`);
        return {
            success: true,
            message: 'Status updated successfully',
            updatedIssue,
        };
    } catch (err) {
        console.error(err.message);
        return { success: false, error: err.message };
    }
};

export const deleteIssueStatus = async (id) => {
    if (!id) {
        throw new Error('Invalid data');
    }
    const issue = await prisma.issue.delete({ where: { id } });
    if (!issue) throw new Error('Issue not found');
    revalidatePath('/issues');
    redirect('/issues');
};
