const comprarProductos = () => {
    let totalCompra = 0;
    let seguirComprando = false;
    const carrito = []

do {
    producto = {
        nombre: prompt('¿Queres comprar buzo, pantalon o ambos?'),
        cantidad: validarCantidad(parseInt(prompt('¿Cuantos Queres Comprar?'))),
        precio: 0
    }

    switch (producto.nombre) {
        case 'buzo':
            producto.precio = 4000;
            break;
        case 'pantalon':
            producto.precio = 5000;
            break;
        case 'ambos':
            producto.precio = 9000;
            break;
        default:
            alert('algunos de los datos ingresados no son correctos')
            producto.precio = 0;
            cantidad = 0;
    }
    if(producto.precio > 0){
        carrito.push(producto);
    }
    totalCompra += producto.precio * producto.cantidad
    seguirComprando = confirm('¿Queres agregar otro producto?');
} while (seguirComprando);
let totalConDescuento = aplicarDescuento(totalCompra);

calcularEnvio(totalConDescuento);
totalConDescuento = pagarCuotas(totalConDescuento);
let productosComprados = '';
// Ordenamos el carrito por precio de mayor a menor
carrito.sort((a, b) => (a.precio < b.precio) ? 1 : -1)
//Recorremos el carrito para mostrar los productos comprados en un alert
carrito.forEach(function(prod){
    productosComprados += ' \n' + prod.cantidad + " unidades de " + prod.nombre;
});
alert("Compraste los productos: " + productosComprados);
};


const aplicarDescuento = (totalCompra) =>{
  if(totalCompra >= 7000) {
    alert('Por tu compra superior a $ 7000 tenes un descuento del 20%');
    return totalCompra*=0.80
  }  
  return totalCompra
};
const validarCantidad = (cantidad) => {
    while (Number.isNaN(cantidad) || cantidad <= 0) {
        if (cantidad <= 0) {
            alert('Debe ingresar un numero.');
        }
        else {
            alert('Debe agregar un numero mayor a cero');
        }
        cantidad = parseInt(prompt('¿Cuantos queres comprar?'));
        
    }
    return cantidad;
};


const pagarCuotas = (totalCompra) =>{
    let quierePagarEnCuotas = false;
    quierePagarEnCuotas = confirm ('¿Queres pagar en cuotas sin interes?');
    if (quierePagarEnCuotas) {
        let cuotas = parseInt(prompt('¿Queres 6 o 12 cuotas sin interes?'));
        if (cuotas==6 || cuotas==12){
            alert ('El total de tu compra es de ' +cuotas +' cuotas sin interes de: $ '+parseInt(totalCompra/cuotas));
            return totalCompra/cuotas
        }
    }
    alert('El total de tu compra es $'+totalCompra);
    return totalCompra;
};



const calcularEnvio = (totalCompra) => {
    let tieneEnvioADomicilio = false;
    tieneEnvioADomicilio = confirm('¿Queres envio a domicilio?');

    if (tieneEnvioADomicilio && totalCompra >= 5000) {
        alert('Tenes envio gratis.');
    } else if (tieneEnvioADomicilio && totalCompra < 5000 && totalCompra !==0) {
        totalCompra +=900;
        alert ('El envio cuesta $ 900');
    }  
}


comprarProductos();




