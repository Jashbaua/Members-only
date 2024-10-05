const express = require("express");
const rootRouter = require("./routes/rootRouter");
const session = require("express-session");
const passport = require("./config/passport");
const pgSession = require("connect-pg-simple")(session);
const pgPool = require("./db/pool");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		store: new pgSession({
			pool: pgPool,
			tableName: "user_sessions",
			createTableIfMissing: true,
		}),
		secret: "cats",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		},
	})
);
app.use(passport.session());
app.use("/", rootRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));
