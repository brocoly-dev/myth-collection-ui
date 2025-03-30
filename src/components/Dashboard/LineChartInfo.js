import * as React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import dayjs from "dayjs"; // Optional, for formatting dates

export default function LineChartInfo({ title, dataset = [] }) {
    return (
        <Card>
            <CardHeader title={title} />
            <CardContent>
                <LineChart
                    dataset={dataset}
                    xAxis={[{
                        dataKey: 'releaseDate',
                        valueFormatter: (date, context) => {
                            if (context.location === 'tick') {
                                return dayjs(date).format("MMM YY");
                            } else {
                                let releaseDate = dayjs(date).format("MMM DD, YYYY");
                                let nameFound;
                                for (const ds of dataset) {
                                    if (dayjs(ds.releaseDate).format("MMM DD, YYYY") === releaseDate) {
                                        nameFound = ds.name;
                                        break;
                                    }
                                }
                                return nameFound + " - " + releaseDate;
                            }
                        },
                        scaleType: "time",
                    }]}
                    series={[{
                        dataKey: 'price',
                        label: 'Price (JPY)'
                    }]}
                    //yAxis={[{ label: 'price in yenes' }]}
                    height={500}
                    //margin={{ left: 100, right: 30, top: 30, bottom: 30 }}
                    grid={{ vertical: true, horizontal: true }}
                />
            </CardContent>
        </Card>
    );
}
