import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Card, CardContent, CardHeader } from '@mui/material';

export default function PieChartInfo({ title, data }) {

    const sizing = {
        margin: { right: 200 },
        width: 800,
        height: 300,
        legend: { hidden: false },
    };

    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
    const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };

    return (
        <Card>
            <CardHeader title={title} />
            <CardContent>
                <PieChart
                    series={[
                        {
                            outerRadius: 140,
                            data,
                            arcLabelMinAngle: 10,
                            arcLabel: getArcLabel,
                        },
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontSize: 15,
                        },
                    }}
                    {...sizing}
                />
            </CardContent>
        </Card>
    );
}
