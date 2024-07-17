//hscroll_content: projectView_ScrollArticle)
//hscroll_outer: projectView_outer

class projectView_scrollText {
  constructor(projectView_outer_id,
              phantomColumn_id,
              hscrollContent_id,
              first_hackcolumn_id,
              gsap_instance) {

    this.hscroll_outer = document.getElementById(projectView_outer_id);
    this.phantom_column = document.getElementById(phantomColumn_id);
    this.hscroll_content = document.getElementById(hscrollContent_id);
    this.first_hackcolumn = document.getElementById(first_hackcolumn_id);

    this.checkpoints = [];
    this.number_of_checkpoints = 0;
    this.current_checkpoint_index = 0;
    this.number_of_columns = 1;
    this.columns_per_page = 1;
    this.column_width = 416;

    this.gsap_instance = gsap_instance;

    this.isAnimating = false;
  }

  onResize() {
    this.recalc_columns_per_page();
    this.recalc_column_width();
    this.recalc_number_of_columns();
    this.recalc_scroll_step();
    this.recalc_scroll_checkpoints();
    //this.set_scroll_fraction(this.target_scroll_fraction);
  }

  recalc_columns_per_page() {
    let elementWidth = this.hscroll_outer.offsetWidth;
    this.columns_per_page = parseInt( elementWidth/(416+15) ); //!!!PELIGRO!!! wrong magic numbers, parseint

    if(this.columns_per_page > 1)
      this.columns_per_page = 2;
    else
      this.columns_per_page = 1;
  }

  recalc_column_width() {
    if(this.columns_per_page == 2){
      this.column_width = 416;
      this.hscroll_content.style.columnWidth = this.column_width + 'px';
      return;
    }

    let elementWidth = this.hscroll_outer.offsetWidth;
    this.column_width = elementWidth - 40; //!!!PELIGRO!!! magic numbers

    this.hscroll_content.style.columnWidth = this.column_width + 'px';
  }

  recalc_number_of_columns() {
    this.hide_phantom_column();
    this.number_of_columns = this.get_number_of_columns_dirtiest_way_ever();
    this.show_phantom_column_if_needed(); //!!!PELIGRO!!! two dirty tricks
    this.number_of_columns = this.get_number_of_columns_dirtiest_way_ever();
  }

  hide_phantom_column() {
    this.phantom_column.style.display = 'none';
  }

  show_phantom_column() {
    this.phantom_column.style.display = 'block';
  }

  show_phantom_column_if_needed() {
    if (this.columns_per_page == 1) {
      this.hide_phantom_column();
      return;
    }

    if (this.number_of_columns % 2 == 0){
      this.hide_phantom_column();
    } else {
      this.show_phantom_column();
      this.number_of_columns++;
    }

    if (this.number_of_columns < 1 || this.columns_per_page > 2){
      console.log("Error: number_of_columns < 1 or columns_per_page > 2");
    }
  }

  get_number_of_columns_dirtiest_way_ever() {
    let ncols = 1;
    let rightmost = this.first_hackcolumn.getBoundingClientRect().left;
    let hack_column_width = this.first_hackcolumn.offsetWidth;

    let child_elements = this.hscroll_content.children;

    for (let i=0; i < child_elements.length; i++) {
      let element = child_elements[i];
      let rect = element.getBoundingClientRect();

      let columns_inside = Math.floor((rect.left - rightmost)
                                          / hack_column_width);
      if (columns_inside > 0) {
        rightmost = rect.left;
        ncols += columns_inside;
      }
    }

    ncols = Math.floor(ncols);
    return ncols;
  }

  recalc_scroll_step() {
    this.scroll_step = 1/this.number_of_columns;
    this.scroll_step_percent = 100/this.number_of_columns;
  }

  //=================Checkpoints===========================================================
  
  recalc_scroll_checkpoints() {
    if (this.columns_per_page == 0) {
      console.log("Error: columns_per_page == 0");
      return;
    }

    this.number_of_checkpoints = this.number_of_columns
                                / this.columns_per_page;

    this.checkpoints = [];

    for (let i = this.number_of_checkpoints - 1; i >= 0; i--) {
      let target_percent = parseFloat(
                                        (
                                          (i*this.columns_per_page)*100/this.number_of_columns
                                        ).toFixed(4)
                                     );
      this.checkpoints.unshift(target_percent/100);
    }
  }

  get_closest_checkpoint_index(fraction) {
    let closest = this.checkpoints.reduce((prev, curr) => 
                                              Math.abs(curr - fraction) < Math.abs(prev - fraction) ? curr : prev
                                          );
    return this.checkpoints.indexOf(closest);
  }

  highlight_current_checkpoint() {
    for (let i=0; i < this.checkpoints.length; i++) {
      document.getElementById('navButton'+i).classList.remove('active');
    }
    document.getElementById('navButton'+this.current_checkpoint_index).classList.add('active');
  }

  update_navarrow_state() {
    var navArrow = document.getElementById('navButtonScrollToNextCheckpoint');

    if(navArrow == null)
      return;

    if (this.current_checkpoint_index == this.checkpoints.length - 1){
      navArrow.classList.add('inactive');
    }
    else
      navArrow.classList.remove('inactive');
  }

  set_scroll_fraction(fraction) {
    this.current_checkpoint_index = this.get_closest_checkpoint_index(fraction);
    let new_fraction = this.checkpoints[this.current_checkpoint_index];
    this.highlight_current_checkpoint();
    this.update_navarrow_state();

    new_fraction = Math.max(0, Math.min(1, new_fraction));

    this.target_scroll_fraction = new_fraction;
    
    return new_fraction;
  }

  start_twine_scroll(newFraction, isAnimating) {
    if(this.isAnimating) return;

    let columnGap = parseInt(getComputedStyle(this.hscroll_content).columnGap);
    this.isAnimating = true;
    
    this.gsap_instance.to( this.hscroll_outer, {
        scrollLeft: newFraction * (this.hscroll_outer.scrollWidth + columnGap/2),
        duration: 0.5, ease: "power2.inOut",

        onComplete: () => {
          this.isAnimating = false; //!!!PELIGRO!!! return it
        }
    });
  }
  
  canScroll(direction) {
    if(direction > 0){
      if(this.current_checkpoint_index < this.checkpoints.length - 1)
        return true;
    } else {
      if(this.current_checkpoint_index > 0)
        return true;
    }

    return false;
  }

  canManualScroll(direction) {
    let scrollLeft = this.hscroll_outer.scrollLeft;
    let scrollWidth = this.hscroll_outer.scrollWidth;
    let clientWidth = this.hscroll_outer.clientWidth;

    if(direction > 0){
      if(scrollLeft + clientWidth < scrollWidth)
        return true;
    } else {
      if(scrollLeft > 0)
        return true;
    }

    return false;
  }

  manualScrollHappened() {
    this.current_checkpoint_index = this.get_closest_checkpoint_index(this.hscroll_outer.scrollLeft / (this.hscroll_outer.scrollWidth + 1));
    this.highlight_current_checkpoint();
    this.update_navarrow_state();
  }
}

