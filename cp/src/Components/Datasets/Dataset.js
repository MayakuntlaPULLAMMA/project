import React, { useState,useContext } from 'react';
import './Dataset.css';
import axios from 'axios';
import AppContext from '../App_context';
import Image from '../../Images/Graph_example.png';

const Dataset=()=>{
    const myContext = useContext(AppContext);
    return(
        <div className={myContext.side  ? "total_div": "total_div_1"}>
            <div className="display_flex">
            <div className="datasetandmodelling">
                <h5 className="heading_datamodelling">Dataset Format and Modelling</h5>
                <p className="ins_description">1. Dataset File Extension ---- '.txt'.</p>
                <p className="ins_description">2. Everyline in the file starts with a letter 't' or 'v' or 'e'.</p>
                <p className="ins_description">3. Line starting with a letter 't' denotes a 'transaction'.</p>
                <p className='ins_description'>4. A transaction is of the form 't # x' where 'x' is transaction id (usually starts from zero).</p>
                <p className='ins_description'>5. Line starting with a letter 'v' denotes a vertex.</p>
                <p className='ins_description'>6. A vertex is of the form 'v x y' where 'x' is vertex number and 'y' is vertex label.</p>
                <p className='ins_description'>7. Line starting with a letter 'e' denotes an edge.</p>
                <p className='ins_description'>8. An edge is of the form 'e x y z' where 'x' is vertex id and 'y' is a vertex id and 'z' is the edge label.</p>
                <p className='ins_description'>9. Ensure that for every transaction , vertices should be followed by edges that lines starting with 'v' must become before lines starting with 'e'.</p>
                


            </div>
            <div className="datasetandmodelling">
            <h5 className="heading_datamodelling">Example</h5>

            <img src={Image} className="graph_image"></img>
            </div>
            </div>
        </div>
    );
}
export default Dataset;