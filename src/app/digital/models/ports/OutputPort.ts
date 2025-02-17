import {serializable} from "serialeazy";

import {Vector,V} from "Vector";

import {Port} from "core/models/ports/Port";

import {DigitalComponent, DigitalWire} from "../index";


@serializable("DigitalOutputPort")
export class OutputPort extends Port {
    protected parent: DigitalComponent;
    protected connections: DigitalWire[];

    /**
     * Constructs the output port with no connections
     *
     * @param parent the parent component of the port
     */
    public constructor(parent?: DigitalComponent) {
        super(parent!);
        this.parent = parent!;
        this.connections = [];
    }

    /**
     * Active this port and propagate the signal
     * 	to all active connections
     *
     * @param signal The signal to send
     */
    public activate(signal: boolean): void {
        // Don't do anything if signal is same as current state
        if (signal === this.isOn)
            return;
        this.isOn = signal;

        // Get designer to propagate signal, exit if undefined
        const designer = this.parent.getDesigner();
        if (!designer)
            return;

        for (const w of this.connections)
            designer.propagate(w, this.isOn);
    }
    
    /**
     * Connects the output wire to the port and activates the port
     *
     * @param wire new output wire
     */
    public connect(w: DigitalWire): void {
        this.connections.push(w);
        w.activate(this.isOn);
    }

    /**
     * Disconnects the output wire from the output port
     */
    public disconnect(w: DigitalWire): void {
        // find index and splice
        const i = this.connections.indexOf(w);
        if (i !== -1)
            this.connections.splice(i, 1);
    }

    /**
     * Gets all of the wires connected to this port
     *
     * @returns a shallow copy of the all the connections
     */
    public getConnections(): DigitalWire[] {
        return this.connections.slice(); // Shallow copy array
    }

    /**
     * Gets initial direction of the input port as a vector. 
     * The value is 1 because it's an output port (facing right).
     *
     * @returns vector that represents the direction of the output port
     */
    public getInitialDir(): Vector {
        return V(1, 0);
    }

    /**
     * Gets all the wires the port is connected to
     *
     * @returns the wire connections 
     */
    public getWires(): DigitalWire[] {
        return this.connections;
    }

    /**
     * Gets the parent component of the port
     *
     * @returns the parent component
     */
    public getParent(): DigitalComponent {
        return this.parent;
    }
}
