/**
 * Type utilitária que permite mapear as properties de uma classe|interface que atenderem a Condition
 * Pode ser útil por exemplo para mapear apenas as properties que forem String
 */
export type MapKeysWithCondition<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never
  }[keyof Base]
>

export type PrimitiveField = string | number | boolean | any[] | Date

/**
 * Type utilitária que possibilita mapear apenas as properties de tipo primitivo de uma classe|interface Base
 */
export type TypeKeysOf<Base> = Partial<MapKeysWithCondition<Base, PrimitiveField>>
