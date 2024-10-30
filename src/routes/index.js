import About from "../view/About";
import AllPatients from "../view/AllPatients";
import Home from "../view/Home";
import NewPatient from "../view/NewPatient";
import Settings from "../view/Settings";
import Tests from "../view/Tests";
import Login from "../view/auth/Login";
import Register from "../view/auth/Register";
let routes = [
    {
        path: "/index",
        name: "Dashboard",
        icon: "fas fa-home text-danger",
        component: Home,
        layout: "/admin",
    },
    {
        path: "/tests",
        name: "Tests",
        icon: "fas fa-flask text-success",
        component: Tests,
        layout: "/admin",
    },
    {
        path: "/new-patient",
        name: "New Patient",
        icon: "fas fa-user-plus text-warning",
        component: NewPatient,
        layout: "/admin",
    },
    {
        path: "/all-patients",
        name: "All Patients",
        icon: "fas fa-list text-info",
        component: AllPatients,
        layout: "/admin",
    },

    {
        path: "/settings",
        name: "Settings",
        icon: "fas fa-cog text-secondary",
        component: Settings,
        layout: "/admin",
    },
    {
        path: "/about",
        name: "About",
        icon: "fas fa-info-circle text-primary",
        component: About,
        layout: "/admin",
    },

    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth",
        isMenu: false,
    },
    {
        path: "/registration",
        name: "registration",
        icon: "ni ni-key-25 text-info",
        component: Register,
        layout: "/auth",
        isMenu: false,
    },
];
export default routes;
