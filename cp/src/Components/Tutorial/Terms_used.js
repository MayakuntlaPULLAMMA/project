import React,{useContext} from 'react';
import { useState } from 'react';
import './Terms_used.css';
import Image from '../../Images/Graph_transaction.jpg';
import Image1 from '../../Images/Relative_Frequency.png';
import ReactTooltip from "react-tooltip";
import AppContext from '../App_context';
import Box from '@material-ui/core/Box';
import Image3 from '../../Images/graph_transaction_example.png';
import Image4 from '../../Images/Cover.png';
import Image5 from '../../Images/Relative_Frequency_Formula.png';
import Image6 from '../../Images/Coverage_Support.png';
import Image7 from '../../Images/Overlap_Ratio.png';
import * as FaIcons from 'react-icons/fa';

import { array } from 'prop-types';


function Terms_used(props) {
  console.log("dfdf");
  const myContext = useContext(AppContext);
  const [show_content,set_show_content]= useState(0);
  const [show_terms,set_show_terms]=useState([0,0,0,0,0,0]);
  const go_to_set=(index)=>{
    let array=[...show_terms];
    array[index]=!array[index];
    set_show_terms(array);

  }
  return (
    <>
       {/* <div className={myContext.side?"mainheading":"mainheadingexpand"}>Terms Used</div>

    <div className={myContext.side ? "main_card" : "main_card_expand"}>
      <div className="inside_div">
        <div className="mincs">
          <div className="side_heading">Minimum Coverage Support</div>
            <div className="content">
              <div className="table">
                <table>
                  <tr>
                    <th data-tip="Transaction Id" data-for='toolTip1' data-place='top'>TID
                    <ReactTooltip id="toolTip1" className="tooltip" /></th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                  </tr>
                  <tr>
                    <td>Items</td>
                    <td>a,b,c</td>
                    <td>a,c,e</td>
                    <td>a,c,e</td>
                    <td>a,c,d</td>
                    <td>b,d,f</td>
                    <td>b,d</td>
                    <td>b,d</td>
                    <td>b,e</td>
                    <td>b,e</td>
                    <td>a,b</td>
                  </tr>
                </table>
              </div>
              <div className="description">
                  <div className="subcontent">
                    <p className="sideheader">Coverage Set of a Pattern</p>
                    <p className="cont">Coverage Set of a pattern X = {"{"} w {<sup>p</sup>},w {<sup>q</sup>},......w {<sup>r</sup>} {"}"} {" "}{"1<=p<=q<=r<=n"} where n is the number of Transactions is</p>
                    <div className="setofpoints">
                      <li>Set of distinct TIDs that contain atleast item of X</li>
                      <li>Denoted by CSET(X)</li>
                      <li>CSET(X) = T(w{<sup>p</sup>}) U T(w{<sup>q</sup>}) U ..... U T(w{<sup>r</sup>})</li>
                      <li>T(w{<sup>p</sup>}) = TIDs that contain item w{<sup>p</sup>}</li>
                    </div>
                    <p className="Example">Example from the above table : </p>
                    <p className="example_cont">Coverage Set of Pattern X={"{c,d}"} is {"{ 2,3,4,5,6,7 }"}.</p>
                    <p className="sideheader">Coverage Support of a Pattern</p>
                    <p className="cont">Coverage Supportof a pattern X = {"{"} w {<sup>p</sup>},w {<sup>q</sup>},......w {<sup>r</sup>} {"}"} {" "}{"1<=p<=q<=r<=n"} where n is the number of Transactions is</p>
                    <div className="setofpoints">
                      <li>Ratio of size of coverage set of pattern X to the number of total transactions.</li>
                    </div>
                    <p className="Example">Example from the above table : </p>
                    <p className="example_cont">Coverage Support of Pattern X={"{c,d}"} = (Size of Coverage Set of X)/(Total number of Transactions) = 6/10 = 0.6</p>
                  </div>
              </div>
            </div>
        </div>
      
        <div className="minrf">
            <div className="side_heading">Minimum Relative Frequency</div>
            <div className="content">
              <div className="table">
                <table>
                  <tr>
                    <th data-tip="Transaction Id" data-for='toolTip1' data-place='top'>TID
                    <ReactTooltip id="toolTip1" className="tooltip" /></th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                  </tr>
                  <tr>
                    <td>Items</td>
                    <td>a,b,c</td>
                    <td>a,c,e</td>
                    <td>a,c,e</td>
                    <td>a,c,d</td>
                    <td>b,d,f</td>
                    <td>b,d</td>
                    <td>b,d</td>
                    <td>b,e</td>
                    <td>b,e</td>
                    <td>a,b</td>
                  </tr>
                </table>
              </div>
              <div className="description">
                  <div className="subcontent">
                    <p className="sideheader">Relative Frequency of an item X is</p>
                    <div className="setofpoints">
                      <li>Ratio of number of Transactions that contain the itex X to the total number of transactions</li>
                    </div>
                    <p className="Example">Example from the above table : </p>
                    <p className="example_cont">Relative Frequency of an item 'a' is = (number of Transactions that contain 'a') / (Total Number of Transactions) = 5/10 = 0.5</p>
                    
                  </div>
              </div>
            </div>
        </div>
        <div className="maxor">
            <div className="side_heading">Minimum Overlap Ratio</div>
            <div className="content">
              <div className="table">
                <table>
                  <tr>
                    <th data-tip="Transaction Id" data-for='toolTip1' data-place='top'>TID
                    <ReactTooltip id="toolTip1" className="tooltip" /></th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                  </tr>
                  <tr>
                    <td>Items</td>
                    <td>a,b,c</td>
                    <td>a,c,e</td>
                    <td>a,c,e</td>
                    <td>a,c,d</td>
                    <td>b,d,f</td>
                    <td>b,d</td>
                    <td>b,d</td>
                    <td>b,e</td>
                    <td>b,e</td>
                    <td>a,b</td>
                  </tr>
                </table>
              </div>
              <div className="description">
                  <div className="subcontent">
                    <p className="sideheader">Maximum Overlap Ratio of a pattern X = {"{"} w {<sup>p</sup>},w {<sup>q</sup>},......w {<sup>r</sup>} {"}"} {" "}{"1<=p<=q<=r<=n"} where n is the number of Transactions  and  |T(w{<sup>p</sup>})| {">="} |T(w{<sup>q</sup>})| {">="} .....{">="} |T(w{<sup>r</sup>})| where |T(w{<sup>q</sup>})| is number of TIDs containing item w{<sup>q</sup>} is</p>
                    <div className="setofpoints">
                      <li>If w{<sup>r</sup>}  is the last item added to X , the overlap ratio is defined as Ratio of Common Transactions in X-w{<sup>r</sup>} and w{<sup>r</sup>} to the number of Transactions containing item w{<sup>r</sup>}.</li>
                      <li>The lesser the overlap ratio, the more will be the coverage support.</li>
                      <li>The overlap ratio r is 0{"<="}r{"<="}1</li>
                    </div>
                    <p className="Example">Example from the above table : </p>
                    <p className="example_cont">Overlap Ratio of X = {"{ b,a}"} is = (number of Transactions common in (b) and (a)) / (Number of Transactions containing a) = 2/5 = 0.4</p>
                    
                  </div>
              </div>
            </div>
        </div>
      </div>

  </div>*/}
    <div className={myContext.side ? "terms_main_div_shrink" : "terms_main_div"}>
      <div className="terms_heading">
        <div>Terms Used</div>
      </div>
      <hr className="terms_horizontal_line"/>
      {/*<div className="terms_list_of_contents">
        <div>
        {show_content ? 
          <Box className="terms_box1">
            <div className="dropdown_heading">Contents [<div className="show_hide" onClick={()=>set_show_content(!show_content)}>Hide</div> ] </div>
            <div className="terms_list_of_contents">
              <div><a href="#def">1. Graph Transaction</a></div>
              <div><a href="#example">2. Minimum Relative Frequency</a></div>
              <div><a href="#framework">3. Minimum Coverage Support </a></div>
              <div><a href="#references">4. Maximum Overlap Ratio</a></div>
            </div>
          </Box> :
          <Box className="terms_box1">
            <div className="dropdown_heading">Contents [<div className="show_hide" onClick={()=>set_show_content(!show_content)}>Show</div>]</div>
          </Box>
        }
      </div>
      </div>*/}
  </div>
  <div className={myContext.side ? "terms_content" : "terms_content_expand"}>
    
    {show_terms[0]==0 ?
    <div>
      <Box className="box2">
         <div className="box_heading">Graph Transaction</div>
        <div className="box2_icon">
          <FaIcons.FaPlus onClick={()=>go_to_set(0)}/>
        </div>
      
      </Box>
    </div> :
    <>
    <Box className="box2">
    <div className="box_heading">
      Graph Transaction
    </div>
    <div className="box2_icon">
          <FaIcons.FaMinus onClick={()=>go_to_set(0)}/>
        </div>
    </Box>
    <div className="terms_definition">
    <p className="para">A graph transaction G = (V ,E,L,l) is a labeled,connected and undirected graph, where V is a set of
vertices, E ⊆ V<sub>2</sub> is a set of edges, L is a set of labels and l : V ∪ E → L, where l is a function for assigning
labels to vertices and edges.</p>
        <div className="scp_definition">
        <img className="terms_example_image" src={Image3}></img>
        <div className="terms_image_name">Fig. 1: (a) Sample chemical compound, (b) Equivalent graph model</div>
        </div>
    </div>
    </>
    }
    {show_terms[1]==0 ?
    <Box className="box2">
    <div className="box_heading">Subgraph Pattern</div>
   <div className="box2_icon">
     <FaIcons.FaPlus onClick={()=>go_to_set(1)}/>
   </div>
 
 </Box>:
    <>
    <Box className="box2">
    <div className="box_heading">
      Subgraph Pattern
    </div>
    <div className="box2_icon">
          <FaIcons.FaMinus onClick={()=>go_to_set(1)}/>
        </div>
    </Box>
    <div className="terms_definition">
    <p className="para">Given a Graph Transactional Dataset D and the set Ψ of all possible subgraphs over D, a subgraph pattern (SP ) is a set
of subgraphs belonging to Ψ</p>
        
    </div>
    </>
    }
    {show_terms[2]==0 ?
    <Box className="box2">
    <div className="box_heading">Cover Set of a Subgraph</div>
   <div className="box2_icon">
     <FaIcons.FaPlus onClick={()=>go_to_set(2)}/>
   </div>
 
 </Box>:
    <>
    <Box className="box2">
    <div className="box_heading">
      Cover Set of a Subgraph
    </div>
    <div className="box2_icon">
          <FaIcons.FaMinus onClick={()=>go_to_set(2)}/>
        </div>
    </Box>
    <div className="terms_definition">
      <div>
    <p className="para">A subgraph S<sub>j</sub> is said to cover graph G<sub>i</sub> from Graph Transactional Dataset if S<sub>j</sub> exists in G<sub>i</sub>.</p>
    <p className="para">The Cover Set of subgraph S<sub>j</sub> is defined as the set of all graph transactions covered by S<sub>j</sub>.It is denoted by CSet<sub>g</sub>(S<sub>j</sub> , D). Formally,
CSet<sub>g</sub>(S<sub>j</sub> , D) = {"{G"}<sub>i</sub> |cover(S <sub>j</sub> , G<sub>i</sub> ) = 1 {"&"} G i ∈ D{"}"}.
The Cover Set of SP (CSet<sub>g</sub> (SP, D)) is a set of all graph transactions covered by  atleast one Subgraph of SP .
</p>
          <div className="scp_definition_heading" id="example">
              Example
          </div>
          {/*<div className="scp_definition">
                    <img src={Image} className="example_image"></img>
                    <div className="image_name">Fig. 1: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with minRF g =0.2</div>
                    <p className="para">Figure 1.a of above image is the Graph Transactional Dataset consisting of 10 graphs.In Figure 2(b), let SP be the set {"{S1, S2, S3}"}. The RF values of S1, S2, and S3 are 0.3, 0.3, and 0.2 respectively. The coverage set of SP , CSet(SP ,D)=
                        {"{(G1 ,G4 ,G5 ,G6 ,G7 ,G8 ,G10 }"}.</p>
    </div>*/}
        </div>
        <div className="scp_definition">
        <img className="terms_example_image" src={Image4}></img>
        <div className="terms_image_name">Fig. 2: Cover</div>
        </div>
      </div>
      <div className="terms_example_definition">
                    <img src={Image} className="example_image"></img>
                    <div className="image_name">Fig. 1: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with minRF g =0.2</div>
                    <p className="para_down_example">Figure 1.a of above image is the Graph Transactional Dataset consisting of 10 graphs.In Figure 2(b), let SP be the set {"{S1, S2, S3}"}. The RF values of S1, S2, and S3 are 0.3, 0.3, and 0.2 respectively. The coverage set of SP , CSet(SP ,D)=
                        {"{(G1 ,G4 ,G5 ,G6 ,G7 ,G8 ,G10 }"}.</p>
                </div>
    
    </>
    }
    {show_terms[3]==0 ?
    <Box className="box2">
    <div className="box_heading">Relative Frequency of a Subgraph</div>
   <div className="box2_icon">
     <FaIcons.FaPlus onClick={()=>go_to_set(3)}/>
   </div>
 
 </Box>:
    <>
    <Box className="box2">
    <div className="box_heading">
      Relative Frequency of a Subgraph
    </div>
    <div className="box2_icon">
          <FaIcons.FaMinus onClick={()=>go_to_set(3)}/>
        </div>
    </Box>
    <div className="terms_definition">
      <div>
    <p className="para">Given Graph Transactional Data D and a subgraph S<sub>j</sub> , we denote the percentage of graph
transactions in D covered by S<sub>j</sub> as Relative Frequency.
 Formula for computing Relative Frequency of Subgraph S<sub>j</sub> in D is shown in figure 1.</p>
    <p className="para">Here, 0 ≤ RF<sub>g</sub> (S<sub>j</sub> ,D) ≤ 1. We can extract subgraphs of
interest from D based on user-specified minRF<sub>g</sub> threshold.</p>
          <div className="scp_definition_heading" id="example">
              Example
          </div>
         {/*<div className="scp_definition">
                    <img src={Image} className="example_image"></img>
                    <div className="image_name">Fig. 2: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with minRF g =0.2</div>
                    <p className="para">Consider graph transactional dataset D comprising of 10 graph transactions G<sub>1</sub> to
G<sub>10</sub> , shown in Figure 2(a). Three subgraphs S<sub>1</sub> , S<sub>2</sub> and
S<sub>3</sub> are shown in Figure 2(b). Here, S<sub>1</sub> is a subgraph of
G<sub>1</sub>, G<sub>6</sub> and G<sub>10</sub> ; S<sub>2</sub> is a subgraph of G<sub>5</sub> , G<sub>7</sub> and G<sub>8</sub> ; and
S<sub>3</sub> is a subgraph of G<sub>4</sub> and G<sub>7</sub> . The subgraph S<sub>1</sub> is said
to cover G<sub>1</sub> since S<sub>1</sub> ⊆ G<sub>1</sub> . Hence, cover(S<sub>1</sub> , G<sub>1</sub> )=1.
Moreover, CSet(S<sub>1</sub> , D) = {"{G"}<sub>1</sub> ,G <sub>6</sub> ,G <sub>10</sub> and RF<sub>g</sub> (S<sub>1</sub> , D) = |Cset(S<sub>1</sub>)|/D = 3/10 = 0.3.
 Similarly RF values of S<sub>2</sub> ,
S<sub>3</sub> are 0.3 and 0.2 respectively</p>
    </div>*/}
        </div>
        <div className="scp_definition">
        <img className="terms_example_image" src={Image5}></img>
        <div className="terms_image_name">Fig. 1: Formula for Relative Frequency of Subgraph S<sub>j</sub> in D </div>
        </div>
      </div>
      <div className="terms_example_definition">
                    <img src={Image} className="example_image"></img>
                    <div className="image_name">Fig. 2: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with minRF g =0.2</div>
                    <p className="para_down_example">Consider graph transactional dataset D comprising of 10 graph transactions G<sub>1</sub> to
G<sub>10</sub> , shown in Figure 2(a). Three subgraphs S<sub>1</sub> , S<sub>2</sub> and
S<sub>3</sub> are shown in Figure 2(b). Here, S<sub>1</sub> is a subgraph of
G<sub>1</sub>, G<sub>6</sub> and G<sub>10</sub> ; S<sub>2</sub> is a subgraph of G<sub>5</sub> , G<sub>7</sub> and G<sub>8</sub> ; and
S<sub>3</sub> is a subgraph of G<sub>4</sub> and G<sub>7</sub> . The subgraph S<sub>1</sub> is said
to cover G<sub>1</sub> since S<sub>1</sub> ⊆ G<sub>1</sub> . Hence, cover(S<sub>1</sub> , G<sub>1</sub> )=1.
Moreover, CSet(S<sub>1</sub> , D) = {"{G"}<sub>1</sub> ,G <sub>6</sub> ,G <sub>10</sub> and RF<sub>g</sub> (S<sub>1</sub> , D) = |Cset(S<sub>1</sub>)|/D = 3/10 = 0.3.
 Similarly RF values of S<sub>2</sub> ,
S<sub>3</sub> are 0.3 and 0.2 respectively</p>
                </div>

    
    </>
    }
    {show_terms[4]==0 ?
    <Box className="box2">
    <div className="box_heading">Coverage Support</div>
   <div className="box2_icon">
     <FaIcons.FaPlus onClick={()=>go_to_set(4)}/>
   </div>
 
 </Box>:
    <>
    <Box className="box2">
    <div className="box_heading">
      Coverage Support
    </div>
    <div className="box2_icon">
          <FaIcons.FaMinus onClick={()=>go_to_set(4)}/>
        </div>
    </Box>
    <div className="terms_definition">
      <div>
    <p className="para">Given Graph Transactional Dataset D and a subgraph pattern SP, the coverage support of SP (CS<sub>g</sub> (SP, D)) is the percentage of graph
transactions in D covered by at least one subgraph in
SP .</p>
    <p className="para">Here, 0 ≤ CS<sub>g</sub> (SP, D) ≤ 1</p>
    <p className="para">CS<sub>g</sub> (SP, D) = 1
when all of the graph transactions in D are covered
by SP . Conversely, CS<sub>g</sub> (SP, D) = 0 when none of the
graph transactions are covered by SP.A pattern SP is interesting with respect to coverage point of view
if CS<sub>g</sub> (SP, D) ≥ minCS<sub>g</sub> , where minCS g is a userdefined minimum Coverage Support threshold for graph
transactions</p>
          <div className="scp_definition_heading" id="example">
              Example
          </div>
         {/* <div className="scp_definition">
                    <img src={Image} className="example_image"></img>
                    <div className="image_name">Fig. 2: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with minRF g =0.2</div>
                    <p className="para">Consider graph transactional dataset D comprising of 10 graph transactions G<sub>1</sub> to
G<sub>10</sub> , shown in Figure 2(a). Three subgraphs S<sub>1</sub> , S<sub>2</sub> and
S<sub>3</sub> are shown in Figure 2(b). Let Subgraph Pattern SP = {"{"} S<sub>1</sub>,S<sub>2</sub>,<sub>3</sub> {"}"} .Here, S<sub>1</sub> is a subgraph of
G<sub>1</sub>, G<sub>6</sub> and G<sub>10</sub> ; S<sub>2</sub> is a subgraph of G<sub>5</sub> , G<sub>7</sub> and G<sub>8</sub> ; and
S<sub>3</sub> is a subgraph of G<sub>4</sub> and G<sub>7</sub> . The subgraph S<sub>1</sub> is said
to cover G<sub>1</sub> since S<sub>1</sub> ⊆ G<sub>1</sub> . Hence, cover(S<sub>1</sub> , G<sub>1</sub> )=1.
Moreover, |CSet(SP , D)| / |D| = |{"{"}G<sub>1</sub> ,G <sub>6</sub> ,G <sub>10</sub>{"}"} ∪ {"{"}G<sub>5</sub> ,G<sub>7</sub>,G <sub>8</sub> {"}"} ∪ {"{"}G<sub>4</sub> ,G <sub>7</sub>{"}"} | = 8 /10 = 0.8.
 </p>
    </div>*/}
        </div>
        <div className="scp_definition">
        <img className="terms_example_image" src={Image6}></img>
        <div className="terms_image_name">Fig. 1: Formula for Coverage Support of a Subgraph Pattern SP in D </div>
        </div>
      </div>
      <div className="terms_example_definition">
                    <img src={Image} className="example_image"></img>
                    <div className="image_name">Fig. 2: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with minRF g =0.2</div>
                    <p className="para_down_example">Consider graph transactional dataset D comprising of 10 graph transactions G<sub>1</sub> to
G<sub>10</sub> , shown in Figure 2(a). Three subgraphs S<sub>1</sub> , S<sub>2</sub> and
S<sub>3</sub> are shown in Figure 2(b). Let Subgraph Pattern SP = {"{"} S<sub>1</sub>,S<sub>2</sub>,<sub>3</sub> {"}"} .Here, S<sub>1</sub> is a subgraph of
G<sub>1</sub>, G<sub>6</sub> and G<sub>10</sub> ; S<sub>2</sub> is a subgraph of G<sub>5</sub> , G<sub>7</sub> and G<sub>8</sub> ; and
S<sub>3</sub> is a subgraph of G<sub>4</sub> and G<sub>7</sub> . The subgraph S<sub>1</sub> is said
to cover G<sub>1</sub> since S<sub>1</sub> ⊆ G<sub>1</sub> . Hence, cover(S<sub>1</sub> , G<sub>1</sub> )=1.
Moreover, |CSet(SP , D)| / |D| = |{"{"}G<sub>1</sub> ,G <sub>6</sub> ,G <sub>10</sub>{"}"} ∪ {"{"}G<sub>5</sub> ,G<sub>7</sub>,G <sub>8</sub> {"}"} ∪ {"{"}G<sub>4</sub> ,G <sub>7</sub>{"}"} | = 8 /10 = 0.8.
 </p>
    </div>
      
    
    </>
    }
    {show_terms[5]==0 ?
    <Box className="box2">
    <div className="box_heading">Overlap Ratio of a Pattern X</div>
   <div className="box2_icon">
     <FaIcons.FaPlus onClick={()=>go_to_set(5)}/>
   </div>
 
 </Box>:
    <>
    <Box className="box2">
    <div className="box_heading">
      Overlap Ratio of a Pattern X
    </div>
    <div className="box2_icon">
          <FaIcons.FaMinus onClick={()=>go_to_set(5)}/>
        </div>
    </Box>
    <div className="terms_definition">
      <div>
    <p className="para">Let X = {"{"}O<sub>p</sub> , O<sub>q</sub> ,. . . , O<sub>r</sub> , O<sub>s</sub> {"}"} be a pattern such that
RF (O<sub>p</sub> ) ≥ RF (O<sub>q</sub>) ≥ · · · ≥ RF (O<sub>r</sub> ) ≥ RF (O<sub>s</sub>). (Here,
the notations O<sub>p</sub> , O<sub>q</sub> , O<sub>r</sub>, and O<sub>s</sub> represent Subgraph IDs.) The
overlap ratio of a pattern X is defined as the ratio of
the number of transactions common in CSet(X −{"{"}O<sub>s</sub>{"}"})
and CSet(O<sub>s</sub>) to CSet(O<sub>s</sub>).It is defined as shown in figure 1.</p>
    <p className="para">For a pattern X, 0 ≤ OR(X) ≤ 1</p>
    <p className="para">A pattern X
is interesting if OR(X) ≤ maxOR, where maxOR is
a user-defined maximum OR threshold.</p>
          <div className="scp_definition_heading" id="example">
              Example
          </div>
         {/* <div className="scp_definition">
                    <img src={Image} className="example_image"></img>
                    <div className="image_name">Fig. 2: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with minRF g =0.2</div>
                    <p className="para">Consider graph transactional dataset D comprising of 10 graph transactions G<sub>1</sub> to
G<sub>10</sub> , shown in Figure 2(a). Three subgraphs S<sub>1</sub> , S<sub>2</sub> and
S<sub>3</sub> are shown in Figure 2(b). Let Subgraph Pattern SP = {"{"} S<sub>1</sub>,S<sub>2</sub>,<sub>3</sub> {"}"} .Here, S<sub>1</sub> is a subgraph of
G<sub>1</sub>, G<sub>6</sub> and G<sub>10</sub> ; S<sub>2</sub> is a subgraph of G<sub>5</sub> , G<sub>7</sub> and G<sub>8</sub> ; and
S<sub>3</sub> is a subgraph of G<sub>4</sub> and G<sub>7</sub> . The subgraph S<sub>1</sub> is said
to cover G<sub>1</sub> since S<sub>1</sub> ⊆ G<sub>1</sub> . Hence, cover(S<sub>1</sub> , G<sub>1</sub> )=1.
Moreover, |CSet(SP , D)| / |D| = |{"{"}G<sub>1</sub> ,G <sub>6</sub> ,G <sub>10</sub>{"}"} ∪ {"{"}G<sub>5</sub> ,G<sub>7</sub>,G <sub>8</sub> {"}"} ∪ {"{"}G<sub>4</sub> ,G <sub>7</sub>{"}"} | = 8 /10 = 0.8.
 </p>
</div>*/}
        </div>
        <div className="scp_definition">
        <img className="terms_example_image" src={Image7}></img>
        <div className="terms_image_name">Fig. 1: Formula for Overlap Ratio of a pattern X.</div>
        </div>
      </div>
      <div className="terms_example_definition">
                    <img src={Image} className="example_image"></img>
                    <div className="image_name">Fig. 2: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with minRF g =0.2</div>
                    <p className="para_down_example">Consider graph transactional dataset D comprising of 10 graph transactions G<sub>1</sub> to
G<sub>10</sub> , shown in Figure 2(a). Three subgraphs S<sub>1</sub> , S<sub>2</sub> and
S<sub>3</sub> are shown in Figure 2(b). Let Subgraph Pattern SP = {"{"} S<sub>1</sub>,S<sub>2</sub>,<sub>3</sub> {"}"} .Here, S<sub>1</sub> is a subgraph of
G<sub>1</sub>, G<sub>6</sub> and G<sub>10</sub> ; S<sub>2</sub> is a subgraph of G<sub>5</sub> , G<sub>7</sub> and G<sub>8</sub> ; and
S<sub>3</sub> is a subgraph of G<sub>4</sub> and G<sub>7</sub> . The subgraph S<sub>1</sub> is said
to cover G<sub>1</sub> since S<sub>1</sub> ⊆ G<sub>1</sub> . Hence, cover(S<sub>1</sub> , G<sub>1</sub> )=1.
Moreover, |CSet(SP , D)| / |D| = |{"{"}G<sub>1</sub> ,G <sub>6</sub> ,G <sub>10</sub>{"}"} ∪ {"{"}G<sub>5</sub> ,G<sub>7</sub>,G <sub>8</sub> {"}"} ∪ {"{"}G<sub>4</sub> ,G <sub>7</sub>{"}"} | = 8 /10 = 0.8.
 </p>
</div>
      
      
    
    </>
    }
  
   
  </div>
  </>
  
  );
}

export default Terms_used;