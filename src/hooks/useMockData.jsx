import {useEffect, useState} from "react";

const useMockData = () => {
    const [champions, setChampions] = useState([]);

    // [
    //     { id: 1, name: 'item1' },
    //     { id: 2, name: 'item2' },
    // ]

    useEffect(() => {
        //simulates request timing
        setTimeout(() => setChampions(generateMockData(15)), 500);
    }, [])

    return champions;
}

const generateMockData = (size) => {
    const mockData = [];

    for (let i = 0; i < size; i++) {
        mockData.push({
            id: i + 1,
            name: `Item ${i + 1}`,
        });
    }

    return mockData;
};


export default useMockData;
