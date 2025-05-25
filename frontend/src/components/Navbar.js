import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from "../firebase";
import { signOut, deleteUser } from "firebase/auth";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      window.location.href = "/login";
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      const user = auth.currentUser;
      deleteUser(user).then(() => {
        alert("Account deleted.");
        window.location.href = "/login";
      }).catch((error) => {
        console.error("Delete error:", error);
      });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">DeRiskAI</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/analyze">Analyze</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/telegram">Telegram</Link></li>

          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link">👤 {user.email}</span>
              </li>
            </>
          ) : (
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          )}
        </ul>

        {user && (
          <>
            <button className="btn btn-outline-light me-2" onClick={handleLogout}>Logout</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete Account</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
