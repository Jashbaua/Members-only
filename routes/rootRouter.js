const { Router } = require("express");
const {validateSignUp}=require('../middlewares/signupValidator')
const rootController=require('../controllers/rootController')

const rootRouter = Router();

rootRouter.get("/", rootController.getMessages);
rootRouter.get("/sign-up", rootController.getSignUp);
rootRouter.post("/sign-up", validateSignUp, rootController.postSignUp);

module.exports = rootRouter;