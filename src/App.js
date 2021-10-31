import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics'; 

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import './css/App.css';
import './css/bootstrap.min.css';


import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: '#30D5C8' }}>
          <Toolbar>
            <h1 style={{ marginLeft: 20 }}>Personal Trainer</h1>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Customers} />
          <Route path="/customers" component={Customers} />
          <Route path="/trainings" component={Trainings} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/statistics" component={Statistics} />
          <Route render={() => <h1 style={{ color: 'white' }}>Page not found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
