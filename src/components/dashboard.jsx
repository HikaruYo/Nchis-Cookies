import React from 'react';
import logo from '../asset/logo.png';
import shopping from '../asset/shopping.png';
import add from '../asset/add.png';
import cookies from '../asset/cookies-about.png';
import brownies from '../asset/brownies.png';

const Dashboard = () => { 

  const data = [
    [brownies, "Choco Cookies1"],
    [cookies,"Choco Cookies2"],
    [cookies,"Choco Cookies3"],
    [brownies,"Choco Cookies3"],
    [brownies, "Choco Cookies3"],
    [cookies,"Choco Cookies3"],
  ]

  return (
    <section className="bg-orange-100 h-screen flex flex-row">
      {/* sidebar */}
      <div className="flex bg-amber-700/65 w-1/3 px-52 h-screen justify-center">
        <div className="relative rounded-2xl bg-orange-100 px-44 h-44 flex flex-col items-center justify-center my-10">
          <div className="absolute -left-2"> 
            <img src={logo} alt="logo" className="h-40 w-40" />
          </div>
          <div className="absolute ml-32"> 
            <h1 className="font-bold text-3xl">Nchis Cookies</h1>
            <p className="text-xl">Cookies & Cake</p> 
          </div>
        </div>
        <div className='absolute my-60 gap-y-2'>
          <h1 className='text-white text-2xl font-bold mr-32'>Admin Dashboard</h1>
        </div>
        <div className='absolute rounded-2xl bg-orange-100 px-44 h-[410px] flex flex-col items-center justify-center my-72'>
          <button className='grid-col bg-amber-800 text-white absolute w-72 h-20 rounded-xl shadow-md shadow-gray-700 -mt-28'>
            <div className='absolute -left-2 bottom-2'>
              <img src={shopping} alt='shopping' className='h-16 w-16 ml-4'/>
            </div>
            <div className='font-bold text-3xl text-center'>
               <h1>Product</h1>
            </div>
          </button>
          <button className='mt-20 grid-col bg-white hover:bg-amber-800 hover:text-white transition duration-300 absolute w-72 h-20 rounded-xl shadow-md shadow-gray-700'>
            <div className='absolute -mt-2'>
              <img src={add} alt='add' className='h-10 w-10 ml-4'/>
            </div>
            <div className='font-bold text-3xl text-center'>
               <h1>Add</h1>
            </div>
          </button>
        </div>
        </div>
        {/* product */}
        <div className='w-2/3 flex flex-col gap-8 overflow-auto py-9 px-20'>
        <h1 className='text-3xl font-bold'>Product</h1>
      <div className='flex flex-col gap-4'>
        {data.map((data, index) => (
          <div key={index} className='w-11/12 px-14 py-3 bg-white rounded-xl shadow-md shadow-gray-700 flex gap-10'>
          <img src={data[0]} alt='cookies' className='justify-start items-start h-32'/>
          <h1 className='font-bold text-3xl flex-col self-center text-center'>{data[1]}</h1>
          <div className='flex items-center justify-end gap-4'>
            <button className='bg-sky-400 w-32 h-16 rounded-xl text-white font-semibold text-xl hover:scale-75 transition-transform duration-300'>Edit</button>
            <button className='bg-red-500 w-32 h-16 rounded-xl text-white font-semibold text-xl hover:scale-75 transition-transform duration-300'>Delete</button>
          </div>
        </div>
        ))}
      </div>
        </div>
    </section>
  );
};

export default Dashboard;
