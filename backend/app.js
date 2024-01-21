const Koa = require("koa");
const Router = require("koa-router");
const ngrok = require("@ngrok/ngrok");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet");
// const sslify = require("koa-sslify").default;
const db = require("./db"); // Import the SQLite database connection module

// Load environmental variables
require("dotenv").config();

// Establish ngrok connection
(async function () {
  // Establish connectivity
  const listener = await ngrok.forward({
    addr: process.env.PORT,
    domain: process.env.NGROK_STATIC_DOMAIN,
    authtoken: process.env.NGROK_AUTH_TOKEN,
    // basic_auth: `${process.env.NGROK_BASIC_AUTH_USERNAME}:${process.env.NGROK_BASIC_AUTH_PASSWORD}`,
  });

  // Output ngrok url to console
  console.log(`Ingress established at: ${listener.url()}`);
})();

// Create a texts table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS texts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender_phone_number TEXT,
        message_body TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

const app = new Koa();
const router = new Router();

// Use SSL/TLS
// app.use(sslify());

// Use helmet for general security headers
app.use(helmet());

// Use body parser middleware
app.use(bodyParser());

// Sanitize inputs
const sanitizeInputsMiddleware = async (ctx, next) => {
  // Sanitize and validate inputs
  ctx.request.body.From = sanitizePhoneNumber(ctx.request.body.From);
  ctx.request.body.Body = sanitizeTextMessage(ctx.request.body.Body);

  // Continue to the next middleware or route
  await next();
};

// Endpoint to handle incoming SMS
router.post("/sms", sanitizeInputsMiddleware, async (ctx) => {
  const { From, Body } = ctx.request.body;

  if (From === "+16266228188")
    // Store the received text in the SQLite database
    db.run(
      "INSERT INTO texts (sender_phone_number, message_body) VALUES (?, ?)",
      [From, Body],
      (err) => {
        if (err) {
          console.error("Error inserting into database:", err.message);
          ctx.status = 500;
          ctx.body = "Internal Server Error";
        } else {
          console.log("Text stored in database:", Body);
          ctx.body = "Text received and stored successfully.";
        }
      }
    );
});

// Use the router middleware
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
