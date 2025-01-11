import axiosInstance from './axiosValidationInterceptor'
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FigureDistribution from '../FigureDistribution/FigureDistribution';

const FigureForm = () => {

    // State to store the list of distributos
    const [distributorsData, setDistributorsData] = useState([]);
    // State to handle the form information
    const [formData, setFormData] = useState({
        baseName: "",
    });
    // State to handle errors
    const [errors, setErrors] = useState({
        baseName: "",
    });
    // State to handle loading state
    const [loading, setLoading] = useState(false);

    // Fetch the data when the component mounts
    useEffect(() => {
        axiosInstance.get('/distributors')
            .then(function (response) {
                setDistributorsData(response.data);  // Assume response.data is an array of objects
            }).catch(function (error) {
                // If the error is a validation error from backend
                if (error.response && error.response.data) {
                    // handle error
                    const backendErrors = error.response.data;
                    console.error("Error retrieving the distributors", backendErrors);
                } else {
                    // Handle other errors (e.g., network issues)
                    console.error("Error getting the distributors", error);
                }
            });
    }, []); // Empty dependency array means this runs once when the component mounts

    // Function to handle data received from the child
    const handleDataFromFigureDistributionChild = (id, fieldName, value) => {
        console.log("Id: " + id);
        console.log("Name: " + fieldName);
        console.log("Value: " + value);

        const distribution = "distribution" + id;
        if (!(distribution in formData)) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [distribution]: {} // creates the distributionMXN or distributionJPY empty structure.
            }));
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [distribution]: {
                ...prevFormData[distribution],
                [fieldName]: value, // Update only the field under either distributionMXN or distributionJPY
            },
        }));
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        console.log("Name: " + name);
        console.log("Value: " + value);

        setFormData({
            ...formData,
            [name]: value
        });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        axiosInstance.post('/figurines', formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (resp) {
            // handle success
            console.log(resp.data);
        }).catch(function (error) {
            // If the error is a validation error from backend
            if (error.response && error.response.data && error.response.data.validations) {
                // handle error
                const backendErrors = error.response.data.validations;

                setErrors((prevErrors) => ({
                    ...prevErrors,
                    ...backendErrors, // Merge the backend errors into the state
                }));
            } else {
                // Handle other errors (e.g., network issues)
                console.error("Error submitting form", error);
            }
        }).finally(function () {
            setLoading(false);
        });
    }

    return (
        <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
                maxWidth: 750,
                mx: "auto",
                mt: 5,
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: "Background.paper"
            }}
        >
            <Typography variant="h4" mb={3}>
                Create new Myth Cloth item
            </Typography>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <TextField
                        required
                        label="Base Name"
                        name="baseName"
                        value={formData.baseName}
                        error={Boolean(errors.baseName)}
                        helperText={errors.baseName}
                        onChange={handleFormChange}
                        size="small"
                        fullWidth />
                </Grid2>
                <FigureDistribution
                    label="Distribution in Japan"
                    id="JPY"
                    distributors={distributorsData}
                    distributorDisabled={true}
                    currency="¥"
                    sendDataToParent={handleDataFromFigureDistributionChild}
                    firstAnnouncementDateLabel="First Announcement Date" />
                <FigureDistribution
                    label="Distribution in Mexico"
                    id="MXN"
                    distributors={distributorsData}
                    currency="$"
                    sendDataToParent={handleDataFromFigureDistributionChild}
                    firstAnnouncementDateLabel="Confirmation Date" />
                <Grid2 size={4}>
                    <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default FigureForm;