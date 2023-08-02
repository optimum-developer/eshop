import React from "react";
import DashboardHeader from "../../components/Layout/AdminHeader";
import DashboardSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminCoupan from "../../components/Layout/AdminCoupan";
const AdminCoupanPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AdminCoupan />
        </div>
      </div>
    </div>
  );
};

export default AdminCoupanPage;
