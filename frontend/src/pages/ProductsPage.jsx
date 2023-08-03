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

// import MultiRangeSlider from "../components/multipleRangeSlider/MultiRangeSlider";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [selectedByBrand, setSelectedByBrand] = useState([]);
  const [data, setData] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedByColor, setSelectedByColor] = useState([]);
  const [selectedBySize, setSelectedBySize] = useState([]);
  const price = allProducts?.map((product) => product?.discountPrice);
  const priceRangeArr = price?.sort((a, b) => a - b);

  const filterByCategory = allProducts
    ?.map((product) => product.category)
    .filter((e, index, arr) => arr.indexOf(e) == index)
    .sort();

  const filterByColor = allProducts
    ?.map((product) => product.color)
    .filter((e, index, arr) => arr.indexOf(e) == index)
    .sort();

  const filterBySize = allProducts
    ?.map((product) => product.size)
    .filter((e, index, arr) => arr.indexOf(e) == index)
    .sort();

  const filterByBrand = allProducts
    ?.map((product) => product.brand)
    .filter((e, index, arr) => arr.indexOf(e) == index)
    .sort();

  // const selectProductByCategory = (option) => {
  //   setSelectedValues((prevSelectedValues) => {
  //     const updatedSelectedValues = prevSelectedValues.includes(option)
  //       ? prevSelectedValues.filter((val) => val !== option)
  //       : [...prevSelectedValues, option];
  //     const filteredData = allProducts.filter((product) =>
  //       updatedSelectedValues.includes(product.category)
  //     );

  //     filteredData.length === 0 ? setData(allProducts) : setData(filteredData);

  //     return updatedSelectedValues;
  //   });
  // };

  const selectProductByType = (option, name, setType) => {
    setType((prevSelectedValues) => {
      const updatedSelectedValues = prevSelectedValues.includes(option)
        ? prevSelectedValues.filter((val) => val !== option)
        : [...prevSelectedValues, option];
      let filterAttribute;
      if (name === "Color") {
        filterAttribute = [
          ...updatedSelectedValues,
          ...selectedByBrand,
          ...selectedBySize,
          categoryData ? categoryData : "",
        ];
      } else if (name === "Size") {
        filterAttribute = [
          ...selectedByColor,
          ...updatedSelectedValues,
          ...selectedByBrand,
          categoryData ? categoryData : "",
        ];
      } else {
        filterAttribute = [
          ...selectedByColor,
          ...selectedBySize,
          ...updatedSelectedValues,
          categoryData ? categoryData : "",
        ];
      }

      const renderByFilter = allProducts.filter((product, index) => {
        return (
          ((name === "Color" ? updatedSelectedValues : selectedByColor)
            .length !== 0
            ? filterAttribute.includes(product.color)
            : true) &&
          ((name === "Brand" ? updatedSelectedValues : selectedByBrand)
            .length !== 0
            ? filterAttribute.includes(product.brand)
            : true) &&
          ((name === "Size" ? updatedSelectedValues : selectedBySize).length !==
          0
            ? filterAttribute.includes(product.size)
            : true) &&
          (categoryData ? filterAttribute.includes(product.category) : true)
        );
      });

      filterAttribute.length === 0
        ? setData(allProducts)
        : setData(renderByFilter);

      return updatedSelectedValues;
    });
  };

  const filterTag = [
    {
      name: "Color",
      category: filterByColor,
      selectedByCategory: selectedByColor,
      setType: setSelectedByColor,
    },
    {
      name: "Size",
      category: filterBySize,
      selectedByCategory: selectedBySize,
      setType: setSelectedBySize,
    },
    {
      name: "Brand",
      category: filterByBrand,
      selectedByCategory: selectedByBrand,
      setType: setSelectedByBrand,
    },
  ];

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    //  window.scrollTo(0,0);
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
          {false && (
            <input
              type="range"
              className="max"
              min="126"
              max="895"
              // value="416"
            ></input>
          )}

          <br />
          <div className="main-product-container flex flex-row justify-between px-4 gap-8">
            <div className="filter-container justify-center justify-items-center content-center">
              {false && (
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-dark">
                  Category
                </h3>
              )}
              {false &&
                filterByCategory.map((option, i) => (
                  <ul
                    key={i}
                    className="w-48 text-sm font-medium text-gray-900 bg-white border border-red-200 rounded-lg  dark:border-gray-600 dark:text-white"
                  >
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="vue-checkbox"
                          type="checkbox"
                          checked={selectedValues.includes(option)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          // onChange={() => selectProductByCategory(option)}
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
              {/* <MultiRangeSlider
                min={priceRangeArr[0]}
                max={priceRangeArr[priceRangeArr.length - 1]}
                onChange={({ min, max }) => {
                  // console.log(`min = ${min}, max = ${max}`);
                  selectProductByRange(min, max);
                }}
              /> */}
              {filterTag.map((el) => (
                <div
                  className="w-48 flex flex-col   bg-white px-4 py-2 text-gray-400 hover:text-gray-500 rounded"
                  key={el.name}
                >
                  <span className="font-medium text-gray-900 pb-4">
                    {el.name}
                  </span>
                  {el.category.map((option, i) => (
                    <div className="mb-2" key={i}>
                      <div className="flex items-center">
                        <input
                          id="vue-checkbox"
                          type="checkbox"
                          checked={el.selectedByCategory.includes(option)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={() =>
                            selectProductByType(option, el.name, el.setType)
                          }
                        />

                        <label
                          htmlFor="vue-checkbox"
                          className="ml-3 min-w-0 flex-1 text-gray-500"
                        >
                          {option}
                        </label>
                      </div>
                    </div>
                  ))}
                  <hr className="border-gray-300 mt-4" />
                </div>
              ))}
            </div>
            <div className={`${styles.section}`}>
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12">
                {data &&
                  data.map((i, index) => <ProductCard data={i} key={index} />)}
              </div>
              {data && data.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products Found!
                </h1>
              ) : null}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
