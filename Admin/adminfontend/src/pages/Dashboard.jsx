import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext.jsx';


const Dashboard = () => {
  const { aToken } = useContext(AdminContext);
  const { formatDate } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className='m-5'>

      {/* Stats cards */}
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.products_icon} alt="Products" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.products ?? 0}</p>
            <p className='text-gray-400'>Products</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.orders_icon} alt="Orders" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.orders ?? 0}</p>
            <p className='text-gray-400'>Orders</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.customers_icon} alt="Customers" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.customers ?? 0}</p>
            <p className='text-gray-400'>Customers</p>
          </div>
        </div>
      </div>

      {/* Latest Orders */}
      <div className='bg-white mt-10'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border'>
          <img src={assets.list_icon} alt="List Icon" />
          <p className='font-semibold'>Latest Orders</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {dashData.latestOrders.map((order, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded w-12' src={order.product.image} alt={order.product.name} />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{order.customer.name}</p>
                <p className='text-gray-600'>{formatDate(order.orderDate)}</p>
              </div>
              {order.status === 'Cancelled' ? (
                <p className="text-red-500 text-xs font-semibold">Cancelled</p>
              ) : order.status === 'Completed' ? (
                <p className='text-green-400 text-xs font-medium'>Completed</p>
              ) : (
                <p className='text-blue-400 text-xs font-medium'>Pending</p>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
