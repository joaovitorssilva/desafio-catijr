import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Board } from "./components/Board";
import { ToastProvider } from "./contexts/ToastContext";

import { getLists } from "./api/endpoints/Lists";
import type { List } from "./types/api";

export function App() {
  const [lists, setLists] = useState<List[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

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
    fetchLists();
  }, []);

  if (initialLoading) {
    return <div className="p-4 text-white bg-bg min-h-screen pt-20 px-20 pb-12">Loading...</div>;
  }

  return (
    <ToastProvider>
      <Navbar />
      <Board lists={lists} refetchLists={fetchLists} />
    </ToastProvider>
  );
}