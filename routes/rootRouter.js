const { Router } = require("express");
const rootController=require('../controllers/rootController')

const rootRouter = Router();

rootRouter.get("/", rootController.getMessages);

module.exports = rootRouter;