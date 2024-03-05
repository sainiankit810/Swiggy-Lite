import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import About from "./components/About";
import Body from "./components/Body";
import Error from "./components/Error";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Login from "./components/Login";
import VerifyOTPPage from "./components/verifyOtp";
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    );
}

const appRouter = createBrowserRouter([
{
    path: "/",
    element: <AppLayout />,
    children: [
        {
            path: "/",
            element: <Body />,
        },

        {
            path: "/about",
            element: <About />,
        },

        {
            path: "/contact",
            element: <Contact />,
        },

        {
            path: "/cart",
            element: <Cart />,
        },

        {
            path: "/login",
            element: <Login />,
        },

        {
            path: "/verifyOtp",
            element: <VerifyOTPPage />,
        }
    ],

    errorElement: <Error />
}]
)

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);