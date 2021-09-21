import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { CpData } from './Cp_Data';
import { MainsidebarData} from './Mainsidebardata';
import styled from "styled-components";
import Scp_home from '../Pages/Scp_home';

import './Scpnavbar.css';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Image from '../../Images/DSAC.jpeg';
import Image_iiith from '../../Images/IIITH.jpeg';
import history from '../../history.js';
import AppContext from '../App_context';
import SubMenu from './SubMenu';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  text-decoration: none;
  font-size: 16px;
  margin-left: 0%;
  margin-top: 0.5ch;
  margin-bottom: 1ch;
  margin-right: 1ch;
  height:35px;
  
  
  &:hover {
    background: #252831;
    border-left: 4px solid green;
    cursor: pointer;
  }
`;

const MainSidebarLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  text-decoration: none;
  font-size: 16px;
  color:#080808;
  font-family: Georgia, 'Times New Roman', Times, serif;
  margin-botton:1ch;
  
  
  
  
  
  &:hover {
    cursor: pointer;
  }
`;
  
const SidebarLabel = styled.span`
`;

function Scpnavbar() {
  const [sidebar, setSidebar] = useState(true);
  const myContext = useContext(AppContext);
  const [expand_icon,setexpandicon]=useState(false);
  const [scp_patterns,setscppatterns]=useState(0);
  const [coverage_patterns,setcoveragepatterns]=useState(0);

  const showSidebar = () =>
  {
    setSidebar(!sidebar);
    myContext.show();

  }

  const expandthis=()=>
  {
    setexpandicon(true);
  }
  
  const closethis=()=>
  {
    setexpandicon(false);
  }
  
  const setpatterns=(value)=>
  {
    if(value==1 || value=='1')
    {
      setcoveragepatterns(0);
      setscppatterns(1);
    }
    else if(value==2 || value=='2')
    {
      setscppatterns(0);
      setcoveragepatterns(1);
    }
  }
  const go_to_main_page=()=>{
    alert("hi");
    console.log("came_to_def");
    setcoveragepatterns(0);
    setscppatterns(0);
  }
  return (
    <>
      <IconContext.Provider value={{ color: '#fff'}}>
        <div className="div_with_logo1">
            <img className="logo1" src={Image}></img>
            <div className="headingdiv">
              <h1 className="heading1">Data Science And Analytics Center</h1>
              
            </div>
            <img className="logo3" src={Image_iiith}></img>
        </div>
        <div>
          <div className={sidebar ? "short_side_bar_disable" : 'short_side_bar'}>
            <div className={sidebar ? "div_on_top_in_sidebar_expand" : "div_on_top_in_sidebar"} ><div className={sidebar ? "topic_heading" : "topic_heading_disable"}>
              {
                scp_patterns==0 && coverage_patterns==0 ? 
                <div>
                  <MainSidebarLink to={'/'}>
                    <div className="main_heading">
                      Home
                    </div>
                  </MainSidebarLink>
                </div> : 
                scp_patterns!=0 && coverage_patterns==0 ? 
                <div>
                  <MainSidebarLink to={'/scp_patterns_home'}>
                    <div className="main_heading">
                      Subgraph Coverage Patterns
                    </div>
                  </MainSidebarLink>
                </div> : 
                scp_patterns==0 && coverage_patterns!=0 ?
                <div>
                  <MainSidebarLink to={'/coverage_patterns_home'}>
                    <div className="main_heading">
                      Coverage Patterns
                    </div>
                  </MainSidebarLink>
                </div> :
                <div></div>
              }
            </div>
            <div className="div_containing_icons">
              <ul className='nav-menu-items1'>
                {scp_patterns==0 && coverage_patterns==0 ? 
                MainsidebarData.map((item, index) => 
                {
                  return(
                    <li key={index} className="icons_in_sidebar" onClick={()=>setpatterns(item.value)}>
                      <Link to={item.path}>
                        {item.icon}
                      </Link>
                    </li>
                  );
                }) : 
                scp_patterns!=0 && coverage_patterns==0 ? 
                
                SidebarData.map((item, index) => 
                {
                  return (
                    
                    <li key={index} className="icons_in_sidebar">
                      <Link to={item.path}>
                        {item.icon}
                      </Link>
                    </li>
                  );
                }) 
                : 
                scp_patterns==0 && coverage_patterns!=0 ?
                CpData.map((item, index) => 
                {
                  return (
                    <li key={index} className="icons_in_sidebar">
                      <Link to={item.path}>
                        {item.icon}
                      </Link>
                    </li>
                  );
                }) :
                <div></div>
                }
              </ul>
            </div>
          </div>
        </div>
        <div className={sidebar ? 'nav_on_active' : 'nav_normal'}>
          <MainSidebarLink to={'/'} className="menu-bars" >
            <FaIcons.FaHome className="icon" onClick={()=>{setscppatterns(0);setcoveragepatterns(0)}}/>
          </MainSidebarLink>
          <nav className={sidebar ? 'nav-menu1 active' : 'nav-menu1'}>
            <ul className='nav-menu-items'>
              {scp_patterns==0 && coverage_patterns==0 ? MainsidebarData.map((item, index) => 
              {
                return(
                  <>
                     <SubMenu item={item} sidebar={sidebar}  key={index} />
                  </>
                );
              }) : 
              scp_patterns!=0 && coverage_patterns==0 ? 
              
              (SidebarData.map((item, index) => 
              {
                if(index!=SidebarData.length-1){
                return(
                  <>
                    <SubMenu item={item} sidebar={sidebar} key={index}/>
                  </>
                );}
                else{
                  return(
                    <>
                    <SubMenu item={item} sidebar={sidebar} key={index}/>
                    <MainSidebarLink to='coverage_patterns_home' onClick={()=>{setscppatterns(0);setcoveragepatterns(1)}}>
                     <div className="main_heading">
                      Coverage Patterns
                      </div>
                    </MainSidebarLink>
                  </>
                  )
                }
              }))
              : 
              scp_patterns==0 && coverage_patterns!=0 ?
              CpData.map((item, index) => 
              {
                return <SubMenu item={item} sidebar={sidebar} key={index} />;
              }):
              <div></div>
              } 
    
            </ul>
          </nav>
        </div>
        
        {/*<div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars className="icon" onClick={showSidebar} />
          </Link>
          <div className={sidebar ? 'font-move' : 'font-stay'}></div>
            <h1>dsfsdfs</h1>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>*/}
      </div>
      </IconContext.Provider>
    </>
  );
}

export default Scpnavbar;