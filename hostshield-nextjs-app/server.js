const srv = { https: require('https'), http: require('http') };
const fs = require('fs');
const { parse } = require('url');
const next = require('next');
const app = next({});
const handle = app.getRequestHandler();

const listener = function(req, res) {
  // Be sure to pass `true` as the second argument to `url.parse`.
  // This tells it to parse the query portion of the URL.
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === '/a') { app.render(req, res, '/a', query) }
  else if (pathname === '/b') { app.render(req, res, '/b', query) }
  else { handle(req, res, parsedUrl) }
};


app.prepare().then(() => {
  if (fs.existsSync('ssl/privkey.pem') && fs.existsSync('ssl/fullchain.pem')) {
    srv.https.createServer({
      key: fs.readFileSync("ssl/privkey.pem"),
      cert: fs.readFileSync("ssl/fullchain.pem")
    }, listener).listen(443, (err) => {
      if (err) { throw err; }
      console.log('> Ready on port 443');
    });
  } else {
    srv.http.createServer({}, listener).listen(80, (err) => {
      if (err) { throw err; }
      console.log('> Ready on port 80');
    });
  }
});

// stupid comment was left in the end of this file just for fun