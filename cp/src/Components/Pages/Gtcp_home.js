import { useContext, useState } from "react";
import React from 'react';
import AppContext from '../App_context';
import './Scp_home.css';
import { Link } from 'react-router-dom';
import Image from '../../Images/Graph_transaction.jpg';
import Image1 from '../../Images/SIFT_framework.png';
import Box from '@material-ui/core/Box';
import { FaItalic } from "react-icons/fa";
import Image6 from '../../Images/Coverage_Support.png';
import { useEffect, useRef} from "react";
import Image2 from '../../Images/gtc.png';
import Image3 from '../../Images/dataset_gtpc.png';
import Image4 from '../../Images/fragment_set.png';
import Image5 from '../../Images/gtpc.png';
import Image8 from '../../Images/fragment_pattern.png';
import Image7 from '../../Images/Overlap_Ratio.png';


function Gtcp_home() {
    const myContext = useContext(AppContext);
    const [show_content,set_show_content]= useState(0);
    const [selected_def_for_modal,set_selected_def_for_modal]=useState("");
    const [show_modal,set_show_modal]=React.useState(false);
    const show_modal_with_def=(def)=>{
        document.getElementById("modal").style.display="block";
        set_selected_def_for_modal(def);
        set_show_modal(true);
    }
    var modal = document.getElementById('modal');
    window.onclick = function(event)
    {
        if (event.target == modal)
        {
            modal.style.display = "none";
            set_show_modal(false);
        }
    }
    
    return (
        <>
        
        <div className={myContext.side ? "scp_main_div_shrink" : "scp_main_div"}>
            <div className="gtcp_heading">
                <div className="head">
                Graph Transactional Coverage Patterns
                
               </div>
            </div>
            <hr className="scp_horizontal_line"/>
        </div>
            <div className={myContext.side ? "scp_content" : "scp_content_expand"}>
                <div className="first_para">
                <p>Pattern mining from Graph Transactional Data ({' '}<i>GTD</i>{' '}) is an active area of research with applications in the domains of bioinformatics, chemical informatics and social networks.{' '}Existing works address 
                the problem of mining frequent subgraphs from <i>GTD</i>.{' '}However,{' '}the knowledge concerning the coverage aspect of a set of subgraphs is also valuable for improving the performance of several applications.</p>
                </div>
                <div className="scp_definition">
                    <div>
                    {show_content ? <Box className="box1">
                        <div className="dropdown_heading">Contents [<div className="show_hide" onClick={()=>set_show_content(!show_content)}>Hide</div> ] </div>
                        <div className="list_of_contents">
                            <div><a href="#def">1. Definiton</a></div>
                            <div><a href="#example">2. Example</a></div>
                            {/*<div><a href="#framework">3. SIFT Framework</a></div>*/}
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
                    <p>Given a graph transactional dataset D and user defined constraints <i onClick={()=>{show_modal_with_def("minGTC")}} className="def">minimum Graph Transactional Coverage{' '}({' '}minGTC{' '}){' '}</i>,{' '}<i onClick={()=>{show_modal_with_def("mincs")}} className="def">minimum Graph Transactional Pattern Coverage{' '}({' '}minGTPC{' '})</i> ,{' '}a graph Pattern  <i>P</i> {'  '}is called 
                    Graph Transactional Coverage Pattern if <i><i onClick={()=>{show_modal_with_def("mincs")}} className="def">GTPC (P, S<sub>f</sub>)</i> {">="} <i onClick={()=>{show_modal_with_def("mincs")}} className="def">minGTPC</i></i>{' '}for all Graphs G<sub>i</sub> belongs to <i>P</i> and <i onClick={()=>{show_modal_with_def("minGTC")}} className="def">GTC (P, S<sub>f</sub>)</i> {">="} <i onClick={()=>{show_modal_with_def("minGTC")}} className="def">minGTC</i>{/* and <i onClick={()=>{show_modal_with_def("maxor")}} className="def">Overlap Ratio</i> {"<="} <i>maxOR</i>*/}.</p>
                </div>
                <div className={show_modal ? "def_modal" : "display_none"} id="modal" >
                    {selected_def_for_modal=="mincs" ?<>
                    <div className="def_modal_content">
                        <span className="close" onClick={()=>set_show_modal(false)} >&times;</span>
                        <Box className="box_def">
                            <div className="box_heading_def">
                                Graph Transactional Pattern Coverage
                            </div>
                        </Box>
                        <div className="terms_definition_def">
                            <div>
                                <p className="para">Given Graph Transactional Data <i>D</i> and a fragment set <i>S<sub>f</sub>{' '},</i>{' '}the Graph Transactional Pattern Coverage of a Graph Pattern P <i>GTPC(P , S <sub>f</sub>)</i>
                                    {' '} is defined as the percentage of fragments in <i>S<sub>f</sub></i> covered collectively by Graphs <i>P</i>.
                                    Formula for computing Graph Transactional Pattern Coverage of a Pattern <i>P</i> in <i>D</i> is shown in figure 1.
                                </p>
                                <p className="para">Here,{' '}<i>0 ≤ GTPC (P,{' '}S<sub>f</sub>){' '} ≤ 1</i>.{' '}<i>GTPC (P,{' '}S<sub>f</sub>) = 1 </i> {'  '}when all of the fragments in <i>S<sub>f</sub></i> are covered by P .{/*' We can extract fragments
                                    from <i>D</i> based on user-specified <i>minGTC</i> threshold.*/}
                                </p>
                                <div className="scp_definition_heading" id="example">
                                    Example
                                </div>
                            </div>
                            <div className="scp_definition">
                                <img className="terms_example_image" src={Image5}></img>
                                <div className="terms_image_name">
                                    Fig. 1: Formula for Graph Transactional Pattern Coverage of a Pattern <i>P</i>.
                                </div>
                            </div>
                        </div>
                        <div className="terms_example_definition_def">
                            <img src={Image3} className="example_image"></img>
                                <div className="image_name">
                                    Fig. 2: Sample of 10 graph transactions
                                </div>
                                <img src={Image4} className="example_image"></img>

                                <div className="image_name">
                                    Fig. 3: Universe of fragment set <i>f<sub>1</sub> to f<sub>28</sub></i> extracted from dataset of Figure 2 for min_sup = 0.2.
                                </div>
                                <p className="para_down_example_def">
                                    Consider graph transactional dataset <i>D</i> comprising of 10 graph transactions <i>G<sub>1</sub> to
                                    G<sub>10</sub></i>{' '}, shown in Figure 2.{' '}Let <i>f<sub>1</sub></i> to <i>f<sub>28</sub></i> be the set of all fragments extracted
from D with min sup = 0.2 as shown in Figure 3 and consider a Pattern P = {"{"} G<sub>6</sub>, G<sub>5</sub>, G<sub>2</sub> {"}"}.{' '}The pattern cover set of the pattern P , <i>PCSet(P , S <sub>f</sub>) = {"{"}f<sub>1</sub>, f<sub>2</sub>, f<sub>3</sub>, f<sub>4</sub>, f<sub>5</sub>, f<sub>6</sub>, f<sub>7</sub>, f<sub>8</sub>, f<sub>9</sub>, f<sub>10</sub>, f<sub>11</sub>,
f<sub>12</sub>,  f<sub>13</sub>, f<sub>14</sub>,  f<sub>15</sub>, f<sub>16</sub>,  f<sub>17</sub>, f<sub>18</sub>,  f<sub>19</sub>,   f<sub>20</sub>, f<sub>21</sub>, f<sub>22</sub>, f<sub>23</sub>,  f<sub>24</sub>,  f<sub>25</sub>, f<sub>26</sub> {"}"}</i>.{' '}The Graph Transactional Pattern Coverage of Pattern P, <i>GTPC(P , S <sub>f</sub>) = |PCSet(P, S<sub>f</sub>)| / |S<sub>f</sub>| = 26/28 = 0.92</i>.
                                </p>
                        </div>
                    </div></> :<>
                    {selected_def_for_modal=="minGTC" ? 
                    <div className="def_modal_content">
                        <span className="close" onClick={()=>set_show_modal(false)} >&times;</span>
                        <Box className="box_def">
                            <div className="box_heading_def">
                                Graph Transactional Coverage
                            </div>
                        </Box>
                        <div className="terms_definition_def">
                            <div>
                                <p className="para">Given Graph Transactional Data <i>D</i> and a fragment set <i>S<sub>f</sub>{' '},</i>{' '}the Graph Transactional Coverage of a Graph Transaction <i>G<sub>i</sub></i>
                                    {' '} is defined as the percentage of transactions in <i>S<sub>f</sub></i> covered by <i>G<sub>i</sub></i>.
                                    Formula for computing Graph Transactional Coverage of a Graph <i>G<sub>i</sub></i> in <i>D</i> is shown in figure 1.
                                </p>
                                <p className="para">Here,{' '}<i>0 ≤ GTC (G<sub>i</sub>,{' '}S<sub>f</sub>){' '} ≤ 1</i>.{/*' We can extract fragments
                                    from <i>D</i> based on user-specified <i>minGTC</i> threshold.*/}A graph transaction can be
                                    a potential graph transaction if <i>GTC(G<sub>i</sub> , S <sub>f</sub>) ≥ minGTC</i>
                                </p>
                                <div className="scp_definition_heading" id="example">
                                    Example
                                </div>
                            </div>
                            <div className="scp_definition">
                                <img className="terms_example_image" src={Image2}></img>
                                <div className="terms_image_name">
                                    Fig. 1: Formula for Graph Transactional Coverage of a Graph <i>G<sub>i</sub></i> in <i>D</i> 
                                </div>
                            </div>
                        </div>
                        <div className="terms_example_definition_def">
                            <img src={Image3} className="example_image"></img>
                                <div className="image_name">
                                    Fig. 2: Sample of 10 graph transactions
                                </div>
                                <img src={Image4} className="example_image"></img>

                                <div className="image_name">
                                    Fig. 3: Universe of fragment set <i>f<sub>1</sub> to f<sub>28</sub></i> extracted from dataset of Figure 2 for min_sup = 0.2.
                                </div>
                                <p className="para_down_example_def">
                                    Consider graph transactional dataset <i>D</i> comprising of 10 graph transactions <i>G<sub>1</sub> to
                                    G<sub>10</sub></i>{' '}, shown in Figure 2.{' '}Let <i>f<sub>1</sub></i> to <i>f<sub>28</sub></i> be the set of all fragments extracted
from D with min sup = 0.2 as shown in Figure 3. Here,{' '}fragment<i>f<sub>4</sub></i> exists in graph
                                    <i>G<sub>1</sub></i>.{' '}Therefore <i>Cover ( G<sub>1</sub>, f<sub>4</sub> )</i> = 1. {' '}Moreover <i>CSet (G<sub>1</sub>, S<sub>f</sub>) = {"{"} f<sub>1</sub>, f<sub>2</sub>, f<sub>3</sub>, f<sub>4</sub>, f<sub>5</sub>, f<sub>6</sub>, f<sub>7</sub> {"}"} </i> 
                                    {' '} and  <i>GTC (G<sub>1</sub>,{' '}S<sub>f</sub>) = |CSet (G<sub>1</sub>,{' '}S<sub>f</sub>)| / |S<sub>f</sub>|{' '}={' '}7/28{' '}={' '}0.25.</i> 
                                </p>
                        </div>
                    </div> :
                    <div className="def_modal_content">
                        <span className="close" onClick={()=>set_show_modal(false)} >&times;</span>
                        <Box className="box_def" >
                            <div className="box_heading_def">
                                Overlap Ratio of a Pattern X
                            </div>
                        </Box>
                        <div className="terms_definition_def">
                            <div>
                                <p className="para">Let <i>X = {"{"}O<sub>p</sub>,{' '}O<sub>q</sub>,{' '}. . . , O<sub>r</sub>,{' '}O<sub>s</sub> {"}"}</i> be a pattern such that
                                    <i>RF{' '}(O<sub>p</sub>{' '}) ≥ RF{' '}(O<sub>q</sub>{' '}) ≥ · · · ≥ RF{' '}(O<sub>r</sub>{' '}) ≥ RF{' '}(O<sub>s</sub>{' '})</i>. (Here,
                                    the notations <i>O<sub>p</sub> , O<sub>q</sub> , O<sub>r</sub>, and O<sub>s</sub></i> represent Subgraph IDs{' '}). The
                                    overlap ratio of a pattern X is defined as the ratio of
                                    the number of transactions common in <i>CSet{' '}(X −{' '}{"{"}O<sub>s</sub>{' '}{"}"}{' '})
                                    and CSet{' '}(O<sub>s</sub>{' '})</i> to <i>CSet{' '}(O<sub>s</sub>{' '})</i>.{' '}It is defined as shown in figure 1.
                                </p>
                                <p className="para">
                                    For a pattern <i>X</i>,{' '}<i>0{' '} ≤{' '}OR(X){' '} ≤{' '}1</i>.
                                </p>
                                <p className="para">
                                    A pattern <i>X</i>
                                    is interesting if <i>OR{' '}(X) ≤ maxOR</i>, where <i>maxOR</i> is
                                    a user-defined maximum overlap ratio threshold.
                                </p>
                                <div className="scp_definition_heading" id="example">
                                    Example
                                </div>
         
                            </div>
                            <div className="scp_definition">
                                <img className="terms_example_image" src={Image7}></img>
                                <div className="terms_image_name">
                                    Fig. 1: Formula for Overlap Ratio of a pattern X.
                                </div>
                            </div>
                        </div>
                        <div className="terms_example_definition_def">
                            <img src={Image} className="example_image"></img>
                            <div className="image_name">
                                Fig. 2: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with minRF<sub>g</sub> = 0.2.
                            </div>
                            <p className="para_down_example_def">
                                Consider graph transactional dataset <i>D</i> comprising of 10 graph transactions <i>G<sub>1</sub></i> to
                                <i>G<sub>10</sub></i>,{' '}shown in Figure 2(a).{' '}Three subgraphs <i>S<sub>1</sub></i>,{' '}<i>S<sub>2</sub></i> and
                                <i>S<sub>3</sub></i> are shown in Figure 2(b).{' '}Let Subgraph Pattern <i>SP = {"{"} S<sub>1</sub>,S<sub>2</sub>,S<sub>3</sub> {"}"}</i>.{' '}Here,{' '}<i>S<sub>1</sub></i> is a subgraph of
                                <i>G<sub>1</sub></i>,{' '}<i>G<sub>6</sub></i> and <i>G<sub>10</sub></i> ;{' '}<i>S<sub>2</sub></i> is a subgraph of <i>G<sub>5</sub></i> , {' '}<i>G<sub>7</sub></i> and <i>G<sub>8</sub></i> ; and
                                <i>S<sub>3</sub></i> is a subgraph of <i>G<sub>4</sub></i> and <i>G<sub>7</sub></i>.{' '}The subgraph <i>S<sub>1</sub></i> is said
                                to cover <i>G<sub>1</sub></i> since <i>S<sub>1</sub> ⊆ G<sub>1</sub></i>. Hence,{' '}<i>cover({' '}S<sub>1</sub>,{' '}G<sub>1</sub>{' '}){' '}={' '}1</i>.
                                {' '}Moreover,{' '}<i>|{' '}CSet(SP , D){' '}| / |D| = |{' '}{"{"}G<sub>1</sub>,{' '}G<sub>6</sub>,{' '}G<sub>10</sub>{' '}{"}"} ∪ {"{"}{' '}G<sub>5</sub>,{' '}G<sub>7</sub>,{' '}G<sub>8</sub> {"}"} ∪ {"{"}{' '}G<sub>4</sub>,{' '}G<sub>7</sub>{' '}{"}"} |</i> = 8 / 10 = 0.8.
                            </p>
                        </div>
                    </div>}
                    </>}
                </div>
                <div className="scp_definition_heading" id="example">
                    Example
                </div>
                <div className="scp_definition">
                    <img src={Image3} className="example_image"></img>
                    <div className="image_name">Fig. 1: Sample of 10 graph transactions</div>
                    <img src={Image8} className="example_image"></img>
                    <div className="image_name">Fig. 2: (a) Universe of fragment set <i>f<sub>1</sub> to f<sub>28</sub></i> extracted from dataset of Figure 2 for min_sup = 0.2, (b) <i>GTCP {"{"}G<sub>6</sub>, G<sub>5</sub>, G<sub>2</sub>{"}"}</i></div>
                    <div>
                        <p>
                            Figure 1.a of above image is the Graph Transactional Dataset consisting of 10 graphs.{' '}In Figure 2(a),{' '}is the fragment set with min_sup = 0.2. Consider a Pattern P = {"{"}G<sub>6</sub>, G<sub>5</sub>, G<sub>2</sub>{"}"} as shown in Figure 2(b). The <i>GTC</i> values of G<sub>6</sub>, G<sub>5</sub>, G<sub>2</sub> can be computed to be 0.5, 0.25, 0.21. 
                            {' '}The pattern cover set of the pattern P , <i>PCSet(P , S <sub>f</sub>) = {"{"}f<sub>1</sub>, f<sub>2</sub>, f<sub>3</sub>, f<sub>4</sub>, f<sub>5</sub>, f<sub>6</sub>, f<sub>7</sub>, f<sub>8</sub>, f<sub>9</sub>, f<sub>10</sub>, f<sub>11</sub>,
f<sub>12</sub>,  f<sub>13</sub>, f<sub>14</sub>,  f<sub>15</sub>, f<sub>16</sub>,  f<sub>17</sub>, f<sub>18</sub>,  f<sub>19</sub>,   f<sub>20</sub>, f<sub>21</sub>, f<sub>22</sub>, f<sub>23</sub>,  f<sub>24</sub>,  f<sub>25</sub>, f<sub>26</sub> {"}"}</i>.{' '}The Graph Transactional Pattern Coverage of Pattern P, <i>GTPC(P , S <sub>f</sub>) = |PCSet(P, S<sub>f</sub>)| / |S<sub>f</sub>| = 26/28 = 0.92</i>.
                            Given the values of <i>minGTC = 0.2</i> and <i>minGTPC = 0.9</i>, the pattern P = {"{"}G<sub>6</sub>, G<sub>5</sub>, G<sub>2</sub>{"}"} forms the Graph Transactional Coverage Pattern.
                            
                        </p>
                    </div>
                </div>
                {/*<div className="scp_definition_heading" id="framework">
                    SIFT Framework
                </div>
                <div className="scp_definition">
                    <p>
                        <b><i>Subgraph ID based Flat Transactional{' '}({' '}SIFT{' '})</i></b>{'  '}framework is generalized in the sense that
                        it extracts all potential SCPs from GTD subject to
                        user-specified thresholds of <i onClick={()=>{show_modal_with_def("minrf")}} className="def">relative frequency</i>,{' '}<i onClick={()=>{show_modal_with_def("mincs")}} className="def">coverage
                        support</i> and <i onClick={()=>{show_modal_with_def("maxor")}} className="def">overlap ratio</i>.{' '}The framework consists of three parts for extracting SCPs from Graph Transactional Dataset.
                    </p>
                </div>
                <div className="text_and_image">
                    <div className="scp_definition_text">
                        <p className="text_para"><pre className="tab1">                       1.  </pre><p>First,{' '}for extracting subgraphs from <i>D</i>,{' '}which satisfies the <i>minRF<sub>g</sub>{' '}</i>{' '}constraint, an existing subgraph discovery algorithm, such as <i onClick={()=>window.open('https://www.slideshare.net/SadikMussah/gspan-algorithm',"_blank")} className="def">gSpan</i> can be employed.{' '}We construct the database of 
                        <i>{" <SID, Clabel>"}</i> as the output,{' '}where <i>SID is a Subgraph Identifier</i> and <i>Clabel is minimum DFS code assigned as canonical label to subgraph</i>.
                        </p></p>
                        <p className="text_para"><pre className="tab1">                       2.  </pre><p>Second,{' '}with the database of <i>{"<SID, Clabel>"}</i>
{' '}as the input,{' '}we form the SID-based flat transactional
dataset,{' '}where each SID-based flat transaction consists
of all SIDs of subgraphs corresponding graph transaction.{' '}In this step,{' '}we map SIDs to corresponding graph
transaction identifier <i>({' '}GID{' '})</i> and form the database of <i>{"<GID, SIDs[ ] > "}</i> as the output.{' '}This forms the SID-
based flat transactional dataset.
                        </p></p>
                        <p className="text_para"><pre className="tab1">                       3.  </pre><p>Third,{' '}after forming
the SID-based flat transactional dataset,{' '}the problem of
extracting candidate SCPs becomes the problem of extracting coverage patterns.{' '}Therefore,{' '}we can employ an
existing coverage pattern mining algorithm to extract SCPs.{' '}For efficient extraction of SCPs,{' '}we employ
a pruning heuristic related to overlap and efficiently
extract SCPs subject to the <i>minCS<sub>g</sub></i> and <i>minOR<sub>g</sub></i> constraints.
                        </p></p>
                    </div>
                    <div>
                        <img src={Image1} className="example_image2"></img>
                    </div>
                                    </div>*/}
                
            </div>
            
        </>
  );
}

export default Gtcp_home;