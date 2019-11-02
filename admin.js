//////////////////////
const fs = require('fs');

const rutaDelArchivo = `${__dirname}/pedidos.json`;
let pedidos = fs.readFileSync(rutaDelArchivo, 'utf8');

if (pedidos.length > 0) {
    pedidos = JSON.parse(pedidos);

    console.log('¡Reporte generado con éxito!');
    console.log(    );
    console.log('|===*** Reporte de Ventas ===***|');
    
    
    let fecha = new Date();
    console.log(`Fecha de generación: ${fecha.toLocaleDateString()} `);
    console.log(`Hora : ${fecha.toLocaleTimeString()} `);
    console.log(   );

	console.log('|===*** Cantidad de pedidos realizados ===***|');
	console.log(`Total:  ${pedidos.length}`);
    console.log(    );

    console.log('|===*** Cantidad de pedidos para delivery ===***|');
    let paraEnvio = pedidos.filter(pedido => pedido.esParaDelivery == true);
    console.log((`Total: ${paraEnvio.length}`));
    

    console.log(    );
    //Totales por gusto de Pizza
 
	let gustoMuzza = pedidos.filter(function (pedido)  { 
		return pedido.gustoPizza == 'Muzza';
	});

    console.log(`Total de Muzzarella: ${gustoMuzza.length}`);

    let gustoNapo = pedidos.filter(function (pedido)  { 
		return pedido.gustoPizza == 'Napo';
    });

    console.log(`Total de Napolitana: ${gustoNapo.length}`);
    
    let gustoJamon = pedidos.filter(function (pedido)  { 
		return pedido.gustoPizza == 'Jamón';
    });

    console.log(`Total de Jamón: ${gustoJamon.length}`);
    
    let gusto4Quesos = pedidos.filter(function (pedido)  { 
		return pedido.gustoPizza == '4 quesos';
    });

    console.log(`Total de 4 Quesos: ${gusto4Quesos.length}`);
    console.log( );
    
    
    //Totales por tamaño de Pizza
    console.log('|===*** Cantidad de pizzas vendidas por tamaño ***===|');

    let personal = pedidos.filter(pedido => pedido.tamanioPizza == 'Personal');
    console.log(`Total Personal: ${personal.length}`);

    let mediano = pedidos.filter(pedido => pedido.tamanioPizza == 'Mediano');
    console.log(`Total Mediano: ${mediano.length}`);

    let grande = pedidos.filter(pedido => pedido.tamanioPizza == 'Grande');
    console.log(`Total Grande: ${grande.length}`);

    console.log(  );
    console.log('|===*** Cantidad de pedidos con bebida ***====|');
    let bebidas = pedidos.filter(pedido => pedido.conBebida == true);
    console.log(`Total: ${bebidas.length}`);

    
    console.log(  );
    console.log('|===*** Cantidad de clientes habituales ***====|');
    let cuantos = pedidos.filter(pedido => pedido.clienteHabitual == true);
    console.log(`Total: ${cuantos.length}`);


    console.log(  );
    console.log('|===*** Cantidad de empanadas regaladas ***====|');
    console.log(`Total: ${cuantos.length * 3}`);
    
    

    
    
    
    
    
    
} else {
	console.log('"Actualmente el sistema no tiene pedidos para generar el reporte".');
}