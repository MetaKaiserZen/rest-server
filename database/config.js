const mongoose = require('mongoose');

const connection = async () =>
{
    try
    {
        mongoose.set('strictQuery', false);

        await mongoose.connect(process.env.MONGODB);

        console.log('Base de datos online');
    }
    catch (error)
    {
        console.log(error);

        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = { connection }
