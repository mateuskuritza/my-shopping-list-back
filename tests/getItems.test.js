import connection from "../src/database";
import app from "../src/app";
import supertest from "supertest";

beforeEach(() => {
    connection.query(`DELETE FROM compras`);
})

describe("GET shopping list", () => {
    it("return status 200 with array of products success", async () => {
        const result = await supertest(app).get(`/shopping`);

        expect(result.status).toEqual(200);
        expect(result.body).toEqual([]);
    })
    it("return status 500 database error", async () => {
        connection.end();
        const result = await supertest(app).get(`/shopping`);
        expect(result.status).toEqual(500);
    })
})