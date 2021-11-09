import React, { useState } from 'react';
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

    const handleOpen = () => {
        setTraining({ date: props.training.date, activity: props.training.activity, duration: props.training.duration, firstname: props.training.customer.firstname, lastname: props.training.customer.lastname });
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleTrainingSave = () => {
        handleClose();
        props.editTraining('https://customerrest.herokuapp.com/api/trainings/' + props.training.id, training);
        setTraining({ date: '', activity: '', duration: '', firstname: '', lastname: '' });
    }

    const handleChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
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
