import React, { createContext, useContext, useState, ReactNode } from "react";

export type AppMode = "Student" | "DartaSathi";

export interface DSTask {
  id: string;
  service: string;
  university: string;
  location: string;
  type: string;
  status: string;
  userName: string;
  userPhone: string;
}

interface ModeContextProps {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  acceptedTasks: DSTask[];
  addAcceptedTask: (task: DSTask) => void;
  updateTaskStatus: (id: string, newStatus: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

const ModeContext = createContext<ModeContextProps | undefined>(undefined);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [appMode, setAppMode] = useState<AppMode>("Student");
  const [isOnline, setIsOnline] = useState(true);
  const [acceptedTasks, setAcceptedTasks] = useState<DSTask[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addAcceptedTask = (task: DSTask) => {
    setAcceptedTasks((prev) => {
      if (prev.find((t) => t.id === task.id)) return prev;
      return [task, ...prev];
    });
  };

  const updateTaskStatus = (id: string, newStatus: string) => {
    setAcceptedTasks((prev) => 
      prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    );
  };

  return (
    <ModeContext.Provider 
      value={{ 
        appMode, 
        setAppMode, 
        isOnline, 
        setIsOnline, 
        acceptedTasks, 
        addAcceptedTask,
        updateTaskStatus,
        isDarkMode,
        setIsDarkMode
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};
