(() => {
    const authToken = sessionStorage.getItem('authtoken');

    if(!authToken){
        window.location = '/';
    }

    const buildProductsTable = (products) =>{
        let table = `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                ${products.forEach((product) => {})}
                <tr>
                </tr>`;
    };

    const buildProductRow = (product) =>{
        
    };

    fetch('http://localhost:9989/products', {
            headers: { 
                "Content-Type": "application/json; charset=utf-8",
                "x-access-token": authToken
            },
            method: 'POST'
        })
        .then(response => response.json())
        .then(response => {
            if(!response){
                throw new Error(response);
            }

            buildProductsTable(response);
        })
})();