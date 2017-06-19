exports.damage = function(spellString) {
    var feRegEx = /fe.*/g;

    if (spellString.match(feRegEx) === null) {
        return 0;
    }

    if (spellString.match(/fe/g).length > 1) {
        return 0;
    }
    var stringStartingWithFe = spellString.match(feRegEx);

    var aiRegEx = /ai/g;
    var aiIndex = 0;
    var indexOfLastAi = 0;
    if (stringStartingWithFe[0].match(aiRegEx) === null) {
        return 0;
    }

    while ((aiIndex = aiRegEx.exec(stringStartingWithFe[0]))) {
        indexOfLastAi = aiIndex.index;
    }

    var strForDamageCacl = stringStartingWithFe[0].substring(0, indexOfLastAi + 2);

    var collectionForDamageCalc = [{
        regEx: "j(?=n|j)",
        damage: -1
    }, {
        regEx: "n(?=n|j)",
        damage: -1
    }, {
        regEx: "fe",
        damage: 1
    }, {
        regEx: "dai",
        damage: 5
    }, {
        regEx: "ain(?!e)",
        damage: 3
    }, {
        regEx: "je(?!e)",
        damage: 2
    }, {
        regEx: "jee",
        damage: 3
    }, {
        regEx: "ne",
        damage: 2
    }, {
        regEx: "ai",
        damage: 2
    }, {
        regEx: "[^]",
        damage: -1
    }];

    var damage = 0;
    collectionForDamageCalc.forEach((element) => {
        var curentRegEx = new RegExp(element.regEx, 'g');
        var curentDamage = 0;
        if (strForDamageCacl.match(curentRegEx) !== null) {
            curentDamage = (strForDamageCacl.match(curentRegEx).length) * element.damage;
            strForDamageCacl = strForDamageCacl.replace(curentRegEx, "");
            damage += curentDamage;
        } else {
            damage += curentDamage;
        }
    });

    if (damage < 0) {
        return 0;
    }
    return damage;
}
