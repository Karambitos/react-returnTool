import { useEffect, useState } from 'react';
import data from "../components/mockup.json";
import { IOrderInfo, IShippedItem } from "../types";

interface IDataOrder {
    loading: boolean;
    error: string | null;
    order: IOrderInfo | null;
}

interface IItem {
    id: string;
    deliveryId: string;
    deliveryOrderId: string;
    shippedItems: IShippedItem[];
}

const useDataOrder = ({ type, id }: { type: string; id: string }): IDataOrder => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [order, setOrder] = useState<IOrderInfo | null>(null);

    const fetchData = (paramType: string, paramValue: string) => {
        return new Promise<IItem>((resolve, reject) => {
            setTimeout(() => {
                const result =
                    paramType === 'deliveryId'
                        ? data.filter(item => item.deliveryId === paramValue)
                        : data.filter(item => item.deliveryOrderId === paramValue);
                if (result && result.length > 0) {
                    // @ts-ignore
                    resolve(result[0]);
                    setError(null);
                } else {
                    setError('No data found');
                    reject(new Error('Data not found'));
                }
            }, 1000);
        });
    };

    useEffect(() => {
        if (type && id) {
            setLoading(true);
            fetchData(type, id)
                .then(response => {
                    // @ts-ignore
                    setOrder(response);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                    setLoading(false);
                });
        }
    }, [type, id]);

    return {
        loading,
        error,
        order
    };
};

export default useDataOrder;
