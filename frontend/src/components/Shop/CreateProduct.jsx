import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import {
  categoriesData,
  colorList,
  brandList,
  sizeList,
} from "../../static/data";

import { toast } from "react-toastify";
import { backend_url } from "../../server";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { allProducts, success, error } = useSelector(
    (state) => state.products
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [asin, setAsin] = useState(null);

  const [newForm, setNewForm] = useState(true);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [existingData, setExistingData] = useState({});
  const [searchList, setSearchList] = useState(allProducts);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    console.log("create product files", files);

    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    console.log("handle on submit", typeof asin);
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("color", color);
    newForm.append("size", size);
    newForm.append("brand", brand);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("asin", asin);

    dispatch(createProduct(newForm));
  };
  const handleOnFormChange = (e, isTrue) => {
    console.log({ isTrue });
    setNewForm(isTrue);
    setVisible(false);
    setSearch("");
  };

  const handleOnCreateExisting = (e) => {
    e.preventDefault();
    console.log("handleOnCreateExisting");
    const newForm = new FormData();
    console.log(existingData);
    const {
      images,
      name,
      description,
      category,
      tags,
      color,
      size,
      brand,
      asin,
    } = existingData;

    console.log({ images });

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("color", color);
    newForm.append("size", size);
    newForm.append("brand", brand);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("asin", asin);

    for (var pair of newForm.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(createProduct(newForm));
  };

  const handleOnSelect = (e, product) => {
    const { value } = e.target;
    console.log({ product });
    setExistingData(product);
    setSearch(product.name);
    setVisible(false);
  };

  const handleOnSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    setVisible(true);
    const filterList = allProducts.filter((e) =>
      e.name.toLowerCase().includes(value)
    );
    setSearchList(filterList);
    console.log("length", filterList.length);

    // if (!filterList.length) {
    //   setSearchList("");
    // }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Escape") setVisible(false);
  };
  useEffect(() => {
    document.addEventListener("keydown", handleOnKeyPress);

    return () => document.removeEventListener("keydown", handleOnKeyPress);
  }, []);

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-6 overflow-y-scroll">
      <h5 className="font-mono font-semibold text-[30px] font-Poppins text-center mb-4">
        CREATE PRODUCT
      </h5>
      {/* create product form */}
      <div className="flex pl-4 gap-8">
        <div>
          <input
            id="draft"
            type="radio"
            name="status"
            checked={newForm}
            onChange={(e) => {
              handleOnFormChange(e, true);
            }}
          />
          <label for="draft" className="ml-2"></label>
          New
        </div>
        <div>
          <input
            id="published"
            type="radio"
            name="status"
            checked={!newForm}
            onChange={(e) => {
              handleOnFormChange(e, false);
            }}
          />
          <label for="published" className="ml-2">
            Existing
          </label>
        </div>
      </div>
      {newForm ? (
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label className="pb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your product name..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              cols="30"
              required
              rows="8"
              type="text"
              name="description"
              value={description}
              className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your product description..."
            ></textarea>
          </div>
          <br />
          <div>
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Choose a category">Choose a category</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option value={i.title} key={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div>
            <label className="pb-2">Tags</label>
            <input
              type="text"
              name="tags"
              value={tags}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter your product tags..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Brand <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="Select">Select</option>
              {brandList &&
                brandList.map((brandName, index) => (
                  <option value={brandName} key={index}>
                    {brandName}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <br />
          <div>
            <label className="pb-2">
              Color <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="Select">Select</option>
              {colorList &&
                colorList.map((colorName, index) => (
                  <option value={colorName} key={index}>
                    {colorName}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <br />
          <div>
            <label className="pb-2">
              Size <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="Select">Select</option>
              {sizeList &&
                sizeList.map((size, index) => (
                  <option value={size} key={index}>
                    {size}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div>
            <label className="pb-2">Original Price</label>
            <input
              type="number"
              name="price"
              value={originalPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter your product price..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Price (With Discount) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={discountPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Enter your product price with discount..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={stock}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter your product stock..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Upload Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name=""
              id="upload"
              className="hidden"
              multiple
              onChange={handleImageChange}
            />
            <div className="w-full flex items-center flex-wrap">
              <label htmlFor="upload">
                <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
              </label>
              {images &&
                images.map((i) => (
                  <img
                    src={URL.createObjectURL(i)}
                    key={i}
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                ))}
            </div>
            <br />
            <div>
              <input
                type="submit"
                value="Create"
                className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="p-6">
          <form
            className="text-gray-600 text-sm"
            onSubmit={handleOnCreateExisting}
          >
            <br />
            <div className="mb-4 w-full relative">
              <label className=" py-8 w-full ">Select Product</label>
              <input
                className="px-2 py-2 border border-slate-300 w-full flex items-center gap-2"
                type="text"
                value={search}
                onChange={(e) => handleOnSearch(e)}
              />
              {/* {search.productImage && (
                  <img
                    className="w-7 h-7"
                    src={`${backend_url}/${search.productImage}`}
                  />
                )} */}
              {/* <p className="self-center">{search.productName}</p> */}
              {visible && (
                <ul className="absolute top-18 bg-white w-full left-0 h-[250px] overflow-y-scroll cursor-pointer">
                  {searchList.map((product) => (
                    <li
                      className="flex gap-2 px-2 py-2 border border-slate-50 "
                      onClick={(e) => handleOnSelect(e, product)}
                    >
                      <img
                        className="w-10"
                        src={`${backend_url}/${product.images[0]}`}
                      />
                      <p>{product.name}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mb-4">
              <label className=" py-4 w-full">Original Price</label>
              <br />
              <input
                className="px-2 py-2 border border-slate-300 w-full"
                type="text"
                placeholder="Enter your product price"
                onChange={(e) => setOriginalPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="py-4 w-full">Price (With Discount) *</label>
              <br />
              <input
                className="px-2 py-2 border border-slate-300 w-full"
                type="text"
                placeholder="Enter your product price with discount"
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>
            <div className="mb-12">
              <label className=" py-4 w-full">Product Stock *</label>
              <br />
              <input
                className="px-2 py-2 border border-slate-300 w-full"
                type="text"
                placeholder="enter stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="">
              <input
                className="font-bold px-2 py-2 border border-slate-300 w-full cursor-pointer"
                type="submit"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
