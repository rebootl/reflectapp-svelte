async function getPublicTopics(db, user) {
    const c = await db.collection('entries');
    const q = [
        { $match: { $and: [
                    { user: user },
                    { private: false },
                ] } },
        { $unwind: "$topics" },
        { $group: { _id: "$topics" } },
        /*{ $unwind: "$tags" },*/
        /*{ $group: { _id: "$tags" }},*/
        /*{ $project: { _id: -1, name: "$_id", topics: "$topics" }},*/
        /*{ $unwind: "$topics" },*/
        { $project: { _id: -1, name: "$_id" } },
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
        // { text: "blabla", [ 'star trek', 'sci-fi' ] }
        // { text: "foo", [ 'star trek', 'movie' ] }
        // { text: "boo", [ 'babylon 5' ] }
        { $unwind: "$tags" },
        // { text: "blabla", 'star trek' }
        // { text: "blabla", 'sci-fi' }
        // { text: "foo", 'star trek' }
        // { text: "foo", 'movie' }
        // { text: "boo", 'babylon 5' }
        { $group: { _id: "$tags" } },
        // { 'star trek' }
        // { 'sci-fi' }
        // { 'movie' }
        // { 'babylon 5' }
        { $project: { _id: -1, name: "$_id" } },
        { $sort: { name: 1 } }
    ];
    return await c.aggregate(q).toArray();
}
async function getPublicUserMenu(db, user) {
    const topics = await getPublicTopics(db, user);
    const res = [];
    for (const topic of topics) {
        const tags = await getPublicTags(db, user, topic.name);
        res.push({
            topic: topic.name,
            tags: tags.map((t) => t.name)
        });
    }
    return res;
}
export { getPublicUserMenu };
