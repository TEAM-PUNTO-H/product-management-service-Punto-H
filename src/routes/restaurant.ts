import { Router, Request, Response } from "express";
import { Restaurant } from "../models/Restaurant";

const router = Router();


/**
 * @swagger
 * /api/restaurant/create:
 *   post:
 *     summary: Crear Restaurante
 *     tags: [Restaurantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: number
 *               description:
 *                  type: string
 *               name:
 *                  type: string
 *               address:
 *                  type: string
 *               phoneNumber:
 *                  type: string
 *               sendCost:
 *                  type: number
 *               typeFood:
 *                  type: string
 *               minTime:
 *                  type: number
 *               maxTime:
 *                  type: number
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post("/create", async (req: Request, res: Response) => {
    try {
        const { name, id_user, description, phoneNumber, sendCost, typeFood, minTime, maxTime, address } = req.body;

        if (!name || !description || !phoneNumber || !sendCost || !typeFood || !minTime || !maxTime || !id_user
            || !address
        ) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }


        const newRestaurant = await Restaurant.create({
            name,
            description,
            phoneNumber,
            sendCost,
            typeFood,
            minTime,
            maxTime,
            id_user,
            address
        });

        res.status(201).json({
            message: 'Restaurante creado',
            newRestaurant
        });

    } catch (error: any) {
        res.status(500).json({
            message: 'Error al procesar la creacion del restaurante',
            error: error.message
        });
    }
});


/**
 * @swagger
 * /api/restaurant/allRestaurants:
 *   get:
 *     summary: Lista de restaurantes
 *     tags: [Restaurantes]
 *     responses:
 *       200:
 *         description: Retorna todos los restaurantes
 */
router.get("/allRestaurants", async (req: Request, res: Response) => {
    try {
        const restaurants = await Restaurant.findAll();

        res.status(200).json({
            message: 'Restaurantes',
            restaurants
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Error al traer los restaurantes',
            error: error.message
        });
    }
});

/**
 * @swagger
 * /api/restaurant/restaurantById/{id}:
 *   get:
 *     summary: Lista de restaurantes
 *     tags: [Restaurantes]
 *     responses:
 *       200:
 *         description: Retorna restaurantes por ID
 */
router.get('/restaurantById/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurante no encontrado" });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el restaurante" });
    }
});


/**
 * @swagger
 * /api/restaurants/updateRestaurant/{id}:
 *   put:
 *     summary: Editar un restaurante existente
 *     tags: [Restaurantes]
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
 *               id_user:
 *                 type: number
 *               address:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               sendCost:
 *                 type: number
 *               typeFood:
 *                 type: string
 *               minTime:
 *                 type: number
 *               maxTime:
 *                 type: number
 * 
 *     responses:
 *       200:
 *         description: Restaurante actualizado
 */
router.put("/updateRestaurant/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurante no encontrado" });
        }

        await restaurant.update(req.body);
        res.status(200).json({
            message: "Restaurante actualizado",
            restaurant
        });

    } catch (error: any) {
        res.status(500).json({
            message: "Error al actualizar el restaurante",
            error: error.message
        });
    }
});

/**
 * @swagger
 * /api/restaurant/delete/{id}:
 *   delete:
 *     summary: Eliminar un Restaurante
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del restaurante a eliminar
 *     responses:
 *       200:
 *         description: Restaurante eliminado
 */
router.delete("/delete/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findByPk(id);
        console.log("Restaurante a eliminar:", restaurant);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurante no encontrado" });
        }

        await restaurant.destroy();

        res.status(200).json({
            message: "Restaurante eliminado correctamente"
        });

    } catch (error: any) {
        res.status(500).json({
            message: "Error al eliminar el restaurante",
            error: error.message
        });
    }
});


export default router;
