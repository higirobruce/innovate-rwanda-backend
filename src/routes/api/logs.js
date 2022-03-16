import { Router } from 'express';

import * as controller from '../../controllers/Logs';
import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

const router = Router();


router.get('/', auth.verifyToken, checkPermissions(['super-admin']), controller.getLogs);


export default router;
