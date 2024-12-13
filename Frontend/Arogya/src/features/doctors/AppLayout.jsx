import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  console.log("layout is loaded");

  return (
    <div className="grid h-screen grid-cols-[23rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="bg-grey-50  overflow-scroll">
        <div className="max-w-[120rem] mx-auto flex flex-col gap-8">
          this is the outlet
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
