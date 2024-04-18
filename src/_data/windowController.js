const windowMaxSize = 1366;
const fullscreen_projectpreview_column_width = 878;
const fullscreen_projectview_column_width = 417;

isFullScreen = false;
isMobile = false;

function windowController_recalcWindow(){
    if(window.innerWidth >= windowMaxSize){
        isFullScreen = true;
        isMobile = false;
    }
    else
        isFullScreen = false;

    console.log("isFullScreen: " + isFullScreen);
}