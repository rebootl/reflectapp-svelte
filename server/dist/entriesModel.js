async function getAllPublicEntries(db, skip, limit) {
    const c = await db.collection('entries');
    return await c.find({ private: false })
        .sort({ date: -1 }).skip(skip).limit(limit).toArray();
}
async function getEntries(db, user, skip, limit, _private = false) {
    const c = await db.collection('entries');
    let q;
    if (_private) {
        q = [
            { $match: { user: user } },
            { $sort: { pinned: -1, date: -1 } }
        ];
    }
    else {
        q = [
            { $match: { $and: [
                        { user: user, },
                        { private: false }
                    ] } },
            { $sort: { pinned: -1, date: -1 } }
        ];
    }
    return await c.aggregate(q).skip(skip).limit(limit).toArray();
}
async function getEntry(db, user, id) {
    const c = await db.collection('entries');
    return await c.findOne({ $and: [
            { user: user },
            { id: id }
        ] });
}
export { getAllPublicEntries, getEntries, getEntry };
