import { Box, CircularProgress, MenuItem, Tab, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from '../../utils/axiosValidationInterceptor';
import PieChartInfo from './PieChartInfo';
import { useState, useEffect } from "react";

import { TabContext, TabList, TabPanel } from '@mui/lab';

import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import { BarChart } from '@mui/x-charts';
import BarChartInfo from './BarChartInfo';


const Dashboard = () => {
    const [value, setValue] = useState('1');

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [dataByLineups, setDataByLineups] = useState([]);
    const [dataByCategories, setDataByCategories] = useState([]);
    const [dataBySeries, setDataBySeries] = useState([]);
    const [dataByAnniversaries, setDataByAnniversaries] = useState([]);

    const [datasetByYear, setDatasetByYear] = useState([]);
    const [seriesByYear, setSeriesByYear] = useState([]);

    const [loading, setLoading] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const startYear = 2003;
    const currentYear = new Date().getFullYear();
    const allYears = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i).reverse();


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

                setDatasetByYear(extractDatasetByYear(lineupsResponse.data, basicFigurinesResponse.data));

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

    function extractDatasetByYear(lineups, basicFigurines) {
        // gets the data in a specific year
        const figurinesByYear = basicFigurines
            .filter(f => f.status === 'RELEASED' || f.status === 'FUTURE_RELEASE')
            .filter(f => new Date(f.releaseDate).getFullYear() === selectedYear);

        const lineUpSeries = [];
        lineups.forEach((lineup) => {
            let total = figurinesByYear
                .filter(f => f.lineUp === lineup.key)
                .length;

            if (total !== 0) {
                lineUpSeries.push({ dataKey: lineup.key, label: lineup.description, value: total + " releases" });
            }
        });

        setSeriesByYear(lineUpSeries);

        const months = [
            { id: 0, value: 'Jan' }, { id: 1, value: 'Feb' }, { id: 2, value: 'Mar' }, { id: 3, value: 'Apr' }, { id: 4, value: 'May' }, { id: 5, value: 'June' },
            { id: 6, value: 'July' }, { id: 7, value: 'Aug' }, { id: 8, value: 'Sept' }, { id: 9, value: 'Oct' }, { id: 10, value: 'Nov' }, { id: 11, value: 'Dec' }
        ];

        let data = [];

        const monthProp = 'month';
        months.forEach((month) => {
            let obj = {};
            lineUpSeries.forEach((lseries) => {

                const total = figurinesByYear
                    .filter(f => new Date(f.releaseDate).getMonth() === month.id)
                    .filter(f => f.lineUp === lseries.dataKey)
                    .length;

                obj[lseries.dataKey] = total;
            });

            obj[monthProp] = month.value;
            data.push(obj);
        });

        return data;
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab icon={<PieChartIcon />} value="1" />
                        <Tab icon={<BarChartIcon />} value="2" />
                        <Tab icon={<TimelineIcon />} value="3" />
                    </TabList>
                </Box>
                {/* Pie Charts */}
                <TabPanel value="1">
                    {
                        loading ?
                            <Grid container spacing={2}>
                                <Grid size={4}>
                                    <CircularProgress />
                                </Grid>
                            </Grid>
                            :
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
                    }
                </TabPanel>
                <TabPanel value="2">
                    {
                        loading ?
                            <Grid container spacing={2}>
                                <Grid size={4}>
                                    <CircularProgress />
                                </Grid>
                            </Grid>
                            :
                            <Grid container spacing={2}>
                                <Grid width="100%">
                                    <TextField
                                        select
                                        sx={{ minWidth: 150 }}
                                        label="Select a year"
                                        value={selectedYear}
                                        onChange={(event) => setSelectedYear(event.target.value)}>

                                        {allYears.map((year) => (
                                            <MenuItem value={year}>{year}</MenuItem>
                                        ))}
                                    </TextField>
                                    <BarChartInfo title='Number of releases by year' dataset={datasetByYear} series={seriesByYear} />
                                </Grid>
                            </Grid>
                    }
                </TabPanel>
                <TabPanel value="3">
                    3
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default Dashboard;