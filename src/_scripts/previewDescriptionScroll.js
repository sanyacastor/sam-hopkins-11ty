//import "gsap";

class previewDescriptionScroll{

    constructor(id_outerBox, id_contentBox, id_phantomColumn, id_fullButton, id_fullButtonArrow, gsapTwiner){

      this.checkpoints = [];
      this.currentChecpointIndex = 0;

      this.buttonIsFolded = true;
      this.buttonCanBeUnfolded = false;
      
      this.projectPreview_buttonFullProject_width = 228;
      this.projectPreview_buttonFullProject_padding = 22;

      this.outerBox = document.getElementById(id_outerBox);
      this.contentBox = document.getElementById(id_contentBox);
      this.phantomColumn = document.getElementById(id_phantomColumn);
      this.fullButton = document.getElementById(id_fullButton);
      this.fullButtonArrow = document.getElementById(id_fullButtonArrow);

      this.gsap = gsapTwiner;
    }
    
    destructor(){     
    }

    getNumberOfColumns(){
      return this.checkpoints.length;
    }

    onload() {
      this.onResize();
      
      this.moveToCheckpoint(0);
      this.updateButtonFoldState();
    }
    
    onResize() {
      this.recalcUnfoldTriggerPosition();
      this.recalcCheckpoints();
      this.updateButtonFoldState();

      this.foldFullProjectButton();
    }

    recalcUnfoldTriggerPosition() {
      let scrollLength = this.outerBox.scrollWidth;
      let boxWidth = this.outerBox.offsetWidth;

      let columnWidth = this.contentBox.offsetWidth;
      let numberOfColumns = Math.floor( (scrollLength) / (columnWidth)); //!!!PELIGRO!!!! magic number

      let additionalSectionWidth = boxWidth - columnWidth;
      if(additionalSectionWidth < 0)
        additionalSectionWidth = 0;

      this.phantomColumn.style.width = additionalSectionWidth + "px";
      this.phantomColumn.style.display = "block";
      
      if(additionalSectionWidth > this.projectPreview_buttonFullProject_width + 50){ //!!!! Magic number
        this.buttonCanBeUnfolded = true;
      }
      else{
        this.buttonCanBeUnfolded = false;
      }
    }

    updateButtonFoldState() {
      if(this.buttonCanBeUnfolded == false){
        this.foldFullProjectButton();
        return;
      }

      if (this.outerBox.scrollLeft < this.checkpoints[this.checkpoints.length - 1]) {
        this.foldFullProjectButton();
      }
      else if(this.buttonCanBeUnfolded){
        this.unfoldFullProjectButton();
      }
    }
    
    unfoldFullProjectButton() {
      if(!this.buttonIsFolded){
          return;
        }

      this.buttonIsFolded = false;
      let buttonFullProject_arrow = document.getElementById("preview_buttonFullProject_arrow");
      
      this.fullButton.style.height = "288px"; //!!!! Magic number
      this.fullButton.style.bottom = "90px";  //!!!! Magic number
      /*buttonFullProject.style.right = "200px"; */

      this.fullButtonArrow.style["border-top"] = "143px solid transparent";
      this.fullButtonArrow.style["border-bottom"] = "143px solid transparent";
      this.fullButtonArrow.style.animation = "arrow_slideTop 1s ease";
      this.fullButton.style.animation = "slideTop 1s ease"; 
    }
    foldFullProjectButton(){
      if(this.buttonIsFolded){
          return;
        }
        this.buttonIsFolded = true;

        this.fullButton.style.height = "61px"; //!!!! Magic number
        this.fullButton.style.bottom = "8px";  //!!!! Magic number
        
        this.fullButtonArrow.style["border-top"] = "30px solid transparent";
        this.fullButtonArrow.style["border-bottom"] = "30px solid transparent";
        this.fullButtonArrow.style.animation = "arrow_slideBottom 0.5s ease";
        this.fullButton.style.animation = "slideBottom 0.5s ease";
    }

    checkpointIsTheLast(){
      if(this.checkpoints == null || this.checkpoints.length == 0)
        return false;

      return this.currentChecpointIndex == (this.checkpoints.length - 1);
    }
    recalcCheckpoints(){
      this.phantomColumn.style.display = "none";

      let scrollLength = this.outerBox.scrollWidth;
      let boxWidth = this.contentBox.offsetWidth;
      
      let paddingLeft = parseInt(window.getComputedStyle(this.contentBox).paddingLeft);
      let paddingRight = parseInt(window.getComputedStyle(this.contentBox).paddingRight);

      let numberOfSteps = scrollLength / (boxWidth+paddingLeft);

      let fractionalSteps = numberOfSteps % 1;
      if(fractionalSteps > 0.8)  //!!!!Nasty...!!!!
        numberOfSteps = Math.ceil(numberOfSteps);
      else
        numberOfSteps = Math.floor(numberOfSteps);
      
      this.checkpoints = [];
      for(let i = 0; i < numberOfSteps; i++){
        this.checkpoints.push(i * (boxWidth+paddingLeft));
      }

      if(this.checkpoints.length == 1)
        this.checkpoints[0] = 0;

      this.phantomColumn.style.position = "absolute";
      this.phantomColumn.style.left = this.checkpoints[this.checkpoints.length-1] + boxWidth + paddingLeft + "px";
      this.phantomColumn.style.display = "block";
    }

    scrollRight(){
      if (this.isAnimating)
        return;

      let targetCheckpointIndex = this.currentChecpointIndex + 1;
      if(targetCheckpointIndex >= this.checkpoints.length){
        targetCheckpointIndex = this.checkpoints.length - 1;
      }

      this.moveToCheckpoint(targetCheckpointIndex);
    }

    scrollLeft(){
      if (this.isAnimating)
        return;
      
      let targetCheckpointIndex = this.currentChecpointIndex - 1;
      if(targetCheckpointIndex < 0){
        targetCheckpointIndex = 0;
      }

      this.moveToCheckpoint(targetCheckpointIndex);
    }

    moveToCheckpoint(index){
      this.currentChecpointIndex = index;

      this.updateButtonFoldState();

      this.gsap.to(  this.outerBox,{
                      scrollLeft: this.checkpoints[index],
                      duration: 0.5, ease: "power2.inOut",
                      onComplete: () => {
                        this.isAnimating = false;
                      }
                  });
      this.isAnimating = true;
    }

    moveToTheLastCheckpoint(){
      this.moveToCheckpoint(this.checkpoints.length - 1);
    }

    isLastCheckpoint(){
      return this.currentChecpointIndex == this.checkpoints.length - 1;
    }

    isFirstCheckpoint(){
      return this.currentChecpointIndex == 0;
    }
  }