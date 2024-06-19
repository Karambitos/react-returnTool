import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper, Divider, Box } from '@mui/material';
import { IShippedItem, IOrderInfo } from "../../../types";
import useQuestions from "../../../hooks/useQuestions";

interface SummaryProps {
    summary: IOrderInfo;
}

const Summary: React.FC<SummaryProps> = ({ summary }) => {
    const { getTextByStringVal } = useQuestions();

    return (
        <Paper data-testid="test-summary" elevation={3} sx={{ padding: 3, marginTop: 2, marginBottom: 3 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Order Summary
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                    <strong>Logistician:</strong> {summary.logistician}
                </Typography>
                <Typography variant="body1">
                    <strong>Warehouse:</strong> {summary.warehouse}
                </Typography>
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <List>
                {summary.shippedItems && summary.shippedItems.map((item: IShippedItem, index) => (
                    <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
                        <ListItemText
                            primary={
                                <Typography variant="body1" component="span">
                                    <strong>SKU:</strong> {item.sku} - <strong>Quantity:</strong> {item.quantity}
                                </Typography>
                            }
                            secondary={
                                <>
                                    {item.reason && (
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="span"
                                            sx={{ display: 'block' }}
                                        >
                                            <strong>Reason:</strong> {getTextByStringVal(item.reason)}
                                        </Typography>
                                    )}
                                    {item.annotation && (
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="span"
                                            sx={{ display: 'block' }}
                                        >
                                            <strong>Annotation:</strong> {item.annotation}
                                        </Typography>
                                    )}
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default Summary;
