import React, { useState } from 'react';
import { TextField, RadioGroup, FormControlLabel, Radio, CircularProgress, Paper, Box, Typography } from '@mui/material';

interface IDSelectionProps {
    loading: boolean;
    error: string | null;
    item: { type: string; id: string } | null;
    onChange: (data: { type: string; id: string }) => void;
}

const IDSelection: React.FC<IDSelectionProps> = ({ loading, error, item, onChange = () => {} }) => {
    const [type, setType] = useState(item?.type || 'deliveryId');
    const [id, setId] = useState(item?.id || '');
    const [errorValidation, setErrorValidation] = useState('');

    function isUUID(str: string) {
        return /^(?:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89AB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/.test(str);
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
    };

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
        setErrorValidation('');
    };

    const handleBlur = () => {
        if (type === 'deliveryId' && !/^\d+$/.test(id)) {
            setErrorValidation('DeliveryId must be numeric');
        } else if (type === 'deliveryOrderId' && !isUUID(id)) {
            setErrorValidation('DeliveryOrderId must be a valid UUID');
        } else {
            setErrorValidation('');
            onChange({ type, id });
        }
    };

    return (
        <Box sx={{  marginTop: 2, marginBottom: 3 }}>
            <RadioGroup row value={type} onChange={handleTypeChange}>
                <FormControlLabel
                    value="deliveryId"
                    control={<Radio />}
                    label="DeliveryId"
                />
                <FormControlLabel
                    value="deliveryOrderId"
                    control={<Radio />}
                    label="DeliveryOrderId"
                />
            </RadioGroup>
            <Box sx={{ position: 'relative' }}>
                <TextField
                    label={type === 'deliveryId' ? 'DeliveryId' : 'DeliveryOrderId'}
                    value={id}
                    onChange={handleIdChange}
                    onBlur={handleBlur}
                    error={!!errorValidation || !!error}
                    helperText={errorValidation || error}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
                {loading && <CircularProgress sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)' }} />}
            </Box>
        </Box>
    );
};

export default IDSelection;
