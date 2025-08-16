const btn2 = document.querySelector('.btn2');
const titles = document.querySelector('.title');

const buttonTitles = {
    btn1: 'Decrypt',
    btn2: 'Musics',
    btn3: 'Game',
    btn4: 'Discord'
}
const btn2hoverImages = [
    '../image/2.jpg',
    '../image/2-1.jpg',
    '../image/2-2.jpg',
    '../image/2-3.jpg'
];

['btn1', 'btn2', 'btn3', 'btn4'].forEach(btnClass => {
    const btn = document.querySelector(`.${btnClass}`);
    btn.addEventListener('mouseenter', () => {
        titles.textContent = buttonTitles[btnClass];
    });
    btn.addEventListener('mouseleave', () => {
        titles.textContent = 'For Thu Ha';
    });
});


let intervalId;
let index = 0;
btn2.addEventListener('mouseenter', () => {
    intervalId = setInterval(() => {
        btn2.style.setProperty('--bg-url', `url('${btn2hoverImages[index]}')`);
        index = (index+1) % btn2hoverImages.length;
    }, 1000);
});

btn2.addEventListener('mouseleave', () => {
    clearInterval(intervalId);
    index = 0;
    btn2.style.setProperty('--bg-url', "url('../image/2.jpg')");
});

//const btn4 = document.querySelector('.btn4');
//btn4.addEventListener('click', () => {
//    window.location.href = 'https://discord.gg/SkHX3xA8q6'
//});
const btnlink = {
    btn1: '../pages/decrypt.html',
    btn2: '../pages/musics.html',
    btn3: '../pages/game.html',
    btn4: 'https://discord.gg/SkHX3xA8q6'
};

for (const btnClass in btnlink) {
    const btn = document.querySelector(`.${btnClass}`);
    btn.addEventListener('click', () => {
        window.location.href = btnlink[btnClass];
    });
}