import React, { useEffect, useState } from 'react';
import { Annotation } from '../index';
import useQuestions from '../../../hooks/useQuestions';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Box,
    Grid,
    Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IShippedItem } from '../../../types';

interface ItemSelectionProps {
    items: IShippedItem[];
    shippedItem: IShippedItem[];
    onItemSelect: (selectedItems: IShippedItem[]) => void;
}

const ItemSelection: React.FC<ItemSelectionProps> = ({ items, shippedItem, onItemSelect }) => {
    const [initialState, setInitialState] = useState<IShippedItem[]>(shippedItem);
    const [selectedItems, setSelectedItems] = useState<IShippedItem[]>(items);
    const [error, setError] = useState<string>('Please provide a reason for return');
    const { allQuestions, getTextByStringVal } = useQuestions();

    useEffect(() => {
        if (initialState) {
            setSelectedItems(initialState);
            setError('')
        }
    }, [initialState]);

    const handleItemChange = (sku: string, newData: Partial<IShippedItem>) => {
        const updatedItems = selectedItems.map((item) =>
            item.sku === sku ? { ...item, ...newData } : item
        );
        validateSelection(updatedItems);
        setSelectedItems(updatedItems);
        const itemsForReturn = updatedItems.filter((item) => item.quantity > 0);
        onItemSelect(itemsForReturn);
    };

    const handleQuantityChange = (sku: string, quantity: number) => {
        handleItemChange(sku, { quantity });
    };

    const handleReasonChange = (sku: string, reason: string) => {
        handleItemChange(sku, { reason });
    };

    const handleAnnotationChange = (sku: string, annotation: string) => {
        handleItemChange(sku, { annotation });
    };

    const validateSelection = (updatedItems: IShippedItem[]) => {
        let hasSelectedQuantity = false;
        updatedItems.forEach((item) => {
            if (item.quantity > 0) {
                hasSelectedQuantity = true;
                if (!item.reason) {
                    setError(`Please provide a reason for return`);
                } else {
                    setError('');
                }
            }

        });
        if (!hasSelectedQuantity) {
            setError('Please select at least one item quantity.');
        }
    };

    return (
        <Box>
            {items.map((item) => (
                <Box key={item.sku} sx={{ mb: 3 }}>
                    <Typography sx={{ mb: 2 }} variant="h6">SKU: {item.sku}</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id={`quantity-label-${item.sku}`}>Quantity</InputLabel>
                                <Select
                                    labelId={`quantity-label-${item.sku}`}
                                    label="Quantity"
                                    value={selectedItems.find((i) => i.sku === item.sku)?.quantity || 0}
                                    onChange={(e) => handleQuantityChange(item.sku, Number(e.target.value))}
                                >
                                    {[...Array(item.quantity + 1).keys()].map((i) => (
                                        <MenuItem key={i} value={i}>
                                            {i}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id={`return-label-${item.sku}`}>Reason for return</InputLabel>
                                <Select
                                    disabled={selectedItems.find((i) => i.sku === item.sku)?.quantity === 0}
                                    labelId={`return-label-${item.sku}`}
                                    label="Reason for return"
                                    value={selectedItems.find((i) => i.sku === item.sku)?.reason || ''}
                                    onChange={(e) => handleReasonChange(item.sku, e.target.value)}
                                >
                                    {allQuestions.map((question) => (
                                        <MenuItem key={question.stringVal} value={question.stringVal}>
                                            {getTextByStringVal(question.stringVal)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Accordion sx={{ mt: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content">
                            <Typography>Add Annotation</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Annotation
                                sku={item.sku}
                                annotationInit={selectedItems.find((i) => i.sku === item.sku)?.annotation || ''}
                                onAnnotationChange={handleAnnotationChange}
                            />
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ))}
            {error && (
                <Box mt={2}>
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default ItemSelection;
