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
            {/*<img src={Image} className="cardimage"></img>*/}
            <div className="about">
                <h3 className="contactname">P.{' '}Krishna Reddy</h3>
                <div>
                <div className="boldtext">Professor</div>
                <div className="boldtext">Ph.D ({' '}JNU{' '},{' '}New Delhi)</div>
                </div>
                <div className="side">
                    <div className="boldtext">Research Areas</div>
                    <p className="paragraph">Data mining,{' '}data management,{' '}transaction models,{' '}distributed computing,{' '}performance evaluation,{' '}and information technology for agriculture</p>
                </div>
                <div className="mail">

                    <IoIcons.IoIosMail/>
                    <div className="boldtext">Email:</div>
                    <p className="paragraph">{' '}pkreddy@iiit.ac.in </p>
                </div>
                <div className="side">
                    <div className="boldtext">Address:</div>
                    <p className="paragraph">International Institute of Information Technology</p>
                    <p className="paragraph">Gachibowli</p>
                    <p className="paragraph">Hyderabad - 500 032</p>
                    <p className="paragraph">India </p>
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
                    <div>
                        <div className="boldtext">Ph.D Student</div>
                        <div className="mail">
                            <IoIcons.IoIosMail/>
                            <div className="boldtext">Email:</div>
                            <p className="paragraph">{' '}srinivas.annappalli@research.iiit.ac.in </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="allstudents" >
            <div className="prof">
                <div className="about">
                    <h4 className="contactname">
                        Yashwanth Balivada
                    </h4>
                    <div>
                        <div className="boldtext">B-tech CSE (IIIT Hyderabad)</div>
                        <div className="mail">
                            <IoIcons.IoIosMail/>
                            <div className="boldtext">Email:</div>
                            <p className="paragraph">{' '}yashwanth.balivada@students.iiit.ac.in </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="allstudents" >
            <div className="prof">
                <div className="about">
                    <h4 className="contactname">
                        Pullamma Mayakuntla
                    </h4>
                    <div>
                        <div className="boldtext">B-tech CSE (IIIT Hyderabad)</div>
                        <div className="mail">
                            <IoIcons.IoIosMail/>
                            <div className="boldtext">Email:</div>
                            <p className="paragraph">{' '}pullamma.mayakuntla@students.iiit.ac.in</p>
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