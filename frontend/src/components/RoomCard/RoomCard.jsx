import React from "react";
import styles from "./RoomCard.module.css";
import { useNavigate } from "react-router-dom";
import { createRec } from "../../http";
const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={async () => {
        await createRec(room.topic);
        navigate(`/room/${room.id}`);
      }}
      className={styles.card}
    >
      <h3 className={styles.topic}>{room.topic}</h3>

      <div
        className={`${styles.speakers} ${
          room.speakers.length === 1 ? styles.singleSpeaker : ""
        }`}
      >
        <div className={styles.avatars}>
          {room.speakers.map((speaker,index) => (
            <img
              key={index}
              src={`http://localhost:5500${speaker.avatar}`}
              alt="speaker-avatar"
            />
          ))}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker,index) => (
            <div key={index} className={styles.nameWrapper}>
              <span>{speaker.name}</span>
              <img src="/images/chat-emoji.png" alt="chat-emoji" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.peopleCount}>
        <span>{room.totalPeople}</span>
        <img src="/images/user-icon.png" alt="user-icon" />
      </div>
    </div> 
  );
};

export default RoomCard;
