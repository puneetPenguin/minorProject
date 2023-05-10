'use client'
import React from 'react'
import Sidebar from '../../components/sidebar'
import Header from "../../components/header"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase/config'
// import { useRouter } from 'react'

import { redirect } from 'next/navigation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

//   import faker from 'faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Attendance Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'];
 const data = {
  labels,
  datasets: [
    {
      label: 'Attendace Per Month',
      data: labels.map(() => Math.random() * 30),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};
function Page() {
  // let user = useAuthState(auth)?.[0];

  // let router = useRouter();
  let user = useAuthState(auth)?.[0];
  const attendance = () => {
    let date = new Date();
    addDoc(collection(db, `attendance/${user?.email}/${labels[date.getMonth()]}`), {
      timestamp: serverTimestamp(),
    })
      .then((res) => {
        // console.log()
        window.alert("Attendance mark successfully...");
        // redirect("/");
      })
      .catch((err) => {
        window.alert(err.message)
      })
  }
  // console.log(user)
  if (user) {
    return <>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <div className='mt-10'>
            <div className='mx-auto w-8/12'>
              <Bar options={options} data={data} />;
            </div>
            <div className='mx-auto mt-4 w-8/12 flex justify-center'>
              <button onClick={attendance} className='px-4 py-2 rounded-lg text-white bg-blue-700'>Mark Attendance</button>
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