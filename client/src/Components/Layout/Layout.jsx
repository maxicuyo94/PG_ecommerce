import React from "react";
import Footer from "../Footer/Footer";
import Whatsapp from "../Whatsapp/Whatsapp";
import { MyChatbot } from "../ChatBot/ChatBot";
import styles from "./layout.module.scss";
import AppBar from "../Nav/AppBar";

function Layout({ children, priority, dark }) {
  return (
    <div className={dark ? styles.containerDark : styles.container}>
      <Whatsapp />
      <MyChatbot />
      <main>
        <AppBar priority={priority} dark={dark} />
        {children}
        <Footer priority={priority} dark={dark} />
      </main>
    </div>
  );
}

export default Layout;
