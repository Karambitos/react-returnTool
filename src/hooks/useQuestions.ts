import { useState, useEffect } from 'react';

const questions = [
    { "text": "No longer needed", "stringVal": "RO_CR-UNWANTED_ITEM" },
    { "text": "Performance or quality not adequate", "stringVal": "RO_CR-QUALITY_UNACCEPTABLE" },
    { "text": "Product and delivery box both damaged", "stringVal": "RO_CR-DAMAGED_BY_CARRIER" },
    { "text": "Description on website was not accurate", "stringVal": "RO_AMZ-PG-BAD-DESC" },
    { "text": "Missing parts or accessories", "stringVal": "RO_CR-MISSING_PARTS" },
];

const useQuestions = () => {
    const [allQuestions, setAllQuestions] = useState(questions);

    useEffect(() => {
        setAllQuestions(questions);
    }, []);

    const getTextByStringVal = (stringVal: string): string | undefined => {
        const question = allQuestions.find(q => q.stringVal === stringVal);
        return question ? question.text : undefined;
    };

    return {
        allQuestions,
        getTextByStringVal
    };
};

export default useQuestions;
