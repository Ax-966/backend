 ------------------------------------------  Como instalar ------------------------------

1_ Clonar el repositorio: Copiar el ssh, https o Cli del repositorio. Ir a la carpeta deseada, abrir la terminal y escribir el comando --> git clone < pegar la opción que elegiste >.

2_ Ir a la carpeta del proyecto --> cd < nombre_del_proyecto >

3_ Instalar dependencias: Con el comando --> npm install.


------------------------------------------- Como ejecutar ------------------------------

1_ Crear un archivo .env , donde este toma los ejemplos del archivo .env.example, pero le agregas tus valores.

2_ Iniciar el servidor con el comando --> npm start

------------------------------------------- Endpoints -------------------------------------

                                                    |  Productos  |

GET --->  /products/ -->     muestra todos los productos.
        |-->  /products/id -->  muestra el producto cuyo ID coincida.
        |--> /products/name --> muestra el producto por nombre

POST -->/products/insert-one --> Agrega un producto.
        | - -->/products/insert-many --> Agrega más de un producto.

PUT --> /products/id --> Actualizas aquel producto cuyo ID coincida y  luego se puede cambiar sus valores (menos la imagen).
                /products/image/id --> Actualizas la imagen del producto buscado por ID.

DELETE -->/products/id --> Eliminas el producto cuyo ID coincida.

                                                    |  Pedidos  |

GET --> /orders/id --> Muestra el pedido que coincida con el ID.

POST --> /orders/ --> Agrega el pedido.

Delete --> /orders/id --> Elimina el pedido que coincida con el ID.