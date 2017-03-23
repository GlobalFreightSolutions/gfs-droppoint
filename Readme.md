[![Build Status](https://travis-ci.org/GlobalFreightSolutions/gfs-droppoint.svg?branch=master)](https://travis-ci.org/GlobalFreightSolutions/gfs-droppoint)


# &lt;gfs-droppoint&gt;

The `gfs-droppoint` widget is used to show the available droppoints on the map.

## Install

```bash
# via bower
$ bower install gfs-droppoint
```

## Usage
```html
<link rel="import" href="path_to_bower_components/gfs-droppoint/gfs-droppoint.html" />
```

<!---
```
<custom-element-demo>
    <template>
        <script src="../webcomponentsjs/webcomponents-lite.js"></script>
        <link rel="import" href="gfs-droppoint.html">
        <next-code-block></next-code-block>
    </template>
</custom-element-demo>
```
-->

```html
<gfs-droppoint
    container-class="dp-card"
    show-opening-hours="true"
    button-type="standard"
    droppoint-data='{"droppointId":"DPD-123","isStore":false,"providerName":"DPD","distanceInMeters":888,"localizedDistance":"888 meters","droppointDescription":"The Pharmacy at Mayfair (Numark)","geoLocation":{"addressLines":["Shepherd Market"],"town":"London","postCode":"W1J 7UD","countryCode":"GB","directions":"The Pharmacy at Mayfair (Numark)"},"collectionSlots":[{"collectionDate":"2016-11-10T00:00:00Z","timeSlots":[{"from":"09:30","to":"17:00"}]}]}'>
</gfs-droppoint>
```

More info, demo and all the available properties can be found at [GFS widget portal](http://gfsdeveloperportal.azurewebsites.net/info/documentation/gfs-checkout/the-gfs-checkout-widgets/droppoint-widget/ "The Droppoint Widget")


### License

Apache License 2.0
