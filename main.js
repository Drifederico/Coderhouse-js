const comprarProductos = () => {
    let producto = ' ';
    let cantidad = 0;
    let precio = 0;
    let totalCompra = 0;
    let seguirComprando = false;

do {
    producto = prompt('¿Queres comprar buzo, pantalon o ambos?');
    cantidad = parseInt(prompt('¿Cuantos Queres Comprar?'));
    console.log('cantidad: '+cantidad);
    let cantidadValidada = validarCantidad(cantidad);
    console.log('cantidadValidada: '+cantidadValidada);
    switch (producto) {
        case 'buzo':
            precio = 4000;
            break;
        case 'pantalon':
            precio = 5000;
            break;
        case 'ambos':
            precio = 9000;
            break;
        default:
            alert('algunos de los datos ingresados no son correctos')
            precio = 0;
            cantidadValidada = 0;
    }

    totalCompra += precio * cantidadValidada

    seguirComprando = confirm('¿Queres agregar otro producto?');
} while (seguirComprando);

let totalConDescuento = aplicarDescuento(totalCompra);
console.log(totalConDescuento);
console.log(totalCompra);
calcularEnvio(totalConDescuento);
totalConDescuento = pagarCuotas(totalConDescuento);

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









const 