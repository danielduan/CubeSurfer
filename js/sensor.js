var acceldata;
var bbsensors = {
		// This object is passed to the Sensor API just before listening starts
		options: {
			delay: 20000,
			background: false,
			batching: true,
			queue: true,
			reducedReporting: false
		},
		currentSensor: null,
		// Sets the sensor event listener keyed off the objects defined later
		listen: function() {
			if (bbsensors.currentSensor != null) {
				blackberry.event.removeEventListener(bbsensors.currentSensor.name, bbsensors.currentSensor.callback);
			}
			bbsensors.currentSensor = this.deviceaccelerometer;
			if (bbsensors.currentSensor) {
				blackberry.sensors.setOptions(bbsensors.currentSensor.name, bbsensors.options);
				blackberry.event.addEventListener(bbsensors.currentSensor.name, bbsensors.currentSensor.callback);
			}
		},
		// Acceleration in xyz axes in m/s/s
		deviceaccelerometer: {
			name: 'deviceaccelerometer',
			title: 'Accelerometer',
			dataPoints: ['x', 'y', 'z'],
			callback: function (data) {
				acceldata = data;
				//console.log(data.y);
			}
		},
	}