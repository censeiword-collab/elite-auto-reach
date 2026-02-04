import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface QAFormSubmission {
  id: string;
  timestamp: Date;
  formType: string;
  sourcePage: string;
  payload: Record<string, unknown>;
}

interface QAContextType {
  isQAMode: boolean;
  enableQAMode: () => void;
  disableQAMode: () => void;
  toggleQAMode: () => void;
  submissions: QAFormSubmission[];
  addSubmission: (submission: Omit<QAFormSubmission, "id" | "timestamp">) => void;
  clearSubmissions: () => void;
}

const QAContext = createContext<QAContextType | undefined>(undefined);

export const QAProvider = ({ children }: { children: ReactNode }) => {
  const [isQAMode, setIsQAMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        window.location.search.includes("qa=1") ||
        localStorage.getItem("qa_mode") === "true"
      );
    }
    return false;
  });

  const [submissions, setSubmissions] = useState<QAFormSubmission[]>([]);

  const enableQAMode = useCallback(() => {
    setIsQAMode(true);
    localStorage.setItem("qa_mode", "true");
  }, []);

  const disableQAMode = useCallback(() => {
    setIsQAMode(false);
    localStorage.removeItem("qa_mode");
  }, []);

  const toggleQAMode = useCallback(() => {
    setIsQAMode((prev) => {
      const newValue = !prev;
      if (newValue) {
        localStorage.setItem("qa_mode", "true");
      } else {
        localStorage.removeItem("qa_mode");
      }
      return newValue;
    });
  }, []);

  const addSubmission = useCallback(
    (submission: Omit<QAFormSubmission, "id" | "timestamp">) => {
      const newSubmission: QAFormSubmission = {
        ...submission,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      };
      setSubmissions((prev) => [newSubmission, ...prev]);
    },
    []
  );

  const clearSubmissions = useCallback(() => {
    setSubmissions([]);
  }, []);

  return (
    <QAContext.Provider
      value={{
        isQAMode,
        enableQAMode,
        disableQAMode,
        toggleQAMode,
        submissions,
        addSubmission,
        clearSubmissions,
      }}
    >
      {children}
      {isQAMode && (
        <div className="fixed bottom-4 left-4 z-[100] bg-yellow-500 text-black px-3 py-1.5 rounded-lg font-mono text-xs font-bold shadow-lg">
          🧪 QA MODE
        </div>
      )}
    </QAContext.Provider>
  );
};

export const useQA = () => {
  const context = useContext(QAContext);
  if (!context) {
    throw new Error("useQA must be used within QAProvider");
  }
  return context;
};

export const useQAOptional = () => {
  return useContext(QAContext);
};
