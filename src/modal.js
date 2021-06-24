
class Open {
    constructor() {
        var modal = document.getElementById("modal");
        var span = document.getElementsByClassName("close")[0];

        modal.onclick = function (event) {
            event.stopPropagation();
            modal.style.display = "none";
            document.body.style.overflowY = 'scroll';
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
            //document.body.style.position = 'static';
            document.body.style.overflowY = 'scroll';
            
        }

        // When the user clicks anywhere outside of the modal, close it
        //window.onclick = function (event) {
        //    if (event.target == modal) {
        //        event.stopPropagation();

        //        modal.style.display = "none";

        //        //document.body.style.position = 'static';
        //        document.body.style.overflowY = 'scroll';
        //    }
        //}
    }

    images() {
        var modal = document.getElementById("modal");
        modal.style.display = "block";
        //document.body.style.position = 'fixed';
        document.body.style.overflow = 'hidden';
    }
      
}

export { Open }