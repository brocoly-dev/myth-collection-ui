import { Button, TextField } from "@mui/material";
import React, { useState } from 'react';
import axios from "axios";





const FigureForm = () => {
    const [figurineData, setFigurineData] = useState({
        name: '',
        email: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        /*
        axios.post('http://localhost:8080/figurines')
            .then(response => console.log(response.data))
            .catch(error => console.error('Error creating a new figure item:', error));
            */
        try {
            // Sending POST request with JSON data
            const response = axios.post('http://localhost:8080/figurines', figurineData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Response:', response.data); // handle the response as needed

            // Optionally, you can reset the form or display a success message
        } catch (error) {
            console.error('Error creating figurine:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <TextField
                required id="outlined-basic"
                label="Base Name" variant="outlined" helperText="Incorrect entry." size="small" />

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>

        </form>
    );
};

export default FigureForm;