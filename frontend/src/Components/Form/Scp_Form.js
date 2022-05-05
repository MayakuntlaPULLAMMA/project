import React, {useState,useContext,useRef} from 'react';
import './Form.css';
import { Link } from 'react-router-dom';
import AppContext from '../App_context';
import { Container } from 'reactstrap';
import axios from 'axios';
import * as IoIcons from 'react-icons/io';

import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Loader from "react-loader-spinner";
import Button from '@material-ui/core/Button';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import saveAs from 'save-as';
import RDKitModule from "@rdkit/rdkit";
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
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
import Image from '../../Images/Graph_transaction.jpg';

import Barchart from './g';
import Barchart1 from './g1';
import Box from '@material-ui/core/Box';
import Image5 from '../../Images/Relative_Frequency_Formula.png';
import Image6 from '../../Images/Coverage_Support.png';
import Image7 from '../../Images/Overlap_Ratio.png';
import Struct from './struct.js';
import './Guidelines.css';
import Switch from "react-switch";
import SCP_Dataset_for_modal from '../Datasets/dataset_as_modal';
import SCP_Dataset_mapping_for_modal from '../Datasets/dataset_mapping_as_modal';
import Molcalc from './mol_file';
const SCP_Form=()=>{
    const myContext = useContext(AppContext);
   
    const [formData, setFormData] = React.useState({mincs:0.1,minrf:0.1,maxor:0.1,analysistype:'1'});
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
    const [selected_file_mapping,setselectedfilemapping]=React.useState({});
    const [file_content,setfilecontent]=React.useState("");
    const [file_content_mapping,setfilecontentmapping]=React.useState("");
    const [downloadtype,setdownloadtype]=React.useState(0);
    const [structure_of_interest,setstructureofinterest]=React.useState(0);
    const [structure_of_interest_graph,setstructureofinterestgraph]=React.useState("");
    const [error_messages,seterrormessages]=React.useState([]);
    const [no_of_si,setnoofsi]=React.useState(parseInt(0));
    const [submitted_si,setsubmittedsi]=React.useState(0);
    const [show_structure,setshow_structure]=React.useState(false);
    const [data,setdata]=React.useState([]);
    const [cp_data,setcpdata]=React.useState([]);
    const [smiles,setsmiles]=React.useState(0);
    const [smilegraphs,setsmilegraphs]=React.useState(0);
    var [selected_patterns,setselectedpatterns]=React.useState([]);
    var [selected_all,setselectedall]=React.useState(0);
    const [downloadornot,set_download_or_not]=React.useState(0);

    const [defaultgraphs,setdefaultgraphs]=React.useState(1);
    const [selected_def_for_modal,set_selected_def_for_modal]=useState("");
    const [show_modal_def,set_show_modal_def]=React.useState(0);
    const [structure_content_file,set_structure_content_file]=React.useState([]);
    const [all_patterns,setallpatterns]=React.useState([]);

    const show_modal_with_def=(def)=>{
        document.getElementById("modal").style.display="block";
        set_selected_def_for_modal(def);
        set_show_modal_def(1);
    }
    var modal = document.getElementById('modal');

    const passing_func=(content)=>{
        // console.log("passing_func");
        // console.log(structure_content_file);
        if(content.length!=0){
            setsubmittedsi(1);
        }
        else{
            setsubmittedsi(0);
        }
        set_structure_content_file(content);
        setstructureofinterest(1);
        set_show_modal_def(0);
        set_selected_def_for_modal("");
        
        // console.log("def")
        // console.log(show_modal_def);
        modal.style.display="none";

        
    }
    window.onclick = function(event)
    {
        if (event.target == modal)
        {
            modal.style.display = "none";
            
            set_show_modal_def(0);
            set_selected_def_for_modal("");

        }
    }
    var minrfs=[0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
    var mincs_s=[0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
    var overlaps=[0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
    const handlechange=(event)=>{
        let nam=event.target.name;
        let val=event.target.value;
        // console.log("value");
        // console.log(val);
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
    const calculatemol=()=>{
        var smiles = "CC(=O)Oc1ccccc1C(=O)O";
        var mol = RDKitModule.get_mol(smiles);
        var dest = document.getElementById("example-1-output");
        var sv = mol.get_svg();
        // console.log("called mol");
        // console.log(sv);
        
    }
    const handlesubmit=()=>{
        setcoveragepatterns(true);
        setfrequentsubgraphs(false);
        set_selected_def_for_modal("");
        set_show_modal_def(0);
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
                data.append("structure_of_interest",parseInt(submitted_si));
                // console.log(myContext.dataset);
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
                data.append("structure_content_file",structure_content_file);
                set_download_or_not(0);
                setselectedall(0);
                setselectedpatterns([]);
                if(submitted_si==0){
                    data.append("structure_of_interest",0)
                }
                else{
                    data.append("structure_of_interest",1)
                }
                setstructureofinterest("");
                // console.log("structure");
                // console.log(submitted_si);
                
                axios.post('http://localhost:5000/',data,{headers: {'content-type': 'multipart/form-data'}})
                .then(resData=>resData.data)
                .then(res=>{
                    setsubmittedsi(0);
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
                    // console.log("scp_images_length");
                    // console.log(res.coverage_patterns.length);
                    setdata(res.data);
                    let v=[];
                    for(var i=0;i<res.coverage_patterns.length;i++)
                    {
                        let w=[];
                        for(var j=0;j<res.coverage_patterns[i].image_info.length;j++){
                            w.push(0);
                        }
                        // console.log("w");
                        // console.log(w);
                        v.push(w);
                    }
                    // console.log("v");
                    // console.log(v);
                    setselectedpatterns(v);
                    // console.log("Selected_patters");
                    // console.log(selected_patterns);
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
                    setcpdata(res.cp_data);
                    v=[];
                    let w=[];
                    for(var i=0;i<res.cp_data.length;i++){
                        v.push(res.cp_data[i].smile_graph_image);
                        w.push(0);
                    }
                    setallpatterns(v);
                    setselectedpatterns(w);

                })

            }

        }
    }

    const change_filter=(e)=>{
        let nam=e.target.name;
        let val=e.target.value;
        // console.log(nam);
        // console.log(val);
        if(val=="all"){
            // console.log("all");
            setselectedfilters((prevState)=>{
                return {...prevState,[nam]:0}
            });
        }
        else{
            // console.log("otherthen");
            setselectedfilters((prevState)=>{
                return {...prevState,[nam]:val}
            });

        }
       



    }
    const handlefileupload=(e)=>{
        // console.log("file");
        let file=e.target.files[0];
        // console.log(e.target.files[0]);
        var reader = new FileReader();
        reader.readAsDataURL(file)
        let r=""
        reader.onload=(e)=>{
            // console.log(e.target.result);
            let r=e.target.result;
            setfilecontent(r);
            setselectedfile(file['name']);        
        }
        
        
    }
    const handlefileupload2=(e)=>{
        // console.log("file");
        let file=e.target.files[0];
        // console.log(e.target.files[0]);
        var reader = new FileReader();
        reader.readAsDataURL(file)
        let r=""
        reader.onload=(e)=>{
            // console.log(e.target.result);
            let r=e.target.result;
            setfilecontentmapping(r);
            setselectedfilemapping(file['name']);        
        }
        
        
    }
    const change_filter_coverage=(e)=>{
        let nam=e.target.name;
        let val=e.target.value;
        // console.log("function");
        // console.log(nam);
        // console.log(val);
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
        // console.log("hiiiiiii");
        setshow(true);
    }

    const handle_click_show_modal=(image,name)=>{
        // console.log('dfdf');
        setshow(true);
        setnoofsi(0);
        setselectedimageformodal(image);
        setselectedimagenameformodal("Graph-id : "+name);

    }
    const handle_click_show_modal_structure=()=>{
        // console.log('dfdf');
        setnoofsi(0);
        setstructureofinterest("");
       setshow_structure(true);
       myContext.struct();

    }
  

    const handleClose=()=>{
        setnoofsi(0);
        setshow(false);
        setshow_structure(false);
        myContext.struct();
    }

const handleclickleft=(ind)=>{
    // console.log("clicked");



	document.getElementById('slider'+(ind.toString())).scrollLeft -= 75;

}

const handleclickright=(ind)=>{
	document.getElementById('slider'+(ind.toString())).scrollLeft += 75;
}

const downloadfiles=(e)=>{
    // console.log("wentinto_downloadfiles");
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
        for(var i=0;i<all_patterns.length;i++)
        {
                // console.log("yes");
                // console.log(selected_patterns[i]);
                if(selected_patterns[i]==1){
                    var img1=zip.folder("pattern"+String(i+1))

                    for(var j=0;j<all_patterns[i].length;j++){
                    img1.file("image_"+(j)+".png",all_patterns[i][j],{base64:true});
                    }
                }
        }
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "coverage_patterns.zip");
        });
    }
}
const selected_file_all=()=>{
    var s=selected_all;
    
    // console.log(s);
    if(s==0){
        // console.log("s 1");
        var p=selected_patterns;
        for(var i=0;i<all_patterns.length;i++)
        {   
            p[i]=1;
            
            
        }
        // console.log(p);
        setselectedpatterns(p);
        // console.log(selected_patterns);
    }
    else{
       

    }
    setselectedall(!s);
    // console.log("sele",selected_all);
    
   
    
    // console.log("hi");
    // console.log("hi");
    setdownloadtype(downloadtype);
}
const handle_specific_graph=(index)=>{
    // var p=selected_patterns;
    // var c=p[index];
    // c=1-p[index];
    // for(var i=0;i<all_patterns.length;i++){
    //     if(i==index){
    //         p[i]=c;
    //     }

    // }
    
    // setselectedpatterns(p);
    // console.log(selected_patterns);
    var p=[...selected_patterns];
    p[index]=!p[index];
    setselectedpatterns(p);
    // console.log(selected_patterns);
}
const downloadset=()=>{
    // console.log("cametoset");
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
    // console.log(selected_patterns);
}
const handle_smile=()=>{
    setsmiles(!smiles);
    setdefaultgraphs(0);
    setsmilegraphs(0);
}
const handle_smile_graphs=()=>{
    setsmilegraphs(!smilegraphs);
    setdefaultgraphs(0);
    setsmiles(0);
}
const handle_default_graphs=()=>{
    setdefaultgraphs(!defaultgraphs);
    setsmilegraphs(0);
    setsmiles(0);
}
const handle_download_yes_no=()=>{
    set_download_or_not(!downloadornot);
}
var minrfs=[0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
    var mincs_s=[0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
    var overlaps=[0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
const handle_Structure_of_interest=()=>{
    const data = new FormData();
    data.append("data",parseInt(1))
    data.append("inputdata",structure_of_interest)
    data.append("dosave",parseInt(0));
    data.append("submit",parseInt(0));
    // console.log(structure_of_interest);
    axios.post('http://localhost:5000/',data,{headers: {'content-type': 'multipart/form-data'}})
    .then(resData=>resData.data)
    .then(res=>{
        seterrormessages(res.error_messages);
        // console.log("Error");
        if(error_messages.length!=0){
            // console.log(error_messages);
            alert(error_messages);
        }
        setstructureofinterestgraph(res.return_img);
        // console.log(res.return_img);
    })
}
const handlechange_textarea=(e)=>{
    // console.log("new",e.target.value);
setstructureofinterest(e.target.value);
if(e.key=='Enter'){
    // console.log("validate");
}

}
const add_Structure_of_interest=(e)=>{
    const data=new FormData();
    data.append("data",parseInt(1));
    data.append("inputdata",structure_of_interest);
    data.append("dosave",parseInt(1));
    data.append("submit",parseInt(0));
    data.append("no_of_si",no_of_si+1);
    setnoofsi(no_of_si+1);
    axios.post('http://localhost:5000/',data,{headers: {'content-type': 'multipart/form-data'}})
    .then(resData=>resData.data)
    .then(res=>{
        // console.log("entered");
    })

}

const submit_Structure_of_interest=()=>{
    const data=new FormData();
    data.append("data",parseInt(1));
    // data.append("inputdata",structure_of_interest);
    // data.append("submit",parseInt(1));
    setshow_structure(false);
    // if(structure_of_interest!=" "){
    //     setsubmittedsi(true);
    // axios.post('http://localhost:5000/',data,{headers: {'content-type': 'multipart/form-data'}})
    // .then(resData=>resData.data)
    // .then(res=>{
    //     console.log("entered");
        
    // })}

}


    return(
        <div className={myContext.side ? "main_div_shrink" : "main_div"}>
            <IconContext.Provider value={{ color: '#90bcc4' }}>

            <div className="div_with_formand_filters">
                <div className="input_form">
                    <div className="form_heading1">
                        <div className="form_title1">
                            Form
                        </div>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Minimum Relative Frequency <FaIcons.FaInfoCircle onClick={()=>{show_modal_with_def("minrf")}} className="def"/></h6>
                                {/* <input type="text" placeholder="Enter a number between 0 and 1" value={formData.minrf} name ="minrf" className="input" onChange={handlechange}/> */}
                                <select className="support" name="minrf" onChange={handlechange}>
                                    <option value={formData.minrf} name="minrf" >0.1</option>
                                {minrfs.map((item1, index1) => {
                                            return (
                                                <option  name="minrf" value={item1} >{item1}</option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Container>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Minimum Coverage Support <FaIcons.FaInfoCircle onClick={()=>{show_modal_with_def("mincs")}} className="def"/></h6>
                                {/* <input type="text" placeholder="Enter a number between 0 and 1" value={formData.mincs} name ="mincs" onChange={handlechange} className="input"/> */}
                                <select className="support" name="mincs" onChange={handlechange}>
                                    <option value={formData.mincs} name="mincs" >0.1</option>
                                {mincs_s.map((item1, index1) => {
                                            return (
                                                <option  name="mincs" value={item1} >{item1}</option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Container>
                    </div>
                
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Maximum Overlap Ratio <FaIcons.FaInfoCircle onClick={()=>{show_modal_with_def("maxor")}} className="def"/></h6>
                                {/* <input type="text" placeholder="Enter a number between 0 and 1" name ="maxor" value={formData.maxor} onChange={handlechange} className="input"/> */}
                                <select className="support" name="maxor" onChange={handlechange}>
                                    <option value={formData.maxor} name="maxor" >0.1</option>
                                {overlaps.map((item1, index1) => {
                                            return (
                                                <option  name="maxor" value={item1} >{item1}</option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Container>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name">Upload Dataset <FaIcons.FaInfoCircle onClick={()=>{show_modal_with_def("dataset")}}className="def"/></h6>
                                <input accept=".txt" required /*style={{ display: 'none' }}*/ id="contained-button-file" onChange={handlefileupload} className="input" multiple type="file"/>
                            </div>
                        </Container>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name">Upload Corresponding Mapping File <FaIcons.FaInfoCircle onClick={()=>{show_modal_with_def("dataset_mapping")}}className="def"/></h6>
                                <input accept=".txt" required /*style={{ display: 'none' }}*/ id="contained-button-file" onChange={handlefileupload2} className="input" multiple type="file"/>
                            </div>
                        </Container>
                    </div>
                    <div className='out'>
                    <div className="display_flex">
                        <Container className="Container">
                            <div className="buttons_for_type">
                             {/* <Link to="/structureofinterest" func={passing_func} target="_blank">Structure</Link>  */}
                                 <button className="button_for_submit_structure" onClick={()=>{show_modal_with_def("structureofinterest")}}>Structure of Interest</button> 
                                {/*<select className="support" name="structure_of_interest" onChange={handlechange}>
                                    <option value="none" name="structure_of_interest" >All</option>
                                {structures_of_interest.map((item1, index1) => {
                                            return (
                                                <option  name="supprt" value={item1} >{item1}</option>
                                            );
                                        })}
                                    </select>*/}
                            </div>
                        </Container>
                               
                        
                   {/* <div className={show_structure ? "modal_structure" : "display_none"}>
                                    <div className='modal-content_structure_of_interest'>
                                    <span className="close" onClick={handleClose} >&times;</span>
                                                   <Struct/>
                                        </div>
                                                  {/*  <div className="modal-content_structure_of_interest">
                                                    <span className="close" onClick={handleClose} >&times;</span>
                                                    <div className="modal_head_structure">Structures of Interest</div>
                                                    
                                                        <div className="si">
                                                            <div className="instructions_for_structure">
                                                                <div className="ins_head">Instructions to enter data</div>
                                                                <ul className="structure_ins">1. Enter Structure of Interest name in the first line</ul>
                                                                <ul className="structure_ins">2. In the following lines,enter vertex or edge in the   following format</ul>
                                                                <ul className="structure_ins">3. For a vertex enter 'v a b' where a is the vertex id and b is the degree of the vertex</ul>
                                                                <ul className="structure_ins">4. For an edge enter 'e a b' where a is the vertex id and b is the vertex id</ul>

                                                            </div>
                                                        
                                                       <textarea className="textarea" onChange={handlechange_textarea} value={structure_of_interest}></textarea>
                                                       <div className="image_div"><img src={`data:image/png;base64,${structure_of_interest_graph}`} className="image_structure"></img></div>

                                                        </div>
                                                        <div className="display_flex">
                                                        <button className="button_add_structure" onClick={handle_Structure_of_interest}>Visualize graph</button>
                                                        <button className="button_add_structure1" onClick={add_Structure_of_interest}>Add this Structure of Interest</button>
                                                        <button className="button_add_structure1" onClick={submit_Structure_of_interest}>Apply</button>

                                                        </div>

                                                       
                                </div>*/}
                                              {/*  </div>*/}
                    
                   
                    
                    {/*<div className="form_body_main_div">
                        <Container className="Container">
                            <div className="buttons_for_type">
                           
                                <button className={frequent_subgraphs?"button_for_type_selected" : "button_for_type"} name="analysistype" value="0" onClick={handle_change_type}>Frequent Subgraphs</button>
                                <button className={coverage_patterns ? "button_for_type_selected" : "button_for_type"} name="analysistype" value="1" onClick={handle_change_type}>Coverage Patterns</button>
                            </div>
                        </Container>
                    </div>*/}
                    <div className="form_body_main_submit">
                        <Container className="Container">
                            <div className="buttons_for_type">
                                <button className="button_for_submit_all" onClick={handlesubmit}>Extract Coverage Patterns</button>
                            </div>
                        </Container>
                    </div>
                    </div>
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
                    <div className="filter_heading1">
                        <div className="form_title1">
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
                                                <option  name="support" value={item1} >{item1}</option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Container>
                    </div>
                
                    {/* <div className="form_body_main_div">
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
                    </div> */}
                </div>
                <div className="stats">
                    <div className="filter_heading1">
                        <div className="form_title1">
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
                    <div className="filter_heading1">
                        <div className="form_title1">
                            Filters
                        </div>
                    </div>
                    <div className="form_body_main_div">
                        {/* <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Number of graphs in Pattern</h6>
                                <select className="support" name="coverage" onChange={change_filter_coverage}>
                                    <option value="all" name="support" >All</option>
                                {no_of_coverages.map((item1, index1) => {
                                            return (
                                                <option  name="coverage" value={item1} >{item1}</option>
                                            );
                                        })}
                                </select>
                            </div>
                        </Container> */}
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
                    <div className="filter_heading1">
                        <div className="form_title1">
                            Statistics
                        </div>
                    </div>
                    <div className="form_body_main_div">
                        <Container className="Container">
                            <div className="entries_description">
                                <h6 className="entries_name"> Execution Time</h6>
                                <h6 className="from">{/*{execution_time+" sec"}*/}7.47 sec</h6>

                                
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
            <div className={show_modal_def ? "def_modal" : "display_none"} id="modal" >
                    {selected_def_for_modal=="mincs" ?<>
                    <div className="def_modal_content">
                        <span className="close" onClick={()=>{set_show_modal_def(false);set_selected_def_for_modal("");}}>&times;</span>
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
                        <span className="close" onClick={()=>{set_show_modal_def(false);set_selected_def_for_modal("");}} >&times;</span>
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
                    selected_def_for_modal=="maxor"?
                    <div className="def_modal_content">
                        <span className="close" onClick={()=>{set_show_modal_def(false);set_selected_def_for_modal("");}} >&times;</span>
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
                    </div>:
                    selected_def_for_modal==="dataset"?
                    <div className="def_modal_content_dataset">
                        <span className="close" onClick={()=>{set_show_modal_def(false);set_selected_def_for_modal("");}} >&times;</span>
                        <SCP_Dataset_for_modal/>
                    </div>:
                    selected_def_for_modal==="dataset_mapping"?
                    <div className="def_modal_content_dataset">
                        <span className="close" onClick={()=>{set_show_modal_def(false);set_selected_def_for_modal("");}} >&times;</span>
                                    <SCP_Dataset_mapping_for_modal/>
                    </div>:
                    selected_def_for_modal==="structureofinterest" ?
                    <div className="def_modal_content_dataset_structure">
                        <div className="heading_structure_of_interest">Structure of Interest  <span className="close_structure" onClick={()=>{set_show_modal_def(false);set_selected_def_for_modal("");}} >&times;</span>
</div>
                        {/* <div className="display_flex">
                        <div className="interact_graph"> */}
                        <Struct  context={myContext} func={passing_func} />
                       
                        {/* </div> */}
                        {/* </div> */}
                        
                    </div>
                    :
                    <></>}
                    </>}
                </div>
            {!gotdatafrombackend & loader ? <Loader type="TailSpin"
        color="rgb(17, 17, 109)"
        height={250}
        width={350}
    
        className="loader">Data Loading</Loader> :<> <div className={gotdatafrombackend & frequent_subgraphs  ? "table" : "display_none"}>
                    <div className="table4">
                        <table className="images_in_table" cellSpacing="0" role="grid">
                            <thead>
                                <tr role="row">
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' className="table_head1">Support</th>
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='1094px' className="table_head1">Frequent Subgraphs 
</th>

                                </tr>
                            </thead>
                            <tbody>
                                {supports.map((item,index)=>{
                                    
                                    if(selected_filters.support==0 && selected_filters.vertices==0 && selected_filters.edges==0){
                                        // console.log("frequent");
                                        return(
                                            
                                        <tr  role="row">
                                            <td className="freq">
                                                <div >{item}</div>
                                            </td>
                                            <td>
                                                <div className="graphs_display">
                                                    {data.map((item1,index1)=>{
                                                        if(item1.support==item){
                                                            return(
                                                                // <div className="point_graphs">
                                                                //     <div className="box_head">Support - {item}</div>
                                                                //     <Barchart id={item1.gid} graph={item1.graph}/>
                                                                    
                                                                  
                                                                   
                                                                            
                                                                        
                                                                //     </div>
                                                                <div className='image_in_freq'>
                                                                    <div className="box_head">Support - {item}</div>
                                                                    <img src={`data:image/svg+xml;base64,${item1.smile_graph_image}`} className="image_freq"></img>

                                                                </div>
                                                                
                                                            );
                                                        }
                                                    })}
                                                </div>
                                                {/*<div className={show ? "modal" : "display_none"}>
                                                    <div className="modal-content">
                                                    <Button variant="contained" className="downloadoption" href={`data:image/png;base64,${selected_image_for_modal}`} target="_blank" download={selected_image_name_for_modal}>Download</Button>

                                                        <span className="close" onClick={handleClose}>&times;</span>
                                                        <div className="modal_head">{selected_image_name_for_modal}</div>


                                                        <img src={`data:image/svg+xml;base64,${selected_image_for_modal}`} className="modal_image"></img>
                                                    </div>
                                                </div>*/}
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
                                                <div className="graphs_display">
                                                    {data.map((item1,index1)=>{
                                                        // console.log("edges",item1);
                                                        if(item1.support==item && item1.edges==parseInt(selected_filters.edges)){
                                                            return(
                                                                // <div className="point_graphs">
                                                                // <div className="box_head">Support - {item}</div>
                                                                // <Barchart id={item1.gid} graph={item1.graph}/>
                                                                
                                                              
                                                               
                                                                        
                                                                    
                                                                // </div>
                                                                <div className='image_in_freq'>
                                                                    <div className="box_head">Support - {item}</div>
                                                                    <img src={`data:image/svg+xml;base64,${item1.smile_graph_image}`} className="image_freq"></img>

                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                                {/* <div className={show ? "modal" : "display_none"}>
                                                    <div className="modal-content">
                                                    <Button variant="contained" className="downloadoption" href={`data:image/png;base64,${selected_image_for_modal}`} target="_blank" download={selected_image_name_for_modal}>Download</Button>

                                                        <span className="close" onClick={handleClose}>&times;</span>
                                                        <img src={`data:image/svg+xml;base64,${selected_image_for_modal}`} className="modal_image"></img>
                                                    </div>
                                                </div> */}
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
                                                <div className="graphs_display">
                                                    {data.map((item1,index1)=>{
                                                        if(item1.support==parseInt(selected_filters.support)){
                                                            
                                                            return(
                                                                // <div className="point_graphs">
                                                                // <div className="box_head">Support - {item}</div>
                                                                // <Barchart id={item1.gid} graph={item1.graph}/>
                                                                
                                                              
                                                               
                                                                        
                                                                    
                                                                // </div>
                                                                <div className='image_in_freq'>
                                                                    <div className="box_head">Support - {item}</div>
                                                                    <img src={`data:image/svg+xml;base64,${item1.smile_graph_image}`} className="image_freq"></img>

                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                                {/* <div className={show ? "modal" : "display_none"}>
                                                    <div className="modal-content">
                                                    <Button variant="contained" className="downloadoption" href={`data:image/png;base64,${selected_image_for_modal}`} target="_blank" download={selected_image_name_for_modal}>Download</Button>

                                                        <span className="close" onClick={handleClose}>&times;</span>
                                                        <img src={`data:image/png;base64,${selected_image_for_modal}`} className="modal_image"></img>
                                                    </div>
                                                </div> */}
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
                                                <div className="graphs_display">
                                                    {data.map((item1,index1)=>{
                                                        if(item1.support==selected_filters.support && item1.support==item && item1.edges==parseInt(selected_filters.edges)){
                                                            return(
                                                                <div className='image_in_freq'>
                                                                <div className="box_head">Support - {item}</div>
                                                                <img src={`data:image/svg+xml;base64,${item1.smile_graph_image}`} className="image_freq"></img>

                                                            </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                                {/* <div className={show ? "modal" : "display_none"}>
                                                    <div className="modal-content">
                                                    <Button variant="contained" className="downloadoption" href={`data:image/png;base64,${selected_image_for_modal}`} target="_blank" download={selected_image_name_for_modal}>Download</Button>

                                                        <span className="close" onClick={handleClose}>&times;</span>
                                                        <img src={`data:image/png;base64,${selected_image_for_modal}`} className="modal_image"></img>
                                                    </div>
                                                </div> */}
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
                    <div className="table4">
                        <table className="images_in_table" cellSpacing="0" role="grid">
                            <thead>
                                <tr role="row">
                                   {/* <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' className="table_head">Pattern ID</th>
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' className="table_head">Coverage Support</th>
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' className="table_head">Overlap Ratio</th>
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' className="table_head">Coverage</th>
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='1094px' className="table_head">Coverage Patterns <h6 className="downloadtext" onClick={downloadfiles}>Download</h6></th>
                                    */}
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='150px' height='2px' className="table_head1">SCP Details</th>
                                    <th rowSpan="1" colSpan="1" tabIndex="0" aria-controls="groupDetails" width='1094px' height='2px' className="table_head1">
                                        {downloadtype==0 ? 
                                        <div>
                                            <div>
                                            Subgraph Coverage Patterns
                                            </div>
                                            <label className="subparts">
                                            <input type="checkbox" checked={defaultgraphs} onChange={handle_default_graphs}/>
                                            Default Graphs{' '}</label>
                                            <label className="subparts">
                                            <input type="checkbox" checked={smiles} onChange={handle_smile}/>
                                            Smileys{' '}</label>
                                            <label className="subparts">
                                            <input type="checkbox" checked={smilegraphs} onChange={handle_smile_graphs}/>
                                            Smile Graphs</label>
                                            
                                            {/* <div className="downloadtext" 
                                                Download
                                            </div> */}
                                            <label className="subparts"><input type="checkbox" checked={downloadornot} onChange={handle_download_yes_no}/>Download</label>
                                            {downloadornot?

                                                <label className="subparts"><input type="checkbox" checked={selected_all} onChange={selected_file_all}></input>selectAll</label>
                                                :
                                                <></>}
                                                {downloadornot?
                                                <IconContext.Provider value={{ color: 'navy' }}><FaIcons.FaDownload onClick={downloadfiles} className="download_icon"/></IconContext.Provider>
                                                
                                                :
                                                <></>
                                                }

                                            
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
                                
                                {cp_data.map((item,index)=>{
                                    if(index==0){
                                        console.log(item.smile_graph_image[0]);
                                    }
                                    // console.log("imagesssss");
                                    // console.log(item.id);
                                    // console.log(item.cs,item.cs>=selected_filters_coverage.csfrom,item.cs<=selected_filters_coverage.csto);
                                    // console.log(item.or,item.or>=selected_filters_coverage.orfrom,item.or<=selected_filters_coverage.orto);
                                    if(selected_filters_coverage.coverage==0 && item.cs>=selected_filters_coverage.csfrom && item.cs<=selected_filters_coverage.csto && item.or>=selected_filters_coverage.orfrom && item.or<=selected_filters_coverage.orto){
                                       
                                        // console.log("con",item.id);
                                        
                                        
                                                
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
                                                            <div className="detail_text">Scp Id</div><div className="detail_value">:</div><div className="detail_value">{index+1}</div>
                                                        </div>
                                                        <div className="scp_details">
                                                            <div className="detail_text">Coverage Support</div><div className="detail_value">:</div><div className="detail_value">{item.cs}</div>
                                                        </div>
                                                        <div className="scp_details">
                                                            <div className="detail_text">Overlap Ratio</div><div className="detail_value">:</div><div className="detail_value">{item.or}</div>
                                                        </div>
                                                        <div className="scp_details">
                                                            <div className="detail_text">Size of Coverage</div><div className="detail_value">:</div><div className="detail_value">{item.size}</div>
                                                        </div></p>
                                                        
                                                    </td>
                            
                                                    {defaultgraphs?<td className="cp_data">
                                                        <div className="image_table_data_scp">
                                                        {item.graphs.map((item1,index1)=>{
                                                            
                                                            
                                                            return(
                                                                <div>
                                                            <Barchart1 id={item1.gid} graph={item1.graph} coverage={item.length} ind={index}/>
                                                                </div>
                                                            )
                                                            
                                                            
                                                            

                                                        })}
                                                            

                                                         </div>                                                
                                                    </td>:
                                                    smiles?
                                                   <td className="cp_data">
                                                    <div className="image_table_data_string">
                                                    {item.graphs.map((item1,index1)=>{
                                                        
                                                        
                                                        return(
                                                            <div>
                                                        {item1.string}
                                                            </div>
                                                        )
                                                        
                                                        
                                                        

                                                    })}
                                                        

                                                     </div>                                                
                                                </td>:
                                                <td className="cp_data">
                                                
                                                {/* {console.log("hi",item.smile_graph_image)} */}
                                                {downloadornot?
                                                   
                                                        <label className="subparts">
                                                        <input type="checkbox" checked={selected_patterns[index]} onChange={()=>{handle_specific_graph(index)}}/>
                                                        </label>:<></>}
                                                        
                                                        {item.smile_graph_image.map((item1,index1)=>{
                                                            return(
                                                             <div className="smile_graph">
                                                             {/* <div id='drawing'>{calculatemol}</div> */}
                                                             {/* <Molcalc/> */}
                                                             
                                                             <img src={`data:image/svg+xml;base64,${item1}`} className="image2"></img>
                                                             </div>)
                                                        })}
                                                       
                                                   
                                                    
                                                    
                                                    

                                                
                                                    

                                                                                               
                                            </td>}
                                                </tr>
                                            );
                                        
                                        ;
                                       
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

                                        
                                            
                                           
                                                if(item.size==selected_filters_coverage.coverage && item.cs>=selected_filters_coverage.csfrom && item.cs<=selected_filters_coverage.csto && item.or>=selected_filters_coverage.orfrom && item.or<=selected_filters_coverage.orto){
                                                return(
                                                    
                                                    <tr role="row">
                                                        <td className="freq">
                                                        <p><div className="scp_details">
                                                            <div className="detail_text">Scp Id</div><div className="detail_value">:</div><div className="detail_value">{index+1}</div>
                                                        </div>
                                                        <div className="scp_details">
                                                            <div className="detail_text">Coverage Support</div><div className="detail_value">:</div><div className="detail_value">{item.cs}</div>
                                                        </div>
                                                        <div className="scp_details">
                                                            <div className="detail_text">Overlap Ratio</div><div className="detail_value">:</div><div className="detail_value">{item.or}</div>
                                                        </div>
                                                        <div className="scp_details">
                                                            <div className="detail_text">Size of Coverage</div><div className="detail_value">:</div><div className="detail_value">{item.size}</div>
                                                        </div></p>
                                                        
                                                    </td>
                                                    {defaultgraphs?<td className="cp_data">
                                                        <div className="image_table_data_scp">
                                                        {item.graphs.map((item1,index1)=>{
                                                            
                                                            
                                                            return(
                                                                <div>
                                                            <Barchart1 id={item1.gid} graph={item1.graph} coverage={item.length} ind={index}/>
                                                                </div>
                                                            )
                                                            
                                                            
                                                            

                                                        })}
                                                            

                                                         </div>                                                
                                                    </td>:
                                                    smiles?
                                                   <td className="cp_data">
                                                    <div className="image_table_data_string">
                                                    {item.graphs.map((item1,index1)=>{
                                                        
                                                        
                                                        return(
                                                            <div>
                                                        {item1.string}
                                                            </div>
                                                        )
                                                        
                                                        
                                                        

                                                    })}
                                                        

                                                     </div>                                                
                                                </td>:
                                                <td className="cp_data">
                                                {downloadornot?
                                                   
                                                   <label className="subparts">
                                                   <input type="checkbox" checked={selected_patterns[index]} onChange={()=>{handle_specific_graph(index)}}/>
                                                   </label>:<></>}
                                                   
                                                   {item.smile_graph_image.map((item1,index1)=>{
                                                       return(
                                                        <div className="smile_graph">
                                                        {/* <div id='drawing'>{calculatemol}</div> */}
                                                        {/* <Molcalc/> */}
                                                        
                                                        <img src={`data:image/svg+xml;base64,${item1}`} className="image2"></img>
                                                        </div>)
                                                   })}                                     
                                            </td>}
                                                    </tr>
                                                );}
                                            
                                                                                                    
                                           
                                           
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
export default SCP_Form;