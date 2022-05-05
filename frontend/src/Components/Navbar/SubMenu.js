import React, { useState,useContext} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AppContext from '../App_context';
import { useHistory} from "react-router-dom"; 
import * as FaIcons from 'react-icons/fa';

// box-shadow:1px 1px 1px 1px green;
// border: 0.1px solid black;

const SidebarLink = styled(Link)`
  color: #232f4b;
  background-color:rgb(234, 245, 247);
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  height:35px;
  text-decoration:none;
  font-weight:bold;

  
  :hover {
    cursor: pointer;

  }
   
  
 
`;
  
const SidebarLabel = styled.span`
font-family:Georgia, 'Times New Roman', Times, serif;


`;
  
const DropdownLink = styled(Link)`
  background-color: white;
  // background-color:rgb(231, 218, 231);

  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  font-size: 15px;
  height:35px;
  
  
  &:hover {
    cursor: pointer;
    background-color: #c4dde4;
    color: #232f4b;
  }
  
`;

const DropdownLink1 = styled(Link)`
  background: white;
  padding-left: 5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color:black;
  font-size: 15px;
  height:35px;
  margin-top:0%;
  
  &:hover {
    cursor: pointer;
    background-color: #c4dde4;
    color: #232f4b;
  }

  &:>.active{
    background-color:green;
    color:white;
  }
`;
  
const SubMenu = ({item}) => {
  const currentRoute = useHistory().location.pathname.toLowerCase();
  console.log(currentRoute);
    console.log("sdsdfds");
    console.log("Actived",item.value);
    const myContext = useContext(AppContext);

  const [subnav, setSubnav] = useState(false);
  const [subnav1,setsubnav1]=useState(false);
  const [item0,setitem0]=useState(false);
  const [item1,setitem1]=useState(false);
  const showSubnav = (value) =>
  {
    if(value==0)
    {
      myContext.path='/scp_patterns_home';
      setSubnav(!subnav);
    }
    else
    {
      myContext.path='/coverage_patterns_home';
      setsubnav1(!subnav1);
    }
  }
  const [appstate,changestate]=useState({
    activeobject:null,
    objects:[{id:0},{id:1}]
  })
  const toggleactiveindex=(index)=>{
    if(index==1){
      setitem1(false);
      setitem0(true);
    }
    else{
      setitem0(false);
      setitem1(true);
    }
  }
  
  
  return (
    <>
    
      <SidebarLink to={item.path} 
      
          onClick={()=>{showSubnav(0)}}>
        <div>
         
         <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {
            item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null
          }
        </div>
        {subnav ? <FaIcons.FaAngleUp className="icon_angle"/>: <FaIcons.FaAngleDown className="icon_angle"/>}
      </SidebarLink>
      {subnav &&
        item.subNav.map((item1, index1) => {
          
            if(index1==0)
            {
              return(
                  <>
                  <DropdownLink to={item1.path} key={index1} 
                  onClick={()=>{setsubnav1(!subnav1)}}>
                    <div>
                      {item1.icon}
                      <SidebarLabel>{item1.title}</SidebarLabel>
                    </div>
                    <div>
                      {
                        item1.subNav && subnav1
                        ? item1.iconOpened
                        : item1.subNav
                        ? item1.iconClosed
                        : null
                      }
                    </div>
                  </DropdownLink>
                  {subnav1 && 
                    item1.subNav.map((item2,index2)=>{
                      return(
                        <DropdownLink1 to={item2.path} key={index2}>
                          {item2.icon}
                          <SidebarLabel>{item2.title}</SidebarLabel>
                        </DropdownLink1>
                      )
                    })}
                </>
                  
              );
            }
            else{
              return(
                <DropdownLink to={item1.path} key={index1}>
                    {item1.icon}
                    <SidebarLabel>{item1.title}</SidebarLabel>
                </DropdownLink>
              )
            }
        /*}*/
        })
      }
     
      

    </>
  );
};
  
export default SubMenu;