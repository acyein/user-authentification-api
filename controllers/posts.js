exports.getPosts = (req, res) => {
    res.json({
        title: 'Best Cookies Recipe',
        description: "This isn't just genius for a vegan chocolate chip cookie or in spite of it. This cookie, which comes from Ovenly founders Agatha Kulaga and Erin Patinkin, can rest entirely on its own merits: its soft-bellied, chewy, caramelly-crisp-edged, rippled and ringed and puddled with melty chocolate, haunting, well-salted, incidentally vegan merits.",
        writtenBy: 'Genius Recipes',
        url: 'https://food52.com/recipes/39132-ovenly-s-secretly-vegan-salted-chocolate-chip-cookies'
    });
};