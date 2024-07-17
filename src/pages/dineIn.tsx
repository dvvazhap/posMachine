import React, { useEffect, useState, useContext } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { TableComponent } from "../components/table";
import { OrderComponent } from "../components/order";
import { Context } from "../context/contextProvider";
import './dineIn.scss';
import { config } from "../config";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Table = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '2px solid black',
}));

export function DineInComponent() {
  // @ts-ignore
  const { appInitialized, allTableInfo, selectedTable, setSelectedTable, selectTableHandler } = useContext(Context);
  if (appInitialized === false) return <>Please contact admininstrator to get access</>

  function getBgColor(status: "available" | "ordered" | "billed" | "not-available") {
    return config.colors[status];
  }

  return (
    <Box sx={{ flexGrow: 1, mt: 2, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>

      <Box sx={{ flexGrow: 1, border: '1px solid red', display: 'flex', flexDirection: 'column' }}>
        <Card>
          <CardHeader
            title="Select the table"
            subheader="Click the table to see the order"
          />

          <CardContent>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

              {allTableInfo.length > 0 && allTableInfo.map((_element: any, _index: number) => {
                return (
                  <Table key={_index} style={{ cursor: 'pointer', marginRight: '10px', marginBottom: '10px', border: selectedTable === _index ? "2px solid red" : "2px solid black", backgroundColor: getBgColor(_element['status']) }} onClick={() => selectTableHandler(_index)}>
                    <TableComponent no={_index} />
                  </Table>
                )
              })
              }
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

              <Box sx={{ mt: 2, ml: 1, mr: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className="tableStatus" style={{ backgroundColor: config.colors.available, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>Available</div>
              </Box>
              <Box sx={{ mt: 2, ml: 1, mr: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className="tableStatus" style={{ backgroundColor: config.colors.ordered, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>Ordered</div>
              </Box>
              <Box sx={{ mt: 2, ml: 1, mr: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className="tableStatus" style={{ backgroundColor: config.colors.billed, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>Billed</div>
              </Box>
              <Box sx={{ mt: 2, ml: 1, mr: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className="tableStatus" style={{ backgroundColor: config.colors["not-available"], display: 'flex', flexDirection: 'row', alignItems: 'center' }}>Not Available</div>
              </Box>
            </Box>


          </CardContent>
        </Card>

      </Box>
      {selectedTable != -1 &&
        <Box sx={{ flexGrow: 1 }}>
          <Card>
            <CardHeader
              subheader={"Table No :" + (selectedTable + 1)}
              action={
                <IconButton aria-label="close" onClick={() => { setSelectedTable(-1) }}>
                  <CloseIcon />
                </IconButton>
              }
            />

            <CardContent>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                <OrderComponent />
              </Box>

              {/* <Box sx={{ mt: 2, ml: 1 }}>

              </Box> */}
            </CardContent>
          </Card>
        </Box>
      }
    </Box>

  )
} 