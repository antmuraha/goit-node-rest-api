"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("users", "verify", {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        });
        await queryInterface.addColumn("users", "verificationToken", {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("users", "verify");
        await queryInterface.removeColumn("users", "verificationToken");
    },
};
