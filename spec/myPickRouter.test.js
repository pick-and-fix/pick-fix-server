const { expect } = require("chai");
const request = require("supertest");
const { before, after } = require("mocha");
const jwt = require("jsonwebtoken");

const app = require("../app");
const User = require("../models/User");
const Pick = require("../models/Pick");

describe("My Pick Router test", function () {
  this.timeout(10000);

  const mongoose = require("mongoose");
  const db = mongoose.connection;

  before((done) => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  describe("POST /:userId/mypick/new", () => {
    let user;
    let userId;
    let accessToken;

    before(async () => {
      user = await User.create({
        email: "test@gmail.com",
        name: "testName",
      });

      userId = user._id;
      accessToken = jwt.sign({ user }, process.env.SECRET_KEY);
    });

    after(async () => {
      await User.findByIdAndDelete(userId);
      await Pick.findOneAndDelete({ author: userId });
    });

    it("Save new my pick", async () => {
      const mockData = {
        author: userId,
        name: "Test restaurant",
        address: "test address",
        rating: "⭐️",
        image: "",
        type: "pup",
        location: [35.123456, 25.123456],
      };

      const response = await request(app)
        .post(`/users/${userId}/mypick/new`)
        .set("Authorization", `Bearer ${accessToken}`)
        .type("application/json")
        .send({ newPick: mockData });

      const newPick = response.body.data;

      expect(response.status).to.equal(200);
      expect(response.body.result).to.equal("success");
      expect(newPick).to.exist;
      expect(mongoose.Types.ObjectId.isValid(newPick._id)).to.be.true;

      const savedPick = await Pick.findById(newPick._id);

      expect(savedPick).to.exist;
    });

    it("get pick", async () => {
      const response = await request(app)
        .get(`/users/${userId}/mypick`)
        .set("Authorization", `Bearer ${accessToken}`)
        .type("application/json");

      const myPicks = response.body.data;

      expect(response.status).to.equal(200);
      expect(response.body.result).to.equal("success");
      expect(myPicks).to.exist;

      Object.entries(myPicks).map(([id, pick]) => {
        expect(mongoose.Types.ObjectId.isValid(id)).to.be.true;
        expect(pick.name).to.equal("Test restaurant");
      });
    });
  });
});
