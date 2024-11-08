/*import {React,Component} from 'react';
import Barchart  from './g';
class Guidelines extends Component {
  
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 700,
    height: 500,
    id: 1
  }

  render() {
    return (
      <div className="App">
        <Barchart data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}
export default Guidelines;*/
import React, {useState,useContext} from 'react';
import './Form1.css';
import AppContext from '../App_context';
import { Container } from 'reactstrap';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Loader from "react-loader-spinner";
import Button from '@material-ui/core/Button';
import './Guidelines.css'; 

const SCP_Guidelines=()=>{
    const myContext = useContext(AppContext);
    return(
        <div className={myContext.side ? "terms_main_div_shrink" : "terms_main_div"}>
        <div className="terms_heading">
            <div>Guidelines</div>
        </div>
        <hr className="terms_horizontal_line"/>
        <div className="bulletpoints_content">
            <p><div className="bullets"><li>The <i>minRF<sub>g</sub></i> threshold value can be set to half the maximum <i>minRF<sub>g</sub></i>{' '} value.{' '}Then, based on number of coverage patterns, <i>minRF<sub>g</sub></i>{' '} can be decreased.</li></div></p>
        </div>
        <div className="bulletpoints_content">
            <p><div className="bullets"><li>The goal is to extract <i>SCPs</i> with maximum coverage, while minimizing the overlap to zero. Hence, as a heuristic, we could
start with the coverage support value equal to 1 and
then progressively keep decreasing the value of coverage support until a desired number of <i>SCPs</i> is obtained</li></div></p>

        </div>
        <div className="bulletpoints_content">
            <p><div className="bullets"><li>Regarding maxOR<i>g</i>,{' '}we can start with <i>maxOR<sub>g</sub></i> equal
to 0 and then progressively keep increasing the value
of <i>maxOR<sub>g</sub></i> until a desired number of <i>SCPs</i> can be ob-
tained.</li></div></p>

        </div>
    </div>
    
    );


}
export default SCP_Guidelines;