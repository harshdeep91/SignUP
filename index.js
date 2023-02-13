import passwordChecker from "/passwordChecker.js";
const image = document.getElementById("image");
image.addEventListener("change", (e) => {
    const files = document.getElementById("files").files;
    if (!files || files.length == 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const changeImg = document.getElementById("changeImg");
        image.style.display = "none";
        changeImg.style.display = "flex";
        const uploadedImage = document.getElementById("uploadedImg");
        uploadedImage.setAttribute("src", reader.result);
    };
});

document.getElementById("password").addEventListener("keyup", (e) => document.getElementById("message").textContent = passwordChecker(e.target.value));
const signUpForm = document.getElementById("signUpForm");


signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const Password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    if (Password.value != confirmPassword.value) {
        confirmPassword.value = "";
        alert("Password is not Matching");
    } else {
        if (passwordChecker(Password.value) == "Extremely difficult. ") {
            sendrequest();
        } else alert("Please Change Your Password");
    }
});

async function sendrequest() {
    const formData = new FormData(signUpForm);
    formData.delete("confirmPassword");
    try {
        const response = await fetch("http://localhost:8090/api/signup", {
            method: "POST",
            body: formData
        });
        const responseObject = response.json();
        if (responseObject.status == "sucess")
            location.replace(window.location.origin + "/login.html")
        else
            alert("Mail is in already use");
    } catch (e) {
        alert("Server Error")
    }

}