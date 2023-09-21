import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

const MainContent = () => {
  return (
    <Grid container spacing={2}>
      <Typography variant="h3" component="h3">
        This is home page
      </Typography>
      <Grid item xs={8} align="center">
        <Button
          variant="contained"
          color="primary"
          to="/create"
          component={Link}
        >
          Create Room
        </Button>
      </Grid>
      <Grid item xs={8} align="center">
        <Button
          variant="contained"
          color="secondary"
          to="/join"
          component={Link}
        >
          Join Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default function HomePage() {
  return (
    <Router>
      <Routes>
        <Route exact path="/">
          <Route index element={<MainContent />} />
          <Route path="join" element={<JoinRoomPage />} />
          <Route path="create" element={<CreateRoomPage />} />
          <Route path="room/:roomCode" element={<Room />} />
        </Route>
      </Routes>
    </Router>
  );
}
