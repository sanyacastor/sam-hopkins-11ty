class previewNavigationPanel{
    constructor(id_buttonLeft, id_buttonRight, id_buttonClose){
        this.buttonLeft = document.getElementById(id_buttonLeft);
        this.buttonRight = document.getElementById(id_buttonRight);
        this.buttonClose = document.getElementById(id_buttonClose);
    }

    setState(isEnabled){
        if(isEnabled == true){
            ;
        }
        else{
            ;
        }
    }

    setButtonsLeftRightState(isEnabled){
        if(isEnabled == true){
            this.buttonLeft.style.display = "block";
            this.buttonRight.style.display = "block";
        }
        else{
            this.buttonLeft.style.display = "none";
            this.buttonRight.style.display = "none";
        }
    }

    update(descriptionScrollobject){
        console.log(">>>> update navigation panel number of columns: " + descriptionScrollobject.getNumberOfColumns());

        if(descriptionScrollobject.getNumberOfColumns() > 1)
            this.setButtonsLeftRightState(true);
          else
            this.setButtonsLeftRightState(false);

        console.log("update navigation panel: isFirstCheckpoint=" + descriptionScrollobject.isFirstCheckpoint() + " isLastCheckpoint=" + descriptionScrollobject.isLastCheckpoint());

        if (descriptionScrollobject.isFirstCheckpoint() ) {
            this.buttonLeft.classList.add("inactive");
        } else {
            this.buttonLeft.classList.remove("inactive");
        }

        if(descriptionScrollobject.isLastCheckpoint()){
            this.buttonRight.classList.add("inactive");
        } else {
            this.buttonRight.classList.remove("inactive");
        }
    }
}