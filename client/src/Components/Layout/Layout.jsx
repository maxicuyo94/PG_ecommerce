import React from "react";
import { Route } from 'react-router-dom'
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import Whatsapp from "../Whatsapp/Whatsapp";
import { MyChatbot } from '../ChatBot/ChatBot';
import styles from "./layout.module.scss";
import { Banner2 } from '../Banner/Banner'
import { Header } from '../Header/Header'
import AppBar from '../Nav/AppBar'

function Layout({ children, priority, dark }) {
  return (
    <div className={dark ? styles.containerDark : styles.container}>
      <div className={styles.redes}>
        <Whatsapp />
        <MyChatbot />

      </div>
      <div className={styles.nav}>
        <AppBar priority={priority} dark={dark} />
      </div>
      <main>
        <Route exact path="/" render={() => <Banner2 />} />
        {/* <Header></Header> */}
        {/* <Nav priority={priority} dark={dark}/> */}
        <div className={styles.contents}>
          {children}
        </div>
        <Footer priority={priority} dark={dark} />
      </main>
    </div>
  );
}

export default Layout;
