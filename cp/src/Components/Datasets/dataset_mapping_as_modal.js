import React, { useState,useContext } from 'react';
import './Dataset.css';
import Image from '../../Images/mapping_file.png';
import { Fa500Px, FaDownload } from 'react-icons/fa';
import { IconContext } from 'react-icons';
const SCP_Dataset_mapping_for_modal=()=>{
    const download_dataset=()=>{

    }
    return(
        <div>
        <IconContext.Provider value={{ color: 'navy'}}>

            <div className="display_flex">
            <div className="datasetandmodelling_mapping">
                <h5 className="heading_datamodelling">Dataset Format and Modelling</h5>
                <p className="ins_description">1. Dataset File Extension ---- '.txt'.</p>
                <p className="ins_description">2. Everyline in the file consists of two words seperated by space.</p>
                <p className="ins_description">3. The first word is the symbol of any chemical element and the second word is the vertex label to which element is to be mapped.</p>
                <p className='ins_description'>4. Ensure that for every unique label in the dataset, there is a chemical element that maps to.</p>

                


            </div>
            <div className="datasetandmodelling_example_mapping">
            <h5 className="heading_datamodelling">Example</h5>

            <img src={Image} className="graph_image"></img>
            </div>
            </div>
            <div className="sample_datasets">
                <table className="table1_sample_datasets">
                    <caption className="table_caption">Sample Mapping Files</caption>
                <th className="sample_dataset_head">Dataset Name</th>
                {/*<th className="sample_dataset_head">No of Transactions</th>*/}
                <th className="sample_dataset_head">Download</th>
                <tr>
                <td className="sample_dataset_data">P388</td>
                {/*<td className="sample_dataset_data">10</td>*/}
                <td className="sample_dataset_data"><a href={`${process.env.PUBLIC_URL}/p388_mapping.txt`} target='_blank' download ><FaDownload/></a></td>
                </tr>
                <tr>
                <td className="sample_dataset_data">MOLT-4</td>
                {/*<td className="sample_dataset_data">4</td>*/}
                <td className="sample_dataset_data"><a href={`${process.env.PUBLIC_URL}/molt-4_mapping.txt`} target='_blank' download ><FaDownload/></a></td>

                {/*<td className="sample_dataset_data" onClick={()=>download_dataset}><FaDownload/></td>*/}
                </tr>
                </table>
            </div>
            </IconContext.Provider>
        </div>
    );
}
export default SCP_Dataset_mapping_for_modal;