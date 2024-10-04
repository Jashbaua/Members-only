const { Router } = require("express");
const rootController=require('../controllers/rootController')

const rootRouter = Router();

rootRouter.get("/", rootController.getMessages);
rootRouter.get("/sign-up", rootController.getSignUp);
rootRouter.post("/sign-up", rootController.postSignUp);

module.exports = rootRouter;