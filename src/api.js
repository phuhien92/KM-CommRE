
export const fetchPropertySales = () => {
    return fetch('http://localhost:3001/property-sales')
        .then(resp => resp.json());
};

export const fetchPropertyTypes = (agent) => {
    return fetch(`http://localhost:3001/property-types/${agent}`)
        .then(resp => resp.json());
}


