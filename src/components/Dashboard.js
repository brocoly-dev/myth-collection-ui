import { Box, CircularProgress, Typography } from '@mui/material';
import axios from '../utils/axiosValidationInterceptor';
import { useState, useEffect } from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';


const sizing = {
    margin: { right: 5 },
    width: 900,
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

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" gutterBottom>
                Figurine Lineup Distribution
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
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
            )}
        </Box>
    );
};

export default Dashboard;
