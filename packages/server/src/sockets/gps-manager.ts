import * as SocketIO from 'socket.io';
import * as fys from "../../../shared/fys-types";
import {FlightInformation} from "../../../shared/fys-types";
import IPlane = FlightInformation.IPlane;

export class GPSManager {
    private socket: SocketIO.Namespace;
    private updateInterval: NodeJS.Timer;
    private attrs: any;
    private plane: IPlane;

    /**
     * GPS Manager.
     *
     * @param {SocketIO.Server} socket
     */
    constructor(socket: SocketIO.Server) {
        this.socket = socket.of('/flight-status');

        this.attrs = {
            time: {
                start: 0,
                end: 1000 * 60 * 60 * 1,
            },
            speed: {
                max: 7200,
                min: 0,
            },
            start: {
                lat: 54.66112372206639,
                lng: -1.8896484375
            },
            dest: {
                lat: 52.36218321674427,
                lng: 4.921875
            },
            dist: 0,
        };

        this.plane = {
            lat: this.attrs.start.lat,
            lng: this.attrs.start.lng,

            dist: 0,
            height: 0,
            speed: 0,
        };

        this.distance();

        this.run();
    }

    /**
     * Distance.
     */
    private distance(): void {
        const {start, dest} = this.attrs;

        const R = 6371; // Radius earth.

        const dLat = (dest.lat - start.lat) * Math.PI / 180;
        const dLng = (dest.lng - start.lng) * Math.PI / 180;

        const a = 0.5 - Math.cos(dLat) / 2 + Math.cos(start.lat * Math.PI / 180) * Math.cos(start.lat * Math.PI / 180) * (1 - Math.cos(dLng)) / 2;

        this.attrs.dist = R * 2 * Math.asin(Math.sqrt(a));
    }

    /**
     * Update GPS.
     */
    private update(): void {
        const {time, start, dest} = this.attrs;

        if (time.start >= time.end) {
            clearInterval(this.updateInterval);
        }
        else {
            this.attrs.time.start += 100;
        }

        this.plane.lat -= (start.lat - dest.lat) / (time.end / 1000);
        this.plane.lng -= (start.lng - dest.lng) / (time.end / 1000);

        this.socket.emit('status' as fys.FlightInformation.TSocketEvent, this.plane);
    }

    /**
     * Start GPS Faker.
     */
    private run(): void {
        this.updateInterval = setInterval(() => this.update(), 100);
    }
}