'use client'
import Image from 'next/image'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import { AiFillEye } from "react-icons/ai"
import { BiMoneyWithdraw } from "react-icons/bi"
import { BsLightningCharge } from "react-icons/bs"
import { IoFastFoodOutline, IoFastFoodSharp } from 'react-icons/io'
import { FaHamburger } from "react-icons/fa"
import { MdOutlineNoFood } from "react-icons/md"
import { auth, db, provider } from '../../firebase/config'
import { useAuthState } from "react-firebase-hooks/auth"
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { use, useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
export default function Home() {
  const user = useAuthState(auth)?.[0];
  const [getPassData, setGetPassData] = useState([]);
  const [getLeaveData, setGetLeaveData] = useState([]);
  // useEffect(() => {
  // async function getGatePass() {
  let q = query(collection(db, `pass/gatepass/${user?.email}`), orderBy('date'));
  getDocs(q).then((doc) => {
    let arr = [];
    doc.forEach((e) => {
      arr.push({ id: e.id, ...e.data() })
    })
    arr.reverse();
    setGetPassData(arr);
  })
  // }
  // async function getLeavePass() {
  q = query(collection(db, `pass/leavePass/${user?.email}`), orderBy('date'));
  getDocs(q).then((doc) => {
    let arr = [];
    doc.forEach((e) => {
      arr.push({ id: e.id, ...e.data() })
    })
    arr.reverse();
    // setGetPassData(arr);
    setGetLeaveData(arr);
  })
  // }
  // getLeavePass();
  // getGatePass();
  // }, [])
  const login = () => {
    console.log("login")
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);


      })
      .catch((error) => {
        const errorCode = error.code;
      });
  }
  const logout = () => {
    signOut(auth)
  }
  if (user) {
    return <>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar />
        <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <div className=' py-4 mx-auto w-10/12 grid md:grid-cols-4 grid-cols-2'>
            <div className='w-11/12  px-4 py-4 bg-white shadow-xl'>
              <BiMoneyWithdraw className='text-4xl text-blue-400' />
              <h1 className='mt-6 text-3xl font-bold'>
                Rs. 11,400
              </h1>
              <p className='text-xl text-gray-600'>Remaining Mess Account</p>

            </div>
            <div className='w-11/12  px-4 py-4 bg-white shadow-xl'>
              <MdOutlineNoFood className='text-4xl text-blue-400' />
              <h1 className='mt-6 text-3xl font-bold'>
                Rs. 5,500
              </h1>
              <p className='text-xl text-gray-600'>Diet Charges</p>

            </div>
            <div className='w-11/12  px-4 py-4 bg-white shadow-xl'>
              <BsLightningCharge className='text-4xl text-blue-400' />
              <h1 className='mt-6 text-3xl font-bold'>
                Rs. 470
              </h1>
              <p className='text-xl text-gray-600'>Fine Charges</p>

            </div>
            <div className='w-11/12  px-4 py-4 bg-white shadow-xl'>
              <FaHamburger className='text-4xl text-blue-400' />
              <h1 className='mt-6 text-3xl font-bold'>
                Rs. 1200
              </h1>
              <p className='text-xl text-gray-600'>Extra Mess Items</p>

            </div>


          </div>







          <div>

            <div class="relative mx-auto w-10/12 my-20 overflow-x-auto">
              <h1 className='text-2xl font-bold my-5'>
                Leave Pass History
              </h1>
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Destination
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Out Time
                    </th>
                    <th scope="col" class="px-6 py-3">
                      In Date
                    </th>
                  </tr>
                </thead>
                {getLeaveData?.map((e) => {
                  let date = new Date(e.date.seconds * 1000);
                  console.log(date.toISOString().slice(0, 10));
                  return <>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td class="px-6 py-4">
                        {date.toISOString().slice(0, 10)}
                      </td>
                      <td class="px-6 py-4">
                        {e.destination}
                      </td>
                      <td class="px-6 py-4">
                        {e.outTime}
                      </td>
                      <td class="px-6 py-4">
                        {e.inDate}
                      </td>
                    </tr>
                  </>
                })}
              </table>
            </div>
            <div class="relative mx-auto w-10/12 my-20 overflow-x-auto">
              <h1 className='text-2xl font-bold my-5'>
                Outpass History
              </h1>
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Destination
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Out Time
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Return Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getPassData?.map((e) => {
                    let date = new Date(e.date.seconds * 1000);
                    // console.log(date.toISOString().slice(0, 10));
                    return <>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="px-6 py-4">
                          {date.toISOString().slice(0, 10)}
                        </td>
                        <td class="px-6 py-4">
                          {e.destination}
                        </td>
                        <td class="px-6 py-4">
                          {e.outTime}
                        </td>
                        <td class="px-6 py-4">
                          {e.inTime}
                        </td>
                      </tr>
                    </>
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <h1 className='text-xl font-bold'>Hello</h1> */}
      </div>
    </>
  }
  else {
    return <>
      <section class="text-gray-600 body-font h-screen  flex justify-center items-center ">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center my-auto">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">Hostel Ease
            </h1>
            <p class="mb-8 leading-relaxed">A comprehensive software solution that automates and streamlines the management of hostel operations, including gate pass, leave pass, attendance management, mess and hostel related queries, and overall administration.</p>
            <div class="flex justify-center">
              <button onClick={login} class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
              {/* <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button> */}
            </div>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img class="object-cover object-center rounded" alt="hero" src="https://img.freepik.com/free-vector/college-university-students-group-young-happy-people-standing-isolated-white-background_575670-66.jpg" />
          </div>
        </div>
      </section>
    </>
  }

}
