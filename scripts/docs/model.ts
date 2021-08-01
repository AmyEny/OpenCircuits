export type AccessModifier = "private" | "protected" | "public";

export type Types = {
    name: string;
    link?: string;
}[][]; // Union of intersections of types

export type Parameter = {
    docs?: string;
    name: string;
    type: Types;
}
export type Property = Parameter & {
    access: AccessModifier;
}

export type MethodSignature = {
    docs?: string;
    parameters: Parameter[];
    returns: {
        docs?: string;
        type: Types;
    }[];
};
export type Method = {
    docs?: string;
    access: AccessModifier;
    name: string;
    implementation: MethodSignature;
    overloads: MethodSignature[];
}
export type Constructor = {
    docs?: string;
    access: AccessModifier;
    overloads: {
        docs?: string;
        parameters: Parameter[];
    }[];
}

export type Class = {
    docs?: string;
    generics: {
        docs?: string;
        constraint?: Types,
        name: string;
    }[];
    name: string;
    constructor?: Constructor,
    properties: Property[]
    methods: Method[],
    staticMethods: Method[]
}

export type TSDoc = {
    file: string;
    fileName: string;
    classes: Class[];
    functions: Method[]; // ik methods are functions for classes and i should rename `Method` to `Func` but whatever
}
