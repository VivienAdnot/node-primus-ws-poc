import { validateWithDefaults } from './connection.schema';

const addConnection = (data) => {

    const connection = {
        ...data,
        updatedAt: new Date(),
        createdAt: new Date()
    };

    return validateWithDefaults(connection)
        .then(() => console.log('data validation success', connection));

};

export default addConnection;
