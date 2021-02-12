
async function getTopics(db, user) {
  const c = await db.collection('entries');

  const q = [
    { $match: { user: user }},
    { $unwind: "$topics" },
    { $group: { _id: "$topics" }},
    { $project: { _id: 0, name: "$_id" }},
    { $sort: { name: 1 }}
  ];
  return await c.aggregate(q).toArray();
}

async function getTags(db, user, topic) {
  const c = await db.collection('entries');
  const q = [
    { $match: { $and: [
      { user: user },
      { topics: topic }
    ]}},
    { $unwind: "$tags" },
    { $group: { _id: "$tags" }},
    { $project: { _id: 0, name: "$_id" }},
    { $sort: { name: 1 }}
  ];
  return await c.aggregate(q).toArray();
}

async function getMenu(db, user) {
  const topics = await getTopics(db, user);
  const r = [];
  for (const topic of topics) {
    const tags = await getTags(db, user, topic.name);
    r.push({
      name: topic.name,
      tags: tags.map((t)=>t.name)
    });
  }
  return r;
}

export { getMenu };
