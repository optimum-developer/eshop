import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import {
  getAllOrdersOfAllUsers,
  getProductListFromOrderList,
} from "../redux/actions/order";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const { allOrders, productList } = useSelector((state) => state.order);
  const [data, setData] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const dispatch = useDispatch();

  const filterByCategory = allProducts
    ?.map((product) => product.category)
    .filter((e, index, arr) => arr.indexOf(e) == index)
    .sort();


  const selectProductByCategory = (option) => {
    setSelectedValues((prevSelectedValues) => {
      const updatedSelectedValues = prevSelectedValues.includes(option)
        ? prevSelectedValues.filter((val) => val !== option)
        : [...prevSelectedValues, option];
      const filteredData = allProducts.filter((product) =>
        updatedSelectedValues.includes(product.category)
      );
      filteredData.length === 0 ? setData(allProducts) : setData(filteredData);

      return updatedSelectedValues;
    });
  };
  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [allProducts]);

  useEffect(() => {
    dispatch(getAllOrdersOfAllUsers());
    dispatch(getProductListFromOrderList());
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <input
            type="range"
            className="max"
            min="126"
            max="895"
            // value="416"
          ></input>
          <br />
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Category
          </h3>
          {filterByCategory.map((option, i) => (
            <ul
              key={i}
              className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    id="vue-checkbox"
                    type="checkbox"
                    checked={selectedValues.includes(option)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={() => selectProductByCategory(option)}
                  />
                  <label
                    htmlFor="vue-checkbox"
                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {option}
                  </label>
                </div>
              </li>
            </ul>
          ))}
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => (
                  <ProductCard
                    data={i}
                    key={index}
                  />
                ))}
            </div>
            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products Found!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
