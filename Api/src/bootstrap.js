module.exports = async () => {
  const User = require('./models/User');
  const Weight = require('./models/Weight');

  User.hasMany(Weight, { as: 'Weights', foreignKey: 'userID' });
  Weight.belognsTo(User, { as: 'User', foreignKey: 'userID' });
};
