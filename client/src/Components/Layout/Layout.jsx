import React from "react";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import styles from "./layout.module.scss";

function Layout({ children }) {
  return (
    <div className={styles.containter}>
      <Nav />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
