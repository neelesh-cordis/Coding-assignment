import app from '../../server';
import { stub,  } from "sinon";
import {agent as request} from 'supertest';
import {expect} from 'chai';
import Task from "../database/task.model";
import { GroupedCountResultItem } from 'sequelize';

process.env.NODE_ENV="test"
describe("Index Test", () => {
    it('should always pass', function () {
        expect(true).to.equal(true);
    });
    it('should POST /api/tasks ', async function () {
        const createStub =  stub(Task, 'create');
        createStub.withArgs().returns(new Promise((resolve, reject) => {
            resolve(new Task({
                "id": 1,
                "title": " stub Dummy",
                "description": "qwertyuio",
                "creationDate": "2023-10-14T17:32:04.289Z",
                "dueDate": "25/11/2023",
                "assignedTo": null,
                "category": "Foo",
                "status": "Pending"
            }));
          }));
        const res = await request(app)
            .post('/api/tasks').send({
                "title": "Dummy", 
                "description": "qwertyuio", 
                "dueDate":"25/11/2023", 
                "assignedTo" : "John Doe", 
                "category": "Foo", 
                "status" : "Pending"
            });
        expect(res.status).to.equal(201);
        createStub.restore();
    });
    it('should GET /api/tasks', async function () {
        const findstub =  stub(Task, 'findAndCountAll');
        findstub.withArgs().returns(new Promise((resolve, reject) => {
            resolve({
                count: 1 as unknown as  GroupedCountResultItem[],
                rows: [new Task({
                    "id": 1,
                    "title": " stub Dummy",
                    "description": "qwertyuio",
                    "creationDate": "2023-10-14T17:32:04.289Z",
                    "dueDate": "25/11/2023",
                    "assignedTo": null,
                    "category": "Foo",
                    "status": "Pending"
                })]
            });
          }));
        const res = await request(app).get('/api/tasks');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        findstub.restore();
    });
   
    it('should GET /api/tasks/:id', async function() {
        const findOnestub =  stub(Task, 'findByPk');
        findOnestub.withArgs().returns(new Promise((resolve, reject) => {
            resolve(new Task({
                "id": 1,
                "title": " stub Dummy",
                "description": "qwertyuio",
                "creationDate": "2023-10-14T17:32:04.289Z",
                "dueDate": "25/11/2023",
                "assignedTo": null,
                "category": "Foo",
                "status": "Pending"
            }));
          }));
        const res = await request(app).get('/api/tasks/1');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        findOnestub.restore();
    })

    it('should GET /api/tasks?assignedTo=[assignedTo]', async function() {
        const findstub =  stub(Task, 'findAndCountAll');
        findstub.withArgs().returns(new Promise((resolve, reject) => {
            resolve({
                count: 1 as unknown as  GroupedCountResultItem[],
                rows: [new Task({
                    "id": 1,
                    "title": " stub Dummy",
                    "description": "qwertyuio",
                    "creationDate": "2023-10-14T17:32:04.289Z",
                    "dueDate": "25/11/2023",
                    "assignedTo": "John Doe",
                    "category": "Foo",
                    "status": "Pending"
                })]
            });
          }));
        const res = await request(app).get('/api/tasks?assignedTo=John+Doe');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        findstub.restore();
    })

    it('should GET /api/tasks?category=[category]', async function() {
        const findstub =  stub(Task, 'findAndCountAll');
        findstub.withArgs().returns(new Promise((resolve, reject) => {
            resolve({
                count: 1 as unknown as  GroupedCountResultItem[],
                rows: [new Task({
                    "id": 1,
                    "title": "stub Dummy",
                    "description": "qwertyuio",
                    "creationDate": "2023-10-14T17:32:04.289Z",
                    "dueDate": "25/11/2023",
                    "assignedTo": "John Doe",
                    "category": "Foo",
                    "status": "Pending"
                })]
            });
          }));
        const res = await request(app).get('/api/tasks?category=Foo');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        findstub.restore();
    });

    it('should PUT /api/tasks/:id', async function() {
        const updateStub =  stub(Task, 'update');
        updateStub.withArgs().returns(new Promise((resolve, reject) => {
            resolve([1]);
          }));
        const res = await request(app).put('/api/tasks/1').send({
            "title": "Dummy", 
            "description": "qwertyuio", 
            "dueDate":"25/11/2023", 
            "assignedTo" : "John Doe", 
            "category": "Foo", 
            "status" : "Pending"
        });
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        updateStub.restore();
    })

    it('should DELETE /api/tasks/:id', async function() {
        const deleteStub =  stub(Task, 'destroy');
        deleteStub.withArgs().returns(new Promise((resolve, reject) => {
            resolve(1);
          }));
        const res = await request(app).delete('/api/tasks/1');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        deleteStub.restore();
    })

    it('/api/tasks should return 500 if something fails from DB', async function () {
        const findstub =  stub(Task, 'findAndCountAll');
        findstub.withArgs().returns(new Promise((resolve, reject) => {
           reject(new Error("Some Random Error"))
          }));
        const res = await request(app).get('/api/tasks');
        expect(res.status).to.equal(500);
        findstub.restore();
    });
});

