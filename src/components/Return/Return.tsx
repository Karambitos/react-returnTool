import React, { useState } from 'react';
import { Typography, Paper, Button, StepContent, StepLabel, Step, Stepper, Box } from '@mui/material';
import { SelectChangeEvent } from "@mui/material/Select";
import { IDSelection, ItemSelection, LogisticianSelection, Summary, WarehouseSelection } from "./index";
import { IOrderInfo, IShippedItem } from "../../types";
import useDataOrder from "../../hooks/useDataOrder";

const Return = () => {

    const [id, setId] = useState('');
    const [type, setType] = useState('deliveryId');
    const [returnInfo, setReturnInfo] = useState<IOrderInfo>({} as IOrderInfo);
    const { loading, error, order } = useDataOrder({ type, id });

    const handleLogisticianChange = (event: SelectChangeEvent) => {
        setReturnInfo({ ...returnInfo, logistician: event.target.value as string });
        updateStepCompletion(0, true);
    };

    const handleWarehouseChange = (event: SelectChangeEvent) => {
        setReturnInfo({ ...returnInfo, warehouse: event.target.value as string });
        updateStepCompletion(1, true);
    };

    const handleSelectID = ({ type, id }: { type: string; id: string }) => {
        setReturnInfo({ ...returnInfo, deliveryInfo: { type, id } });
        setId(id);
        setType(type);
        updateStepCompletion(2, true);
    };

    const handleItemSelect = (selectedItems: IShippedItem[]) => {
        if (selectedItems.length > 0) {
            setReturnInfo({ ...returnInfo, shippedItems: selectedItems });
            updateStepCompletion(3, true);
        } else {
            updateStepCompletion(3, false);
        }
    };

    const [activeStep, setActiveStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false, true]);

    const updateStepCompletion = (stepIndex: number, completed: boolean) => {
        const updatedSteps = [...completedSteps];
        updatedSteps[stepIndex] = completed;
        setCompletedSteps(updatedSteps);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setReturnInfo({} as IOrderInfo);
        setCompletedSteps([false, false, false, false, true]);
        setActiveStep(0);
    };

    const steps = [
        {
            label: 'Select Logistician',
            component: <LogisticianSelection
                value={returnInfo.logistician || ''}
                onChange={handleLogisticianChange}
            />,
        },
        {
            label: 'Select Warehouse Location',
            component: <WarehouseSelection value={returnInfo.warehouse || ''} onChange={handleWarehouseChange} />,
        },
        {
            label: 'Enter Delivery ID or Delivery Order ID',
            component: <IDSelection loading={loading} error={error} item={returnInfo.deliveryInfo} onChange={handleSelectID} />,
        },
        {
            label: 'Choose Items and Quantity',
            component: loading || !order ? (
                <Typography variant="body1">Loading...</Typography>
            ) : (
                <ItemSelection items={order.shippedItems} shippedItem={returnInfo.shippedItems} onItemSelect={handleItemSelect} />
            ),
        },
        {
            label: 'Summary',
            component: <Summary summary={returnInfo} />,
        },
    ];

    return (
        <Box sx={{ maxWidth: 600, width: '100%' }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={index === steps.length - 1 ? (
                                <Typography variant="caption">Last step</Typography>
                            ) : null}
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            {step.component}
                            <Box sx={{ mt: 2 }}>
                                <div>
                                    <Button
                                        disabled={!completedSteps[index] || loading || !!error}
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3, mt: 2 }}>
                    <Typography>All steps completed - your order {id} is on its way!</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}

export default Return;
