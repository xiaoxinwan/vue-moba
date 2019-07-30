module.exports = app => {
  const express = require("express");

  const router = express.Router();

  const Category = require("../../models/Category");

  // 新建分类
  router.post("/categories", async (req, res) => {
    const model = await Category.create(req.body);
    res.send(model);
  });

  // 编辑分类
  router.put("/categories/:id", async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除分类
  router.delete("/categories/:id", async (req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });

  // 获取分类数据
  router.get("/categories", async (req, res) => {
    const items = await Category.find().limit(10);
    res.send(items);
  });

  // 通过id获取分类数据
  router.get("/categories/:id", async (req, res) => {
    const model = await Category.findById(req.params.id);
    res.send(model);
  });

  app.use("/admin/api", router);
};
