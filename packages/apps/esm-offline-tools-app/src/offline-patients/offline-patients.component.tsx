import React from "react";
import { useTranslation } from "react-i18next";
import { ExtensionSlot } from "@openmrs/esm-framework";
import SharedPageLayout from "../components/shared-page-layout.component";
import styles from "./offline-patients.styles.scss";
import { BrowserRouter, useRoutes } from "react-router-dom";
import OfflinePatientSyncDetails from "./offline-patient-sync-details.component";

export interface OfflinePatientsProps {
  basePath: string;
}

const OfflinePatients: React.FC<OfflinePatientsProps> = ({ basePath }) => {
  const { t } = useTranslation();
  const element = useRoutes([
    {
      index: true,
      path: "/:patientUuid/offline-data",
      element: <OfflinePatientSyncDetails />,
      children: [
        {
          path: "",
          element: (
            <SharedPageLayout
              header={t("offlinePatientsHeader", "Offline patients")}
            >
              <div className={styles.contentContainer}>
                <ExtensionSlot extensionSlotName="offline-tools-offline-patients-slot" />
              </div>
            </SharedPageLayout>
          ),
        },
      ],
    },
  ]);

  return <BrowserRouter basename={basePath}>{element}</BrowserRouter>;
};

export default OfflinePatients;
