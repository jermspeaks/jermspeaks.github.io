(function() {
    var headTrackingElement = document.getElementById('cbz-head-tracker');
    // Initial head direction
    var headDirectionClass = 'jeremy-middle-center';
    console.log('Head Tracking Element === ', headTrackingElement);

    // Initialize with head
    headTrackingElement.classList.add(headDirectionClass);

    headTrackingElement.addEventListener("mousemove", followHead);

    function followHead(event) {
        console.log('Following head', event);
    }
})();
