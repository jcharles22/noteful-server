const knex = require("knex");
const app = require("../src/app");
const {
  makeFoldersArray,
  makeNotesArray,
  makeMaliciousFolder,
  makeMaliciousNote
} = require("./noteful.fixtures.js");

describe("Folders Endpoints", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  //truncate multiple tables and reset the sequence(since tables are related via foreign keys we can't truncate a single table, they must all be truncated together)
  before(() => db("folders").truncate());

  afterEach(() => db("folders").truncate());

  describe("GET /api/folders", () => {
    context("given no folders", () => {
      it("responds with 200 and an empty list", () => {
        return supertest(app)
          .get("/api/folders")
          .expect(200, []);
      });
    });

    context("given there are folders in the database", () => {
      const testFolders = makeFoldersArray();

      beforeEach("insert folders", () => {
        return db.into("folders").insert(testFolders);
      });

      it("responds with 200 and all of the folders", () => {
        return supertest(app)
          .get("/api/folders")
          .expect(200, testFolders);
      });
    });

    context(`Given an XSS attack article`, () => {
      const { maliciousFolder, expectedFolder } = makeMaliciousFolder();

      beforeEach("insert malicious folder", () => {
        return db.into("folders").insert([maliciousFolder]);
      });

      it("removes XSS attack content", () => {
        return supertest(app)
          .get(`/api/folders`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].name).to.eql(expectedFolder.name);
            expect(res.body[0].content).to.eql(expectedFolder.content);
          });
      });
    });
  });
});