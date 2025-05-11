import axios from '../utils/axiosValidationInterceptor';
import { formatAmount, formatDate } from '../utils/formatters';
import { findColorByCategory, findMythClothLogoByLineUp } from '../utils/commons';

import { Autocomplete, Box, Card, CardActionArea, CardContent, CardMedia, Divider, Skeleton, Stack, TextField, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";

import Grid from '@mui/material/Grid2';


const FigureListing = ({ navigate }) => {
    // State to store the flag to open and hide the dialog
    const [loading, setLoading] = useState(true);
    // State to store the list of figurines
    const [figurines, setFigurines] = useState([]);
    // State to store the list of figurine names
    const [figurineNames, setFigurineNames] = useState([]);

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
    }, []); // Empty dependency array means this runs once when the component mounts


    function extractFigurineNames(figurines) {
        const allNames = figurines.map(f => f.displayableName);
        const uniqueNames = [...new Set(allNames)].sort((a, b) =>
            a.toLowerCase().localeCompare(b.toLowerCase())
        );

        return uniqueNames
            .map(name => ({
                label: name
            }));
    }

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Optional: prevent default form submission
            //console.log('Typed value:', event.target.value);
        }
    };

    const handleClickOpen = (figurine) => {
        navigate('/mythcloth/figurine-' + figurine.id);
    };

    return loading ? (
        <Stack direction={"column"}
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={.5}
            sx={{
                alignItems: "stretch"
            }}
        >
            <Stack direction={"row"} spacing={2}>
                <Grid container spacing={2}>
                    {Array.from({ length: 15 }).map((_, index) => (
                        <Stack spacing={1}>
                            <Skeleton variant="rectangular" width={200} height={240} />
                            <Skeleton variant="rectangular" width={200} height={70} />
                        </Stack>
                    ))}
                </Grid>
            </Stack>
        </Stack>
    ) : (
        <Stack direction={"column"}
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={.5}
            sx={{
                alignItems: "stretch"
            }}
        >
            <Stack direction={"row"} spacing={2}>
                <Autocomplete
                    size="small"
                    disablePortal
                    options={figurineNames}
                    sx={{ width: 420 }}
                    renderInput={(params) => <TextField {...params} label="Find a figurine" onKeyDown={handleEnterKey} />}
                    slotProps={{
                        listbox: {
                            style: {
                                whiteSpace: 'nowrap',         // Prevent wrapping
                                //overflow: 'hidden',           // Hide overflow
                                textOverflow: 'ellipsis',     // Show ellipsis
                                maxWidth: '100%',             // Ensure it doesn't overflow container
                            },
                        },
                    }}
                />
                <label>s</label>
            </Stack>

            <Grid container spacing={2}>
                {figurines.map((figurine) => (
                    <Card sx={{
                        minWidth: 200,
                        maxWidth: 200,
                        borderRadius: 1, // optional rounded corners
                        boxShadow: 'none', // remove default shadow if desired
                    }}>
                        <CardActionArea>
                            {/* Background image */}
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
                            {/* Logo overlay */}
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
                            {/* Ribbon */}
                            {figurine.revival &&
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: -40,
                                        backgroundColor: 'red',
                                        color: 'white',
                                        padding: '4px 40px',
                                        transform: 'rotate(45deg)',
                                        fontWeight: 'bold',
                                        fontSize: 12,
                                        zIndex: 1,
                                    }}
                                >
                                    Revival
                                </Box>
                            }
                            {figurine.metal &&
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: -40,
                                        backgroundColor: '#38322b',
                                        color: '#efe8cb',
                                        padding: '4px 40px',
                                        transform: 'rotate(45deg)',
                                        fontWeight: 'bold',
                                        fontSize: 12,
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
                                    <b>
                                        {figurine.displayableName}
                                        <br />
                                        {figurine.status === "RELEASED" || figurine.status === "FUTURE_RELEASE" ? formatAmount(figurine.distributionJPY.finalPrice) : ""}
                                    </b>
                                    {figurine.status === "FUTURE_RELEASE" ?
                                        <>
                                            <p />
                                            <div style={{ fontSize: '10px' }}>
                                                Scheduled for released in {formatDate(figurine.distributionJPY.releaseDate, figurine.distributionJPY.releaseDateConfirmed)}
                                            </div>
                                        </>
                                        : figurine.status === "UNRELEASED" || figurine.status === "PROTOTYPE" ?
                                            <>
                                                <p />
                                                <div style={{ fontSize: '10px' }}>
                                                    First appearance in {formatDate(figurine.distributionJPY.firstAnnouncementDate, true)}
                                                </div>
                                            </>
                                            : ""}
                                </Tooltip>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Grid>
        </Stack>
    );
};

export default FigureListing;