const fs = require('fs');
const csv = require('csvjson');

const file = fs.readFileSync(__dirname + '/Sale-Data.csv', { encoding: 'utf8' });
const data = csv.toObject(file);

const getAgents = () => {
    let agents = {};

    data.forEach((row) => {
        agents[row.agent] = '';
    })

    return Object.keys(agents);
}

const getPropertySales = () => {
    let output = {};

    data.forEach((row) => {
        output[row.agent] = output[row.agent] ? output[row.agent] + 1 : 1;
    });

    return output;
}

const getPropertyTypesBy = (agent) => {
    let output = {};

    data
        .filter(row => row.agent === agent)
        .forEach(row => {
            const type = row['property-type'];
            output[type] = output[type] ? output[type] + 1 : 1;
        });

    return output;
}

module.exports = {
    getAgents,
    getPropertySales,
    getPropertyTypesBy
};

