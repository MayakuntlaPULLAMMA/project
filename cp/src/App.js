import React, { useState } from 'react';
import './App.css';
import Scpnavbar from './Components/Navbar/Scpnavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Dataset from './Components/Datasets/Dataset';
import Terms_used from './Components/Tutorial/Terms_used';
import AppContext from './Components/App_context';
import Form from './Components/Form/Form';
import Guidelines from './Components/Guidelines/Guidelines';
import Files from './Components/Files/Files';
import Contact from './Components/Contact/Contact';
import Mainnavbar from './Components/Navbar/Mainnavbar';
import Scp_home from './Components/Pages/Scp_home';
import Coverage_home from './Components/Pages/Coverage_home';
import Mincs from './Components/Defs/mincs';
function App({history}) {
  const [sidebar,setSidebar]=useState(true);
  const [dataset_name,setdatasetname]=useState("");
  const show=()=>{
    setSidebar(!sidebar);
  }
  const dataset_set=(data)=>{
    setdatasetname(data);
  }
  console.log("datasetname");
  console.log(dataset_name);
  
 
  const user_settings={
    side:sidebar,
    dataset:dataset_name,
    
   
    show,
    dataset_set,
    setdatasetname,
   

  }
  
  return (
    <div className="app">
      <AppContext.Provider value={user_settings}>
      <Router>
        <Scpnavbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/terms_used' component={Terms_used}/>
          <Route path='/guidelines' component={Guidelines}/>
          <Route path='/datasets' component={Dataset} />
          <Route path='/form' component={Form} />
          <Route path='/files' component={Files}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/scp_patterns_home' component={Scp_home}/>
          <Route path='/mincs' component={Mincs}/>
          <Route path='/coverage_patterns_home' component={Coverage_home}/>
        </Switch>
      </Router>
    </AppContext.Provider>
    </div>
  );
}

export default App;