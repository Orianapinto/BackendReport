import { Router } from 'express';
import improvementRoute from './improvementRoute';
import userRoute from './userRoute';
import taskRoutes from './taskRoutes';

const router = Router();

// Definir todas las rutas principales
// router.use('/improvements', improvementRoute);
// router.use('/users', userRoute);
router.use('/tasks', taskRoutes);

// Puedes añadir una ruta de estado aquí si lo deseas
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API funcionando correctamente' });
});

export default router;