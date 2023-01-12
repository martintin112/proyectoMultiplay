const baseDeDatos = [
    {
        id: 1,
        nombre: 'Extensión Premium',
        precio: 15000,
        imagen: './img/Garantía(2).png'
    },
    {
        id: 2,
        nombre: 'Extensión Basica',
        precio: 8000,
        imagen: './img/Garantía1.png'
    },
    {
        id: 3,
        nombre: 'Estación de juegos',
        precio: 80000,
        imagen: './img/multiplayComprar.jpg'
    }]

let carrito = []
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'cardProductos');

        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body',"bodyCard");

        const miNodoTitle = document.createElement('h3');
        miNodoTitle.classList.add('card-title', 'coloLetras');
        miNodoTitle.textContent = info.nombre;

        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add("imgCompra");
        miNodoImagen.setAttribute('src', info.imagen);

        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text', 'coloLetras');
        miNodoPrecio.textContent = `Precio: $${info.precio}`;

        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-secondary');
        miNodoBoton.setAttribute('data-bs-toggle', 'offcanvas')
        miNodoBoton.setAttribute('data-bs-target', '#offcanvasWithBothOptions')
        miNodoBoton.setAttribute('aria-controls', 'offcanvasWithBothOptions')
        miNodoBoton.textContent = 'Agregar al Carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', agregarCarrito);

        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

function agregarCarrito(evento) {

    carrito.push(evento.target.getAttribute('marcador'))
    
    renderizarCarrito();
}

function renderizarCarrito() {
    DOMcarrito.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {

        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });

        const numeroUnidadesItem = carrito.reduce((total, itemId) => {

            return itemId === item ? total +=1 : total;
        },0);

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2', 'productosCarrito');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} -Precio: $${miItem[0].precio}`
        
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);

    });

    DOMtotal.textContent = calcularTotal();
    
}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;

    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });

    renderizarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });

        return total + miItem[0].precio
    }, 0);
}

function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);

renderizarProductos();
renderizarCarrito();