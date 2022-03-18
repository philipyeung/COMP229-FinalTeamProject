/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: IIFE - app.js
*/

// IIFE --> Immediately Invoked Function Expression
(function(){
    
    function Start()
    {
        console.log("App started...");

        let deleteButtons = document.querySelectorAll('.btn-danger');
        
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event) => 
            {
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign('/question-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();