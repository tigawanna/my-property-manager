# interesting lesoons

-  recursive typescript types
  
```ts
  type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

// recurse to depth (neede to avoid infinite recursion) 
type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
...0[],
];

// type will reursivly join keys into a union
export type PossibleNestedUnions<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? `${K}` | (D extends 0 ? never : Join<K, PossibleNestedUnions<T[K], Prev[D]>>)
          : never;
      }[keyof T]
    : "";

// Example usage:
type ExampleType = {
  a: string;
  b: {
    c: number;
    d: {
      e: boolean;
      f: {
        g: string;
      };
    };
  };
  h: Date;
};

type NestedKeys1 = NestedUnionsToDepth<ExampleType, 1>; // "a" | "b" | "h"
type NestedKeys2 = NestedUnionsToDepth<ExampleType, 2>; // "a" | "b" | "b.c" | "b.d" | "h"
type NestedKeys3 = NestedUnionsToDepth<ExampleType, 3>; // "a" | "b" | "b.c" | "b.d" | "b.d.e" | "b.d.f" | "h"
type NestedKeysAll = NestedUnionsToDepth<ExampleType, 10>; // All nested
  ```
