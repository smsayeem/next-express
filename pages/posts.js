import Layout from "../components/layout";
import Post from "./post";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import PropTypes from "prop-types";

const Posts = props => {
  //receive the posts from remote API [jsonplaceholder.typicode.com] via getInitialProps
  // console.log("posts props", props.posts);
  const { posts } = props;
  return (
    <Layout>
      <div className="container">
        <div>Please Posts us for more information</div>
        <ul>
          {posts.length &&
            posts.map(post => (
              <li key={post.id}>
                {/* when user click the title of the post, it will take them to the 'post' page.
                Instead of showing actual url, it will show clean url as per 'as' field.
                Note: It is for the client side routing only. We also need to create server side 
                routing from express so that if we refresh the page or directly type the url it can show the particular post. */}
                <Link href={`/post?id=${post.id}`} as={`/post/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
};
Posts.getInitialProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return {
    posts: data
  };
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    })
  )
};
Posts.defaultProps = {
  id: null,
  title: ""
};
export default Posts;
