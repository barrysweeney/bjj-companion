import React from "react";
import "./App.css";
import { Progress } from "./Progress";
import { Notes } from "./Notes";
import { Gameplan } from "./Gameplan";
import Layout from "./components/layout";

function App() {
  return (
    <Layout>
      <div>
        <Progress />
        <Notes />
        <Gameplan />
      </div>
    </Layout>
  );
}

export default App;
