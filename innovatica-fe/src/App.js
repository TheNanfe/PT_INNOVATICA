import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "./component/login";
import { Navigation } from './component/navigation';
import { Logout } from './component/logout';
import { ListProducts } from './productos/ListProducts';
import { ListProductsSignedIn } from './productos/ListProductsSignedIn';
import { ListUsers } from './usuarios/ListUsers';

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/all" element={<ListProductsSignedIn />} />
                <Route path="/users" element={<ListUsers />} />
                <Route path="/" element={<ListProducts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;