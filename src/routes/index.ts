import { Router } from 'express';
import improvementRoute from './improvementRoute';
import taskRoutes from './taskRoutes';
import metricsRoute from './metricsRoute';
import monthlyRoute from './monthlyRoute';
import weeklyRoute from './weeklyRoute';

const router = Router();

// Definir todas las rutas principales
// router.use('/improvements', improvementRoute);
// router.use('/users', userRoute);
router.use('/tasks', taskRoutes);
router.use('/improvements', improvementRoute);
router.use('/metrics', metricsRoute);
router.use('/monthly', monthlyRoute);
router.use('/weekly', weeklyRoute);

// Puedes añadir una ruta de estado aquí si lo deseas
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API funcionando correctamente' });
});

export default router;