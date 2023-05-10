'use client'
import Sidebar from '../../components/sidebar'
import React, { useState } from 'react'
import Header from "../../components/header"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../../../firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { redirect, router } from "next/navigation"
function GatePass() {
    let user = useAuthState(auth)?.[0];
    console.log(user?.email);
    const [leavePass, setLeavePass] = useState({
        name: undefined,
        rollNo: undefined,
        dateFrom: undefined,
        dateTo: undefined,
        hostel: undefined,
        roomNo: undefined
    })
    const onchange = (e) => {
        setLeavePass({ ...leavePass, [e.target.name]: e.target.value })
    }
    const submit = () => {
        console.log(leavePass);
        // return;
        if (!leavePass.name || !leavePass.rollNo || !leavePass.dateFrom || !leavePass.dateTo || !leavePass.hostel || !leavePass.roomNo) {
            window.alert("Please enter details correctly");
        }

        addDoc(collection(db, `mess/messoff/${user?.email}`), { ...leavePass, date: serverTimestamp() })
            .then((result) => {
                window.alert("Mess off succesful...");
                setLeavePass(
                    {
                        name: undefined,
                        rollNo: undefined,
                        dateFrom: undefined,
                        dateTo: undefined,
                        hostel: undefined,
                        roomNo: undefined
                    }
                )
            })
            .catch((err) => {
                window.alert('Some error occured, please try again');
            })
    }
    if(user){
        return <>
        <div className='flex h-screen overflow-hidden'>
            <Sidebar />
            <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header />
                <div className='mt-10'>
                    <section class="text-gray-600 body-font relative">
                        <div class="container px-5 py-24 mx-auto">
                            <div class="flex flex-col text-center w-full mb-12">
                                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Mess Off</h1>
                                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Please fill the details correctly.</p>
                            </div>
                            <div class="lg:w-1/2 md:w-2/3 mx-auto">
                                <div class="flex flex-wrap -m-2">
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                                            <input type="text" id="name" onChange={onchange} name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="name" class="leading-7 text-sm text-gray-600">Roll no.</label>
                                            <input type="number" id="name" onChange={onchange} name="rollNo" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="name" class="leading-7 text-sm text-gray-600">Date From</label>
                                            <input type="text" id="name" onChange={onchange} name="dateFrom" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="name" class="leading-7 text-sm text-gray-600">Date To</label>
                                            <input type="text" id="name" onChange={onchange} name="dateTo" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="email" class="leading-7 text-sm text-gray-600">Hostel</label>
                                            <input type="email" id="email" onChange={onchange} name="hostel" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="email" class="leading-7 text-sm text-gray-600">Room No</label>
                                            <input type="number" id="email" onChange={onchange} name="roomNo" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 mt-4 w-full">
                                        <button onClick={submit} class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </div>
    </>
    }
    else{
        redirect("/");
    }
}

export default GatePass