const { app } = require('./app');

const { db } = require('./utils/database');

const { Repair } = require('./models/repair.model');

const { User } = require('./models/user.model');

//Models relations
User.hasMany(Repair);
Repair.belongsTo(User);
//User.hasMany(Repair, {foreignKey: 'theNameOfTheForeignKey'});   If used another name to foreign key

db.authenticate()
    .then(() => console.log('DataBase authenticated successfully'))
    .catch(error => console.log(error));

db.sync()
    .then(() => console.log('DataBase sync successfully'))
    .catch(error => console.log(error));


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`DataBase running in port: ${PORT}`));
