'use client'
import React from 'react'
import { useAppSelector, useAppDispatch, useAppStore } from '../../lib/hooks'
import DndExample from "../../common/DndExample";


export default function Workflow() {
  const workFlowData = useAppSelector(state => state.counter.workFlowData)
  return (
    <div>
      <DndExample cardsData={workFlowData} />
    </div>
  )
}