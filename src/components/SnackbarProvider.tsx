// components/Snackbar/SnackbarProvider.tsx

import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, SnackbarVariant, SnackbarPosition } from "./Snackbar";

interface SnackbarConfig {
  message: string;
  variant?: SnackbarVariant;
  position?: SnackbarPosition;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface SnackbarContextType {
  showSnackbar: (config: SnackbarConfig) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<
    (SnackbarConfig & { visible: boolean }) | null
  >(null);

  const showSnackbar = useCallback((config: SnackbarConfig) => {
    setSnackbar({ ...config, visible: true });
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => (prev ? { ...prev, visible: false } : null));
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      {snackbar && (
        <Snackbar
          visible={snackbar.visible}
          message={snackbar.message}
          variant={snackbar.variant}
          position={snackbar.position}
          duration={snackbar.duration}
          action={snackbar.action}
          onDismiss={hideSnackbar}
        />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }
  return context;
};
