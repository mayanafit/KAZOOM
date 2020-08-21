const request = require("supertest");
const app = require('../app');
const db = require('../config/mongo');

afterAll(async(done) => {
    try {
        db.collection('Questions').drop();
        done()
    } catch (error) {
        done(error)
    }
});

const goodQuestion = {
    question: "This is Question?",
    choices: [
        { ops1: "Yes", status: true }, 
        { ops2: "No", status: false }, 
        { ops3: "Maybe", status: false },
        { ops4: "Not Sure", status: false },
    ],
    point: 1000
};

const falseQuestion = {
    question: "",
    choices: [
        { ops1: "Yes", status: true }, 
        { ops2: "No", status: false }, 
        { ops3: "Maybe", status: false },
        { ops4: "Not Sure", status: false },
    ],
    point: 1000
};

const falseQuestion2 = {
    question: "This is Question?",
    choices: [],
    point: 1000
};

const falseQuestion3 = {
    question: "This is Question?",
    choices: [
        { ops1: "Yes", status: true }, 
        { ops2: "No", status: false }, 
        { ops3: "Maybe", status: false },
        { ops4: "Not Sure", status: false },
    ],
};

describe("Create Question Test", () => {
    test("Success Create New Question - should return response with 201", async(done) => {
        try {
            const response = await request(app).post("/questions").send(goodQuestion);
            const { body, status } = response;
            expect(status).toBe(201);
            expect(body).toHaveProperty("_id")
            expect(body).toHaveProperty("question")
            expect(body).toHaveProperty("choices")
            done();
        } catch (err) {
            done(err);
        }
    })
    test("Error Validation Question name - should return response json", async(done) => {
        try {
            const response = await request(app).post("/questions").send(falseQuestion);
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Question must be filled!")
            done();
        } catch (err) {
            done(err);
        }
    })
    test("Error Validation Question choices - should return response json", async(done) => {
        try {
            
            const response = await request(app).post("/questions").send(falseQuestion2)
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Choices must be filled!")
            done();
        } catch (err) {
            done(err);
        }
    })
    test("Error Validation Question point - should return response json", async(done) => {
        try {
            
            const response = await request(app).post("/questions").send(falseQuestion3)
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Point must be filled!")
            done();
        } catch (err) {
            done(err);
        }
    })
});

describe("GET All Question", () => {
    test("Success Get All Questions - should return status 200", async (done) => {
        try {
            const response = await request(app).get("/questions")
            const { body, status } = response;
            expect(status).toBe(200);
            expect((Array).isArray(body)).toBeTruthy();
            expect(body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(goodQuestion)
                ])
            )
            done();
        } catch (error) {
            done(error);
        }
    })
})