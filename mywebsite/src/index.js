import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Home from './app/HomeSite/home';
import User from './app/UserSite/user';
import Contact from './app/ContactSite/contact_us';
import Contest from './app/ContestSite/contest';
import ErrorPage from './app/ErrorSite/errorPage';
import ContestHome from './app/ContestSite/contestHome';
import Tictactoe from './app/ContestSite/theContests/tic-tac-toe'
import Tictactoeplus from './app/ContestSite/theContests/tic-tac-toe-plus';
import G2048 from './app/ContestSite/theContests/2048'
import GoBang from './app/ContestSite/theContests/goBang'
import Chess from './app/ContestSite/theContests/chess'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"contest",
        element:<Contest/>,
        children:[
          {
            path:"contestHome",
            element:<ContestHome/>,
          },
          {
            path:"tictactoe",
            element:<Tictactoe/>,
          },
          {
            path:"tictactoeplus",
            element:<Tictactoeplus/>,
          },
          {
            path:"2048",
            element:<G2048/>,
          },
          {
            path:"gobang",
            element:<GoBang/>,
          },
          {
            path:"chess",
            element:<Chess/>,
          }
        ]
      },
      {
        path:"user",
        element:<User/>,
      },
      {
        path:"contact",
        element:<Contact/>,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
