import MateriUIDrawer from './Drawer';

import React, { useState, useEffect } from 'react';
import { BarChart, XAxis, YAxis, Bar, Tooltip, } from 'recharts';
import calc from 'lodash';

function Statistics() {

    const [trainings, setTraining] = useState([]);
    const trainingData = [];

    const fetchTrainingData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings').then(async response => {

            try {

                const data = await response.json()

                data.map(training => {
                    const durationData = { activity: training.activity, duration: training.duration };
                    trainingData.push(durationData);
                })
                const results = calc(data)
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
    }, []);

    return (
        <div>
            <MateriUIDrawer />
            <p>Duration (min)</p>
            <BarChart width={1200} height={700} data={trainings}>
                <XAxis dataKey="name" />
                <YAxis dataKey="duration" />
                <Tooltip />
                <Bar dataKey="duration" fill="#8A2BE2" />
            </BarChart>
        </div>
    );
}

export default Statistics;
