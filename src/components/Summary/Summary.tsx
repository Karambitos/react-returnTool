import React from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import {IShippedItem, IOrderInfo} from "../../types";

interface SummaryProps {
    summary: IOrderInfo;
    onSubmit: () => void;
}

const Summary: React.FC<SummaryProps> = ({ summary, onSubmit }) => {
    console.log(summary)

    return (
        <div>
            <h2>Summary</h2>
            <p>Logistician: {summary.logistician}</p>
            <p>Warehouse: {summary.warehouse}</p>
            <List>
                {summary.shippedItems && summary.shippedItems.map((item: IShippedItem, index = 1) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`SKU: ${item.sku} - Quantity: ${item.quantity}`}
                        />
                        {item.reason && <ListItemText
                            secondary={`Reason: ${item.reason}`}
                        />}
                        {item.annotation && <ListItemText
                            secondary={`Annotation: ${item.annotation}`}
                        />}
                    </ListItem>
                ))}
            </List>
        </div>
    )
};

export default Summary;