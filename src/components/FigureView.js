import axios from '../utils/axiosValidationInterceptor';
import { formatAmount, formatDate, parseDateWithoutTimezone } from '../utils/formatters';

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
                {/* The main figurine */}
                <TabPanel value="1">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid size={8}>
                                <Card>
                                    <Box sx={{ position: 'relative' }}>
                                        {figurine ?
                                            <CardMedia
                                                sx={getFigurineBorder(figurine)}
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
                                            {figurine && showLogo(figurine) && showLogoSince(figurine, '2011-08-01') &&
                                                <CardMedia
                                                    sx={{
                                                        width: '100%', height: 'auto', objectFit: 'cover',
                                                        border: '1px solid', // Adding border on top
                                                        borderRadius: '5px'
                                                    }}
                                                    component="img"
                                                    image="https://imagizer.imageshack.com/img924/7518/J9vnSG.jpg"
                                                    alt="Tamashii Nations"
                                                />}
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
                                            {figurine && showLogo(figurine) &&
                                                <img
                                                    src={getBandaiLogoUrl(figurine)}
                                                    alt="Bandai"
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        objectFit: 'contain',
                                                    }}
                                                />}
                                        </Box>
                                        {/* Bandai Namco Logo */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '93%',
                                                left: '10%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '20%', // You can adjust the size
                                                height: 'auto',
                                            }}
                                        >
                                            {figurine && showLogo(figurine) && showLogoSince(figurine, '2022-09-01') &&
                                                <img
                                                    src="https://imagizer.imageshack.com/img924/4739/icWjzi.png"
                                                    alt="Bandai Namco"
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        objectFit: 'contain',
                                                    }}
                                                />}
                                        </Box>
                                        {/* Saint Seiya Logo */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '7%',
                                                left: '88%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '20%', // You can adjust the size
                                                height: 'auto',
                                            }}
                                        >
                                            {figurine && showLogo(figurine) &&
                                                <img
                                                    src={getSaintSeiyaLogoUrl(figurine)}
                                                    alt="Saint Seiya"
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        objectFit: 'contain',
                                                    }}
                                                />}
                                        </Box>
                                        {/* Myth Cloth Logo */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '7%',
                                                left: '18%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '30%', // You can adjust the size
                                                height: 'auto',
                                            }}
                                        >
                                            {figurine && showLogo(figurine) &&
                                                <img
                                                    src={getMythClothLogoUrl(figurine)}
                                                    alt="Myth Cloth"
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        objectFit: 'contain',
                                                    }}
                                                />}
                                        </Box>
                                        {/* Metal EX Logo */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '96%',
                                                left: '72.5%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '15%', // You can adjust the size
                                                height: 'auto',
                                            }}
                                        >
                                            {figurine && showLogo(figurine) && showLogoMetal(figurine) &&
                                                <img
                                                    src="https://imagizer.imageshack.com/img922/7926/yyB2xG.jpg"
                                                    alt="Metal EX"
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        objectFit: 'contain',
                                                    }}
                                                />}
                                        </Box>
                                    </Box>
                                    <Typography variant="h6" sx={getFigurineRevival(figurine)}>
                                        {figurine ? figurine.displayableName : "No Data"}
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid size={4}>
                                <Stack spacing={2}>
                                    <Item>
                                        <img src={figurine && figurine.hk ? "https://flagpedia.net/data/flags/w80/hk.png" : "https://flagpedia.net/data/flags/w80/jp.png"} alt="Flag" width="50" height="30" />
                                        <Typography variant="body1" fontWeight="bold">
                                            Price
                                        </Typography>
                                        <Typography variant="body1">
                                            {figurine && figurine.distributionJPY ? formatAmount(figurine.distributionJPY.basePrice) : "To be defined"}
                                            <br />
                                            {figurine && figurine.distributionJPY ? formatAmount(figurine.distributionJPY.finalPrice) + " (with tax included)" : "To be defined"}
                                        </Typography>
                                        <br />
                                        <Divider />
                                        {figurine && figurine.distributionJPY && figurine.distributionJPY.firstAnnouncementDate &&
                                            <>
                                                <Typography variant="body1" fontWeight="bold">
                                                    First Announcement
                                                </Typography>
                                                <Typography variant="body1">
                                                    {formatDate(figurine.distributionJPY.firstAnnouncementDate)}
                                                </Typography>
                                                <br />
                                            </>
                                        }
                                        {figurine && figurine.distributionJPY && figurine.distributionJPY.preOrderDate &&
                                            <>
                                                <Typography variant="body1" fontWeight="bold">
                                                    Preorder Date
                                                </Typography>
                                                <Typography variant="body1">
                                                    {formatDate(figurine.distributionJPY.preOrderDate)}
                                                </Typography>
                                                <br />
                                            </>
                                        }
                                        {figurine && figurine.distributionJPY && figurine.distributionJPY.releaseDate &&
                                            <>
                                                <Typography variant="body1" fontWeight="bold">
                                                    Release Date
                                                </Typography>
                                                <Typography variant="body1">
                                                    {formatDate(figurine.distributionJPY.releaseDate, figurine.distributionJPY.releaseDateConfirmed)}
                                                </Typography>
                                            </>}
                                    </Item>
                                    {figurine && figurine.distributionMXN &&
                                        <Item>
                                            <img src="https://flagpedia.net/data/flags/w80/mx.png" alt="Flag of Mexico" width="50" height="30" />
                                            {figurine.distributionMXN.basePrice &&
                                                <>
                                                    <Typography variant="body1" fontWeight="bold">
                                                        Price
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {formatAmount(figurine.distributionMXN.basePrice, "MXN")}
                                                    </Typography>
                                                </>}
                                            {figurine.distributionMXN.distributor &&
                                                <>
                                                    <Typography variant="body1">
                                                        Distributed by {figurine.distributionMXN.distributor.name}
                                                    </Typography>
                                                </>}
                                            <br />
                                            <Divider />
                                            {figurine.distributionMXN.preOrderDate &&
                                                <>
                                                    <Typography variant="body1" fontWeight="bold">
                                                        Preorder Date
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {formatDate(figurine.distributionMXN.preOrderDate)}
                                                    </Typography>
                                                    <br />
                                                </>}
                                            {figurine.distributionMXN.releaseDate &&
                                                <>
                                                    <Typography variant="body1" fontWeight="bold">
                                                        Release Date
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {formatDate(figurine.distributionMXN.releaseDate)}
                                                    </Typography>
                                                    <br />
                                                </>}
                                        </Item>}
                                    <Item hidden={figurine && (figurine.tamashiiUrl && figurine.distributionChannel ? false : true)}>
                                        {figurine && figurine.tamashiiUrl &&
                                            <>
                                                <Typography variant="body1" fontWeight="bold">
                                                    <a href={figurine.tamashiiUrl} target="_blank" rel="noreferrer">Tamashii URL</a>
                                                </Typography>
                                                <br />
                                            </>
                                        }
                                        {figurine && figurine.distributionChannel && figurine.distributionChannel.distribution &&
                                            <>
                                                <Typography variant="body1" fontWeight="bold">
                                                    Distribution
                                                </Typography>
                                                <Typography variant="body1">
                                                    {figurine.distributionChannel.distribution}
                                                </Typography>
                                                <br />
                                            </>
                                        }
                                    </Item>
                                    {figurine && figurine.remarks &&
                                        <Item>
                                            {figurine.remarks}
                                        </Item>
                                    }
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
                {/* Official Gallery */}
                <TabPanel value="2">
                    {figurine &&
                        <ImageList
                            variant="masonry"
                            cols={2} gap={10}
                        >
                            {getOfficialImages(figurine).map((item) => (
                                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                    <img
                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>}
                </TabPanel>
                <TabPanel value="3">No data to show yet</TabPanel>
            </TabContext>
        </Box>
    );
};

function getOfficialImages(figurine) {
    let images = [];

    figurine.officialImages.forEach(imageUrl => {

        images.push({
            img: imageUrl,
            title: 'Title',
        });

    });

    return images;
}

function getFigurineRevival(figurine) {
    if (figurine && figurine.revival) {
        return {
            padding: 0, background: 'linear-gradient(90deg, rgba(238,225,49,0) 0%, ' + determineColorFigurine(figurine) + ' 15%, ' + determineColorFigurine(figurine) + ' 75%, rgba(238,225,49,0) 100%)'
        };
    } else {
        return {};
    }
}
function getFigurineBorder(figurine) {
    return {
        width: '100%', height: 'auto', objectFit: 'cover',
        border: '4px solid ' + determineColorFigurine(figurine), // Adding border on top
    }
}

function determineColorFigurine(figurine) {
    if (figurine.category === "V1") {
        return "#f2f2f2";
    }
    if (figurine.category === "V2") {
        return "#4f5061";
    }
    if (figurine.category === "V3") {
        return "#3b5c77";
    }
    if (figurine.category === "V4") {
        return "#00d3ff";
    }
    if (figurine.category === "V5") {
        return "#008eff";
    }
    if (figurine.category === "SECONDARY") {
        return "#71a3c1";
    }
    if (figurine.category === "BLACK") {
        return "#222222";
    }
    if (figurine.category === "STEEL") {
        return "#6a6a6a";
    }
    if (figurine.category === "SILVER") {
        return "#9e9e9e";
    }
    if (figurine.category === "GOLD") {
        return "#efe031";
    }
    if (figurine.category === "ROBE") {
        return "#0967c3";
    }
    if (figurine.category === "SCALE") {
        return "#269fe0";
    }
    if (figurine.category === "SURPLICE") {
        return "#4d1c8d";
    }
    if (figurine.category === "SPECTER") {
        return "#332584";
    }
    if (figurine.category === "JUDGE") {
        return "#3f6178";
    }
    if (figurine.category === "GOD") {
        return "#b6b6b6";
    }
    if (figurine.category === "INHERITOR") {
        return "#ffe066";
    }
}

function showLogo(figurine) {
    return figurine.status === "RELEASE_TBD" || figurine.status === "UNRELEASED" || figurine.status === "PROTOTYPE" ? false : true;
}

function showLogoMetal(figurine) {
    return figurine.metal ? true : false;
}

function showLogoSince(figurine, since) {
    const date1 = parseDateWithoutTimezone(figurine.distributionJPY.releaseDate);
    const date2 = parseDateWithoutTimezone(since);

    return date2 < date1;
}

function getBandaiLogoUrl(figurine) {
    const date1 = parseDateWithoutTimezone(figurine.distributionJPY.releaseDate);
    const date2 = parseDateWithoutTimezone("2018-09-01");

    return date2 < date1 ? "https://imagizer.imageshack.com/img924/2/CXHXAG.png" : "https://imagizer.imageshack.com/img923/7251/NOL0Ug.png";
}

function getSaintSeiyaLogoUrl(figurine) {
    if (figurine.series === "SAINT_SEIYA" || figurine.series === "SOG" || figurine.series === "SS_THE_BEGINNING") {
        return "https://imagizer.imageshack.com/img924/2346/9VueKU.png";
    } else if (figurine.series === "SAINTIA_SHO") {
        return "https://imagizer.imageshack.com/img923/600/RXqlRv.png";
    } else if (figurine.series === "SS_LEGEND_OF_SANCTUARY") {
        return "https://imagizer.imageshack.com/img923/8313/4JvCfr.png";
    } else if (figurine.series === "SS_OMEGA") {
        return "https://imagizer.imageshack.com/img922/9725/chj3ty.png";
    } else if (figurine.series === "LOST_CANVAS") {
        return "https://imagizer.imageshack.com/img924/9421/eT36Aj.png";
    } else {
        return "";
    }
}

function getMythClothLogoUrl(figurine) {
    if (figurine.lineUp === "MYTH_CLOTH_EX") {
        return "https://imagizer.imageshack.com/img922/1037/VGb1UY.png";
    } else if (figurine.lineUp === "MYTH_CLOTH") {
        return "https://imagizer.imageshack.com/img924/6752/iUnW9X.png";
    } else if (figurine.lineUp === "APPENDIX") {
        return "https://imagizer.imageshack.com/img924/4460/ie9qrP.png";
    } else if (figurine.lineUp === "SC_LEGEND") {
        return "https://imagizer.imageshack.com/img923/1657/Q5BSqo.png";
    } else if (figurine.lineUp === "FIGUARTS") {
        return "https://imagizer.imageshack.com/img924/8374/u8fqwi.png";
    } else if (figurine.lineUp === "FIGUARTS_ZERO") {
        return "https://imagizer.imageshack.com/img924/3571/4Lb8pL.png";
    } else if (figurine.lineUp === "SC_CROWN") {
        return "https://imagizer.imageshack.com/img922/4038/bdn9mi.png";
    } else if (figurine.lineUp === "DDP") {
        return "https://imagizer.imageshack.com/img923/9839/zPtgsH.png";
    } else {
        return "";
    }
}


export default FigureView;
