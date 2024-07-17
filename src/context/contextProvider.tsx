import React, { useState, useEffect, useRef } from "react";
import { config } from '../config';
export const Context = React.createContext(null);

interface TableProps {
  nop: number;
  master: string,
  orderTakenTime: string,
  status: "available" | "ordered" | "billed" | "not-available",
  placedOrder: object[],
  tempOrder: object[]
}

const Provider = (props: {
  children:
  | string
  | number
  | boolean
  | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
  | Iterable<React.ReactNode>
  | React.ReactPortal
  | null
  | undefined
}) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appInitialized, setAppInitialized] = useState(false);
  const [page, setPage] = useState(config.defaultLoadingPage);
  const [jsonConfig, setJsonConfig] = useState({ restName: config.defaultRestName, not: config.defaultNot });
  const [selectedTable, setSelectedTable] = useState(-1);
  const [allTableInfo, setAllTableInfo] = useState([]);
  const [tableInfo, setTableInfo] = useState({});


  useEffect(() => {
    if (!appInitialized) {
      setPage('settings');
      console.log("app not initialised");
      // @ts-ignore
      electron.precheckJSONFile('hello').then((_checkDBExists: boolean) => {
        console.log("_checkDBExists :", _checkDBExists);
        if (_checkDBExists) {
          setAppInitialized(true);
          setPage(config.defaultLoadingPage);
        }
      }).catch((e: any) => {
        console.log("Error in precheckJSONFile :", JSON.stringify(e));
      });
    } else {
      console.log("app initialised");
      // @ts-ignore
      electron.readJSONConfig().then((jsonStr: any) => {
        let jsonResp = JSON.parse(jsonStr);
        console.log("res from json Config :", jsonResp);

        if (jsonResp['status'] === "error") {
          console.log("response :", JSON.parse(jsonResp['msg']));
        } else {
          let _jsonResponse = JSON.parse(jsonResp['data']);
          setJsonConfig(_jsonResponse);

          if (_jsonResponse["not"]) {
            setTableDataHandler(parseInt(_jsonResponse["not"]));
          }
        }
      });
    }
  }, [appInitialized]);

  useEffect(() => {
    setTableDataHandler(jsonConfig["not"]);
  }, [jsonConfig]);

  function setTableDataHandler(n: number) {
    let initialAllTableInfo: TableProps[] = [];
    for (let i = 1; i <= n; i++) {
      let _status: 'available' | 'ordered' | 'billed' | 'not-available' = "available";
      if (i == 1) { _status = "ordered" }
      else if (i == 2) { _status = "billed" }
      else if (i == 3) { _status = "not-available" }
      initialAllTableInfo.push({ nop: config.peoplePerTable, master: "", orderTakenTime: "", status: _status, placedOrder: [], tempOrder: [] });
    }
    // @ts-ignore
    setAllTableInfo(initialAllTableInfo);
  }

  const selectTableHandler = (no: number) => {
    if (selectedTable != -1) {
      console.log("update the table order");
    }
    if (allTableInfo[no]['status'] !== "not-available") {
      setSelectedTable(no);
      // @ts-ignore
      setTableInfo(allTableInfo[no]);
    }else{
      setSelectedTable(-1);
    }

  };

  useEffect(()=>{
    console.log("tableInfo :",tableInfo);
  },[tableInfo])
  const getAppsList = () => {
    console.log("inside appsList");
    // GetData(instance, accounts, graphConfig.getAppsEndpoint)
    //   .then((response: unknown) => {
    //     setAppsList(response);
    //   })
    //   .catch((error: unknown) => {
    //     console.log(error);
    //   });
  };

  return (
    <Context.Provider
      // @ts-ignore
      value={{
        // getAppsList,
        appInitialized, setAppInitialized,
        page, setPage,
        jsonConfig, setJsonConfig,
        allTableInfo, setAllTableInfo,
        tableInfo, setTableInfo, selectTableHandler,
        selectedTable, setSelectedTable
        // setIsAuthenticated,
        // appsList,
        // selectedApp,
        // userRoleAssignmentsMapping,
        // setUserRoleAssignmentsMapping,
        // setSelectedApp,
        // userRolesList,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
