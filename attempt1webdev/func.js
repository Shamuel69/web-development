const dropdownButton = document.getElementById('dropdown-button');
const dropdownContent = document.getElementById("dropdown-content");
const themeContent = document.querySelector('.theme-content');

dropdownButton.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
});

window.addEventListener('click', (event) => {
    if (event.target !== dropdownButton) {
        themeContent.classList.remove('show');
    }
})