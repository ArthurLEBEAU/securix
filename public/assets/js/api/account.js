(()=>{var f=Object.defineProperty;var u=(s,n)=>f(s,"name",{value:n,configurable:!0});async function d(s="",n={}){return(await fetch(s,{method:"POST",mode:"cors",headers:{Accept:"application.json","Content-Type":"application/json"},referrerPolicy:"no-referrer",body:JSON.stringify(n)})).json()}u(d,"postData");$(document).ready(async function(){let s=document.querySelectorAll("#icon_show"),n=document.querySelector("#password"),l=document.querySelector("#confirm");s.forEach((i,t)=>{i.addEventListener("click",a=>{let c=t==0?n:l;i.setAttribute("src",c.type=="password"?"/static/assets/images/login/icons8-eye.png":"/static/assets/images/login/icons8-eye-slash.png"),c.type=c.type=="password"?"text":"password"})});let e=document.querySelector("form"),r=document.querySelector("form > button"),o=!1;e.addEventListener("submit",i=>{if(i.preventDefault(),!o){let t={username:e.elements.userName.value,password:e.elements.password.value,confirmPwd:e.elements.confirm.value};t.username==""||t.password==""||t.confirmPwd==""?Swal.fire({icon:"error",title:"Oops...",text:"des informations manquent!"}):(o=!0,r.classList.toggle("is-loading"),e.classList.toggle("is-loading"),r.textContent="Chargement...",d(e.getAttribute("action"),t).then(a=>{r.classList.toggle("is-loading"),e.classList.toggle("is-loading"),r.textContent="changer",o=!1,a.error?Swal.fire({icon:"error",title:"Oops...",text:a.error}):(Swal.fire({icon:"success",text:"Mot de passe modifi\xE9 !",showConfirmButton:!1,timer:3e3}),e.elements.userName.value="",e.elements.password.value="",e.elements.confirm.value="")},a=>{r.classList.toggle("is-loading"),e.classList.toggle("is-loading"),o=!1,r.textContent="changer",Swal.fire({icon:"error",title:"Oops...",text:"reessayer plus tard!"})}))}})});})();