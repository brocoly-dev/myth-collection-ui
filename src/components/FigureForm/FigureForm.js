import { Box, Button, TextField, Typography } from "@mui/material";
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

        axiosInstance.post('/figurines', formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (resp) {
            // handle success
            console.log(resp.data);
            setResponse(resp.data.baseName)
        }).catch(function (error) {
            // handle error
            const backendErrors = error.response.data.validations;

            setErrors((prevErrors) => ({
                ...prevErrors,
                ...backendErrors, // Merge the backend errors into the state
            }));
        }).finally(function () {
            // always executed
        });
    }

    return (
        <Box
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
                Submit Your Info
            </Typography>
            <form onSubmit={handleSubmit}>

                <TextField
                    required id="outlined-basic"
                    label="Base Name"
                    variant="outlined"
                    error={Boolean(errors.baseName)}
                    helperText={errors.baseName}
                    size="small"
                    name="baseName"
                    value={formData.baseName}
                    onChange={handleChange} />

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
            {response && (
                <Typography variant="body1" color="success.main" mt={2}>
                    {response}
                </Typography>
            )}
        </Box>
    );
};

export default FigureForm;