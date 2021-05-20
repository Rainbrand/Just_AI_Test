import React from 'react';
import './App.css';
import Favorites from './components/Favorites';
import Search from "./components/Search";
import {UserDataProvider} from "./components/UserDataProvider";
import {DragContextPovider} from './DragContext';

function App() {
  return (
    <div className="App">
        <div className="app__container">
            <UserDataProvider>
                <DragContextPovider>
                    <Search/>
                    <Favorites/>
                </DragContextPovider>
            </UserDataProvider>
        </div>
    </div>
  );
}

export default App;
