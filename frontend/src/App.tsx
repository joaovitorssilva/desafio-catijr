import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Board } from "./components/Board";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

import { getLists } from "./api/endpoints/Lists";
import type { List } from "./types/api";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function BoardPage({ lists, refetchLists }: { lists: List[], refetchLists: () => Promise<void> }) {
  return (
    <ToastProvider>
      <Navbar />
      <Board lists={lists} refetchLists={refetchLists} />
    </ToastProvider>
  );
}

function AppContent() {
  const [lists, setLists] = useState<List[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();

  const fetchLists = async () => {
    try {
      const listsTemp = await getLists();
      setLists(listsTemp);
    } catch (err) {
      console.error(err);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLists();
    } else {
      setInitialLoading(false);
    }
  }, [isAuthenticated]);

  if (initialLoading) {
    return <div className="p-4 text-white bg-bg min-h-screen pt-20 px-20 pb-12">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/board"
        element={
          <ProtectedRoute>
            <BoardPage lists={lists} refetchLists={fetchLists} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
