import { Router } from 'express';

import talentController from '../../controllers/TalentController';

import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';

const talents = Router();

/*
 * List all Talent/individual ordering by lastName then by firstName
 */
talents.get(
  '/talent/admin',
  auth.verifyToken,
  checkPermissions('admin-company'),
  talentController.getTalents
);

/*
 * List active Talent/individual  by lastName then by firstName
 */
talents.get(
  '/talent/public',
  talentController.getTalentsActive
);


talents.get(
  '/talent/search',
  talentController.findTalents
);

/*
 * Edit own profile info for Individual/Talent
 *
 */
talents.put(
  '/individual/edit_profile',
  auth.verifyToken,
  checkPermissions('individual'),
  talentController.editInfo
);

/*
 * Deactivate Individual on the platform
 */
talents.put(
  '/individual/deactivateAccount',
  auth.verifyToken,
  checkPermissions('admin-company'),
  talentController.deactivateAccount
);

/*
 * Reactivate Individual on the platform
 */
talents.put(
  '/individual/activateAccount',
  auth.verifyToken,
  checkPermissions('admin-company'),
  talentController.reactivateAccount
);

/*
 * Get individual info by id
 */
talents.get(
  '/individual/:user_id',
  talentController.getIndividualById
);

export default talents;
