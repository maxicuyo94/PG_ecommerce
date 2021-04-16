import React from "react";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import styles from "./layout.module.scss";

function Layout({ children, priority }) {
  return (
    <div className={styles.containter}>
      <Nav priority={priority}/>
      <main>{children}</main>
      <Footer priority={priority}/>
    </div>
  );
}

export default Layout;
