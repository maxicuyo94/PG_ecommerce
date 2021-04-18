import React from "react";
import { Nav } from "../Nav/Nav";
import { Footer } from "../Footer/Footer";
import styles from "./layout.module.scss";

function Layout({ children, priority }) {
  return (
    <div className={styles.containter}>
      <main>
        <Nav priority={priority} />
        {children}
        <Footer priority={priority} />
      </main>
    </div>
  );
}

export default Layout;
