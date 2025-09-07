const img = document.querySelector('.darkmode-icon');

img.addEventListener('click', () => {
    document.body.classList.toggle('lightmode');

    if (document.body.classList.contains('lightmode')) {
        img.src = "images/lightmode.png";
        console.log('lightmode');
        localStorage.setItem("theme", "lightmode");
    } else {
        img.src = "images/darkmode.png";
        console.log('darkmode');
        localStorage.setItem("theme", "darkmode");
    }
});