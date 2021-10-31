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
        setCustomer({ firstname: props.customer.firstname, lastname: props.customer.lastname, streetaddress: props.customer.streetaddress, postcode: props.customer.postcode, city: props.customer.city, email: props.customer.email, phone: props.customer.phone });
        setOpen(true);
    }

    const handleClose = () => {
        props.editCustomer(props.customer.links[0].href, customer);
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <Button variant="contained" class="btn btn-info" onClick={handleOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
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
                    <Button onClick={handleClose} variant="contained" class="btn btn-success">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCustomer;