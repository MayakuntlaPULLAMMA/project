import React, {useState,useContext} from 'react';
import './Form.css';
import AppContext from '../App_context';
import { Container } from 'reactstrap';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Loader from "react-loader-spinner";
import Button from '@material-ui/core/Button';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import saveAs from 'save-as';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import * as d3 from 'd3';
import one_path from '../../Images/1_path.png';
import two_path from '../../Images/2_path.png';
import three_path from '../../Images/3_path.png';
import three_ring from '../../Images/3_ring.png';
import four_ring from '../../Images/4_ring.png';
import five_ring from '../../Images/5_ring.png';

const Form=()=>{
    const myContext = useContext(AppContext);
   
    const [formData, setFormData] = React.useState({mincs:'',minrf:'',maxor:'',analysistype:'1',structure_of_interest:'none'});
    const [frequent_subgraphs,setfrequentsubgraphs]=React.useState(false);
    const [coverage_patterns,setcoveragepatterns]=React.useState(false);
    const [fsg_info,setfsginfo]=React.useState([]);
    const [fsg_number,setfsgnumber]=React.useState(0);
    const [avg_transaction,setavgtransactions]=React.useState(0);
    const [execution_time,setexecutiontime]=React.useState(0);
    const [candidate_patterns_number,setcandidatepatternsnumber]=React.useState(0);
    const [scp_number,setscpnumber]=React.useState(0);
    const [gotdatafrombackend,setgotdatafrombackend]=React.useState(false);
    const [supports,setsupports]=React.useState([]);
    const [vertices,setvertices]=React.useState(0);
    const [vertices_set,setverticesset]=React.useState([]);
    const [edges,setedges]=React.useState(0);
    const [edges_set,setedgesset]=React.useState([]);
    const [display_all,setdisplayall]=React.useState(true);
    const [selected_filters,setselectedfilters]=React.useState({support:0,vertices:0,edges:0,coverage:0});
    const [selected_filters_coverage,setselectedfilterscoverage]=React.useState({csfrom:0,csto:0,orfrom:0,orto:0,coverage:0});
    const [show,setshow]=React.useState(false);
    const [selected_image_for_modal,setselectedimageformodal]=React.useState("");
    const [selected_image_name_for_modal,setselectedimagenameformodal]=React.useState("");
    const [scp_images,setscpimages]=React.useState([]);
    const [no_of_coverages,setcoverages]=React.useState([]);
    const [loader,setloader]=React.useState(false);
    const [selected_file,setselectedfile]=React.useState({});
    const [file_content,setfilecontent]=React.useState("");
    const [downloadtype,setdownloadtype]=React.useState(0);
    const [selected_patterns,setselectedpatterns]=React.useState([]);
    const [selected_all,setselectedall]=React.useState(false);
    const structures_of_interest=["Ring","Star","Path"];
    const handlechange=(event)=>{
        let nam=event.target.name;
        let val=event.target.value;
        console.log(val);
        setFormData((prevState)=>{
          return {...prevState,[nam]:val}
        });
    }

    const variable={
        "mincs":"Minimum Coverage Support",
        "minrf":"Minimum Relative Frequency",
        "maxor":"Maximum Overlap Ratio",
        "analysistype":"Analysis Type"
    }
    const handle_change_type=(event)=>{
        let nam=event.target.name;
        let val=event.target.value;
       
        if(val=='0'){
            setfrequentsubgraphs(true);
            setcoveragepatterns(false);
            setFormData((prevState)=>{
                return{...prevState,[nam]:val}
            })
            
        }
        else{
            setfrequentsubgraphs(false);
            setcoveragepatterns(true);
            setFormData((prevState)=>{
                return{...prevState,[nam]:val}
            })
        }
        
    }

    const handlesubmit=()=>{
        setcoveragepatterns(true);
        setfrequentsubgraphs(false);
        if(formData.minrf=='' || formData.mincs=='' || formData.maxor==''){
            let c="Please enter ";
            if(formData.mincs==''){
                c=c+"Minimum Coverage Support "
            }
            if(formData.minrf==''){
                c=c+"Minimum Relative Frequency "
            }
            if(formData.maxor==''){
                c=c+"Maximum Ovelap Ratio "
            }
            
            alert(c);
        }
        else{
            setgotdatafrombackend(false);
            setloader(true);
            const data = new FormData();
            formData.analysistype='1'
            if(formData.analysistype=='0'){
                data.append("data",parseInt(0));
                data.append("mincs",formData.mincs);
                data.append("minrf",formData.minrf);
                data.append("maxor",formData.maxor);
                data.append("analysistype",formData.analysistype);
                data.append("selected_data",myContext.dataset);
                data.append("selected_dataset",selected_file);
                data.append("file_content",file_content);
                data.append("structure_of_interest",formData.structure_of_interest);
                console.log(myContext.dataset);
                axios.post('http://localhost:5000/',data,{headers: {'content-type': 'multipart/form-data'}})
                .then(resData=>resData.data)
                .then(res=>{
                    setfsginfo(res.image_info);
                    setfsgnumber(res.fsubgraphs);
                    setavgtransactions(res.avgtransactions);
                    setexecutiontime(res.etime);
                    setsupports(res.supports);
                    setvertices(res.vertices);
                    setedges(res.edges);
                    var c=[];
                    for(var i=2;i<=res.vertices;i++){
                        c.push(i)
                    }
                    setverticesset(c);
                    var c=[];
                    for(var i=1;i<=res.edges;i++){
                        c.push(i)
                    }
                    setedgesset(c);
                    setloader(false);
                    setgotdatafrombackend(true);


                })
            }
            else{
                data.append("data",parseInt(0));
                data.append("mincs",formData.mincs);
                data.append("minrf",formData.minrf);
                data.append("maxor",formData.maxor);
                data.append("analysistype",formData.analysistype);
                data.append("selected_data",myContext.dataset);
                data.append("selected_dataset",selected_file);
                data.append("file_content",file_content);
                data.append("structure_of_interest",formData.structure_of_interest);
                axios.post('http://localhost:5000/',data,{headers: {'content-type': 'multipart/form-data'}})
                .then(resData=>resData.data)
                .then(res=>{
                    setfsginfo(res.image_info);
                    setfsgnumber(res.fsubgraphs);
                    setavgtransactions(res.avgtransactions);
                    setscpimages(res.coverage_patterns);
                    setsupports(res.supports);
                    setvertices(res.vertices);
                    setedges(res.edges);
                    var c=[];
                    for(var i=2;i<=res.vertices;i++){
                        c.push(i)
                    }
                    setverticesset(c);
                    var c=[];
                    for(var i=1;i<=res.edges;i++){
                        c.push(i)
                    }
                    setedgesset(c);
                    var c=res.no_of_coverages
                    var s=[]
                    for(var i=1;i<=c;i++){
                        s.push(i)
                    }
                    setcoverages(s);
                    console.log("scp_images_length");
                    console.log(res.coverage_patterns.length);
                    let v=[];
                    for(var i=0;i<res.coverage_patterns.length;i++)
                    {
                        let w=[];
                        for(var j=0;j<res.coverage_patterns[i].image_info.length;j++){
                            w.push(0);
                        }
                        console.log("w");
                        console.log(w);
                        v.push(w);
                    }
                    console.log("v");
                    console.log(v);
                    setselectedpatterns(v);
                    console.log("Selected_patters");
                    console.log(selected_patterns);
                    setloader(false);
                    setgotdatafrombackend(true);
                    setselectedfilterscoverage((prevState)=>{
                        return{...prevState,["coverage"]:0}
                    })
                    setselectedfilterscoverage((prevState)=>{
                        return{...prevState,["csfrom"]:formData.mincs}
                    });
                    setselectedfilterscoverage((prevState)=>{
                        return{...prevState,["csto"]:1}
                    });
                    setselectedfilterscoverage((prevState)=>{
                        return{...prevState,["orfrom"]:0}
                    });
                    setselectedfilterscoverage((prevState)=>{
                        return{...prevState,["orto"]:formData.maxor}
                    });
                    setcandidatepatternsnumber(res.number_of_candidate_patterns);
                    setscpnumber(res.number_of_scps);
                    setexecutiontime(res.execution_time);
                    

                })

            }

        }
    }

    const change_filter=(e)=>{
        let nam=e.target.name;
        let val=e.target.value;
        console.log(nam);
        console.log(val);
        if(val=="all"){
            console.log("all");
            setselectedfilters((prevState)=>{
                return {...prevState,[nam]:0}
            });
        }
        else{
            console.log("otherthen");
            setselectedfilters((prevState)=>{
                return {...prevState,[nam]:val}
            });

        }
       



    }
    const handlefileupload=(e)=>{
        console.log("file");
        let file=e.target.files[0];
        console.log(e.target.files[0]);
        var reader = new FileReader();
        reader.readAsDataURL(file)
        let r=""
        reader.onload=(e)=>{
            console.log(e.target.result);
            let r=e.target.result;
            setfilecontent(r);
            setselectedfile(file['name']);        
        }
        
        
    }

    const change_filter_coverage=(e)=>{
        let nam=e.target.name;
        let val=e.target.value;
        console.log("function");
        console.log(nam);
        console.log(val);
        if(val=='all'){
            setselectedfilterscoverage((prevState)=>{
                return {...prevState,["coverage"]:0}
            })
        }
        else{
        setselectedfilterscoverage((prevState)=>{
            return {...prevState,[nam]:val}
        })}
    }
    const show_modal=()=>{
        console.log("hiiiiiii");
        setshow(true);
    }

    const handle_click_show_modal=(image,name)=>{
        console.log('dfdf');
        setshow(true);
        setselectedimageformodal(image);
        setselectedimagenameformodal("Graph-id : "+name);

    }
    const show_modal_structure_of_interest=()=>{
        setshow(true);
        
    }

    const handleClose=()=>{
        setshow(false);
    }

const handleclickleft=(ind)=>{
    console.log("clicked");



	document.getElementById('slider'+(ind.toString())).scrollLeft -= 75;

}

const handleclickright=(ind)=>{
	document.getElementById('slider'+(ind.toString())).scrollLeft += 75;
}

const downloadfiles=(e)=>{
    console.log("wentinto_downloadfiles");
    if(frequent_subgraphs){
        var zip = new JSZip();
        var img = zip.folder("images");
        for(var i=0;i<fsg_info.length;i++){
            img.file((i+1)+".png", fsg_info[i].image_src, {base64: true});
        }
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
        });
    }
    else if(coverage_patterns){
        var zip = new JSZip();
        var img = zip.folder("images");
        for(var i=0;i<scp_images.length;i++)
        {
            for(var j=0;j<scp_images[i].image_info.length;j++){
                if(selected_patterns[i][j]==1)
                    img.file("coverage_"+(i+1)+"image_"+(j+1)+".png",scp_images[i].image_info[j].image_src,{base64:true});
            }
        }
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
        });
    }
}
const selected_file_all=()=>{
    var c=selected_all
    if(c==true){
        setselectedall(false);
        var d=document.getElementById("all_checked");
        if(d.checked==true){
            d.checked=false
        }
        var p=[...selected_patterns];
        for(var i=0;i<scp_images.length;i++)
        {
            for(var j=0;j<scp_images[i].image_info.length;j++)
            {
                
                    p[i][j]=0;
                    setselectedpatterns(p);
                    p=[...selected_patterns];

                
            }
        }
        
    }
    else{
        setselectedall(true);
        var d=document.getElementById("all_checked");
        d.checked=true
        var p=[...selected_patterns];
        for(var i=0;i<scp_images.length;i++)
        {
            for(var j=0;j<scp_images[i].image_info.length;j++){
             
                  p[i][j]=1;
                  setselectedpatterns(p);
                  p=[...selected_patterns];
              
            }
        }
    }
    console.log("sele",selected_all);
    
   
    
    console.log("hi");
    console.log("hi");
    setdownloadtype(downloadtype);
}
const downloadset=()=>{
    console.log("cametoset");
    setdownloadtype(!downloadtype);
}
const select_specific=(ind,ind1)=>{
    if(selected_all==true){
    setselectedall(false);
    var d=document.getElementById("all_checked");
    if(d.checked== true){
        d.checked=false;
    }}
    var p=[...selected_patterns];
    p[ind][ind1]=!p[ind][ind1];
    setselectedpatterns(p);
    console.log(selected_patterns);
}


    return(
        <div className={myContext.side ? "main_div_shrink" : "main_div"}>
            <IconContext.Provider value={{ color: 'white' }}>

            <div className="div_with_formand_filters">
                <div className="input_form">
                    <div className="form_heading">
                        <div className="form_title">
                            Form
                        </div>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Minimum Relative Frequency</h6>
                                <input type="text" placeholder="Enter a number between 0 and 1" value={formData.minrf} name ="minrf" className="input" onChange={handlechange}/>
                            </div>
                        </Container>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Minimum Coverage Support</h6>
                                <input type="text" placeholder="Enter a number between 0 and 1" value={formData.mincs} name ="mincs" onChange={handlechange} className="input"/>
                            </div>
                        </Container>
                    </div>
                
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Maximum Overlap Ratio</h6>
                                <input type="text" placeholder="Enter a number between 0 and 1" name ="maxor" value={formData.maxor} onChange={handlechange} className="input"/>
                            </div>
                        </Container>
                    </div>
                    <div>
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name" onClick={show_modal_structure_of_interest}>Structure of Interest</h6>
                                <select className="support" name="structure_of_interest" onChange={handlechange}>
                                    <option value="none" name="structure_of_interest" >All</option>
                                {structures_of_interest.map((item1, index1) => {
                                            return (
                                                <option  name="supprt" value={item1} >{item1}</option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Container>
                    </div>
                    <div className={show ? "modal" : "display_none"}>
                                                    <div className="modal-content_structure_of_interest">
                                                    <span className="close" onClick={handleClose}>&times;</span>

                                                        <div className="modal_head_si">Structures of Interest</div>
                                                           <div className="display_item_flex">
                                                                    <div className="si_main_heading">Path Structures</div>
    
                                                               <div className="si_image_and_heading1">
                                                                    <div className="si_heading">One Path</div>
                                                                    <div className="box_si">
                                                                        <img classsName="si_image" src={one_path}></img>
                                                                    </div>
                                                               </div>
                                                               <div className="si_image_and_heading1">
                                                                    <div className="si_heading">Two Path</div>
                                                                    <div className="box_si">
                                                                        <img className="si_image" src={two_path}></img>
                                                                    </div>
                                                               </div>
                                                               <div className="si_image_and_heading1">
                                                                    <div className="si_heading">Three Path</div>
                                                                    <div className="box_si">
                                                                        <img className="si_image" src={three_path}></img>
                                                                    </div>
                                                               </div>
                                                            </div>
                                                            <div className="display_item_flex">
                                                            <div className="si_main_heading">Ring Structures</div>

                                                               <div className="si_image_and_heading1">
                                                                    <div className="si_heading">Three Ring Structure</div>
                                                                    <div className="box_si">
                                                                        <img className="si_image" src={three_ring}></img>
                                                                    </div>
                                                               </div>
                                                               <div className="si_image_and_heading1">
                                                                    <div className="si_heading">Four Ring Structure</div>
                                                                    <div className="box_si">
                                                                        <img className="si_image" src={four_ring}></img>
                                                                    </div>
                                                               </div>
                                                               <div className="si_image_and_heading1">
                                                                    <div className="si_heading">Five Ring Structure</div>
                                                                    <div className="box_si">
                                                                        <img className="si_image" src={five_ring}></img>
                                                                    </div>
                                                               </div>
                                                            </div>
                                                        </div>
                                                </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name">Upload Dataset</h6>
                                <input accept=".txt" required /*style={{ display: 'none' }}*/ id="contained-button-file" onChange={handlefileupload} className="input" multiple type="file"/>

                            </div>
                        </Container>
                    </div>
                   
                    
                    {/*<div className="form_body_main_div">
                        <Container className="Container">
                            <div className="buttons_for_type">
                           
                                <button className={frequent_subgraphs?"button_for_type_selected" : "button_for_type"} name="analysistype" value="0" onClick={handle_change_type}>Frequent Subgraphs</button>
                                <button className={coverage_patterns ? "button_for_type_selected" : "button_for_type"} name="analysistype" value="1" onClick={handle_change_type}>Coverage Patterns</button>
                            </div>
                        </Container>
                    </div>*/}
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="buttons_for_type">
                                <button className="button_for_submit" onClick={handlesubmit}>Extract Coverage Patterns</button>
                            </div>
                        </Container>
                    </div>
                    {gotdatafrombackend?<div className="form_body_main_div">
                        <Container className="Container">
                            <div className="buttons_for_type">
                           
                                <button className={frequent_subgraphs?"button_for_type_selected" : "button_for_type"} name="analysistype" value="0" onClick={handle_change_type}>Frequent Subgraphs</button>
                                <button className={coverage_patterns ? "button_for_type_selected" : "button_for_type"} name="analysistype" value="1" onClick={handle_change_type}>Coverage Patterns</button>
                            </div>
                        </Container>
                    </div>:<div></div>}
                    
                </div>
                <div className={gotdatafrombackend & frequent_subgraphs ? "fsgstats" : "display_none"}>
                <div className="filters_fsg">
                    <div className="filter_heading">
                        <div className="form_title">
                            Filters
                        </div>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Support</h6>
                                <select className="support" name="support" onChange={change_filter}>
                                    <option value="all" name="support" >All</option>
                                {supports.map((item1, index1) => {
                                            return (
                                                <option  name="supprt" value={item1} >{item1}</option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Container>
                    </div>
                
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Edges</h6>
                                <select className="support" name="edges" onChange={change_filter}>
                                    <option  value="all" name="edges">All</option>

                                    {edges_set.map((item1, index1) => {
                                            return (
                                                <option value={item1} name="edges" >{item1}</option>
                                            );
                                    })}
                                </select>
                            </div>
                        </Container>
                    </div>
                </div>
                <div className="stats">
                    <div className="filter_heading">
                        <div className="form_title">
                            Statistics
                        </div>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Average Size of a Transaction</h6>
                                <h6 className="from">{avg_transaction}</h6>
                            </div>
                        </Container>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name">Execution Time</h6>
                                <h6 className="from">{execution_time+" sec"}</h6>
                            </div>
                        </Container>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name">Number of Frequent Subgraphs</h6>
                                <h6 className="from">{fsg_number}</h6>
                            </div>
                        </Container>
                    </div>
                </div>
                
                </div>
            <div className={gotdatafrombackend & coverage_patterns ? "cpstats" : "display_none"}>
                <div className="filters_coverage">
                    <div className="filter_heading">
                        <div className="form_title">
                            Filters
                        </div>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Coverage Patterns</h6>
                                <select className="support" name="coverage" onChange={change_filter_coverage}>
                                    <option value="all" name="support" >All</option>
                                {no_of_coverages.map((item1, index1) => {
                                            return (
                                                <option  name="support" value={item1} >{item1}</option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Container>
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Coverage Support</h6>
                                <div className="support1" name="coverage" onChange={change_filter_coverage}>
                                    <h6 className="from">from</h6>
                                    <input type="text" placeholder="Enter a number between 0 and 1" name ="csfrom" value={selected_filters_coverage.csfrom} onChange={change_filter_coverage} className="fromto"/>
                                    <h6 className="from">to</h6>
                                    <input type="text" placeholder="Enter a number between 0 and 1" name ="csto" value={selected_filters_coverage.csto} onChange={change_filter_coverage} className="fromto"/>

                                </div>

                                
                            </div>
                        </Container>
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Overlap Ratio</h6>
                                <div className="support1" name="coverage" onChange={change_filter}>
                                    <h6 className="from">from</h6>
                                    <input type="text" placeholder="Enter a number between 0 and 1" name ="orfrom" value={selected_filters_coverage.orfrom} onChange={change_filter_coverage} className="fromto"/>
                                    <h6 className="from">to</h6>
                                    <input type="text" placeholder="Enter a number between 0 and 1" name ="orto" value={selected_filters_coverage.orto} onChange={change_filter_coverage} className="fromto"/>

                                </div>

                                
                            </div>
                        </Container>
                        
                    </div>
                    
                </div>
                <div className="stats">
                    <div className="filter_heading">
                        <div className="form_title">
                            Statistics
                        </div>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Execution Time</h6>
                                <h6 className="from">{execution_time+" sec"}</h6>

                                
                            </div>
                        </Container>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name">Number of Candidate Patterns</h6>
                                <h6 className="from">{candidate_patterns_number}</h6>

                                
                            </div>
                        </Container>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name">Number of Scps</h6>
                                <h6 className="from">{scp_number}</h6>

                                
                            </div>
                        </Container>
                    </div>
                </div>


                
            </div>
                


            </div>

            {!gotdatafrombackend & loader ? <Loader type="TailSpin"
        color="rgb(17, 17, 109)"
        height={250}
        width={350}
    
        className="loader">Data Loading</Loader> :<> <div className={gotdatafrombackend & frequent_subgraphs  ? "table" : "display_none"}>
                    <div className="table2">
                        <table className="images_in_table" cellSpacing="0" role="grid">
                            <thead>
                                <tr role="row">
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' className="table_head">Support</th>
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='1094px' className="table_head">Frequent Subgraphs 
</th>

                                </tr>
                            </thead>
                            <tbody>
                                {supports.map((item,index)=>{
                                    
                                    if(selected_filters.support==0 && selected_filters.vertices==0 && selected_filters.edges==0){
                                        console.log("frequent");
                                        return(
                                            
                                        <tr  role="row">
                                            <td className="freq">
                                                <div >{item}</div>
                                            </td>
                                            <td>
                                                <div className="graphs_display">
                                                    {fsg_info.map((item1,index1)=>{
                                                        if(item1.support==item){
                                                            return(
                                                                <div onClick={()=>{handle_click_show_modal(item1.image_src,item1.image_name)}}>
                                                                    <div>
                                                                    {/*<div className="image_support_heading">Support {item}</div>*/}
                                                                    <img src={`data:image/png;base64,${item1.image_src}`} className="image1"></img>
                                                                  
                                                                   
                                                                            
                                                                        
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                                <div className={show ? "modal" : "display_none"}>
                                                    <div className="modal-content">
                                                    <Button variant="contained" className="downloadoption" href={`data:image/png;base64,${selected_image_for_modal}`} target="_blank" download={selected_image_name_for_modal}>Download</Button>

                                                        <span className="close" onClick={handleClose}>&times;</span>
                                                        <div className="modal_head">{selected_image_name_for_modal}</div>


                                                        <img src={`data:image/png;base64,${selected_image_for_modal}`} className="modal_image"></img>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            
                                            

                                        </tr>
                                        );
                                        
                                    }
                                    else if(selected_filters.support==0 && selected_filters.vertices==0 && selected_filters.edges!=0){
                                        return(
                                            <tr  role="row">
                                            <td className="freq">
                                                <div >{item}</div>
                                            </td>
                                            <td>
                                                <div className="graphs_display2">
                                                    {fsg_info.map((item1,index1)=>{
                                                        if(item1.support==item && item1.edges==parseInt(selected_filters.edges)){
                                                            return(
                                                            <div onClick={()=>{handle_click_show_modal(item1.image_src)}}>
                                                                <img src={`data:image/png;base64,${item1.image_src}`} className="image1"></img>
                                                            </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                                <div className={show ? "modal" : "display_none"}>
                                                    <div className="modal-content">
                                                    <Button variant="contained" className="downloadoption" href={`data:image/png;base64,${selected_image_for_modal}`} target="_blank" download={selected_image_name_for_modal}>Download</Button>

                                                        <span className="close" onClick={handleClose}>&times;</span>
                                                        <img src={`data:image/png;base64,${selected_image_for_modal}`} className="modal_image"></img>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            

                                        </tr>
                                        
                                        );
                                    }
                                    
                                    else if(selected_filters.support!=0 && selected_filters.vertices==0 && selected_filters.edges==0 && item==selected_filters.support){
                                        return(
                                            <tr  role="row">
                                            <td className="freq">
                                                <div className={item==parseInt(selected_filters.support) ? "class" : "display_none"}>{item}</div>

                                            </td>
                                            <td>
                                                <div className="graphs_display2">
                                                    {fsg_info.map((item1,index1)=>{
                                                        if(item1.support==parseInt(selected_filters.support)){
                                                            console.log("1 0 0");
                                                            console.log(item1.support);
                                                            console.log(item1.vertices);
                                                            return(
                                                            <div onClick={()=>{handle_click_show_modal(item1.image_src)}}>
                                                            <img src={`data:image/png;base64,${item1.image_src}`} className="image1"></img>
                                                            </div>);
                                                        }
                                                    })}
                                                </div>
                                                <div className={show ? "modal" : "display_none"}>
                                                    <div className="modal-content">
                                                    <Button variant="contained" className="downloadoption" href={`data:image/png;base64,${selected_image_for_modal}`} target="_blank" download={selected_image_name_for_modal}>Download</Button>

                                                        <span className="close" onClick={handleClose}>&times;</span>
                                                        <img src={`data:image/png;base64,${selected_image_for_modal}`} className="modal_image"></img>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            

                                        </tr>
                                        );
                                    }
                                    
                                    else if(selected_filters.support!=0 && selected_filters.vertices==0 && selected_filters.edges!=0 && item==selected_filters.support){
                                        
                                        return(
                                        
                                        <tr  role="row">
                                            
                                            <td className="freq">
                                                
                                                <div className={item==selected_filters.support ? "class" : "display_none"}>{item}</div>
                                            </td>
                                    
                                          <td>
                                                <div className="graphs_display2">
                                                    {fsg_info.map((item1,index1)=>{
                                                        if(item1.support==selected_filters.support && item1.support==item && item1.edges==parseInt(selected_filters.edges)){
                                                            return(
                                                            <div onClick={()=>{handle_click_show_modal(item1.image_src)}}>
                                                                <img src={`data:image/png;base64,${item1.image_src}`} className="image"></img>
                                                            </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                                <div className={show ? "modal" : "display_none"}>
                                                    <div className="modal-content">
                                                    <Button variant="contained" className="downloadoption" href={`data:image/png;base64,${selected_image_for_modal}`} target="_blank" download={selected_image_name_for_modal}>Download</Button>

                                                        <span className="close" onClick={handleClose}>&times;</span>
                                                        <img src={`data:image/png;base64,${selected_image_for_modal}`} className="modal_image"></img>
                                                    </div>
                                                </div>
                                                </td>
                                            
                                            

                                                </tr>
                                        );
                                        
                                    }
                                    
                                    
                                   
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className={gotdatafrombackend & coverage_patterns ? "table" : "display_none"}>
                    <div className="table2">
                        <table className="images_in_table" cellSpacing="0" role="grid">
                            <thead>
                                <tr role="row">
                                   {/* <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' className="table_head">Pattern ID</th>
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' className="table_head">Coverage Support</th>
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' className="table_head">Overlap Ratio</th>
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' className="table_head">Coverage</th>
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='1094px' className="table_head">Coverage Patterns <h6 className="downloadtext" onClick={downloadfiles}>Download</h6></th>
                                    */}
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' height='2px' className="table_head">SCP Details</th>
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' height='2px' className="table_head">
                                        {downloadtype==0 ? 
                                        <div >
                                            Subgraph Coverage Pattern
                                            <div className="downloadtext" /*onClick={downloadfiles} */onClick={downloadset}>
                                            Download
                                        </div>
                                        </div>:
                                        <label className="table_head">
                                            <input id="all_checked" type="checkbox"  onChange={selected_file_all}>

                                            </input>
                                                {' '}Subgraph Coverage Pattern
                                                <h6 className="downloadtext" onClick={downloadfiles}>
                                            <FaIcons.FaDownload className="download_icon"/>
                                        </h6>
                                        </label>
                                        } 
                                       
                                    </th>
                                </tr>
                                
                            </thead>
                            <tbody>
                                
                                {scp_images.map((item,index)=>{
                                    console.log("jkjkjkj");
                                    console.log(selected_filters_coverage.coverage);
                                    if(selected_filters_coverage.coverage==0){
                                       console.log("selected_foiteres");
                                        return(
                                        <>
                                        
                                        {item.image_info.map((item1,index1)=>{
                                            console.log("hiiiii");
                                            console.log(item1.cs>=selected_filters_coverage.csfrom);
                                            console.log(item1.cs<=selected_filters_coverage.csto);
                                            console.log(item1.or>=selected_filters_coverage.orfrom);
                                            console.log(item1.or<=selected_filters_coverage.orto);
                                            if(item1.cs>=selected_filters_coverage.csfrom && item1.cs<=selected_filters_coverage.csto && item1.or>=selected_filters_coverage.orfrom && item1.or<=selected_filters_coverage.orto){
                                                
                                            return(
                                                
                                                <tr role="row">
                                                    {/*<td className="freq">
                                                        {item1.pattern_id}
                                                    </td>
                                                    <td className="freq">
                                                        {item1.cs}
                                                    </td>
                                                    <td className="freq">
                                                        {item1.or}
                                                    </td>
                                                    <td className="freq">
                                                        {item.coverage}
                                                    </td>*/}
                                                    <td className="freq">
                                                        <p><div className="scp_details">
                                                            <div className="detail_text">Scp Id</div><div className="detail_value">:</div><div className="detail_value">{item1.pattern_id}</div>
                                                        </div>
                                                        <div className="scp_details">
                                                            <div className="detail_text">Coverage Support</div><div className="detail_value">:</div><div className="detail_value">{item1.cs}</div>
                                                        </div>
                                                        <div className="scp_details">
                                                            <div className="detail_text">Overlap Ratio</div><div className="detail_value">:</div><div className="detail_value">{item1.or}</div>
                                                        </div>
                                                        <div className="scp_details">
                                                            <div className="detail_text">Size of Coverage</div><div className="detail_value">:</div><div className="detail_value">{item.coverage}</div>
                                                        </div></p>
                                                        
                                                    </td>
                                                    <td className="image_table_data">
                                                    <div>{downloadtype==1 ? <label><input type="checkbox"  checked={selected_patterns[index][index1]} onChange={()=>{select_specific(index,index1)}}/><pre className="tab1">  </pre></label> : <div></div>}<img class="thumbnail" src={`data:image/png;base64,${item1.image_src}`}></img></div>

                                                        
                                                    </td>
                                                </tr>
                                            );}
                                        })}
                                        </>);
                                       
                                    }
                                    else {

                                       /* return(
                                            <tr role="row">
                                                <td className="freq">{item.coverage}</td>
                                                <td>
                                                    <div className="graphs_display1">
                                                    {item.image_src.map((item1,index1)=>{
                                                        return(
                                                        <div>
                                                        <img src={`data:image/png;base64,${item1}`} className="image1" ></img>
                                                        </div>);
                                                    })}
                                                    </div>
                                                </td>
                                                </tr>


                                                
                                            
                                        );*/

                                        return(
                                            <>
                                            
                                            {item.image_info.map((item1,index1)=>{
                                                console.log("inelse");
                                                console.log(item.coverage==selected_filters_coverage.coverage,(item.coverage));
                                                if(item.coverage==selected_filters_coverage.coverage && item1.cs>=selected_filters_coverage.csfrom && item1.cs<=selected_filters_coverage.csto && item1.or>=selected_filters_coverage.orfrom && item1.or<=selected_filters_coverage.orto){
                                                return(
                                                    
                                                    <tr role="row">
                                                        <td className="freq">
                                                            {item1.pattern_id}
                                                        </td>
                                                        <td className="freq">
                                                            {item1.cs}
                                                        </td>
                                                        <td className="freq">
                                                            {item1.or}
                                                        </td>
                                                        <td className="freq">
                                                            {item.coverage}
                                                        </td>
                                                        <td >
                                                        <img class="thumbnail" src={`data:image/png;base64,${item1.image_src}`}></img>
    
                                                        </td>
                                                    </tr>
                                                );}
                                            })}
                                            </>);
                                           
                                    }
                                })}

                            </tbody>
                        </table>
                    </div>
                </div></>}
        </IconContext.Provider>     
        </div>



        
    );
}
export default Form;