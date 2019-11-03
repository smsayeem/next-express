/**
 * Custom Express Configuration with next.js
 */

const next = require("next");
const express = require("express");

const port = parseInt(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * app (next.js) will prepare our server with express and then
 * wrap express application inside next
 */
app
  .prepare()
  .then(() => {
    const server = express();
    /**
     * This will override the default '/about' next js route and when user goes to '/about'
     * it will serve index.js because route '/' which we are rendering in app.render() belongs to index.js
     * Following route is for the post route if user refresh the page or enter url manually.
     * we pull out the post id from 'req' and render it as '/post/{id:1}' so that it will be
     * availble in the getInitialProps as contex.query.id in the post component
     */
    server.get("/post/:id", (req, res) => {
      const postId = parseInt(req.params.id);
      const queryParams = { id: postId };
      app.render(req, res, "/post", queryParams);
    });
    /**
     * Wrapping express app inside next will allow us to create routes by using
     * express.js function inside of the next.js build
     *
     * '*' means all routes which are not explicit, use this route for them.
     * if express doesnt have any specific route, next will handle it.
     */
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) {
        throw err;
      } else {
        console.log(`>Our app is Ready on http://localhost:${port}`);
      }
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
