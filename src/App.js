const  pintarProductos = async () => {
  const contenedor = document.getElementById("producto-contenedor");
  const carnes = await productos()
  carnes.forEach(producto => { 
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML += `<div class="card-image">
                        <img src=${producto.img}>
                        <span class="card-title">${producto.nombre}</span>
                        <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${producto.id} class="material-icons agregar">add_shopping_cart</i></a>
                      </div>
                      <div class="card-content">
                          <p>Precio por Kg. $ ${producto.precio}</p>
                      </div>
                     `
    contenedor.appendChild(div);
  });
};