async function getPublicTopics(db, user) {
    const c = await db.collection('entries');
    const q = [
        { $match: { $and: [
                    { user: user },
                    { private: false },
                ] } },
        { $unwind: "$topics" },
        { $group: { _id: "$topics" } },
        { $project: { _id: 0, name: "$_id" } },
        { $sort: { name: 1 } }
    ];
    return await c.aggregate(q).toArray();
}
async function getPublicTags(db, user, topic) {
    const c = await db.collection('entries');
    const q = [
        { $match: { $and: [
                    { user: user },
                    { private: false },
                    { topics: topic }
                ] } },
        { $unwind: "$tags" },
        { $group: { _id: "$tags" } },
        { $project: { _id: 0, name: "$_id" } },
        { $sort: { name: 1 } }
    ];
    return await c.aggregate(q).toArray();
}
async function getPublicMenu(db, user) {
    const topics = await getPublicTopics(db, user);
    const r = [];
    for (const topic of topics) {
        const tags = await getPublicTags(db, user, topic.name);
        r.push({
            name: topic.name,
            tags: tags.map((t) => t.name)
        });
    }
    return r;
}
export { getPublicMenu };
