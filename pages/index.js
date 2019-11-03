import Layout from "../components/layout";
import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";

const Index = props => {
  // console.log("Index props=", props);

  return (
    <Layout>
      Hello world. This is my home page
      <div>Liat of users:</div>
      <div className="container">
        {props.data.map(user => (
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "20rem" }}
            key={user.id}
          >
            <div className="card-header">{user.name}</div>
            <div className="card-body">
              <p className="card-text">{user.website}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

Index.getInitialProps = async context => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const result = await res.json();
  return { data: result };
};
Index.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      website: PropTypes.string
    })
  ).isRequired
};
export default Index;
