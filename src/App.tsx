import type { Component } from 'solid-js';
import { Routes, Route } from "@solidjs/router"

import List from '@/views/demand-sheet/List'
import Detail from '@/views/demand-sheet/Detail'

const App: Component = () => {
  return (
    <div>
      <Routes>
        <Route path="/demand-list" component={List} />
        <Route path="/demand-detail" component={Detail} />
      </Routes>
    </div>
  );
};

export default App;
