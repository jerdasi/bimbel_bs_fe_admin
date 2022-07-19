import React from "react";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
} from "react-router-dom";
import KelolaSiswa from "./Pages/KelolaSiswa";
import KelolaPendaftaran from "./Pages/KelolaPendaftaran";
import KelolaTestimoni from "./Pages/KelolaTestimoni";
import KelolaPaket from "./Pages/KelolaPaket";
import KelolaGuru from "./Pages/KelolaGuru";
import KelolaAbsensi from "./Pages/KelolaAbsensi";
import Rekomendasi from "./Pages/Rekomendasi";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginPage />} />
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route
                        exact
                        path="/peserta-didik"
                        element={<KelolaSiswa />}
                    />
                    <Route exact path="/kelola-guru" element={<KelolaGuru />} />
                    <Route
                        exact
                        path="/kelola-pendaftaran"
                        element={<KelolaPendaftaran />}
                    />
                    <Route
                        exact
                        path="/kelola-testimoni"
                        element={<KelolaTestimoni />}
                    />
                    <Route
                        exact
                        path="/kelola-paket"
                        element={<KelolaPaket />}
                    />
                    <Route
                        exact
                        path="/kelola-absensi"
                        element={<KelolaAbsensi />}
                    />
                    <Route
                        exact
                        path="/rekomendasi"
                        element={<Rekomendasi />}
                    />
                </Routes>
            </Router>
        </>
    );
};

export default App;
