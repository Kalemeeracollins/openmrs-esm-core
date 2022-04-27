import { ExtensionSlot, useExtensionSlotMeta } from "@openmrs/esm-framework";
import React from "react";
import { OfflineToolsPageConfig } from "../types";
import trimEnd from "lodash-es/trimEnd";
import { useLocation, useParams } from "react-router-dom";

export interface OfflineToolsPageParams {
  page: string;
}

const OfflineToolsPage: React.FC = () => {
  const location = useLocation();
  const { page } = useParams<{ page: string }>();
  const basePath = trimEnd(window.getOpenmrsSpaBase(), "/") + location.pathname;
  const meta = useExtensionSlotMeta<OfflineToolsPageConfig>(
    "offline-tools-page-slot"
  );
  const pageConfig = Object.values(meta).find(
    (pageConfig) => pageConfig.name === page
  );

  if (!pageConfig) {
    return null;
  }

  return (
    <>
      <ExtensionSlot extensionSlotName="breadcrumbs-slot" />
      <ExtensionSlot
        key={pageConfig.slot}
        extensionSlotName={pageConfig.slot}
        state={{ basePath }}
      />
    </>
  );
};

export default OfflineToolsPage;
