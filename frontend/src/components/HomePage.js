import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";

export default function HomePage() {
  return (
    <Router>
      <Routes>
        <Route exact path="/">
          <Route index element={<h1>This is home page</h1>} />
          <Route path="join" element={<JoinRoomPage />} />
          <Route path="create" element={<CreateRoomPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
