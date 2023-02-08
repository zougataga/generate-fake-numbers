const
    num = document.querySelector("#num"),
    allCheck = document.querySelectorAll(`[id*=checkbox]`),
    go = document.querySelector("#go"),
    result = document.querySelector("#result"),
    titre = result.querySelector("h2"),
    text = result.querySelector("textarea"),
    stopBtn = result.querySelector("#stop"),
    downloadBtn = result.querySelector("#download"),
    clearBtn = result.querySelector("#clear");


let generateur;
go.addEventListener("click", () => {
    const
        n = Number(num.value),
        pays = [];
    if (generateur) clearInterval(generateur);
    allCheck.forEach(e => {
        if (e.checked) pays.push(getPays(e.value))
    });
    if (pays.length == 0) alert("Merci de choisir un ou des pays !");
    else {
        result.style.display = "block";
        titre.innerHTML = `Résultat`;
        let
            i = 0,
            randomPays = (min = 0, max = pays.length - 1) => { return pays[Math.floor(Math.random() * (max - min + 1)) + min] };
        generateur = setInterval(() => {
            if (n != 0 && i >= n) {
                alert(`=> ${n} numéro(s) ont été généré avec succés.`);
                if (generateur) clearInterval(generateur);
                return
            } else {
                titre.innerHTML = `Résultat [${i}/${n}]`
                text.value += `${genNum(randomPays())}\n`;
                text.scrollTop = text.scrollHeight
                i++
            }
        }, 0)
    }
});

stopBtn.addEventListener("click", () => {
    if (generateur) clearInterval(generateur);
});
clearBtn.addEventListener("click", () => text.value = ``);
downloadBtn.addEventListener("click", () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text.value));
    element.setAttribute('download', `https://github.com/zougataga.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
});

function genNum(obj) {
    let
        min = obj.min,
        max = obj.max,
        difference = max - min,
        num = Math.random();
    num = Math.floor(num * difference);
    num = num + min;
    return obj.debut + num;
}


function getPays(p) {
    const obj = {
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
    return obj[p.replaceAll(" ", "").trim().toLowerCase()]
}






(function () {
    const inputWrapperList = document.getElementsByClassName('input-number-wrapper');
    for (let wrapper of inputWrapperList) {
        const input = wrapper.querySelector('input');
        const incrementation = +input.step || 1;

        wrapper.querySelector('.increase').addEventListener('click', function () {
            incInputNumber(input, incrementation);
        });

        wrapper.querySelector('.decrease').addEventListener('click', function () {
            incInputNumber(input, "-" + incrementation);
        });
    }

    function incInputNumber(input, step) {
        if (!input.disabled) {
            let val = +input.value;

            if (isNaN(val)) val = 0;
            val += +step;

            if (input.max && val > input.max) {
                val = input.max;
            } else if (input.min && val < input.min) {
                val = input.min;
            } else if (val < 0) {
                val = 0;
            }

            input.value = val;
            input.setAttribute("value", val);
        }
    }
})()
