import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, CardHeader } from '@mui/material';

export default function BarChartInfo({ title, dataset, series }) {

    const chartSetting = {
        yAxis: [
            {
                label: 'Number of figurines released',
            },
        ],
        height: 480
    };

    return (
        <Card>
            <CardHeader title={title} />
            <CardContent>
                <BarChart
                    dataset={dataset}
                    xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                    series={series}
                    {...chartSetting}
                />
            </CardContent>
        </Card>
    );
}
