const
    allAGit = document.querySelectorAll(".block a"),
    allDeg = [360, -360],
    num = document.querySelector("#num"),
    allCheck = document.querySelectorAll(`[id*=checkbox]`),
    go = document.querySelector("#go"),
    result = document.querySelector("#result"),
    titre = result.querySelector("h2"),
    text = result.querySelector("textarea"),
    stopBtn = result.querySelector("#stop"),
    downloadBtn = result.querySelector("#download"),
    clearBtn = result.querySelector("#clear");

allAGit.forEach(e => {
    let last = 0;
    e.addEventListener('mouseenter', () => {
        const random = allDeg[last];
        last++;
        if (last == allDeg.length) last = 0;
        e.style.transform = `rotate(${random}deg)`
    });
    e.addEventListener('mouseleave', () => e.style = "")
});

let generateur;
go.addEventListener("click", () => {
    const
        n = Number(num.value),
        pays = [];
    if (generateur) clearInterval(generateur);
    allCheck.forEach(e => { if (e.checked) pays.push(e.value) });
    if (pays.length == 0) alert("Merci de choisir un ou des pays !");
    else {
        result.style.display = "block";
        titre.innerHTML = `Résultat`;

        generateur = new generateFakeNumbers({
            max: n, // 0/Undefined = Infinie
            pays: pays, //  Allpays: france, qatar, belgique, suisse, royaumeuni, paysbas, allemagne, espagne
        }, (err, numbers) => {
            if (err) return alert(err);
            // base();
            const i = (numbers?.i || 0);
            numbers = numbers?.numbers;
            if (numbers) {
                titre.innerHTML = `Résultat [${i}/${n}]`
                text.value += `${numbers}\n`;
                text.scrollTop = text.scrollHeight
            }
        })
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