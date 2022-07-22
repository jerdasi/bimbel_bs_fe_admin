import React from "react";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
    Navigate
} from "react-router-dom";
import KelolaSiswa from "./Pages/KelolaSiswa";
import KelolaPendaftaran from "./Pages/KelolaPendaftaran";
import KelolaTestimoni from "./Pages/KelolaTestimoni";
import KelolaPaket from "./Pages/KelolaPaket";
import KelolaGuru from "./Pages/KelolaGuru";
import KelolaAbsensi from "./Pages/KelolaAbsensi";
import Rekomendasi from "./Pages/Rekomendasi";
import ProtectedRoute from "./Context/ProtectedRoute";

const LoginRoute = ({children}) => {
    const token = localStorage.getItem("token")
    if(token === null){
        return <Navigate to="/" />
    } else {
        return children
    }
}

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginPage />} />
                    <Route exact path="/dashboard" element={<LoginRoute><Dashboard /></LoginRoute>} />
                    <Route
                        exact
                        path="/peserta-didik"
                        element={<KelolaSiswa />}
                    />
                    <Route exact path="/kelola-guru" element={<LoginRoute><KelolaGuru /></LoginRoute>} />
                    <Route
                        exact
                        path="/kelola-pendaftaran"
                        element={<LoginRoute><KelolaPendaftaran /></LoginRoute>}
                    />
                    <Route
                        exact
                        path="/kelola-testimoni"
                        element={<LoginRoute><KelolaTestimoni /></LoginRoute>}
                    />
                    <Route
                        exact
                        path="/kelola-paket"
                        element={<LoginRoute><KelolaPaket /></LoginRoute>}
                    />
                    <Route
                        exact
                        path="/kelola-absensi"
                        element={<LoginRoute><KelolaAbsensi /></LoginRoute>}
                    />
                    <Route
                        exact
                        path="/rekomendasi"
                        element={<LoginRoute><Rekomendasi /></LoginRoute>}
                    />
                </Routes>
            </Router>
        </>
    );
};

export default App;
