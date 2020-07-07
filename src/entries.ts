import express from 'express';
import { getPublicEntries, getPublicEntry } from './entriesModel.js';
import { getValidUser } from './userModel.js';

const router = express.Router();

router.get('/:user', async (req, res) => {
  const db = req.app.locals.db;
  const user = req.params.user;

  // check if user exists _and valid_ !!
  const u = await getValidUser(db, user);
  if (!u) return res.sendStatus(404);

  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 10;
  let topics = req.query.topics || [];
  let tags = req.query.tags || [];

  // check tags/topics
  if (!Array.isArray(topics)) topics = [];
  if (!Array.isArray(tags)) tags = [];

  // check if logged in
  //console.log(req.user);

  const r = await getPublicEntries(db, user, topics, tags, skip, limit);
  return res.send({ success: true, result: r });
});

router.get('/:user/:entryId', async (req, res) => {
  const db = req.app.locals.db;
  const user = req.params.user;
  // check if user exists _and valid_ !!
  const u = await getValidUser(db, user);
  if (!u) return res.sendStatus(404);
  const entryId = req.params.entryId;
  const r = await getPublicEntry(db, user, entryId);
  console.log(r)
  if (!r) return res.sendStatus(404);
  return res.send({ success: true, result: r });
});

export default router;
