import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'
import ReactTable from 'react-table-6';
import { CSVDownload } from 'react-csv';
import { render } from '@testing-library/react';

import EditTraining from './EditTraining';
import AddCustomer from './AddCustomer';

import MateriUIDrawer from './Drawer';

import 'react-table-6/react-table.css';

/* 
await fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => console.log(data.content[0].links[0].href))
*/

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
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        fetchTrainingData();
    }, []);

    const addTraining = (value) => {
        fetch('https://customerrest.herokuapp.com/api/customers', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(value) })
            .then(response => response.json())
            .then(data => fetchTrainingData())
            .catch(error => console.error(error))
    }

    const deleteTraining = (value) => {
        if (window.confirm("Do you really want to delete this training?")) {
            fetch(value, { method: 'DELETE' })
                .then(response => fetchTrainingData())
                .catch(error => console.error(error))
        }
    }

    const resetData = () => {
        fetch('https://customerrest.herokuapp.com/reset', { method: 'POST' })
            .then(fetchTrainingData)
            .catch(error => console.error(error))
    }

    const editTraining = (value, training) => {
        fetch(value, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(training) })
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
