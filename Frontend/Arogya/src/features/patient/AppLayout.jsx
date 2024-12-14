import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  console.log("layout is loaded");

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[23rem_1fr] grid-rows-[auto_1fr] bg-blue-50">
      <Header />
      <Sidebar />
      <main className="bg-white overflow-auto">
        <div className="max-w-[120rem] mx-auto p-4 flex flex-col gap-8">
          {/* This is the outlet */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;

