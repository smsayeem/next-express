import Layout from "../components/layout";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import PropTypes from "prop-types";

const Post = props => {
  const { id, title, body } = props.post;
  return (
    <Layout>
      <p
        style={{ marginLeft: "30px", cursor: "pointer" }}
        onClick={() => Router.back()}
      >
        &#8678;
      </p>
      <div className="container">
        <div>I am single post</div>
        <div>Post Id: {id}</div>
        <div>Post title: {title}</div>
        <div>Post body: {body}</div>
      </div>
    </Layout>
  );
};

Post.getInitialProps = async ({ query }) => {
  // we can check if it is client side or server side
  console.warn("isbrowser", process.browser);
  /**getInitialProps takes 'context' as props and 'query' is one of them.
   * here query = {id : 5} as example
   */
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${query.id}`
  );
  const data = await res.json();
  // it returns 'post' as props.post in the component
  return { post: data };
};
Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string
  })
};
Post.defaultProps = {
  id: null,
  title: "",
  body: ""
};
export default Post;
