(() => {
    const authToken = sessionStorage.getItem('authtoken');

    if(!authToken){
        window.location = '/';
    }

    const buildProductsTable = (products) =>{
        return `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
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
                <td><a href=/product/${product.id}>${product.id}</a></td>
                <td>${product.name}</td>
            </tr>`;
    };

    const getProductId = () =>{

        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
          });
          // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
          return params.id;
    }

    fetch(`http://localhost:9988/products/${getProductId()}`, {
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

            debugger;

            // const productsTable = buildProductsTable(response);

            // const productsTableContainer = document.createElement('div');

            // productsTableContainer.innerHTML = productsTable;

            // document.body.appendChild(productsTableContainer);
        })
})();