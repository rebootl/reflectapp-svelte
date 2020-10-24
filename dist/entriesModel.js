async function getAllPublicEntries(db, skip, limit) {
    const c = await db.collection('entries');
    return await c.find({ private: false })
        .sort({ date: -1 }).skip(skip).limit(limit).toArray();
}
async function getPublicEntries(db, user, topics, tags, skip, limit) {
    const c = await db.collection('entries');
    let q;
    if (topics < 1) {
        q = [
            { $match: { $and: [
                        { user: user },
                        { private: false }
                    ] } },
            { $sort: { pinned: -1, date: -1 } }
        ];
    }
    else if (tags < 1) {
        q = [
            { $match: { $and: [
                        { user: user },
                        { private: false },
                        { topics: { $in: topics } }
                    ] } },
            { $sort: { pinned: -1, date: -1 } }
        ];
    }
    else {
        q = [
            { $match: { $and: [
                        { user: user },
                        { private: false },
                        { topics: { $in: topics } },
                        { tags: { $in: tags } }
                    ] } },
            { $sort: { pinned: -1, date: -1 } }
        ];
    }
    return await c.aggregate(q).skip(skip).limit(limit).toArray();
}
async function getPublicEntry(db, user, id) {
    const c = await db.collection('entries');
    return await c.findOne({ $and: [
            { user: user },
            { private: false },
            { id: id }
        ] });
}
export { getAllPublicEntries, getPublicEntries, getPublicEntry };
