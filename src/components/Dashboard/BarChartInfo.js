import { Card, CardContent, CardHeader } from "@mui/material";
import { BarChart } from "@mui/x-charts";

export default function BarChartInfo({ title }) {
    return (
        <Card>
            <CardHeader title={title} />
            <CardContent>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['Myth Cloth EX', 'Myth Cloth', 'Appendix'] }]}
                    series={[{ data: [4, 4, 4] }, { data: [3, 3, 3] }, { data: [1, 1, 1] }]}
                    height={300}
                />
            </CardContent>
        </Card>
    );
}
