import React, { useEffect } from "react";
import { navigate, useConfig } from "@openmrs/esm-framework";
import { performLogout } from "./logout.resource";
import { useCurrentUser } from "../CurrentUserContext";

export interface RedirectLogoutProps {
  isLoginEnabled: boolean;
}

const RedirectLogout: React.FC<RedirectLogoutProps> = ({ isLoginEnabled }) => {
  const config = useConfig();
  const user = useCurrentUser();

  useEffect(() => {
    if (!user || !isLoginEnabled) {
      navigate({ to: "${openmrsSpaBase}/login" });
    } else {
      performLogout().then(() => {
        if (config.provider.type === "oauth2") {
          location.href = config.provider.logoutUrl;
        } else {
          location.href = window.spaBase;
        }
      });
    }
  }, [isLoginEnabled, user, config]);

  return null;
};

export default RedirectLogout;
