'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table, { AvatarCell } from '../../common/OrdersatatusTable'  // new
import { useAppSelector, useAppDispatch, useAppStore } from '../../lib/hooks'
import { updateOrder } from '../../lib/features/todo/todosSlice';
import DndExample from "../../common/DndExample";
import { userAgent } from 'next/server';

let wsUrl = 'https://neelam-websocket.onrender.com';
let localwsUrl = 'http://localhost:8000';
//wsUrl = localwsUrl;

export default function Workflow() {
  const workFlowData = useAppSelector(state => {
    return state.counter.workFlowData
});
const [orderListdata, setorderListdata ] = useState<{ [key: string]: any }>([]);
const [wsConnection, setwsConnection ] = useState<any>()
  const dispatch = useAppDispatch();

  const callBackForDargUpdate = (dragChangData: any) => {
      wsConnection && wsConnection.send && wsConnection.readyState === 1 && wsConnection.send(JSON.stringify(dragChangData));
    }
  
  const getOrderListData = async () => {
    await axios.get(`${wsUrl}/currentOrders`).then((response) => response.data).then((data) => {
      console.log(data)
      setorderListdata(data);
    });
  }

  useEffect(() => {
    let wsUrl = 'wss://neelam-websocket.onrender.com'
    const localwsUrl = 'http://localhost:8000'
    //wsUrl = localwsUrl
      const URL=`${wsUrl}/orderStatus`;
      const socket = new WebSocket(URL);
      socket.addEventListener("open", (event) => {
        socket.send(JSON.stringify(workFlowData));
      });
      socket.addEventListener("message", async(event) => {
        try{
          dispatch(updateOrder(JSON.parse(event.data)))
        }
        catch{
          console.log("Message from server ", event.data);
        }
      });
      setwsConnection(socket);
      getOrderListData()
}, [])

const updateOrderfromTable = (TablepropsData: any) => {
  const { Orderinfo = [] } = TablepropsData
  dispatch(updateOrder(Orderinfo));
} 

const columnsOrderList = React.useMemo(() => {
  //return ["regno:", "name", "phonenumber", "feeduedate"].map((columnName) => {
  return [
    {
      Header: "Name",
      accessor: 'orderId',
      Cell: AvatarCell,
      imgAccessor: "imgUrl",
      emailAccessor: "totalOrderPrice",
    },
    ...["orderNameQuantity", "totalOrderPrice", "numberOfItems"].map((columnName) => {
      return {
        Header: columnName,
        accessor: columnName
      }
    }), {
      Header: 'Action',
      accessor: 'action',
      Cell: (props: any) => <span onClick={() => updateOrderfromTable(props.row.original)}
        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        show Details</span>,
    }]
}, []);

  return (
    <div>
      <DndExample cardsData={workFlowData} callBackForDargUpdate={callBackForDargUpdate} />
      <div>
      <Table columns={columnsOrderList} data={orderListdata} />
      </div>
    </div>
  )
}