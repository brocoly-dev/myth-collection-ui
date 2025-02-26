import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid2, Paper, Tooltip, Typography } from '@mui/material';
import axiosInstance from '../FigureForm/axiosValidationInterceptor'
import { useEffect, useState } from "react";

const FigureListing = () => {
    // State to store the list of distributos
    const [figurines, setFigurines] = useState([]);

    // Fetch the data when the component mounts
    useEffect(() => {
        axiosInstance.get('/figurines')
            .then(function (response) {
                setFigurines(response.data); // Assume response.data is an array of objects
            }).catch(function (error) {
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
    
    return (
        <Paper sx={{ padding: '16px' }}>
            <Grid2 container spacing={2}>
                {figurines.map((figurine) => (
                    <Grid2 key={figurine.id}>
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
                                                (formatDateWithOrdinal(figurine.distributionJPY.releaseDate, figurine.distributionJPY.releaseDateConfirmed))}
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {figurine.status === "RELEASE_TBD" ? "Release Date To be Determined" :
                                                (figurine.status === "FUTURE_RELEASE" || figurine.status === "RELEASED") ? "" + (formatAmount(figurine.distributionJPY.finalPrice)) : "First appearance: " + (formatDateWithOrdinal(figurine.distributionJPY.firstAnnouncementDate, true))}
                                        </Typography>
                                    </CardContent>
                                </Tooltip>
                            </CardActionArea>
                            <CardActions disableSpacing>
                                <Button size="small">View More</Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Paper>
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
function formatAmount(theAmount) {
    if (theAmount) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "JPY",
        }).format(theAmount);
    } else {
        return "Not Available";
    }
}
function parseDateWithoutTimezone(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Month is 0-based
}
function formatDateWithOrdinal(theDate, isConfirmed) {
    const date = parseDateWithoutTimezone(theDate);

    let options;
    if (isConfirmed) {
        options = { month: "long", day: "numeric", year: "numeric" };
    } else {
        options = { month: "long", year: "numeric" };
    }
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

    if (isConfirmed) {
        const day = date.getDate();
        return formattedDate.replace(/\d+/, `${day}${getOrdinalSuffix(day)}`);
    } else {
        return formattedDate;
    }
}
function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

export default FigureListing;