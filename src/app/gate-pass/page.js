'use client'
import Sidebar from '../../components/sidebar'
import React, { useState } from 'react'
import Header from "../../components/header"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../../../firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { redirect } from "next/navigation"
function GatePass() {
    let user = useAuthState(auth)?.[0];
    console.log(user?.email);
    const [getPass, setGatePass] = useState({
        name: undefined,
        rollNo: undefined,
        destination: undefined,
        outTime: undefined,
        inTime: undefined,
        purpose: undefined
    })
    const onchange = (e) => {
        setGatePass({ ...getPass, [e.target.name]: e.target.value })
    }
    const submit = () => {
        console.log(getPass);
        // return;
        if (!getPass.name || !getPass.rollNo || !getPass.destination || !getPass.outTime || !getPass.inTime || !getPass.purpose) {
            window.alert("Please enter details correctly");
        }

        addDoc(collection(db, `pass/gatepass/${user?.email}`), { ...getPass, date: serverTimestamp() })
            .then((result) => {
                async function sendMail() {
                    let data = await fetch('/api/gatepass', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ ...getPass, email: user.email }),
                    });
                    console.log("Mail Data");
                    console.log(data);
                }
                sendMail();
                window.alert("Gate Pass created successfully !, Check your email for confirmation.");
                setGatePass(
                    {
                        // name: undefined,
                        // rollNo: undefined,
                        // destination: undefined,
                        // outTime: undefined,
                        // inTime: undefined,
                        // purpose: undefined
                    }
                )
            })
            .catch((err) => {
                window.alert('Some error occured, please try again');
            })
    }
    if (user) {
        return <>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header />
                    <div className='mt-10'>
                        <section class="text-gray-600 body-font relative">
                            <div class="container px-5 py-24 mx-auto">
                                <div class="flex flex-col text-center w-full mb-12">
                                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Gate Pass</h1>
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
                                                <label for="name" class="leading-7 text-sm text-gray-600">Destination</label>
                                                <input type="text" id="name" onChange={onchange} name="destination" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        <div class="p-2 w-1/2">
                                            <div class="relative">
                                                <label for="name" class="leading-7 text-sm text-gray-600">Out Time</label>
                                                <input type="text" id="name" onChange={onchange} name="outTime" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        <div class="p-2 w-1/2">
                                            <div class="relative">
                                                <label for="email" class="leading-7 text-sm text-gray-600">In Time</label>
                                                <input type="email" id="email" onChange={onchange} name="inTime" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="message" class="leading-7 text-sm text-gray-600">Purpose</label>
                                                <textarea id="message" onChange={onchange} name="purpose" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                            </div>
                                        </div>
                                        <div class="p-2  mt-4 w-full">
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
    else {
        redirect("/")
    }
}

export default GatePass