module.exports = (id, rules) => {
    const game = {
        id: id,
        rules: rules,
        isPlaying: (id) => {
            return id == 1;
        }
    }
    return game
}