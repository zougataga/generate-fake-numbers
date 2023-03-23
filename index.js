class generateFakeNumbers {
    constructor(obj, call) {
        if (
            (!obj && !call) ||
            (obj && typeof obj !== "object") ||
            (call && typeof call !== "function")
        ) throw new TypeError(`Merci d'utiliser "generateFakeNumbers" correctement !`);

        const
            max = obj.max ?? 0,
            pays = this.#getPays(obj.pays ?? ["france"]);
        if (pays?.length == 0) throw new TypeError("Merci de choisir un ou des pays !");

        let
            i = 1,
            déjà = [],
            randomPays = (min = 0, max = pays.length - 1) => { return pays[Math.floor(Math.random() * (max - min + 1)) + min] };

        this.generateur = setInterval(() => {
            if ((max != 0 && i >= max)) {
                call(`-> ${max} numéro(s) ont été généré avec succés.`);
                if (generateur) clearInterval(generateur);
                return
            } else {
                const numbers = this.#genNum(randomPays());
                if (déjà.includes(numbers)) return;
                déjà.push(numbers);
                call(undefined, { i, numbers });
                i++
            }
        }, 0);
    };

    stop() {
        if (this.generateur) clearInterval(this.generateur)
    }

    #genNum(obj) {
        let
            min = obj.min,
            max = obj.max,
            difference = max - min,
            num = Math.random();
        num = Math.floor(num * difference);
        num = num + min;
        return obj.debut + num;
    }

    #getPays(p) {
        const pays = [];
        p.forEach(e => pays.push(this.#getPaysObj(e)));
        return pays
    }

    #getPaysObj(p) {
        const allPays = {
            france: { min: 600000000, max: 800000000, debut: `+33` },
            qatar: { min: 30000000, max: 60000000, debut: `+974` },
            belgique: { min: 60000000, max: 90000000, debut: `+32` },
            suisse: { min: 200000000, max: 300000000, debut: `+41` },
            royaumeuni: { min: 7000000000, max: 8000000000, debut: `+44` },
            paysbas: { min: 7000000000, max: 8000000000, debut: `+31` },
            allemagne: { min: 100000000, max: 300000000, debut: `+49` },
            espagne: { min: 100000000, max: 300000000, debut: `+34` },
            portugal: { min: 100000000, max: 300000000, debut: `+34` }
        };
        return allPays[p.replaceAll(" ", "").trim().toLowerCase()]
    }

};
module.exports = generateFakeNumbers