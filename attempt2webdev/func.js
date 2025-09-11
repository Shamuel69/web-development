const img = document.querySelector('.darkmode-icon');
const profileButton = document.getElementById('profile-button');
const signInContent = document.getElementById('sign-in-content');

profileButton.addEventListener("click", (event) => {
    event.stopPropagation();
    signInContent.classList.toggle('active');
});

document.addEventListener('click', (event) => {
    if (!signInContent.contains(event.target)) {
        signInContent.classList.remove('active');
    }
});

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
