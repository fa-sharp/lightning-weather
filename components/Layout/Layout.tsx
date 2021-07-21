import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import styles from "./Layout.module.scss";

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.pageContainer}>
            <Head>
                <title>Lightning Weather</title>
                <meta name="description" content="A little weather app" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"></link>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {children}
            <Footer />
        </div>
    );
}


export default Layout;