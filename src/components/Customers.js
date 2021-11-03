import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'
import ReactTable from 'react-table-6';
import { CSVDownload } from 'react-csv';
import { render } from '@testing-library/react';

import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import AddCustomer from './AddCustomer';

import MateriUIDrawer from './Drawer';

import 'react-table-6/react-table.css';

function CustomerListing() {

  const [customers, setCustomers] = useState([]);
  const csvCustomers = [];

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const columns = [
    {
      Header: 'First name',
      accessor: 'firstname'
    },
    {
      Header: 'Last name',
      accessor: 'lastname'
    },
    {
      Header: 'Street address',
      accessor: 'streetaddress'
    },
    {
      Header: 'Postcode',
      accessor: 'postcode'
    },
    {
      Header: 'City',
      accessor: 'city'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
    {
      filterable: false,
      sortable: false,
      Cell: row => (<AddTraining customer={row.original} addTraining={addTraining} />)
    },
    {
      accessor: 'links[0].href',
      filterable: false,
      sortable: false,
      Cell: row => (<Button variant="contained" onClick={() => deleteCustomer(row.value)} class="btn btn-warning">Delete</Button>)
    },
    {
      filterable: false,
      sortable: false,
      Cell: row => (<EditCustomer customer={row.original} editCustomer={editCustomer} />)
    }
  ]

  async function csvSorting() {

    csvCustomers.length = 0;

    await sleep(1000)

    for (let i = 0; i < customers.length; i++) {

      csvCustomers.push({ firstname: customers[i].firstname, lastname: customers[i].lastname, streetaddress: customers[i].streetaddress, postcode: customers[i].postcode, city: customers[i].city, email: customers[i].email, phone: customers[i].phone, links: customers[i].links[0].href });
    }
    render(
      <CSVDownload data={csvCustomers} target="_blank" />
    )
  }

  const fetchCustomerData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const addTraining = (training) => {
    let formattedDate = training.date.split(".")[2].split(" ")[0] + "-" + training.date.split(".")[1] + "-" + training.date.split(".")[0] + " " + training.date.split(" ")[1];
    let now = new Date(formattedDate);
    let isoString = now.toISOString();

    let hour = parseInt(isoString.split("T")[1].split(":")[0]) + 2;

    if (hour < 10) {
        hour = '0' + hour;
    }

    let minutes = parseInt(isoString.split("T")[1].split(":")[1]);

    if (parseInt(minutes) < 10) {
        minutes = parseInt(isoString.split("T")[1].split(":")[2]) + '' + parseInt(isoString.split("T")[1].split(":")[1]);
    }

    let time = hour + ":" + minutes;
    formattedDate = isoString.split("T")[0] + "T" + time + ":00.000Z";

    fetch('https://customerrest.herokuapp.com/api/trainings', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ date: formattedDate, activity: training.activity, duration: training.duration, customer: training.customer }) })
      .then(response => response.json())
      .then(data => fetchCustomerData())
      .catch(error => console.error(error))
  }

  const addCustomer = (value) => {
    fetch('https://customerrest.herokuapp.com/api/customers', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(value) })
      .then(response => response.json())
      .then(data => fetchCustomerData())
      .catch(error => console.error(error))
  }

  const deleteCustomer = (value) => {
    if (window.confirm("Do you really want to delete this customer? All the related trainings will be deleted.")) {
      fetch(value, { method: 'DELETE' })
        .then(response => fetchCustomerData())
        .catch(error => console.error(error))
    }
  }

  const resetData = () => {
    if (window.confirm("Are you sure? This will reset the whole database (customers/trainings) to its original values.")) {
      fetch('https://customerrest.herokuapp.com/reset', { method: 'POST' })
        .then(fetchCustomerData)
        .catch(error => console.error(error))
    }
  }

  const editCustomer = (value, customer) => {
    fetch(value, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(customer) })
      .then(response => fetchCustomerData())
      .catch(err => console.error(err))
  }

  return (
    <div>
      <MateriUIDrawer />
      <Button><AddCustomer addCustomer={addCustomer} /></Button>
      <Button style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10 }} variant="contained" onClick={csvSorting} class="btn btn-secondary">CSV Export</Button>
      <Button style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10 }} variant="contained" onClick={resetData} class="btn btn-danger">Reset all data</Button>
      <ReactTable filterable={true} defaultPageSize={10}
        data={customers} columns={columns} />
    </div>
  );
}

export default CustomerListing;
