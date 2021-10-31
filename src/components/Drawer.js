import { Drawer, Divider, IconButton, Typography, Box, FormControl, FormLabel } from '@material-ui/core';
import React from 'react';
import { Link } from "react-router-dom";
import ReorderIcon from '@material-ui/icons/Reorder';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import '../css/bootstrap.min.css';

const styles = {
    sideNav: {
        marginTop: '-60px',
        zIndex: 3,
        marginLeft: '0px',
        position: 'absolute',
    },
    link: {
        color: 'black',
        textDecoration: 'none',
    },
};

export default class MaterialUIDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawerOpened: false,
        };
    }

    toggleDrawerStatus = () => {
        this.setState({
            isDrawerOpened: true,
        })
    }
    closeDrawer = () => {
        this.setState({
            isDrawerOpened: false,
        })
    }

    render() {

        const { isDrawerOpened } = this.state;

        return (
            <div>
                <div style={styles.sideNav}>

                    <IconButton color='inherit' size='medium' onClick={this.toggleDrawerStatus} aria-label="Valikko">
                        {!isDrawerOpened ? <ReorderIcon /> : null}
                    </IconButton>
                </div>
                <Divider />
                <Drawer
                    variant="temporary"
                    open={isDrawerOpened}
                    onClose={this.closeDrawer}
                >
                    <div>
                        <Box display="flex" justifyContent="flex-end" m={0} p={0}>
                            <Box p={0}>
                                <IconButton aria-label="Valikko"
                                    onClick={this.closeDrawer}>
                                    {!isDrawerOpened ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </Box>
                        </Box>
                    </div>
                    <Box display="flex" justifyContent="center" mb={1} p={0} style={{ height: 40 }}>
                        <Box p={1}>
                            <Typography
                                variant="h2"
                                style={{ color: '#323576' }}
                            >
                                Personal<br />Trainer
                            </Typography>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="center" m={2} pt={2} style={{ height: 50 }} />
                    <Box display="flex" justifyContent="flex-start" ml={4} p={0} mt={1}>
                        <Box p={1}>
                            <FormControl component="fieldset" margin='dense'>
                                <FormLabel
                                    component="legend">Tabs
                                </FormLabel>
                                <Link style={{ color: 'white' }} to="/customers"><button style={{ marginTop: '10px', marginBottom: '10px', width: 100 }} class="btn btn-primary">Customers</button></Link>
                                <Link style={{ color: 'white' }} to="/trainings"><button style={{ marginTop: '10px', marginBottom: '10px', width: 100 }} class="btn btn-primary">Trainings</button></Link>
                                <Link style={{ color: 'white' }} to="/calendar"><button style={{ marginTop: '10px', marginBottom: '10px', width: 100 }} class="btn btn-primary">Calendar</button></Link>
                                <Link style={{ color: 'white' }} to="/statistics"><button style={{ marginTop: '10px', marginBottom: '10px', width: 100 }} class="btn btn-primary">Statistics</button></Link>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems='center' ml={0} p={0} mt={0}>
                        <Box p={1} order={1}>
                        </Box>
                        <Box p={1} order={2}>
                        </Box>
                    </Box>
                </Drawer>
            </div>
        );
    }
}
