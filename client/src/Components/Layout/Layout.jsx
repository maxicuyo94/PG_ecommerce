import React from "react";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import styles from "./layout.module.scss";
import Whatsapp from "../Whatsapp/Whatsapp";
import {Banner2} from '../Banner/Banner'
import {Header} from '../Header/Header'

function Layout({ children, priority, dark }) {
  return (
    <div className={dark ? styles.containerDark : styles.container}>
    <Whatsapp/>
      <main>
        {/* <Header></Header> */}
        <Nav priority={priority} dark={dark}/>
        <Banner2></Banner2>
        {children}
        <Footer priority={priority}  dark={dark} />
      </main>
    </div>
  );
}

export default Layout;
