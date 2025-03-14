import axios from '../utils/axiosValidationInterceptor';
import { formatAmount, formatDate } from '../utils/formatters';

import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid2';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import FigureDetail from './FigureDetail';

const FigureListing = () => {
    // State to store the flag to open and hide the dialog
    const [loading, setLoading] = useState(true);
    // State to store the list of figurines
    const [figurines, setFigurines] = useState([]);
    // State to store the flag to open and hide the dialog
    const [open, setOpen] = useState(false);
    // State to store the slected figurine
    const [figurineSelected, setFigurineSelected] = useState();

    // Fetch the data when the component mounts
    useEffect(() => {
        axios.get('/figurines')
            .then(function (response) {
                setFigurines(response.data); // Assume response.data is an array of objects
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

    const handleClickOpen = (figurine) => {
        setOpen(true);
        setFigurineSelected(figurine);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return loading ? (
        <Grid container spacing={2}>
            {Array.from({ length: 15 }).map((_, index) => (
                <Grid>
                    <Stack spacing={1}>
                        <Skeleton variant="rectangular" width={210} height={240} />
                        <Skeleton variant="text" sx={{ fontSize: '4rem' }} />
                    </Stack>
                </Grid>
            ))}
        </Grid>

    ) : (
        <>
            <Paper sx={{ padding: '16px' }}>
                <Grid container spacing={2}>
                    {figurines.map((figurine) => (
                        <Grid key={figurine.id}>
                            <Card sx={{ maxWidth: 210, flexDirection: 'column' }}>
                                <CardActionArea>
                                    <Tooltip title={figurine.displayableName} arrow>
                                        <CardMedia
                                            component="img"
                                            image={figurine.officialImages ? figurine.officialImages[0] : "-"}
                                            alt={figurine.displayableName}
                                            title={figurine.displayableName}
                                        />
                                        <CardContent sx={{ textAlign: "left" }}>
                                            <Typography gutterBottom variant="body1" component="div">
                                                <b>{showDisplayableName(figurine.displayableName)}</b>
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                {figurine.status === "UNRELEASED" || figurine.status === "PROTOTYPE" || figurine.status === "RELEASE_TBD" ? "" :
                                                    (formatDate(figurine.distributionJPY.releaseDate, figurine.distributionJPY.releaseDateConfirmed))}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                {figurine.status === "RELEASE_TBD" ? "Release Date To be Determined" :
                                                    (figurine.status === "FUTURE_RELEASE" || figurine.status === "RELEASED") ? "" + (formatAmount(figurine.distributionJPY.finalPrice)) : "First appearance: " + (formatDate(figurine.distributionJPY.firstAnnouncementDate, true))}
                                            </Typography>
                                        </CardContent>
                                    </Tooltip>
                                </CardActionArea>
                                <CardActions disableSpacing>
                                    <Button onClick={() => handleClickOpen(figurine)} size="small" disabled={figurine.status === "RELEASE_TBD"}>View More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
            <FigureDetail open={open} onClose={handleClose} figurine={figurineSelected} />
        </>
    );
};

function showDisplayableName(name) {
    const maxLen = 37;
    if (name.length > maxLen) {
        return name.substring(0, maxLen - 3) + "...";
    } else {
        return name;
    }
}

export default FigureListing;