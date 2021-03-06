import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./views/NotFound";
import Unauthorized from "./views/Unauthorized";
import Reviewer from "./views/Reviewer";
import Guest from "./views/Guest";
import PublicRoutes from "./components/PublicRoutes";
import ListTable from "./views/ListTable";
import Description from "./views/Description";
import AddScans from "./views/AddScans";
import RiskForm from "./views/RiskForm/index";
import AddGroup from "./views/AddGroup/index";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          {/* public routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/desc" element={<Description />} />
            <Route path="/addScan" element={<AddScans />} />
            <Route path="/riskAssesment" element={<RiskForm />} />
            <Route path="/addGroup" element={<AddGroup />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["admin", "reviewer"]} />}>
            <Route path="reviewer" element={<Reviewer />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["guest"]} />}>
            <Route path="guest" element={<Guest />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
