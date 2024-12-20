import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import axios from "axios";

const FigureForm = () => {
    const [formData, setFormData] = useState({
        baseName: ""
    });
    const [response, setResponse] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        /*
        axios.post('http://localhost:8080/figurines')
            .then(response => console.log(response.data))
            .catch(error => console.error('Error creating a new figure item:', error));
            */
        try {
            // Sending POST request with JSON data
            const res = axios.post('http://localhost:8080/api/figurines', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setResponse(res.data);
            console.log('Response:', res.data); // handle the response as needed

            // Optionally, you can reset the form or display a success message
        } catch (error) {
            console.error('Error creating figurine:', error.res ? error.res.data : error.message);
        }
    };

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
                    helperText="Incorrect entry."
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