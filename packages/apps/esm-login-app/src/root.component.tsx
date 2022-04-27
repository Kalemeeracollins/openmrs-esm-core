import React from "react";
import Login from "./login/login.component";
import ChooseLocation from "./choose-location/choose-location.component";
import RedirectLogout from "./redirect-logout/redirect-logout.component";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

export interface RootProps {
  isLoginEnabled: boolean;
}

const Root: React.FC<RootProps> = ({ isLoginEnabled }) => {
  const element = useRoutes([
    {
      path: "/login",
      element: <Login isLoginEnabled={isLoginEnabled} />,
      children: [
        {
          path: "/confirm",
          element: <Login isLoginEnabled={isLoginEnabled} />,
        },
        {
          path: "/location",
          element: <ChooseLocation isLoginEnabled={isLoginEnabled} />,
        },
      ],
    },
    {
      path: "logout",
      element: <RedirectLogout isLoginEnabled={isLoginEnabled} />,
    },
  ]);
  return (
    <CurrentUserContext>
      <BrowserRouter basename={window.spaBase}>{element}</BrowserRouter>
    </CurrentUserContext>
  );
};

export default Root;
