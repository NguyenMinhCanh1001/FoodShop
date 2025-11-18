import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  const formatDate = (date) => {
    if (!date) return '—';
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return '—';
    return parsed.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (value) =>
    (value ?? 0).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    });

  if (!dashData) {
    return (
      <div className="m-5 text-sm text-gray-500 animate-pulse">
        Đang tải dữ liệu dashboard...
      </div>
    );
  }

  const latestOrders = dashData.latestOrders ?? [];

  const statCards = [
    {
      label: 'Sản phẩm',
      value: dashData.products ?? 0,
      icon: assets.product_icon,
    },
    {
      label: 'Đơn hàng',
      value: dashData.orders ?? 0,
      icon: assets.list_icon,
    },
    {
      label: 'Khách hàng',
      value: dashData.customers ?? 0,
      icon: assets.people_icon,
    },
    {
      label: 'Doanh thu',
      value: formatCurrency(dashData.revenue),
      icon: assets.earning_icon,
      isMonetary: true,
    },
  ];

  const renderStatus = (status) => {
    const normalized = (status || '').toLowerCase();
    if (normalized === 'cancelled') {
      return <p className="text-red-500 text-xs font-semibold">Cancelled</p>;
    }
    if (normalized === 'completed' || normalized === 'delivered') {
      return <p className="text-green-500 text-xs font-semibold">Completed</p>;
    }
    return <p className="text-blue-500 text-xs font-semibold">Pending</p>;
  };

  return (
    <div className="m-5 flex-1">
      <div className="flex flex-wrap gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-3 bg-white p-4 min-w-56 rounded border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <img className="w-12 h-12" src={card.icon} alt={card.label} />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {card.isMonetary ? card.value : card.value ?? 0}
              </p>
              <p className="text-gray-400 text-sm">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white mt-10 rounded border overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b">
          <img src={assets.list_icon} alt="List Icon" />
          <p className="font-semibold text-gray-700">Đơn hàng mới nhất</p>
        </div>

        <div className="divide-y">
          {latestOrders.length ? (
            latestOrders.map((item, index) => {
              const product = item.product || {};
              const customer = item.customer || {};
              return (
                <div
                  key={item._id || index}
                  className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50"
                >
                  <img
                    className="rounded w-12 h-12 object-cover bg-gray-100"
                    src={product.image || assets.product_icon}
                    alt={product.name || 'Sản phẩm'}
                  />

                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {customer.name || 'Khách lẻ'}
                    </p>
                    <p className="text-gray-500">
                      {formatDate(item.orderDate || item.createdAt)}
                    </p>
                  </div>

                  <div className="text-right text-sm text-gray-600">
                    <p className="font-semibold">
                      {formatCurrency(item.totalAmount)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {product.name || 'Không xác định'}
                    </p>
                  </div>

                  {renderStatus(item.status)}
                </div>
              );
            })
          ) : (
            <p className="px-6 py-8 text-center text-sm text-gray-500">
              Chưa có đơn hàng nào trong 24 giờ qua.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
