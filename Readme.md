The `gfs-droppoint` widget is used to show the available droppoints on the map.

## Usage

### Install

```bash
$ npm i --save '@gfsdeliver/gfs-droppoint
```

### Import In a HTML file:

```html
<html>
    <head>
        <script type="module">
            import '@gfsdeliver/gfs-droppoint/gfs-droppoint.js';
        </script>
    </head>
    <body>
        <gfs-droppoint
            container-class="dp-card"
            show-opening-hours="true"
            button-type="standard"
            droppoint-data='{"id":"COLLECTPLUS-57338","title":"Amco Newsagents","address":["69 Webbs Road","SW11 6SD","GB"],"geo":{"lat":51.4554461436296,"long":-0.161675620057261,"distance":241},"detail":"/api/droppoints/COLLECTPLUS-57338","provider":"COLLECT PLUS","countryCode":"GB","isDroppoint":true,"isStore":false,"marker":"","droppointDescription":"amco newsagents","chosen":true,"weekCollection":[{"dayOfWeek":"sunday","slots":[{"from":"07:00","to":"13:00","fromTime":"07:00","toTime":"13:00"}]},{"dayOfWeek":"monday","slots":[{"from":"06:00","to":"19:00","fromTime":"06:00","toTime":"19:00"}]},{"dayOfWeek":"tuesday","slots":[{"from":"06:00","to":"19:00","fromTime":"06:00","toTime":"19:00"}]},{"dayOfWeek":"wednesday","slots":[{"from":"06:00","to":"19:00","fromTime":"06:00","toTime":"19:00"}]},{"dayOfWeek":"thursday","slots":[{"from":"06:00","to":"19:00","fromTime":"06:00","toTime":"19:00"}]},{"dayOfWeek":"friday","slots":[{"from":"06:00","to":"19:00","fromTime":"06:00","toTime":"19:00"}]},{"dayOfWeek":"saturday","slots":[{"from":"06:00","to":"19:00","fromTime":"06:00","toTime":"19:00"}]}]}'>
        </gfs-droppoint>
    </body>
</html>
```

### In a Polymer 3 element
```js
import { PolymerElement, html } from '@polymer/polymer';
import '@gfsdeliver/gfs-droppoint/gfs-droppoint.js';

class CustomElement extends PolymerElement {
    static get template() {
        return html`
            <gfs-droppoint
                container-class="dp-card"
                show-opening-hours="true"
                button-type="standard"
                droppoint-data='{"id":"COLLECTPLUS-57338","title":"Amco Newsagents","address":["69 Webbs Road","SW11 6SD","GB"],"geo":{"lat":51.4554461436296,"long":-0.161675620057261,"distance":241},"detail":"/api/droppoints/COLLECTPLUS-57338","provider":"COLLECT PLUS","countryCode":"GB","isDroppoint":true,"isStore":false,"marker":"","droppointDescription":"amco newsagents","chosen":true,"weekCollection":[{"dayOfWeek":"sunday","slots":[{"from":"07:00","to":"13:00","fromTime":"07:00","toTime":"13:00"}]},{"dayOfWeek":"monday","slots":[{"from":"06:00","to":"19:00","fromTime":"06:00","toTime":"19:00"}]},{"dayOfWeek":"tuesday","slots":[{"from":"06:00","to":"19:00","fromTime":"06:00","toTime":"19:00"}]},{"dayOfWeek":"wednesday","slots":[{"from":"06:00","to":"19:00","fromTime":"06:00","toTime":"19:00"}]},{"dayOfWeek":"thursday","slots":[{"from":"06:00","to":"19:00","fromTime":"06:00","toTime":"19:00"}]},{"dayOfWeek":"friday","slots":[{"from":"06:00","to":"19:00","fromTime":"06:00","toTime":"19:00"}]},{"dayOfWeek":"saturday","slots":[{"from":"06:00","to":"19:00","fromTime":"06:00","toTime":"19:00"}]}]}'>
            </gfs-droppoint>
        `;
    }
}
customElements.define('custom-element', CustomElement);
```

More info, demo and all the available properties can be found at [GFS widget portal](http://developer.justshoutgfs.com/info/documentation/gfs-checkout/the-gfs-checkout-widgets/droppoint-widget/ "The Droppoint Widget")


## License

[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)
