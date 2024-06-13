import React, {useEffect, useState} from 'react';
import Annotation from "../Annotation/Annotation";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {IOrderInfo, IShippedItem} from "../../types";

interface ItemSelectionProps {
    items: IShippedItem[];
    returnInfo: IShippedItem[];
    onItemSelect: (selectedItems: IShippedItem[]) => void;
}

export const questions = [
    { "text": "No longer needed", "stringVal": "RO_CR-UNWANTED_ITEM" },
    { "text": "Performance or quality not adequate", "stringVal": "RO_CR-QUALITY_UNACCEPTABLE" },
    { "text": "Product and delivery box both damaged", "stringVal": "RO_CR-DAMAGED_BY_CARRIER" },
    { "text": "Description on website was not accurate", "stringVal": "RO_AMZ-PG-BAD-DESC" },
    { "text": "Missing parts or accessories", "stringVal": "RO_CR-MISSING_PARTS" },
];

const ItemSelection: React.FC<ItemSelectionProps> = ({ items , returnInfo, onItemSelect }) => {
    const [initialState, setInitialState] = useState<IShippedItem[]>(returnInfo);
    const [selectedItems, setSelectedItems] = useState<IShippedItem[]>(items);
    const [error, setError] = useState<string>('Please provide a reason for return');


    useEffect(() => {
        console.log('initialState ', initialState)
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
        updatedItems.forEach(item => {
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
        <div>
            {items.map((item) => (
                <div key={item.sku}>
                    <p>
                        SKU: {item.sku} ({item.quantity})
                    </p>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="quantity-label">Quantity</InputLabel>
                            <Select
                                labelId="quantity-label"
                                value={initialState?.find((i) => i.sku === item.sku)?.quantity || selectedItems.find((i) => i.sku === item.sku)?.quantity || 0}
                                onChange={(e) => handleQuantityChange(item.sku, Number(e.target.value))}
                            >
                                {[...Array(item.quantity + 1).keys()].map((i) => (
                                    <MenuItem key={i} value={i}>
                                        {i}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="return-label">Why are you returning this?</InputLabel>
                            <Select
                                disabled={selectedItems.find((i) => i.sku === item.sku)?.quantity === 0}
                                value={initialState?.find((i) => i.sku === item.sku)?.reason || selectedItems.find((i) => i.sku === item.sku)?.reason || ''}
                                onChange={(e) => handleReasonChange(item.sku, e.target.value)}
                            >
                                <MenuItem value="">Choose a response</MenuItem>
                                {questions.map((question) => (
                                    <MenuItem key={question.text} value={question.text}>
                                        {question.text}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                            >
                                Add Annotation
                            </AccordionSummary>
                            <AccordionDetails>
                                <Annotation
                                    sku={item.sku}
                                    value={initialState?.find((i) => i.sku === item.sku)?.annotation || selectedItems.find((i) => i.sku === item.sku)?.annotation || ''}
                                    onAnnotationChange={handleAnnotationChange} />
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            ))}
            {error.length > 0 && (
                <div>
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            )}
        </div>
    );
};

export default ItemSelection;