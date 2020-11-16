# AquaQuant: A Water Usage Quantifier

AquaQuant is a water utilization quantification/tracking platform that aims to help people conserve more water.

## Background
As droughts become more [common](https://climate.nasa.gov/news/2881/earths-freshwater-future-extremes-of-flood-and-drought/) and fresh water becomes more scarce, it is now more important than ever before to manage our water carefully. 

Unfortunately, current water monitoring solutions are either too expensive or difficult to setup for the average consumer. Commercial water monitoring products can cost anywhere from \$200 to [$700](https://www.cnet.com/reviews/flo-home-water-control-and-monitoring-preview/) for a *single* sensor.

Furthermore, currently there is also a lack of water monitoring solutions offered in marketplace for the average consumer. Of the 5 water monitoring apps mentioned in [this](https://www.cnet.com/how-to/5-apps-to-help-you-save-water/) article, only one still actually offers a water monitoring solution; but even this platform only offers supports for a handful of areas mainly in CA and TX (none in Philly). The service mentioned in the article is also mainly targeted towards large utility companies and not the everyday consumer, so if a consumer uses a utility company that doesn't support the app, then the consumer is out of luck.

Thus, this platform hopes to provide a low cost water monitoring solution for the everyday consumer. Also, by utilizing low cost (Internet of Things) IoT sensors, you can get a detailed breakdown of exactly how much water each faucet, shower, and toilet uses in a given day, week, or month, unlike most commercially available water monitoring products.

[A 2020 Philly Codefest Submission](https://philly-codefest-2020.devpost.com/)

## Features
* Integration with cheap IoT sensors to gauge water usage around the house (sinks, toilets, showers, etc.)
* Tips on how and when to conserve water usage using data like weather and past trends in water usage
* Information about where your water quality and where it comes from * 
<!-- * Estimate your monthly stormwater surcharge * -->

\* Only available for Philly

## How it Works

## Code Installation
```bash
$ git clone --recurse-submodules -j8 https://github.com/jshin313/AquaQuant
$ cd AquaQuant
$ cd static && npm install
$ cd node_modules/react-calendar-heatmap && npm install # Do this everytime npm install is run for some reason
$ cd ../../
$ npm run watch
$ cd AquaQuant # In new terminal
$ virtualenv -v venv && source venv/bin/activate # Optional
$ python3 run.py
```

Browse to http://localhost:5000 to view the website

## Sensor Setup

## TODO
* Make an add sensors functionality (add a faucet, shower, toilet)
* Make a manual tracking option (manually tap on or off when you turn the shower on and off instead of having the sensors do it automatically)
* For the hackathon lots of things that are hardcoded could be made more responsive and dynamic
* Add SnackBar after clicking save/cancel buttons for the Stopwatch
* Add authentication and security stuff

## Credits
* Dashboard Template: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
* Hello Template: https://github.com/Eyongkevin/hello_template
* ~~Heatmap: https://github.com/tanykim/quantify-your-year~~ (Couldn't get this one working, but tried to copy some aspects of this)
* Calendar Heatmap: https://github.com/freeCodeCamp/react-calendar-heatmap/tree/fix/off-by-1-issues
* Material UI: https://material-ui.com/
* React Router Example: https://codesandbox.io/s/l9m3zrj4lq
* Stopwatch Code: https://wsvincent.com/react-stopwatch/
* Ideas: https://www.instructables.com/Low-Cost-Water-Flow-Sensor-and-Ambient-Display/ and https://www.reddit.com/r/arduino/comments/jhxr3r/can_you_use_ultrasonic_sensors_to_detect_water/
