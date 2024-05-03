const express = require("express");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const cors = require("cors");
//custem module import
const verifyToken = require("./middleware/verifyToken");
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/pratice")
  .then(() => {
    console.log("db is connected successfully...");
  })
  .catch((err) => {
    console.log(err);
  });

//user schema
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      // required: [true, "username is Mandatory"],
    },
    password: {
      type: String,
      // required: [true, "password is Mandatory"],
      // minLength: [8, "password is must be atleast 8 charcater..."],
    },
    email: {
      type: String,
    },
  }
  // {timestamps:true}
);
const userModel = mongoose.model("users", userSchema);

const foodScehma = mongoose.Schema({
  name: {
    type: String,
  },
  calories: {
    type: Number,
  },
  protein: {
    type: Number,
  },
  carbohydrates: {
    type: Number,
  },
  fats: {
    type: Number,
  },
  fiber: {
    type: Number,
  },
  image: {
    type: String,
  },
});
const foodModel = mongoose.model("foods", foodScehma);

const trackingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foods",
      required: true,
    },
    details: {
      calories: Number,
      protein: Number,
      carbohydrates: Number,
      fats: Number,
      fiber: Number,
    },
    eatenDate: {
      type: String,
      default: new Date().toLocaleDateString(),
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  { timestamps: true }
);
const trackingModel = mongoose.model("trackings", trackingSchema);

//register public end point
app.post("/register", (req, res) => {
  let data = req.body;
  console.log(data);
  bcryptjs.genSalt(10, (err, salt) => {
    if (!err) {
      bcryptjs.hash(data.password, salt, (err, hpassword) => {
        data.password = hpassword;
        userModel
          .create(data)
          .then((info) => {
            res
              .status(200)
              .send({ data: info, message: "Your Registion successful..." });
          })
          .catch((err) => {
            res.status(500).send({ error: "some thing went wrong..." });
          });
      });
    }
  });
});

app.post("/login", (req, res) => {
  let data = req.body;
  userModel
    .findOne({ email: data.email })
    .then((info) => {
      if (info != null) {
        bcryptjs.compare(data.password, info.password, (err, result) => {
          if (!err) {
            if (result == true) {
              jsonwebtoken.sign(
                { email: data.email },
                "saikey",
                (err, token) => {
                  if (!err) {
                    res.status(200).send({
                      token: token,
                      userid: info._id,
                      name: info.username,
                    });
                  }
                }
              );
            } else {
              res
                .status(404)
                .send({ Message: "please enter correct password..." });
            }
          }
        });
      } else {
        res.status(403).send({ message: "username is not found ....." });
      }
    })
    .catch((err) => {
      res.status(500).send({ error: "Some thing went wrong..." });
    });
});

//creating private end point with help of middleware
app.post("/addfooditem", verifyToken, (req, res) => {
  let data = req.body;
  foodModel
    .create(data)
    .then((info) => {
      res.status(200).send({ message: "added successfully..." });
    })
    .catch((err) => {
      res.status(500).send({ message: "somthing went wrong" });
    });
});

//display all item
app.get("/fooditems", verifyToken, (req, res) => {
  foodModel
    .find()
    .then((data) => {
      res.send({ message: "food add successfully" });
    })
    .catch((err) => {
      res.send(err);
    });
});

//find the item with name
app.get("/getitem/:name", verifyToken, (req, res) => {
  foodModel
    .find({ name: { $regex: req.params.name, $options: "i" } })
    .then((data) => {
      if (data.length !== 0) {
        res.send(data);
      } else {
        res.send({ message: "no item is found..." });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

//endpoint to tracking the food
app.post("/track", verifyToken, (req, res) => {
  let data = req.body;
  trackingModel
    .create(data)
    .then((info) => {
      res.send({ message: "food is Added ..." });
    })
    .catch((err) => {
      res.send((err) => {
        res.send({ message: "some thing went wrong.." });
      });
    });
});

//endpoint to fetch all food eaten by a person
app.get("/track/:userid/:date", verifyToken, (req, res) => {
  let userid = req.params.userid;
  let date = new Date(req.params.date);
  let strDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  trackingModel
    .find({ userId: userid, eatenDate: strDate })
    .populate("userId") //it used to fetch the data from ref table and replace with userId
    .populate("foodId")
    .then((info) => {
      res.send(info);
    })
    .catch((err) => {
      res.send({ message: "something went wrong..." });
    });
});

app.listen(4000, () => {
  console.log("Server is Up and running at @4000");
});
