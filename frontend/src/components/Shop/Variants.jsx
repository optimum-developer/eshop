import { useEffect, useState } from "react";
import { sizeList, colorList } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Variants = () => {
  const [variants, setVariants] = useState([]);
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  const handleOnImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    console.log({ files });

    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setVariants((prev) => [
      ...prev,
      {
        size,
        color,
        price,
        discount,
        stock,
        images,
      },
    ]);
  };

  console.log({ images });
  return (
    <div className="w-full h-screen flex flex-col justify-center align-content-center items-center">
      <form className="p-8 " onSubmit={handleOnSubmit}>
        <h1 className="text-2xl fw-bold mb-8">Create new variants</h1>
        <div className="flex mdflex-col mb-4 gap-10">
          <div className="flex flex-col">
            <label for="size" className="text-sm text-gray-400 py-2">
              Size
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="text-sm px-2 py-2 w-52 bg-white"
            >
              <option>select size</option>
              {sizeList.map((size, i) => (
                <option key={i} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label for="color" className="text-sm text-gray-400 py-2">
              Color
            </label>
            <select
              id="color"
              className="text-sm px-2 py-2 bg-white w-52"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option>select color</option>
              {colorList.map((colour, i) => (
                <option key={i} value={colour}>
                  {colour}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex mb-4 gap-10">
          <div className="flex flex-col">
            <label for="price" className="text-sm text-gray-400 py-2">
              Price
            </label>
            <input
              id="price"
              className="text-sm px-2 py-2 bg-white w-52"
              placeholder="enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label for="discount" className="text-sm text-gray-400 py-2">
              Discount Price
            </label>
            <input
              id="discount"
              className="text-sm px-2 py-2 bg-white w-52"
              placeholder="enter discount price"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </div>
        <div className="flex mb-4 gap-10">
          <div className="flex flex-col">
            <label for="stock" className="text-sm text-gray-400 py-2">
              Stock
            </label>
            <input
              id="stock"
              className="text-sm px-2 py-2 bg-white w-52"
              placeholder="enter stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label for="image" className="text-sm text-gray-400 py-2">
              Upload Image
            </label>
            <input
              id="upload"
              type="file"
              className="text-sm px-2 py-2 bg-white w-52"
              placeholder="enter discount price"
              multiple
              onChange={handleOnImageChange}
            />
          </div>
        </div>
        <div className="w-[70%] flex gap-1 items-center flex-wrap">
          <label htmlFor="upload">
            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
          </label>
          {images &&
            images.map((i) => (
              <img
                src={URL.createObjectURL(i)}
                key={i}
                alt="variant image"
                className="h-[120px] w-[120px] object-cover m-2"
              />
            ))}
        </div>
        <div className="flex mb-4 gap-10 w-full">
          <div className="flex border border-gray-300 rounded-md overflow-hidden w-full justify-center">
            <input
              id="image"
              type="submit"
              className="text-sm px-2 py-2 bg-white w-full cursor-pointer"
              placeholder="enter discount price"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Variants;
