const user = [
    'johnDoe123',
    'janeSmith456',
    'alexJohnson789',
    'emilyBrown101',
    'michaelWhite202'
];
const email = [
    'johnDoe123@example.com',
    'janeSmith456@example.com',
    'alexJohnson789@example.com',
    'emilyBrown101@example.com',
    'michaelWhite202@example.com'
];
const thoughts = [
    'I love coding!',
    'I love to read!',
    'I love to travel!',
    'I love to eat!',
    'I love to sleep!'
];
const friends = [
    'janeSmith456',
    'alexJohnson789',
    'emilyBrown101',
    'michaelWhite202'
];
const possibleReactions = [
    'like',
    'dislike',
    'love',
    'hate',
    'laugh'
];
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomThought = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: thoughts[i],
            username: user[i],
            reactions: [...getReactionTags(i)]
        });
    }
    return results;
};
const getRandomUser = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            username: user[i],
            email: email[i],
            thoughts: [getRandomThought(1)],
            friends: [getRandomArrItem(friends)]
        });
    }
    return results;
};
const getReactionTags = (int) => {
    if (int === 1) {
        return getRandomArrItem(possibleReactions);
    }
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            reactionBody: getRandomArrItem(possibleReactions),
            username: getRandomArrItem(user)
        });
    }
    return results;
};
export { getRandomThought, getRandomUser };
