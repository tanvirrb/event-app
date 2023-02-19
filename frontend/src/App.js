import {Route, Routes} from "react-router-dom";
import "./App.css";
import CreateEvent from "./pages/create-event";
import EditEvent from "./pages/edit-event";
import Event from './pages/events'

function App() {

    return (
        <Routes>
            <Route path="/" element={<Event/>}/>
            <Route path="/create-event" element={<CreateEvent/>}/>
            <Route path="/edit-event/:id" element={<EditEvent/>}/>
        </Routes>
    );
}

export default App;
