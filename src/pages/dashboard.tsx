import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/contextProvider";
import { TableProps } from '../interface';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const DashboardComponent = () => {
  // @ts-ignore
  const { appInitialized } = useContext(Context);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log("tableData :", tableData);
  }, [tableData]);
  if(appInitialized === false) return <>Please contact admininstrator to get access</>
  return ( 
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{mt: 2}}>
        
        <Box>
          <Item>Max Items Sold</Item>
        </Box>
        <Box >
          <Item>Master Vs Sales</Item>
        </Box>
        <Box >
          <Item>xs=8</Item>
        </Box>
        <Box >
          <div>

            <Button variant="contained"
              sx={{ mx: 2 }}
              onClick={async () => {
                // @ts-ignore
                let res = await electron.printBill('print data');
                console.log("print res :", res);

              }} >printer test</Button>
            <Button variant="contained" sx={{ mx: 2 }} onClick={async () => {
              // @ts-ignore
              let res = await electron.sendNotification('My Custom notigivation');
              console.log('res :', res);
            }}>Notify</Button>

            <Button variant="contained" sx={{ mx: 2 }} onClick={async () => {
              // @ts-ignore
              let res = await electron.executeMulQuery1("INSERT INTO table2 (NAME,AGE,ADDRESS,SALARY) VALUES (?, ?, ?, ?)", [["Pa", 32, "California", 20000.00], ["Pau", 32, "California", 20000.00], ["P", 32, "California", 20000.00], ["l", 32, "California", 20000.00]]);
              console.log('res :', res);
            }}>Execute Multiple Query</Button>

            <Button variant="contained" sx={{ mx: 2 }} onClick={async () => {
              // @ts-ignore
              let res = await electron.executeSingleQuery1("INSERT INTO table2 (NAME,AGE,ADDRESS,SALARY) VALUES (?, ?, ?, ?)", ["Dijil", 32, "India", 1000.00]);
              console.log('res :', res);
            }}>Execute Single Query</Button>

            <Button variant="outlined" sx={{ mx: 2 }} onClick={async () => {
              // @ts-ignore
              let res = await electron.fetchAllData1("SELECT * from table2");
              setTableData(res);
              console.log('res :', res);

            }}>Show table</Button>
            {tableData.length}
            {tableData && tableData.length > 0 && (
              <div id="table">
                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Address</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((element: TableProps, index: number) => {
                      return (<tr key={index}>
                        <td>{element.ID}</td>
                        <td>{element.NAME}</td>
                        <td>{element.AGE}</td>
                        <td>{element.ADDRESS}</td>
                        <td>{element.SALARY}</td>
                      </tr>)
                    })}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </Box>
      </Box>
    </Box>
  )
} 