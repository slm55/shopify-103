import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
app.use(cookieParser("islamsecret"));
app.use(express.json());
app.use(session({
  secret: "islamsecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 * 60
  }
}))


app.get("/", (req, res) => {
  console.log(req.cookies)
  console.log(req.session)
  console.log(req.sessionID)
  res.cookie("visited", true, { maxAge: 60000 });
  res.send("Hello World!");
});

const appStart = () => {
  try {
    app.listen(8000, () => {
      console.log(`Server running on port 8000`);
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

appStart();
