(() => {
    const authToken = sessionStorage.getItem('authtoken');

    if(!authToken){
        window.location = '/';
    }

    const buildProductDetail = (product) => {
        return `
        <div>
            <span>${product.name}</span>
            <span>${product.description}</span>
            <span>${product.price}</span>
            <img src="${product.image}">
        </div>
        `;
    }

    const getProductId = () =>{

        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
          });
          
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

            const productDetail = buildProductDetail(response);

            const productContainer = document.getElementById('productContainer');

            const div = document.createElement('div');

            div.innerHTML = productDetail;

            productContainer.appendChild(div);
        })
})();