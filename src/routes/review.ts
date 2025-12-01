import { Router, Request, Response } from "express";
import { Review } from "../models/Review";
import axios from "axios";
import { Product } from "../models/Product";

const router = Router();

/**
 * @swagger
 * /api/reviews/allReviews:
 *   get:
 *     summary: Lista de reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Retorna todas las reviews
 */
router.get("/allReviews", async (req: Request, res: Response) => {
  try {
    const reviews = await Review.findAll();

    res.status(200).json({
      message: "Reviews",
      reviews,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error al traer las reviews",
      error: error.message,
    });
  }
});


/**
 * @swagger
 * /api/reviews/reviewById/{id}:
 *   get:
 *     summary: Lista de reviews por ID
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Retorna review por ID
 */
router.get("/reviewById/:id", async (req: Request, res: Response) => {
    try {
        const product = await Review.findByPk(req.params.id);
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
 * /api/reviews/createReview:
 *   post:
 *     summary: Crear Review de un producto
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: number
 *                 example: 12
 *               id_product:
 *                 type: number
 *                 example: 5
 *               score:
 *                 type: number
 *                 example: 4
 *               review:
 *                 type: string
 *                 example: "Muy buen producto, recomendado."
 *     responses:
 *       201:
 *         description: Review creada exitosamente
 *       500:
 *         description: Error al crear la review
 */

router.post("/createReview", async (req: Request, res: Response) => {
  try {
    const { id_user, id_product, score, review } = req.body;

    const product = await Product.findByPk(id_product);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const userResponse = await axios.get(`http://users-service:4000/api/users/userById/${id_user}`);
    if (!userResponse.data) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    const newReview = await Review.create({
      id_user,
      id_product,
      score,
      review,
    });

    res.status(201).json({
      message: "Review creada correctamente",
      review: newReview,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error al crear la review",
      error: error.message,
    });
  }
});



/**
 * @swagger
 * /api/reviews/updateReview/{id}:
 *   put:
 *     summary: Editar una review existente
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la review a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *               review:
 *                 type: String
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put("/updateReview/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {id_user, id_product} = req.body;

        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: "Review no encontrada" });
        }

        if (id_user){
            try {
                const userResponse = await axios.get(`http://users-service:4000/api/users/userById/${id_user}`);
                if (!userResponse.data) {
                    return res.status(404).json({ message: "El usuario no existe" });
                }
            } catch (error) {
                return res.status(500).json({ message: "Error al verificar el usuario" });
            }

        }
        if (id_product){
            const product = await Product.findByPk(id_product); 
            if (!product) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
        }
        await review.update(req.body);
        res.status(200).json({
            message: "Review actualizada",
            review
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Error al actualizar la review", 
            error: error.message
        });
    }
});


/**
 * @swagger
 * /api/reviews/deleteReview/{id}:
 *   delete:
 *     summary: Eliminar una review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la review a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado
 */

router.delete("/deleteReview/:id", async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const review =  await Review.findByPk(id);
        if (!review) {
            return  res.status(404).json({ message: "Review no encontrada" });
        }
        await review.destroy();
        res.status(200).json({
            message: "Review eliminada"
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Error al eliminar la review",
            error: error.message
        });
    }
});

export default router;