import React from "react";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import styles from "./layout.module.scss";
import Whatsapp from "../Whatsapp/Whatsapp";

function Layout({ children, priority, dark }) {
  return (
    <div className={dark ? styles.containerDark : styles.container}>
    <Whatsapp/>
      <main>
        <Nav priority={priority} dark={dark}/>
        {children}
        <Footer priority={priority}  dark={dark} />
      </main>
    </div>
  );
}

export default Layout;
