import express from 'express';
import { getMenu } from './menuModel.js';
import { getValidUser } from './userModel.js';

const router = express.Router();

router.get('/:user', async (req, res) => {
  const db = req.app.locals.db;
  const user = req.params.user;

  // check if user exists _and valid_ !!
  const u = await getValidUser(db, user);
  if (!u) return res.sendStatus(404);

  const r = await getMenu(db, user);
  return res.send({ success: true, result: r });
});

export default router;
