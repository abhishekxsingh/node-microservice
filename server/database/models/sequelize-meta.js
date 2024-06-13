module.exports = (sequelize, DataTypes) => {
  const sequelizeMeta = sequelize.define(
    'SequelizeMeta',
    {
      name: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true,
    },
  );

  return sequelizeMeta;
};
