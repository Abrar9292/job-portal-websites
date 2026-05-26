document.addEventListener("DOMContentLoaded", function(){

    const applyButtons =
    document.querySelectorAll(".apply-check-btn");

    applyButtons.forEach((btn)=>{

        btn.addEventListener("click", function(e){

            e.preventDefault();

            const loggedIn =
            localStorage.getItem("careerUser");

            if(loggedIn){

                window.location.href = "apply.html";

            }else{

                window.location.href = "auth.html";

            }

        });

    });

});