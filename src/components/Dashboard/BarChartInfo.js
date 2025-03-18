import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset2, valueFormatter } from './weather';
import { Card, CardContent, CardHeader } from '@mui/material';

export default function BarChartInfo({ title, dataset }) {

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
                    series={[
                        { dataKey: 'london', label: 'London', valueFormatter },
                        { dataKey: 'paris', label: 'Paris', valueFormatter },
                        { dataKey: 'newYork', label: 'New York', valueFormatter },
                        { dataKey: 'seoul', label: 'Seoul', valueFormatter },
                    ]}
                    {...chartSetting}
                />
            </CardContent>
        </Card>
    );
}
