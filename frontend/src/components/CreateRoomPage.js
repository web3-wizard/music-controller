import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function CreateRoomPage() {
  const navigate = useNavigate();
  const defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestChange = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };
  const handleCreateRoom = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    const fetchData = async () => {
      const response = await fetch("/api/create-room", requestOptions);
      const data = await response.json();
      navigate(`/room/${data.code}`);
      return data;
    };

    toast.promise(
      fetchData(),
      {
        loading: "Saving...",
        success: (data) => ` Room ${data.code} Saved Successfully `,
        error: (err) => ` Something happens wrong - ${err.message}`,
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 5000,
          icon: "🔥",
        },
      }
    );
  };

  return (
    <>
      <Toaster />

      <Grid container spacing={1} style={{ marginTop: 10 }}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create A Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup row defaultValue="true" onChange={handleGuestChange}>
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Paly/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              defaultValue={defaultVotes}
              inputProps={{ min: 1, style: { textAlign: "center" } }}
              onChange={handleVotesChange}
            />
            <FormHelperText>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateRoom}
            style={{ marginRight: 5 }}
          >
            Create A Room
          </Button>
          <Button
            color="secondary"
            variant="contained"
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
