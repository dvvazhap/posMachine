import React, { useEffect, useContext } from "react";
import { NavbarComponent } from "./components/navbar";
import { DashboardComponent } from "./pages/dashboard";
import { DineInComponent } from "./pages/dineIn";
import { SettingsComponent } from "./pages/settings";
import { TakeAwayComponent } from "./pages/takeaway";
import { Context } from "./context/contextProvider";

export default function App() {
  // @ts-ignore
  const { page, appInitialized } = useContext(Context);

  return (
    <>
      <NavbarComponent />
      {appInitialized && page === "dashboard" && <DashboardComponent/>}
      {appInitialized && page === "dineIn" && <DineInComponent/>}
      {page === "settings" && <SettingsComponent/>}
      {appInitialized && page === "takeaway" && <TakeAwayComponent/>}
    </>
  )
}