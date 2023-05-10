'use client'
import React from 'react'
import Sidebar from '../../components/sidebar'
import Header from "../../components/header"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase/config'
// import { useRouter } from 'react'
import { redirect } from 'next/navigation';

function Page() {
    // let router = useRouter();
    let user = useAuthState(auth)?.[0];
    // console.log(user)
    if (user) {
        return <>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header />
                    <div className='mt-10'>
                        <div class="profile-page block mt-[30vh]">
                            <section class="relative block h-500-px">
                                <div class="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')'" }} >
                                    <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-black"></span>
                                </div>
                                <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: 'translateZ(0px)' }} >
                                    <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                                        <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                                    </svg>
                                </div>
                            </section>
                            <section class="relative py-16 bg-blueGray-200">
                                <div class="container mx-auto px-4">
                                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                        <div class="px-6">
                                            <div class="flex flex-wrap justify-center">
                                                <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                                    <div class="relative">
                                                        <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                                                    </div>
                                                </div>


                                            </div>
                                            <div class="text-center mt-12">
                                                <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                    {user?.displayName}
                                                </h3>
                                                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-semibold text-gray-600 uppercase">
                                                    Dr. B R Ambdedkar National Institute Of Technology, Jalandhar
                                                </div>
                                                <div class="mb-2 text-blueGray-600 mt-10">Email - {user?.email}
                                                </div>
                                                <div class="mb-2 text-blueGray-600 mt-10">{user?.phone && `Email - ${user?.phone}`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>


        </>
    }
    else {
        // router.push("/")
        redirect("/");
        return <>

        </>
    }
}

export default Page