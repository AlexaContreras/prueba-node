const inquirer = require('inquirer');
const  fs = require('fs');

inquirer
    .prompt([ 
         {
            type:'confirm',
            message:'La pizza es para delivery?',
            default: false,
            name:'esParaDelivery',
        },
        {
            type:'input',
            message:'Ingresá tu dirección:',
            name:'direccionCliente',
            when: (respuestas) => {
                return respuestas.esParaDelivery === true;
            }, 
            validate: (estaRespuesta) => {
                let longitud = estaRespuesta.length; 
                if(  longitud <= 5){
                    
                    return 'Debes completar la dirección';

                } return true;
            }
        },
        {
            type:'input',
            message:'Ingresá tu nombre:',
            name:'nombreCliente',
            validate: (estaRespuesta) => {
                let longitud = estaRespuesta.length; 
                if(  longitud < 1){
                    
                    return 'Debes completar el nombre';
                    
                } return true;
            }
        },
        {
           type:'input',
           message:'Ingresá tu número de télefono:',
           name: 'telefonoCliente',
           validate: (estaRespuesta) => {

               if (estaRespuesta.length < 1) {
                return 'Debes completar el número de télefono';
               } else if( isNaN(estaRespuesta)){
                
                return 'Ingresá solamente números';
                
            } return true;
        }
        },
        {
            type: 'rawlist',
            message: 'Elegí el gusto de la pizza',
            name: 'gustoPizza',
            choices: ['Muzza','Napo','Jamón', '4 quesos'],
        },
        {
            type:'list',
            message: 'Elegí el tamaño de la pizza',
            name:'tamanioPizza',
            choices:['Personal', 'Mediano', 'Grande'],
        },
        {
            type:'confirm',
            message:'Querés agregar una bebida?',
            default: false,
            name:'conBebida',
        },
        {
            type:'list',
            message:'Elegí el gusto de la bebida',
            name:'gustoBebida',
            choices:['Coca-Cola', 'Pepsi', 'Mirinda', '7-up'],
            when: (respuestas) => {
                return respuestas.conBebida === true;
            },
            
        },
        {
            type:'confirm',
            message:'Sos cliente habitual?',
            default: false,
            name:'clienteHabitual',
        },
        {
            type:'checkbox',
            message:'Qué gusto de empanadas querés?',
            name: 'gustoEmpanadas',
            choices:['Queso', 'Jamón', 'Humita', 'Carne Picante', 'Cebolla y queso', 'Pollo'],
            when: (respuestas) => {
                return respuestas.clienteHabitual === true;
            },
            validate: (estaRespuesta) => {

                if (estaRespuesta.length != 3) {
                 return 'Debes elegir 3 gusto';
    

             } return true;
             
            }
          
        },
    ])
    .then(function ( respuestas ) {

        console.log(' === Resumen de tu pedido ===' );
        console.log('Tus datos son - Nombre: ' + respuestas.nombreCliente + ' Teléfono: ' + respuestas.telefonoCliente );
    

        if(respuestas.esParaDelivery === false){
            console.log('Nos dijiste que pasabas a retirar tu pedido')
        } else {
            console.log('Tu pedido será entregado en: ' + respuestas.direccionCliente)
        };
        console.log(' === Productos solicitados ===');
        console.log('Pizza : ' + respuestas.gustoPizza);
        console.log('Tamaño: ' + respuestas.tamanioPizza);

        if(respuestas.conBebida === true){
            console.log('Bebida: ' + respuestas.gustoBebida);
        } 

        if(respuestas.clienteHabitual === true){
            console.log('Tu 3 empanadas de regalo son de: ');

            for(let i = 0; i < respuestas.gustoEmpanadas.length; i++)
            console.log('• ' + respuestas.gustoEmpanadas[i]);
        } 
        console.log('=================================');

        let total = 1;
        respuestas.clienteHabitual === true? total += 3 : 0;
        respuestas.conBebida === true? total += 1 : 0;
        
        console.log('Cantidad productos: ' + total)
    
        let sumar = 0;

        respuestas.tamanioPizza == 'Personal'? sumar += 430 : 0;
        respuestas.tamanioPizza == 'Mediano'? sumar += 560: 0;
        respuestas.tamanioPizza == 'Grande'? sumar += 650 : 0;
        respuestas.conBebida == true? sumar += 80 : 0;
  
        console.log('Total productos: ' +'$'+ sumar);

        let delivery = 0;

        respuestas.esParaDelivery == true? delivery += 20 : 0;
        
        console.log('Total delivery: ' +'$'+ delivery );

let descuento = 0;
switch (respuestas.conBebida == true) {
    case respuestas.tamanioPizza == 'Personal':
            descuento = 3;
            break;
    case respuestas.tamanioPizza == 'Mediano':
        descuento = 5;
        break;
    case respuestas.tamanioPizza == 'Grande':
        descuento = 8;
        break;
    }
        console.log('Descuento: '+ descuento + '%');
   
    let subtotal = sumar + delivery;
    let subtotal1 = (subtotal * descuento )/ 100;
    let totalCompra = subtotal - subtotal1;

    console.log('Total: ' + '$' + totalCompra);
    console.log('=================================');
    console.log('Gracias por comprar en DH Pizzas. Esperamos que disfrutes tu pedido.');

    // clase 3;

    let fecha = new Date();
    console.log(`Fecha : ${fecha.toLocaleDateString()} `);
    console.log(`Hora : ${fecha.toLocaleTimeString()} `);

   /* Agregar la fecha y hora al objeto respuesta
   respuestas.fechaDelPedido = fecha.toLocaleDateString();
   respuestas.horaDelPedido = fecha.toLocaleTimeString();

   // Agregando al objeto varias props
   respuestas.totalPedidos = totalCompra;
   respuestas.descuento = descuento;

   */
  const rutaDelArchivo = `${__dirname}/pedidos.json`;

		// Levanto el contenido de pedidos.json
		let contenidoPedidos = fs.readFileSync(rutaDelArchivo, 'utf8');
		contenidoPedidos = contenidoPedidos.length > 0 ? JSON.parse(contenidoPedidos) : [];

		// Creando las propiedades nuevas solicitadas
		let nuevasProps = {
			fechaDelPedido: fecha.toLocaleDateString(),
			horaDelPedido: fecha.toLocaleTimeString(),
			totalPedido: totalCompra,
			descuento: descuento,
		};

		// Agregando las nuevas props al objeto respuestas (con Spread Operator)
		respuestas = {
			idPedido: contenidoPedidos.length + 1,
			...respuestas,
			...nuevasProps,
		};

		contenidoPedidos.push(respuestas);

		let dataFinal = JSON.stringify(contenidoPedidos, null, ' ');

		// Guardando contenido en pedidos.json
		fs.writeFileSync(rutaDelArchivo, dataFinal);

		console.log('¡Se guardó el pedido!');
	});

    