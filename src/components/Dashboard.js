import { Box, Card, CardContent, CardHeader, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from '../utils/axiosValidationInterceptor';
import { useState, useEffect } from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';


const sizing = {
    //margin: { right: 5 },
    width: 800,
    height: 300,
    legend: { hidden: false },
};

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getArcLabel = (params) => {
        const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lineupsResponse = await axios.get('/lineups');
                const basicFigurinesResponse = await axios.get('/figurines/basics');

                let figurinesByLineup = [];

                lineupsResponse.data.forEach((lineup) => {
                    let total = basicFigurinesResponse.data
                        .filter(f => f.status === 'RELEASED' || f.status === 'FUTURE_RELEASE')
                        .filter(f => f.lineUp === lineup.key)
                        .length;

                    figurinesByLineup.push({
                        label: lineup.description,
                        value: total,
                        color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()}`
                    });
                    setData(figurinesByLineup);
                });
            } catch (err) {
                console.error('Error creating the dashboard', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return loading ? (
        <Grid container spacing={2}>
            <Grid size={4}>
                <CircularProgress />
            </Grid>
        </Grid>
    ) : (
        <Grid container spacing={2}>
            <Grid>
                <Card>
                    <CardHeader title="Figurines by lineup" />
                    <CardContent>
                        <PieChart series={[{
                            outerRadius: 140,
                            data,
                            arcLabel: getArcLabel,
                            arcLabelMinAngle: 10,
                            arcLabelRadius: '65%'
                        }]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontSize: 15,
                                },
                            }}
                            {...sizing} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={4}>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds</Typography>
            </Grid>
            <Grid>
                <Typography>ds1</Typography>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
