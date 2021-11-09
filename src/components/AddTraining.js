import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import '../css/bootstrap.min.css';

function AddTraining(props) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({ date: '', activity: '', duration: '', customer: '' });

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleSave = () => {
        handleClose();
        props.addTraining({ date: training.date, activity: training.activity, duration: training.duration, customer: props.customer.links[0].href });
        setTraining({ date: '', activity: '', duration: '', customer: '' });
    }

    const handleChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <Button variant="contained" class="btn btn-primary" onClick={handleOpen}>Add training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="date"
                        name="date"
                        value={training.date}
                        onChange={handleChange}
                        label="Date e.g. 13.12.2021 09:00"
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
                        label="Duration (min)"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        value={props.customer.firstname}
                        label="First name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        value={props.customer.lastname}
                        label="Last name"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" class="btn btn-danger">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" class="btn btn-success">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddTraining;