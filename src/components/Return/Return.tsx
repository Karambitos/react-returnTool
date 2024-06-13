import React, {useEffect, useState} from "react";
import {Typography, Paper, Button, StepContent, StepLabel, Step, Stepper, Box} from '@mui/material';
import {SelectChangeEvent} from "@mui/material/Select";
import {IDSelection, ItemSelection, LogisticianSelection, Summary, WarehouseSelection} from "../index";
import {IOrderInfo, IShippedItem} from "../../types";
import useDataOrder from "../../hooks/useDataOrder";

const Return = () => {
    const [id, setId] = useState('');
    const [type, setType] = useState('deliveryId');
    const [returnInfo, setReturnInfo] = useState<IOrderInfo>({} as IOrderInfo);
    const { loading , error, order } = useDataOrder({type, id});

    useEffect(() => {
        console.log(loading, error, order)
    }, [order]);

    const handleLogisticianChange = (event: SelectChangeEvent) => {
        setReturnInfo({...returnInfo, logistician: event.target.value as string})
        updateStepCompletion(0, true);
    };

    const handleWerehouseChange = (event: SelectChangeEvent) => {
        setReturnInfo({...returnInfo, warehouse: event.target.value as string})
        updateStepCompletion(1, true);
    };

    const handleSelectID = ({ type, id }: { type: string; id: string }) => {
        setReturnInfo({...returnInfo, deliveryInfo: {type, id}})
        setId(id);
        setType(type);
        updateStepCompletion(2, true);
    };

    const handleItemSelect = (selecdedItems: IShippedItem[]) => {
        if (selecdedItems.length > 0) {
            selecdedItems.forEach(item => {
                if (item.reason) {
                    setReturnInfo({...returnInfo, shippedItems: selecdedItems})
                    updateStepCompletion(3, true);
                } else {
                    updateStepCompletion(3, false);
                }
            })
        } else {
            updateStepCompletion(3, false);
        }
    };

    const handleFinish = () => {
        console.log('Submit return info:', returnInfo);
    };

    /*
    * Steps
    */
    const [activeStep, setActiveStep] = React.useState(0);
    const [completedSteps, setCompletedSteps] = React.useState<boolean[]>([false, false, false, false, true]);

    const updateStepCompletion = (stepIndex: number, completed: boolean) => {
        const updatedSteps = [...completedSteps];
        updatedSteps[stepIndex] = completed;
        setCompletedSteps(updatedSteps);
    };
    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handleFinish();
        }
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
            label: 'Select Logistic campaign',
            description: 'Select 1 out of 3 logisticans',
            component: <LogisticianSelection
                value={returnInfo.logistician || ''}
                onChange={handleLogisticianChange}
            />,
        },
        {
            label: 'Select Wearehouse location',
            description: 'Select 1 out of 5 warehouses',
            component: <WarehouseSelection value={returnInfo.warehouse || ''} onChange={handleWerehouseChange} />

        },
        {
            label: 'Enter Delivery Id or Delivery Order Id',
            description: 'Choose between DeliveryId or DeliveryOrderId and enter an ID',
            component: <IDSelection loading={loading} error={error} item={returnInfo.deliveryInfo} onChange={handleSelectID} />
        },
        {
            label: 'Choose the items and quantity',
            description: error ? error : 'Chose the items you want to return and quantity, chooses 1 out of 5 return reasons for every returned item. Also if You want you can add an annotation',
            component: loading || !order ? (
                <div>No data...</div>
            ) : (
                <ItemSelection items={order.shippedItems} returnInfo={returnInfo.shippedItems} onItemSelect={handleItemSelect} />
            ),
        },
        {
            label: 'Summary',
            description: 'Please check your return summary',
            component: <Summary summary={returnInfo} onSubmit={()=> console.log('submit')} />
        },
    ];

    return (
        <Box sx={{ maxWidth: 600 , width: '100%'}}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === steps.length - 1 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            {step.component}
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        disabled={!completedSteps[index] || loading || !!error}
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
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
                <Paper square elevation={0} sx={{ p: 3 }}>
                    {/*// TODO: add order number*/}
                    <Typography>All steps completed - you&apos;re order number is SOME NOMBER </Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}


export default Return;