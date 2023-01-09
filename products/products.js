(() => {
    const authToken = localStorage.getItem('authtoken');

    if(!authToken){
        window.location = '/';
    }

    const buildProductsTable = (products) =>{
        return `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                ${buildProductRows(products)}
            </table>`;
    };

    const buildProductRows = (products) => {

        let productRows = '';

        for(let i = 0; i < products.length; i++){
            productRows += buildProductRow(products[i]);
        }

        return productRows;
    }

    const buildProductRow = (product) => {
        return `
            <tr>
                <td><a href=../product/?id=${product.id}>${product.id}</a></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
            </tr>`;
    };

    fetch('http://localhost:9988/products', {
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

            const productsTable = buildProductsTable(response);

            const productsTableContainer = document.createElement('div');

            productsTableContainer.innerHTML = productsTable;

            const productsContainer = document.getElementById('productsContainer');

            productsContainer.appendChild(productsTableContainer);
        })
})();