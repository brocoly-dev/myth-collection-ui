

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from 'react';
import { CardMedia, Card, ImageList, ImageListItem, Typography } from '@mui/material';

import Divider from '@mui/material/Divider';



import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';


import { formatAmount, formatDate } from '../utils';




const FigureView = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    const data = [
        { label: 'Name', value: 'John Doe' },
        { label: 'Age', value: '30' },
        { label: 'Email', value: 'john.doe@example.com' },
        { label: 'Location', value: 'New York' }
    ];

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
                        <Tab label="Detail" value="1" />
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
                                        <CardMedia
                                            sx={{
                                                width: '100%', height: 'auto', objectFit: 'cover',
                                                border: '3px solid rgba(238,225,49,1)', // Adding border on top
                                            }}
                                            component="img"
                                            image="https://imagizer.imageshack.com/v2/1024x768q70/923/tfpAjh.jpg"
                                            alt="Pegasus Seiya [Final Bronze Cloth] ~Golden Limited Edition~"
                                            title="Pegasus Seiya [Final Bronze Cloth] ~Golden Limited Edition~"
                                        />
                                        {/* Logo Overlay */}

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
                                                alt="Pegasus Seiya [Final Bronze Cloth] ~Golden Limited Edition~"
                                                title="Pegasus Seiya [Final Bronze Cloth] ~Golden Limited Edition~"
                                            />


                                        </Box>

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
                                                alt="example"
                                                alt="Logo"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </Box>

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
                                                alt="example"
                                                alt="Logo"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </Box>




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
                                                alt="example"
                                                alt="Logo"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </Box>
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
                                        Cygnus Hyoga [Final Bronze Cloth]
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
                                        <Divider/>
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
                                        <Divider/>
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
                                            <a href='https://tamashiiweb.com/item/15071' target="_blank">Tamashii URL</a>
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
}
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