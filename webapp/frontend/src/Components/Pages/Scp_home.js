import { useContext, useState } from "react";
import React from 'react';
import AppContext from '../App_context';
import './Scp_home.css';
import Image from '../../Images/Graph_transaction.jpg';
import Image1 from '../../Images/SIFT_framework.png';
import Box from '@material-ui/core/Box';
import Image6 from '../../Images/Coverage_support.png';
import Image5 from '../../Images/Relative_Frequency_Formula.png';
import Image7 from '../../Images/Overlap_Ratio.png';


function Scp_home(){
    const myContext = useContext(AppContext);
    const [show_content,set_show_content]= useState(0);
    const [selected_def_for_modal,set_selected_def_for_modal]=useState("");
    const [show_modal,set_show_modal]=React.useState(false);
    const show_modal_with_def=(mincs)=>{
        document.getElementById("modal").style.display="block";
        set_selected_def_for_modal(mincs);
        set_show_modal(true);
    }
    var modal = document.getElementById('modal');
    window.onclick = function(event)
    {
        if (event.target == modal)
        {
            modal.style.display = "none";
        }
    }
    
    return (
        <>
        
        <div className={myContext.side ? "scp_main_div_shrink" : "scp_main_div"}>
            <div className="scp_heading">
                Subgraph Coverage Patterns
            </div>
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
                            <div><a href="#framework">3. SIFT Framework</a></div>
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
                    <p>Given a graph transactional dataset and user defined constraints <i onClick={()=>{show_modal_with_def("minrf")}} className="def">minimum Relative Frequency{' '}({' '}minRF{' '}){' '}</i>,{' '}<i onClick={()=>{show_modal_with_def("mincs")}} className="def">minimum Coverage Support{' '}({' '}minCS{' '})</i> and <i onClick={()=>{show_modal_with_def("maxor")}} className="def">maximum Overlap Ratio{' '}({' '}maxOR{' '})</i>,{' '}a set of subgraphs say <i>SP</i> {'  '}is called 
                    Subgraph Coverage Pattern if <i onClick={()=>{show_modal_with_def("mincs")}} className="def">Coverage Support of SP</i> {">="} <i>minCS</i> and <i onClick={()=>{show_modal_with_def("minrf")}} className="def">Relative Frequency of SP</i>{' '} {">="} <i>minRF</i> and <i onClick={()=>{show_modal_with_def("maxor")}} className="def">Overlap Ratio</i> {"<="} <i>maxOR</i>.</p>
                </div>
                <div className={show_modal ? "def_modal" : "display_none"} id="modal" >
                    {selected_def_for_modal=="mincs" ?<>
                    <div className="def_modal_content">
                        <span className="close" onClick={()=>set_show_modal(false)} >&times;</span>
                        <Box className="box_def">
                            <div className="box_heading_def">
                                Coverage Support
                            </div>
                        </Box>
                        <div className="terms_definition_def">
                            <div>
                                <p className="para">Given Graph Transactional Dataset <i>D</i> and a subgraph pattern <i>SP</i>,{' '}the coverage support of <i>SP ({' '}CS<sub>g</sub> (SP, D){' '})</i> is the percentage of graph
                                    transactions in <i>D</i> covered by at least one subgraph in
                                    {'  '}<i>SP</i> .
                                </p>
                                <p className="para">Here, <i>0 ≤ CS<sub>g</sub> (SP, D) ≤ 1</i></p>
                                <p className="para"><i>CS<sub>g</sub> (SP, D) = 1</i>
                                    {' '}when all of the graph transactions in <i>D</i> are covered
                                    by <i>SP</i> . Conversely, <i>CS<sub>g</sub> (SP, D) = 0</i> when none of the
                                    graph transactions are covered by <i>SP</i>.{' '}A pattern <i>SP</i> is interesting with respect to coverage point of view
                                    if <i>CS<sub>g</sub> (SP, D) ≥ minCS<sub>g</sub></i>,{' '}where <i>minCS<sub>g</sub></i> is a userdefined minimum Coverage Support threshold for graph
                                    transactions. 
                                </p>
                                <div className="scp_definition_heading" id="example">
                                    Example
                                </div>
                            </div>
                            <div className="scp_definition">
                                <img className="terms_example_image" src={Image6}></img>
                                <div className="terms_image_name">Fig. 1: Formula for Coverage Support of a Subgraph Pattern SP in D </div>
                            </div>
                        </div>
                        <div className="terms_example_definition_def">
                            <img src={Image} className="example_image"></img>
                            <div className="image_name">
                                Fig. 2: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with minRF<sub>g</sub> = {' '}0.2.
                            </div>
                            <p className="para_down_example_def">
                                Consider graph transactional dataset <i>D</i> comprising of 10 graph transactions <i>G<sub>1</sub></i> to
                                <i>G<sub>10</sub></i> , shown in Figure 2(a). Three subgraphs <i>S<sub>1</sub>,{' '}S<sub>2</sub></i>{' '} and
                                {' '}<i>S<sub>3</sub></i> are shown in Figure 2(b). Let Subgraph Pattern <i>SP = {"{"} S<sub>1</sub>,{' '}S<sub>2</sub>,{' '}S<sub>3</sub> {"}"}</i>.{' '}Here, <i>S<sub>1</sub></i> is a subgraph of
                                {' '}<i>G<sub>1</sub>, G<sub>6</sub></i> and <i>G<sub>10</sub></i> ;{' '}<i>S<sub>2</sub></i> is a subgraph of <i>G<sub>5</sub>, G<sub>7</sub></i> and <i>G<sub>8</sub></i> ; and
                                {' '}<i>S<sub>3</sub></i> is a subgraph of <i>G<sub>4</sub></i> and <i>G<sub>7</sub></i>.{' '}The subgraph <i>S<sub>1</sub></i> is said
                                to cover <i>G<sub>1</sub></i> since <i>S<sub>1</sub> ⊆ G<sub>1</sub></i>.{' '}Hence,{' '}<i>Cover({' '}S<sub>1</sub>,{' '}G<sub>1</sub>{' '}){' '}={' '}1</i>.
                                {' '}Moreover, <i>|CSet(SP , D)| / |D| = |{"{"}G<sub>1</sub>,{' '}G<sub>6</sub>,{' '}G<sub>10</sub>{"}"} ∪ {"{"}G<sub>5</sub> ,G<sub>7</sub>,G <sub>8</sub> {"}"} ∪ {"{"}G<sub>4</sub> ,G <sub>7</sub>{"}"} | = 8 /10 = 0.8</i>{' '}.
                            </p>
                        </div>
                    </div></> :<>
                    {selected_def_for_modal=="minrf" ? 
                    <div className="def_modal_content">
                        <span className="close" onClick={()=>set_show_modal(false)} >&times;</span>
                        <Box className="box_def">
                            <div className="box_heading_def">
                                Relative Frequency of a Subgraph
                            </div>
                        </Box>
                        <div className="terms_definition_def">
                            <div>
                                <p className="para">Given Graph Transactional Data <i>D</i> and a subgraph <i>S<sub>j</sub>{' '},</i>{' '}we denote the percentage of graph
                                    transactions in <i>D</i> covered by <i>S<sub>j</sub></i> as Relative Frequency.
                                    Formula for computing <i>Relative Frequency of Subgraph S<sub>j</sub></i> in <i>D</i> is shown in figure 1.
                                </p>
                                <p className="para">Here,{' '}<i>0 ≤ RF<sub>g</sub> (S<sub>j</sub>,{' '}D) ≤ 1</i>.{' '}We can extract subgraphs of
                                    interest from <i>D</i> based on user-specified <i>minRF<sub>g</sub></i> threshold.
                                </p>
                                <div className="scp_definition_heading" id="example">
                                    Example
                                </div>
                            </div>
                            <div className="scp_definition">
                                <img className="terms_example_image" src={Image5}></img>
                                <div className="terms_image_name">
                                    Fig. 1: Formula for Relative Frequency of Subgraph <i>S<sub>j</sub></i> in <i>D</i> 
                                </div>
                            </div>
                        </div>
                        <div className="terms_example_definition_def">
                            <img src={Image} className="example_image"></img>
                                <div className="image_name">
                                    Fig. 2: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with <i>minRF<sub>g</sub> = 0.2</i>
                                </div>
                                <p className="para_down_example_def">
                                    Consider graph transactional dataset <i>D</i> comprising of 10 graph transactions <i>G<sub>1</sub> to
                                    G<sub>10</sub></i>{' '}, shown in Figure 2(a).{' '}Three subgraphs <i>S<sub>1</sub>,{' '}S<sub>2</sub> and
                                    {' '}S<sub>3</sub></i> are shown in Figure 2(b). Here,{' '}<i>S<sub>1</sub></i> is a subgraph of
                                    <i>G<sub>1</sub>,{' '}G<sub>6</sub> and G<sub>10</sub></i> ;{' '}<i>S<sub>2</sub></i> is a subgraph of <i>G<sub>5</sub>,{' '}G<sub>7</sub> and G<sub>8</sub></i> ;{' '} and
                                    <i>S<sub>3</sub></i> is a subgraph of <i>G<sub>4</sub> and G<sub>7</sub></i> .{' '}The subgraph <i>S<sub>1</sub></i> is said
                                    to cover <i>G<sub>1</sub></i> since <i>S<sub>1</sub> ⊆ G<sub>1</sub></i>.{' '}Hence,{' '}cover<i>({' '}S<sub>1</sub>,{' '}G<sub>1</sub>{' '}) = 1</i>.
                                    {' '}Moreover,{' '}<i>CSet({' '}S<sub>1</sub> , D) = {"{"}{' '}G<sub>1</sub>,{' '}G<sub>6</sub>,{' '}G<sub>10</sub>{' '}{"}"}</i> and <i>RF<sub>g</sub> ({' '}S<sub>1</sub>,{' '}D{' '}) = |Cset({' '}S<sub>1</sub>)|/D = 3/10 = 0.3</i>.
                                    Similarly RF values of <i>S<sub>2</sub>,{' '}
                                    S<sub>3</sub></i> are 0.3 and 0.2 respectively.
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
                    <img src={Image} className="example_image"></img>
                    <div className="image_name">Fig. 1: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with minRF g =0.2</div>
                    <div>
                        <p>
                            Figure 1.a of above image is the Graph Transactional Dataset consisting of 10 graphs.{' '}In Figure 2(b),{' '}let <i>SP</i> be the set <i>{"{ S1, S2, S3 }"}</i>.{' '}The <i>RF</i> values of <i>S1,{' '}S2 and S3</i> are 0.3,{' '}0.3 and 0.2 respectively.{' '}The coverage set of <i>SP</i>,{' '}<i>CSet({' '}SP,{' '}D{' '})</i>{' '}=
                            {' '}<i>{"{ G1, G4, G5, G6, G7, G8, G10 }"}</i>.{' '}The <i onClick={()=>show_modal_with_def("mincs")} className="def">coverage support</i> of <i>SP</i>,{' '}<i>CS{<sub>g</sub>} (SP, D) = |{' '}CSet(SP,D){' '}| / |D|</i> = 7/10 = 0.7.{' '}The multiset of transactions covered by pattern <i>SP,{' '}M({' '}SP, D{' '}){' '}=
                            {' '}{"{ ( G1, G6, G10 ), ( G5, G7, G8 ), ( G4, G7 ) }"}</i>. Therefore, the overlap among transactions covered by subgraphs of <i>SP ,overlap{<sub>g</sub>}{' '}({' '}SP,{' '}D{' '}) = ({' '}|{' '}M (SP,{' '}D){' '}|{' '}/{' '}|{' '}CSet({' '}SP,{' '}D{' '}){' '}|{' '}){' '}-{' '}1</i> = (8/7) - 1 = 0.142.{' '}Given the values of <i>minRF{<sub>g</sub>}</i> = 0.2, <i>minCS{<sub>g</sub>}</i> = 0.7 and 
                            {' '}<i>maxOR{<sub>g</sub>}</i> = 0.5, the pattern <i>SP = {"{ S1, S2, S3 }"}</i> is an SCP.
                        </p>
                    </div>
                </div>
                <div className="scp_definition_heading" id="framework">
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
                </div>
                
            </div>
            
        </>
  );
}

export default Scp_home;
