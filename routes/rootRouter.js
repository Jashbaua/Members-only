const { Router } = require("express");
const { validateSignUp } = require("../middlewares/signupValidator");
const rootController = require("../controllers/rootController");
const auth = require("../middlewares/authentication");

const rootRouter = Router();

rootRouter.get("/", rootController.getMessages);
rootRouter.get("/sign-up", rootController.getSignUp);
rootRouter.post("/sign-up", validateSignUp, rootController.postSignUp);
rootRouter.get("/login", rootController.getLogin);
rootRouter.post("/login", auth.user);
rootRouter.get('/logout',rootController.getLogout)

module.exports = rootRouter;