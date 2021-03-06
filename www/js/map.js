      function initialize() {
        var latlng = new google.maps.LatLng(-34.6154539, -58.4203691);
        var settings = {
          zoom: 18,
          center: latlng,
          mapTypeControl: true,
          scrollwheel: false,             
          mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
          navigationControl: true,
          navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
          mapTypeId: google.maps.MapTypeId.ROADMAP};
        var map = new google.maps.Map(document.getElementById("map_canvas"), settings);
        var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">Høgenhaug</h1>'+
          '<div id="bodyContent">'+
          '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>'+
          '</div>'+
          '</div>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        
        var companyImage = new google.maps.MarkerImage('img/map/trans.png',
          new google.maps.Size(100,50),
          new google.maps.Point(0,0),
          new google.maps.Point(50,50)
        );

        var companyShadow = new google.maps.MarkerImage('img/map/trans.png',
          new google.maps.Size(130,50),
          new google.maps.Point(0,0),
          new google.maps.Point(65, 50));

        var companyPos = new google.maps.LatLng(-34.615763, -58.4181643);

        var companyMarker = new google.maps.Marker({
          position: companyPos,
          map: map,
          icon: companyImage,
          shadow: companyShadow,
          title:"Høgenhaug",
          zIndex: 3});
        
        var trainImage = new google.maps.MarkerImage('img/map/taller.png',
          new google.maps.Size(70,105),
          new google.maps.Point(0,0),
          new google.maps.Point(70,105)
        );

        var trainShadow = new google.maps.MarkerImage('img/map/trans.png',
          new google.maps.Size(70,50),
          new google.maps.Point(0,0),
          new google.maps.Point(60, 50)
        );

        var trainPos = new google.maps.LatLng(-34.615763, -58.4181643);

        var trainMarker = new google.maps.Marker({
          position: trainPos,
          map: map,
          icon: trainImage,
          shadow: trainShadow,
          title:"Train Station",
          zIndex: 999999
        });

        var parkingImage = new google.maps.MarkerImage('img/map/trans.png',
          new google.maps.Size(50,50),
          new google.maps.Point(0,0),
          new google.maps.Point(50,50)
        );

        var parkingShadow = new google.maps.MarkerImage('img/map/trans.png',
          new google.maps.Size(70,50),
          new google.maps.Point(0,0),
          new google.maps.Point(60, 50)
        );

        var parkingPos = new google.maps.LatLng(57.0437, 9.9147);

        var parkingMarker = new google.maps.Marker({
          position: parkingPos,
          map: map,
          icon: parkingImage,
          shadow: parkingShadow,
          title:"Parking Lot",
          zIndex: 1
        });
        
        google.maps.event.addListener(companyMarker, 'click', function() {
          infowindow.open(map,companyMarker);
        });
      }
