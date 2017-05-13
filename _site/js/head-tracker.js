(function() {
    const headPositions = {
        topLeft: 'jeremy-top-left',
        topCenter: 'jeremy-top-center',
        topRight: 'jeremy-top-right',
        middleLeft: 'jeremy-middle-left',
        middleCenter: 'jeremy-middle-center',
        middleRight: 'jeremy-middle-right',
        bottomLeft: 'jeremy-bottom-left',
        bottomCenter: 'jeremy-bottom-center',
        bottomRight: 'jeremy-bottom-right'
    };
    const regionHeadPosition = {
        '00': 'topLeft',
        '10': 'topCenter',
        '20': 'topRight',
        '01': 'middleLeft',
        '11': 'middleCenter',
        '21': 'middleRight',
        '02': 'bottomLeft',
        '12': 'bottomCenter',
        '22': 'bottomRight',
    };
    const headTrackingElement = getHeadTracker();
    const bodyElement = document.body;

    var headDirectionClass = headPositions.middleCenter; // Initial Position

    // Initialize with head with initial position
    headTrackingElement.classList.add(headDirectionClass);

    // Add event listener to change region
    bodyElement.addEventListener("mousemove", followHead);

    /**
     * Getter for head tracker
     * @return {Element} Div element for head tracker
     */
    function getHeadTracker() {
        return document.getElementById('cbz-head-tracker');
    }

    /**
     * Offset left compared to the document body
     * @param  {Element} elem HTML Element
     * @return {Number}       Element offset left compared to the document
     */
    function getOffsetLeft(elem) {
        var offsetLeft = 0;
        do {
            if (!isNaN(elem.offsetLeft)) {
                offsetLeft += elem.offsetLeft;
            }
        } while ( elem = elem.offsetParent );
        return offsetLeft;
    }

    /**
     * Offset top compared to the document body
     * @param  {Element} elem HTML Element
     * @return {Number}       Element offset top compared to the document
     */
    function getOffsetTop(elem) {
        var offsetTop = 0;
        do {
            if (!isNaN(elem.offsetTop)) {
                offsetTop += elem.offsetTop;
            }
        } while ( elem = elem.offsetParent );
        return offsetTop;
    }

    /**
     * Remove current class. Set next class
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    function followHead(event) {
        // Get element
        const headTrackingElement = getHeadTracker();

        // Element attributes
        const headWidth = headTrackingElement.clientWidth;
        const headHeight = headTrackingElement.clientHeight;
        const headOffsetLeft = getOffsetLeft(headTrackingElement);
        const headOffsetTop = getOffsetTop(headTrackingElement);

        // Mouse attributes
        const mouseX = event.x;
        const mouseY = event.y;

        // Region information
        let xRegion;
        let yRegion;
        let region;

        // Next head position placeholder
        let nextHeadPosition;

        // Set X Region or Quadrant
        if (mouseX < headOffsetLeft) {
            xRegion = '0';
        } else if (mouseX > headOffsetLeft + headWidth) {
            xRegion = '2';
        } else {
            xRegion = '1';
        }

        // Set Y Region or Quadrant
        if (mouseY < headOffsetTop) {
            yRegion = '0';
        } else if (mouseY > headOffsetTop + headHeight) {
            yRegion = '2';
        } else {
            yRegion = '1';
        }

        region = `${xRegion}${yRegion}`;

        // get next region head position key
        nextHeadPosition = regionHeadPosition[region];

        // Do not change region if mouse has not changed regions
        if (headDirectionClass === headPositions[nextHeadPosition]) {
            return;
        } else {
            // Remove previous class
            headTrackingElement.classList.remove(headDirectionClass);

            // Set next head class
            headDirectionClass = headPositions[nextHeadPosition];

            // Add next class
            headTrackingElement.classList.add(headDirectionClass);
        }
    }
})();
