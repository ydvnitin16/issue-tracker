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

const PaginationComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page'));
    console.log(searchParams);

    const handleChange = async (number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', Number(number));
        router.push('?' + params);
    };
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handleChange(currentPage - 1)}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink>{currentPage - 1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        onClick={() => handleChange(currentPage + 1)}
                    >
                        {currentPage + 1}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        onClick={() => handleChange(currentPage + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;
