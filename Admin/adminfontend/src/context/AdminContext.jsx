import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  // Dữ liệu quản lý
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (aToken) {
      getAllProducts();
      getAllOrders();
      getAllUsers();
      getDashData();
    }
  }, [aToken]);

  // 🔹 Lấy tất cả sản phẩm
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/products`, {
        headers: { aToken },
      });
      if (data.success) {
        setProducts(data.products);
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách sản phẩm.");
    }
  };

  // 🔹 Lấy tất cả đơn hàng
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/orders`, {
        headers: { aToken },
      });
      if (data.success) {
        setOrders(data.orders);
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách đơn hàng.");
    }
  };

  // 🔹 Lấy danh sách người dùng
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/users`, {
        headers: { aToken },
      });
      if (data.success) {
        setUsers(data.users);
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách người dùng.");
    }
  };

  // 🔹 Xóa sản phẩm
  const deleteProduct = async (productId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/admin/product/${productId}`, {
        headers: { aToken },
      });
      if (data.success) {
        toast.success("Đã xóa sản phẩm!");
        getAllProducts();
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi khi xóa sản phẩm.");
    }
  };

  // 🔹 Cập nhật trạng thái đơn hàng
  const updateOrderStatus = async (orderId, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/update-order-status`,
        { orderId, status },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success("Cập nhật trạng thái thành công!");
        getAllOrders();
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Không thể cập nhật đơn hàng.");
    }
  };

  // 🔹 Lấy dữ liệu Dashboard
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData);
      } else toast.error(data.message);
    } catch (err) {
      toast.error("Không thể tải dữ liệu thống kê.");
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,

    // Products
    products,
    getAllProducts,
    deleteProduct,

    // Orders
    orders,
    getAllOrders,
    updateOrderStatus,

    // Users
    users,
    getAllUsers,

    // Dashboard
    dashData,
    getDashData,
    

  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
