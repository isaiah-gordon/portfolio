
class Open {
    constructor() {
        var modal = document.getElementById("modal");
        var span = document.getElementsByClassName("close")[0];

        modal.onclick = function (event) {
            var modal_frame = document.getElementById("modal-iframe");
            modal_frame.src = ""
            event.stopPropagation();
            modal.style.display = "none";
            document.body.style.overflowY = 'scroll';
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            var modal_frame = document.getElementById("modal-iframe");
            modal_frame.src = ""
            modal.style.display = "none";
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
        var modal_frame = document.getElementById("modal-iframe");

        modal_frame.src = "modal_templates/slideshow_modal.html"

        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
    }

    video() {
        var modal = document.getElementById("modal");
        var modal_frame = document.getElementById("modal-iframe");

        modal_frame.src = "modal_templates/video_modal.html"

        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
    }
      
}

export { Open }