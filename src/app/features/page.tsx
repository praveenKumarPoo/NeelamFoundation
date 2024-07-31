'use client'
require("babel-polyfill");
import React, { useState, useEffect } from 'react'
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../../common/Table'  // new
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



function App() {

  const [data, setData] = useState<{ [key: string]: any }>([]);
  const getData = async () => {
    let baseUrl = `https://chipper-toffee-e75e3f.netlify.app/.netlify/functions/api`;
    await fetch(`${baseUrl}/list`).then((response) => response.json()).then((data) => {
      console.log(data);
      let CloneData = [...data];
      let updateRegNo = 0;
      let notpaidCustomer = [];
      let inactiveCustomer = []
      CloneData.map((row, index) => {
        updateRegNo = Math.max(updateRegNo, row["Reg No:"] || 0)
        let date1 = new Date(row["DUE DATE"])
        if (!row["DUE DATE"]) {
          row["DUE DATE"] = add(new Date(row["lastUpdateDateTime"]), {
            months: row["Fees Options"]
          }).valueOf();
          date1 = new Date(row["DUE DATE"])
        }
        const date2 = new Date();
        const daysDiff = differenceInDays(
          new Date(date1),
          new Date(date2)
        )
        const rowColor = isNaN(daysDiff) || daysDiff < -90 ? "#f0f0b7" : (daysDiff >= -90 && daysDiff <= 0) ? "#f47979" : "#2afc0094";
        //const rowColor = isNaN(date2 - date1) || (date2 - date1 > 0 && diffDays > 90) ? "#f0f0b7" : (date2 - date1) > 0 ? "#f47979" : "#2afc0094";
        CloneData[index] = {
          ...CloneData[index],
          expiredDays: Math.abs(daysDiff),
          rowColor,
          inValidList: rowColor === "#f0f0b7",
          FeedueDate: row["DUE DATE"] ? format(new Date(row["DUE DATE"]), 'dd/MM/yyyy') : ""
        }
        if (rowColor === "#f47979") {
          notpaidCustomer.push(CloneData[index]);
        };
        if (rowColor === "#f0f0b7") {
          inactiveCustomer.push(CloneData[index]);
        };
      });
      let overAllData = [...CloneData];
      CloneData = CloneData.filter(({ inValidList }) => !inValidList);
      console.log(CloneData.sort((a, b) => a["Reg No:"] - b["Reg No:"]))
      setData(modelData(CloneData));
    });
  }
  useEffect(() => {
    getData();
  }, [])
  const columns = React.useMemo(() => {
    return ["regno:", "name", "phonenumber", "feeduedate"].map((columnName) => {
      return {
        Header: columnName,
        accessor: columnName
      }
    })
  }, []);
  console.log(columns)
  // const columns1 = React.useMemo(() => [
  //   {
  //     Header: "Name",
  //     accessor: 'name',
  //     Cell: AvatarCell,
  //     imgAccessor: "imgUrl",
  //     emailAccessor: "email",
  //   },
  //   {
  //     Header: "Title",
  //     accessor: 'title',
  //   },
  //   {
  //     Header: "Status",
  //     accessor: 'status',
  //     Cell: StatusPill,
  //   },
  //   {
  //     Header: "Age",
  //     accessor: 'age',
  //   },
  //   {
  //     Header: "Role",
  //     accessor: 'role',
  //     Filter: SelectColumnFilter,  // new
  //     filter: 'includes',
  //   },
  // ], [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-white via-indigo-300 text-gray-900 top-0.5">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}

export default App;
