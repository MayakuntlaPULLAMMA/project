import React, { useState } from 'react';
import './App.css';
import Scpnavbar from './Components/Navbar/Scpnavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import SCP_Dataset from './Components/Datasets/Scp_Dataset';
import Terms_used from './Components/Tutorial/Terms_used';
import AppContext from './Components/App_context';
import SCP_Form from './Components/Form/Scp_Form';
import GTCP_Form from './Components/Form/Gtcp_form';
import Struct from './Components/Form/struct';
import SCP_Guidelines from './Components/Guidelines/Scp_Guidelines';
import SCP_Files from './Components/Files/Scp_Files';
import Contact from './Components/Contact/Contact';
import background from './Images/theme.png';
import GTCP_Guidelines from './Components/Guidelines/Gtcp_guidelines';
/*import Mainnavbar from './Components/Navbar/Mainnavbar';*/
import Scp_home from './Components/Pages/Scp_home';
import Gtcp_home from './Components/Pages/Gtcp_home';
import Gtcp_Terms_used from './Components/Tutorial/gtcp_terms_used';
import Mincs from './Components/Defs/mincs';
import { useMediaQuery } from 'react-responsive';
function App({history}) {
  const [sidebar,setSidebar]=useState(true);
  const [dataset_name,setdatasetname]=useState("");
  const [structure,setstructure]=useState(0);
  const show=()=>{
    setSidebar(!sidebar);
  }
  const structure_display=(d)=>{
    console.log("came back to app");
    setstructure(d);
  }
  const dataset_set=(data)=>{
    setdatasetname(data);
  }
  console.log("datasetname");
  console.log(dataset_name);
  
 
  const user_settings={
    side:sidebar,
    dataset:dataset_name,
    structure:structure,
    
   
    show,
    dataset_set,
    setdatasetname,
    structure_display
   

  }
  const myStyle=
  {
    
 }
  
  return (
    <div style={myStyle} className="app">
      <AppContext.Provider value={user_settings}>
      <Router>
        <Scpnavbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/scp_terms_used' component={Terms_used}/>
          <Route path='/scp_guidelines' component={SCP_Guidelines}/>
          <Route path='/scp_datasets' component={SCP_Dataset} />
          <Route path='/scp_form' component={SCP_Form} />
          <Route path='/scp_files' component={SCP_Files}/>
          <Route path='/scp_contact' component={Contact}/>
          <Route path='/scp_patterns_home' component={Scp_home}/>
          <Route path='/structureofinterest' component={Struct}/>
          <Route path='/scp_mincs' component={Mincs}/>

          <Route path='/gtcp_patterns_home' component={Gtcp_home}/>
          <Route path='/gtcp_terms_used' component={Gtcp_Terms_used}/>
          <Route path='/gtcp_guidelines' component={GTCP_Guidelines}/>
          <Route path='/gtcp_datasets' component={SCP_Dataset} />
          <Route path='/gtcp_form' component={GTCP_Form} />
          <Route path='/gtcp_files' component={SCP_Files}/>
          <Route path='/gtcp_contact' component={Contact}/>
          {/*<Route path='/gtcp_patterns_home' component={Gtcp_home}/>*/}
          <Route path='/gtcp_mincs' component={Mincs}/>
        </Switch>
      </Router>
    </AppContext.Provider>
    </div>
  );
}

export default App;