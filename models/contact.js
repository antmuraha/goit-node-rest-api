export default (sequelize, DataTypes) => {
    const Contact = sequelize.define(
        "Contact",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            owner: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            favorite: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            tableName: "contacts",
            timestamps: true,
        },
    );

    Contact.associate = (models) => {
        Contact.belongsTo(models.User, {
            foreignKey: "owner",
            as: "user",
        });
    };

    return Contact;
};
