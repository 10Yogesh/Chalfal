import React, { useEffect, useState } from "react";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Room.module.css";
import { getRoom } from "../../http";

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);

  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
  const uniqueClients = [
    ...new Map(clients.map((item) => [item["id"], item])).values(),
  ];
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [isMute, setMute] = useState(true);

  useEffect(() => {
    handleMute(isMute, user.id);
  }, [isMute, handleMute, user.id]);

  const handManualLeave = () => {
    navigate("/rooms");
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      setRoom((prev) => data);
    };

    fetchRoom();
  }, [roomId]);

  const handleMuteClick = (clientId) => {
    if (clientId !== user.id) {
      return;
    }
    console.log("clientId", clientId);
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
      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          {room && <h2 className={styles.topic}>{room.topic}</h2>}
          <div className={styles.actions}>
            <button onClick={handManualLeave} className={styles.actionBtn}>
              <span>Leave quietly</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {uniqueClients.map((client) => (
            <div className={styles.client} key={client.id}>
              <div className={styles.userHead}>
                <img className={styles.userAvatar} src={client.avatar} alt="" />
                <audio
                  autoPlay
                  ref={(instance) => {
                    provideRef(instance, client.id);
                  }}
                />
                <button
                  onClick={() => handleMuteClick(client.id)} // Pass clientId here
                  className={styles.micBtn}
                  disabled={client.id !== user.id}
                >
                  {isMute ? (
                    <img
                      className={styles.mic}
                      src="/images/mic-mute.png"
                      alt="mic"
                    />
                  ) : (
                    <img
                      className={styles.micImg}
                      src="/images/mic.png"
                      alt="mic"
                    />
                  )}
                </button>
              </div>
              <h4>{client.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
