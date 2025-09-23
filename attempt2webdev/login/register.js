const checkboxshow1 = document.getElementById('signup-button');
const checkboxshow2 = document.getElementById('confirm-signup-button');
const passwordInput = document.querySelector('.Password');
const confirmpasswordInput = document.querySelector('.confirm-Password');


checkboxshow1.onclick = () => {
    if(checkboxshow1.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}
checkboxshow1.addEventListener('click', () => {
    if(checkboxshow1.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
})
checkboxshow2.onclick = () => {
    if(checkboxshow1.checked) {
        confirmPasswordInput.type = "text";
    } else {
        confirmPasswordInput.type = "password";
    }
}