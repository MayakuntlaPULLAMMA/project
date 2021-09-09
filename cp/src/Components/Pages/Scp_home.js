import { useContext, useState } from "react";
import React from 'react';
import AppContext from '../App_context';
import './Scp_home.css';
import Image from '../../Images/Graph_transaction.jpg';
import Image1 from '../../Images/SIFT_framework.png';
import Box from '@material-ui/core/Box';


function Scp_home() {
    const myContext = useContext(AppContext);
    const [show_content,set_show_content]= useState(0);
    
    return (
        <>
        <div className={myContext.side ? "scp_main_div_shrink" : "scp_main_div"}>
            <div className="scp_heading">
                Subgraph Coverage Patterns
            </div>
            <hr className="scp_horizontal_line"/>
        </div>
            <div className={myContext.side ? "scp_content" : "scp_content_expand"}>
                <div className="first_para">
                <p>Pattern mining from Graph Transactional Data (GTD) is an active area of research with applications in the domains of bioinformatics, chemical informatics and social networks. Existing works address 
                the problem of mining frequent subgraphs from GTD.However, the knowledge concerning the coverage aspect of a set of subgraphs is also valuable for improving the performance of several applications.</p>
                </div>
                <div className="scp_definition">
                    <div>
                    {show_content ? <Box className="box1">
                        <div className="dropdown_heading">Contents [<div className="show_hide" onClick={()=>set_show_content(!show_content)}>Hide</div> ] </div>
                        <div className="list_of_contents">
                            <div><a href="#def">1. Definiton</a></div>
                            <div><a href="#example">2. Example</a></div>
                            <div><a href="#framework">3. SIFT Framework</a></div>
                            <div><a href="#references">4. References</a></div>
                        </div>
                    
                    </Box> :
                    <Box className="box1">
                        <div className="dropdown_heading">Contents [<div className="show_hide" onClick={()=>set_show_content(!show_content)}>Show</div>]</div>
                    </Box>}
                    </div>
                </div>
                <div className="scp_definition_heading" id="def">
                    Definition
                </div>
                <div className="scp_definition">
                    <p>Given a graph transactional dataset and user defined constraints minimum Relative Frequency(minRF),minimum Coverage Support(minCS) and maximum Overlap Ratio(maxOR), a set of subgraphs say SP is called 
                    Subgraph Coverage Pattern if Coverage Support of SP {">="} minCS and Relative Frequency of SP {">="} minRF and Overlap Ratio {"<="} maxOR.</p>
                </div>
                <div className="scp_definition_heading" id="example">
                    Example
                </div>
                <div className="scp_definition">
                    <img src={Image} className="example_image"></img>
                    <div className="image_name">Fig. 1: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with minRF g =0.2</div>
                    <div><p>Figure 1.a of above image is the Graph Transactional Dataset consisting of 10 graphs.In Figure 2(b), let SP be the set {"{S1, S2, S3}"}. The RF values of S1, S2, and S3 are 0.3, 0.3, and 0.2 respectively. The coverage set of SP , CSet(SP ,D)=
                        {"{(G1 ,G4 ,G5 ,G6 ,G7 ,G8 ,G10 }"}. The coverage support of SP , CS{<sub>g</sub>} (SP, D) = |CSet(SP,D)| / |D| = 7/10 = 0.7. The multiset of transactions covered by pattern SP , M (SP, D)=
                        {"{(G1 ,G6 ,G10 ),(G5 ,G7 ,G8 ),(G4 ,G7 )}"}. Therefore, the overlap among transactions covered by subgraphs of SP ,overlap{<sub>g</sub>}(SP, D) = (|M (SP,D)|/|CSet(SP,D)|)-1 = (8/7)-1 = 0.142.Given the values of minRF{<sub>g</sub>} = 0.2, minCS{<sub>g</sub>} = 0.7 and 
    maxO{<sub>g</sub>} =0.5, the pattern SP = {"{S1 , S2 , S3 }"} is an SCP.</p></div>
                </div>
                <div className="scp_definition_heading" id="framework">
                    SIFT Framework
                </div>
                <div className="scp_definition">
                <p><b>Subgraph ID based Flat Transactional(SIFT)</b> framework is generalized in the sense that
it extracts all potential SCPs from GTD subject to
user-specified thresholds of relative frequency, coverage
support and overlap.The framework consists of three parts for extracting SCPs from Graph Transactional Dataset.</p>
                </div>
                <div className="text_and_image">
                    <div className="scp_definition_text">
                        <p className="text_para"><pre className="tab1">                       1.  </pre>For extracting subgraphs from D, which satisfies

                        the minRFg constraint, an existing subgraph discovery algorithm, such as gSpan can be employed. We construct the database of 
                        {" <SID, Clabel>"} as the output , where SID is a Subgraph Identifier and Clabe is minimum DFS code assigned as canonical label to subgraph.
                        </p>
                        <p className="text_para"><pre className="tab1">                       2.  </pre>Second, with the database of {"<SID, Clabel >"}
as the input, we form the SID-based flat transactional
dataset, where each SID-based flat transaction consists
of all SIDs of subgraphs corresponding graph transaction. In this step, we map SIDs to corresponding graph
transaction identifier (GID) and form the database of {"<GID, SIDs[ ] > "} as the output. This forms the SID-
based flat transactional dataset.
                        </p>
                        <p className="text_para"><pre className="tab1">                       3.  </pre>Third, after forming
the SID-based flat transactional dataset, the problem of
extracting candidate SCPs becomes the problem of extracting coverage patterns. Therefore, we can employ an
existing coverage pattern mining algorithm to extract SCPs. For efficient extraction of SCPs, we employ
a pruning heuristic related to overlap and efficiently
extract SCPs subject to the minCSg and minOg constraints.
                        </p>
                    </div>
                    <div>
                        <img src={Image1} className="example_image2"></img>
                    </div>
                </div>
                <div className="scp_definition_heading" id="references">
                    References
                </div>
                <div className="scp_definition">

                </div>
            </div>
        </>
  );
}

export default Scp_home;