const dropdownButton = document.getElementById('dropdown-button');
const dropdownContent = document.getElementById("dropdown-content");
const themeContent = document.querySelector('.theme-content');
const savedTheme = localStorage.getItem("theme")


dropdownButton.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
});

window.addEventListener('click', (event) => {
    if (event.target !== dropdownButton) {
        themeContent.classList.remove('show');
    }
})

if(savedTheme){
    document.body.classList.add(savedTheme);
}
