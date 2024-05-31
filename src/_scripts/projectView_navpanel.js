export class projectView_navpanel {
  constructor(scrollNavBar_id) {
      this.scrollNavBar = document.getElementById(scrollNavBar_id);
  }

  createNavPrevButton() {
      const button = document.createElement('button');
      button.className = 'navigation-button left-button nav-arrow-project-view';
      button.id = 'navButtonScrollToPrevCheckpoint';
      return button;
  }

  createNavNextButton() {
      const button = document.createElement('button');
      button.className = 'navigation-button right-button nav-arrow-project-view';
      button.id = 'navButtonScrollToNextCheckpoint';
      return button;
  }

  createNavButton(n, checkp) {
      const button = document.createElement('button');
      button.className = 'projectView_navigationDigit';
      button.id = `navButton${n}`;
      button.setAttribute('targetPersent', checkp);
      button.setAttribute('targetCheckpoint', n);
      
      button.textContent = n+1;
      return button;
  }

  redrawNavButtons(checkpoints, navDigitClicked) {
    document.querySelectorAll('.projectView_navigationDigit').forEach(e => e.remove());
    document.getElementById('navButtonScrollToPrevCheckpoint')?.remove();
    document.getElementById('navButtonScrollToNextCheckpoint')?.remove();

    let nextButton = this.createNavNextButton();
    this.scrollNavBar.appendChild(nextButton);

    for(let i = checkpoints.length - 1; i >= 0; i--) {
        let navButton = this.createNavButton(i, checkpoints[i]);
        this.scrollNavBar.appendChild(navButton);
    }

    // document.getElementById('navButton0').classList.add('active');

    this.show_hide_navpanel(checkpoints);
  }

  show_hide_navpanel(checkpoints) {
      if (checkpoints.length > 1) {
          this.scrollNavBar.style.display = 'block';
      } else {
          this.scrollNavBar.style.display = 'none';
      }
  }
}
