import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from '../../utils/axiosValidationInterceptor';
import PieChartInfo from './PieChartInfo';
import { useState, useEffect } from "react";

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lineupsResponse = await axios.get('/lineups');
                const basicFigurinesResponse = await axios.get('/figurines/basics');

                setData(extractFigurinesByLineup(lineupsResponse.data, basicFigurinesResponse.data));
                
            } catch (err) {
                console.error('Error creating the dashboard', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    function extractFigurinesByLineup(lineups, basicFigurines) {
        let figurinesByLineup = [];

        lineups.forEach((lineup) => {
            let total = basicFigurines
                .filter(f => f.status === 'RELEASED' || f.status === 'FUTURE_RELEASE')
                .filter(f => f.lineUp === lineup.key)
                .length;

            figurinesByLineup.push({
                label: lineup.description,
                value: total,
                color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()}`
            });
        });
        return figurinesByLineup;
    }

    return loading ? (
        <Grid container spacing={2}>
            <Grid size={4}>
                <CircularProgress />
            </Grid>
        </Grid>
    ) : (
        <Grid container spacing={2}>
            <Grid>
                <PieChartInfo title='Total figurines by lineup' data={data} />
            </Grid>
            <Grid>
                <PieChartInfo title='ddd' data={data} />
            </Grid>
            <Grid>
                <PieChartInfo title='ddd' data={data} />
            </Grid>
            <Grid>
                <PieChartInfo title='ddd' data={data} />
            </Grid>
            <Grid>
                <PieChartInfo title='ddd' data={data} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;