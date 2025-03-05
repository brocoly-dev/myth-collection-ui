import axios from '../utils/axiosValidationInterceptor';
import { formatAmount, formatDate } from '../utils/formatters';

import { useState, useEffect } from "react";
import { Box, Card, CardMedia, Divider, ImageList, ImageListItem, Paper, Stack, styled, Tab, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid2';

const FigureView = ({ id }) => {
    const [figurine, setFigurine] = useState();
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/figurines/" + id);
                setFigurine(response.data);
            } catch (err) {
                console.log("Unable to fetch figurine");
            }
        };

        fetchData();
    }, [id]); // Runs only when 'id' changes.

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Figurine" value="1" />
                        <Tab label="Offical Gallery" value="2" />
                        <Tab label="Personal Gallery" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid size={8}>
                                <Card>
                                    <Box sx={{ position: 'relative' }}>
                                        {figurine ?
                                            <CardMedia
                                                sx={{
                                                    width: '100%', height: 'auto', objectFit: 'cover',
                                                    border: '3px solid rgba(238,225,49,1)', // Adding border on top
                                                }}
                                                component="img"
                                                image={figurine.officialImages[0]}
                                                alt={figurine.baseName}
                                                title={figurine.displayableName}
                                            /> : "No Data"}
                                        {/* Tamashii Nations Logo */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '95.7%',
                                                left: '85%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '7.5%', // You can adjust the size
                                                height: 'auto',
                                            }}
                                        >
                                            <CardMedia
                                                sx={{
                                                    width: '100%', height: 'auto', objectFit: 'cover',
                                                    border: '1px solid', // Adding border on top
                                                    borderRadius: '5px'
                                                }}
                                                component="img"
                                                image="https://imagizer.imageshack.com/img924/7518/J9vnSG.jpg"
                                                alt="Tamashii Nations"
                                            />
                                        </Box>
                                        {/* Bandai Logo */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '96%',
                                                left: '94%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '7.5%', // You can adjust the size
                                                height: 'auto',
                                            }}
                                        >
                                            <img
                                                src="https://imagizer.imageshack.com/img924/2/CXHXAG.png"
                                                alt="Bandai"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </Box>
                                        {/* Bandai Namco Logo */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '96%',
                                                left: '10%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '20%', // You can adjust the size
                                                height: 'auto',
                                            }}
                                        >
                                            <img
                                                src="https://imagizer.imageshack.com/img924/4739/icWjzi.png"
                                                alt="Bandai Namco"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </Box>
                                        {/* Saint Seiya Logo */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '6%',
                                                left: '13%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '20%', // You can adjust the size
                                                height: 'auto',
                                            }}
                                        >
                                            <img
                                                src="https://imagizer.imageshack.com/img924/2346/9VueKU.png"
                                                alt="Saint Seiya"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </Box>
                                        {/* Myth Cloth Logo */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '95%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '40%', // You can adjust the size
                                                height: 'auto',
                                            }}
                                        >
                                            <img
                                                src="https://imagizer.imageshack.com/img922/1037/VGb1UY.png"
                                                alt="Myth Cloth EX"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Typography variant="h6" sx={{
                                        padding: 0, background:
                                            'linear-gradient(90deg, rgba(238,225,49,0) 0%, rgba(238,225,49,1) 15%, rgba(238,225,49,1) 75%, rgba(238,225,49,0) 100%)',
                                    }}>
                                        {figurine ? figurine.displayableName : "No Data"}
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid size={4}>
                                <Stack spacing={2}>
                                    <Item>
                                        <img src="https://flagpedia.net/data/flags/w80/jp.png" alt="Flag of Japan" width="50" height="30" />
                                        <img src="https://flagpedia.net/data/flags/w80/hk.png" alt="Flag of Hong Kong" width="50" height="30" />
                                        <Typography variant="body1" fontWeight="bold">
                                            Price
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatAmount("22000")}
                                            <br />
                                            {formatAmount("24200.0")} (with tax included)
                                        </Typography>
                                        <br />
                                        <Divider />
                                        <Typography variant="body1" fontWeight="bold">
                                            First Announcement
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatDate("2024-07-11")}
                                        </Typography>
                                        <br />
                                        <Typography variant="body1" fontWeight="bold">
                                            Preorder Date
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatDate("2024-07-11")}
                                        </Typography>
                                        <br />
                                        <Typography variant="body1" fontWeight="bold">
                                            Release Date
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatDate("2024-07-11", false)}
                                        </Typography>
                                    </Item>
                                    <Item>
                                        <img src="https://flagpedia.net/data/flags/w80/mx.png" alt="Flag of Mexico" width="50" height="30" />
                                        <Typography variant="body1" fontWeight="bold">
                                            Price
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatAmount("3560", "MXN")}
                                        </Typography>
                                        <Typography variant="body1">
                                            Distribuited by DAM / DTM
                                        </Typography>
                                        <br />
                                        <Divider />
                                        <Typography variant="body1" fontWeight="bold">
                                            Preorder Date
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatDate("2024-07-11")}
                                        </Typography>
                                        <br />
                                        <Typography variant="body1" fontWeight="bold">
                                            Release Date
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatDate("2024-07-11")}
                                        </Typography>
                                    </Item>
                                    <Item>
                                        <Typography variant="body1" fontWeight="bold">
                                            <a href='https://tamashiiweb.com/item/15071' target="_blank" rel="noreferrer">Tamashii URL</a>
                                        </Typography>
                                        <br />
                                        <Typography variant="body1" fontWeight="bold">
                                            Distribution
                                        </Typography>
                                        <Typography variant="body1">
                                            Tamashii Web Shop
                                        </Typography>
                                    </Item>
                                    <Item>
                                        Shown for the first time in Tamashii 2024
                                    </Item>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
                <TabPanel value="2">
                    <ImageList
                        //sx={{ width: 500, height: 450 }}
                        variant="quilted"
                        cols={4}
                    //rowHeight={121}
                    >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                <img
                                    {...srcset(item.img, 121, item.rows, item.cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </Box>
    );
};

const itemData = [
    {
        img: 'https://imagizer.imageshack.com/img924/2310/lnglLN.jpg',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://imagizer.imageshack.com/img923/8481/tfpAjh.jpg',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://imagizer.imageshack.com/img922/1858/hEwegc.jpg',
        title: 'Basketball',
    },
    {
        img: 'https://imagizer.imageshack.com/img923/2160/e8ht8W.jpg',
        title: 'Fern',
    },
    {
        img: 'https://imagizer.imageshack.com/img924/9996/ZtOEBv.jpg',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://imagizer.imageshack.com/img923/8605/UFYAIF.jpg',
        title: 'Tomato basil',
    },
    {
        img: 'https://imagizer.imageshack.com/img922/6605/RZtMYe.jpg',
        title: 'Sea star',
    },
    {
        img: 'https://imagizer.imageshack.com/img923/4395/jNzBws.jpg',
        title: 'Bike',
        cols: 2,
    },
]

export default FigureView;
