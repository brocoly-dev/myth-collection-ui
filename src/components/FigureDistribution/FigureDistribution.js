import { Divider, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const FigureDistribution = ({ distributorDisabled = false }) => {
    return (
        <>
            <Grid2 size={12}>
                <Divider />
            </Grid2>
            <Grid2 size={4}>
                <FormControl size="small" disabled={distributorDisabled} fullWidth variant="outlined">
                    <InputLabel id="distributor-label">Distributor</InputLabel>
                    <Select
                        labelId="distributor-label"
                        label="Distributor"
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
        </>
    );
};

export default FigureDistribution;