import React from 'react';
import {MenuItem, FormControl, InputLabel, Box, } from '@mui/material';
import Select ,{SelectChangeEvent} from "@mui/material/Select";

interface WarehouseSelectionProps {
    value: string;
    onChange: (event: SelectChangeEvent) => void;
}

const WarehouseSelection: React.FC<WarehouseSelectionProps> = ({ value, onChange }) => (
    <Box sx={{  marginTop: 2, marginBottom: 3 }} data-testid="test-warehouse-selection">
        <FormControl fullWidth variant="outlined">
            <InputLabel>Warehouse</InputLabel>
            <Select
                data-testid="test-warehouse-selection-select"
                value={value}
                onChange={onChange}
                label="Warehouse"
            >
                <MenuItem value="Hamburg">Hamburg</MenuItem>
                <MenuItem value="Berlin">Berlin</MenuItem>
                <MenuItem value="Plattling">Plattling</MenuItem>
                <MenuItem value="Gelsenkirchen">Gelsenkirchen</MenuItem>
                <MenuItem value="Aschaffenburg">Aschaffenburg</MenuItem>
            </Select>
        </FormControl>
    </Box>

);

export default WarehouseSelection;
