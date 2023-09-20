import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function Room() {
  const [invalidCode, setInvalidCode] = useState(false);
  const [currentRoom, setCurrentRoom] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });
  const { roomCode } = useParams();

  const fetchRoomDetails = async () => {
    const response = await fetch(`/api/get-room?code=${roomCode}`);
    const data = await response.json();
    console.log(data);
    if (data.votes_to_skip) {
      setCurrentRoom({
        votesToSkip: data.votes_to_skip,
        guestCanPause: data.guest_can_pause,
        isHost: data.is_host,
      });
    } else {
      setInvalidCode(true);
      toast.remove();
      toast("No Room Found");
    }
  };

  useEffect(async () => {
    toast.promise(fetchRoomDetails(), {
      loading: "Loading...",
      success: "Got the data",
      error: "Error when fetching",
    });
  }, []);

  if (invalidCode) {
    return (
      <div>
        <Toaster />
        No Room Found
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      <h2>{roomCode}</h2>
      <p>Votes: {currentRoom.votesToSkip}</p>
      <p>
        Guest Can Pause:{" "}
        {currentRoom.guestCanPause ? "Play/Pause" : "No Control"}
      </p>
      <p>Host: {currentRoom.isHost ? "Yes" : "No"}</p>
    </div>
  );
}
