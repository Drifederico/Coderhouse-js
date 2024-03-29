let carrito = [];

const productoContenedor = document.getElementById('producto-contenedor');

productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoEnCarrito(e.target.id)
    }
});

const validarProductoEnCarrito = async (productoId) => {
    const productoRepetido = carrito.find(producto => producto.id == productoId);

    if (!productoRepetido) {
        const producto = (await productos()).find(producto => producto.id == productoId);
        carrito.push(producto);
        pintarProductoCarrito(producto);
        actualizarTotalesCarrito(carrito);
    } else {
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`;
        actualizarTotalesCarrito(carrito);
    }
};

const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById('carrito-contenedor');
    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML =`
        <p>${producto.nombre}</p>
        <p>Precio: $${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad} Kg.</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div);
};

const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    pintarTotalesCarrito(totalCantidad, totalCompra);
    guardarCarritoStorage(carrito);
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precioTotal');

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
};

const eliminarProductoEnCarrito = (productoId) => {
    const productoIndex = carrito.findIndex(producto => producto.id == productoId);
    carrito.splice(productoIndex, 1);
    actualizarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
};

const actualizarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML =`
            <p>${producto.nombre}</p>
            <p>Precio:$${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad} Kg.</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
        `
        contenedor.appendChild(div);
    });
};

const vaciarCarrito = () => {
    if (carrito.length === 0) {
        swal("Su carrito ya se encuentra vacio");
        return;
    }
    carrito = [];
    const contenedor = document.getElementById('carrito-contenedor');
    contenedor.innerHTML = "";
    const precio = document.getElementById('precioTotal');
    precio.textContent = 0
    const contadorCarrito = document.getElementById('contador-carrito');
    contadorCarrito.textContent = 0
    swal("Los productos han sido eliminados con exito");
};

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage;
};