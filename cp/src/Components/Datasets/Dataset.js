import React, { useState,useContext } from 'react';
import './Dataset.css';
import axios from 'axios';
import AppContext from '../App_context';
import Image from '../../Images/Graph_example.png';
import { Fa500Px, FaDownload } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Dataset=()=>{
    const myContext = useContext(AppContext);
    const download_dataset=()=>{

    }
    return(
        <div className={myContext.side  ? "total_div": "total_div_1"}>
        <IconContext.Provider value={{ color: 'navy'}}>

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
            <div className="datasetandmodelling_example">
            <h5 className="heading_datamodelling">Example</h5>

            <img src={Image} className="graph_image"></img>
            </div>
            </div>
            <div className="sample_datasets">
                <table className="table_sample_datasets">
                    <caption className="table_caption">Sample Datasets</caption>
                <th className="sample_dataset_head">Dataset Name</th>
                <th className="sample_dataset_head">No of Transactions</th>
                <th className="sample_dataset_head">Download</th>
                <tr>
                <td className="sample_dataset_data">Papertoy Data</td>
                <td className="sample_dataset_data">10</td>
                <td className="sample_dataset_data"><a href={`${process.env.PUBLIC_URL}/papertoydata.txt`} target='_blank' download ><FaDownload/></a></td>
                </tr>
                <tr>
                <td className="sample_dataset_data">Simple Graph Data</td>
                <td className="sample_dataset_data">4</td>
                <td className="sample_dataset_data"><a href={`${process.env.PUBLIC_URL}/graph_data_simple.txt`} target='_blank' download ><FaDownload/></a></td>

                {/*<td className="sample_dataset_data" onClick={()=>download_dataset}><FaDownload/></td>*/}
                </tr>
                </table>
            </div>
            </IconContext.Provider>
        </div>
    );
}
export default Dataset;