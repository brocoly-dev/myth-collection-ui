import { Button, TextField } from "@mui/material";
import axios from "axios";

const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('http://localhost:8080/sample')
        .then(response => console.log(response.data))
        .catch(error => console.error('Error creating a new figure item:', error));
};

const FigureForm = () => (
    <form onSubmit={handleSubmit}>

        <TextField
            required id="outlined-basic"
            label="Base Name" variant="outlined" helperText="Incorrect entry." size="small" />

        <Button type="submit" variant="contained" color="primary">
            Submit
        </Button>

    </form>
);

export default FigureForm;