import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { useState } from "react";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
      });
  }, []);
  // console.log("selected", selected);
  const handleOnApproval = async (e, id, email, name) => {
    const { value } = e.target;
    setSelected((prev) => ({ ...prev, [id]: value }));

    try {
      axios
        .put(
          `${server}/product/update-approval-status`,
          {
            id,
            value,
            email,
            name,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setData(res?.data?.products);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "approval",
      headerName: "Approval",
      type: "string",
      minWidth: 100,
      flex: 0.6,
      renderCell: (params) => {
        const { id } = params;
        const { customData } = params.row;
        const { email, name } = params.row.customData.shop;

        return (
          <>
            {/* <p>{selected[id] || customData.approval}</p> */}
            <select
              value={selected[id] || customData.approval}
              onChange={(e) => handleOnApproval(e, id, email, name)}
              className={`${
                (selected[id] || customData.approval) === "approved"
                  ? "bg-green-600"
                  : (selected[id] || customData.approval) === "pending"
                  ? "bg-[#e9b430]"
                  : "bg-red-600"
              } h-8 w-24 drop-shadow-md
              flex justify-center items-center p-2 rounded-sm font-bold text-white`}
            >
              <option value="pending py-2">Pending</option>
              <option value="approved py-2">Approved</option>
              <option value="rejected py-2">Rejected</option>
            </select>
          </>
        );
      },
    },
    {
      field: "Preview",
      flex: 0.5,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
    data?.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
        customData: item,
      });
    });
  // console.log({ data });
  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </>
  );
};

export default AllProducts;
