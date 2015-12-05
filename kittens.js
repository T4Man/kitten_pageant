$(function(){
//------ chart arrays and info -----------------------------------------
  var data = {
    labels: [],
    datasets: [
      {
        label: 'KittenContestChart',
        fillColor: "#C1DFFF",
        strokeColor: "#B29C75",
        data: []
      }
    ]
  };
//--- picture file arrays ------------------------------------------------
  var images = [];
  var files = [
    "kitten1",
    "kitten2",
    "kitten3",
    "kitten4",
    "kitten5",
    "kitten6",
    "kitten7",
    "kitten8",
    "kitten9",
    "kitten10",
    "kitten11",
    "kitten12",
    "kitten13",
    "kitten14"];
//--Photo constructor gets image name/path, pushes to chart and images array--
  function Photo(name, path) {
    this.name = name;
    this.path = path;
    this.votes = 0;
    data.labels.push(name);
    data.datasets[0].data.push(0);
    images.push(this);
  }
//-- iterate files array, build image path, create Photo object for each image-
  function buildPhoto() {
    files.forEach(function(file, i){
      var filePath = 'images/' + files[i] + '.jpg';
      new Photo(files[i], filePath);
    });
  } buildPhoto();
// --- reset images to initial attributes -------------------------------
  function deHiLite() {
    $('img').removeClass('selected');
  }
  voteHandle();
// --- vote tracker object and methods ------------------------------------
  var tracker = {
    leftImage: '',
    rightImage: '',
    leftImgElement: document.getElementById('leftImage'),
    rightImgElement: document.getElementById('rightImage'),
//-- generate random number -----------------------------
    getRandomNum: function() {
      return Math.floor(Math.random() * images.length);
    },
//-- assigns random number to index of images array element --
    getRandomImg: function() {
      this.leftImage = images[tracker.getRandomNum()];
      this.rightImage = images[tracker.getRandomNum()];
//-- if both images are the same, change the right image --
      while(this.leftImage === this.rightImage) {
        this.leftImage = images[tracker.getRandomNum()];
      }
//-- change the src paths and names to match the randomly created ones --
      this.leftImgElement.src = this.leftImage.path;
      this.leftImgElement.id = this.leftImage.name;
      this.rightImgElement.src = this.rightImage.path;
      this.rightImgElement.id = this.rightImage.name;
    },
//-match picture clicked to image array, add to vote count, update chart data-
    vote: function(id) {
      for (var i in images) {
        if (images[i].name === id) {
          images[i].votes += 1;
          data.datasets[0].data[i] = images[i].votes;
          chart.datasets[0].bars[i].value = images[i].votes;
        }
      }
    }
  };
//--- Chart JS ---------------------------------------------------------------
  var ctx = document.getElementById('kittenChart').getContext('2d');
  var chart = new Chart(ctx).Bar(data, {
    responsive: true,
    scaleShowVerticalLines: false,
    scaleShowHorizontalLines: true,
    scaleGridLineColor: "#00FFC6",
    scaleFontColor: "#00FFC6"
  });
//--- event listener to call images, tracker and update chart --------------
  function voteHandle() {
    $('img').click (function(event) {
      $(this).addClass('selected');
      tracker.vote(event.target.id);
      chart.update();
      $('#kittenChart').show();
      if ($('img').hasClass('selected')){
        $('img').unbind('click');
      }
    });
  }
//--- vote again button ----------------
  $('#newPicsBtn').click(function(){
    deHiLite();
    tracker.getRandomImg();
    $('#kittenChart').hide();
    voteHandle();
  });
//--- load initial images ----------------------------------------------
  tracker.getRandomImg();
  $('#kittenChart').hide();
});
