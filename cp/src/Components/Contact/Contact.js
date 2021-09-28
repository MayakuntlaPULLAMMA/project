import React,{useContext} from 'react';
import './Contact.css';
import Image from '../../Images/PKrishnaReddy.jpg';
import * as IoIcons from 'react-icons/io';
import { IconContext } from 'react-icons';
import AppContext from '../App_context';



const Contact=()=>{
    const myContext = useContext(AppContext);

    return(
    <div className={myContext.side?"allcontacts":"allcontacts_expand"}>
                    <IconContext.Provider value={{ color: 'navy' }}>

        <div className="contactdiv">
            <div className="prof">
            <img src={Image} className="cardimage"></img>
            <div className="about">
                <h3 className="contactname">Prof P.{' '}Krishna Reddy</h3>
                <div>
                
                </div>
                <div className="side">
                    <div className="boldtext">Research Areas</div>
                    <p className="paragraph">Data mining,{'  '}Data management,{'  '}Transaction models,{'  '}Distributed computing,{'  '}Performance evaluation,{'  '}and Information technology for agriculture.</p>
                </div>
                <div className="mail">
                    <div className="paragraph">
                    <IoIcons.IoIosMail/>
                    </div>
                    <p className="paragraph">{' '}pkreddy@iiit.ac.in </p>
                </div>
                <div className="side">
                    <div className="boldtext">Address:</div>
                    <p className="paragraph">International Institute of Information Technology,{' '}Gachibowli,{' '}Hyderabad{' '}-{' '}500 032</p>
                    {/*<p className="paragraph">Gachibowli</p>
                    <p className="paragraph">Hyderabad - 500 032</p>
    <p className="paragraph">India </p>*/}
                    <p></p>
                </div>
                <div className="side">
                    <div className="boldtext">Phone:</div>
                    <p className="paragraph">{' '}(91) (40) 6653 1000 Ext: 1132</p>
                    
                </div>

            </div>
            </div>
        </div>
        <div className="students">
            <h2>Students</h2>
        </div>
        <div className="contactdiv">
            <div className="allstudents" style={{marginTop:"0ch"}}>
                <div className="prof">
                    <div className="about">
                        <h4 className="contactname">
                            A.{' '}Srinivas Reddy
                        </h4>
                        <div className="side">
                            <div className="boldtext">Ph.D Student</div>
                                <div className="mail">
                                    <div className="paragraph">
                                    <IoIcons.IoIosMail/>
                                </div>
                            <p className="paragraph">{' '}srinivas.annappalli@iiit.ac.in </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="contactdiv">
            <div className="allstudents" style={{marginTop:"0ch"}}>
                <div className="prof">
                    <div className="about">
                        <h4 className="contactname">
                            Pullamma Mayakuntla
                        </h4>
                        <div className="side">
                            <div className="boldtext">BTech CSE ({' '}IIIT Hyderabad{' '})</div>
                            <div className="mail">
                            <div className="paragraph">
                                <IoIcons.IoIosMail/>
                            </div>
                            <p className="paragraph">{' '}pullamma.mayakuntla@students.iiit.ac.in</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div className="contactdiv">
            <div className="allstudents" style={{marginTop:"0ch"}} >
                <div className="prof">
                    <div className="about">
                        <h4 className="contactname">
                            Yaswanth Balivada
                        </h4>
                        <div className="side">
                            <div className="boldtext">BTech CSE ({' '}IIIT Hyderabad{' '})</div>
                            <div className="mail">
                                <div className="paragraph">
                                    <IoIcons.IoIosMail/>
                                </div>
                                <p className="paragraph">{' '}yaswanth.balivada@students.iiit.ac.in </p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
        </IconContext.Provider>

    </div>
    )
}
export default Contact;