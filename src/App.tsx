import type { Component } from 'solid-js';
import Sheet from 'views/sheet/Sheet'
import styles from './App.module.css'

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Sheet />
    </div>
  );
};

export default App;
