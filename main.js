$(document).ready(function () {
  //FULLPAGE
  $('#fullpage').fullpage({

    sectionsColor: ['#7BAABE', '#1BBC9B'],
    //Accessibility
    keyboardScrolling: false,
    animateAnchor: true,
    recordHistory: false,
    //Navigation
    menu: '.menu',
    lockAnchors: false,
    anchors: ['snake-game', 'pong-game'],
    navigation: true,
    navigationPosition: 'left',
    navigationTooltips: ['SNAKE', 'PONG'],
    showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'bottom',
  });
});