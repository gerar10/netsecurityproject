import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/SideBar";
import Reports from "./components/Reports/Reports";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Map from "./geolocalizacion/Map";

import { Navigate, Route, Routes } from "react-router-dom";

import { Axios } from "./utils/AxiosWithCredentials";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/slices/index.js";
import Guards from "./components/Guards/Guards";
import Branchs from "./components/Branchs/Branchs";
import ClientOrSu from "./components/ClientOrSu/ClientOrSu";
import ChangePassword from "./screens/ChangePassword";
import HomeCalendar from "./commons/Calendar/HomeCalendar.jsx";

function App() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const userAuth = async () => {
    try {
      const { data } = await Axios.get("/clients/validate");
      dispatch(setUser(data));
    } catch (err) {
      console.log(err, "cookie no encontrada");
    }
  };

  useEffect(() => {
    userAuth();
  }, []);

  return (
    <div className="App">
      <Navbar />
      {!user ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <>
          {user.first_access ? (
            <Routes>
              <Route
                path="/change-password"
                element={<ChangePassword user={user} />}
              />
            </Routes>
          ) : (
            <>
              <Sidebar />
              <Routes>
                {user["super_admin"] ? (
                  <>
                    <Route path="/superadmin" element={<ClientOrSu />} />
                    <Route path="/home" element={<Home />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Navigate to={"/home"} />} />
                    <Route path="/calendar" element={<HomeCalendar />} />
                    <Route
                      path={`/calendar/guardCalendar`}
                      element={<Guards />}
                    />
                    <Route
                      path={`/calendar/branchCalendar`}
                      element={<Branchs />}
                    />
                    <Route path={`/branch/${user.id}`} element={<Branchs />} />

                    <Route path={`/guards/${user.id}`} element={<Guards />} />

                    <Route path="/map" element={<Map user={user} />} />

                    <Route path="/home" element={<Home />} />
                    <Route path="/reports/:type" element={<Reports />} />
                  </>
                )}
              </Routes>
            </>
          )}
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
