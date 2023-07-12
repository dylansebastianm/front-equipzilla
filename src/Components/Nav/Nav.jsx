import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, message  } from 'antd';
import "./Nav.css"


export default function Nav () {
    const info = () => {
        message.info('The login is under maintenance');
      };
    
    
        return (
            <div className="nav-component">
                <div className="links-container">
                     <div className="rutas">
                        <div>
                        <p  className="links"> 
                        Home
                        </p>
                        </div>

                        <div>
                        < p className="links"> 
                        Metrics
                        </p>
                        </div>

                        <div>
                        < p className="links"> 
                        Example ruta
                        </p>
                        </div>  
                     </div> 
                 <div className="barrita">|</div>
                </div>
                
                <Avatar 
                 className="avatar"
                 size={30} icon={<UserOutlined onClick={info} />} />
                         
           </div>
            
        )
    }
    