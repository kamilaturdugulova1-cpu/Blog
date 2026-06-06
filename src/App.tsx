import { Route, Routes, Link, NavLink } from 'react-router-dom';
import Home from './containers/Home';
import PostForm from './containers/PostForm';
import FullPost from './containers/FullPost';
import About from './components/About';
import Contacts from './components/Contacts';

function App() {
    return (
        <>
            <nav className="navbar navbar-expand navbar-light border-bottom bg-white py-2">
                <div className="container">
                    <Link className="navbar-brand fw-normal fs-5" to="/">My Blog</Link>
                    <div className="navbar-nav ms-auto gap-3">
                        <NavLink className="nav-link small" to="/">Home</NavLink>
                        <NavLink className="nav-link small" to="/new-post">Add</NavLink>
                        <NavLink className="nav-link small" to="/about">About</NavLink>
                        <NavLink className="nav-link small" to="/contacts">Contacts</NavLink>
                    </div>
                </div>
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/new-post" element={<PostForm />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/posts/:id/edit" element={<PostForm />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="*" element={<h5 className="fw-normal text-secondary">Not found</h5>} />
                </Routes>
            </div>
        </>
    );
}

export default App;
