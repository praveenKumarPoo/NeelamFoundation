'use client'
import React, { useState, useEffect } from 'react'

const products : { id: number, name: string, href: string, imageAlt: string, imageSrc: string, price: string, color: string}[] = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.11",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.22",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.1333",
    price: '$35',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.555",
    price: '$35',
    color: 'Black',
  }
];
let baseUrl = `https://chipper-toffee-e75e3f.netlify.app/.netlify/functions/api`
let localUrl = `http://localhost:8888/.netlify/functions/api`;
//baseUrl = localUrl;
export default function Example() {
  const [data, setData] = useState<{ [key: string]: any }>([]);
  const getData = async () => {
    await fetch(`${baseUrl}/neelam_user_list`).then((response) => response.json()).then((data) => {
      // console.log(data);
      // let CloneData = [...data];
      // let updateRegNo = 0;
      // let notpaidCustomer = [];
      // let inactiveCustomer = []
      // CloneData.map((row, index) => {
      //   updateRegNo = Math.max(updateRegNo, row["Reg No:"] || 0)
      //   let date1 = new Date(row["DUE DATE"])
      //   if (!row["DUE DATE"]) {
      //     row["DUE DATE"] = add(new Date(row["lastUpdateDateTime"]), {
      //       months: row["Fees Options"]
      //     }).valueOf();
      //     date1 = new Date(row["DUE DATE"])
      //   }
      //   const date2 = new Date();
      //   const daysDiff = differenceInDays(
      //     new Date(date1),
      //     new Date(date2)
      //   )
      //   const rowColor = isNaN(daysDiff) || daysDiff < -90 ? "#f0f0b7" : (daysDiff >= -90 && daysDiff <= 0) ? "#f47979" : "#2afc0094";
      //   //const rowColor = isNaN(date2 - date1) || (date2 - date1 > 0 && diffDays > 90) ? "#f0f0b7" : (date2 - date1) > 0 ? "#f47979" : "#2afc0094";
      //   CloneData[index] = {
      //     ...CloneData[index],
      //     expiredDays: Math.abs(daysDiff),
      //     rowColor,
      //     inValidList: rowColor === "#f0f0b7",
      //     FeedueDate: row["DUE DATE"] ? format(new Date(row["DUE DATE"]), 'dd/MM/yyyy') : ""
      //   }
      //   if (rowColor === "#f47979") {
      //     notpaidCustomer.push(CloneData[index]);
      //   };
      //   if (rowColor === "#f0f0b7") {
      //     inactiveCustomer.push(CloneData[index]);
      //   };
      // });
      // let overAllData = [...CloneData];
      // CloneData = CloneData.filter(({ inValidList }) => !inValidList);
      // console.log(CloneData.sort((a, b) => a["Reg No:"] - b["Reg No:"]))
      //setData(modelData(CloneData));
      let CloneData = [...data].map(item=>{
        return{
          ...item,
          href: '#',
          color: 'Black',
          imageSrc: item.image ? item.image.publicUrl : 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60' 
        }
      });
      setData(CloneData);
    });
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="overflow-hidde">

      <div className="bg-gradient-to-b from-indigo-950 to-white via-indigo-30">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">List of customer</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product: any) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.firstName}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.firstName}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.lastName}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}