import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for <br /> new fashion trends
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
        If you want to stay on top of the fashion trends, then you need to shop for the latest and trendiest topwear from an e-commerce site Flipkart. Check out the amazing collection of topwear for women online and select the ones that suit you the best. Browse through stylish women’s topwear that are offered by popular brands, such as Only, Jockey, U&F, Darzi, Ann Springs, and more. Women can style a trendy tops with jeggings and sandals to nail the perfect casual look. 
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Shop Now
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
