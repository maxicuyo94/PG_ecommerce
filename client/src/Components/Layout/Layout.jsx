import React from 'react'
import styles from './layout.module.scss'
import { Nav } from '../Nav/Nav'
import { Footer } from '../Footer/Footer'


function Layout({ children }) {
    return (
        <div className={styles.containter}>
            <Nav />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
