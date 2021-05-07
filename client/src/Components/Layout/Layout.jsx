import React, { useEffect, useState } from "react";
import { Route } from 'react-router-dom'
import { Footer } from "../Footer/Footer";
import Whatsapp from "../Whatsapp/Whatsapp";
import { MyChatbot } from '../ChatBot/ChatBot';
import styles from "./layout.module.scss";
import { Banner2 } from '../Banner/Banner'
import AppBar from '../Nav/AppBar'

import { ThemeProvider } from "@material-ui/styles";
import theme from "../../theme";
import darkTheme from "../../themeDark";




function Layout({ children, priority, dark }) {

  const [themeChoosen, setIsDark] = useState(theme)

  useEffect(() => {
    if(dark) {
      setIsDark(darkTheme)
    } else {
      setIsDark(theme)
    }
  }, [dark])

  return (
    <ThemeProvider theme={themeChoosen}>
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
    </ThemeProvider>
  );
}

export default Layout;
