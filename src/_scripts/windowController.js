export class WindowController{
  constructor(){
    this.desktopMaxSize = 1366;
    this.desktopMinSize = 800;

    this.isFullScreen = false;
    this.isMobile = false;
  }

  isFullScreen(){
    return window.innerWidth >= this.desktopMaxSize;
  }

  isMobileVersion(){
    return  (window.innerWidth < this.desktopMinSize);
  }
}