process.env.NODE_ENV = "test"
const request = require("supertest")
const app = require("../../../app")
const db = require("../../../db/index")

const { smallPost, faultyPost, patchData } = require("../../utils/dummyData")

describe("DELETE /workout", () => {
  before((done) => {
    db.connect()
      .then(() => done())
      .catch((error) => done(error))
  })

  after((done) => {
    db.disconnect()
      .then(() => done())
      .catch((error) => done(error))
  })

  it("OK, deleting workout", (done) => {
    request(app)
      .post("/api/v1/workout")
      .send(smallPost)
      .then((res) => {
        request(app)
          .delete(`/api/v1/workout/${res.body._id}`)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            const { body } = res
            done()
          })
          .catch((err) => done(err))
      })
      .catch((err) => done(err))
  })
})
