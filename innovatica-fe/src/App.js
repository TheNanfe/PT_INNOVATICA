import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "./component/login";
//import { Home } from "./component/Home";
import { Navigation } from './component/navigation';
import { Logout } from './component/logout';
import { ListProducts } from './productos/ListProducts';
import { ListProductsSignedIn } from './productos/ListProductsSignedIn';

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/all" element={<ListProductsSignedIn />} />
                <Route path="/" element={<ListProducts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;