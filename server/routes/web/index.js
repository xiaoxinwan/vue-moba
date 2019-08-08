module.exports = app => {
  const router = require("express").Router();
  const mongoose = require("mongoose");
  const Article = mongoose.model("Article");
  const Category = mongoose.model("Category");

  router.get("/news/init", async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻资讯"
    });

    const cats = await Category.find()
      .where({
        parent: parent
      })
      .lean();
    const newsTitles = [
      "针对不法组织恶意冒用王者荣耀商户特权牟利的严正声明",
      "王者首个共创玩法 | 峡谷英雄听我指挥，沙盘竞赛胜者为王",
      "Hero久诚在线解析干将莫邪玩法",
      "2019Chinajoy王者PK赛，十大明星主播巅峰对决",
      "《王者荣耀》公布 “天工”编辑器，即将上线王者模拟战",
      "8月6日全服不停机更新公告",
      "回城特效音效异常说明公告",
      "净化游戏环境声明及处罚公告（7月30日-8月5日）",
      "8月6日外挂专项打击公告",
      "8月6日“演员”惩罚名单",
      "峡谷喜迎七夕节 大波福利来袭",
      "【七夕峡谷游】活动公告",
      "世界冠军杯 集卡赢壕礼活动公告",
      "炎炎夏日全新活动周 峡谷激战得好礼",
      "助力世冠赛 心愿单升级回馈公告",
      "8月6日【比赛服】版本更新公告",
      "世冠总决赛看点揭秘，多重观赛惊喜邀你8月10日相聚深圳！",
      "你是赛评师：eStarPro强势进军世冠总决赛，深圳遭遇RW胜率有多少？",
      "第二周五省齐开战，王者荣耀城市赛省赛进行中！",
      "世冠四强出炉 8月2日半决赛拉开战幕"
    ];
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);

      return {
        categories: randomCats.slice(0, 2),
        title: title
      };
    });
    await Article.deleteMany({});
    await Article.insertMany(newsList);

    res.send(newsList);
  });

  router.get("/news/list", async (req, res) => {
    // const parent = await Category.findOne({
    //   name: '新闻资讯'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()

    const parent = await Category.findOne({
      name: "新闻资讯"
    });

    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "categories",
          as: "newsList"
        }
      },
      {
        $addFields: {
          newsList: { $slice: ["$newsList", 5] }
        }
      }
    ]);

    const subCats = cats.map(v => v._id);
    cats.unshift({
      name: "热门",
      newsList: await Article.find()
        .where({
          categories: { $in: subCats }
        })
        .populate("categories")
        .limit(5)
        .lean()
    });

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName =
          cat.name === "热门" ? news.categories[0].name : cat.name;
      });
    });

    res.send(cats);
  });

  app.use("/web/api", router);
};
