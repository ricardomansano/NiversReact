// Imports internos
import './App.css';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// [*SPA] Componentes da aplicacao
import HomeApp from './components/Home';
import Nivers from './components/Nivers';
import Hooks from './components/Hooks'

// [*Router] Componentes do roteamento
import { BrowserRouter as Router, Route } from 'react-router-dom'

// [*Material_UI]
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Home from '@material-ui/icons/Home';
import Cake from '@material-ui/icons/Cake';
import DeviceHub from '@material-ui/icons/DeviceHub';

// Classe principal
export default class App extends React.Component{
  constructor(props) {
    super(props)
    
    this.state = {
      calledFunc: <HomeApp/> // Funcao sendo executada
    };
  }

  // Acoes do Menu
  menuOption = () => { return this.state.calledFunc }
  menuClick = (func) => {
    this.setState({calledFunc: func})    
    this.menuClose()
  }
  menuMainClick = (event) => {
    this.setState({ open: !this.state.open, anchorEl: event.currentTarget });
  }
  menuClose = () => { 
    this.setState({ open: false })
  } 
 
  render() {
    const {
      open,
      anchorEl,
    } = this.state;

    return(
      <div className="App">
        {/* [*AppBar] */}
        <AppBar position="static" style={{maxHeight: 50}}>
          <Toolbar style={{padding: 0}}>
            <div>
              <Tooltip title="Menu principal">
                <IconButton color="inherit" style={{paddingTop: 0}}
                  onClick={ this.menuMainClick } >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div style={{flex: "1 1 auto", textAlign: "right"}}>
              <Tooltip title="Home">
                <IconButton color="inherit" style={{paddingTop: 0}}
                  onClick={() => { this.menuClick(<HomeApp/>)} }>
                  <Home />
                </IconButton>
              </Tooltip>
              <Tooltip title="Aniversários">
                <IconButton color="inherit" style={{paddingTop: 0}}
                  onClick={() => { this.menuClick(<Nivers title='Nivers'/>)} }>
                  <Cake />
                </IconButton>
              </Tooltip>
              <Tooltip title="Hooks - Utiliza Função ao inves de Classe">
                <IconButton color="inherit" style={{paddingTop: 0}}
                  onClick={() => { this.menuClick(<Hooks title='Hooks'/>)} }>
                  <DeviceHub />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>        

        {/* [*MainMenu] */}
        <Menu
          style={{ marginRight: '8vw' }}
          open={open}
          onClose={this.menuClose}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'Left' }}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={() => this.menuClick(<HomeApp/>)}><Home/>&nbsp;&nbsp;Home</MenuItem>
          <MenuItem onClick={() => this.menuClick(<Nivers title='Nivers'/>)}><Cake />&nbsp;&nbsp;Aniversários</MenuItem>
          <MenuItem onClick={() => this.menuClick(<Hooks/>)}><DeviceHub />&nbsp;&nbsp;Hooks</MenuItem>
        </Menu>

        {/* [*Router] Container do Roteador */}
        <Router>
            <Route component={this.menuOption}/>
        </Router>

      </div>
    )
  }
}