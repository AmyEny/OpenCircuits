import {Clamp} from "./MathUtils";
import {serializable} from "serialeazy";

/**
 * A class containing a number, functions to change the value of the number and
 * variables and functions that restrict the range of values the number can hold (aka clamping).
 * Commonly used to set the number of input ports for a component.
 */
@serializable("ClampedValue")
export class ClampedValue {
    /**
     * The current clamped value of the number
     */
    private value?: number;

    /**
     * The minimum value the number can hold
     */
    private minValue?: number;

    /**
     * The maximum value the number can hold
     */
    private maxValue?: number;

    /**
     * Set the initial value for a number to be clamped, minimum and maximum values unspecified.
     * @param initialValue The inital value of the number
     * @param minValue The minimum value the number can hold
     * @param maxValue The maximum value the number can hold
     */
    public constructor(initialValue?: number);

    /**
     * Set the initial value for a number and minimum and maximum values for clamping.
     * @param initialValue The inital value of the number
     * @param minValue The minimum value the number can hold
     * @param maxValue The maximum value the number can hold
     */
    public constructor(initialValue: number, minValue: number, maxValue: number);

    /**
     * Set the initial value for a number with minimum and maximum values for clamping equal to the intial.
     * @param initialValue The initial value of the number
     * @param minValue The minimum value the number can hold
     * @param maxValue The maximum value the number can hold
     */
    public constructor(initialValue?: number, minValue?: number, maxValue?: number) {
        this.value = initialValue;
        this.minValue = minValue ?? initialValue; // if min not given use initial
        this.maxValue = maxValue ?? initialValue; // if max not given use initial
    }

    /**
     * Update the number to a new value, or the closest clamp bound if outside allowed range.
     * @param val The clamped value of the number
     * @throws {Error} If this.minValue or this.maxValue are undefined
     */
    public setValue(val: number): void {
        if (this.minValue === undefined)
            throw new Error("ClampedValue.setValue failed: this.minValue is undefined");
        if (this.maxValue === undefined)
            throw new Error("ClampedValue.setValue failed: this.minValue is undefined");
        this.value = Clamp(val, this.minValue, this.maxValue);
    }

    /**
     * Set the minimum value the number can hold.
     * @param val The minimum value the number can hold
     */
    public setMinValue(val: number): void {
        this.minValue = val;
    }

    /**
     * Set the maximum value the number can hold.
     * @param val The maximum value the number can hold
     */
    public setMaxValue(val: number): void {
        this.maxValue = val;
    }

    /**
     * Returns the clamped value of the number.
     * @returns The clamped value of the number'
     * @throws {Error} If this.value is undefined
     */
    public getValue(): number {
        if (this.value === undefined)
            throw new Error("ClampedValue.getValue failed: this.value is undefined");
        return this.value;
    }

    /**
     * Returns the minimum value the number can hold.
     * @returns The minimum value the number can hold
     * @throws {Error} If this.minValue is undefined
     */
    public getMinValue(): number {
        if (this.minValue === undefined)
            throw new Error("ClampedValue.getMinValue failed: this.minValue is undefined");
        return this.minValue;
    }

    /**
     * Returns the maximum value the number can hold.
     * @returns The maximum value the number can hold
     * @throws {Error} If this.maxValue is undefined
     */
    public getMaxValue(): number {
        if (this.maxValue === undefined)
            throw new Error("ClampedValue.getMaxValue failed: this.maxValue is undefined");
        return this.maxValue;
    }

    /**
     * Returns a new instance of the ClampedValue object, identical to the original.
     * @returns A new instance of the ClampedValue object, identical to the original
     */
    public copy(): ClampedValue {
        return new ClampedValue(this.value!, this.minValue!, this.maxValue!);
    }

}
