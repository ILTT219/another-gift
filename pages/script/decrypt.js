const img = new Image();

const charset = "!\#$%&'()*+,-~./:;<=>?[\]_{}ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥ƒáíóúñÑªº¿¬½¼¡«»αßΓπΣσµτΦΘΩδφε±÷°·²¶⌐₧▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀"
img.src = "../../image/5.jpg"

let finalArt = []
let scrambled = []
let state = "typing";

const status = document.getElementById("title")

img.onload = () => {
    const canvas = document.querySelector("canvas");

    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    
    canvas.height = img.height;

    const scale = 0.17;

    canvas.width = Math.floor(img.width * scale);

    canvas.height = Math.floor(img.height * scale);

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    for (let y = 0; y< canvas.height; y++) {
        let line = "";
        for (let x = 0; x< canvas.width; x++) {
            const idx = (y * canvas.width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const brightness = (r + g + b)/3;
            line += brightness > 128 ? "█" : " ";
        }
        finalArt.push(line);
    }
    typewriterScramble();
};

function typewriterScramble() {
    const output = document.getElementById("output");
    scrambled = finalArt.map(row => row.split("").map(() => charset[Math.floor(Math.random() * charset.length)]).join(""));
    let flatText = scrambled.join("\n").split("");
    let typed = "";
    let i = 0;
    const interval = setInterval(() => {
        typed += flatText[i];
        output.textContent = typed;
        i++;
        if (i >= flatText.length) {
            clearInterval(interval);
            state = "ready";
            document.getElementById("title").textContent = "Nhấn Enter để giải mã hoá";
        }
    }, 5)
}

function decryptAnimation() {
    let step = 0;
    const output = document.getElementById("output");
    const interval = setInterval(() => {
        scrambled = scrambled.map((row, y) => row.split("").map((ch, x) => {
            return Math.random()< step / 20 ? finalArt[y][x] : charset[Math.floor(Math.random() * charset.length)];
        }).join(""));
        output.textContent = scrambled.join("\n");
        step++;
        if (step > 30) {
            output.textContent = finalArt.join("\n");
            clearInterval(interval);
            setTimeout(buildAnimation, 500);
        }
    }, 100);
}

function buildAnimation() {
    let current = finalArt.map(r => " ".repeat(r.length));
    let row = 0;
    const output = document.getElementById("output");
    const interval = setInterval(() => {
        current[row] = finalArt[row];
        output.textContent = current.join("\n");
        row++;

        if (row >= finalArt.length) {
            clearInterval(interval);
            state = "finished";
            document.getElementById("title").textContent = "Flower for you :>";
        }
    }, 50);
}

document.addEventListener("keydown", e => {
    if (e.key === "Enter" && state === "ready") {
        decryptAnimation();
    } else if (state === "finished") {
        window.location.href = "../../index.html";
    }
});