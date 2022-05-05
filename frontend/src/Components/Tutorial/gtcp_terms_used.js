import React,{useContext} from 'react';
import { useState } from 'react';
import './Terms_used.css';
import Image from '../../Images/Graph_transaction.jpg';
import AppContext from '../App_context';
import Box from '@material-ui/core/Box';
import Image3 from '../../Images/graph_transaction_example.png';
import Image4 from '../../Images/Cover.png';
import Image5 from '../../Images/Relative_Frequency_Formula.png';
import Image6 from '../../Images/Coverage_Support.png';
import Image7 from '../../Images/Overlap_Ratio.png';
import * as FaIcons from 'react-icons/fa';



function Gtcp_Terms_used(props) {
  console.log("dfdf");
  const myContext = useContext(AppContext);
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
    
    {show_terms[0]===0 ?
    <div>
      <Box className="box2" onClick={()=>go_to_set(0)}>
         <div className="box_heading">Graph Transaction</div>
        <div className="box2_icon">
          <FaIcons.FaPlus onClick={()=>go_to_set(0)}/>
        </div>
      
      </Box>
    </div> :
    <>
    <Box className="box2" onClick={()=>go_to_set(0)}> 
    <div className="box_heading">
      Graph Transaction
    </div>
    <div className="box2_icon">
          <FaIcons.FaMinus onClick={()=>go_to_set(0)}/>
        </div>
    </Box>
    <div className="terms_definition">
      <div>
    <p className="para">A graph transaction <i>G = ({' '}V, E, L, l{' '})</i> is a labeled,{' '}connected and undirected graph,{' '}where <i>V is a set of
vertices</i>,{' '}<i>E ⊆ V<sub>2</sub></i> is a set of edges, <i>L</i> is a set of labels and <i>l : V ∪ E → L</i>,{' '}where <i>l</i> is a function for assigning
labels to vertices and edges.
</p>
<p className="para">Consider a sample chemical compound
shown in Figure 1(a) and its equivalent graph transaction <i>G{' '}={' '}({' '}V,{' '}E,{' '}L,{' '}l{' '})</i> depicted in Figure 1(b). Here, <i>V = {"{ "}v<sub>1</sub>,v<sub>2</sub>, . . . ,v<sub>13</sub>{" }"}</i>,<i>{' '}E{' '}={' '}{"{ "}{'('}v<sub>1</sub>,{' '}v<sub>3</sub>{')'},{' '}{'('}v<sub>2</sub>,{' '}v<sub>3</sub>{')'},........{'('}v<sub>9</sub>,{' '}v<sub>13</sub>{')'}{' '}{"}"}</i>{' '}and <i>L{' '}=
{' '}{"{ C, F, H, N, O, 1, 2, 3 }"}</i>. A mapping function <i>l</i> maps the
the vertices <i>v<sub>1</sub>,{' '}v<sub>2</sub>,{' '}v<sub>3</sub>,. . . ,v<sub>13</sub></i> to <i>H,{' '}N,{' '}N,{' '}. . .,{' '}F</i> and the
edges <i>({' '}v<sub>1</sub>,{' '}v<sub>3</sub>),{' '}({' '}v<sub>2</sub>,v<sub>3</sub>{' '}), . . . ,({' '}v<sub>9</sub>,{' '}v<sub>13</sub>{' '})</i> to <i>1,{' '}3,. . . ,{' '}1</i> respectively.</p>
</div>
        <div className="scp_definition">
        <img className="terms_example_image" src={Image3} alt='image3'></img>
        <div className="terms_image_name">Fig. 1: (a) Sample chemical compound, (b) Equivalent graph model</div>
        </div>
    </div>
    </>
    }
    {show_terms[1]===0 ?
    <Box className="box2" onClick={()=>go_to_set(1)}>
    <div className="box_heading">Fragment</div>
   <div className="box2_icon">
     <FaIcons.FaPlus onClick={()=>go_to_set(1)}/>
   </div>
 
 </Box>:
    <>
    <Box className="box2" onClick={()=>go_to_set(1)}>
    <div className="box_heading">
      Fragment
    </div>
    <div className="box2_icon">
          <FaIcons.FaMinus onClick={()=>go_to_set(1)}/>
        </div>
    </Box>
    <div className="terms_definition">
    <p className="para">A portion f of a graph transaction G is called a <i>fragment/subgraph</i> of G. Given <i>G = (V , E)</i> and <i>f = (V<sub>f</sub> , E<sub>f</sub>)</i>, we say that f is a fragment/subgraph
of G or f exists in G (denoted as f ⊆ G), iff <i>V<sub>f</sub> ⊆ V,
E<sub>f</sub> ⊆ E</i>, <i>∀(u, v) ∈ E<sub>f</sub> −→ u, v ∈ V<sub>f</sub></i></p>
        
    </div>
    </>
    }
    {show_terms[2]===0 ?
    <Box className="box2" onClick={()=>go_to_set(2)}>
    <div className="box_heading">Cover Set of a Subgraph</div>
   <div className="box2_icon">
     <FaIcons.FaPlus onClick={()=>go_to_set(2)}/>
   </div>
 
 </Box>:
    <>
    <Box className="box2" onClick={()=>go_to_set(2)}>
    <div className="box_heading">
      Cover Set of a Subgraph
    </div>
    <div className="box2_icon">
          <FaIcons.FaMinus onClick={()=>go_to_set(2)}/>
        </div>
    </Box>
    <div className="terms_definition">
      <div>
    <p className="para">A subgraph <i>S<sub>j</sub></i>{' '}is said to cover graph <i>G<sub>i</sub></i> from Graph Transactional Dataset if <i>S<sub>j</sub></i> exists in <i>G<sub>i</sub></i>.{' '}</p>
    <p className="para">The Cover Set of subgraph <i>S<sub>j</sub></i> is defined as the set of all graph transactions covered by <i>S<sub>j</sub></i>.It is denoted by <i>CSet<sub>g</sub>(S<sub>j</sub>,{' '}D{' '})</i>.{' '}Formally,
<i>CSet<sub>g</sub>(S<sub>j</sub>,{' '}D{' '}) = {"{ G"}<sub>i</sub> |cover(S <sub>j</sub>,{' '}G<sub>i</sub>{' '}) = 1 {"&"} G<sub>i</sub> ∈ D {"}"}</i>.
{' '}The Cover Set of <i>SP (CSet<sub>g</sub>(SP,{' '}D{' '}))</i> is a set of all graph transactions covered by  atleast one Subgraph of <i>SP</i>.
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
        <img className="terms_example_image" src={Image4} alt='image4'></img>
        <div className="terms_image_name">Fig. 2: Cover</div>
        </div>
      </div>
      <div className="terms_example_definition">
                    <img src={Image} className="example_image" alt='example_image'></img>
                    <div className="image_name">Fig. 1: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with <i>minRF<sub>g</sub></i>{' '}={' '}0.2</div>
                    <p className="para_down_example">Figure 1.a of above image is the Graph Transactional Dataset consisting of 10 graphs.{' '}In Figure 2(b),{' '}let <i>SP</i> be the set {"{ S1, S2, S3 }"}. The RF values of <i>S1</i>,{' '}<i>S2</i>,{' '}and{' '}<i>S3</i> are 0.3, 0.3, and 0.2 respectively. The coverage set of <i>SP</i>,{' '}<i>CSet({' '}SP,D{' '}){' '}=
                        {' '}{"{( G1, G4, G5, G6, G7, G8, G10 }"}</i>.</p>
                </div>
    
    </>
    }
    {show_terms[3]===0 ?
    <Box className="box2" onClick={()=>go_to_set(3)}>
    <div className="box_heading">Graph Transactional Coverage</div>
   <div className="box2_icon">
     <FaIcons.FaPlus onClick={()=>go_to_set(3)}/>
   </div>
 
 </Box>:
    <>
    <Box className="box2" onClick={()=>go_to_set(3)}>
    <div className="box_heading">
      Relative Frequency of a Subgraph
    </div>
    <div className="box2_icon">
          <FaIcons.FaMinus onClick={()=>go_to_set(3)}/>
        </div>
    </Box>
    <div className="terms_definition">
      <div>
    <p className="para">Given Graph Transactional Data <i>D</i> and a subgraph <i>S<sub>j</sub></i>{' '},{' '}we denote the percentage of graph
transactions in <i>D</i> covered by <i>S<sub>j</sub></i> as Relative Frequency.
 Formula for computing Relative Frequency of Subgraph <i>S<sub>j</sub></i> in <i>D</i> is shown in figure 1.</p>
    <p className="para">Here,{' '}<i>0 ≤ RF<sub>g</sub>({' '}S<sub>j</sub>,{' '}D{' '}) ≤ 1</i>.{' '}We can extract subgraphs of
interest from <i>D</i> based on user-specified <i>minRF<sub>g</sub></i> threshold.</p>
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
        <img className="terms_example_image" src={Image5} alt='terms_example_image'></img>
        <div className="terms_image_name">Fig. 1: Formula for Relative Frequency of Subgraph <i>S<sub>j</sub></i> in <i>D</i> </div>
        </div>
      </div>
      <div className="terms_example_definition">
                    <img src={Image} className="example_image" alt='example_image'></img>
                    <div className="image_name">Fig. 2: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with <i>minRF<sub>g</sub>{' '}={' '}0.2</i></div>
                    <p className="para_down_example">Consider graph transactional dataset <i>D</i> comprising of 10 graph transactions <i>G<sub>1</sub></i> to
<i>G<sub>10</sub></i>{' '},{' '}shown in Figure 2(a).{' '}Three subgraphs <i>S<sub>1</sub></i>,{' '}<i>S<sub>2</sub></i> and
{' '}<i>S<sub>3</sub></i> are shown in Figure 2(b). Here,{' '}<i>S<sub>1</sub></i> is a subgraph of
{' '}<i>G<sub>1</sub></i>{' '},{' '}<i>G<sub>6</sub></i> and <i>G<sub>10</sub></i>{' '};{' '}<i>S<sub>2</sub></i> is a subgraph of <i>G<sub>5</sub></i>{' '},{' '}<i>G<sub>7</sub></i> and{' '}<i>G<sub>8</sub></i>{' '};{' '}and
{' '}<i>S<sub>3</sub></i> is a subgraph of <i>G<sub>4</sub></i> and <i>G<sub>7</sub></i>.{' '}The subgraph <i>S<sub>1</sub></i> is said
to cover <i>G<sub>1</sub></i> since <i>S<sub>1</sub> ⊆ G<sub>1</sub></i>.{' '}Hence,{' '}<i>cover({' '}S<sub>1</sub>,{' '}G<sub>1</sub>{' '}) = 1</i>.
{' '}Moreover,{' '}<i>CSet({' '}S<sub>1</sub> , D) = {"{G"}<sub>1</sub> ,G <sub>6</sub> ,G <sub>10</sub>{" }"}</i> and <i>RF<sub>g</sub>(S<sub>1</sub>,{' '}D{' '}) = |Cset({' '}S<sub>1</sub>){' '}|/{' '}D = 3/10 = 0.3</i>.
 Similarly RF values of <i>S<sub>2</sub></i>,
{' '}<i>S<sub>3</sub></i> are 0.3 and 0.2 respectively.</p>
                </div>

    
    </>
    }
    {show_terms[4]===0 ?
    <Box className="box2" onClick={()=>go_to_set(4)}>
    <div className="box_heading">Graph Transactional Pattern Coverage</div>
   <div className="box2_icon">
     <FaIcons.FaPlus onClick={()=>go_to_set(4)}/>
   </div>
 
 </Box>:
    <>
    <Box className="box2" onClick={()=>go_to_set(4)}>
    <div className="box_heading">
      Coverage Support
    </div>
    <div className="box2_icon">
          <FaIcons.FaMinus onClick={()=>go_to_set(4)}/>
        </div>
    </Box>
    <div className="terms_definition">
      <div>
    <p className="para">Given Graph Transactional Dataset <i>D</i> and a subgraph pattern <i>SP</i>,{' '}the coverage support of <i>SP{' '}({' '}CS<sub>g</sub> (SP,{' '}D){' '})</i> is the percentage of graph
transactions in <i>D</i> covered by at least one subgraph in
<i>SP</i>.</p>
    <p className="para">Here,{' '}<i>0 ≤ CS<sub>g</sub> (SP,{' '}D) ≤ 1</i></p>
    <p className="para"><i>CS<sub>g</sub> ({' '}SP,{' '}D) = 1{' '}</i>
when all of the graph transactions in <i>D</i> are covered
by SP.{' '}Conversely,{' '}<i>CS<sub>g</sub>({' '}SP,{' '}D) = 0</i> when none of the
graph transactions are covered by <i>SP</i>.{' '}A pattern <i>SP</i> is interesting with respect to coverage point of view
if <i>CS<sub>g</sub>{' '}({' '}SP,{' '}D{' '}) ≥ minCS<sub>g</sub></i>{' '},{' '}where <i>minCS<sub>g</sub></i> is a userdefined minimum Coverage Support threshold for graph
transactions.</p>
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
        <img className="terms_example_image" src={Image6} alt='terms_example_image'></img>
        <div className="terms_image_name">Fig. 1: Formula for Coverage Support of a Subgraph Pattern <i>SP</i> in <i>D</i> </div>
        </div>
      </div>
      <div className="terms_example_definition">
                    <img src={Image} className="example_image" alt='example_image'></img>
                    <div className="image_name">Fig. 2: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with <i>minRF<sub>g</sub>{' '}={' '}0.2</i></div>
                    <p className="para_down_example">Consider graph transactional dataset <i>D</i> comprising of 10 graph transactions <i>G<sub>1</sub></i> to
<i>G<sub>10</sub></i>{' '},{' '}shown in Figure 2(a).{' '}Three subgraphs <i>S<sub>1</sub></i>,{' '}<i>S<sub>2</sub></i> and
<i>S<sub>3</sub></i> are shown in Figure 2(b).{' '}Let Subgraph Pattern SP{' '}={' '}<i>{"{"} S<sub>1</sub>,{' '}S<sub>2</sub>,{' '}S<sub>3</sub> {"}"}</i>.{' '}Here,{' '}<i>S<sub>1</sub></i> is a subgraph of
{' '}<i>G<sub>1</sub></i>,{' '}<i>G<sub>6</sub></i> and <i>G<sub>10</sub></i>;{' '}<i>S<sub>2</sub></i> is a subgraph of <i>G<sub>5</sub></i>{' '},{' '}<i>G<sub>7</sub></i> and <i>G<sub>8</sub></i>{' '};{' '}and
<i>S<sub>3</sub></i> is a subgraph of <i>G<sub>4</sub></i> and <i>G<sub>7</sub></i>{' '}.{' '}The subgraph <i>S<sub>1</sub></i> is said
to cover <i>G<sub>1</sub></i> since <i>S<sub>1</sub> ⊆ G<sub>1</sub> </i>.{' '}Hence,{' '}<i>cover({' '}S<sub>1</sub>{' '},{' '}G<sub>1</sub>{' '}){' '}={' '}1</i>.
Moreover,<i>{' '}|{' '}CSet({' '}SP,{' '}D){' '}| / |{' '}D{' '}| = |{' '}{"{"}G<sub>1</sub>,{' '}G<sub>6</sub>,{' '}G<sub>10</sub>{"}"} ∪ {"{"}G<sub>5</sub>,{' '}G<sub>7</sub>,{' '}G <sub>8</sub> {"}"} ∪ {"{"}G<sub>4</sub>,{' '}G <sub>7</sub>{"}"}{' '}|</i> = 8 /10 = 0.8.
 </p>
    </div>
      
    
    </>
    }
    {show_terms[5]===0 ?
    <Box className="box2" onClick={()=>go_to_set(5)}>
    <div className="box_heading">Overlap Ratio of a Pattern X</div>
   <div className="box2_icon">
     <FaIcons.FaPlus onClick={()=>go_to_set(5)}/>
   </div>
 
 </Box>:
    <>
    <Box className="box2" onClick={()=>go_to_set(5)}>
    <div className="box_heading">
      Overlap Ratio of a Pattern X
    </div>
    <div className="box2_icon">
          <FaIcons.FaMinus onClick={()=>go_to_set(5)}/>
        </div>
    </Box>
    <div className="terms_definition">
      <div>
    <p className="para">Let <i>X = {"{ "}O<sub>p</sub>{' '},{' '}O<sub>q</sub>{' '},. . . , O<sub>r</sub>{' '},{' '}O<sub>s</sub> {" }"}</i>{' '}be a pattern such that
<i>RF{' '}({' '}O<sub>p</sub>{' '}){' '}≥{' '}RF{' '}({' '}O<sub>q</sub>{' '}) ≥ · · · ≥ RF{' '}({' '}O<sub>r</sub>{' '}){' '}≥{' '}RF{' '}({' '}O<sub>s</sub>{' '})</i>.{' '}({' '}Here,{' '}
the notations <i>O<sub>p</sub></i>{' '},{' '}<i>O<sub>q</sub></i>{' '},{' '}<i>O<sub>r</sub></i>{' '},{' '}and{' '}<i>O<sub>s</sub></i> represent Subgraph IDs{' '}).{' '}The
overlap ratio of a pattern <i>X</i> is defined as the ratio of
the number of transactions common in CSet({' '}X −{' '}{"{"}O<sub>s</sub>{"}"}{' '})
and CSet{' '}(O<sub>s</sub>) to CSet{' '}(O<sub>s</sub>).{' '}It is defined as shown in figure 1.</p>
    <p className="para">For a pattern X,{' '}0 ≤ OR(X) ≤ 1</p>
    <p className="para">A pattern X
is interesting if OR(X) ≤ maxOR,{' '}where maxOR is
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
        <img className="terms_example_image" src={Image7} alt='terms_example_image'></img>
        <div className="terms_image_name">Fig. 1: Formula for Overlap Ratio of a pattern <i>X</i>.</div>
        </div>
      </div>
      <div className="terms_example_definition">
                    <img src={Image} className="example_image" alt='example_image'></img>
                    <div className="image_name">Fig. 2: (a) Sample of 10 graph transactions, (b) Candidate subgraphs with <i>minRF<sub>g</sub></i>{' '}={' '}0.2</div>
                    <p className="para_down_example">Consider graph transactional dataset <i>D</i> comprising of 10 graph transactions <i>G<sub>1</sub></i> to
<i>G<sub>10</sub></i>,{' '}shown in Figure 2(a).{' '}Three subgraphs <i>S<sub>1</sub></i>,{' '}<i>S<sub>2</sub></i> and
<i>S<sub>3</sub></i> are shown in Figure 2(b).{' '}Let Subgraph Pattern <i>SP{' '}={' '}{"{"} S<sub>1</sub>,{' '}S<sub>2</sub>,{' '}S<sub>3</sub> {"}"}{' '}</i>.{' '}Here,{' '}<i>S<sub>1</sub></i> is a subgraph of
<i>G<sub>1</sub>,{' '}G<sub>6</sub> and G<sub>10</sub>;{' '}S<sub>2</sub></i> is a subgraph of <i>G<sub>5</sub>,{' '}G<sub>7</sub> and G<sub>8</sub>{' '}</i>; and
<i>S<sub>3</sub></i> is a subgraph of <i>G<sub>4</sub></i> and <i>G<sub>7</sub></i>.{' '}The subgraph <i>S<sub>1</sub></i> is said
to cover <i>G<sub>1</sub></i> since <i>S<sub>1</sub> ⊆ G<sub>1</sub></i>.{' '}Hence,{' '}<i>cover({' '}S<sub>1</sub>,{' '}G<sub>1</sub>{' '}){' '}={' '}1</i>.
Moreover, <i>|CSet({' '}SP,{' '}D{' '})| / |D| = |{"{ "}G<sub>1</sub>,{' '}G<sub>6</sub>,{' '}G<sub>10</sub>{" }"} ∪ {"{ "}G<sub>5</sub>,{' '}G<sub>7</sub>,{' '}G<sub>8</sub>{" }"} ∪ {"{ "}G<sub>4</sub>,{' '}G<sub>7</sub>{" }"} |</i> = 8 /10 = 0.8.
 </p>
</div>
      
      
    
    </>
    }
  
   
  </div>
  </>
  
  );
}

export default Gtcp_Terms_used;