export interface IShippedItem{
    sku: string;
    quantity: number;
    reason: string;
    annotation?: string
}

export interface IOrderInfo{
    logistician: string;
    warehouse: string;
    deliveryInfo: {
        type: string;
        id: string
    };
    shippedItems: IShippedItem[]
}