const express = require('express');
const router = express.Router();

router.use("/category",require('../apis/category.api'));
router.use("/product",require('../apis/product.api'));
router.use("/file",require('../apis/file.api'));
router.use("/role",require('../apis/role.api'));
router.use("/auth",require('../apis/auth.api'));
router.use("/store",require('../apis/store.api'));

module.exports = router;
