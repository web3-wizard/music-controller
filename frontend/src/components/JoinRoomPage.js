import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function JoinRoomPage() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: roomCode,
        }),
      };

      const response = await fetch("/api/join-room", requestOptions);
      if (response.ok) {
        toast.success("Joined Room.");
        setRoomCode("");
        return navigate(`/room/${roomCode}`);
      } else {
        toast.error("Room Not Found");
        setError("Room not found");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />

      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={error}
            label="Code"
            placeholder="Enter a Room Code"
            value={roomCode}
            helperText={error}
            variant="outlined"
            onChange={(e) => setRoomCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 10 }}
            onClick={handleSubmit}
          >
            Enter Room
          </Button>
          <Button
            variant="contained"
            color="secondary"
            to="/"
            component={Link}
            style={{ marginLeft: 10 }}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
