'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch, useAppStore } from '../../lib/hooks'
import { updateOrder } from '../../lib/features/todo/todosSlice';
import DndExample from "../../common/DndExample";
import { userAgent } from 'next/server';


export default function Workflow() {
  const workFlowData = useAppSelector(state => {
    return state.counter.workFlowData
});
  const dispatch = useAppDispatch()
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
}, [])

  return (
    <div>
      <DndExample cardsData={workFlowData} />
    </div>
  )
}