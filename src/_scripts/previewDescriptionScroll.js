//import "gsap";

class previewDescriptionScroll {

    constructor(id_outerBox, id_contentBox, id_phantomColumn, id_fullButton, id_fullButtonArrow, gsapTwiner){

      this.checkpoints = [];
      this.currentChecpointIndex = 0;

      this.buttonIsFolded = true;
      this.buttonCanBeUnfolded = false;
      
      this.projectPreview_buttonFullProject_width = 240;
      this.projectPreview_buttonFullProject_padding = 22;

      this.outerBox = document.getElementById(id_outerBox);
      this.contentBox = document.getElementById(id_contentBox);
      this.phantomColumn = document.getElementById(id_phantomColumn);
      this.fullButton = document.getElementById(id_fullButton);
      this.fullButtonArrow = document.getElementById(id_fullButtonArrow);

      this.gsap = gsapTwiner;

      this.outerBox.addEventListener("scroll", () => {
        this.updateFullButtonHorizontalPosition();
      });
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
      
      if(additionalSectionWidth > this.projectPreview_buttonFullProject_width + 25){ //!!!! Magic number
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

      if (this.outerBox.scrollLeft < (this.checkpoints[this.checkpoints.length - 1]-10)) { //!!!! 10 is too much !!!!
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

      this.fullButtonArrow.style.animation = "arrow_slideTop 0.5s ease";
      this.fullButton.style.animation = "slideTop 0.5s ease"; 

      this.fullButton.classList.add('unfolded');
      this.fullButtonArrow.classList.add('unfolded');
    }

    foldFullProjectButton(){
      if(this.buttonIsFolded){
          return;
        }
        this.buttonIsFolded = true;

        this.fullButtonArrow.style.animation = "arrow_slideBottom 0.3s ease";
        this.fullButton.style.animation = "slideBottom 0.3s ease";

        this.fullButton.classList.remove('unfolded');
        this.fullButtonArrow.classList.remove('unfolded');
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

    updateFullButtonHorizontalPosition() {
      //buttonContainer = document.getElementById("preview_buttonFullProject");
      if (!this.buttonCanBeUnfolded) {
        this.fullButton.style.right = 50 + "px";
        return;
      }

      let windowWidth = this.outerBox.offsetWidth;
      let phantomWidth = this.phantomColumn.offsetWidth;
      let totalWidth = this.outerBox.scrollWidth;
      let scrollLeft = this.outerBox.scrollLeft;

      let result = -1*(totalWidth - scrollLeft - windowWidth  + 300 + 210);

      if (result < 50) {
        result = 50
      } 

      this.fullButton.style.right = result + "px";
    }

    moveToCheckpoint(index) {
      this.currentChecpointIndex = index;

      this.updateButtonFoldState();

      this.gsap.to(  this.outerBox,{
                      scrollLeft: this.checkpoints[index],
                      duration: 0.5, ease: "power2.inOut",
                      onComplete: () => {
                        this.isAnimating = false;
                      },
                      onUpdate: () => {
                        this.updateFullButtonHorizontalPosition();
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