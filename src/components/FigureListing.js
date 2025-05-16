import { Autocomplete, Box, Card, CardActionArea, CardContent, CardMedia, Collapse, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, Stack, TextField, Tooltip, Typography } from '@mui/material';
import axios from '../utils/axiosValidationInterceptor';

import { useState, useEffect } from "react";

import OpenFilterIcon from '@mui/icons-material/FilterList';
import HideFilterIcon from '@mui/icons-material/FilterListOff';

import Grid from '@mui/material/Grid2';
import { formatAmount, formatDate } from '../utils/formatters';
import { findColorByCategory, findMythClothLogoByLineUp, findRevivalColorByFigurine } from '../utils/commons';

import BasicBooleanFiltering from './BasicBooleanFiltering.js';

const FigureListing = ({ navigate }) => {
    const [loading, setLoading] = useState(true);
    const [figurines, setFigurines] = useState([]);

    // filter section
    const [showFilters, setShowFilters] = useState(false);

    const [figurineNames, setFigurineNames] = useState([]);
    const [figurineFinderValue, setFigurineFinderValue] = useState(null);

    const [lineups, setLineups] = useState([]);
    const [lineUpSelectedOption, setLineUpSelectedOption] = useState('');

    const [categories, setCategories] = useState([]);
    const [categorySelectedOption, setCategorySelectedOption] = useState('');

    const [series, setSeries] = useState([]);
    const [seriesSelectedOption, setSeriesSelectedOption] = useState('');

    const [metalSelectedOption, setMetalSelectedOption] = useState('');
    const [oceSelectedOption, setOceSelectedOption] = useState('');
    const [revivalSelectedOption, setRevivalSelectedOption] = useState('');
    const [hkSelectedOption, setHkSelectedOption] = useState('');
    const [goldenSelectedOption, setGoldenSelectedOption] = useState('');
    const [goldSelectedOption, setGoldSelectedOption] = useState('');
    const [brokenSelectedOption, setBrokenSelectedOption] = useState('');
    const [plainSelectedOption, setPlainSelectedOption] = useState('');
    const [comicSelectedOption, setComicSelectedOption] = useState('');
    const [setSelectedOption, setSetSelectedOption] = useState('');

    // Pagination section
    const MAX_RECORDS_PER_PAGE = 30;
    const [page, setPage] = useState(1);


    // Fetch the data when the component mounts
    useEffect(() => {
        axios.get('/figurines')
            .then(function (response) {
                setFigurines(response.data); // Assume response.data is an array of objects
                setFigurineNames(extractFigurineNames(response.data));
                setLoading(false);
            }).catch(function (error) {
                setLoading(true);
                // If the error is a validation error from backend
                if (error.response && error.response.data) {
                    // handle error
                    const backendErrors = error.response.data;
                    console.error("Error retrieving the figurines", backendErrors);
                } else {
                    // Handle other errors (e.g., network issues)
                    console.error("Error getting the figurines", error);
                }
            });
        axios.get('/lineups')
            .then(function (response) {
                setLineups(response.data);  // Assume response.data is an array of objects
            }).catch(function (error) {
                // If the error is a validation error from backend
                if (error.response && error.response.data) {
                    // handle error
                    const backendErrors = error.response.data;
                    console.error("Error retrieving the lineUps", backendErrors);
                } else {
                    // Handle other errors (e.g., network issues)
                    console.error("Error getting the linesUps", error);
                }
            });
        axios.get('/categories')
            .then(function (response) {
                setCategories(response.data);  // Assume response.data is an array of objects
            }).catch(function (error) {
                // If the error is a validation error from backend
                if (error.response && error.response.data) {
                    // handle error
                    const backendErrors = error.response.data;
                    console.error("Error retrieving the categories", backendErrors);
                } else {
                    // Handle other errors (e.g., network issues)
                    console.error("Error getting the categories", error);
                }
            });
        axios.get('/series')
            .then(function (response) {
                setSeries(response.data);  // Assume response.data is an array of objects
            }).catch(function (error) {
                // If the error is a validation error from backend
                if (error.response && error.response.data) {
                    // handle error
                    const backendErrors = error.response.data;
                    console.error("Error retrieving the series", backendErrors);
                } else {
                    // Handle other errors (e.g., network issues)
                    console.error("Error getting the series", error);
                }
            });
    }, []); // Empty dependency array means this runs once when the component mounts



    // filter by text
    let filteredFigurines = figurineFinderValue === null ? figurines : figurines.filter(f => f.displayableName.toLowerCase().includes(figurineFinderValue.toLowerCase()));
    // filter by lineUp
    if (lineUpSelectedOption.length !== 0) {
        const index = lineUpSelectedOption.indexOf("|");
        const lineUpValue = lineUpSelectedOption.substring(0, index);
        filteredFigurines = filteredFigurines.filter(f => f.lineUp === lineUpValue);
    }
    // filter by category
    if (categorySelectedOption.length !== 0) {
        const index = categorySelectedOption.indexOf("|");
        const categoryValue = categorySelectedOption.substring(0, index);
        filteredFigurines = filteredFigurines.filter(f => f.category === categoryValue);
    }
    // filter by series
    if (seriesSelectedOption.length !== 0) {
        const index = seriesSelectedOption.indexOf("|");
        const seriesValue = seriesSelectedOption.substring(0, index);
        filteredFigurines = filteredFigurines.filter(f => f.series === seriesValue);
    }
    // filter by metal
    if (metalSelectedOption.length !== 0) {
        filteredFigurines = filteredFigurines.filter(f => f.metal.toString() === metalSelectedOption);
    }
    // filter by oce
    if (oceSelectedOption.length !== 0) {
        filteredFigurines = filteredFigurines.filter(f => f.oce.toString() === oceSelectedOption);
    }
    // filter by revival
    if (revivalSelectedOption.length !== 0) {
        filteredFigurines = filteredFigurines.filter(f => f.revival.toString() === revivalSelectedOption);
    }
    // filter by hk
    if (hkSelectedOption.length !== 0) {
        filteredFigurines = filteredFigurines.filter(f => f.hk.toString() === hkSelectedOption);
    }
    // filter by golden
    if (goldenSelectedOption.length !== 0) {
        filteredFigurines = filteredFigurines.filter(f => f.golden.toString() === goldenSelectedOption);
    }
    // filter by gold
    if (goldSelectedOption.length !== 0) {
        filteredFigurines = filteredFigurines.filter(f => f.gold.toString() === goldSelectedOption);
    }
    // filter by broken
    if (brokenSelectedOption.length !== 0) {
        filteredFigurines = filteredFigurines.filter(f => f.broken.toString() === brokenSelectedOption);
    }
    // filter by plain
    if (plainSelectedOption.length !== 0) {
        filteredFigurines = filteredFigurines.filter(f => f.plain.toString() === plainSelectedOption);
    }
    // filter by comic
    if (comicSelectedOption.length !== 0) {
        filteredFigurines = filteredFigurines.filter(f => f.comic.toString() === comicSelectedOption);
    }
    // filter by set
    if (setSelectedOption.length !== 0) {
        filteredFigurines = filteredFigurines.filter(f => f.set.toString() === setSelectedOption);
    }


    const displayableFigurinesPerPage = filteredFigurines.slice(
        (page - 1) * MAX_RECORDS_PER_PAGE,
        page * MAX_RECORDS_PER_PAGE
    );

    const extractFigurineNames = (figurines) => {
        const allNames = figurines.map(f => f.displayableName);
        const uniqueNames = [...new Set(allNames)].sort((a, b) =>
            a.toLowerCase().localeCompare(b.toLowerCase())
        );
        return uniqueNames;
    }

    const handleClickOpen = (figurine) => {
        navigate('/mythcloth/figurine-' + figurine.id);
    };

    return loading ? (
        <label>s</label>
    ) : (
        <Stack
            direction="column"
            spacing={0}
            sx={{ border: '0px solid gray', padding: 0, alignItems: "stretch" }}
        >
            <Box sx={{ border: '0px solid gray', padding: 0, display: 'flex', justifyContent: 'flex-start' }} >
                <Tooltip title={showFilters ? "Hide filters" : "Show filter options"}>
                    <IconButton onClick={() => setShowFilters(prev => !prev)} aria-label="Toggle Filters">
                        {showFilters ? <HideFilterIcon /> : <OpenFilterIcon />}
                    </IconButton>
                </Tooltip>
            </Box>
            <Collapse in={showFilters} timeout="auto">
                <Box sx={{ border: '0px solid gray', padding: 0 }} >
                    <Grid container spacing={1.5}>
                        <Autocomplete
                            id="free-solo-id"
                            freeSolo
                            size="small"
                            options={figurineNames}
                            value={figurineFinderValue}
                            onChange={(event, newValue) => {
                                setFigurineFinderValue(newValue);
                            }}
                            sx={{ width: 360 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Find a figurine"
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            type: 'search',
                                        },
                                    }}
                                />
                            )}
                        />
                        <FormControl size="small" variant="outlined">
                            <InputLabel id="line-up-label">Line Up</InputLabel>
                            <Select
                                labelId="line-up-label"
                                label="Line Up"
                                name="lineUp"
                                sx={{ width: 360 }}
                                value={lineUpSelectedOption}
                                onChange={(event) => {
                                    setLineUpSelectedOption(event.target.value);
                                }}
                            >
                                {/* Render the MenuItem components based on the fetched data */}
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                {lineups.map((item) => (
                                    <MenuItem key={item.key} value={item.key + '|' + item.description}>
                                        {item.description}  {/* Display the item name, adjust to match your object structure */}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl size="small" variant="outlined">
                            <InputLabel id="category-label">Group</InputLabel>
                            <Select
                                labelId="category-label"
                                label="Group"
                                name="group"
                                sx={{ width: 360 }}
                                value={categorySelectedOption}
                                onChange={(event) => {
                                    setCategorySelectedOption(event.target.value);
                                }}
                            >
                                {/* Render the MenuItem components based on the fetched data */}
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                {categories.map((item) => (
                                    <MenuItem key={item.key} value={item.key + '|' + item.description}>
                                        {item.description}  {/* Display the item name, adjust to match your object structure */}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl size="small" variant="outlined">
                            <InputLabel id="series-label">Series</InputLabel>
                            <Select
                                labelId="series-label"
                                label="Series"
                                name="series"
                                sx={{ width: 360 }}
                                value={seriesSelectedOption}
                                onChange={(event) => {
                                    setSeriesSelectedOption(event.target.value);
                                }}
                            >
                                {/* Render the MenuItem components based on the fetched data */}
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                {series.map((item) => (
                                    <MenuItem key={item.key} value={item.key + '|' + item.description}>
                                        {item.description}  {/* Display the item name, adjust to match your object structure */}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <BasicBooleanFiltering
                            id="metal"
                            label="Metal Body"
                            trueValue='EX Metal Body'
                            falseValue='Regular Body'
                            valueSelected={metalSelectedOption}
                            onChangeFiltering={(newValue) => { setMetalSelectedOption(newValue); }}
                        />
                        <BasicBooleanFiltering
                            id="oce"
                            label="OCE"
                            trueValue='Original Color Edition'
                            falseValue='Regular Color'
                            valueSelected={oceSelectedOption}
                            onChangeFiltering={(newValue) => { setOceSelectedOption(newValue); }}
                        />
                        <BasicBooleanFiltering
                            id="revival"
                            label="Revival Version"
                            trueValue='Revival Edition'
                            falseValue='Non-revival'
                            valueSelected={revivalSelectedOption}
                            onChangeFiltering={(newValue) => { setRevivalSelectedOption(newValue); }}
                        />
                        <BasicBooleanFiltering
                            id="hk"
                            label="Hong Kong Ed."
                            trueValue='Hk Edition'
                            falseValue='JP Edition'
                            valueSelected={hkSelectedOption}
                            onChangeFiltering={(newValue) => { setHkSelectedOption(newValue); }}
                        />
                        <BasicBooleanFiltering
                            id="golden"
                            label="Golden Version"
                            trueValue='Golden'
                            falseValue='Regular'
                            valueSelected={goldenSelectedOption}
                            onChangeFiltering={(newValue) => { setGoldenSelectedOption(newValue); }}
                        />
                        <BasicBooleanFiltering
                            id="gold"
                            label="True Gold Version"
                            trueValue='18K or 24K'
                            falseValue='Regular'
                            valueSelected={goldSelectedOption}
                            onChangeFiltering={(newValue) => { setGoldSelectedOption(newValue); }}
                        />
                        <BasicBooleanFiltering
                            id="broken"
                            label="Broken Armor"
                            trueValue='Broken'
                            falseValue='Non-broken'
                            valueSelected={brokenSelectedOption}
                            onChangeFiltering={(newValue) => { setBrokenSelectedOption(newValue); }}
                        />
                        <BasicBooleanFiltering
                            id="plain"
                            label="Plain Cloth"
                            trueValue='Plain Cloth'
                            falseValue='Non-Plain Cloth'
                            valueSelected={plainSelectedOption}
                            onChangeFiltering={(newValue) => { setPlainSelectedOption(newValue); }}
                        />
                        <BasicBooleanFiltering
                            id="comic"
                            label="Manga version"
                            trueValue='Manga'
                            falseValue='Non-manga'
                            valueSelected={comicSelectedOption}
                            onChangeFiltering={(newValue) => { setComicSelectedOption(newValue); }}
                        />
                        <BasicBooleanFiltering
                            id="set"
                            label="Comes as a Set"
                            trueValue='yes'
                            falseValue='no'
                            valueSelected={setSelectedOption}
                            onChangeFiltering={(newValue) => { setSetSelectedOption(newValue); }}
                        />
                    </Grid>
                </Box>
            </Collapse>
            <Box sx={{ border: '0px solid gray', padding: 1 }} >
                <Typography variant='caption'>
                    {filteredFigurines.length} figurines found
                </Typography>
            </Box>
            <Box sx={{
                border: '0px solid gray',
                padding: 0,
                height: '60vh',
                overflow: 'auto',           // Enables scrollbars when content overflows
            }} >
                <Grid container spacing={4.5}>
                    {displayableFigurinesPerPage.map((figurine) => (
                        <Card key={figurine.id} sx={{
                            minWidth: 200,
                            maxWidth: 200,
                            borderRadius: 1, // optional rounded corners
                            boxShadow: 'none', // remove default shadow if desired
                        }}>
                            <CardActionArea>
                                {/* Figurine image */}
                                <CardMedia
                                    component="img"
                                    image={figurine.officialImages ? figurine.officialImages[0] : "-"}
                                    onDoubleClick={() => handleClickOpen(figurine)}
                                    sx={{
                                        cursor: 'pointer',
                                        border: '2.5px solid ' + findColorByCategory(figurine.category),
                                        width: '200px',
                                        height: '260px',
                                        objectFit: 'cover', // crop to fill
                                        filter: figurine.status === 'UNRELEASED' || figurine.status === 'RELEASE_TBD' ? 'grayscale(100%)' : 'none',
                                        transform: 'scale(1)',
                                        transition: 'filter 0.4s ease, transform 0.4s ease',
                                        '&:hover': {
                                            filter: 'none',
                                            transform: 'scale(1.05)',
                                        }
                                    }} />
                                {/* Figurine Lineup */}
                                <Box
                                    component="img"
                                    src={findMythClothLogoByLineUp(figurine.lineUp)}
                                    alt="Logo"
                                    sx={{
                                        position: 'absolute',
                                        top: 7,
                                        left: 5,
                                        width: 65
                                    }}
                                />
                                {/* Ribbon Revival */}
                                {figurine.revival && <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 10,
                                        right: -40,
                                        backgroundColor: findRevivalColorByFigurine(figurine.category),
                                        color: '#1f1e25',
                                        padding: '4px 40px',
                                        transform: 'rotate(45deg)',
                                        fontWeight: 'bold',
                                        fontSize: 10,
                                        zIndex: 1,
                                    }}
                                >
                                    Revival
                                </Box>
                                }
                                {/* Ribbon Metal */}
                                {figurine.metal &&
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            right: -40,
                                            backgroundColor: '#38322b',
                                            color: '#efe8cb',
                                            padding: '4px 40px',
                                            transform: 'rotate(45deg)',
                                            fontWeight: 'bold',
                                            fontSize: 10,
                                            zIndex: 1,
                                        }}
                                    >
                                        EX Metal
                                    </Box>
                                }
                                <CardContent>
                                    <Tooltip title={figurine.status === "UNRELEASED" || figurine.status === "PROTOTYPE" || figurine.status === "RELEASE_TBD" || figurine.status === "FUTURE_RELEASE" ? "" :
                                        (formatDate(figurine.distributionJPY.releaseDate, figurine.distributionJPY.releaseDateConfirmed))
                                    }>
                                        <Typography variant="subtitle3" sx={{ fontWeight: 'bold' }} gutterBottom>
                                            {figurine.displayableName}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} gutterBottom>
                                            {figurine.status === "RELEASED" || figurine.status === "FUTURE_RELEASE" ? formatAmount(figurine.distributionJPY.finalPrice) : ""}
                                        </Typography>
                                        {figurine.status === "FUTURE_RELEASE" ?
                                            <Typography variant="caption" sx={{ fontSize: '9.5px' }}>
                                                Scheduled for release in {formatDate(figurine.distributionJPY.releaseDate, figurine.distributionJPY.releaseDateConfirmed)}
                                            </Typography>
                                            : figurine.status === "UNRELEASED" || figurine.status === "PROTOTYPE" ?
                                                <Typography variant="caption" sx={{ fontSize: '9.5px' }}>
                                                    First appearance in {formatDate(figurine.distributionJPY.firstAnnouncementDate, true)}
                                                </Typography>
                                                : ""}
                                    </Tooltip>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ border: '0px solid gray', paddingTop: 1 }} >
                <Pagination count={Math.ceil(filteredFigurines.length / MAX_RECORDS_PER_PAGE)}
                    page={page}
                    onChange={(event, value) => {
                        setPage(value);
                    }}
                    color="primary"
                    showFirstButton showLastButton />
            </Box>
        </Stack>
    );
};
export default FigureListing;