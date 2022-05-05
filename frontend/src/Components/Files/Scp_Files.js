import React from 'react';
import  Image from '../../Images/DSAC.jpeg';
import * as FaIcons from 'react-icons/fa';
import './Files.css';
const SCP_Files=()=>{
    const handlebuttonclick=()=>{
        var fileDownload = require('js-file-download');
fileDownload('./Files.css', 'filename.csv');
    }
return(
    <div className="downloaddiv">
        <table className="tableinfiles">
            <th className="tableheader">File</th>
            <th className="tableheader">Description</th>
            <th className="tableheader">Download Link</th>
            <tr role="row">
                <td>Source Code</td>
                <td>File to extract Frequent Subgraphs and Coverage Patterns</td>
                <a href={`${process.env.PUBLIC_URL}/FSG_SCP.zip`} target='_blank' download className="filedownload"><FaIcons.FaDownload/></a>

            </tr>
        </table>
    </div>
)
}
export default SCP_Files;