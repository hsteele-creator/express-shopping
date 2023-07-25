const request  = require("supertest");
const app = require("./app");
const cartItems = [];
process.env.NODE_ENV = "test"

const firstItem = {name : "onions", price: "1.50"}

beforeEach(() => {
    cartItems.push(firstItem)
})

describe("GET /items", () => {
    test("route should return list of items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([])
    })
})

describe("POST /items", () => {
    test("route should add a new cart item", async() => {
        const res = await request(app).post("/items").send(firstItem)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({"added" : firstItem})
    })
})

describe("GET /items/:name", () => {
    test("route should return specified cart item", async() => {
        const res = await request(app).get("/items/onions").send(firstItem)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(firstItem)
    })
})

describe("PATCH /items/:name", () => {
    test("route should update the specified item", async () => {
        const res = await request(app).patch("/items/onions").send({name : "new onions"})
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ "updated" : {name : "new onions", price : "1.50"}})
    })
})

describe("DELETE /items/:name", () => {
    test("route should delete specified item", async () => {
        const res = await request(app).delete("/items/onions")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message : "Deleted"})
    })
})

afterEach(() => {
    cartItems.length = 0
})