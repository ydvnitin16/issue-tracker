'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const { prisma } = require('@/lib/prisma');

export const UpdateIssueStatus = async (id, status) => {
    try {
        if (!id) {
            throw new Error('Missing or Invalid issue id');
        }
        if (!status || !['open', 'in-progress', 'closed'].includes(status)) {
            throw new Error('Missing or Invalid status');
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
    try {
        if (!id) {
            throw new Error('Invalid data');
        }
        await prisma.issue.delete({ where: { id } });
        revalidatePath('/issues');
        return { success: true, message: 'Issue deleted Successfully' };
    } catch (err) {
        console.error(err.message);
        return { success: false, error: err.message };
    }
};

export const assignIssueToUser = async (issueId, userId) => {
    try {
        if (!issueId || !userId) {
            throw new Error('Invalid data');
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const issue = await prisma.issue.update({
            where: { id: issueId },
            data: { assignedUserId: userId },
            include: { assignedUser: { select: { name: true } } },
        });

        return {
            success: true,
            message: `Issue Assigned to ${issue?.assignedUser?.name}.`,
        };
    } catch (err) {
        console.error(err.message);
        return { success: false, error: err.message };
    }
};
