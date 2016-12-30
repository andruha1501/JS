var wasclickArrow = wasclickDownload = wasMouseenter = wasclickTime = true;
var target = document.querySelector("body");
var percentOverload;
var i;
var idVideo;
var timw;
var hid_ele;
var numberDownloadVideo = 0;
var seconds;
var allVideos = document.querySelectorAll('._5asm');

var searchIdVideo = function(event) {
    for (z = 0; z < allVideos.length; z++) {
        if (allVideos[z].getAttribute("href") === event.target.parentElement.parentElement.getAttribute("href")) {
            i = z;
            document.body.removeEventListener('click', searchIdVideo);
            break;
        }
    }
}
document.body.addEventListener('click', searchIdVideo)

var fireEvent = function(element, event) {
    var evt;
    var isString = function(it) {
        return typeof it == "string" || it instanceof String;
    }
    element = (isString(element)) ? document.getElementById(element) : element;
    if (document.createEventObject) {
        evt = document.createEventObject();
        return element.fireEvent('on' + event, evt)
    } else {
        evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true); // event type,bubbling,cancelable
        return !element.dispatchEvent(evt);
    }
}

function Pause() {
    var pause = document.getElementById(idVideo);
    pause.click();
    console.log("pause");
}

function clickSmallVideo() {
    var smallVideo = document.querySelectorAll('._5asm')[i];
    smallVideo.click()
    console.log("click small video");
}

function clickTitleVideo() {
    var titleVideo = document.querySelector('._5o2k');
    titleVideo.click()
    console.log("click Title Video");
}

function clickArrow() {
    var arrow = document.getElementsByClassName('sf-feed')[0];
    arrow.click();
    arrow.click();
    console.log("i = " + i);
}

function clickDownload() {
    var downloadVideo = document.getElementsByClassName('sf-menu-item')[0];
    downloadVideo.click();
    console.log("clickArrow")
    i--;
    numberDownloadVideo++;
    console.log("download = " + numberDownloadVideo)
}

function Close() {
    var closeVideo = document.querySelectorAll('._5tl7')[0];
    closeVideo.click();
}

function clickTime(tag) {
    var time = tag.children[0].children[1].children[0].children[0].children[2].children[0];
    time.click();
    return time;
}

// create an observer instance
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (wasMouseenter && !mutation.target.classList.contains('hidden_elem') && mutation.target.tagName === "VIDEO") {
            idVideo = mutation.target.id;
            hid_ele = mutation.target;
            fireEvent(idVideo, "mouseenter");
            wasMouseenter = false;
            console.log('wasMouseenter');
        }

        if (mutation.target.classList.contains("_23if")) {
            clickTitleVideo();
        }

        if (wasclickTime && mutation.target.classList.contains("_11q2")) {
            wasclickTime = false;
            timw = clickTime(mutation.target);
            console.log("click on time");
        }

        if (mutation.removedNodes.length !== 0) {
            if (mutation.target.classList.contains("hidden_elem")) {
                wasclickArrow = wasclickDownload = wasMouseenter = wasclickTime = true;
                console.log('reset');
                var pusk = setTimeout(clickSmallVideo, 2000);
            }
        }

        if (wasclickArrow && mutation.target.classList.contains("_gn4") && !hid_ele.classList.contains('hidden_elem')) { // 
            Pause();
            percentOverload = mutation.target.style.width.slice(0, -1);
            seconds = timw.innerHTML.slice(3);
            if (percentOverload > 5.0 && seconds > 2) {
                wasclickArrow = false;
                clickArrow();
            }
        }


        if (wasclickDownload && mutation.target.title === "video/mp4") {
            var sizeVideo = mutation.target.innerHTML.slice(0, -3);
            if (sizeVideo > 0) {
                clickDownload();
                Close();
                wasclickDownload = false;
            }
        }
    });
});

// configuration of the observer
var config = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeOldValue: true
};

// pass in the target node, as well as the observer options
observer.observe(target, config);