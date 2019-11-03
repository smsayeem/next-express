import Nav from "./nav";
import "../styles/Style.css";
import Head from "next/head";
import PropTypes from "prop-types";

const Layout = props => {
  return (
    <div>
      <Head>
        <title>Sayeem Next.js</title>
        <link
          rel="stylesheet"
          href="https://bootswatch.com/4/darkly/bootstrap.min.css"
        />
      </Head>
      <Nav />
      {props.children}
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
