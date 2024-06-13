import React from 'react';
import { MenuItem, FormControl, InputLabel } from '@mui/material';
import Select ,{SelectChangeEvent} from "@mui/material/Select";

interface WarehouseSelectionProps {
    value: string;
    onChange: (event: SelectChangeEvent) => void;
}

const WarehouseSelection: React.FC<WarehouseSelectionProps> = ({ value, onChange }) => (
    <FormControl fullWidth>
        <InputLabel>Warehouse</InputLabel>
        <Select value={value} onChange={onChange}>
            <MenuItem value="Hamburg">Hamburg</MenuItem>
            <MenuItem value="Berlin">Berlin</MenuItem>
            <MenuItem value="Plattling">Plattling</MenuItem>
            <MenuItem value="Gelsenkirchen">Gelsenkirchen</MenuItem>
            <MenuItem value="Aschaffenburg">Aschaffenburg</MenuItem>
        </Select>
    </FormControl>
);

export default WarehouseSelection;
