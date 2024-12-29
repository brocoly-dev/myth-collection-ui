import { Box, Button, Divider, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import axiosInstance from './axiosValidationInterceptor'

const FigureForm = () => {
    const [formData, setFormData] = useState({
        baseName: "",
    });
    const [errors, setErrors] = useState({
        baseName: "",
    });

    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        axiosInstance.post('/figurines', formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (resp) {
            // handle success
            console.log(resp.data);
            setResponse(resp.data.baseName)
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
            // always executed
            setLoading(false);
        });
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 500,
                mx: "auto",
                mt: 5,
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: "Background.paper"
            }}>
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
                        onChange={handleChange}
                        size="small"
                        fullWidth />
                </Grid2>
                <Grid2 size={12}>
                    <Divider />
                </Grid2>
                <Grid2 size={4}>
                    <FormControl size="small" fullWidth variant="outlined">
                        <InputLabel id="distributor-label">Distributor</InputLabel>
                        <Select
                            labelId="distributor-label"
                            label="Distributor"
                            value={formData.baseName}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>DAM</MenuItem>
                            <MenuItem value={20}>DTM</MenuItem>
                        </Select>
                        <FormHelperText>Choose an option</FormHelperText>
                    </FormControl>
                </Grid2>
                <Grid2 size={4}>
                    <TextField size="small" fullWidth />
                </Grid2>
                <Grid2 size={4}>
                    <TextField size="small" fullWidth />
                </Grid2>
                <Grid2 size={4}>
                    <TextField size="small" fullWidth />
                </Grid2>
                <Grid2 size={4}>
                    <TextField size="small" fullWidth />
                </Grid2>
                <Grid2 size={4}>
                    <TextField size="small" fullWidth />
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