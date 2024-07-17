import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/contextProvider";

export function TableComponent(props:{no: number}){
  // @ts-ignore
  // const {tableInfo} = useContext(Context);

  return <div>Tableee - {props.no+1}</div>
} 