const generateFakeNumbers = require("../");
new generateFakeNumbers({
    max: 10, // 0/Undefined = Infinie
    pays: ["france", "belgique"], //  Allpays: france, qatar, belgique, suisse, royaumeuni, paysbas, allemagne, espagne

}, (err, numbers) => {
    if (err) return console.log(err);
    console.log(numbers);
    // -> { i: 1, numbers: '+3264093951' }
});
