import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Start from './components/start';
import Game from './components/game';
import Result from './components/result';

function AppRouter() {
  return (
    <div id="app" className="container">
      <Router>
        <Route path="/" exact component={Start} />
        <Route path="/game/" component={Game} />
        <Route path="/result/" component={Result} />
      </Router>
    </div>
  );
}

export default AppRouter;
