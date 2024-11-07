import React from "react";
import style from "./AboutUs.module.css";
import Text from "../../../common/components/Text";

const AboutUs = () => {
  return (
    <div className={style.aboutUs}>
      <div className={style.wrap}>
        <div className={style.main}>
          <div className={style.main_header}>
            <Text className={style.main_title} tag="h2" weight="medium">
              About the company
            </Text>
            <Text
              className={style.main_subtitle}
              color="accent"
              weight="medium"
              tag="h3"
            >
              Welcome to our website!
            </Text>
          </div>
          <div className={style.main_content}>
            <Text
              maxLines={10}
              weight="medium"
              tag="h3"
              color="primary"
              className={style.main_desc}
            >
              &ensp; Lalasia is online store that provides its customers with
              more than 100 million product items in 20 categories, including:
              electronics, household appliances, goods for home and garden,
              repairs, sports and recreation, beauty and health, clothing and
              shoes, food, books, multimedia, DVDs, software, games, music,
              antiques and others.,
              <br />
              <br />
              &ensp; It ranks sixth in the list of the most valuable companies
              on the Russian Internet according to the Russian Forbes (in
              February 2016, the magazine estimated the company’s value at $680
              million).
            </Text>
            <img
              className={style.main_img}
              src="https://www.ivd.ru/images/cache/2023/10/7/widen_600_crop_650_832_0_0_q90_3169192_f06d0d3eb1fcffbdaff18d818.png"
              alt=""
            />
          </div>
          <div className={style.main_footer}>
            <Text color="secondary" tag="h3">
              <Text color="primary" tag="h2">
                100 millions
              </Text>
              of goods
            </Text>
            <Text color="secondary" tag="h3">
              <Text color="primary" tag="h2">
                29 millions
              </Text>
              active buyers
            </Text>
            <Text color="secondary" tag="h3">
              <Text color="primary" tag="h2">
                1000
              </Text>
              awards
            </Text>
          </div>
        </div>
      </div>
      <div className={style.aboutUs_frame}></div>
    </div>
  );
};

export default AboutUs;
