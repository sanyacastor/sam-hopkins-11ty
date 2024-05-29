//('scrollNavBar',)

class projectView_navpanel {
    constructor(scrollNavBar_id) {
      console.log("load");
      this.scrollNavBar = document.getElementById(scrollNavBar_id);
      console.log("scrollNavBar: " + scrollNavBar_id + " " + this.scrollNavBar); 
    }

    createNavPrevButton() {
      return '<button class="navigation-button left-button nav-arrow-project-view", id="navButtonScrollToPrevCheckpoint", onclick="scrollPrevCheckpoint()"></button>';
    }

    createNavNextButton() {
      return '<button class="navigation-button right-button nav-arrow-project-view" id="navButtonScrollToNextCheckpoint", onclick="scrollNextCheckpoint()"></button>';
    }
    createNavButton(n, checkp) {
      return `<button class="projectView_navigationDigit"
                              id="navButton${n}"
                              targetPersent="${checkp}"
                              targetCheckpoint="${n}"
                              onclick="navDigitClicked(${checkp})">
                              ${n}
              </button>`;
    }

    redrawNavButtons(checkpoints) {
      console.log("redrawNavButtons: " + checkpoints.length + " :: " + checkpoints);

      this.scrollNavBar.innerHTML = '';
      let newNav = '';

      newNav += this.createNavNextButton();

      for(let i=checkpoints.length-1; i >= 0 ; i--)
          newNav += this.createNavButton(i, checkpoints[i]);

      this.scrollNavBar.innerHTML = newNav;
      //document.getElementById('navButton0').classList.add('active');

      this.show_hide_navpanel(checkpoints);
    }

    show_hide_navpanel(checkpoints) {
      if(checkpoints.length > 1)
        this.scrollNavBar.style.display = 'block';
      else
        this.scrollNavBar.style.display = 'none';
    }
    
}