"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const passwordHelper = await import("../helpers/hashPassword.js");

        const data = [];
        if (process.env.SEED_USER_STARTER_EMAIL && process.env.SEED_USER_STARTER_PASSWORD) {
            data.push({
                id: 1,
                email: process.env.SEED_USER_STARTER_EMAIL,
                password: await passwordHelper.hashPassword(process.env.SEED_USER_STARTER_PASSWORD),
                subscription: "starter",
                token: null,
            });
        }
        if (process.env.SEED_USER_PRO_EMAIL && process.env.SEED_USER_PRO_PASSWORD) {
            data.push({
                id: 2,
                email: process.env.SEED_USER_PRO_EMAIL,
                password: await passwordHelper.hashPassword(process.env.SEED_USER_PRO_PASSWORD),
                subscription: "pro",
                token: null,
            });
        }
        if (process.env.SEED_USER_BUSINEES_EMAIL && process.env.SEED_USER_BUSINEES_PASSWORD) {
            data.push({
                id: 3,
                email: process.env.SEED_USER_BUSINEES_EMAIL,
                password: await passwordHelper.hashPassword(process.env.SEED_USER_BUSINEES_PASSWORD),
                subscription: "business",
                token: null,
            });
        }

        console.log("Seeding users with the following data:", data);

        if (data.length > 0) {
            await queryInterface.bulkInsert("users", data);
        }

        // Reset the sequence to the max ID
        await queryInterface.sequelize.query(
            "SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(id) FROM users));",
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    },
};
