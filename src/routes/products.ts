import { Router, Request, Response } from "express";
import { Product } from "../models/Product";

const router = Router();


/**
 * @swagger
 * /api/products/createProduct:
 *   post:
 *     summary: Crear Producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: number
 *               price:
 *                 type: number
 *               description:
 *                  type: string
 *               name:
 *                  type: string
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post("/createProduct", async (req: Request, res: Response) => {
  try {
    const { name, description, price, id_user } = req.body;

    // Validaciones mínimas del CA1
    if (!name || !description || !price || !id_user) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: 'El precio debe ser un número positivo' });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      id_user
    });

    res.status(201).json({
      message: 'Producto creado',
      newProduct
    });

  } catch (error: any) {
    res.status(500).json({
      message: 'Error al procesar la creacion del producto',
      error: error.message
    });
  }
});


/**
 * @swagger
 * /api/products/allProducts:
 *   get:
 *     summary: Lista de productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Retorna todos los productos
 */
router.get("/allProducts", async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({ 
      message: 'Productos',
      products 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error al traer los productos', 
      error: error.message 
    });
  }
});

/**
 * @swagger
 * /api/products/productById/{id}:
 *   get:
 *     summary: Lista de productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Retorna productos por ID
 */
router.get('/productById/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});

/**
 * @swagger
 * /api/products/productByName:
 *   get:
 *     summary: Busqueda de un producto por nombre
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Buscar producto por nombre
 *     responses:
 *       200:
 *         description: Retorna el producto buscado por nombre
 */
router.get("/productByName", async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
   
    if (!name || typeof name !== 'string') {
      return res.status(400).json({
        message: "El parámetro 'name' es obligatorio y debe ser una cadena de texto"
      });
    }

    const products = await Product.findOne({where: {name: name}});

     if (!products) {
      return res.status(404).json({
        message: "No se encontraron productos con ese nombre"
      });
    }

    res.status(200).json({
      message: "Productos",
      products
    });

  } catch (error: any) {
    res.status(500).json({
      message: "Error al traer los productos",
      error: error.message
    });
  }
});


/**
 * @swagger
 * /api/products/updateProduct/{id}:
 *   put:
 *     summary: Editar un producto existente
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               id_user:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put("/updateProduct/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await product.update(req.body);

    res.status(200).json({
      message: "Producto actualizado",
      product
    });

  } catch (error: any) {
    res.status(500).json({
      message: "Error al actualizar el producto",
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/products/deleteProduct/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado
 */
router.delete("/deleteProduct/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    console.log("Producto a eliminar:", product);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await product.destroy();

    res.status(200).json({
      message: "Producto eliminado correctamente"
    });

  } catch (error: any) {
    res.status(500).json({
      message: "Error al eliminar el producto",
      error: error.message
    });
  }
});


export default router;
