import React, { useEffect } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { loadPersistedPatientDataSyncState } from "@openmrs/esm-framework";
import Home from "./home/home.component";
import DesktopSideNav from "./nav/desktop-side-nav.component";
import styles from "./root.styles.scss";
import OfflineToolsPage from "./offline-tools-page/offline-tools-page.component";

const Root: React.FC = () => {
  const element = useRoutes([
    {
      path: "/offline-tools",
      element: <Home />,
      children: [{ path: ":page", element: <OfflineToolsPage /> }],
    },
  ]);
  useEffect(() => {
    loadPersistedPatientDataSyncState();
  }, []);

  return (
    <BrowserRouter basename={window.spaBase}>
      <DesktopSideNav />
      <div className={`omrs-main-content ${styles.mainContentContainer}`}>
        {element}
      </div>
    </BrowserRouter>
  );
};

export default Root;
