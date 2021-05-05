import React from "react";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import Whatsapp from "../Whatsapp/Whatsapp";
import {MyChatbot} from '../ChatBot/ChatBot';
import styles from "./layout.module.scss";
import {Banner2} from '../Banner/Banner'
import {Header} from '../Header/Header'
import AppBar from '../Nav/AppBar'

function Layout({ children, priority, dark }) {
  return (
    <div className={dark ? styles.containerDark : styles.container}>
      <Whatsapp/>
      <MyChatbot/>
      <main>
        {/* <Header></Header> */}
        {/* <Nav priority={priority} dark={dark}/> */}
        <AppBar priority={priority} dark={dark}/>
        {/* <Banner2></Banner2> */}
        {children}
        <Footer priority={priority}  dark={dark} />
      </main>
    </div>
  );
}

export default Layout;
