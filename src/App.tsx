import React from 'react';
import './App.css';
import Favorites from './components/Favorites';
import DataContainer from "./components/DataContainer";
import Search from "./components/Search";
import {UserDataProvider} from "./components/UserDataProvider";
import {DragContextPovider} from './DragContext';

function App() {
  return (
    <div className="App">
        <UserDataProvider>
            <DataContainer>
                <DragContextPovider>
                    <Search/>
                    <Favorites/>
                </DragContextPovider>
            </DataContainer>
        </UserDataProvider>
    </div>
  );
}

export default App;
