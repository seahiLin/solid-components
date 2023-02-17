/* @refresh reload */
import { render } from 'solid-js/web';
import type { Component } from "solid-js";
import { Routes, Route, Router } from "@solidjs/router";

import Dialog from "@/components/dialog";

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/dialog"
          element={<Dialog props={{
            title: '标题',
            desc: "description"
          }} />}
        />
      </Routes>
    </Router>
  );
};

render(() => <App />, document.getElementById("root") as HTMLElement)
