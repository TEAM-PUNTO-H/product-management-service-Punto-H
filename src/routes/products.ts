import { Router, Request, Response } from "express";
import { Product } from "../models/Product";

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista de productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Retorna todos los productos
 */
router.get("/", async (req: Request, res: Response) => {
    try {
    const products = await Product.findAll()
    
    res.status(201).json({ message: 'Productos',products});
  } catch (error: any) {
    res.status(500).json({ message: 'Error al traer los productos', error: error.message });
  }
});

/**
 * @swagger
 * /api/products:
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
router.post("/", async (req: Request, res: Response) => {
  try {
    const newProduct= await Product.create(req.body)
    res.status(201).json({ message: 'Producto creado',newPurchased: newProduct});
  } catch (error: any) {
    res.status(500).json({ message: 'Error al procesar la creacion del producto', error: error.message });
  }
});

export default router;
