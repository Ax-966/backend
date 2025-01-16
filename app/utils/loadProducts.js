import productsModel from "../models/products.js"; 

const productos = [
  {
    name: "Maki",
    price: 100,
    pieces: true,
    numberOfPieces: 5,
    description: "Arroz sobre láminas de alga seca (nori), con pescado, verdura o frutascripción del producto 1",
    image: "Maki.jpg",
    category: "Sushi",
    stock: 10,
  },
  {
    name: "Futomaki",
    price: 200,
    pieces: false,
    numberOfPieces: 1,
    description: "Futomaki clásico con tortilla, shiitake, kanpyo y pepino.",
    image: "Futomaki.jpg",
    category: "Sushi",
    stock: 20,
  },
  {
    name: "Hosomaki",
    price: 200,
    pieces: false,
    numberOfPieces: 1,
    description: "es una variedad de Makizushi mucho más estrecha en la que, debido a su finura, suele utilizarse un solo ingrediente. ",
    image: "Hosomaki.jpg",
    category: "Makizushi",
    stock: 20,
  },
{
    name: "Uramaki",
    price: 200,
    pieces: false,
    numberOfPieces: 1,
    description: "La palabra japonesa ura significa: al reves, por lo que los ingredientes se colocan en un orden diferente al del sushi tradicional",
    image: "uramaki.jpg",
    category: "Makizushi",
    stock: 20,
  },
  {
  name: "Kazari Sushi",
  price: 200,
  pieces: false,
  numberOfPieces: 1,
  description: "Texturas y colores que son auténticas obras de arte..",
  image: "Kazari-makizushi.jpg",
  category: "Makizushi",
  stock: 20,
},

  
  
];

export const cargarProductos = async () => {
  try {
  
    await productsModel.deleteMany({});
    console.log("Colección limpiada");

 
    const resultado = await productsModel.insertMany(productos);
    console.log("Productos agregados:", resultado);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
};