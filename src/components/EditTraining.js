import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import '../css/bootstrap.min.css';

function EditTraining(props) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({ date: '', activity: '', duration: '', firstname: '', lastname: '' });
    const [view, setView] = useState({ date: ''});
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '', links: '' });

    const fetchCustomerData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + props.training.id + '/customer')
            .then(response => response.json())
            .then(data => setCustomer(data))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        fetchCustomerData();
    }, []);

    const handleOpen = () => {
        setTraining({ date: props.training.date.split("T")[0] + " " + props.training.date.split("T")[1].split(":")[0] + ":" + props.training.date.split("T")[1].split(":")[1], activity: props.training.activity, duration: props.training.duration, firstname: props.training.customer.firstname, lastname: props.training.customer.lastname });
        setView({ date: props.training.date.split("T")[0] + " " + props.training.date.split("T")[1].split(":")[0] + ":" + props.training.date.split("T")[1].split(":")[1]});
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleTrainingSave = () => {

        /*console.log(training.date);

        var now = new Date(training.date);

        var isoString = now.toISOString();

        console.log(isoString);

        setTraining({ ...training, date: isoString });*/
        handleClose();
        handleCustomerSave()
        props.editTraining('https://customerrest.herokuapp.com/api/trainings/' + props.training.id, training);
        setTraining({ date: '', activity: '', duration: '', firstname: '', lastname: '' });
    }

    const handleCustomerSave = () => {
        fetch(customer.links[0].href, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(customer) })
            .then(response => fetchCustomerData())
            .catch(err => console.error(err))
        setCustomer({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '', links: '' });
    }

    const handleChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <Button variant="contained" class="btn btn-info" onClick={handleOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit training</DialogTitle>
                <DialogContent>
                <TextField
                        margin="dense"
                        id="date"
                        name="date"
                        value={view.date}
                        onChange={handleChange}
                        label="Date"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="activity"
                        name="activity"
                        value={training.activity}
                        onChange={handleChange}
                        label="Activity"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="duration"
                        name="duration"
                        value={training.duration}
                        onChange={handleChange}
                        label="Duration"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleChange}
                        label="Firstname"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleChange}
                        label="Lastname"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" class="btn btn-danger">
                        Cancel
                    </Button>
                    <Button onClick={handleTrainingSave} variant="contained" class="btn btn-success">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditTraining;