import React from "react";
import Index from "./components/index/Index";
import "./App.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Container>
        <Index/>
      </Container>
    </div>
  );
}

export default App;
