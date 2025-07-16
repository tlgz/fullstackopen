const { test, after, describe,beforeEach, } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


const User = require('../models/user')


const invalidUsername = {
    username: "test",
    name: "test",
    password: "test"
}

const uniqueUsername = {
    username: "tl",
    name: "test",
    password: "test"
}

const invalidPassword = {
    username: "testi",
    name: "testi",
    password: "as"
}

test('invalid username', async () => {
    await api
        .post('/api/users')
        .send(invalidUsername)
        .expect(400)
})

test('unique username', async () => {
    await api
        .post('/api/users')
        .send(uniqueUsername)
        .expect(400)
})

test('invalid password', async () => {
    await api
        .post('/api/users')
        .send(invalidPassword)
        .expect(400)
})
after(async () => {
    await mongoose.connection.close()
})





after(async () => {
  await mongoose.connection.close()
})