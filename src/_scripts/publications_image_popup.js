
document.addEventListener("DOMContentLoaded", function() {
  const publications = document.querySelectorAll('.publication');
  const popupImg = document.getElementById('publication-popup-img');
  const popupImgContainer = document.getElementById('publication-publication-popup-img-container');

  publications.forEach(publication => {
    publication.addEventListener('mouseenter', function() {
    const imageLink = publication.getAttribute('publication_img');

    if(imageLink === null || imageLink == '' ) {
        return;
    }

      popupImg.src = imageLink;
      popupImgContainer.style.display = 'block';
    });

    publication.addEventListener('mouseleave', function() {
    popupImgContainer.style.display = 'none';
    });
  });

  popupImgContainer.addEventListener('mouseout', function() {
      popupImgContainer.style.display = 'none';
  });
});