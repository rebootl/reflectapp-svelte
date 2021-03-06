import express from 'express';
import { getAllPublicEntries, getEntries, getEntry } from './entriesModel.js';
import { getValidUser } from './userModel.js';

const router = express.Router();

const allowedTypes = [ 'any', 'task', 'link', 'article', 'image' ];
const requiredFields = [ 'id', 'type', 'date', 'topics', 'tags' ];

/*router.get('/', async (req, res) => {
  const db = req.app.locals.db;

  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 10;

  const r = await getAllPublicEntries(db, skip, limit);
  return res.send({ success: true, result: r });
});*/

router.get('/', async (req, res) => {
  const db = req.app.locals.db;
  const user = req.query.user;

  // check if requested user exists _and valid_ !!
  const u = await getValidUser(db, user);
  if (!u) return res.sendStatus(404);

  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 10;

  let r;
  if (!req.session.loggedIn || req.session.username !== user) {
    // not logged in
    r = await getEntries(db, user, skip, limit);
  } else {
    r = await getEntries(db, user, skip, limit, true);
  }

  return res.send({ success: true, result: r });
});

/*router.get('/:user/:entryId', async (req, res) => {
  const db = req.app.locals.db;
  const user = req.params.user;
  // check if user exists _and valid_ !!
  const u = await getValidUser(db, user);
  if (!u) return res.sendStatus(404);

  const entryId = req.params.entryId;
  const r = await getEntry(db, user, entryId);
  //console.log("R", r);

  // if not logged in or request user not equals logged in user filter private entries
  let e = {};
  if (req.session.loggedIn || req.session.username === user)
    e = r;
  else {
    if (e.private)
      if (e.private === false) e = r;
  }

  //console.log(r)
  if (!e) return res.sendStatus(404);
  return res.send({ success: true, result: e });
});*/

router.post('/', async (req, res) => {
  if (!req.session.loggedIn || req.session.username !== req.body.user) {
    console.log('unallowed entry post rejected');
    res.sendStatus(401);
    return;
  }
  //console.log(req.session);
  //console.log(req.body);

  const db = req.app.locals.db;
  const c = await db.collection('entries');

  // check required fields
  for (const f of requiredFields) {
    if (!req.body.hasOwnProperty(f)) return res.sendStatus(400);
  }

  // more checks?
  // - length

  // insert into db
  const r = await c.updateOne(
    { $and: [
      { user: req.body.user },
      { id: req.body.id }
    ]},
    { $set: { ...req.body } },
    { upsert: true }
  );

  if (!r) return res.sendStatus(400);
  return res.send({ success: true, result: r });
})

export default router;
