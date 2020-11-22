# AquaQuant: A Cheap, Easy to Use Water Usage Quantifier

https://aquaquant.herokuapp.com/

AquaQuant is a water utilization quantification/tracking platform that aims to help people conserve more water. Use IoT sensors to automatically track your water usage or use the platform to just manually keep track of your usage.

## Background
As droughts become more [common](https://climate.nasa.gov/news/2881/earths-freshwater-future-extremes-of-flood-and-drought/) and fresh water becomes more scarce, it is now more important than ever before to manage our water carefully. 

Unfortunately, current water monitoring solutions are either too expensive or difficult to setup for the average consumer. Commercial water monitoring products can cost anywhere from \$200 to [$700](https://www.cnet.com/reviews/flo-home-water-control-and-monitoring-preview/) for a *single* sensor.

Furthermore, currently there is also a lack of water monitoring solutions offered in marketplace for the average consumer. Of the 5 water monitoring apps mentioned in [this](https://www.cnet.com/how-to/5-apps-to-help-you-save-water/) article, only one still actually offers a water monitoring solution; but even this platform only offers supports for a handful of areas mainly in CA and TX (none in Philly). The service mentioned in the article is also mainly targeted towards large utility companies and not the everyday consumer, so if a consumer uses a utility company that doesn't support the app, then the consumer is out of luck.

Thus, this platform hopes to provide a low cost water monitoring solution for the everyday consumer. Also, by utilizing low cost (Internet of Things) IoT sensors, you can get a detailed breakdown of exactly how much water each faucet, shower, and toilet uses in a given day, week, or month, unlike most commercially available water monitoring products.

Note: The IoT sensors are optional. The water usage tracking dashboard also allows users to manually tap on and off whenever they turn the faucet/shower on or off.

People track their finances and expenses with a budget or planner; in the same way, we hope people can do the same with water usage by tracking exactly where their water goes.

## How it Works
The IoT sensors work by detecting vibrations within the water pipes since whenever there is water flowing, there will be vibrations. The sensors then times how long these vibrations last and use this along with the flow rate of the water source to calculate the total gallons used. This allows for non-invasive sensors and very easy installation. While a hall effect sensor or turbine sensor would give accurate flow rate readings, our unique vibration sensors don't require any disassembly of pipes or plumbing knowledge, which makes it much more friendly to the average consumer. Instead of having to disassemble your whole sink and finding out what kind of pipe adapters to buy to fit your sensor, our IoT sensor simply attaches to the outside of the pipe allowing for quick and easy installation. Vibration sensors (\$3 per sensor) are also much cheaper than traditional turbine sensors (\$10 - \$30 per sensor). While hall effect/turbine sensors might provide a better alternative for businesses, most home users can benefit from the simplicity of our vibration sensors.

The IoT sensor utilizes cheap (\$3) WiFi modules and a piezo vibration sensor that converts mechanical energy to electrical signals in order to communicate via a custom built REST API. The dashboard then allows for monitoring exactly which devices are currently on and how water usage changes over time.

Although vibrational sensors were the main IoT sensors used during testing, it is possible to utilize hall effect/turbine sensors for the dashboard (this has not been tested though).

[A 2020 Philly Codefest Submission](https://philly-codefest-2020.devpost.com/)

<!-- ## Features -->
<!-- * Integration with cheap IoT sensors to gauge water usage around the house (sinks, toilets, showers, etc.) -->
<!-- * Information about where your water quality and where it comes from * --> 
<!-- * Tips on how and when to conserve water usage using data like weather and past trends in water usage -->
<!-- * Estimate your monthly stormwater surcharge * -->

<!-- \* Only available for Philly -->


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
$ pip3 install -r requirements.txt
$ python3 run.py
```

Browse to http://localhost:5000 to view the website

## Sensor Setup
Simply use mastic or putty clay to attach the vibration sensor to the outside of the water source's pipe.

![Circuit Picture](./circuit.png)

## TODO
<!-- * Make an add sensors functionality (add a faucet, shower, toilet) -->
* Add estimated cost analysis
* For the hackathon lots of things that are hardcoded could be made more responsive and dynamic
* Add SnackBar after clicking save/cancel buttons for the Stopwatch
* Add authentication (login accounts) and security stuff

## Credits
* Dashboard Template: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
* Hello Template: https://github.com/Eyongkevin/hello_template
* ~~Heatmap: https://github.com/tanykim/quantify-your-year~~ (Couldn't get this one working, but tried to copy some aspects of this)
* Calendar Heatmap: https://github.com/freeCodeCamp/react-calendar-heatmap/tree/fix/off-by-1-issues
* Material UI: https://material-ui.com/
* React Router Example: https://codesandbox.io/s/l9m3zrj4lq
* Stopwatch Code: https://wsvincent.com/react-stopwatch/
* Async SocketIO stuff: https://www.shanelynn.ie/asynchronous-updates-to-a-webpage-with-flask-and-socket-io/
* Ideas: https://www.instructables.com/Low-Cost-Water-Flow-Sensor-and-Ambient-Display/ and https://www.reddit.com/r/arduino/comments/jhxr3r/can_you_use_ultrasonic_sensors_to_detect_water/
