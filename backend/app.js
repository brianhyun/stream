import Koa from "koa";
import util from "util";
import cors from "@koa/cors";
import Router from "koa-router";
import helmet from "koa-helmet";
import ngrok from "@ngrok/ngrok";
import sqlstring from "sqlstring";
// import sslify from "koa-sslify";
import bodyParser from "koa-bodyparser";
import db from "./db.js"; // Import the SQLite database connection module

// Load environmental variables
import "dotenv/config";

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
// app.use(sslify.default());

// Apply CORS middleware
app.use(cors());

// Use helmet for general security headers
app.use(helmet());

// Use body parser middleware
app.use(bodyParser());

// Middleware for phone number verification
const verifyPhoneNumber = async (ctx, next) => {
  const senderPhoneNumber = ctx.request.body.From;

  if (senderPhoneNumber === process.env.TWILIO_REGISTERED_PHONE_NUMBER) {
    await next();
  } else {
    ctx.status = 403; // Forbidden
    ctx.body = "Phone number is not verified.";
  }
};

const sanitizeInput = (input) => {
  return sqlstring.escape(input).replace(/^'|'$/g, "");
};

// Endpoint to retrieve all the texts
const dbAllAsync = util.promisify(db.all.bind(db));

// Endpoint to handle incoming SMS
router.post("/api/sms", verifyPhoneNumber, async (ctx) => {
  const { From, Body } = ctx.request.body;

  if (From === process.env.TWILIO_REGISTERED_PHONE_NUMBER)
    try {
      // Store the received text in the SQLite database
      db.run(
        "INSERT INTO texts (sender_phone_number, message_body) VALUES (?, ?)",
        [sanitizeInput(From), sanitizeInput(Body)],
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
    } catch (error) {
      console.error("Unexpected error:", error.message);
      ctx.status = 500; // Internal Server Error
      ctx.body = "Internal Server Error";
    }
});

router.get("/api/texts", async (ctx) => {
  try {
    try {
      const rows = await dbAllAsync(
        "SELECT * FROM texts ORDER BY timestamp DESC"
      );
      ctx.status = 200;
      ctx.type = "application/json";
      ctx.body = JSON.stringify(rows);
    } catch (err) {
      console.error("Error retrieving data from database:", err.message);
      ctx.status = 500; // Internal Server Error
      ctx.body = "Internal Server Error";
    }
  } catch (error) {
    console.error("Unexpected error:", error.message);
    ctx.status = 500; // Internal Server Error
    ctx.body = "Internal Server Error";
  }
});

// Health check endpoint
router.get("/health", async (ctx) => {
  ctx.status = 200;
  ctx.body = "OK";
});

// Use the router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
