"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = require("../models/Product");
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
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
router.post("/", async (req, res) => {
    try {
        const { name, description, price, id_user } = req.body;
        // Validaciones mínimas del CA1
        if (!name || !description || !price || !id_user) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ message: 'El precio debe ser un número positivo' });
        }
        const newProduct = await Product_1.Product.create({
            name,
            description,
            price,
            id_user
        });
        res.status(201).json({
            message: 'Producto creado',
            newProduct
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al procesar la creacion del producto',
            error: error.message
        });
    }
});
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
router.get("/", async (req, res) => {
    try {
        const products = await Product_1.Product.findAll();
        res.status(200).json({
            message: 'Productos',
            products
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al traer los productos',
            error: error.message
        });
    }
});
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista de productos (con búsqueda opcional por nombre)
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Buscar producto por nombre
 *     responses:
 *       200:
 *         description: Retorna todos los productos o los filtrados por nombre
 */
router.get("/", async (req, res) => {
    try {
        const { name } = req.query;
        let whereClause = {};
        if (name) {
            whereClause = {
                name: {
                    [sequelize_1.Op.like]: `%${name}%`
                }
            };
        }
        const products = await Product_1.Product.findAll({ where: whereClause });
        res.status(200).json({
            message: "Productos",
            products
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al traer los productos",
            error: error.message
        });
    }
});
/**
 * @swagger
 * /api/products/{id}:
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
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Buscar producto
        const product = await Product_1.Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        // Actualizar SOLO los campos enviados (evita perder datos)
        await product.update(req.body);
        res.status(200).json({
            message: "Producto actualizado",
            product
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al actualizar el producto",
            error: error.message
        });
    }
});
/**
 * @swagger
 * /api/products/{id}:
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
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Buscar producto
        const product = await Product_1.Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        // Actualizar SOLO los campos enviados (evita perder datos)
        await product.update(req.body);
        res.status(200).json({
            message: "Producto actualizado",
            product
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al actualizar el producto",
            error: error.message
        });
    }
});
/**
 * @swagger
 * /api/products/{id}:
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
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_1.Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        await product.destroy();
        res.status(200).json({
            message: "Producto eliminado correctamente"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al eliminar el producto",
            error: error.message
        });
    }
});
exports.default = router;
