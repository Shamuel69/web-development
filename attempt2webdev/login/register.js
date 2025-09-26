const checkboxshow1 = document.getElementById('signup-button');
const checkboxshow2 = document.getElementById('confirm-signup-button');
const passwordInput = document.getElementById('Password');
const confirmpasswordInput = document.getElementById('confirms-Password');


checkboxshow1.onclick = () => {
    if(checkboxshow1.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}
checkboxshow2.onclick = () => {
    if(checkboxshow2.checked) {
        confirmpasswordInput.type = "text";
    } else {
        confirmpasswordInput.type = "password";
    }
}