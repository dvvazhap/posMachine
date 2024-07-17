import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/contextProvider";
export function TakeAwayComponent(){
  // @ts-ignore
  const {appInitialized} = useContext(Context);

  if(appInitialized === false) return <>Please contact admininstrator to get access</>
  return <>TakeAway Component</>
} 