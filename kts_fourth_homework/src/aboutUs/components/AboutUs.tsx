import React from "react";
import style from "./AboutUs.module.css";
import Text from "../../common/components/Text";
import FacebookIcon from "./icons/FacebookIcon";
import TwitterIcon from "./icons/TwitterIcon";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import YoutubeIcon from "./icons/YoutubeIcon";

const AboutUs = () => {
  return (
    <div className={style.aboutUs}>
      <div className={style.main}>
        <Text weight="bold" className={style.header} tag="h1">
          Welcome to our website!
        </Text>
        <div className={style.content}>
          <div className={style.content_info}>
            <Text
              className={style.info_header}
              color="primary"
              weight="medium"
              tag="h3"
            >
              About the company
            </Text>
            <Text
              weight="medium"
              tag="h3"
              color="primary"
              className={style.info_description}
            >
              <span className={style.title}>Lalasia</span> is a leading online
              marketplace offering over 100 million products to meet all your
              needs. From electronics and fashion to home essentials, you’ll
              find everything in one place! Our extensive selection ensures that
              there's something for everyone, no matter your taste or budget.
              <br />
              <br /> With numerous awards for exceptional service and
              innovation, Lalasia ensures a seamless shopping experience. Our
              user-friendly platform provides personalized recommendations and
              secure payment options, making your shopping journey both
              enjoyable and safe.
              <br />
              <br />
              We also prioritize customer feedback, continually improving our
              services to enhance your experience. Join millions of satisfied
              customers and discover why Lalasia is a top choice in e-commerce!
            </Text>
          </div>
          <div className={style.content_img}>
            <img
              className={style.img}
              src="https://www.ivd.ru/images/cache/2023/10/7/widen_600_crop_650_832_0_0_q90_3169192_f06d0d3eb1fcffbdaff18d818.png"
              alt=""
            />
          </div>
        </div>
        <div className={style.footer}>
          <Text color="secondary" tag="h3" className={style.footer_description}>
            <Text color="primary" tag="h2">
              100 millions
            </Text>
            of goods
          </Text>
          <Text color="secondary" tag="h3" className={style.footer_description}>
            <Text color="primary" tag="h2">
              1000
            </Text>
            awards
          </Text>
          <Text color="secondary" tag="h3" className={style.footer_description}>
            <Text color="primary" tag="h2">
              29 millions
            </Text>
            active buyers
          </Text>

          <div className={style.socialIcons}>
            <Text
              color="secondary"
              weight="medium"
              tag="p"
              maxLines={1}
              className={style.socialIcons_description}
            >
              more information
            </Text>
            <div className={style.socialIcons_icons}>
              <TwitterIcon />
              <WhatsAppIcon />
              <YoutubeIcon />
              <FacebookIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
