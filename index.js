import passwordChecker from "./passwordChecker.js";
const imageData = null;
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

document.querySelector(".password").addEventListener("keyup", (e) => document.querySelector("#message").textContent=passwordChecker(e.target.value));
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
  } else {
    if (passwordChecker(Password.value) == "Extremely difficult. ") {
      sendrequest();
      alert("Your sign up is saved");
    } else alert("Please Change Your Password");
  }
});

// const sendOtp= document.querySelector(".send");
// console.log(sendOtp);
// sendOtp.addEventListener("click",(e)=>{
//   e.preventDefault();
//   const otpInput=document.querySelector(".otpInput");
//   otpInput.readOnly=false;
//   otpInput.placeholder="OTP";

//   // if(document.querySelector(".email").value==)
//   let count=30;
//   const otpCount= document.querySelector("#otp-count");
//   console.log(otpCount);
//   setInterval(()=>{
//     otpCount.innerText=`Resend otp in ${count--} Seconds`;
//     if(count==-1)
//     clearInterval();
//   },1000)

// })

 function sendrequest(){
  const formData = new FormData(signUpForm);
      formData.delete("confirmPassword");
      // formData.delete("image");
      for(let item of formData)
      console.log(item[0],item[1]);
       fetch("http://localhost:8090/api/signup",{
        method:"POST",
        body:formData
       }).then((res)=>res.json())
       .then((res)=>{
        if(res.message=="success")
        location.replace("https://www.w3schools.com")
        else
        alert("Mail is in already use")
       });
}