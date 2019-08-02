import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/device-icons.js';
import '@gfsdeliver/gfs-button/gfs-button.js';
import '@gfsdeliver/gfs-toast/gfs-toast.js';
import './gfs-droppoint-map.js';
import './gfs-droppoint-styles.js';

export class GfsDroppoint extends PolymerElement {
    static get template() {
        return html`
            <style include="gfs-droppoint-styles">
                :host {
                    --gfs-button-padding: 5px 10px;
                }
            </style>

            <iron-ajax id="getOpeningHours"
                       method="GET" handle-as="json"
                       content-type="application/json"
                       on-response="_handleOpeningHoursResponse"
                       on-error="_handleError"
                       timeout="10000">
            </iron-ajax>

            <div class$="{{containerClass}} dp-card">
                <dom-if if="{{title}}">
                    <template>
                        <h3>{{title}}</h3>
                    </template>
                </dom-if>
                <div class="content">
                    <div class="dp-details">
                        <div class="dp-icon">
                            <img src="{{_icon}}" width="100" />
                        </div>

                        <dom-if if="{{showDistance}}">
                            <template>
                                <div class="dp-small-heading">
                                    <iron-icon icon="maps:navigation" class="distance-ico"></iron-icon> Distance:
                                    <div id="dp-distance">
                                        {{droppointData.geo.distance}}m
                                    </div>
                                </div>
                            </template>
                        </dom-if>

                        <dom-if if="{{showOpeningHours}}">
                            <template>
                                <div class="dp-opening-hours-heading">
                                    <div class="dp-small-heading opening-hours" on-click="_getOpeningHours">
                                        <iron-icon icon="device:access-time"></iron-icon> Opening Hours
                                    </div>
                                </div>
                            </template>
                        </dom-if>
                    </div> <!-- .dp-details -->

                    <div class="address-wrap">
                        <div id="dp-address">
                            <div class="store-name">
                                <iron-icon icon="maps:my-location"></iron-icon> {{droppointDescription}} {{droppointId}}
                            </div>
                            <div class="store-address">
                                <dom-repeat items="{{droppointData.address}}">
                                    <template>
                                        {{item}},
                                    </template>
                                </dom-repeat>
                            </div>
                        </div>
                    </div>
                </div>  <!-- .content -->

                <dom-if if="{{showOpeningHours}}">
                    <template>
                        <div class="dp-opening-hours">
                            <div id="loader">
                                <paper-spinner active></paper-spinner>
                            </div>
                            <div class="weekCollection">
                                <template is="dom-repeat" items="{{_weekCollection}}">
                                    <div class="wrap-opening-hours">
                                        <div class="dp-day-name">
                                            <ul>
                                                <li>{{item.dayOfWeek}}</li>
                                            </ul>
                                        </div>
                                        <div class="dp-day-time-slots">
                                            <ul>
                                                <template is="dom-repeat" items="{{item.slots}}">
                                                    <li class="dp-day-time-slot">{{item.fromTime}} - {{item.toTime}}</li>
                                                </template>
                                            </ul>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                </dom-if>

                <div class="dd-action">
                    <dom-if if="{{isStandardButton}}">
                        <template>
                            <gfs-button on-click="toggleChooseDropPoint" class$="default choose-droppoint {{buttonClass}}">
                                {{displayButtonText}}
                            </gfs-button>
                        </template>
                    </dom-if>
                </div>
            </div>  <!-- .dp-card -->

            <gfs-toast error id="notificationError"></gfs-toast>
        `;
    }

    static get properties() {
        return {
            countryCode: String,

            postCode: String,

            orientation: {
                type: String,
                notify: true
            },

            containerClass: {
                type: String,
                value: ""
            },

            droppointId: String,

            droppointData: {
                type: Object,
                value: {}
            },

            showOpeningHours: Boolean,

            showDistance: Boolean,

            isStandardButton: Boolean,

            buttonDeselectedText: {
                type: String,
                value: "Deselect"
            },

            streetAddress: {
                type: String,
                notify: true
            },

            providerLogo: String,

            providerName: String,

            checkoutUri: String,

            checkoutToken: String,

            _selectedDroppoint: Object,

            _icon: {
                type: String,
                computed: "_computeIcon(providerLogo, providerName)"
            },

            _weekDays: {
                type: Array,
                value: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },

            _weekCollection: {
                type: Object,
                notify: true
            }
        }
    }

    static get observers() {
        return [
            '_reOrderDropPoint(droppointData)'
        ]
    }

    connectedCallback() {
        super.connectedCallback();

        document.addEventListener('droppoint-changed', this.onDroppointChanged.bind(this), false);
        document.addEventListener('store-changed', this.onStoreChanged.bind(this), false);
        document.addEventListener('droppoint-unselected', this.onDroppointChanged.bind(this), false);
        document.addEventListener('clear-selected-droppoint', this._clearSelectedDroppoint.bind(this));
        document.addEventListener('show-opening-hours', this._getOpeningHours.bind(this), false);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        document.removeEventListener('droppoint-changed', this.onDroppointChanged.bind(this), false);
        document.removeEventListener('store-changed', this.onStoreChanged.bind(this), false);
        document.removeEventListener('droppoint-unselected', this.onDroppointChanged.bind(this), false);
        document.removeEventListener('clear-selected-droppoint', this._clearSelectedDroppoint.bind(this));
        document.removeEventListener('show-opening-hours', this._getOpeningHours.bind(this), false);
    }

    ready() {
        super.ready();
    }

