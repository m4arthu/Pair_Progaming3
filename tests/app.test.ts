import { app } from "app";
import supertest from "supertest";
import { clearDb } from "./helpers";
 
const server = supertest(app)
describe("POST /fruits", () => {
   
    beforeAll( () => {
        clearDb();
    }) 

    test("should  return 201 when insert a fruit with correct data", async () => {
       const { status } = await server.post("/fruits").send({
            name: "LARANJA",
            price: 2
          })
          expect(status).toBe(201)
    })

    test("shold return 422 when body is",async()=>{
        const { status } = await server.post("/fruits").send({})
        expect(status).toBe(422)
    })

    test("",async()=>{
        const { status } = await server.post("/fruits").send({
            name: "LARANJA",
            price: 2
          })
          expect(status).toBe(409)
    })

})


describe('GET /fruits' , () => {
    beforeEach( () => {
        clearDb();
    }) 

   test("Should return 404 when trying to get a fruit by an id that doesn't exist", async () => {
        const result = await server.get("/fruits/1290381209");
        
        expect(result.statusCode).toBe(404);
   }); 
    
   test("should return 400 when id param is present but not valid", async () => {
        const result = await server.get("/fruits/olhaso");
        
        expect(result.statusCode).toBe(400);
   });

   test("should return one fruit when given a valid and existing id", async () => {
        await server.post("/fruits").send({
            name: "Laranja",
            price: 200
        });
        const result = await server.get(`/fruits/1`);
        
        expect(result.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number)
        }));
   });
   
   test("should return all fruits", async () => {
        await server.post("/fruits").send({ name: "Laranja", price: 200 });
        await server.post("/fruits").send({ name: "Maçã", price: 5000});
        await server.post("/fruits").send({ name: "Gerson", price: 1});

        const result = await server.get(`/fruits`);
        
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number)
            })
        ]));
   });

})

// curryficacão
// fn => fn => valor
// sum(2,3) => 5    // não currificada
// sum(2)(3) => 5   // currificada
// describe.each([])
// function sum(n1) {
//     return function sum(n2) {
//         return n1 + n2;
//     }
// }

// describe.each([
//     ['POST fruits', server.post],
//     ['GET Fruits', server.get]]
// )('%s Are you okay? Check if routes are alive', (name, delegate) => {
    
//     test('teste do teste', () => {
        
//     })
// })

// describe('POST fruits Are you okay? Check if routes are alive', () => {
//     const name = 'POST fruits' 
//     const delegate = server.post;

//     test('teste do teste', () => {
//         delegate('/fruits')
//     })
// })

// describe('GET fruits Are you okay? Check if routes are alive', () => {
//     const name = 'GET fruits' 
//     const delegate = server.get;

//     test('teste do teste', () => {
//         delegate('/fruits')
//     })
// })


