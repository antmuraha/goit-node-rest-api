"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("users", [
            {
                id: 1,
                email: "user1@example.com",
                password: "password1",
                subscription: "starter",
                token: null,
            },
            {
                id: 2,
                email: "user2@example.com",
                password: "password2",
                subscription: "pro",
                token: null,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    },
};