    initData() {
        this.droppointId = this.droppointData.id || "";

        if (typeof (this.droppointData.chosen) === "undefined") {
            this.droppointChosen = false;
        }

        this.providerName = this.droppointData.provider;
        this.providerLogo = this.countryCode;

        if ((Object.keys(this.droppointData).length) > 0) {
            this.droppointDescription = this.droppointData.title.toLowerCase();
            this.droppointData.droppointDescription = this.droppointData.title.toLowerCase(); // selected droppoint
        }
    }

    onDroppointChanged(e) {
        if (this._selectedStore) {
            this._selectedStore.data.chosen = false;
        }

        if (this._selectedDroppoint) {
            if (e.detail.data.id !== this._selectedDroppoint.data.id) {
                this._unselectDropPoint();
            }
        }

        this._selectedDroppoint = e.detail;
        this.render();
    }

    onStoreChanged(e) {
        if (this._selectedDroppoint) {
            this._selectedDroppoint.data.chosen = false;
        }

        if (this._selectedStore) {
            if (e.detail.data.id !== this._selectedStore.data.id) {
                this._unselectDropPoint();
            }
        }

        this._selectedStore = e.detail;
        this.render();
    }

    toggleChooseDropPoint(e) {
        this.set("droppointData.chosen", !this.droppointData.chosen);
        this.chosenDroppointChanged();
    }

    chosenDroppointChanged() {
        if (typeof (this.droppointData.chosen) === "null") return;

        if (this.droppointData.marker.customData.isDroppoint) {
            this.dispatchEvent(new CustomEvent("droppoint-changed", {
                bubbles: true,
                composed: true,
                detail: {
                    data: this.droppointData,
                    droppoint: this.droppointData.marker.customData.isDroppoint,
                    store: this.droppointData.marker.customData.isStore
                }
            }));
        }
        else {
            this.dispatchEvent(new CustomEvent("store-changed", {
                bubbles: true,
                composed: true,
                detail: {
                    data: this.droppointData,
                    droppoint: this.droppointData.marker.customData.isDroppoint,
                    store: this.droppointData.marker.customData.isStore
                }
            }));
        }
    }

    render() {
        this.initData();

        if (this.droppointData.chosen) {
            this.buttonClass = "chosen";
            this.displayButtonText = this.buttonDeselectedText;
        }
        else {
            this.buttonClass = "unchosen";
            this.displayButtonText = this.buttonSelectedText;
        }
    }

    _computeIcon(countryCode, providerName) {
        var url = this.resolveUrl('//gfswidgetcdn.azurewebsites.net/images/widgets/carriers');

        if (providerName === 'DPD') {
            this.providerName = 'dpdpickup'
        }

        switch(countryCode) {
            case "DE":
                return url + '/DE/' + this.providerName.toLowerCase() + '.png';
            case "FR":
            case "BE":
            case "ES":
                return url + '/FR/' + this.providerName.toLowerCase() + '.png';
            default:
                return url + '/GB/' + this.providerName.toLowerCase() + '.png';
        }
    }

    _reOrderDropPoint() {
        this.render();
    }

    _unselectDropPoint() {
        if (this._selectedDroppoint) {
            this._selectedDroppoint.data.chosen = false;
        }
    }

    _clearSelectedDroppoint() {
        if (this._selectedDroppoint) {
            this._selectedDroppoint.data.chosen = false;

            this.render();
            this._selectedDroppoint = null;

            this.dispatchEvent(new CustomEvent("hide-collectionInfo", {
                bubbles: true,
                composed: true
            }));
        }
    }

    showDroppointOpeningHours(e) {
        if (!e.detail.data.isStore) {
            if (e.detail.data.id === this._selectedDroppoint.data.id) {
                this._getOpeningHours(e);
            }
        }
    }

    _getOpeningHours(e) {
        if (this.droppointData.weekCollection == undefined) {
            let createSession = this.$.getOpeningHours;
            createSession.url = this.checkoutUri + this.droppointData.detail;
            createSession.headers = this._getBearerToken();
            createSession.generateRequest();
            this.shadowRoot.querySelector('#loader').style.display = 'block';
        }
        else {
            this._weekCollection = this.droppointData.weekCollection ? this.droppointData.weekCollection : this._selectedDroppoint.data.weekCollection;
        }
    }

    _getBearerToken() {
        return { "Authorization": "Bearer " + atob(this.checkoutToken) };
    }

    _handleOpeningHoursResponse(e) {
        var buildWeekCollection = [];
        var dayCount = 0;

        this._weekCollection = [];

        if (!!e.detail.response) {
            e.detail.response.days.forEach((collectionSlot) => {
                dayCount++;
                if (dayCount <= 7) {
                    collectionSlot.slots.forEach((slot) => {
                        slot.fromTime = slot.from;
                        slot.toTime = slot.to;
                    });

                    if (collectionSlot.slots.length > 0) {
                        buildWeekCollection.push(collectionSlot);
                    }
                }
            });

            this.set('_weekCollection', buildWeekCollection);
            this.droppointData.weekCollection = this._weekCollection;
        }
        else {
            this.$.notificationError.text = "We could'n find any opening hours";
            this.$.notificationError.classList.add('fit-top');
            this.$.notificationError.open();
        }
        this.shadowRoot.querySelector('#loader').style.display = 'none';
    }

    _handleError(e) {
        if (e.detail.error.type === "timeout") {
            this.$.notificationError.text = "Server Took Too Long To Respond";
            this.$.notificationError.classList.add('fit-top');
            this.$.notificationError.open();
            this.shadowRoot.querySelector('#loader').style.display = 'none';
        }
        else {
            console.error('Error: ', e.detail.error.message);
            this.$.notificationError.text = e.detail.error.message;
            this.$.notificationError.classList.add('fit-top');
            this.$.notificationError.open();
            this.shadowRoot.querySelector('#loader').style.display = 'none';
        }
    }
}
window.customElements.define('gfs-droppoint', GfsDroppoint);
