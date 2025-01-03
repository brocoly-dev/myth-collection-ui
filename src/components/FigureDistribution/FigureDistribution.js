import { Divider, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const FigureDistribution = ({ label, id, distributors, distributorDisabled = false, sendDataToParent }) => {
    // State to manage the selected option
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        if (fieldValue === "") {
            sendDataToParent(id, null); // no JSON object is sent to parent
        } else {
            const index = fieldValue.indexOf("|");
            const value = fieldValue.substring(0, index);
            const text = fieldValue.substring(index + 1);

            const jsonObject = {};
            jsonObject[fieldName] = {
                id: value,
                name: text
            };
            sendDataToParent(id, jsonObject);
        }
        setSelectedOption(fieldValue);
    };
    return (
        <>
            <Grid2 size={12}>
                <Divider>{label}</Divider>
            </Grid2>
            <Grid2 size={4}>
                <FormControl size="small" disabled={distributorDisabled} fullWidth variant="outlined">
                    <InputLabel id="distributor-label">Distributor</InputLabel>
                    <Select
                        labelId="distributor-label"
                        label="Distributor"
                        name="distributor"
                        value={selectedOption}
                        onChange={handleSelectChange}
                    >
                        {/* Render the MenuItem components based on the fetched data */}
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {distributors.map((item) => (
                            <MenuItem key={item.id} value={item.id + '|' + item.name}>
                                {item.name}  {/* Display the item name, adjust to match your object structure */}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Choose an option</FormHelperText>
                </FormControl>
            </Grid2>
            <Grid2 size={4}>

            </Grid2>
            <Grid2 size={4}>

            </Grid2>
            <Grid2 size={4}>

            </Grid2>
            <Grid2 size={4}>

            </Grid2>
            <Grid2 size={4}>

            </Grid2>
        </>
    );
};

export default FigureDistribution;