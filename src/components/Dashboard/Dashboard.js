import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from '../../utils/axiosValidationInterceptor';
import PieChartInfo from './PieChartInfo';
import { useState, useEffect } from "react";

const Dashboard = () => {
    const [dataByLineups, setDataByLineups] = useState([]);
    const [dataByCategories, setDataByCategories] = useState([]);
    const [dataBySeries, setDataBySeries] = useState([]);
    const [dataByAnniversaries, setDataByAnniversaries] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lineupsResponse = await axios.get('/lineups');
                const categoriesResponse = await axios.get('/categories');
                const seriesResponse = await axios.get('/series');
                const anniversariesResponse = await axios.get('/anniversaries');
                const basicFigurinesResponse = await axios.get('/figurines/basics');
                

                setDataByLineups(extractFigurinesByLineup(lineupsResponse.data, basicFigurinesResponse.data));
                setDataByCategories(extractFigurinesByCategory(categoriesResponse.data, basicFigurinesResponse.data));
                setDataBySeries(extractFigurinesBySeries(seriesResponse.data, basicFigurinesResponse.data));
                setDataByAnniversaries(extractFigurinesByAnniversaries(anniversariesResponse.data, basicFigurinesResponse.data));

            } catch (err) {
                console.error('Error creating the dashboard', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    function extractFigurinesByLineup(lineups, basicFigurines) {
        let data = [];

        lineups.forEach((lineup) => {
            let total = basicFigurines
                .filter(f => f.status === 'RELEASED' || f.status === 'FUTURE_RELEASE')
                .filter(f => f.lineUp === lineup.key)
                .length;

            data.push({
                label: lineup.description,
                value: total,
                color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()}`
            });
        });
        return data;
    }

    function extractFigurinesByCategory(categories, basicFigurines) {
        let data = [];

        categories.forEach((category) => {
            let total = basicFigurines
                .filter(f => f.status === 'RELEASED' || f.status === 'FUTURE_RELEASE')
                .filter(f => f.category === category.key)
                .length;

            data.push({
                label: category.description,
                value: total,
                color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()}`
            });
        });
        return data;
    }

    function extractFigurinesBySeries(series, basicFigurines) {
        let data = [];

        series.forEach((s) => {
            let total = basicFigurines
                .filter(f => f.status === 'RELEASED' || f.status === 'FUTURE_RELEASE')
                .filter(f => f.series === s.key)
                .length;

            data.push({
                label: s.description,
                value: total,
                color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()}`
            });
        });
        return data;
    }

    function extractFigurinesByAnniversaries(anniversaries, basicFigurines) {
        let data = [];

        anniversaries.forEach((anniversary) => {
            let total = basicFigurines
                .filter(f => f.status === 'RELEASED' || f.status === 'FUTURE_RELEASE')
                .filter(f => f.anniversary)
                .filter(f => f.anniversary === anniversary.key)
                .length;

            data.push({
                label: anniversary.description + "th Anniversary",
                value: total,
                color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()}`
            });
        });
        return data;
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
                <PieChartInfo title='Total figurines by lineup' data={dataByLineups} />
            </Grid>
            <Grid>
                <PieChartInfo title='Total figurines by category' data={dataByCategories} />
            </Grid>
            <Grid>
                <PieChartInfo title='Total figurines by series' data={dataBySeries} />
            </Grid>
            <Grid>
                <PieChartInfo title='Total figurines by anniversary' data={dataByAnniversaries} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;