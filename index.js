import passwordChecker from "./passwordChecker.js";

const image = document.querySelector(".image");
image.addEventListener("change", (e) => {
  const files = document.getElementById("files").files;

  if (!files || files.length == 0) return;
  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const changeImg = document.querySelector(".changeImg");
    image.style.display = "none";
    changeImg.style.display = "flex";
    const uploadedImage = changeImg.querySelector("img");
    uploadedImage.setAttribute("src", reader.result);
  };
});

const password = document.querySelector(".password");
password.addEventListener("change", (e) => {
  // console.log(e.target.value);
  alert(passwordChecker(e.target.value));
  // console.log(e.target.value);
  // console.log(password.value);
  // console.log("hello");
});

const signUpForm = document.querySelector(".signUpForm");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const Name = document.querySelector(".name").value;
  const Email = document.querySelector(".email").value;
  const Password = document.querySelector(".password");
  const confirmPassword = document.querySelector(".confirmPassword");
  // alert(passwordChecker(Password.value));
  if (Password.value != confirmPassword.value) {
    confirmPassword.value = "";
    alert("Password is not Matching");
  }else
  {
    if(passwordChecker(password.value)=="Extremely difficult. ")
      alert("Your sign up is saved")
      else
      alert("Please Change Your Password")
  }
  
});
