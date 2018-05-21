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
            speed: {
                max: 870,
                min: 200,
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
            time: 0,
        };

        this.attrs.dist = this.distance(this.attrs);

        this.run();
    }

    /**
     * Calculate time avg.
     *
     * @param dist
     * @param speed
     *
     * @returns {number}
     */
    private timeAVG(dist, speed): number {
        return 1000 * 60 * 60 * dist / speed;
    }

    /**
     *
     * @param {any} start
     * @param {any} dest
     *
     * @returns {number}
     */
    private distance({start, dest}): number {

        const R = 6371; // Radius earth.

        const dLat = (dest.lat - start.lat) * Math.PI / 180;
        const dLng = (dest.lng - start.lng) * Math.PI / 180;

        const a = 0.5 - Math.cos(dLat) / 2 + Math.cos(start.lat * Math.PI / 180) * Math.cos(start.lat * Math.PI / 180) * (1 - Math.cos(dLng)) / 2;

        return (R * 2 * Math.asin(Math.sqrt(a)));
    }

    /**
     * Update GPS.
     */
    private update(): void {
        const {speed, start, dest, dist} = this.attrs;

        const time = this.timeAVG(dist, speed.max);

        if (this.plane.time >= time) {
            clearInterval(this.updateInterval);
        }
        else {
            this.plane.time += 100;
        }

        this.plane.speed = speed.max;

        this.plane.lat -= ((start.lat - dest.lat) * 100) / (time);
        this.plane.lng -= ((start.lng - dest.lng) * 100) / (time);

        this.plane.dist = this.distance({
            start: {
                lat: this.plane.lat,
                lng: this.plane.lng
            },
            dest: dest
        });

        this.socket.emit('status' as fys.FlightInformation.TSocketEvent, this.plane);
    }

    /**
     * Start GPS Faker.
     */
    private run(): void {
        this.updateInterval = setInterval(() => this.update(), 100);
    }
}