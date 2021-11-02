import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import '../css/bootstrap.min.css';

function EditCustomer(props) {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });

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
        props.addCustomer(customer);
        setCustomer({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    }

    const handleChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <Button style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10 }} variant="contained" class="btn btn-primary" onClick={handleOpen}>Add customer</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleChange}
                        label="First name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleChange}
                        label="Last name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="streetaddress"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleChange}
                        label="Streetaddress"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleChange}
                        label="Postcode"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="city"
                        name="city"
                        value={customer.city}
                        onChange={handleChange}
                        label="City"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        label="Email"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        name="phone"
                        value={customer.phone}
                        onChange={handleChange}
                        label="Phone"
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

export default EditCustomer;