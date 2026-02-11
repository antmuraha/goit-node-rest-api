export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            subscription: {
                type: DataTypes.ENUM,
                values: ["starter", "pro", "business"],
                defaultValue: "starter",
            },
            token: {
                type: DataTypes.STRING,
                defaultValue: null,
            },
        },
        {
            tableName: "users",
            timestamps: true,
        },
    );

    User.associate = (models) => {
        User.hasMany(models.Contact, {
            foreignKey: "owner",
            as: "contacts",
        });
    };

    return User;
};
