import MateriUIDrawer from './Drawer';

import React, { useState, useEffect } from 'react';
import { BarChart, XAxis, YAxis, Bar, Tooltip, Cell } from 'recharts';
import calc from 'lodash';

function Statistics() {

    const [trainings, setTraining] = useState([]);
    const trainingData = [];

    const fetchTrainingData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings').then(async response => {

            try {

                const data = await response.json()

                data.forEach(training => {
                    const durationData = { activity: training.activity.toLowerCase(), duration: training.duration };
                    trainingData.push(durationData);
                })
                const results = calc(trainingData)
                    .groupBy("activity")
                    .map((name, id) => ({
                        name: id,
                        duration: calc.sumBy(name, 'duration'),
                    }))
                    .value()
                setTraining(results);
            } catch (error) {
                console.log(error);
            }
        })
    }
    useEffect(() => {
        fetchTrainingData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    trainingData.length = 0;

    for (let i = 0; i < trainings.length; i++) {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        trainingData.push({ color: randomColor })
    }

    return (
        <div>
            <MateriUIDrawer />
            <p>Duration (min)</p>
            <BarChart width={1200} height={700} data={trainings}>
                <XAxis dataKey="name" />
                <YAxis dataKey="duration" />
                <Tooltip />
                <Bar dataKey="duration" fill="#8A2BE2">
                    {trainingData.map((entry, index) => (
                        <Cell fill={trainingData[index].color} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    );
}

export default Statistics;
