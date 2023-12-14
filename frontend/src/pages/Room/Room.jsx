import React, { useEffect, useState } from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useSelector} from 'react-redux';
import { useParams,  useNavigate } from 'react-router-dom';
import styles from './Room.module.css';
import { getRoom } from '../../http';



const Room = () => {
  const user = useSelector((state) => state.auth.user);
  const {id: roomId} = useParams();
  const [room, setRoom] = useState(null);
  const [isMute, setMute] = useState(true);

  const {clients, provideRef, handleMute} = useWebRTC(roomId, user);
  const uniqueClients = [...new Map(clients.map(item =>
    [item["id"], item])).values()];
 

  const navigate = useNavigate();
  const handManualLeave = () => {
    navigate('/rooms');
  };

  useEffect(() => {
    handleMute(isMute, user.id);
  }, [isMute]);

 
  useEffect(() => {
    const fetchRoom = async () => {
        
        const { data } = await getRoom(roomId);
        console.log(data)
        setRoom((prev) => data);
    };
    fetchRoom();
 }, [roomId]);


 const handleMuteClick = (clientId) => {
  if (clientId !== user.id) {
      return;
  } 
  setMute((prev) => !prev);
};


  return (
    
    <div>
      <div className="container">
        <button onClick={handManualLeave} className={styles.goBack}>
              <img src="/images/arrow-left.png" alt="arrow-left" />
              <span>All voice rooms</span>
        </button>
      </div>

        {room && 
         <div  className={styles.clientsWrap}>
         <div className={styles.header}>
            <h2 className={styles.topic} >{room?.topic}</h2>
               <div className={styles.actionBtn}>
                   <button className={styles.actionBtn}>
                           <img src="/images/palm.png" alt="palm-icon" />
                   </button>
                   <button
                     onClick={handManualLeave}
                     className={styles.actionBtn}
                   >                            
                     <span >Leave quietly</span>
                   </button>
               </div>
         </div>

         <div className={styles.clientsList}>
           {uniqueClients.map((client) => {
             return(
               <div className={styles.client} 
                    key={client.id} >
               <div 
                     className={styles.userHead}>
                     
                 <audio 
                   ref={(instance) => provideRef(instance, client.id)}
                     
                   autoPlay
                 ></audio>
                   <img 
                     className={styles.userAvatar} 
                     src={client.avatar} 
                     alt="avatar" />


                 <button onClick={()=>handleMuteClick(client.id)} className={styles.micBtn}>
                  {
                    client.muted?(
                        <img 
                         src="/images/mic-mute.png" 
                         alt="mic-mute-icon" />
                    ):(
                      <img 
                      src="/images/mic.png" 
                      alt="mic-icon"/>
                    )}
                       
                 </button>
                     
               </div>
               <h4>{client.name}</h4>
               </div>
           )
           })}
       </div>
     </div>
        }
     

    </div>
  );
};

export default Room;
