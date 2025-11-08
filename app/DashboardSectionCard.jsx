import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';

const DashboardSectionCard = () => {
    const cardContent = [
        { label: 'Open Issues', content: '2' },
        { label: 'In-Progress Issues', content: '5' },
        { label: 'Closed Issues', content: '1' },
    ];
    return (
        <div className="flex w-full space-x-3">
            {cardContent.map((card, idx) => (
                <Card key={idx} className={'p-3'}>
                    <CardContent className={'px-3'}>
                        <CardDescription>{card.label}</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {card.content}
                        </CardTitle>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default DashboardSectionCard;
