import React from "react";
import Footer from "../../components/Layout/Footer";
import AdminSettings from "../../components/Admin/AdminSetting";
import DashboardHeader from "../../components/Layout/AdminHeader";
import DashboardSideBar from "../../components/Admin/Layout/AdminSideBar";

const AdminSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <AdminSettings />
      </div>
    </div>
  );
};

export default AdminSettingsPage;
