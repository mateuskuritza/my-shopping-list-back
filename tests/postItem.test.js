import connection from "../src/database";
import app from "../src/app";
import supertest from "supertest";

beforeEach(() => {
    connection.query(`DELETE FROM compras`);
})

describe("POST shopping list", () => {
    it("return status 201 success", async () => {
        const result = await supertest(app).post(`/shopping`).send({ text: "Produto teste" });
        expect(result.status).toEqual(201);
    })
    it("return status 400 with invalid product text", async () => {
        const result = await supertest(app).post(`/shopping`).send({ text: "" });
        expect(result.status).toEqual(400);
    })
    it("return status 500 database error", async () => {
        connection.end();
        const result = await supertest(app).post(`/shopping`).send({ text: "Produto teste" });
        expect(result.status).toEqual(500);
    })
})