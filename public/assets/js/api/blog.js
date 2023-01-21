(()=>{var S={sProcessing:"Traitement en cours ...",sLengthMenu:"Afficher _MENU_ lignes",sZeroRecords:"Aucun r\xE9sultat trouv\xE9",sEmptyTable:"Aucune donn\xE9e disponible",sInfo:"Lignes _START_ \xE0 _END_ sur _TOTAL_",sInfoEmpty:"Aucune ligne affich\xE9e",sInfoFiltered:"(Filtrer un maximum de_MAX_)",sInfoPostFix:"",sSearch:"Chercher:",sUrl:"",sInfoThousands:",",sLoadingRecords:"Chargement...",oPaginate:{sFirst:"Premier",sLast:"Dernier",sNext:"Suivant",sPrevious:"Pr\xE9c\xE9dent"},oAria:{sSortAscending:": Trier par ordre croissant",sSortDescending:": Trier par ordre d\xE9croissant"}};$(document).ready(async function(){let f="http://localhost:3000/api/article/",o=$("#articlesTable").DataTable({ajax:{url:f,cache:!0,dataSrc:"articles"},language:S,data:{},contentType:"application/json",dataType:"json",pageLength:6,scrollY:"40vh",paging:!0,bAutoWidth:!1,responsive:!0,pageResize:!0,lengthChange:!0,columns:[{data:"id"},{data:"cover"},{data:"title"},{data:"updated_at"},{defaultContent:'<div class="action"><button class="btn btn_update text-white"><i class="fa fa-pencil-alt"></i></button><button class="btn btn_delete text-white"><i class="fa fa-trash-alt"></i></button></div>'}],columnDefs:[{render:function(r,e,t){return`<img class='img-thumbnail img-fluid' alt='couverture de l'article' src='/static${r}' />`},targets:1}],createdRow:function(r,e,t,p){$(r).attr("data-id",e._id)}}),d=!0,a=!1,_=document.querySelector(".btn_create"),i=document.querySelector(".pop_frame"),x=document.querySelector(".close_btn"),b=document.querySelector(".pop_frame form"),h=document.querySelector(".pop_frame form h1"),n=document.querySelector(".pop_frame form button"),m=document.querySelector("#cover_input"),c=0,l=null;x.addEventListener("click",()=>{b.reset(),m.setAttribute("src","/static/assets/images/default_image.jpg"),i.classList.toggle("active"),c=0}),_.addEventListener("click",()=>{h.textContent="Nouvel article",d=!0,n.textContent="enregistrer",i.classList.toggle("active")}),$(document).on("click",".btn_update",r=>{d=!1,h.textContent="Modifier l'article",n.textContent="modifier",c=$($(r.target).closest("tr")).attr("data-id");for(let e=0;e<o.rows()[0].length;e++){let t=o.rows(e).data()[0];t._id==c&&($("#title").val(t.title),$("#cover_input").attr("src","/static"+t.cover),$("#category").val(t.categorie._id),$("#resume").val(t.resume),$("#content").val(t.content))}i.classList.toggle("active")}),$(document).on("click",".btn_delete",r=>{let e=$(r.target).closest("tr"),t=$(e).attr("data-id");Swal.fire({title:"voulez vous vraiment supprimer ?",showCancelButton:!0,confirmButtonText:"Confirmer"}).then(p=>{p.isConfirmed&&$.ajax({url:f+t,method:"delete",data:{id:t},success:function(){o.row(e).remove().draw(),Swal.fire("service supprim\xE9!","","success")}})})}),$(document).on("change","#cover",r=>{l=$(r.target)[0].files[0];let e=URL.createObjectURL(l).toString();m.setAttribute("src",e)}),$("#form_modal").submit(function(r){if(r.preventDefault(),a)return;let e=new FormData,t=$.trim($("#title").val()),p=$.trim($("#resume").val()),w=$.trim($("#content").val()),v=$.trim($("#category").val());if(l==null&&d){Swal.fire({icon:"error",title:"Oops...",text:"le fichier image ne peut pas etre vide !"});return}if(v=="categorie"){Swal.fire({icon:"error",title:"Oops...",text:"choisisser une categorie s'il vous plait !"});return}e.append("title",t),l!=null&&e.append("cover",l),e.append("resume",p),e.append("content",w),e.append("cat_id",v),n.textContent="Chargement...",d?$.ajax({url:f,method:"post",contentType:!1,processData:!1,data:e,success:function(s){n.textContent="enregistrer",a=!1,Swal.fire({icon:"success",text:"Question ajout\xE9e !",showConfirmButton:!1,timer:1e3}),o.ajax.reload(null,!1),document.querySelector(".pop_frame form").reset(),m.setAttribute("src","/static/assets/images/default_image.jpg"),i.classList.toggle("active")},error:function(s){if(n.textContent="enregistrer",a=!1,s.status==422){let u="";for(let g in s.responseJSON.error)u+=`<li>${s.responseJSON.error[g]}</li>`;Swal.fire({icon:"error",title:"Oops...",html:`<ul>${u}</ul>`})}else Swal.fire({icon:"error",title:"Oops...",text:s.responseJSON.error})}}):$.ajax({url:f+c,method:"patch",contentType:!1,processData:!1,data:e,success:function(s){n.textContent="modifier",a=!1,Swal.fire({icon:"success",text:"article modifi\xE9 !",showConfirmButton:!1,timer:1e3}),o.ajax.reload(null,!1),document.querySelector(".pop_frame form").reset(),m.setAttribute("src","/static/assets/images/default_image.jpg"),i.classList.toggle("active"),c=0},error:function(s){if(n.textContent="modifier",a=!1,s.status==422){let u="";for(let g in s.responseJSON.error)u+=`<li>${s.responseJSON.error[g]}</li>`;Swal.fire({icon:"error",title:"Oops...",html:`<ul>${u}</ul>`})}else Swal.fire({icon:"error",title:"Oops...",text:"une erreur est survenue!"})}})})});})();
