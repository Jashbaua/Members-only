const { Router } = require("express");
const { validateSignUp,validateMessage } = require("../middlewares/Validation");
const rootController = require("../controllers/rootController");
const auth = require("../middlewares/authentication");

const rootRouter = Router();

rootRouter.get("/", rootController.getIndex);
rootRouter.get("/sign-up", rootController.getSignUp);
rootRouter.post("/sign-up", validateSignUp, rootController.postSignUp);
rootRouter.get("/login", rootController.getLogin);
rootRouter.post("/login", auth.login);
rootRouter.get('/logout',rootController.getLogout)
rootRouter.get('/message',auth.user, rootController.getMessageForm)
rootRouter.post('/message',validateMessage, rootController.postMessageForm)

module.exports = rootRouter;