async function getEntries(db, user, skip, limit, topics, tags) {
    const c = await db.collection('entries');
    let q;
    if (topics < 1) {
        q = [
            { $match: { $and: [
                        { user: user },
                    ] } },
            { $sort: { pinned: -1, date: -1 } }
        ];
    }
    else if (tags < 1) {
        q = [
            { $match: { $and: [
                        { user: user },
                        { topics: { $in: topics } }
                    ] } },
            { $sort: { pinned: -1, date: -1 } }
        ];
    }
    else {
        q = [
            { $match: { $and: [
                        { user: user },
                        { topics: { $in: topics } },
                        { tags: { $in: tags } }
                    ] } },
            { $sort: { pinned: -1, date: -1 } }
        ];
    }
    return await c.aggregate(q).skip(skip).limit(limit).toArray();
}
export { getEntries };
