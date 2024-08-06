'use client'
require("babel-polyfill");
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch, useAppStore } from '../../lib/hooks'
import { updateCartOrder, createOrder, resetToInitialData, updateOrder } from '../../lib/features/todo/todosSlice';
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../../common/RestaurantTable'  // new
import { formatDistance, differenceInDays, add, getUnixTime, isValid, format } from "date-fns";
import axios from 'axios'


const modelData = (mData: {}[]) => {
  return mData.map((row: { [key: string]: any }) => {
    let newObject: { [key: string]: any } = {};
    Object.keys(row).map((rowColumn: string) => {
      const newColumn = rowColumn.replaceAll(" ", "").toLowerCase();
      newObject[newColumn] = row[rowColumn];
    })
    return newObject;
  })
}

// let baseUrl = `https://chipper-toffee-e75e3f.netlify.app/.netlify/functions/api`
// let localUrl = `http://localhost:8888/.netlify/functions/api`;
// baseUrl = localUrl;

let wsUrl = 'https://neelam-websocket.onrender.com';
let localwsUrl = 'http://localhost:8000';
wsUrl = localwsUrl;


function App() {
  const [data, setData] = useState<{ [key: string]: any }>([]);
  const store = useAppStore()
  const router = useRouter();
  const orderData = useAppSelector(state => state.counter.value)
  const orderworkflowData = useAppSelector(state => state.counter.workFlowData)
  const dispatch = useAppDispatch()

  const getData = async () => {
    await axios.get(`${wsUrl}/currentOrders`).then((response) => response.data).then((data) => {
      console.log(data)
      setData(data);
    });
  }
  useEffect(() => {
    dispatch(resetToInitialData([]))
    getData();

  }, [])


  const handleShow = (Clickeddata: { [key: string]: any }) => {
    dispatch(updateCartOrder(Clickeddata.row.original));
  }
  const finalSubmit = async (finalOrder: any) => {
    const orderId = Math.floor((Math.random() * 100000) + 1);
    let totalOrderPrice = finalOrder.reduce(
      (accumulator: number, currentValue: { price: string }) => accumulator + parseFloat(currentValue.price),
      0,
    );
    //removing duplicate and calculated the order quantity 
    let hashForDuplicate: any = {}
    let orderItems = [...finalOrder].map((item: { id: any, quantity: Number }) => {
      if (!hashForDuplicate[item.id])
        hashForDuplicate[item.id] = { ...item, quantity: 1 }
      else
        hashForDuplicate[item.id] = { ...item, quantity: hashForDuplicate[item.id].quantity += 1 }
    })
    
    orderItems = Object.keys(hashForDuplicate).map((unit) => hashForDuplicate[unit]);

    let orderNameQuantity = orderItems.reduce(
      (accumulator: string, currentValue: any) => accumulator + `${currentValue.name}:${currentValue.quantity},`,
      "",
    );
    let newOrder = [...orderworkflowData];
    newOrder[0] = Object.assign({}, newOrder[0], { components: orderItems });
    await axios.post(`${wsUrl}/orderupdate`, { order: { orderId: orderId, Orderinfo: newOrder, totalOrderPrice, numberOfItems: orderItems.length, orderNameQuantity } }).then((res) => {
      dispatch(createOrder(orderItems));
      alert("order created uploaded successfully");
    });
    router.push('/workflow')
  }
  const confirmOrder = () => {
    finalSubmit(orderData)
  }
  const columns = React.useMemo(() => {
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
        Cell: (props: any) => <span onClick={() => alert(JSON.stringify(props.row.original))}
          className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          show Details</span>,
      }]
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-white via-indigo-300 text-gray-900 top-0.5">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-20">
          {orderData.map((orderDataItem: any) => <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{orderDataItem.name} {orderDataItem.price}</span>)}
        </div>
        <div className='mt-3'>
          <button onClick={confirmOrder}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
            Confirm Order
          </button>
        </div>
        <div> 
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}

export default App;
