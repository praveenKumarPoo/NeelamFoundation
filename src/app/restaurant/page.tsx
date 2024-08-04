'use client'
require("babel-polyfill");
import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch, useAppStore } from '../../lib/hooks'
import { updateCartOrder, createOrder } from '../../lib/features/todo/todosSlice';
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../../common/RestaurantTable'  // new
import { formatDistance, differenceInDays, add, getUnixTime, isValid, format } from "date-fns";

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

let baseUrl = `https://chipper-toffee-e75e3f.netlify.app/.netlify/functions/api`
let localUrl = `http://localhost:8888/.netlify/functions/api`;
baseUrl = localUrl;


function App() {
  const [data, setData] = useState<{ [key: string]: any }>([]);
  const store = useAppStore()
  const orderData = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  const getData = async () => {
    await fetch(`${baseUrl}/restaurantList`).then((response) => response.json()).then((data) => {
      let totalList: [] = [];
      data[0]["categorys"].map((category:[])=>category).map((menuItem:{"menu-items":[]})=>menuItem['menu-items']).map((listOfItem:[])=>{ 
        listOfItem.map((eachItem: {'sub-items':[]})=>{
          eachItem['sub-items'].map((finalProdct)=>{
              totalList.push(finalProdct)
          })
        })
    });
      console.log(totalList)
      let CloneData = [...totalList].map((item:{name: string, cuisine_name: string, image: {publicUrl: {}}})=>{
        return{
          category_type: item.name,
          maincategory_type: item.cuisine_name,
          ...item,
          imgUrl: item.image ? item.image.publicUrl : '' 
        }
      });
      console.log(CloneData)
      setData(CloneData);
    });
  }
  useEffect(() => {
    getData();
  }, [])


  const handleShow = (Clickeddata: { [key: string]: any }) =>{
    dispatch(updateCartOrder(Clickeddata.row.original));
  }
  const confirmOrder = () => {
    dispatch(createOrder(orderData));
  }
  const columns = React.useMemo(() => {
    //return ["regno:", "name", "phonenumber", "feeduedate"].map((columnName) => {
    return [
      {
        Header: "Name",
        accessor: 'category_name',
        Cell: AvatarCell,
        imgAccessor: "imgUrl",
        emailAccessor: "name",
      },
      ...[ "price", "category_type", "cuisine_name"].map((columnName) => {
      return {
        Header: columnName,
        accessor: columnName
      }
    }), {
      Header: 'Action',
      accessor: 'action',
        Cell: (props: any) => <span onClick={() => handleShow(props)}
          className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          Add Item</span>,
      }]
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-white via-indigo-300 text-gray-900 top-0.5">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="mt-20">
      {orderData.map((orderDataItem: any)=><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{orderDataItem.name} { orderDataItem.price}</span>)}
      </div>
      <div className='mt-3'>
      <a
            onClick={confirmOrder}
            href="/workflow"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           Confirm Order
          </a>
      </div>
        <div>
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}

export default App;
