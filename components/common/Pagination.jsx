'use client';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

const PaginationComponent = ({ currentPage, pageCount }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = async (number) => {
        if (number > pageCount || number < 1) {
            return;
        }
        const params = new URLSearchParams(searchParams);
        params.set('page', Number(number));
        router.push('?' + params);
    };
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className={'disabled:cursor-no-drop'}
                        disabled={currentPage === 1}
                        onClick={() => handleChange(currentPage - 1)}
                    />
                </PaginationItem>
                <PaginationItem
                    className={`${currentPage <= 1 ? 'hidden' : ''}`}
                    onClick={() => handleChange(1)}
                >
                    <PaginationLink>{1}</PaginationLink>
                </PaginationItem>
                <PaginationItem
                    className={`${currentPage <= 2 ? 'hidden' : ''}`}
                >
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem
                    className={`${currentPage === pageCount ? 'hidden' : ''}`}
                >
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        className={`${
                            currentPage === pageCount ? 'hidden' : ''
                        }`}
                        onClick={() => handleChange(Number(pageCount))}
                    >
                        {pageCount}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        className={'disabled:cursor-no-drop'}
                        disabled={currentPage === pageCount}
                        onClick={() => handleChange(currentPage + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;
