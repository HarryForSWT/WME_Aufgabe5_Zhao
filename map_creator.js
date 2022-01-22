var d3; // Aus Aufgabe 4 

window.onload = () => {
    // Aus Aufgabe 4 
    var database;
    const keys=[
      "birth_rate_per_1000",
      "cell_phones_per_100",
      "children_per_woman",
      "electricity_consumption_per_capita",
      "gdp_per_capita",
      "gdp_per_capita_growth",
      "inflation_annual",
      "internet_user_per_100",
      "life_expectancy",
      "military_expenditure_percent_of_gdp"
    ];
    let lastSelected = keys[0];

    // Aus Aufgabe 4 
    d3.csv("world_data_v2.csv").then(data => {
        data.forEach(d => {
          d.birth_rate_per_1000 = +d.birth_rate_per_1000;
          d.cell_phones_per_100 = +d.cell_phones_per_100;
          d.children_per_woman = +d.children_per_woman;
          d.electricity_consumption_per_capita = +d.electricity_consumption_per_capita;
          d.gdp_per_capita = +d.gdp_per_capita;
          d.gdp_per_capita_growth = +d.gdp_per_capita_growth;
          d.inflation_annual = +d.inflation_annual;
          d.internet_user_per_100 = +d.internet_user_per_100;
          d.life_expectancy = +d.life_expectancy;
          d.military_expenditure_percent_of_gdp = +d.military_expenditure_percent_of_gdp;
          d.gps_lat = +d.gps_lat;
          d.gps_long = +d.gps_long;
        });
        database = data;
        output(database);
    });
    // Aus Aufgabe 4 
    var yValue =function (d) {
        var result;
        switch(lastSelected){
          case "birth_rate_per_1000" :
            result= d.birth_rate_per_1000;
            break;
          case "cell_phones_per_100":
            result= d.cell_phones_per_100;
            break;
          case "children_per_woman":
            result= d.children_per_woman;
            break;
          case "electricity_consumption_per_capita":
            result= d.electricity_consumption_per_capita;
            break;
          case "gdp_per_capita":
            result= d.gdp_per_capita;
            break;
          case "gdp_per_capita_growth":
            result= d.gdp_per_capita_growth;
            break;
          case "inflation_annual":
            result= d.inflation_annual;
            break;
          case "internet_user_per_100":
            result= d.internet_user_per_100;
            break;
          case "life_expectancy":
            result= d.life_expectancy;
            break;
          case "military_expenditure_percent_of_gdp":
            result= d.military_expenditure_percent_of_gdp;
            break;
          default:
            break;
        }
        return result;
    };


    function output(database){
        function getData(){
            return database.map(d => {
                let varlue_c = d[lastSelected];
                let min = d3.min(database,yValue);
                let max = d3.max(database,yValue);
                var size_normal;
                if(min>=0){
                    size_normal = varlue_c / max;
                }else{
                    size_normal = Math.abs((varlue_c-min)/(max-min));
                }
                console.log(size_normal);
                let colour = Math.floor(size_normal*6);
              return {
                lat: d["gps_lat"],
                lng: d["gps_long"],
                size: size_normal,
                color: colors[colour]
              }
            });
        }
         
        //https://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=7
        let colors = [
            "#ffffb2",
            "#fed976",
            "#feb24c",
            "#fd8d3c",
            "#fc4e2a",
            "#e31a1c",
            "#b10026"
        ]

        //https://github.com/vasturiano/three-globe/blob/master/example/basic/index.html  
        let gData = getData();
        const Globe = new ThreeGlobe()
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .pointsData(gData)
            .pointAltitude('size')
            .pointColor('color');
        
          
        // Setup renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('globeViz').appendChild(renderer.domElement);

        // Setup scene
        const scene = new THREE.Scene();
        scene.add(Globe);
        scene.add(new THREE.AmbientLight(0xbbbbbb));
        scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

        // Setup camera
        const camera = new THREE.PerspectiveCamera();
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        camera.position.z = 500;

        // Add camera controls
        const tbControls = new THREE.TrackballControls(camera, renderer.domElement);
        tbControls.minDistance = 101;
        tbControls.rotateSpeed = 5;
        tbControls.zoomSpeed = 0.8;

        // Kick-off renderer
        (function animate() { // IIFE
        // Frame cycle
        tbControls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        })();

        let labelPicker = d3.select("#labelPicker")
        .on("change", function () {
            lastSelected = this.value;
            gData = getData();
            Globe.pointsData(gData);
        })

        let materialPicker = d3.select("#materialPicker")
        .on("change", function (d) {
            d = this.value;
            Globe.globeImageUrl(d);
        })




    }
    

   





















}