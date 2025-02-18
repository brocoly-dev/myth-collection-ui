import axiosInstance from './axiosValidationInterceptor'
import { Box, Button, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid2, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FigureDistribution from '../FigureDistribution/FigureDistribution';

const FigureForm = () => {

    // State to store the list of distributos
    const [distributors, setDistributors] = useState([]);

    const [distributionChannel, setDistributionChannel] = useState([]);
    const [distributionChannelSelectedOption, setDistributionChannelSelectedOption] = useState('');

    const [lineups, setLineups] = useState([]);
    const [lineUpSelectedOption, setLineUpSelectedOption] = useState('');

    const [series, setSeries] = useState([]);
    const [seriesSelectedOption, setSeriesSelectedOption] = useState('');

    const [categories, setCategories] = useState([]);
    const [categorySelectedOption, setCategorySelectedOption] = useState('');

    const [anniversaries, setAnniversaries] = useState([]);
    const [anniversarySelectedOption, setAnniversarySelectedOption] = useState('');

    const [revivalChecked, setRevivalChecked] = useState(false);
    const [oceChecked, setOceChecked] = useState(false);
    const [metalChecked, setMetalChecked] = useState(false);
    const [goldenChecked, setGoldenChecked] = useState(false);
    const [goldChecked, setGoldChecked] = useState(false);
    const [brokenChecked, setBrokenChecked] = useState(false);
    const [plainChecked, setPlainChecked] = useState(false);
    const [hkChecked, setHkChecked] = useState(false);
    const [comicChecked, setComicChecked] = useState(false);
    const [setChecked, setSetChecked] = useState(false);

    // Mapping setter functions
    const setters = {
        revival: setRevivalChecked,
        oce: setOceChecked,
        metal: setMetalChecked,
        golden: setGoldenChecked,
        gold: setGoldChecked,
        broken: setBrokenChecked,
        plain: setPlainChecked,
        hk: setHkChecked,
        comic: setComicChecked,
        set: setSetChecked
    };

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
        axiosInstance.get('/series')
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
        axiosInstance.get('/categories')
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

        axiosInstance.get('/anniversaries')
            .then(function (response) {
                setAnniversaries(response.data);  // Assume response.data is an array of objects
            }).catch(function (error) {
                // If the error is a validation error from backend
                if (error.response && error.response.data) {
                    // handle error
                    const backendErrors = error.response.data;
                    console.error("Error retrieving the anniversaries", backendErrors);
                } else {
                    // Handle other errors (e.g., network issues)
                    console.error("Error getting the anniversaries", error);
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
        handleSimpleCatalogSelectOnChange(event);
        setLineUpSelectedOption(event.target.value);
    };

    const handleSeriesSelectOnChange = (event) => {
        handleSimpleCatalogSelectOnChange(event);
        setSeriesSelectedOption(event.target.value);
    };

    const handleCategorySelectOnChange = (event) => {
        handleSimpleCatalogSelectOnChange(event);
        setCategorySelectedOption(event.target.value);
    };

    const handleAnniversarySelectOnChange = (event) => {
        handleSimpleCatalogSelectOnChange(event);
        setAnniversarySelectedOption(event.target.value);
    };

    const handleSimpleCatalogSelectOnChange = (event) => {
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
    };

    const handleSwitchOnChange = (event) => {
        const fieldName = event.target.name;
        const inputValue = event.target.checked;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: inputValue
        }));

        // Dynamically call the setter based on field
        if (setters[fieldName]) {
            setters[fieldName](inputValue);
        }
    };

    const handleFormOnChange = (event) => {
        const { name, value } = event.target;
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
                <Grid2 size={6}>
                    <FormControl size="small" fullWidth variant="outlined">
                        <InputLabel id="series-label">Series</InputLabel>
                        <Select
                            labelId="series-label"
                            label="Series"
                            name="series"
                            value={seriesSelectedOption}
                            onChange={handleSeriesSelectOnChange}
                        >
                            {/* Render the MenuItem components based on the fetched data */}
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {series.map((item) => (
                                <MenuItem key={item.key} value={item.key + '|' + item.description}>
                                    {item.description}  {/* Display the item name, adjust to match your object structure */}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Choose an option</FormHelperText>
                    </FormControl>
                </Grid2>
                <Grid2 size={6}>
                    <FormControl size="small" fullWidth variant="outlined">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            label="Category"
                            name="category"
                            value={categorySelectedOption}
                            onChange={handleCategorySelectOnChange}
                        >
                            {/* Render the MenuItem components based on the fetched data */}
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories.map((item) => (
                                <MenuItem key={item.key} value={item.key + '|' + item.description}>
                                    {item.description}  {/* Display the item name, adjust to match your object structure */}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Choose an option</FormHelperText>
                    </FormControl>
                </Grid2>
                <Grid2 size={4}>
                    <FormControl component="fieldset" variant="standard">
                        <FormLabel component="legend">Main Attributes</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={revivalChecked} onChange={handleSwitchOnChange} />}
                                label="Revival Edition"
                                name="revival"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                control={<Switch checked={oceChecked} onChange={handleSwitchOnChange} />}
                                label="Original Color Edition"
                                name="oce"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                control={<Switch checked={metalChecked} onChange={handleSwitchOnChange} />}
                                label="Metal Body"
                                name="metal"
                                labelPlacement="end"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid2>
                <Grid2 size={4}>
                    <FormControl component="fieldset" variant="standard">
                        <FormLabel component="legend">Armor Attributes</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={goldenChecked} onChange={handleSwitchOnChange} />}
                                label="Golden Edition"
                                name="golden"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                control={<Switch checked={goldChecked} onChange={handleSwitchOnChange} />}
                                label="Gold Armor"
                                name="gold"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                control={<Switch checked={brokenChecked} onChange={handleSwitchOnChange} />}
                                label="Broken Armor"
                                name="broken"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                control={<Switch checked={plainChecked} onChange={handleSwitchOnChange} />}
                                label="Plain Cloth"
                                name="plain"
                                labelPlacement="end"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid2>
                <Grid2 size={4}>
                    <FormControl component="fieldset" variant="standard">
                        <FormLabel component="legend">Other Attributes</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={hkChecked} onChange={handleSwitchOnChange} />}
                                label="HK Version"
                                name="hk"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                control={<Switch checked={comicChecked} onChange={handleSwitchOnChange} />}
                                label="Comic Version"
                                name="comic"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                control={<Switch checked={setChecked} onChange={handleSwitchOnChange} />}
                                label="Set"
                                name="set"
                                labelPlacement="end"
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl size="small" variant="outlined">
                        <InputLabel id="anniversary-label">Anniversary</InputLabel>
                        <Select
                            labelId="anniversary-label"
                            label="Anniversary"
                            name="anniversary"
                            value={anniversarySelectedOption}
                            onChange={handleAnniversarySelectOnChange}
                        >
                            {/* Render the MenuItem components based on the fetched data */}
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {anniversaries.map((item) => (
                                <MenuItem key={item.key} value={item.key + '|' + item.description}>
                                    {item.description}  {/* Display the item name, adjust to match your object structure */}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Choose an option</FormHelperText>
                    </FormControl>
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        label="Additional Information"
                        name="remarks"
                        onChange={handleFormOnChange}
                        size="small"
                        multiline
                        fullWidth
                    />
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