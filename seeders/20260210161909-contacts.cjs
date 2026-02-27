"use strict";

const contacts = [
    {
        id: 1,
        owner: 1,
        name: "Allen Raymond",
        email: "nulla.ante@vestibul.co.uk",
        phone: "(992) 914-3792",
    },
    {
        id: 2,
        owner: 1,
        name: "Chaim Lewis",
        email: "dui.in@egetlacus.ca",
        phone: "(294) 840-6685",
    },
    {
        id: 3,
        owner: 2,
        name: "Kennedy Lane",
        email: "mattis.Cras@nonenimMauris.net",
        phone: "(542) 451-7038",
    },
    {
        id: 4,
        owner: 2,
        name: "Wylie Pope",
        email: "est@utquamvel.net",
        phone: "(692) 802-2949",
    },
    {
        id: 5,
        owner: 1,
        name: "Cyrus Jackson",
        email: "nibh@semsempererat.com",
        phone: "(501) 472-5218",
    },
    {
        id: 6,
        owner: 2,
        name: "Abbot Franks",
        email: "scelerisque@magnis.org",
        phone: "(186) 568-3720",
    },
    {
        id: 7,
        owner: 1,
        name: "Reuben Henry",
        email: "pharetra.ut@dictum.co.uk",
        phone: "(715) 598-5792",
    },
    {
        id: 8,
        owner: 2,
        name: "Simon Morton",
        email: "dui.Fusce.diam@Donec.com",
        phone: "(233) 738-2360",
    },
    {
        id: 9,
        owner: 1,
        name: "Thomas Lucas",
        email: "nec@Nulla.com",
        phone: "(704) 398-7993",
    },
    {
        id: 10,
        owner: 2,
        name: "Alec Howard",
        email: "Donec.elementum@scelerisquescelerisquedui.net",
        phone: "(748) 206-2688",
    },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("contacts", contacts, {});
        
        // Reset the sequence to the max ID
        await queryInterface.sequelize.query(
            "SELECT setval(pg_get_serial_sequence('contacts', 'id'), (SELECT MAX(id) FROM contacts));"
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("contacts", null, {});
    },
};
