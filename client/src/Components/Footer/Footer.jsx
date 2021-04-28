import React from "react";
import style from "./footer.module.scss";
import { useTranslation } from "react-i18next";
import SimpleReactFooter from "simple-react-footer";

export function Footer() {
  const [t, i18n] = useTranslation("global");
  const description = "We are an ecommerce dedicated to the sell of hardwares and differents computer parts ";
  const title = "TechStore";
  const columns = [
    {
        title: "Resources",
        resources: [
            {
                name: "About",
                link: "/about"
            },
            {
                name: "Careers",
                link: "/careers"
            },
            {
                name: "Contact",
                link: "/contact"
            },
            {
                name: "Admin",
                link: "/admin"
            }
        ]
    },
    {
        title: "Legal",
        resources: [
            {
                name: "Privacy",
                link: "/privacy"
            },
            {
                name: "Terms",
                link: "/terms"
            }
        ]
    },
    {
        title: "Visit",
        resources: [
            {
                name: "Locations",
                link: "/locations"
            },
            {
                name: "Culture",
                link: "/culture"
            }
        ]
    }
 ];
  return (
    <div className={style.container}>
<SimpleReactFooter 
    description={description} 
    title={title}
    columns={columns}
    linkedin="fluffy_cat_on_linkedin"
    facebook="fluffy_cat_on_fb"
    twitter="fluffy_cat_on_twitter"
    instagram="fluffy_cat_live"
    youtube="UCFt6TSF464J8K82xeA?"
    pinterest="fluffy_cats_collections"
    copyright="black"
    iconColor="black"
    // backgroundColor="bisque"
    fontColor="white"
    copyrightColor="darkgrey"

    backgroundColor='#222'
 />
    </div>
  );
}
