import React, { useEffect, useState, useContext } from "react";
import { Context } from "../context/contextProvider";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import allValues from '../menu.json';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

interface Menu {
  item: string;
  imageUrl: string;
  price: number;
  gst: number;
  category: string;
  kotCategory: string;
  type: string;
}
const filterOptions = createFilterOptions({
  matchFrom: 'any',
  ignoreCase: true,
  stringify: (option: Menu) => option.item,
});

export function OrderComponent() {

  // @ts-ignore
  const { tableInfo, setTableInfo } = useContext(Context);
  const [orderItem, setOrderItem] = useState(null);
  const [qtyValue, setQtyValue] = useState(1);
  const [itemValue, setItemValue] = useState(0);

  const addItemToOrder = () => {
    console.log("adding item :", orderItem, qtyValue, itemValue, tableInfo);

    let itemIndex = tableInfo.tempOrder.findIndex((element: any) => (element.item === orderItem?.item && element.price !== 0));
    if (itemIndex === -1) {
      setTableInfo({ ...tableInfo, tempOrder: [...tableInfo['tempOrder'], { ...orderItem, actPrice: itemValue, qty: qtyValue }] })
    } else {
      console.log("... initial qty :", tableInfo['tempOrder'][itemIndex]['qty'], qtyValue, parseInt(tableInfo['tempOrder'][itemIndex]['qty']) + qtyValue);
      
      tableInfo['tempOrder'][itemIndex] = { ...tableInfo['tempOrder'][itemIndex], qty: parseInt(tableInfo['tempOrder'][itemIndex]['qty']) + qtyValue }
      setTableInfo({ ...tableInfo, tempOrder: tableInfo['tempOrder'] });
    }
    setQtyValue(1);
    document.getElementById("item-select")?.focus();
  }

  const placeOrderHandler = () => {
    console.log("...placeOrder :", tableInfo['tempOrder']);
    let _placedOrder = tableInfo['placedOrder'];
    tableInfo['tempOrder'].forEach((tempEle: any) => {
      console.log("temp Order :", tempEle);
      let itemIndex = tableInfo.placedOrder.findIndex((placedEle: any) => (placedEle.item === tempEle?.item && placedEle.price !== 0));
      if (itemIndex === -1) {
        _placedOrder = [..._placedOrder, tempEle];
        // setTableInfo({...tableInfo, placedOrder: [...tableInfo['placedOrder'], tempEle]});
      } else {
        console.log("... initial qty :", tableInfo['placedOrder'][itemIndex]['qty'], tempEle['qty']);
        _placedOrder[itemIndex] = { ..._placedOrder[itemIndex], qty: _placedOrder[itemIndex]['qty'] + tempEle['qty'] };
        // tableInfo['placedOrder'][itemIndex] = {...tableInfo['placedOrder'][itemIndex], qty: tableInfo['placedOrder'][itemIndex]['qty'] + tempEle['qty']}
        // setTableInfo({ ...tableInfo, placedOrder: tableInfo['placedOrder']});
      }
    });


    setTableInfo({ ...tableInfo, placedOrder: _placedOrder, tempOrder: [] });
  }

  const removePlacedItem = (index: number) => {
    console.log("removing placedOrder :",index);
    //let _newOrder = tableInfo['placedOrder'].splice(index, 1);
    //console.log("..._new :", _newOrder, tableInfo);
  }

  const removeTempItem = (index: number) => {
    console.log("removing tempItem :",index);
    //let _newOrder = tableInfo['tempOrder'].splice(index,1);
    //console.log("..._new :", _newOrder, tableInfo);
  }

  let _totalPayablePrice = 0;
  let _totalPayableGst = 0;
  return <>Order Component

    {/* {JSON.stringify(tableInfo)} */}
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Autocomplete
        id="item-select"
        options={allValues}
        getOptionLabel={(option) => option.item}
        filterOptions={filterOptions}
        sx={{ width: 300 }}
        onChange={(event: any, newValue: any | null) => {
          setOrderItem(newValue);
          setItemValue(newValue['price']);
          console.log(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Select an item" />}
      />
      <TextField type="number" value={qtyValue} sx={{ width: 80 }} onChange={(e: any) => {
        setQtyValue(e.target.value);
      }} label="Quantity" />
      {/* @ts-ignore */}
      <TextField disabled={orderItem?.price !== 0} sx={{ width: 100 }} value={itemValue} onChange={(e: any) => {
        setItemValue(e.target.value);
      }}
        label="Value" />
      <Button variant="contained" disabled={itemValue === 0 || qtyValue <= 0} onClick={() => { addItemToOrder() }}>Add</Button>
    </Box>
    {/* {"item":"Neymeen Fry","imageUrl":"","price":"200","gst":5,
    "category":"South Indian","kotCategory":"Main","type":"non-veg","qty":1} */}
    {(tableInfo['tempOrder'].length > 0 || tableInfo['placedOrder'].length > 0) &&
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <table style={{ width: '100%', marginTop: 10 }}>
          <thead>
            <tr style={{ textAlign: 'left', flexGrow: 1 }}>
              <th >Item</th>
              <th >Price</th>
              <th >Qty</th>
              <th >Total</th>
              <th >GST</th>
              <th >Total Amt</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableInfo['placedOrder'].map((_order: any, _index: number) => {
              let _totalPrice = _order.qty * _order.actPrice;
              _totalPayablePrice += _totalPrice;
              let _totalGst = (_totalPrice * _order.gst / 100);
              _totalPayableGst += _totalGst;
              return <tr className="order-item" key={_index} >
                <td style={{ marginRight: 10 }}>{_order.item}</td>
                <td style={{ marginRight: 10 }}>{_order.actPrice}</td>
                <td style={{ marginRight: 10 }}>{_order.qty}</td>
                <td style={{ marginRight: 10 }}>{_totalPrice}</td>
                <td style={{ marginRight: 10 }}>{_totalGst}</td>
                <td style={{ marginRight: 10 }}>{_totalPrice + _totalGst} INR</td>
                <td>
                  <IconButton aria-label="close" onClick={() => { removePlacedItem(_index) }}>
                    <CloseIcon /> Del
                  </IconButton>
                </td>
              </tr>;
            })}
            {tableInfo['tempOrder'].map((_order: any, _index: number) => {
              let _totalPrice = _order.qty * _order.actPrice;
              _totalPayablePrice += _totalPrice;
              let _totalGst = (_totalPrice * _order.gst / 100);
              _totalPayableGst += _totalGst;
              return <tr className="order-item" key={_index} >
                <td style={{ marginRight: 10 }}>{_order.item}</td>
                <td style={{ marginRight: 10 }}>{_order.actPrice}</td>
                <td style={{ marginRight: 10 }}>{_order.qty}</td>
                <td style={{ marginRight: 10 }}>{_totalPrice}</td>
                <td style={{ marginRight: 10 }}>{_totalGst}</td>
                <td style={{ marginRight: 10 }}>{_totalPrice + _totalGst} INR</td>
                <td>
                  <IconButton aria-label="close" onClick={() => { removeTempItem(_index) }}>
                    <CloseIcon />
                  </IconButton>
                </td>
              </tr>;
            })}
            <tr style={{ border: 'none !important' }}>
              <td colSpan={3}></td>

              <td>{_totalPayablePrice} INR</td>
              <td>{_totalPayableGst} INR</td>
              <td style={{ fontWeight: 'bold' }}>{_totalPayablePrice + _totalPayableGst} INR</td>
            </tr>
          </tbody>
        </table>

        <Button variant="contained" onClick={() => placeOrderHandler()}>Place Order</Button>
      </Box>
    }
  </>
} 