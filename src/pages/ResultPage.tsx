import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface Item {
    sku: string;
    returnedQuantity: number;
    reason: string;
    annotation: string;
}

interface ResultPageProps {
    result: {
        logistician: string;
        warehouse: string;
        deliveryId: string;
        items: Item[];
    } | null;
}

const ResultPage: React.FC<ResultPageProps> = ({ result }) => (
    <div>
        <h2>Return Details</h2>
        {result && (
            <List>
                <ListItem>
                    <ListItemText primary="Logistician" secondary={result.logistician} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Warehouse" secondary={result.warehouse} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Delivery ID" secondary={result.deliveryId} />
                </ListItem>
                {result.items.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`SKU: ${item.sku} - Quantity: ${item.returnedQuantity}`}
                            secondary={`Reason: ${item.reason} - Annotation: ${item.annotation}`}
                        />
                    </ListItem>
                ))}
            </List>
        )}
    </div>
);

export default ResultPage;
