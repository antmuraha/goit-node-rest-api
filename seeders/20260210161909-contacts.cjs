"use strict";

const contacts = [
    {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Allen Raymond",
        email: "nulla.ante@vestibul.co.uk",
        phone: "(992) 914-3792",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440001",
        name: "Chaim Lewis",
        email: "dui.in@egetlacus.ca",
        phone: "(294) 840-6685",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440002",
        name: "Kennedy Lane",
        email: "mattis.Cras@nonenimMauris.net",
        phone: "(542) 451-7038",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440003",
        name: "Wylie Pope",
        email: "est@utquamvel.net",
        phone: "(692) 802-2949",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440004",
        name: "Cyrus Jackson",
        email: "nibh@semsempererat.com",
        phone: "(501) 472-5218",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440005",
        name: "Abbot Franks",
        email: "scelerisque@magnis.org",
        phone: "(186) 568-3720",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440006",
        name: "Reuben Henry",
        email: "pharetra.ut@dictum.co.uk",
        phone: "(715) 598-5792",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440007",
        name: "Simon Morton",
        email: "dui.Fusce.diam@Donec.com",
        phone: "(233) 738-2360",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440008",
        name: "Thomas Lucas",
        email: "nec@Nulla.com",
        phone: "(704) 398-7993",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440009",
        name: "Alec Howard",
        email: "Donec.elementum@scelerisquescelerisquedui.net",
        phone: "(748) 206-2688",
    },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("contacts", contacts, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("contacts", null, {});
    },
};
