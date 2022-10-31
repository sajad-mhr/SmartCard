import React from "react";
import "./styles/App.css";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import { MyState } from "./components/MyProvider";

const App = () => {
  const { activeAnime } = MyState();
  const handlepos = useSpring({ y: 0 });

  const bindHandlePos = useDrag((params) => {
    handlepos.y.set(params.offset[1]);
  });
  return (
    <div className="App ">
      <div className="blackBg">
        {/* 
      <BrowserRouter>
      <Route path="/" exact component={HomePage}/>
      <Route path="/projects" component={ProjectPage}/>
    </BrowserRouter> */}
        {activeAnime ? <ProjectPage /> :  <HomePage />}
      </div>
    </div>
  );
};

export default App;
