import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'
import ReactTable from 'react-table-6';
import { CSVDownload } from 'react-csv';
import { render } from '@testing-library/react';

import EditTraining from './EditTraining';

import MateriUIDrawer from './Drawer';

import 'react-table-6/react-table.css';

function TrainingsListing() {

    const [trainings, setTrainings] = useState([]);
    const csvTrainings = [];

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const columns = [
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'First name',
            accessor: 'customer.firstname'
        },
        {
            Header: 'Last name',
            accessor: 'customer.lastname'
        },
        {
            accessor: 'id',
            filterable: false,
            sortable: false,
            Cell: row => (<Button variant="contained" onClick={() => deleteTraining('https://customerrest.herokuapp.com/api/trainings/' + row.value)} class="btn btn-warning">Delete</Button>)
        },
        {
            filterable: false,
            sortable: false,
            Cell: row => (<EditTraining training={row.original} editTraining={editTraining} />)
        }
    ]

    async function csvSorting() {

        csvTrainings.length = 0;

        await sleep(1000)

        for (var i = 0; i < trainings.length; i++) {

            csvTrainings.push({ date: trainings[i].date, activity: trainings[i].activity, duration: trainings[i].duration, firstname: trainings[i].customer.firstname, lastname: trainings[i].customer.lastname, links: 'https://customerrest.herokuapp.com/api/trainings/' + trainings[i].id });
        }
        render(
            <CSVDownload data={csvTrainings} target="_blank" />
        )
    }

    const fetchTrainingData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings').then(async response => {

            try {
                const data = await response.json()

                for (var i = 0; i < data.length; i++) {
                    data[i].date = data[i].date.substring(8, 10) + "." + data[i].date.substring(5, 7) + "." + data[i].date.substring(0, 4) + " " + data[i].date.substring(11, 16);
                }

                setTrainings(data);
            } catch (error) {
                console.error(error)
            }
        })
    }

    useEffect(() => {
        fetchTrainingData();
    }, []);

    const deleteTraining = (value) => {
        if (window.confirm("Do you really want to delete this training?")) {
            fetch(value, { method: 'DELETE' })
                .then(response => fetchTrainingData())
                .catch(error => console.error(error))
        }
    }

    const resetData = () => {
        if (window.confirm("Are you sure? This will reset the whole database to its original values.")) {
            fetch('https://customerrest.herokuapp.com/reset', { method: 'POST' })
                .then(fetchTrainingData)
                .catch(error => console.error(error))
        }
    }

    const editTraining = (value, training) => {
        var formattedDate = training.date.split(".")[2].split(" ")[0] + "-" + training.date.split(".")[1] + "-" + training.date.split(".")[0] + " " + training.date.split(" ")[1];
        var now = new Date(formattedDate);
        var isoString = now.toISOString();

        var hour = parseInt(isoString.split("T")[1].split(":")[0]) + 2;

        if (hour < 10) {
            hour = '0' + hour;
        }

        var minutes = parseInt(isoString.split("T")[1].split(":")[1]) + '' + parseInt(isoString.split("T")[1].split(":")[2]);
        var time = hour + ":" + minutes;
        formattedDate = isoString.split("T")[0] + "T" + time + ":00.000Z";

        fetch(value, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ date: formattedDate, activity: training.activity, duration: training.duration, firstname: training.firstname, lastname: training.lastname }) })
            .then(response => fetchTrainingData())
            .catch(err => console.error(err))
    }

    return (
        <div>
            <MateriUIDrawer />
            <Button style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10 }} variant="contained" onClick={csvSorting} class="btn btn-secondary">CSV Export</Button>
            <Button style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10 }} variant="contained" onClick={resetData} class="btn btn-danger">Reset all data</Button>
            <ReactTable filterable={true} defaultPageSize={10}
                data={trainings} columns={columns} />
        </div>
    );
}

export default TrainingsListing;
