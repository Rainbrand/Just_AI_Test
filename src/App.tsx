import React from 'react';
import './App.css';
import Favorites from './components/Favorites';
import DataContainer from "./components/DataContainer";
import Search from "./components/Search";
import {UserDataProvider} from "./components/UserDataProvider";

function App() {
  return (
    <div className="App">
        <UserDataProvider>
            <DataContainer>
                <Search/>
                <Favorites/>
            </DataContainer>
        </UserDataProvider>
    </div>
  );
}

export default App;
