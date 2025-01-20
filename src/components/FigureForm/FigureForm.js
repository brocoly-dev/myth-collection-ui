import axiosInstance from './axiosValidationInterceptor'
import { Box, Button, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FigureDistribution from '../FigureDistribution/FigureDistribution';

const FigureForm = () => {

    // State to store the list of distributos
    const [distributors, setDistributors] = useState([]);

    const [distributionChannel, setDistributionChannel] = useState([]);
    const [distributionChannelSelectedOption, setDistributionChannelSelectedOption] = useState('');

    const [lineups, setLineups] = useState([]);
    const [lineUpSelectedOption, setLineUpSelectedOption] = useState('');

    // State to handle the form information
    const [formData, setFormData] = useState({
        baseName: "",
    });
    // State to handle errors
    const [formErrors, setFormErrors] = useState({
        baseName: "",
    });
    // State to handle loading state
    const [loading, setLoading] = useState(false);

    // Fetch the data when the component mounts
    useEffect(() => {
        axiosInstance.get('/distributors')
            .then(function (response) {
                setDistributors(response.data);  // Assume response.data is an array of objects
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
        axiosInstance.get('/distribution-channels')
            .then(function (response) {
                setDistributionChannel(response.data);  // Assume response.data is an array of objects
            }).catch(function (error) {
                // If the error is a validation error from backend
                if (error.response && error.response.data) {
                    // handle error
                    const backendErrors = error.response.data;
                    console.error("Error retrieving the distribution channel", backendErrors);
                } else {
                    // Handle other errors (e.g., network issues)
                    console.error("Error getting the distribution channel", error);
                }
            });
        axiosInstance.get('/lineups')
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
                [distribution]: {
                    releaseDateConfirmed: false
                } // creates the distributionMXN or distributionJPY empty structure and some default values.
            }));
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [distribution]: {
                ...prevFormData[distribution],
                [fieldName]: value, // Update only the field under either distributionMXN or distributionJPY
            },
        }));

        const errorField = "distribution" + id + "_" + fieldName;

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [errorField]: "",
        }));
    };

    const handleDistributionChannelSelectOnChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        if (fieldValue === "") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [fieldName]: null
            }));
        } else {
            const index = fieldValue.indexOf("|");
            const value = fieldValue.substring(0, index);
            const text = fieldValue.substring(index + 1);

            const jsonObject = {
                id: value,
                distribution: text
            };

            setFormData((prevFormData) => ({
                ...prevFormData,
                [fieldName]: jsonObject
            }));
        }
        setDistributionChannelSelectedOption(fieldValue);
    };

    const handleLineUpSelectOnChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        if (fieldValue === "") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [fieldName]: null
            }));
        } else {
            const index = fieldValue.indexOf("|");
            const value = fieldValue.substring(0, index);

            setFormData((prevFormData) => ({
                ...prevFormData,
                [fieldName]: value
            }));
        }
        setLineUpSelectedOption(fieldValue);
    };

    const handleFormOnChange = (event) => {
        const { name, value } = event.target;
        console.log("Name: " + name);
        console.log("Value: " + value);

        setFormData({
            ...formData,
            [name]: value
        });
        setFormErrors((prevErrors) => ({
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
                console.log(backendErrors);

                setFormErrors((prevErrors) => ({
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
    };

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
                        error={Boolean(formErrors.baseName)}
                        helperText={formErrors.baseName}
                        onChange={handleFormOnChange}
                        size="small"
                        fullWidth
                    />
                </Grid2>
                <FigureDistribution
                    id="JPY"
                    label="Distribution in Japan"
                    distributors={distributors}
                    distributorsDisabled
                    priceCurrencySymbol="¥"
                    firstAnnouncementDateLabel="First Announcement Date"
                    formErrors={formErrors}
                    sendDataToParent={handleDataFromFigureDistributionChild}
                />
                <FigureDistribution
                    id="MXN"
                    label="Distribution in Mexico"
                    distributors={distributors}
                    priceCurrencySymbol="$"
                    firstAnnouncementDateLabel="Confirmation Date"
                    formErrors={formErrors}
                    sendDataToParent={handleDataFromFigureDistributionChild}
                />
                <Grid2 size={4}>
                    <TextField
                        label="Tamashii Url"
                        name="tamashiiUrl"
                        value={formData.tamashiiUrl}
                        error={Boolean(formErrors.tamashiiUrl)}
                        helperText={formErrors.tamashiiUrl}
                        onChange={handleFormOnChange}
                        size="small"
                        fullWidth
                    />
                </Grid2>
                <Grid2 size={4}>
                    <FormControl size="small" fullWidth variant="outlined">
                        <InputLabel id="distribution-channel-label">Distribution Channel</InputLabel>
                        <Select
                            labelId="distribution-channel-label"
                            label="Distribution Channel"
                            name="distributionChannel"
                            value={distributionChannelSelectedOption}
                            onChange={handleDistributionChannelSelectOnChange}
                        >
                            {/* Render the MenuItem components based on the fetched data */}
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {distributionChannel.map((item) => (
                                <MenuItem key={item.id} value={item.id + '|' + item.distribution}>
                                    {item.distribution}  {/* Display the item name, adjust to match your object structure */}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Choose an option</FormHelperText>
                    </FormControl>
                </Grid2>
                <Grid2 size={4}>
                    <FormControl size="small" fullWidth variant="outlined">
                        <InputLabel id="lune-up-label">Line Up</InputLabel>
                        <Select
                            labelId="lune-up-label"
                            label="Line Up"
                            name="lineUp"
                            value={lineUpSelectedOption}
                            onChange={handleLineUpSelectOnChange}
                        >
                            {/* Render the MenuItem components based on the fetched data */}
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {lineups.map((item) => (
                                <MenuItem key={item.key} value={item.key + '|' + item.description}>
                                    {item.description}  {/* Display the item name, adjust to match your object structure */}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Choose an option</FormHelperText>
                    </FormControl>
                </Grid2>
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