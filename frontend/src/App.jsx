import UserList from './components/UserList';
import TeamList from './components/TeamList';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
         <Routes>
            <Route path='/' element={<UserList/>}/>
            <Route path='/team' element={<TeamList/>}/>
         </Routes>
    </BrowserRouter> 
  );
}

export default App;