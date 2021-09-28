import React, { useState,useContext} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AppContext from '../App_context';
import { useHistory} from "react-router-dom";  
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
  background-color: ${(props) => props.backgroundColor}
  
  :hover {
    background: #252831;
    border-left: 4px solid green;
    cursor: pointer;
  }
   
  
 
`;
  
const SidebarLabel = styled.span`
`;
  
const DropdownLink = styled(Link)`
  background: #252831;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: rgb(160, 161, 179);
  font-size: 15px;
  height:35px;
  margin-top:0%;
  
  &:hover {
    background: #252831;
    cursor: pointer;
    color:#fff;
  }
  
`;

const DropdownLink1 = styled(Link)`
  background: #252831;
  padding-left: 5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: rgb(160, 161, 179);
  font-size: 15px;
  height:35px;
  margin-top:0%;
  
  &:hover {
    background: #252831;
    cursor: pointer;
    color:#fff;
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
    
      <SidebarLink   to={item.path} 
      
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