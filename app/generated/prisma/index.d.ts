
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model Section
 * 
 */
export type Section = $Result.DefaultSelection<Prisma.$SectionPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model UserReview
 * 
 */
export type UserReview = $Result.DefaultSelection<Prisma.$UserReviewPayload>
/**
 * Model Response
 * 
 */
export type Response = $Result.DefaultSelection<Prisma.$ResponsePayload>
/**
 * Model EligibilitySubmission
 * 
 */
export type EligibilitySubmission = $Result.DefaultSelection<Prisma.$EligibilitySubmissionPayload>
/**
 * Model Note
 * 
 */
export type Note = $Result.DefaultSelection<Prisma.$NotePayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model PaymentPart
 * 
 */
export type PaymentPart = $Result.DefaultSelection<Prisma.$PaymentPartPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  user: 'user',
  admin: 'admin',
  moderator: 'moderator'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ResponseStage: {
  LEAD: 'LEAD',
  INTERESTED: 'INTERESTED',
  CONVERTED: 'CONVERTED',
  CANCELLED: 'CANCELLED'
};

export type ResponseStage = (typeof ResponseStage)[keyof typeof ResponseStage]


export const NoteType: {
  RESPONSE: 'RESPONSE',
  ELIGIBILITY: 'ELIGIBILITY'
};

export type NoteType = (typeof NoteType)[keyof typeof NoteType]


export const NotificationType: {
  response: 'response',
  eligibility: 'eligibility'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ResponseStage = $Enums.ResponseStage

export const ResponseStage: typeof $Enums.ResponseStage

export type NoteType = $Enums.NoteType

export const NoteType: typeof $Enums.NoteType

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.section`: Exposes CRUD operations for the **Section** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sections
    * const sections = await prisma.section.findMany()
    * ```
    */
  get section(): Prisma.SectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userReview`: Exposes CRUD operations for the **UserReview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserReviews
    * const userReviews = await prisma.userReview.findMany()
    * ```
    */
  get userReview(): Prisma.UserReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.response`: Exposes CRUD operations for the **Response** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Responses
    * const responses = await prisma.response.findMany()
    * ```
    */
  get response(): Prisma.ResponseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eligibilitySubmission`: Exposes CRUD operations for the **EligibilitySubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EligibilitySubmissions
    * const eligibilitySubmissions = await prisma.eligibilitySubmission.findMany()
    * ```
    */
  get eligibilitySubmission(): Prisma.EligibilitySubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.note`: Exposes CRUD operations for the **Note** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notes
    * const notes = await prisma.note.findMany()
    * ```
    */
  get note(): Prisma.NoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentPart`: Exposes CRUD operations for the **PaymentPart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentParts
    * const paymentParts = await prisma.paymentPart.findMany()
    * ```
    */
  get paymentPart(): Prisma.PaymentPartDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    Verification: 'Verification',
    Section: 'Section',
    Course: 'Course',
    UserReview: 'UserReview',
    Response: 'Response',
    EligibilitySubmission: 'EligibilitySubmission',
    Note: 'Note',
    Notification: 'Notification',
    Payment: 'Payment',
    PaymentPart: 'PaymentPart'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "session" | "verification" | "section" | "course" | "userReview" | "response" | "eligibilitySubmission" | "note" | "notification" | "payment" | "paymentPart"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      Section: {
        payload: Prisma.$SectionPayload<ExtArgs>
        fields: Prisma.SectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findFirst: {
            args: Prisma.SectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findMany: {
            args: Prisma.SectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          create: {
            args: Prisma.SectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          createMany: {
            args: Prisma.SectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          delete: {
            args: Prisma.SectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          update: {
            args: Prisma.SectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          deleteMany: {
            args: Prisma.SectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          upsert: {
            args: Prisma.SectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          aggregate: {
            args: Prisma.SectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSection>
          }
          groupBy: {
            args: Prisma.SectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SectionCountArgs<ExtArgs>
            result: $Utils.Optional<SectionCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      UserReview: {
        payload: Prisma.$UserReviewPayload<ExtArgs>
        fields: Prisma.UserReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReviewPayload>
          }
          findFirst: {
            args: Prisma.UserReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReviewPayload>
          }
          findMany: {
            args: Prisma.UserReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReviewPayload>[]
          }
          create: {
            args: Prisma.UserReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReviewPayload>
          }
          createMany: {
            args: Prisma.UserReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReviewPayload>[]
          }
          delete: {
            args: Prisma.UserReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReviewPayload>
          }
          update: {
            args: Prisma.UserReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReviewPayload>
          }
          deleteMany: {
            args: Prisma.UserReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReviewPayload>[]
          }
          upsert: {
            args: Prisma.UserReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserReviewPayload>
          }
          aggregate: {
            args: Prisma.UserReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserReview>
          }
          groupBy: {
            args: Prisma.UserReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserReviewCountArgs<ExtArgs>
            result: $Utils.Optional<UserReviewCountAggregateOutputType> | number
          }
        }
      }
      Response: {
        payload: Prisma.$ResponsePayload<ExtArgs>
        fields: Prisma.ResponseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          findFirst: {
            args: Prisma.ResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          findMany: {
            args: Prisma.ResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          create: {
            args: Prisma.ResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          createMany: {
            args: Prisma.ResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResponseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          delete: {
            args: Prisma.ResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          update: {
            args: Prisma.ResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          deleteMany: {
            args: Prisma.ResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResponseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          upsert: {
            args: Prisma.ResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          aggregate: {
            args: Prisma.ResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResponse>
          }
          groupBy: {
            args: Prisma.ResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResponseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResponseCountArgs<ExtArgs>
            result: $Utils.Optional<ResponseCountAggregateOutputType> | number
          }
        }
      }
      EligibilitySubmission: {
        payload: Prisma.$EligibilitySubmissionPayload<ExtArgs>
        fields: Prisma.EligibilitySubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EligibilitySubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EligibilitySubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>
          }
          findFirst: {
            args: Prisma.EligibilitySubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EligibilitySubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>
          }
          findMany: {
            args: Prisma.EligibilitySubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>[]
          }
          create: {
            args: Prisma.EligibilitySubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>
          }
          createMany: {
            args: Prisma.EligibilitySubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EligibilitySubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>[]
          }
          delete: {
            args: Prisma.EligibilitySubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>
          }
          update: {
            args: Prisma.EligibilitySubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>
          }
          deleteMany: {
            args: Prisma.EligibilitySubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EligibilitySubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EligibilitySubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>[]
          }
          upsert: {
            args: Prisma.EligibilitySubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>
          }
          aggregate: {
            args: Prisma.EligibilitySubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEligibilitySubmission>
          }
          groupBy: {
            args: Prisma.EligibilitySubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<EligibilitySubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.EligibilitySubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<EligibilitySubmissionCountAggregateOutputType> | number
          }
        }
      }
      Note: {
        payload: Prisma.$NotePayload<ExtArgs>
        fields: Prisma.NoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findFirst: {
            args: Prisma.NoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findMany: {
            args: Prisma.NoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          create: {
            args: Prisma.NoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          createMany: {
            args: Prisma.NoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          delete: {
            args: Prisma.NoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          update: {
            args: Prisma.NoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          deleteMany: {
            args: Prisma.NoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          upsert: {
            args: Prisma.NoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          aggregate: {
            args: Prisma.NoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNote>
          }
          groupBy: {
            args: Prisma.NoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.NoteCountArgs<ExtArgs>
            result: $Utils.Optional<NoteCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      PaymentPart: {
        payload: Prisma.$PaymentPartPayload<ExtArgs>
        fields: Prisma.PaymentPartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentPartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentPartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPartPayload>
          }
          findFirst: {
            args: Prisma.PaymentPartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentPartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPartPayload>
          }
          findMany: {
            args: Prisma.PaymentPartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPartPayload>[]
          }
          create: {
            args: Prisma.PaymentPartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPartPayload>
          }
          createMany: {
            args: Prisma.PaymentPartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentPartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPartPayload>[]
          }
          delete: {
            args: Prisma.PaymentPartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPartPayload>
          }
          update: {
            args: Prisma.PaymentPartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPartPayload>
          }
          deleteMany: {
            args: Prisma.PaymentPartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentPartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentPartUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPartPayload>[]
          }
          upsert: {
            args: Prisma.PaymentPartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPartPayload>
          }
          aggregate: {
            args: Prisma.PaymentPartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentPart>
          }
          groupBy: {
            args: Prisma.PaymentPartGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentPartGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentPartCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentPartCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verification?: VerificationOmit
    section?: SectionOmit
    course?: CourseOmit
    userReview?: UserReviewOmit
    response?: ResponseOmit
    eligibilitySubmission?: EligibilitySubmissionOmit
    note?: NoteOmit
    notification?: NotificationOmit
    payment?: PaymentOmit
    paymentPart?: PaymentPartOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    accounts: number
    impersonatedUsers: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    impersonatedUsers?: boolean | UserCountOutputTypeCountImpersonatedUsersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountImpersonatedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type SectionCountOutputType
   */

  export type SectionCountOutputType = {
    courses: number
  }

  export type SectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | SectionCountOutputTypeCountCoursesArgs
  }

  // Custom InputTypes
  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCountOutputType
     */
    select?: SectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    reviews: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | CourseCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserReviewWhereInput
  }


  /**
   * Count Type ResponseCountOutputType
   */

  export type ResponseCountOutputType = {
    notes: number
  }

  export type ResponseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | ResponseCountOutputTypeCountNotesArgs
  }

  // Custom InputTypes
  /**
   * ResponseCountOutputType without action
   */
  export type ResponseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseCountOutputType
     */
    select?: ResponseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResponseCountOutputType without action
   */
  export type ResponseCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }


  /**
   * Count Type EligibilitySubmissionCountOutputType
   */

  export type EligibilitySubmissionCountOutputType = {
    notes: number
  }

  export type EligibilitySubmissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | EligibilitySubmissionCountOutputTypeCountNotesArgs
  }

  // Custom InputTypes
  /**
   * EligibilitySubmissionCountOutputType without action
   */
  export type EligibilitySubmissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmissionCountOutputType
     */
    select?: EligibilitySubmissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EligibilitySubmissionCountOutputType without action
   */
  export type EligibilitySubmissionCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }


  /**
   * Count Type PaymentCountOutputType
   */

  export type PaymentCountOutputType = {
    parts: number
  }

  export type PaymentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parts?: boolean | PaymentCountOutputTypeCountPartsArgs
  }

  // Custom InputTypes
  /**
   * PaymentCountOutputType without action
   */
  export type PaymentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentCountOutputType
     */
    select?: PaymentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaymentCountOutputType without action
   */
  export type PaymentCountOutputTypeCountPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentPartWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
    banned: boolean | null
    banReason: string | null
    banExpires: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
    banned: boolean | null
    banReason: string | null
    banExpires: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    role: number
    createdAt: number
    updatedAt: number
    banned: number
    banReason: number
    banExpires: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    banned?: true
    banReason?: true
    banExpires?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    banned?: true
    banReason?: true
    banExpires?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    banned?: true
    banReason?: true
    banExpires?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    banned: boolean | null
    banReason: string | null
    banExpires: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    banned?: boolean
    banReason?: boolean
    banExpires?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    impersonatedUsers?: boolean | User$impersonatedUsersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    banned?: boolean
    banReason?: boolean
    banExpires?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    banned?: boolean
    banReason?: boolean
    banExpires?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    banned?: boolean
    banReason?: boolean
    banExpires?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "role" | "createdAt" | "updatedAt" | "banned" | "banReason" | "banExpires", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    impersonatedUsers?: boolean | User$impersonatedUsersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      impersonatedUsers: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
      banned: boolean | null
      banReason: string | null
      banExpires: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    impersonatedUsers<T extends User$impersonatedUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$impersonatedUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly banned: FieldRef<"User", 'Boolean'>
    readonly banReason: FieldRef<"User", 'String'>
    readonly banExpires: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.impersonatedUsers
   */
  export type User$impersonatedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    accountId: string | null
    providerId: string | null
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    idToken: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    accountId: string | null
    providerId: string | null
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    idToken: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    accountId: number
    providerId: number
    accessToken: number
    refreshToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    idToken: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    idToken?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    idToken?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    accountId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    idToken?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    accountId: string
    providerId: string
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    idToken: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    accountId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    idToken?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "accountId" | "providerId" | "accessToken" | "refreshToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "idToken" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      accountId: string
      providerId: string
      accessToken: string | null
      refreshToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      idToken: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    updatedAt: Date | null
    impersonatedBy: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
    updatedAt: Date | null
    impersonatedBy: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    ipAddress: number
    userAgent: number
    createdAt: number
    updatedAt: number
    impersonatedBy: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
    impersonatedBy?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
    impersonatedBy?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    updatedAt?: true
    impersonatedBy?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    updatedAt: Date
    impersonatedBy: string | null
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    impersonatedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    impersonator?: boolean | Session$impersonatorArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    impersonatedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    impersonator?: boolean | Session$impersonatorArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    impersonatedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    impersonator?: boolean | Session$impersonatorArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    impersonatedBy?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "expiresAt" | "ipAddress" | "userAgent" | "createdAt" | "updatedAt" | "impersonatedBy", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    impersonator?: boolean | Session$impersonatorArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    impersonator?: boolean | Session$impersonatorArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    impersonator?: boolean | Session$impersonatorArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      impersonator: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
      updatedAt: Date
      impersonatedBy: string | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    impersonator<T extends Session$impersonatorArgs<ExtArgs> = {}>(args?: Subset<T, Session$impersonatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly token: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly impersonatedBy: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session.impersonator
   */
  export type Session$impersonatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model Section
   */

  export type AggregateSection = {
    _count: SectionCountAggregateOutputType | null
    _avg: SectionAvgAggregateOutputType | null
    _sum: SectionSumAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  export type SectionAvgAggregateOutputType = {
    index: number | null
  }

  export type SectionSumAggregateOutputType = {
    index: number | null
  }

  export type SectionMinAggregateOutputType = {
    id: string | null
    title: string | null
    metaDescription: string | null
    index: number | null
    imageSquareLink: string | null
    imageSquarePublicId: string | null
    imageCoverLink: string | null
    imageCoverPublicId: string | null
    link: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SectionMaxAggregateOutputType = {
    id: string | null
    title: string | null
    metaDescription: string | null
    index: number | null
    imageSquareLink: string | null
    imageSquarePublicId: string | null
    imageCoverLink: string | null
    imageCoverPublicId: string | null
    link: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SectionCountAggregateOutputType = {
    id: number
    title: number
    metaDescription: number
    index: number
    imageSquareLink: number
    imageSquarePublicId: number
    imageCoverLink: number
    imageCoverPublicId: number
    link: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SectionAvgAggregateInputType = {
    index?: true
  }

  export type SectionSumAggregateInputType = {
    index?: true
  }

  export type SectionMinAggregateInputType = {
    id?: true
    title?: true
    metaDescription?: true
    index?: true
    imageSquareLink?: true
    imageSquarePublicId?: true
    imageCoverLink?: true
    imageCoverPublicId?: true
    link?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SectionMaxAggregateInputType = {
    id?: true
    title?: true
    metaDescription?: true
    index?: true
    imageSquareLink?: true
    imageSquarePublicId?: true
    imageCoverLink?: true
    imageCoverPublicId?: true
    link?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SectionCountAggregateInputType = {
    id?: true
    title?: true
    metaDescription?: true
    index?: true
    imageSquareLink?: true
    imageSquarePublicId?: true
    imageCoverLink?: true
    imageCoverPublicId?: true
    link?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Section to aggregate.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sections
    **/
    _count?: true | SectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SectionMaxAggregateInputType
  }

  export type GetSectionAggregateType<T extends SectionAggregateArgs> = {
        [P in keyof T & keyof AggregateSection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSection[P]>
      : GetScalarType<T[P], AggregateSection[P]>
  }




  export type SectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithAggregationInput | SectionOrderByWithAggregationInput[]
    by: SectionScalarFieldEnum[] | SectionScalarFieldEnum
    having?: SectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SectionCountAggregateInputType | true
    _avg?: SectionAvgAggregateInputType
    _sum?: SectionSumAggregateInputType
    _min?: SectionMinAggregateInputType
    _max?: SectionMaxAggregateInputType
  }

  export type SectionGroupByOutputType = {
    id: string
    title: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    link: string
    createdAt: Date
    updatedAt: Date
    _count: SectionCountAggregateOutputType | null
    _avg: SectionAvgAggregateOutputType | null
    _sum: SectionSumAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  type GetSectionGroupByPayload<T extends SectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SectionGroupByOutputType[P]>
            : GetScalarType<T[P], SectionGroupByOutputType[P]>
        }
      >
    >


  export type SectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    metaDescription?: boolean
    index?: boolean
    imageSquareLink?: boolean
    imageSquarePublicId?: boolean
    imageCoverLink?: boolean
    imageCoverPublicId?: boolean
    link?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    courses?: boolean | Section$coursesArgs<ExtArgs>
    _count?: boolean | SectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["section"]>

  export type SectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    metaDescription?: boolean
    index?: boolean
    imageSquareLink?: boolean
    imageSquarePublicId?: boolean
    imageCoverLink?: boolean
    imageCoverPublicId?: boolean
    link?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["section"]>

  export type SectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    metaDescription?: boolean
    index?: boolean
    imageSquareLink?: boolean
    imageSquarePublicId?: boolean
    imageCoverLink?: boolean
    imageCoverPublicId?: boolean
    link?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["section"]>

  export type SectionSelectScalar = {
    id?: boolean
    title?: boolean
    metaDescription?: boolean
    index?: boolean
    imageSquareLink?: boolean
    imageSquarePublicId?: boolean
    imageCoverLink?: boolean
    imageCoverPublicId?: boolean
    link?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "metaDescription" | "index" | "imageSquareLink" | "imageSquarePublicId" | "imageCoverLink" | "imageCoverPublicId" | "link" | "createdAt" | "updatedAt", ExtArgs["result"]["section"]>
  export type SectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | Section$coursesArgs<ExtArgs>
    _count?: boolean | SectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Section"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      metaDescription: string
      index: number
      imageSquareLink: string
      imageSquarePublicId: string
      imageCoverLink: string
      imageCoverPublicId: string
      link: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["section"]>
    composites: {}
  }

  type SectionGetPayload<S extends boolean | null | undefined | SectionDefaultArgs> = $Result.GetResult<Prisma.$SectionPayload, S>

  type SectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SectionCountAggregateInputType | true
    }

  export interface SectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Section'], meta: { name: 'Section' } }
    /**
     * Find zero or one Section that matches the filter.
     * @param {SectionFindUniqueArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SectionFindUniqueArgs>(args: SelectSubset<T, SectionFindUniqueArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Section that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SectionFindUniqueOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SectionFindUniqueOrThrowArgs>(args: SelectSubset<T, SectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Section that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SectionFindFirstArgs>(args?: SelectSubset<T, SectionFindFirstArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Section that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SectionFindFirstOrThrowArgs>(args?: SelectSubset<T, SectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sections
     * const sections = await prisma.section.findMany()
     * 
     * // Get first 10 Sections
     * const sections = await prisma.section.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sectionWithIdOnly = await prisma.section.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SectionFindManyArgs>(args?: SelectSubset<T, SectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Section.
     * @param {SectionCreateArgs} args - Arguments to create a Section.
     * @example
     * // Create one Section
     * const Section = await prisma.section.create({
     *   data: {
     *     // ... data to create a Section
     *   }
     * })
     * 
     */
    create<T extends SectionCreateArgs>(args: SelectSubset<T, SectionCreateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sections.
     * @param {SectionCreateManyArgs} args - Arguments to create many Sections.
     * @example
     * // Create many Sections
     * const section = await prisma.section.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SectionCreateManyArgs>(args?: SelectSubset<T, SectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sections and returns the data saved in the database.
     * @param {SectionCreateManyAndReturnArgs} args - Arguments to create many Sections.
     * @example
     * // Create many Sections
     * const section = await prisma.section.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sections and only return the `id`
     * const sectionWithIdOnly = await prisma.section.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SectionCreateManyAndReturnArgs>(args?: SelectSubset<T, SectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Section.
     * @param {SectionDeleteArgs} args - Arguments to delete one Section.
     * @example
     * // Delete one Section
     * const Section = await prisma.section.delete({
     *   where: {
     *     // ... filter to delete one Section
     *   }
     * })
     * 
     */
    delete<T extends SectionDeleteArgs>(args: SelectSubset<T, SectionDeleteArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Section.
     * @param {SectionUpdateArgs} args - Arguments to update one Section.
     * @example
     * // Update one Section
     * const section = await prisma.section.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SectionUpdateArgs>(args: SelectSubset<T, SectionUpdateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sections.
     * @param {SectionDeleteManyArgs} args - Arguments to filter Sections to delete.
     * @example
     * // Delete a few Sections
     * const { count } = await prisma.section.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SectionDeleteManyArgs>(args?: SelectSubset<T, SectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sections
     * const section = await prisma.section.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SectionUpdateManyArgs>(args: SelectSubset<T, SectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sections and returns the data updated in the database.
     * @param {SectionUpdateManyAndReturnArgs} args - Arguments to update many Sections.
     * @example
     * // Update many Sections
     * const section = await prisma.section.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sections and only return the `id`
     * const sectionWithIdOnly = await prisma.section.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SectionUpdateManyAndReturnArgs>(args: SelectSubset<T, SectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Section.
     * @param {SectionUpsertArgs} args - Arguments to update or create a Section.
     * @example
     * // Update or create a Section
     * const section = await prisma.section.upsert({
     *   create: {
     *     // ... data to create a Section
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Section we want to update
     *   }
     * })
     */
    upsert<T extends SectionUpsertArgs>(args: SelectSubset<T, SectionUpsertArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCountArgs} args - Arguments to filter Sections to count.
     * @example
     * // Count the number of Sections
     * const count = await prisma.section.count({
     *   where: {
     *     // ... the filter for the Sections we want to count
     *   }
     * })
    **/
    count<T extends SectionCountArgs>(
      args?: Subset<T, SectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SectionAggregateArgs>(args: Subset<T, SectionAggregateArgs>): Prisma.PrismaPromise<GetSectionAggregateType<T>>

    /**
     * Group by Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SectionGroupByArgs['orderBy'] }
        : { orderBy?: SectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Section model
   */
  readonly fields: SectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Section.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends Section$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Section$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Section model
   */
  interface SectionFieldRefs {
    readonly id: FieldRef<"Section", 'String'>
    readonly title: FieldRef<"Section", 'String'>
    readonly metaDescription: FieldRef<"Section", 'String'>
    readonly index: FieldRef<"Section", 'Int'>
    readonly imageSquareLink: FieldRef<"Section", 'String'>
    readonly imageSquarePublicId: FieldRef<"Section", 'String'>
    readonly imageCoverLink: FieldRef<"Section", 'String'>
    readonly imageCoverPublicId: FieldRef<"Section", 'String'>
    readonly link: FieldRef<"Section", 'String'>
    readonly createdAt: FieldRef<"Section", 'DateTime'>
    readonly updatedAt: FieldRef<"Section", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Section findUnique
   */
  export type SectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findUniqueOrThrow
   */
  export type SectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findFirst
   */
  export type SectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findFirstOrThrow
   */
  export type SectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findMany
   */
  export type SectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Sections to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section create
   */
  export type SectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Section.
     */
    data: XOR<SectionCreateInput, SectionUncheckedCreateInput>
  }

  /**
   * Section createMany
   */
  export type SectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sections.
     */
    data: SectionCreateManyInput | SectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Section createManyAndReturn
   */
  export type SectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * The data used to create many Sections.
     */
    data: SectionCreateManyInput | SectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Section update
   */
  export type SectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Section.
     */
    data: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
    /**
     * Choose, which Section to update.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section updateMany
   */
  export type SectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sections.
     */
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyInput>
    /**
     * Filter which Sections to update
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to update.
     */
    limit?: number
  }

  /**
   * Section updateManyAndReturn
   */
  export type SectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * The data used to update Sections.
     */
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyInput>
    /**
     * Filter which Sections to update
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to update.
     */
    limit?: number
  }

  /**
   * Section upsert
   */
  export type SectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Section to update in case it exists.
     */
    where: SectionWhereUniqueInput
    /**
     * In case the Section found by the `where` argument doesn't exist, create a new Section with this data.
     */
    create: XOR<SectionCreateInput, SectionUncheckedCreateInput>
    /**
     * In case the Section was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
  }

  /**
   * Section delete
   */
  export type SectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter which Section to delete.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section deleteMany
   */
  export type SectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sections to delete
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to delete.
     */
    limit?: number
  }

  /**
   * Section.courses
   */
  export type Section$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Section without action
   */
  export type SectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    index: number | null
  }

  export type CourseSumAggregateOutputType = {
    index: number | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    title: string | null
    metaTitle: string | null
    metaDescription: string | null
    index: number | null
    imageSquareLink: string | null
    imageSquarePublicId: string | null
    imageCoverLink: string | null
    imageCoverPublicId: string | null
    description: string | null
    jobOpportunity: string | null
    entryRequirement: string | null
    packagingRule: string | null
    coreUnits: string | null
    electiveUnits: string | null
    link: string | null
    sectionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    title: string | null
    metaTitle: string | null
    metaDescription: string | null
    index: number | null
    imageSquareLink: string | null
    imageSquarePublicId: string | null
    imageCoverLink: string | null
    imageCoverPublicId: string | null
    description: string | null
    jobOpportunity: string | null
    entryRequirement: string | null
    packagingRule: string | null
    coreUnits: string | null
    electiveUnits: string | null
    link: string | null
    sectionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    title: number
    metaTitle: number
    metaDescription: number
    index: number
    imageSquareLink: number
    imageSquarePublicId: number
    imageCoverLink: number
    imageCoverPublicId: number
    description: number
    jobOpportunity: number
    entryRequirement: number
    packagingRule: number
    coreUnits: number
    electiveUnits: number
    link: number
    sectionId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    index?: true
  }

  export type CourseSumAggregateInputType = {
    index?: true
  }

  export type CourseMinAggregateInputType = {
    id?: true
    title?: true
    metaTitle?: true
    metaDescription?: true
    index?: true
    imageSquareLink?: true
    imageSquarePublicId?: true
    imageCoverLink?: true
    imageCoverPublicId?: true
    description?: true
    jobOpportunity?: true
    entryRequirement?: true
    packagingRule?: true
    coreUnits?: true
    electiveUnits?: true
    link?: true
    sectionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    title?: true
    metaTitle?: true
    metaDescription?: true
    index?: true
    imageSquareLink?: true
    imageSquarePublicId?: true
    imageCoverLink?: true
    imageCoverPublicId?: true
    description?: true
    jobOpportunity?: true
    entryRequirement?: true
    packagingRule?: true
    coreUnits?: true
    electiveUnits?: true
    link?: true
    sectionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    title?: true
    metaTitle?: true
    metaDescription?: true
    index?: true
    imageSquareLink?: true
    imageSquarePublicId?: true
    imageCoverLink?: true
    imageCoverPublicId?: true
    description?: true
    jobOpportunity?: true
    entryRequirement?: true
    packagingRule?: true
    coreUnits?: true
    electiveUnits?: true
    link?: true
    sectionId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    title: string
    metaTitle: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    description: string
    jobOpportunity: string
    entryRequirement: string
    packagingRule: string
    coreUnits: string
    electiveUnits: string
    link: string
    sectionId: string
    createdAt: Date
    updatedAt: Date
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    index?: boolean
    imageSquareLink?: boolean
    imageSquarePublicId?: boolean
    imageCoverLink?: boolean
    imageCoverPublicId?: boolean
    description?: boolean
    jobOpportunity?: boolean
    entryRequirement?: boolean
    packagingRule?: boolean
    coreUnits?: boolean
    electiveUnits?: boolean
    link?: boolean
    sectionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    section?: boolean | SectionDefaultArgs<ExtArgs>
    reviews?: boolean | Course$reviewsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    index?: boolean
    imageSquareLink?: boolean
    imageSquarePublicId?: boolean
    imageCoverLink?: boolean
    imageCoverPublicId?: boolean
    description?: boolean
    jobOpportunity?: boolean
    entryRequirement?: boolean
    packagingRule?: boolean
    coreUnits?: boolean
    electiveUnits?: boolean
    link?: boolean
    sectionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    index?: boolean
    imageSquareLink?: boolean
    imageSquarePublicId?: boolean
    imageCoverLink?: boolean
    imageCoverPublicId?: boolean
    description?: boolean
    jobOpportunity?: boolean
    entryRequirement?: boolean
    packagingRule?: boolean
    coreUnits?: boolean
    electiveUnits?: boolean
    link?: boolean
    sectionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    title?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    index?: boolean
    imageSquareLink?: boolean
    imageSquarePublicId?: boolean
    imageCoverLink?: boolean
    imageCoverPublicId?: boolean
    description?: boolean
    jobOpportunity?: boolean
    entryRequirement?: boolean
    packagingRule?: boolean
    coreUnits?: boolean
    electiveUnits?: boolean
    link?: boolean
    sectionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "metaTitle" | "metaDescription" | "index" | "imageSquareLink" | "imageSquarePublicId" | "imageCoverLink" | "imageCoverPublicId" | "description" | "jobOpportunity" | "entryRequirement" | "packagingRule" | "coreUnits" | "electiveUnits" | "link" | "sectionId" | "createdAt" | "updatedAt", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    section?: boolean | SectionDefaultArgs<ExtArgs>
    reviews?: boolean | Course$reviewsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      section: Prisma.$SectionPayload<ExtArgs>
      reviews: Prisma.$UserReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      metaTitle: string
      metaDescription: string
      index: number
      imageSquareLink: string
      imageSquarePublicId: string
      imageCoverLink: string
      imageCoverPublicId: string
      description: string
      jobOpportunity: string
      entryRequirement: string
      packagingRule: string
      coreUnits: string
      electiveUnits: string
      link: string
      sectionId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    section<T extends SectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectionDefaultArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviews<T extends Course$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Course$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly title: FieldRef<"Course", 'String'>
    readonly metaTitle: FieldRef<"Course", 'String'>
    readonly metaDescription: FieldRef<"Course", 'String'>
    readonly index: FieldRef<"Course", 'Int'>
    readonly imageSquareLink: FieldRef<"Course", 'String'>
    readonly imageSquarePublicId: FieldRef<"Course", 'String'>
    readonly imageCoverLink: FieldRef<"Course", 'String'>
    readonly imageCoverPublicId: FieldRef<"Course", 'String'>
    readonly description: FieldRef<"Course", 'String'>
    readonly jobOpportunity: FieldRef<"Course", 'String'>
    readonly entryRequirement: FieldRef<"Course", 'String'>
    readonly packagingRule: FieldRef<"Course", 'String'>
    readonly coreUnits: FieldRef<"Course", 'String'>
    readonly electiveUnits: FieldRef<"Course", 'String'>
    readonly link: FieldRef<"Course", 'String'>
    readonly sectionId: FieldRef<"Course", 'String'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
    readonly updatedAt: FieldRef<"Course", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.reviews
   */
  export type Course$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewInclude<ExtArgs> | null
    where?: UserReviewWhereInput
    orderBy?: UserReviewOrderByWithRelationInput | UserReviewOrderByWithRelationInput[]
    cursor?: UserReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserReviewScalarFieldEnum | UserReviewScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model UserReview
   */

  export type AggregateUserReview = {
    _count: UserReviewCountAggregateOutputType | null
    _avg: UserReviewAvgAggregateOutputType | null
    _sum: UserReviewSumAggregateOutputType | null
    _min: UserReviewMinAggregateOutputType | null
    _max: UserReviewMaxAggregateOutputType | null
  }

  export type UserReviewAvgAggregateOutputType = {
    givenStar: number | null
  }

  export type UserReviewSumAggregateOutputType = {
    givenStar: number | null
  }

  export type UserReviewMinAggregateOutputType = {
    id: string | null
    purchasedCourseId: string | null
    userName: string | null
    userImage: string | null
    reviewImage: string | null
    reviewText: string | null
    givenStar: number | null
    approved: boolean | null
    reviewDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserReviewMaxAggregateOutputType = {
    id: string | null
    purchasedCourseId: string | null
    userName: string | null
    userImage: string | null
    reviewImage: string | null
    reviewText: string | null
    givenStar: number | null
    approved: boolean | null
    reviewDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserReviewCountAggregateOutputType = {
    id: number
    purchasedCourseId: number
    userName: number
    userImage: number
    reviewImage: number
    reviewText: number
    givenStar: number
    approved: number
    reviewDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserReviewAvgAggregateInputType = {
    givenStar?: true
  }

  export type UserReviewSumAggregateInputType = {
    givenStar?: true
  }

  export type UserReviewMinAggregateInputType = {
    id?: true
    purchasedCourseId?: true
    userName?: true
    userImage?: true
    reviewImage?: true
    reviewText?: true
    givenStar?: true
    approved?: true
    reviewDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserReviewMaxAggregateInputType = {
    id?: true
    purchasedCourseId?: true
    userName?: true
    userImage?: true
    reviewImage?: true
    reviewText?: true
    givenStar?: true
    approved?: true
    reviewDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserReviewCountAggregateInputType = {
    id?: true
    purchasedCourseId?: true
    userName?: true
    userImage?: true
    reviewImage?: true
    reviewText?: true
    givenStar?: true
    approved?: true
    reviewDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserReview to aggregate.
     */
    where?: UserReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserReviews to fetch.
     */
    orderBy?: UserReviewOrderByWithRelationInput | UserReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserReviews
    **/
    _count?: true | UserReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserReviewMaxAggregateInputType
  }

  export type GetUserReviewAggregateType<T extends UserReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateUserReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserReview[P]>
      : GetScalarType<T[P], AggregateUserReview[P]>
  }




  export type UserReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserReviewWhereInput
    orderBy?: UserReviewOrderByWithAggregationInput | UserReviewOrderByWithAggregationInput[]
    by: UserReviewScalarFieldEnum[] | UserReviewScalarFieldEnum
    having?: UserReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserReviewCountAggregateInputType | true
    _avg?: UserReviewAvgAggregateInputType
    _sum?: UserReviewSumAggregateInputType
    _min?: UserReviewMinAggregateInputType
    _max?: UserReviewMaxAggregateInputType
  }

  export type UserReviewGroupByOutputType = {
    id: string
    purchasedCourseId: string
    userName: string
    userImage: string | null
    reviewImage: string | null
    reviewText: string
    givenStar: number
    approved: boolean
    reviewDate: Date
    createdAt: Date
    updatedAt: Date
    _count: UserReviewCountAggregateOutputType | null
    _avg: UserReviewAvgAggregateOutputType | null
    _sum: UserReviewSumAggregateOutputType | null
    _min: UserReviewMinAggregateOutputType | null
    _max: UserReviewMaxAggregateOutputType | null
  }

  type GetUserReviewGroupByPayload<T extends UserReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserReviewGroupByOutputType[P]>
            : GetScalarType<T[P], UserReviewGroupByOutputType[P]>
        }
      >
    >


  export type UserReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchasedCourseId?: boolean
    userName?: boolean
    userImage?: boolean
    reviewImage?: boolean
    reviewText?: boolean
    givenStar?: boolean
    approved?: boolean
    reviewDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchasedCourse?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userReview"]>

  export type UserReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchasedCourseId?: boolean
    userName?: boolean
    userImage?: boolean
    reviewImage?: boolean
    reviewText?: boolean
    givenStar?: boolean
    approved?: boolean
    reviewDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchasedCourse?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userReview"]>

  export type UserReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchasedCourseId?: boolean
    userName?: boolean
    userImage?: boolean
    reviewImage?: boolean
    reviewText?: boolean
    givenStar?: boolean
    approved?: boolean
    reviewDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchasedCourse?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userReview"]>

  export type UserReviewSelectScalar = {
    id?: boolean
    purchasedCourseId?: boolean
    userName?: boolean
    userImage?: boolean
    reviewImage?: boolean
    reviewText?: boolean
    givenStar?: boolean
    approved?: boolean
    reviewDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "purchasedCourseId" | "userName" | "userImage" | "reviewImage" | "reviewText" | "givenStar" | "approved" | "reviewDate" | "createdAt" | "updatedAt", ExtArgs["result"]["userReview"]>
  export type UserReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchasedCourse?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type UserReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchasedCourse?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type UserReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchasedCourse?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $UserReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserReview"
    objects: {
      purchasedCourse: Prisma.$CoursePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      purchasedCourseId: string
      userName: string
      userImage: string | null
      reviewImage: string | null
      reviewText: string
      givenStar: number
      approved: boolean
      reviewDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userReview"]>
    composites: {}
  }

  type UserReviewGetPayload<S extends boolean | null | undefined | UserReviewDefaultArgs> = $Result.GetResult<Prisma.$UserReviewPayload, S>

  type UserReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserReviewCountAggregateInputType | true
    }

  export interface UserReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserReview'], meta: { name: 'UserReview' } }
    /**
     * Find zero or one UserReview that matches the filter.
     * @param {UserReviewFindUniqueArgs} args - Arguments to find a UserReview
     * @example
     * // Get one UserReview
     * const userReview = await prisma.userReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserReviewFindUniqueArgs>(args: SelectSubset<T, UserReviewFindUniqueArgs<ExtArgs>>): Prisma__UserReviewClient<$Result.GetResult<Prisma.$UserReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserReview that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserReviewFindUniqueOrThrowArgs} args - Arguments to find a UserReview
     * @example
     * // Get one UserReview
     * const userReview = await prisma.userReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, UserReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserReviewClient<$Result.GetResult<Prisma.$UserReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReviewFindFirstArgs} args - Arguments to find a UserReview
     * @example
     * // Get one UserReview
     * const userReview = await prisma.userReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserReviewFindFirstArgs>(args?: SelectSubset<T, UserReviewFindFirstArgs<ExtArgs>>): Prisma__UserReviewClient<$Result.GetResult<Prisma.$UserReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReviewFindFirstOrThrowArgs} args - Arguments to find a UserReview
     * @example
     * // Get one UserReview
     * const userReview = await prisma.userReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, UserReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserReviewClient<$Result.GetResult<Prisma.$UserReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserReviews
     * const userReviews = await prisma.userReview.findMany()
     * 
     * // Get first 10 UserReviews
     * const userReviews = await prisma.userReview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userReviewWithIdOnly = await prisma.userReview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserReviewFindManyArgs>(args?: SelectSubset<T, UserReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserReview.
     * @param {UserReviewCreateArgs} args - Arguments to create a UserReview.
     * @example
     * // Create one UserReview
     * const UserReview = await prisma.userReview.create({
     *   data: {
     *     // ... data to create a UserReview
     *   }
     * })
     * 
     */
    create<T extends UserReviewCreateArgs>(args: SelectSubset<T, UserReviewCreateArgs<ExtArgs>>): Prisma__UserReviewClient<$Result.GetResult<Prisma.$UserReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserReviews.
     * @param {UserReviewCreateManyArgs} args - Arguments to create many UserReviews.
     * @example
     * // Create many UserReviews
     * const userReview = await prisma.userReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserReviewCreateManyArgs>(args?: SelectSubset<T, UserReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserReviews and returns the data saved in the database.
     * @param {UserReviewCreateManyAndReturnArgs} args - Arguments to create many UserReviews.
     * @example
     * // Create many UserReviews
     * const userReview = await prisma.userReview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserReviews and only return the `id`
     * const userReviewWithIdOnly = await prisma.userReview.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, UserReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserReview.
     * @param {UserReviewDeleteArgs} args - Arguments to delete one UserReview.
     * @example
     * // Delete one UserReview
     * const UserReview = await prisma.userReview.delete({
     *   where: {
     *     // ... filter to delete one UserReview
     *   }
     * })
     * 
     */
    delete<T extends UserReviewDeleteArgs>(args: SelectSubset<T, UserReviewDeleteArgs<ExtArgs>>): Prisma__UserReviewClient<$Result.GetResult<Prisma.$UserReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserReview.
     * @param {UserReviewUpdateArgs} args - Arguments to update one UserReview.
     * @example
     * // Update one UserReview
     * const userReview = await prisma.userReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserReviewUpdateArgs>(args: SelectSubset<T, UserReviewUpdateArgs<ExtArgs>>): Prisma__UserReviewClient<$Result.GetResult<Prisma.$UserReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserReviews.
     * @param {UserReviewDeleteManyArgs} args - Arguments to filter UserReviews to delete.
     * @example
     * // Delete a few UserReviews
     * const { count } = await prisma.userReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserReviewDeleteManyArgs>(args?: SelectSubset<T, UserReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserReviews
     * const userReview = await prisma.userReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserReviewUpdateManyArgs>(args: SelectSubset<T, UserReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserReviews and returns the data updated in the database.
     * @param {UserReviewUpdateManyAndReturnArgs} args - Arguments to update many UserReviews.
     * @example
     * // Update many UserReviews
     * const userReview = await prisma.userReview.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserReviews and only return the `id`
     * const userReviewWithIdOnly = await prisma.userReview.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, UserReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserReview.
     * @param {UserReviewUpsertArgs} args - Arguments to update or create a UserReview.
     * @example
     * // Update or create a UserReview
     * const userReview = await prisma.userReview.upsert({
     *   create: {
     *     // ... data to create a UserReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserReview we want to update
     *   }
     * })
     */
    upsert<T extends UserReviewUpsertArgs>(args: SelectSubset<T, UserReviewUpsertArgs<ExtArgs>>): Prisma__UserReviewClient<$Result.GetResult<Prisma.$UserReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReviewCountArgs} args - Arguments to filter UserReviews to count.
     * @example
     * // Count the number of UserReviews
     * const count = await prisma.userReview.count({
     *   where: {
     *     // ... the filter for the UserReviews we want to count
     *   }
     * })
    **/
    count<T extends UserReviewCountArgs>(
      args?: Subset<T, UserReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserReviewAggregateArgs>(args: Subset<T, UserReviewAggregateArgs>): Prisma.PrismaPromise<GetUserReviewAggregateType<T>>

    /**
     * Group by UserReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserReviewGroupByArgs['orderBy'] }
        : { orderBy?: UserReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserReview model
   */
  readonly fields: UserReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserReview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    purchasedCourse<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserReview model
   */
  interface UserReviewFieldRefs {
    readonly id: FieldRef<"UserReview", 'String'>
    readonly purchasedCourseId: FieldRef<"UserReview", 'String'>
    readonly userName: FieldRef<"UserReview", 'String'>
    readonly userImage: FieldRef<"UserReview", 'String'>
    readonly reviewImage: FieldRef<"UserReview", 'String'>
    readonly reviewText: FieldRef<"UserReview", 'String'>
    readonly givenStar: FieldRef<"UserReview", 'Int'>
    readonly approved: FieldRef<"UserReview", 'Boolean'>
    readonly reviewDate: FieldRef<"UserReview", 'DateTime'>
    readonly createdAt: FieldRef<"UserReview", 'DateTime'>
    readonly updatedAt: FieldRef<"UserReview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserReview findUnique
   */
  export type UserReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewInclude<ExtArgs> | null
    /**
     * Filter, which UserReview to fetch.
     */
    where: UserReviewWhereUniqueInput
  }

  /**
   * UserReview findUniqueOrThrow
   */
  export type UserReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewInclude<ExtArgs> | null
    /**
     * Filter, which UserReview to fetch.
     */
    where: UserReviewWhereUniqueInput
  }

  /**
   * UserReview findFirst
   */
  export type UserReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewInclude<ExtArgs> | null
    /**
     * Filter, which UserReview to fetch.
     */
    where?: UserReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserReviews to fetch.
     */
    orderBy?: UserReviewOrderByWithRelationInput | UserReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserReviews.
     */
    cursor?: UserReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserReviews.
     */
    distinct?: UserReviewScalarFieldEnum | UserReviewScalarFieldEnum[]
  }

  /**
   * UserReview findFirstOrThrow
   */
  export type UserReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewInclude<ExtArgs> | null
    /**
     * Filter, which UserReview to fetch.
     */
    where?: UserReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserReviews to fetch.
     */
    orderBy?: UserReviewOrderByWithRelationInput | UserReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserReviews.
     */
    cursor?: UserReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserReviews.
     */
    distinct?: UserReviewScalarFieldEnum | UserReviewScalarFieldEnum[]
  }

  /**
   * UserReview findMany
   */
  export type UserReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewInclude<ExtArgs> | null
    /**
     * Filter, which UserReviews to fetch.
     */
    where?: UserReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserReviews to fetch.
     */
    orderBy?: UserReviewOrderByWithRelationInput | UserReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserReviews.
     */
    cursor?: UserReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserReviews.
     */
    skip?: number
    distinct?: UserReviewScalarFieldEnum | UserReviewScalarFieldEnum[]
  }

  /**
   * UserReview create
   */
  export type UserReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a UserReview.
     */
    data: XOR<UserReviewCreateInput, UserReviewUncheckedCreateInput>
  }

  /**
   * UserReview createMany
   */
  export type UserReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserReviews.
     */
    data: UserReviewCreateManyInput | UserReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserReview createManyAndReturn
   */
  export type UserReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * The data used to create many UserReviews.
     */
    data: UserReviewCreateManyInput | UserReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserReview update
   */
  export type UserReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a UserReview.
     */
    data: XOR<UserReviewUpdateInput, UserReviewUncheckedUpdateInput>
    /**
     * Choose, which UserReview to update.
     */
    where: UserReviewWhereUniqueInput
  }

  /**
   * UserReview updateMany
   */
  export type UserReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserReviews.
     */
    data: XOR<UserReviewUpdateManyMutationInput, UserReviewUncheckedUpdateManyInput>
    /**
     * Filter which UserReviews to update
     */
    where?: UserReviewWhereInput
    /**
     * Limit how many UserReviews to update.
     */
    limit?: number
  }

  /**
   * UserReview updateManyAndReturn
   */
  export type UserReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * The data used to update UserReviews.
     */
    data: XOR<UserReviewUpdateManyMutationInput, UserReviewUncheckedUpdateManyInput>
    /**
     * Filter which UserReviews to update
     */
    where?: UserReviewWhereInput
    /**
     * Limit how many UserReviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserReview upsert
   */
  export type UserReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the UserReview to update in case it exists.
     */
    where: UserReviewWhereUniqueInput
    /**
     * In case the UserReview found by the `where` argument doesn't exist, create a new UserReview with this data.
     */
    create: XOR<UserReviewCreateInput, UserReviewUncheckedCreateInput>
    /**
     * In case the UserReview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserReviewUpdateInput, UserReviewUncheckedUpdateInput>
  }

  /**
   * UserReview delete
   */
  export type UserReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewInclude<ExtArgs> | null
    /**
     * Filter which UserReview to delete.
     */
    where: UserReviewWhereUniqueInput
  }

  /**
   * UserReview deleteMany
   */
  export type UserReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserReviews to delete
     */
    where?: UserReviewWhereInput
    /**
     * Limit how many UserReviews to delete.
     */
    limit?: number
  }

  /**
   * UserReview without action
   */
  export type UserReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserReview
     */
    select?: UserReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserReview
     */
    omit?: UserReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserReviewInclude<ExtArgs> | null
  }


  /**
   * Model Response
   */

  export type AggregateResponse = {
    _count: ResponseCountAggregateOutputType | null
    _min: ResponseMinAggregateOutputType | null
    _max: ResponseMaxAggregateOutputType | null
  }

  export type ResponseMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    message: string | null
    interest: string | null
    createdAt: Date | null
    stage: $Enums.ResponseStage | null
  }

  export type ResponseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    email: string | null
    message: string | null
    interest: string | null
    createdAt: Date | null
    stage: $Enums.ResponseStage | null
  }

  export type ResponseCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    email: number
    message: number
    interest: number
    createdAt: number
    stage: number
    _all: number
  }


  export type ResponseMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    message?: true
    interest?: true
    createdAt?: true
    stage?: true
  }

  export type ResponseMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    message?: true
    interest?: true
    createdAt?: true
    stage?: true
  }

  export type ResponseCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    message?: true
    interest?: true
    createdAt?: true
    stage?: true
    _all?: true
  }

  export type ResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Response to aggregate.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Responses
    **/
    _count?: true | ResponseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResponseMaxAggregateInputType
  }

  export type GetResponseAggregateType<T extends ResponseAggregateArgs> = {
        [P in keyof T & keyof AggregateResponse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResponse[P]>
      : GetScalarType<T[P], AggregateResponse[P]>
  }




  export type ResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponseWhereInput
    orderBy?: ResponseOrderByWithAggregationInput | ResponseOrderByWithAggregationInput[]
    by: ResponseScalarFieldEnum[] | ResponseScalarFieldEnum
    having?: ResponseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResponseCountAggregateInputType | true
    _min?: ResponseMinAggregateInputType
    _max?: ResponseMaxAggregateInputType
  }

  export type ResponseGroupByOutputType = {
    id: string
    name: string
    phone: string
    email: string
    message: string | null
    interest: string | null
    createdAt: Date
    stage: $Enums.ResponseStage
    _count: ResponseCountAggregateOutputType | null
    _min: ResponseMinAggregateOutputType | null
    _max: ResponseMaxAggregateOutputType | null
  }

  type GetResponseGroupByPayload<T extends ResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResponseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResponseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResponseGroupByOutputType[P]>
            : GetScalarType<T[P], ResponseGroupByOutputType[P]>
        }
      >
    >


  export type ResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    message?: boolean
    interest?: boolean
    createdAt?: boolean
    stage?: boolean
    notes?: boolean | Response$notesArgs<ExtArgs>
    _count?: boolean | ResponseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["response"]>

  export type ResponseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    message?: boolean
    interest?: boolean
    createdAt?: boolean
    stage?: boolean
  }, ExtArgs["result"]["response"]>

  export type ResponseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    message?: boolean
    interest?: boolean
    createdAt?: boolean
    stage?: boolean
  }, ExtArgs["result"]["response"]>

  export type ResponseSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    message?: boolean
    interest?: boolean
    createdAt?: boolean
    stage?: boolean
  }

  export type ResponseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "email" | "message" | "interest" | "createdAt" | "stage", ExtArgs["result"]["response"]>
  export type ResponseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | Response$notesArgs<ExtArgs>
    _count?: boolean | ResponseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResponseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ResponseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Response"
    objects: {
      notes: Prisma.$NotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string
      email: string
      message: string | null
      interest: string | null
      createdAt: Date
      stage: $Enums.ResponseStage
    }, ExtArgs["result"]["response"]>
    composites: {}
  }

  type ResponseGetPayload<S extends boolean | null | undefined | ResponseDefaultArgs> = $Result.GetResult<Prisma.$ResponsePayload, S>

  type ResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResponseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResponseCountAggregateInputType | true
    }

  export interface ResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Response'], meta: { name: 'Response' } }
    /**
     * Find zero or one Response that matches the filter.
     * @param {ResponseFindUniqueArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResponseFindUniqueArgs>(args: SelectSubset<T, ResponseFindUniqueArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Response that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResponseFindUniqueOrThrowArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, ResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Response that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindFirstArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResponseFindFirstArgs>(args?: SelectSubset<T, ResponseFindFirstArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Response that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindFirstOrThrowArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, ResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Responses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Responses
     * const responses = await prisma.response.findMany()
     * 
     * // Get first 10 Responses
     * const responses = await prisma.response.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const responseWithIdOnly = await prisma.response.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResponseFindManyArgs>(args?: SelectSubset<T, ResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Response.
     * @param {ResponseCreateArgs} args - Arguments to create a Response.
     * @example
     * // Create one Response
     * const Response = await prisma.response.create({
     *   data: {
     *     // ... data to create a Response
     *   }
     * })
     * 
     */
    create<T extends ResponseCreateArgs>(args: SelectSubset<T, ResponseCreateArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Responses.
     * @param {ResponseCreateManyArgs} args - Arguments to create many Responses.
     * @example
     * // Create many Responses
     * const response = await prisma.response.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResponseCreateManyArgs>(args?: SelectSubset<T, ResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Responses and returns the data saved in the database.
     * @param {ResponseCreateManyAndReturnArgs} args - Arguments to create many Responses.
     * @example
     * // Create many Responses
     * const response = await prisma.response.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Responses and only return the `id`
     * const responseWithIdOnly = await prisma.response.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResponseCreateManyAndReturnArgs>(args?: SelectSubset<T, ResponseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Response.
     * @param {ResponseDeleteArgs} args - Arguments to delete one Response.
     * @example
     * // Delete one Response
     * const Response = await prisma.response.delete({
     *   where: {
     *     // ... filter to delete one Response
     *   }
     * })
     * 
     */
    delete<T extends ResponseDeleteArgs>(args: SelectSubset<T, ResponseDeleteArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Response.
     * @param {ResponseUpdateArgs} args - Arguments to update one Response.
     * @example
     * // Update one Response
     * const response = await prisma.response.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResponseUpdateArgs>(args: SelectSubset<T, ResponseUpdateArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Responses.
     * @param {ResponseDeleteManyArgs} args - Arguments to filter Responses to delete.
     * @example
     * // Delete a few Responses
     * const { count } = await prisma.response.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResponseDeleteManyArgs>(args?: SelectSubset<T, ResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Responses
     * const response = await prisma.response.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResponseUpdateManyArgs>(args: SelectSubset<T, ResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Responses and returns the data updated in the database.
     * @param {ResponseUpdateManyAndReturnArgs} args - Arguments to update many Responses.
     * @example
     * // Update many Responses
     * const response = await prisma.response.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Responses and only return the `id`
     * const responseWithIdOnly = await prisma.response.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResponseUpdateManyAndReturnArgs>(args: SelectSubset<T, ResponseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Response.
     * @param {ResponseUpsertArgs} args - Arguments to update or create a Response.
     * @example
     * // Update or create a Response
     * const response = await prisma.response.upsert({
     *   create: {
     *     // ... data to create a Response
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Response we want to update
     *   }
     * })
     */
    upsert<T extends ResponseUpsertArgs>(args: SelectSubset<T, ResponseUpsertArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseCountArgs} args - Arguments to filter Responses to count.
     * @example
     * // Count the number of Responses
     * const count = await prisma.response.count({
     *   where: {
     *     // ... the filter for the Responses we want to count
     *   }
     * })
    **/
    count<T extends ResponseCountArgs>(
      args?: Subset<T, ResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResponseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResponseAggregateArgs>(args: Subset<T, ResponseAggregateArgs>): Prisma.PrismaPromise<GetResponseAggregateType<T>>

    /**
     * Group by Response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResponseGroupByArgs['orderBy'] }
        : { orderBy?: ResponseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResponseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Response model
   */
  readonly fields: ResponseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Response.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notes<T extends Response$notesArgs<ExtArgs> = {}>(args?: Subset<T, Response$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Response model
   */
  interface ResponseFieldRefs {
    readonly id: FieldRef<"Response", 'String'>
    readonly name: FieldRef<"Response", 'String'>
    readonly phone: FieldRef<"Response", 'String'>
    readonly email: FieldRef<"Response", 'String'>
    readonly message: FieldRef<"Response", 'String'>
    readonly interest: FieldRef<"Response", 'String'>
    readonly createdAt: FieldRef<"Response", 'DateTime'>
    readonly stage: FieldRef<"Response", 'ResponseStage'>
  }
    

  // Custom InputTypes
  /**
   * Response findUnique
   */
  export type ResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response findUniqueOrThrow
   */
  export type ResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response findFirst
   */
  export type ResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responses.
     */
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response findFirstOrThrow
   */
  export type ResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responses.
     */
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response findMany
   */
  export type ResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Responses to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response create
   */
  export type ResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The data needed to create a Response.
     */
    data: XOR<ResponseCreateInput, ResponseUncheckedCreateInput>
  }

  /**
   * Response createMany
   */
  export type ResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Responses.
     */
    data: ResponseCreateManyInput | ResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Response createManyAndReturn
   */
  export type ResponseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * The data used to create many Responses.
     */
    data: ResponseCreateManyInput | ResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Response update
   */
  export type ResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The data needed to update a Response.
     */
    data: XOR<ResponseUpdateInput, ResponseUncheckedUpdateInput>
    /**
     * Choose, which Response to update.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response updateMany
   */
  export type ResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Responses.
     */
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyInput>
    /**
     * Filter which Responses to update
     */
    where?: ResponseWhereInput
    /**
     * Limit how many Responses to update.
     */
    limit?: number
  }

  /**
   * Response updateManyAndReturn
   */
  export type ResponseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * The data used to update Responses.
     */
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyInput>
    /**
     * Filter which Responses to update
     */
    where?: ResponseWhereInput
    /**
     * Limit how many Responses to update.
     */
    limit?: number
  }

  /**
   * Response upsert
   */
  export type ResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The filter to search for the Response to update in case it exists.
     */
    where: ResponseWhereUniqueInput
    /**
     * In case the Response found by the `where` argument doesn't exist, create a new Response with this data.
     */
    create: XOR<ResponseCreateInput, ResponseUncheckedCreateInput>
    /**
     * In case the Response was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResponseUpdateInput, ResponseUncheckedUpdateInput>
  }

  /**
   * Response delete
   */
  export type ResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter which Response to delete.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response deleteMany
   */
  export type ResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Responses to delete
     */
    where?: ResponseWhereInput
    /**
     * Limit how many Responses to delete.
     */
    limit?: number
  }

  /**
   * Response.notes
   */
  export type Response$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Response without action
   */
  export type ResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
  }


  /**
   * Model EligibilitySubmission
   */

  export type AggregateEligibilitySubmission = {
    _count: EligibilitySubmissionCountAggregateOutputType | null
    _avg: EligibilitySubmissionAvgAggregateOutputType | null
    _sum: EligibilitySubmissionSumAggregateOutputType | null
    _min: EligibilitySubmissionMinAggregateOutputType | null
    _max: EligibilitySubmissionMaxAggregateOutputType | null
  }

  export type EligibilitySubmissionAvgAggregateOutputType = {
    yearsOfExperience: number | null
  }

  export type EligibilitySubmissionSumAggregateOutputType = {
    yearsOfExperience: number | null
  }

  export type EligibilitySubmissionMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    email: string | null
    phoneNumber: string | null
    industry: string | null
    qualification: string | null
    yearsOfExperience: number | null
    stateLivedIn: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EligibilitySubmissionMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    email: string | null
    phoneNumber: string | null
    industry: string | null
    qualification: string | null
    yearsOfExperience: number | null
    stateLivedIn: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EligibilitySubmissionCountAggregateOutputType = {
    id: number
    fullName: number
    email: number
    phoneNumber: number
    industry: number
    qualification: number
    yearsOfExperience: number
    stateLivedIn: number
    message: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EligibilitySubmissionAvgAggregateInputType = {
    yearsOfExperience?: true
  }

  export type EligibilitySubmissionSumAggregateInputType = {
    yearsOfExperience?: true
  }

  export type EligibilitySubmissionMinAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    phoneNumber?: true
    industry?: true
    qualification?: true
    yearsOfExperience?: true
    stateLivedIn?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EligibilitySubmissionMaxAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    phoneNumber?: true
    industry?: true
    qualification?: true
    yearsOfExperience?: true
    stateLivedIn?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EligibilitySubmissionCountAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    phoneNumber?: true
    industry?: true
    qualification?: true
    yearsOfExperience?: true
    stateLivedIn?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EligibilitySubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EligibilitySubmission to aggregate.
     */
    where?: EligibilitySubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilitySubmissions to fetch.
     */
    orderBy?: EligibilitySubmissionOrderByWithRelationInput | EligibilitySubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EligibilitySubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilitySubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilitySubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EligibilitySubmissions
    **/
    _count?: true | EligibilitySubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EligibilitySubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EligibilitySubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EligibilitySubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EligibilitySubmissionMaxAggregateInputType
  }

  export type GetEligibilitySubmissionAggregateType<T extends EligibilitySubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateEligibilitySubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEligibilitySubmission[P]>
      : GetScalarType<T[P], AggregateEligibilitySubmission[P]>
  }




  export type EligibilitySubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EligibilitySubmissionWhereInput
    orderBy?: EligibilitySubmissionOrderByWithAggregationInput | EligibilitySubmissionOrderByWithAggregationInput[]
    by: EligibilitySubmissionScalarFieldEnum[] | EligibilitySubmissionScalarFieldEnum
    having?: EligibilitySubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EligibilitySubmissionCountAggregateInputType | true
    _avg?: EligibilitySubmissionAvgAggregateInputType
    _sum?: EligibilitySubmissionSumAggregateInputType
    _min?: EligibilitySubmissionMinAggregateInputType
    _max?: EligibilitySubmissionMaxAggregateInputType
  }

  export type EligibilitySubmissionGroupByOutputType = {
    id: string
    fullName: string
    email: string
    phoneNumber: string
    industry: string
    qualification: string
    yearsOfExperience: number
    stateLivedIn: string
    message: string | null
    createdAt: Date
    updatedAt: Date
    _count: EligibilitySubmissionCountAggregateOutputType | null
    _avg: EligibilitySubmissionAvgAggregateOutputType | null
    _sum: EligibilitySubmissionSumAggregateOutputType | null
    _min: EligibilitySubmissionMinAggregateOutputType | null
    _max: EligibilitySubmissionMaxAggregateOutputType | null
  }

  type GetEligibilitySubmissionGroupByPayload<T extends EligibilitySubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EligibilitySubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EligibilitySubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EligibilitySubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], EligibilitySubmissionGroupByOutputType[P]>
        }
      >
    >


  export type EligibilitySubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    phoneNumber?: boolean
    industry?: boolean
    qualification?: boolean
    yearsOfExperience?: boolean
    stateLivedIn?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    notes?: boolean | EligibilitySubmission$notesArgs<ExtArgs>
    _count?: boolean | EligibilitySubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eligibilitySubmission"]>

  export type EligibilitySubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    phoneNumber?: boolean
    industry?: boolean
    qualification?: boolean
    yearsOfExperience?: boolean
    stateLivedIn?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["eligibilitySubmission"]>

  export type EligibilitySubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    phoneNumber?: boolean
    industry?: boolean
    qualification?: boolean
    yearsOfExperience?: boolean
    stateLivedIn?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["eligibilitySubmission"]>

  export type EligibilitySubmissionSelectScalar = {
    id?: boolean
    fullName?: boolean
    email?: boolean
    phoneNumber?: boolean
    industry?: boolean
    qualification?: boolean
    yearsOfExperience?: boolean
    stateLivedIn?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EligibilitySubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "email" | "phoneNumber" | "industry" | "qualification" | "yearsOfExperience" | "stateLivedIn" | "message" | "createdAt" | "updatedAt", ExtArgs["result"]["eligibilitySubmission"]>
  export type EligibilitySubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | EligibilitySubmission$notesArgs<ExtArgs>
    _count?: boolean | EligibilitySubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EligibilitySubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EligibilitySubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EligibilitySubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EligibilitySubmission"
    objects: {
      notes: Prisma.$NotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      email: string
      phoneNumber: string
      industry: string
      qualification: string
      yearsOfExperience: number
      stateLivedIn: string
      message: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["eligibilitySubmission"]>
    composites: {}
  }

  type EligibilitySubmissionGetPayload<S extends boolean | null | undefined | EligibilitySubmissionDefaultArgs> = $Result.GetResult<Prisma.$EligibilitySubmissionPayload, S>

  type EligibilitySubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EligibilitySubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EligibilitySubmissionCountAggregateInputType | true
    }

  export interface EligibilitySubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EligibilitySubmission'], meta: { name: 'EligibilitySubmission' } }
    /**
     * Find zero or one EligibilitySubmission that matches the filter.
     * @param {EligibilitySubmissionFindUniqueArgs} args - Arguments to find a EligibilitySubmission
     * @example
     * // Get one EligibilitySubmission
     * const eligibilitySubmission = await prisma.eligibilitySubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EligibilitySubmissionFindUniqueArgs>(args: SelectSubset<T, EligibilitySubmissionFindUniqueArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EligibilitySubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EligibilitySubmissionFindUniqueOrThrowArgs} args - Arguments to find a EligibilitySubmission
     * @example
     * // Get one EligibilitySubmission
     * const eligibilitySubmission = await prisma.eligibilitySubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EligibilitySubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, EligibilitySubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EligibilitySubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionFindFirstArgs} args - Arguments to find a EligibilitySubmission
     * @example
     * // Get one EligibilitySubmission
     * const eligibilitySubmission = await prisma.eligibilitySubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EligibilitySubmissionFindFirstArgs>(args?: SelectSubset<T, EligibilitySubmissionFindFirstArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EligibilitySubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionFindFirstOrThrowArgs} args - Arguments to find a EligibilitySubmission
     * @example
     * // Get one EligibilitySubmission
     * const eligibilitySubmission = await prisma.eligibilitySubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EligibilitySubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, EligibilitySubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EligibilitySubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EligibilitySubmissions
     * const eligibilitySubmissions = await prisma.eligibilitySubmission.findMany()
     * 
     * // Get first 10 EligibilitySubmissions
     * const eligibilitySubmissions = await prisma.eligibilitySubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eligibilitySubmissionWithIdOnly = await prisma.eligibilitySubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EligibilitySubmissionFindManyArgs>(args?: SelectSubset<T, EligibilitySubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EligibilitySubmission.
     * @param {EligibilitySubmissionCreateArgs} args - Arguments to create a EligibilitySubmission.
     * @example
     * // Create one EligibilitySubmission
     * const EligibilitySubmission = await prisma.eligibilitySubmission.create({
     *   data: {
     *     // ... data to create a EligibilitySubmission
     *   }
     * })
     * 
     */
    create<T extends EligibilitySubmissionCreateArgs>(args: SelectSubset<T, EligibilitySubmissionCreateArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EligibilitySubmissions.
     * @param {EligibilitySubmissionCreateManyArgs} args - Arguments to create many EligibilitySubmissions.
     * @example
     * // Create many EligibilitySubmissions
     * const eligibilitySubmission = await prisma.eligibilitySubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EligibilitySubmissionCreateManyArgs>(args?: SelectSubset<T, EligibilitySubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EligibilitySubmissions and returns the data saved in the database.
     * @param {EligibilitySubmissionCreateManyAndReturnArgs} args - Arguments to create many EligibilitySubmissions.
     * @example
     * // Create many EligibilitySubmissions
     * const eligibilitySubmission = await prisma.eligibilitySubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EligibilitySubmissions and only return the `id`
     * const eligibilitySubmissionWithIdOnly = await prisma.eligibilitySubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EligibilitySubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, EligibilitySubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EligibilitySubmission.
     * @param {EligibilitySubmissionDeleteArgs} args - Arguments to delete one EligibilitySubmission.
     * @example
     * // Delete one EligibilitySubmission
     * const EligibilitySubmission = await prisma.eligibilitySubmission.delete({
     *   where: {
     *     // ... filter to delete one EligibilitySubmission
     *   }
     * })
     * 
     */
    delete<T extends EligibilitySubmissionDeleteArgs>(args: SelectSubset<T, EligibilitySubmissionDeleteArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EligibilitySubmission.
     * @param {EligibilitySubmissionUpdateArgs} args - Arguments to update one EligibilitySubmission.
     * @example
     * // Update one EligibilitySubmission
     * const eligibilitySubmission = await prisma.eligibilitySubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EligibilitySubmissionUpdateArgs>(args: SelectSubset<T, EligibilitySubmissionUpdateArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EligibilitySubmissions.
     * @param {EligibilitySubmissionDeleteManyArgs} args - Arguments to filter EligibilitySubmissions to delete.
     * @example
     * // Delete a few EligibilitySubmissions
     * const { count } = await prisma.eligibilitySubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EligibilitySubmissionDeleteManyArgs>(args?: SelectSubset<T, EligibilitySubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EligibilitySubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EligibilitySubmissions
     * const eligibilitySubmission = await prisma.eligibilitySubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EligibilitySubmissionUpdateManyArgs>(args: SelectSubset<T, EligibilitySubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EligibilitySubmissions and returns the data updated in the database.
     * @param {EligibilitySubmissionUpdateManyAndReturnArgs} args - Arguments to update many EligibilitySubmissions.
     * @example
     * // Update many EligibilitySubmissions
     * const eligibilitySubmission = await prisma.eligibilitySubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EligibilitySubmissions and only return the `id`
     * const eligibilitySubmissionWithIdOnly = await prisma.eligibilitySubmission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EligibilitySubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, EligibilitySubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EligibilitySubmission.
     * @param {EligibilitySubmissionUpsertArgs} args - Arguments to update or create a EligibilitySubmission.
     * @example
     * // Update or create a EligibilitySubmission
     * const eligibilitySubmission = await prisma.eligibilitySubmission.upsert({
     *   create: {
     *     // ... data to create a EligibilitySubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EligibilitySubmission we want to update
     *   }
     * })
     */
    upsert<T extends EligibilitySubmissionUpsertArgs>(args: SelectSubset<T, EligibilitySubmissionUpsertArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EligibilitySubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionCountArgs} args - Arguments to filter EligibilitySubmissions to count.
     * @example
     * // Count the number of EligibilitySubmissions
     * const count = await prisma.eligibilitySubmission.count({
     *   where: {
     *     // ... the filter for the EligibilitySubmissions we want to count
     *   }
     * })
    **/
    count<T extends EligibilitySubmissionCountArgs>(
      args?: Subset<T, EligibilitySubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EligibilitySubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EligibilitySubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EligibilitySubmissionAggregateArgs>(args: Subset<T, EligibilitySubmissionAggregateArgs>): Prisma.PrismaPromise<GetEligibilitySubmissionAggregateType<T>>

    /**
     * Group by EligibilitySubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EligibilitySubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EligibilitySubmissionGroupByArgs['orderBy'] }
        : { orderBy?: EligibilitySubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EligibilitySubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEligibilitySubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EligibilitySubmission model
   */
  readonly fields: EligibilitySubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EligibilitySubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EligibilitySubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notes<T extends EligibilitySubmission$notesArgs<ExtArgs> = {}>(args?: Subset<T, EligibilitySubmission$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EligibilitySubmission model
   */
  interface EligibilitySubmissionFieldRefs {
    readonly id: FieldRef<"EligibilitySubmission", 'String'>
    readonly fullName: FieldRef<"EligibilitySubmission", 'String'>
    readonly email: FieldRef<"EligibilitySubmission", 'String'>
    readonly phoneNumber: FieldRef<"EligibilitySubmission", 'String'>
    readonly industry: FieldRef<"EligibilitySubmission", 'String'>
    readonly qualification: FieldRef<"EligibilitySubmission", 'String'>
    readonly yearsOfExperience: FieldRef<"EligibilitySubmission", 'Int'>
    readonly stateLivedIn: FieldRef<"EligibilitySubmission", 'String'>
    readonly message: FieldRef<"EligibilitySubmission", 'String'>
    readonly createdAt: FieldRef<"EligibilitySubmission", 'DateTime'>
    readonly updatedAt: FieldRef<"EligibilitySubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EligibilitySubmission findUnique
   */
  export type EligibilitySubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilitySubmissionInclude<ExtArgs> | null
    /**
     * Filter, which EligibilitySubmission to fetch.
     */
    where: EligibilitySubmissionWhereUniqueInput
  }

  /**
   * EligibilitySubmission findUniqueOrThrow
   */
  export type EligibilitySubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilitySubmissionInclude<ExtArgs> | null
    /**
     * Filter, which EligibilitySubmission to fetch.
     */
    where: EligibilitySubmissionWhereUniqueInput
  }

  /**
   * EligibilitySubmission findFirst
   */
  export type EligibilitySubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilitySubmissionInclude<ExtArgs> | null
    /**
     * Filter, which EligibilitySubmission to fetch.
     */
    where?: EligibilitySubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilitySubmissions to fetch.
     */
    orderBy?: EligibilitySubmissionOrderByWithRelationInput | EligibilitySubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EligibilitySubmissions.
     */
    cursor?: EligibilitySubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilitySubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilitySubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EligibilitySubmissions.
     */
    distinct?: EligibilitySubmissionScalarFieldEnum | EligibilitySubmissionScalarFieldEnum[]
  }

  /**
   * EligibilitySubmission findFirstOrThrow
   */
  export type EligibilitySubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilitySubmissionInclude<ExtArgs> | null
    /**
     * Filter, which EligibilitySubmission to fetch.
     */
    where?: EligibilitySubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilitySubmissions to fetch.
     */
    orderBy?: EligibilitySubmissionOrderByWithRelationInput | EligibilitySubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EligibilitySubmissions.
     */
    cursor?: EligibilitySubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilitySubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilitySubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EligibilitySubmissions.
     */
    distinct?: EligibilitySubmissionScalarFieldEnum | EligibilitySubmissionScalarFieldEnum[]
  }

  /**
   * EligibilitySubmission findMany
   */
  export type EligibilitySubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilitySubmissionInclude<ExtArgs> | null
    /**
     * Filter, which EligibilitySubmissions to fetch.
     */
    where?: EligibilitySubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilitySubmissions to fetch.
     */
    orderBy?: EligibilitySubmissionOrderByWithRelationInput | EligibilitySubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EligibilitySubmissions.
     */
    cursor?: EligibilitySubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilitySubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilitySubmissions.
     */
    skip?: number
    distinct?: EligibilitySubmissionScalarFieldEnum | EligibilitySubmissionScalarFieldEnum[]
  }

  /**
   * EligibilitySubmission create
   */
  export type EligibilitySubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilitySubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a EligibilitySubmission.
     */
    data: XOR<EligibilitySubmissionCreateInput, EligibilitySubmissionUncheckedCreateInput>
  }

  /**
   * EligibilitySubmission createMany
   */
  export type EligibilitySubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EligibilitySubmissions.
     */
    data: EligibilitySubmissionCreateManyInput | EligibilitySubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EligibilitySubmission createManyAndReturn
   */
  export type EligibilitySubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many EligibilitySubmissions.
     */
    data: EligibilitySubmissionCreateManyInput | EligibilitySubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EligibilitySubmission update
   */
  export type EligibilitySubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilitySubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a EligibilitySubmission.
     */
    data: XOR<EligibilitySubmissionUpdateInput, EligibilitySubmissionUncheckedUpdateInput>
    /**
     * Choose, which EligibilitySubmission to update.
     */
    where: EligibilitySubmissionWhereUniqueInput
  }

  /**
   * EligibilitySubmission updateMany
   */
  export type EligibilitySubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EligibilitySubmissions.
     */
    data: XOR<EligibilitySubmissionUpdateManyMutationInput, EligibilitySubmissionUncheckedUpdateManyInput>
    /**
     * Filter which EligibilitySubmissions to update
     */
    where?: EligibilitySubmissionWhereInput
    /**
     * Limit how many EligibilitySubmissions to update.
     */
    limit?: number
  }

  /**
   * EligibilitySubmission updateManyAndReturn
   */
  export type EligibilitySubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * The data used to update EligibilitySubmissions.
     */
    data: XOR<EligibilitySubmissionUpdateManyMutationInput, EligibilitySubmissionUncheckedUpdateManyInput>
    /**
     * Filter which EligibilitySubmissions to update
     */
    where?: EligibilitySubmissionWhereInput
    /**
     * Limit how many EligibilitySubmissions to update.
     */
    limit?: number
  }

  /**
   * EligibilitySubmission upsert
   */
  export type EligibilitySubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilitySubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the EligibilitySubmission to update in case it exists.
     */
    where: EligibilitySubmissionWhereUniqueInput
    /**
     * In case the EligibilitySubmission found by the `where` argument doesn't exist, create a new EligibilitySubmission with this data.
     */
    create: XOR<EligibilitySubmissionCreateInput, EligibilitySubmissionUncheckedCreateInput>
    /**
     * In case the EligibilitySubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EligibilitySubmissionUpdateInput, EligibilitySubmissionUncheckedUpdateInput>
  }

  /**
   * EligibilitySubmission delete
   */
  export type EligibilitySubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilitySubmissionInclude<ExtArgs> | null
    /**
     * Filter which EligibilitySubmission to delete.
     */
    where: EligibilitySubmissionWhereUniqueInput
  }

  /**
   * EligibilitySubmission deleteMany
   */
  export type EligibilitySubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EligibilitySubmissions to delete
     */
    where?: EligibilitySubmissionWhereInput
    /**
     * Limit how many EligibilitySubmissions to delete.
     */
    limit?: number
  }

  /**
   * EligibilitySubmission.notes
   */
  export type EligibilitySubmission$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * EligibilitySubmission without action
   */
  export type EligibilitySubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilitySubmissionInclude<ExtArgs> | null
  }


  /**
   * Model Note
   */

  export type AggregateNote = {
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  export type NoteMinAggregateOutputType = {
    id: string | null
    content: string | null
    createdAt: Date | null
    responseId: string | null
    eligibilitySubmissionId: string | null
    noteType: $Enums.NoteType | null
  }

  export type NoteMaxAggregateOutputType = {
    id: string | null
    content: string | null
    createdAt: Date | null
    responseId: string | null
    eligibilitySubmissionId: string | null
    noteType: $Enums.NoteType | null
  }

  export type NoteCountAggregateOutputType = {
    id: number
    content: number
    createdAt: number
    responseId: number
    eligibilitySubmissionId: number
    noteType: number
    _all: number
  }


  export type NoteMinAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    responseId?: true
    eligibilitySubmissionId?: true
    noteType?: true
  }

  export type NoteMaxAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    responseId?: true
    eligibilitySubmissionId?: true
    noteType?: true
  }

  export type NoteCountAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    responseId?: true
    eligibilitySubmissionId?: true
    noteType?: true
    _all?: true
  }

  export type NoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Note to aggregate.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notes
    **/
    _count?: true | NoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoteMaxAggregateInputType
  }

  export type GetNoteAggregateType<T extends NoteAggregateArgs> = {
        [P in keyof T & keyof AggregateNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNote[P]>
      : GetScalarType<T[P], AggregateNote[P]>
  }




  export type NoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithAggregationInput | NoteOrderByWithAggregationInput[]
    by: NoteScalarFieldEnum[] | NoteScalarFieldEnum
    having?: NoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoteCountAggregateInputType | true
    _min?: NoteMinAggregateInputType
    _max?: NoteMaxAggregateInputType
  }

  export type NoteGroupByOutputType = {
    id: string
    content: string
    createdAt: Date
    responseId: string | null
    eligibilitySubmissionId: string | null
    noteType: $Enums.NoteType
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  type GetNoteGroupByPayload<T extends NoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoteGroupByOutputType[P]>
            : GetScalarType<T[P], NoteGroupByOutputType[P]>
        }
      >
    >


  export type NoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    responseId?: boolean
    eligibilitySubmissionId?: boolean
    noteType?: boolean
    response?: boolean | Note$responseArgs<ExtArgs>
    eligibilitySubmission?: boolean | Note$eligibilitySubmissionArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    responseId?: boolean
    eligibilitySubmissionId?: boolean
    noteType?: boolean
    response?: boolean | Note$responseArgs<ExtArgs>
    eligibilitySubmission?: boolean | Note$eligibilitySubmissionArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    responseId?: boolean
    eligibilitySubmissionId?: boolean
    noteType?: boolean
    response?: boolean | Note$responseArgs<ExtArgs>
    eligibilitySubmission?: boolean | Note$eligibilitySubmissionArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectScalar = {
    id?: boolean
    content?: boolean
    createdAt?: boolean
    responseId?: boolean
    eligibilitySubmissionId?: boolean
    noteType?: boolean
  }

  export type NoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "createdAt" | "responseId" | "eligibilitySubmissionId" | "noteType", ExtArgs["result"]["note"]>
  export type NoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    response?: boolean | Note$responseArgs<ExtArgs>
    eligibilitySubmission?: boolean | Note$eligibilitySubmissionArgs<ExtArgs>
  }
  export type NoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    response?: boolean | Note$responseArgs<ExtArgs>
    eligibilitySubmission?: boolean | Note$eligibilitySubmissionArgs<ExtArgs>
  }
  export type NoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    response?: boolean | Note$responseArgs<ExtArgs>
    eligibilitySubmission?: boolean | Note$eligibilitySubmissionArgs<ExtArgs>
  }

  export type $NotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Note"
    objects: {
      response: Prisma.$ResponsePayload<ExtArgs> | null
      eligibilitySubmission: Prisma.$EligibilitySubmissionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      createdAt: Date
      responseId: string | null
      eligibilitySubmissionId: string | null
      noteType: $Enums.NoteType
    }, ExtArgs["result"]["note"]>
    composites: {}
  }

  type NoteGetPayload<S extends boolean | null | undefined | NoteDefaultArgs> = $Result.GetResult<Prisma.$NotePayload, S>

  type NoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NoteCountAggregateInputType | true
    }

  export interface NoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Note'], meta: { name: 'Note' } }
    /**
     * Find zero or one Note that matches the filter.
     * @param {NoteFindUniqueArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoteFindUniqueArgs>(args: SelectSubset<T, NoteFindUniqueArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Note that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NoteFindUniqueOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoteFindUniqueOrThrowArgs>(args: SelectSubset<T, NoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Note that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoteFindFirstArgs>(args?: SelectSubset<T, NoteFindFirstArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Note that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoteFindFirstOrThrowArgs>(args?: SelectSubset<T, NoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notes
     * const notes = await prisma.note.findMany()
     * 
     * // Get first 10 Notes
     * const notes = await prisma.note.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noteWithIdOnly = await prisma.note.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoteFindManyArgs>(args?: SelectSubset<T, NoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Note.
     * @param {NoteCreateArgs} args - Arguments to create a Note.
     * @example
     * // Create one Note
     * const Note = await prisma.note.create({
     *   data: {
     *     // ... data to create a Note
     *   }
     * })
     * 
     */
    create<T extends NoteCreateArgs>(args: SelectSubset<T, NoteCreateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notes.
     * @param {NoteCreateManyArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoteCreateManyArgs>(args?: SelectSubset<T, NoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notes and returns the data saved in the database.
     * @param {NoteCreateManyAndReturnArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NoteCreateManyAndReturnArgs>(args?: SelectSubset<T, NoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Note.
     * @param {NoteDeleteArgs} args - Arguments to delete one Note.
     * @example
     * // Delete one Note
     * const Note = await prisma.note.delete({
     *   where: {
     *     // ... filter to delete one Note
     *   }
     * })
     * 
     */
    delete<T extends NoteDeleteArgs>(args: SelectSubset<T, NoteDeleteArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Note.
     * @param {NoteUpdateArgs} args - Arguments to update one Note.
     * @example
     * // Update one Note
     * const note = await prisma.note.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoteUpdateArgs>(args: SelectSubset<T, NoteUpdateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notes.
     * @param {NoteDeleteManyArgs} args - Arguments to filter Notes to delete.
     * @example
     * // Delete a few Notes
     * const { count } = await prisma.note.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoteDeleteManyArgs>(args?: SelectSubset<T, NoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoteUpdateManyArgs>(args: SelectSubset<T, NoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes and returns the data updated in the database.
     * @param {NoteUpdateManyAndReturnArgs} args - Arguments to update many Notes.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NoteUpdateManyAndReturnArgs>(args: SelectSubset<T, NoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Note.
     * @param {NoteUpsertArgs} args - Arguments to update or create a Note.
     * @example
     * // Update or create a Note
     * const note = await prisma.note.upsert({
     *   create: {
     *     // ... data to create a Note
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Note we want to update
     *   }
     * })
     */
    upsert<T extends NoteUpsertArgs>(args: SelectSubset<T, NoteUpsertArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteCountArgs} args - Arguments to filter Notes to count.
     * @example
     * // Count the number of Notes
     * const count = await prisma.note.count({
     *   where: {
     *     // ... the filter for the Notes we want to count
     *   }
     * })
    **/
    count<T extends NoteCountArgs>(
      args?: Subset<T, NoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NoteAggregateArgs>(args: Subset<T, NoteAggregateArgs>): Prisma.PrismaPromise<GetNoteAggregateType<T>>

    /**
     * Group by Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoteGroupByArgs['orderBy'] }
        : { orderBy?: NoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Note model
   */
  readonly fields: NoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Note.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    response<T extends Note$responseArgs<ExtArgs> = {}>(args?: Subset<T, Note$responseArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    eligibilitySubmission<T extends Note$eligibilitySubmissionArgs<ExtArgs> = {}>(args?: Subset<T, Note$eligibilitySubmissionArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Note model
   */
  interface NoteFieldRefs {
    readonly id: FieldRef<"Note", 'String'>
    readonly content: FieldRef<"Note", 'String'>
    readonly createdAt: FieldRef<"Note", 'DateTime'>
    readonly responseId: FieldRef<"Note", 'String'>
    readonly eligibilitySubmissionId: FieldRef<"Note", 'String'>
    readonly noteType: FieldRef<"Note", 'NoteType'>
  }
    

  // Custom InputTypes
  /**
   * Note findUnique
   */
  export type NoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findUniqueOrThrow
   */
  export type NoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findFirst
   */
  export type NoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findFirstOrThrow
   */
  export type NoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findMany
   */
  export type NoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Notes to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note create
   */
  export type NoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Note.
     */
    data: XOR<NoteCreateInput, NoteUncheckedCreateInput>
  }

  /**
   * Note createMany
   */
  export type NoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Note createManyAndReturn
   */
  export type NoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note update
   */
  export type NoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Note.
     */
    data: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
    /**
     * Choose, which Note to update.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note updateMany
   */
  export type NoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to update.
     */
    limit?: number
  }

  /**
   * Note updateManyAndReturn
   */
  export type NoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note upsert
   */
  export type NoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Note to update in case it exists.
     */
    where: NoteWhereUniqueInput
    /**
     * In case the Note found by the `where` argument doesn't exist, create a new Note with this data.
     */
    create: XOR<NoteCreateInput, NoteUncheckedCreateInput>
    /**
     * In case the Note was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
  }

  /**
   * Note delete
   */
  export type NoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter which Note to delete.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note deleteMany
   */
  export type NoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notes to delete
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to delete.
     */
    limit?: number
  }

  /**
   * Note.response
   */
  export type Note$responseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    where?: ResponseWhereInput
  }

  /**
   * Note.eligibilitySubmission
   */
  export type Note$eligibilitySubmissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilitySubmission
     */
    omit?: EligibilitySubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilitySubmissionInclude<ExtArgs> | null
    where?: EligibilitySubmissionWhereInput
  }

  /**
   * Note without action
   */
  export type NoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    createdAt: Date | null
    type: $Enums.NotificationType | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    createdAt: Date | null
    type: $Enums.NotificationType | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    title: number
    description: number
    createdAt: number
    type: number
    recipients: number
    readBy: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdAt?: true
    type?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdAt?: true
    type?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdAt?: true
    type?: true
    recipients?: true
    readBy?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    title: string
    description: string
    createdAt: Date
    type: $Enums.NotificationType
    recipients: string[]
    readBy: string[]
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    type?: boolean
    recipients?: boolean
    readBy?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    type?: boolean
    recipients?: boolean
    readBy?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    type?: boolean
    recipients?: boolean
    readBy?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    type?: boolean
    recipients?: boolean
    readBy?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "createdAt" | "type" | "recipients" | "readBy", ExtArgs["result"]["notification"]>

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      createdAt: Date
      type: $Enums.NotificationType
      recipients: string[]
      readBy: string[]
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly description: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly recipients: FieldRef<"Notification", 'String[]'>
    readonly readBy: FieldRef<"Notification", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    courseFee: number | null
    payment: number | null
    collegePayment: number | null
    agentCommission: number | null
    bankCommission: number | null
    netProfit: number | null
  }

  export type PaymentSumAggregateOutputType = {
    courseFee: number | null
    payment: number | null
    collegePayment: number | null
    agentCommission: number | null
    bankCommission: number | null
    netProfit: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    name: string | null
    qualification: string | null
    phoneNumber: string | null
    email: string | null
    source: string | null
    collegeName: string | null
    courseFee: number | null
    paymentStatus: string | null
    payment: number | null
    collegePayment: number | null
    agentCommission: number | null
    bankCommission: number | null
    netProfit: number | null
    enrollmentDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    additionalNote: string | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    qualification: string | null
    phoneNumber: string | null
    email: string | null
    source: string | null
    collegeName: string | null
    courseFee: number | null
    paymentStatus: string | null
    payment: number | null
    collegePayment: number | null
    agentCommission: number | null
    bankCommission: number | null
    netProfit: number | null
    enrollmentDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    additionalNote: string | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    name: number
    qualification: number
    phoneNumber: number
    email: number
    source: number
    collegeName: number
    courseFee: number
    paymentStatus: number
    payment: number
    collegePayment: number
    agentCommission: number
    bankCommission: number
    netProfit: number
    enrollmentDate: number
    createdAt: number
    updatedAt: number
    additionalNote: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    courseFee?: true
    payment?: true
    collegePayment?: true
    agentCommission?: true
    bankCommission?: true
    netProfit?: true
  }

  export type PaymentSumAggregateInputType = {
    courseFee?: true
    payment?: true
    collegePayment?: true
    agentCommission?: true
    bankCommission?: true
    netProfit?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    name?: true
    qualification?: true
    phoneNumber?: true
    email?: true
    source?: true
    collegeName?: true
    courseFee?: true
    paymentStatus?: true
    payment?: true
    collegePayment?: true
    agentCommission?: true
    bankCommission?: true
    netProfit?: true
    enrollmentDate?: true
    createdAt?: true
    updatedAt?: true
    additionalNote?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    name?: true
    qualification?: true
    phoneNumber?: true
    email?: true
    source?: true
    collegeName?: true
    courseFee?: true
    paymentStatus?: true
    payment?: true
    collegePayment?: true
    agentCommission?: true
    bankCommission?: true
    netProfit?: true
    enrollmentDate?: true
    createdAt?: true
    updatedAt?: true
    additionalNote?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    name?: true
    qualification?: true
    phoneNumber?: true
    email?: true
    source?: true
    collegeName?: true
    courseFee?: true
    paymentStatus?: true
    payment?: true
    collegePayment?: true
    agentCommission?: true
    bankCommission?: true
    netProfit?: true
    enrollmentDate?: true
    createdAt?: true
    updatedAt?: true
    additionalNote?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    name: string
    qualification: string
    phoneNumber: string
    email: string
    source: string
    collegeName: string
    courseFee: number
    paymentStatus: string
    payment: number
    collegePayment: number
    agentCommission: number
    bankCommission: number
    netProfit: number
    enrollmentDate: Date
    createdAt: Date
    updatedAt: Date
    additionalNote: string | null
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    qualification?: boolean
    phoneNumber?: boolean
    email?: boolean
    source?: boolean
    collegeName?: boolean
    courseFee?: boolean
    paymentStatus?: boolean
    payment?: boolean
    collegePayment?: boolean
    agentCommission?: boolean
    bankCommission?: boolean
    netProfit?: boolean
    enrollmentDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    additionalNote?: boolean
    parts?: boolean | Payment$partsArgs<ExtArgs>
    _count?: boolean | PaymentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    qualification?: boolean
    phoneNumber?: boolean
    email?: boolean
    source?: boolean
    collegeName?: boolean
    courseFee?: boolean
    paymentStatus?: boolean
    payment?: boolean
    collegePayment?: boolean
    agentCommission?: boolean
    bankCommission?: boolean
    netProfit?: boolean
    enrollmentDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    additionalNote?: boolean
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    qualification?: boolean
    phoneNumber?: boolean
    email?: boolean
    source?: boolean
    collegeName?: boolean
    courseFee?: boolean
    paymentStatus?: boolean
    payment?: boolean
    collegePayment?: boolean
    agentCommission?: boolean
    bankCommission?: boolean
    netProfit?: boolean
    enrollmentDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    additionalNote?: boolean
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    name?: boolean
    qualification?: boolean
    phoneNumber?: boolean
    email?: boolean
    source?: boolean
    collegeName?: boolean
    courseFee?: boolean
    paymentStatus?: boolean
    payment?: boolean
    collegePayment?: boolean
    agentCommission?: boolean
    bankCommission?: boolean
    netProfit?: boolean
    enrollmentDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    additionalNote?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "qualification" | "phoneNumber" | "email" | "source" | "collegeName" | "courseFee" | "paymentStatus" | "payment" | "collegePayment" | "agentCommission" | "bankCommission" | "netProfit" | "enrollmentDate" | "createdAt" | "updatedAt" | "additionalNote", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parts?: boolean | Payment$partsArgs<ExtArgs>
    _count?: boolean | PaymentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      parts: Prisma.$PaymentPartPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      qualification: string
      phoneNumber: string
      email: string
      source: string
      collegeName: string
      courseFee: number
      paymentStatus: string
      payment: number
      collegePayment: number
      agentCommission: number
      bankCommission: number
      netProfit: number
      enrollmentDate: Date
      createdAt: Date
      updatedAt: Date
      additionalNote: string | null
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parts<T extends Payment$partsArgs<ExtArgs> = {}>(args?: Subset<T, Payment$partsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly name: FieldRef<"Payment", 'String'>
    readonly qualification: FieldRef<"Payment", 'String'>
    readonly phoneNumber: FieldRef<"Payment", 'String'>
    readonly email: FieldRef<"Payment", 'String'>
    readonly source: FieldRef<"Payment", 'String'>
    readonly collegeName: FieldRef<"Payment", 'String'>
    readonly courseFee: FieldRef<"Payment", 'Float'>
    readonly paymentStatus: FieldRef<"Payment", 'String'>
    readonly payment: FieldRef<"Payment", 'Float'>
    readonly collegePayment: FieldRef<"Payment", 'Float'>
    readonly agentCommission: FieldRef<"Payment", 'Float'>
    readonly bankCommission: FieldRef<"Payment", 'Float'>
    readonly netProfit: FieldRef<"Payment", 'Float'>
    readonly enrollmentDate: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
    readonly additionalNote: FieldRef<"Payment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment.parts
   */
  export type Payment$partsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartInclude<ExtArgs> | null
    where?: PaymentPartWhereInput
    orderBy?: PaymentPartOrderByWithRelationInput | PaymentPartOrderByWithRelationInput[]
    cursor?: PaymentPartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentPartScalarFieldEnum | PaymentPartScalarFieldEnum[]
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model PaymentPart
   */

  export type AggregatePaymentPart = {
    _count: PaymentPartCountAggregateOutputType | null
    _avg: PaymentPartAvgAggregateOutputType | null
    _sum: PaymentPartSumAggregateOutputType | null
    _min: PaymentPartMinAggregateOutputType | null
    _max: PaymentPartMaxAggregateOutputType | null
  }

  export type PaymentPartAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentPartSumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentPartMinAggregateOutputType = {
    id: string | null
    amount: number | null
    paidAt: Date | null
    paymentId: string | null
  }

  export type PaymentPartMaxAggregateOutputType = {
    id: string | null
    amount: number | null
    paidAt: Date | null
    paymentId: string | null
  }

  export type PaymentPartCountAggregateOutputType = {
    id: number
    amount: number
    paidAt: number
    paymentId: number
    _all: number
  }


  export type PaymentPartAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentPartSumAggregateInputType = {
    amount?: true
  }

  export type PaymentPartMinAggregateInputType = {
    id?: true
    amount?: true
    paidAt?: true
    paymentId?: true
  }

  export type PaymentPartMaxAggregateInputType = {
    id?: true
    amount?: true
    paidAt?: true
    paymentId?: true
  }

  export type PaymentPartCountAggregateInputType = {
    id?: true
    amount?: true
    paidAt?: true
    paymentId?: true
    _all?: true
  }

  export type PaymentPartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentPart to aggregate.
     */
    where?: PaymentPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentParts to fetch.
     */
    orderBy?: PaymentPartOrderByWithRelationInput | PaymentPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentParts
    **/
    _count?: true | PaymentPartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentPartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentPartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentPartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentPartMaxAggregateInputType
  }

  export type GetPaymentPartAggregateType<T extends PaymentPartAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentPart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentPart[P]>
      : GetScalarType<T[P], AggregatePaymentPart[P]>
  }




  export type PaymentPartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentPartWhereInput
    orderBy?: PaymentPartOrderByWithAggregationInput | PaymentPartOrderByWithAggregationInput[]
    by: PaymentPartScalarFieldEnum[] | PaymentPartScalarFieldEnum
    having?: PaymentPartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentPartCountAggregateInputType | true
    _avg?: PaymentPartAvgAggregateInputType
    _sum?: PaymentPartSumAggregateInputType
    _min?: PaymentPartMinAggregateInputType
    _max?: PaymentPartMaxAggregateInputType
  }

  export type PaymentPartGroupByOutputType = {
    id: string
    amount: number
    paidAt: Date
    paymentId: string
    _count: PaymentPartCountAggregateOutputType | null
    _avg: PaymentPartAvgAggregateOutputType | null
    _sum: PaymentPartSumAggregateOutputType | null
    _min: PaymentPartMinAggregateOutputType | null
    _max: PaymentPartMaxAggregateOutputType | null
  }

  type GetPaymentPartGroupByPayload<T extends PaymentPartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentPartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentPartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentPartGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentPartGroupByOutputType[P]>
        }
      >
    >


  export type PaymentPartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    paidAt?: boolean
    paymentId?: boolean
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentPart"]>

  export type PaymentPartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    paidAt?: boolean
    paymentId?: boolean
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentPart"]>

  export type PaymentPartSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    paidAt?: boolean
    paymentId?: boolean
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentPart"]>

  export type PaymentPartSelectScalar = {
    id?: boolean
    amount?: boolean
    paidAt?: boolean
    paymentId?: boolean
  }

  export type PaymentPartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "paidAt" | "paymentId", ExtArgs["result"]["paymentPart"]>
  export type PaymentPartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }
  export type PaymentPartIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }
  export type PaymentPartIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }

  export type $PaymentPartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentPart"
    objects: {
      payment: Prisma.$PaymentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: number
      paidAt: Date
      paymentId: string
    }, ExtArgs["result"]["paymentPart"]>
    composites: {}
  }

  type PaymentPartGetPayload<S extends boolean | null | undefined | PaymentPartDefaultArgs> = $Result.GetResult<Prisma.$PaymentPartPayload, S>

  type PaymentPartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentPartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentPartCountAggregateInputType | true
    }

  export interface PaymentPartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentPart'], meta: { name: 'PaymentPart' } }
    /**
     * Find zero or one PaymentPart that matches the filter.
     * @param {PaymentPartFindUniqueArgs} args - Arguments to find a PaymentPart
     * @example
     * // Get one PaymentPart
     * const paymentPart = await prisma.paymentPart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentPartFindUniqueArgs>(args: SelectSubset<T, PaymentPartFindUniqueArgs<ExtArgs>>): Prisma__PaymentPartClient<$Result.GetResult<Prisma.$PaymentPartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentPart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentPartFindUniqueOrThrowArgs} args - Arguments to find a PaymentPart
     * @example
     * // Get one PaymentPart
     * const paymentPart = await prisma.paymentPart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentPartFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentPartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentPartClient<$Result.GetResult<Prisma.$PaymentPartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentPart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentPartFindFirstArgs} args - Arguments to find a PaymentPart
     * @example
     * // Get one PaymentPart
     * const paymentPart = await prisma.paymentPart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentPartFindFirstArgs>(args?: SelectSubset<T, PaymentPartFindFirstArgs<ExtArgs>>): Prisma__PaymentPartClient<$Result.GetResult<Prisma.$PaymentPartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentPart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentPartFindFirstOrThrowArgs} args - Arguments to find a PaymentPart
     * @example
     * // Get one PaymentPart
     * const paymentPart = await prisma.paymentPart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentPartFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentPartFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentPartClient<$Result.GetResult<Prisma.$PaymentPartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentParts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentPartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentParts
     * const paymentParts = await prisma.paymentPart.findMany()
     * 
     * // Get first 10 PaymentParts
     * const paymentParts = await prisma.paymentPart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentPartWithIdOnly = await prisma.paymentPart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentPartFindManyArgs>(args?: SelectSubset<T, PaymentPartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentPart.
     * @param {PaymentPartCreateArgs} args - Arguments to create a PaymentPart.
     * @example
     * // Create one PaymentPart
     * const PaymentPart = await prisma.paymentPart.create({
     *   data: {
     *     // ... data to create a PaymentPart
     *   }
     * })
     * 
     */
    create<T extends PaymentPartCreateArgs>(args: SelectSubset<T, PaymentPartCreateArgs<ExtArgs>>): Prisma__PaymentPartClient<$Result.GetResult<Prisma.$PaymentPartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentParts.
     * @param {PaymentPartCreateManyArgs} args - Arguments to create many PaymentParts.
     * @example
     * // Create many PaymentParts
     * const paymentPart = await prisma.paymentPart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentPartCreateManyArgs>(args?: SelectSubset<T, PaymentPartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentParts and returns the data saved in the database.
     * @param {PaymentPartCreateManyAndReturnArgs} args - Arguments to create many PaymentParts.
     * @example
     * // Create many PaymentParts
     * const paymentPart = await prisma.paymentPart.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentParts and only return the `id`
     * const paymentPartWithIdOnly = await prisma.paymentPart.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentPartCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentPartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentPart.
     * @param {PaymentPartDeleteArgs} args - Arguments to delete one PaymentPart.
     * @example
     * // Delete one PaymentPart
     * const PaymentPart = await prisma.paymentPart.delete({
     *   where: {
     *     // ... filter to delete one PaymentPart
     *   }
     * })
     * 
     */
    delete<T extends PaymentPartDeleteArgs>(args: SelectSubset<T, PaymentPartDeleteArgs<ExtArgs>>): Prisma__PaymentPartClient<$Result.GetResult<Prisma.$PaymentPartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentPart.
     * @param {PaymentPartUpdateArgs} args - Arguments to update one PaymentPart.
     * @example
     * // Update one PaymentPart
     * const paymentPart = await prisma.paymentPart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentPartUpdateArgs>(args: SelectSubset<T, PaymentPartUpdateArgs<ExtArgs>>): Prisma__PaymentPartClient<$Result.GetResult<Prisma.$PaymentPartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentParts.
     * @param {PaymentPartDeleteManyArgs} args - Arguments to filter PaymentParts to delete.
     * @example
     * // Delete a few PaymentParts
     * const { count } = await prisma.paymentPart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentPartDeleteManyArgs>(args?: SelectSubset<T, PaymentPartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentPartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentParts
     * const paymentPart = await prisma.paymentPart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentPartUpdateManyArgs>(args: SelectSubset<T, PaymentPartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentParts and returns the data updated in the database.
     * @param {PaymentPartUpdateManyAndReturnArgs} args - Arguments to update many PaymentParts.
     * @example
     * // Update many PaymentParts
     * const paymentPart = await prisma.paymentPart.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentParts and only return the `id`
     * const paymentPartWithIdOnly = await prisma.paymentPart.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentPartUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentPartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentPart.
     * @param {PaymentPartUpsertArgs} args - Arguments to update or create a PaymentPart.
     * @example
     * // Update or create a PaymentPart
     * const paymentPart = await prisma.paymentPart.upsert({
     *   create: {
     *     // ... data to create a PaymentPart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentPart we want to update
     *   }
     * })
     */
    upsert<T extends PaymentPartUpsertArgs>(args: SelectSubset<T, PaymentPartUpsertArgs<ExtArgs>>): Prisma__PaymentPartClient<$Result.GetResult<Prisma.$PaymentPartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentPartCountArgs} args - Arguments to filter PaymentParts to count.
     * @example
     * // Count the number of PaymentParts
     * const count = await prisma.paymentPart.count({
     *   where: {
     *     // ... the filter for the PaymentParts we want to count
     *   }
     * })
    **/
    count<T extends PaymentPartCountArgs>(
      args?: Subset<T, PaymentPartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentPartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentPartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentPartAggregateArgs>(args: Subset<T, PaymentPartAggregateArgs>): Prisma.PrismaPromise<GetPaymentPartAggregateType<T>>

    /**
     * Group by PaymentPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentPartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentPartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentPartGroupByArgs['orderBy'] }
        : { orderBy?: PaymentPartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentPartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentPart model
   */
  readonly fields: PaymentPartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentPart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentPartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payment<T extends PaymentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaymentDefaultArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentPart model
   */
  interface PaymentPartFieldRefs {
    readonly id: FieldRef<"PaymentPart", 'String'>
    readonly amount: FieldRef<"PaymentPart", 'Float'>
    readonly paidAt: FieldRef<"PaymentPart", 'DateTime'>
    readonly paymentId: FieldRef<"PaymentPart", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PaymentPart findUnique
   */
  export type PaymentPartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartInclude<ExtArgs> | null
    /**
     * Filter, which PaymentPart to fetch.
     */
    where: PaymentPartWhereUniqueInput
  }

  /**
   * PaymentPart findUniqueOrThrow
   */
  export type PaymentPartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartInclude<ExtArgs> | null
    /**
     * Filter, which PaymentPart to fetch.
     */
    where: PaymentPartWhereUniqueInput
  }

  /**
   * PaymentPart findFirst
   */
  export type PaymentPartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartInclude<ExtArgs> | null
    /**
     * Filter, which PaymentPart to fetch.
     */
    where?: PaymentPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentParts to fetch.
     */
    orderBy?: PaymentPartOrderByWithRelationInput | PaymentPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentParts.
     */
    cursor?: PaymentPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentParts.
     */
    distinct?: PaymentPartScalarFieldEnum | PaymentPartScalarFieldEnum[]
  }

  /**
   * PaymentPart findFirstOrThrow
   */
  export type PaymentPartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartInclude<ExtArgs> | null
    /**
     * Filter, which PaymentPart to fetch.
     */
    where?: PaymentPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentParts to fetch.
     */
    orderBy?: PaymentPartOrderByWithRelationInput | PaymentPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentParts.
     */
    cursor?: PaymentPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentParts.
     */
    distinct?: PaymentPartScalarFieldEnum | PaymentPartScalarFieldEnum[]
  }

  /**
   * PaymentPart findMany
   */
  export type PaymentPartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartInclude<ExtArgs> | null
    /**
     * Filter, which PaymentParts to fetch.
     */
    where?: PaymentPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentParts to fetch.
     */
    orderBy?: PaymentPartOrderByWithRelationInput | PaymentPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentParts.
     */
    cursor?: PaymentPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentParts.
     */
    skip?: number
    distinct?: PaymentPartScalarFieldEnum | PaymentPartScalarFieldEnum[]
  }

  /**
   * PaymentPart create
   */
  export type PaymentPartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentPart.
     */
    data: XOR<PaymentPartCreateInput, PaymentPartUncheckedCreateInput>
  }

  /**
   * PaymentPart createMany
   */
  export type PaymentPartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentParts.
     */
    data: PaymentPartCreateManyInput | PaymentPartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentPart createManyAndReturn
   */
  export type PaymentPartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentParts.
     */
    data: PaymentPartCreateManyInput | PaymentPartCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentPart update
   */
  export type PaymentPartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentPart.
     */
    data: XOR<PaymentPartUpdateInput, PaymentPartUncheckedUpdateInput>
    /**
     * Choose, which PaymentPart to update.
     */
    where: PaymentPartWhereUniqueInput
  }

  /**
   * PaymentPart updateMany
   */
  export type PaymentPartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentParts.
     */
    data: XOR<PaymentPartUpdateManyMutationInput, PaymentPartUncheckedUpdateManyInput>
    /**
     * Filter which PaymentParts to update
     */
    where?: PaymentPartWhereInput
    /**
     * Limit how many PaymentParts to update.
     */
    limit?: number
  }

  /**
   * PaymentPart updateManyAndReturn
   */
  export type PaymentPartUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * The data used to update PaymentParts.
     */
    data: XOR<PaymentPartUpdateManyMutationInput, PaymentPartUncheckedUpdateManyInput>
    /**
     * Filter which PaymentParts to update
     */
    where?: PaymentPartWhereInput
    /**
     * Limit how many PaymentParts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentPart upsert
   */
  export type PaymentPartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentPart to update in case it exists.
     */
    where: PaymentPartWhereUniqueInput
    /**
     * In case the PaymentPart found by the `where` argument doesn't exist, create a new PaymentPart with this data.
     */
    create: XOR<PaymentPartCreateInput, PaymentPartUncheckedCreateInput>
    /**
     * In case the PaymentPart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentPartUpdateInput, PaymentPartUncheckedUpdateInput>
  }

  /**
   * PaymentPart delete
   */
  export type PaymentPartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartInclude<ExtArgs> | null
    /**
     * Filter which PaymentPart to delete.
     */
    where: PaymentPartWhereUniqueInput
  }

  /**
   * PaymentPart deleteMany
   */
  export type PaymentPartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentParts to delete
     */
    where?: PaymentPartWhereInput
    /**
     * Limit how many PaymentParts to delete.
     */
    limit?: number
  }

  /**
   * PaymentPart without action
   */
  export type PaymentPartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentPart
     */
    select?: PaymentPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentPart
     */
    omit?: PaymentPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentPartInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    banned: 'banned',
    banReason: 'banReason',
    banExpires: 'banExpires'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    accountId: 'accountId',
    providerId: 'providerId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    idToken: 'idToken',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    impersonatedBy: 'impersonatedBy'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const SectionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    metaDescription: 'metaDescription',
    index: 'index',
    imageSquareLink: 'imageSquareLink',
    imageSquarePublicId: 'imageSquarePublicId',
    imageCoverLink: 'imageCoverLink',
    imageCoverPublicId: 'imageCoverPublicId',
    link: 'link',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SectionScalarFieldEnum = (typeof SectionScalarFieldEnum)[keyof typeof SectionScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    title: 'title',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    index: 'index',
    imageSquareLink: 'imageSquareLink',
    imageSquarePublicId: 'imageSquarePublicId',
    imageCoverLink: 'imageCoverLink',
    imageCoverPublicId: 'imageCoverPublicId',
    description: 'description',
    jobOpportunity: 'jobOpportunity',
    entryRequirement: 'entryRequirement',
    packagingRule: 'packagingRule',
    coreUnits: 'coreUnits',
    electiveUnits: 'electiveUnits',
    link: 'link',
    sectionId: 'sectionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const UserReviewScalarFieldEnum: {
    id: 'id',
    purchasedCourseId: 'purchasedCourseId',
    userName: 'userName',
    userImage: 'userImage',
    reviewImage: 'reviewImage',
    reviewText: 'reviewText',
    givenStar: 'givenStar',
    approved: 'approved',
    reviewDate: 'reviewDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserReviewScalarFieldEnum = (typeof UserReviewScalarFieldEnum)[keyof typeof UserReviewScalarFieldEnum]


  export const ResponseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    email: 'email',
    message: 'message',
    interest: 'interest',
    createdAt: 'createdAt',
    stage: 'stage'
  };

  export type ResponseScalarFieldEnum = (typeof ResponseScalarFieldEnum)[keyof typeof ResponseScalarFieldEnum]


  export const EligibilitySubmissionScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    phoneNumber: 'phoneNumber',
    industry: 'industry',
    qualification: 'qualification',
    yearsOfExperience: 'yearsOfExperience',
    stateLivedIn: 'stateLivedIn',
    message: 'message',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EligibilitySubmissionScalarFieldEnum = (typeof EligibilitySubmissionScalarFieldEnum)[keyof typeof EligibilitySubmissionScalarFieldEnum]


  export const NoteScalarFieldEnum: {
    id: 'id',
    content: 'content',
    createdAt: 'createdAt',
    responseId: 'responseId',
    eligibilitySubmissionId: 'eligibilitySubmissionId',
    noteType: 'noteType'
  };

  export type NoteScalarFieldEnum = (typeof NoteScalarFieldEnum)[keyof typeof NoteScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    createdAt: 'createdAt',
    type: 'type',
    recipients: 'recipients',
    readBy: 'readBy'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    qualification: 'qualification',
    phoneNumber: 'phoneNumber',
    email: 'email',
    source: 'source',
    collegeName: 'collegeName',
    courseFee: 'courseFee',
    paymentStatus: 'paymentStatus',
    payment: 'payment',
    collegePayment: 'collegePayment',
    agentCommission: 'agentCommission',
    bankCommission: 'bankCommission',
    netProfit: 'netProfit',
    enrollmentDate: 'enrollmentDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    additionalNote: 'additionalNote'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const PaymentPartScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    paidAt: 'paidAt',
    paymentId: 'paymentId'
  };

  export type PaymentPartScalarFieldEnum = (typeof PaymentPartScalarFieldEnum)[keyof typeof PaymentPartScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ResponseStage'
   */
  export type EnumResponseStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResponseStage'>
    


  /**
   * Reference to a field of type 'ResponseStage[]'
   */
  export type ListEnumResponseStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResponseStage[]'>
    


  /**
   * Reference to a field of type 'NoteType'
   */
  export type EnumNoteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NoteType'>
    


  /**
   * Reference to a field of type 'NoteType[]'
   */
  export type ListEnumNoteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NoteType[]'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    banned?: BoolNullableFilter<"User"> | boolean | null
    banReason?: StringNullableFilter<"User"> | string | null
    banExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    impersonatedUsers?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    banned?: SortOrderInput | SortOrder
    banReason?: SortOrderInput | SortOrder
    banExpires?: SortOrderInput | SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    impersonatedUsers?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    banned?: BoolNullableFilter<"User"> | boolean | null
    banReason?: StringNullableFilter<"User"> | string | null
    banExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    impersonatedUsers?: SessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    banned?: SortOrderInput | SortOrder
    banReason?: SortOrderInput | SortOrder
    banExpires?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    banned?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    banReason?: StringNullableWithAggregatesFilter<"User"> | string | null
    banExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    providerId_accountId?: AccountProviderIdAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "providerId_accountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    impersonatedBy?: StringNullableFilter<"Session"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    impersonator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    impersonatedBy?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    impersonator?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    impersonatedBy?: StringNullableFilter<"Session"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    impersonator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    impersonatedBy?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    token?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    impersonatedBy?: StringNullableWithAggregatesFilter<"Session"> | string | null
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type SectionWhereInput = {
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    id?: StringFilter<"Section"> | string
    title?: StringFilter<"Section"> | string
    metaDescription?: StringFilter<"Section"> | string
    index?: IntFilter<"Section"> | number
    imageSquareLink?: StringFilter<"Section"> | string
    imageSquarePublicId?: StringFilter<"Section"> | string
    imageCoverLink?: StringFilter<"Section"> | string
    imageCoverPublicId?: StringFilter<"Section"> | string
    link?: StringFilter<"Section"> | string
    createdAt?: DateTimeFilter<"Section"> | Date | string
    updatedAt?: DateTimeFilter<"Section"> | Date | string
    courses?: CourseListRelationFilter
  }

  export type SectionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    metaDescription?: SortOrder
    index?: SortOrder
    imageSquareLink?: SortOrder
    imageSquarePublicId?: SortOrder
    imageCoverLink?: SortOrder
    imageCoverPublicId?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    courses?: CourseOrderByRelationAggregateInput
  }

  export type SectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    link?: string
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    title?: StringFilter<"Section"> | string
    metaDescription?: StringFilter<"Section"> | string
    index?: IntFilter<"Section"> | number
    imageSquareLink?: StringFilter<"Section"> | string
    imageSquarePublicId?: StringFilter<"Section"> | string
    imageCoverLink?: StringFilter<"Section"> | string
    imageCoverPublicId?: StringFilter<"Section"> | string
    createdAt?: DateTimeFilter<"Section"> | Date | string
    updatedAt?: DateTimeFilter<"Section"> | Date | string
    courses?: CourseListRelationFilter
  }, "id" | "link">

  export type SectionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    metaDescription?: SortOrder
    index?: SortOrder
    imageSquareLink?: SortOrder
    imageSquarePublicId?: SortOrder
    imageCoverLink?: SortOrder
    imageCoverPublicId?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SectionCountOrderByAggregateInput
    _avg?: SectionAvgOrderByAggregateInput
    _max?: SectionMaxOrderByAggregateInput
    _min?: SectionMinOrderByAggregateInput
    _sum?: SectionSumOrderByAggregateInput
  }

  export type SectionScalarWhereWithAggregatesInput = {
    AND?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    OR?: SectionScalarWhereWithAggregatesInput[]
    NOT?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Section"> | string
    title?: StringWithAggregatesFilter<"Section"> | string
    metaDescription?: StringWithAggregatesFilter<"Section"> | string
    index?: IntWithAggregatesFilter<"Section"> | number
    imageSquareLink?: StringWithAggregatesFilter<"Section"> | string
    imageSquarePublicId?: StringWithAggregatesFilter<"Section"> | string
    imageCoverLink?: StringWithAggregatesFilter<"Section"> | string
    imageCoverPublicId?: StringWithAggregatesFilter<"Section"> | string
    link?: StringWithAggregatesFilter<"Section"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Section"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Section"> | Date | string
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    metaTitle?: StringFilter<"Course"> | string
    metaDescription?: StringFilter<"Course"> | string
    index?: IntFilter<"Course"> | number
    imageSquareLink?: StringFilter<"Course"> | string
    imageSquarePublicId?: StringFilter<"Course"> | string
    imageCoverLink?: StringFilter<"Course"> | string
    imageCoverPublicId?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    jobOpportunity?: StringFilter<"Course"> | string
    entryRequirement?: StringFilter<"Course"> | string
    packagingRule?: StringFilter<"Course"> | string
    coreUnits?: StringFilter<"Course"> | string
    electiveUnits?: StringFilter<"Course"> | string
    link?: StringFilter<"Course"> | string
    sectionId?: StringFilter<"Course"> | string
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    section?: XOR<SectionScalarRelationFilter, SectionWhereInput>
    reviews?: UserReviewListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    index?: SortOrder
    imageSquareLink?: SortOrder
    imageSquarePublicId?: SortOrder
    imageCoverLink?: SortOrder
    imageCoverPublicId?: SortOrder
    description?: SortOrder
    jobOpportunity?: SortOrder
    entryRequirement?: SortOrder
    packagingRule?: SortOrder
    coreUnits?: SortOrder
    electiveUnits?: SortOrder
    link?: SortOrder
    sectionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    section?: SectionOrderByWithRelationInput
    reviews?: UserReviewOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    metaTitle?: string
    link?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    title?: StringFilter<"Course"> | string
    metaDescription?: StringFilter<"Course"> | string
    index?: IntFilter<"Course"> | number
    imageSquareLink?: StringFilter<"Course"> | string
    imageSquarePublicId?: StringFilter<"Course"> | string
    imageCoverLink?: StringFilter<"Course"> | string
    imageCoverPublicId?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    jobOpportunity?: StringFilter<"Course"> | string
    entryRequirement?: StringFilter<"Course"> | string
    packagingRule?: StringFilter<"Course"> | string
    coreUnits?: StringFilter<"Course"> | string
    electiveUnits?: StringFilter<"Course"> | string
    sectionId?: StringFilter<"Course"> | string
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    section?: XOR<SectionScalarRelationFilter, SectionWhereInput>
    reviews?: UserReviewListRelationFilter
  }, "id" | "metaTitle" | "link">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    index?: SortOrder
    imageSquareLink?: SortOrder
    imageSquarePublicId?: SortOrder
    imageCoverLink?: SortOrder
    imageCoverPublicId?: SortOrder
    description?: SortOrder
    jobOpportunity?: SortOrder
    entryRequirement?: SortOrder
    packagingRule?: SortOrder
    coreUnits?: SortOrder
    electiveUnits?: SortOrder
    link?: SortOrder
    sectionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    title?: StringWithAggregatesFilter<"Course"> | string
    metaTitle?: StringWithAggregatesFilter<"Course"> | string
    metaDescription?: StringWithAggregatesFilter<"Course"> | string
    index?: IntWithAggregatesFilter<"Course"> | number
    imageSquareLink?: StringWithAggregatesFilter<"Course"> | string
    imageSquarePublicId?: StringWithAggregatesFilter<"Course"> | string
    imageCoverLink?: StringWithAggregatesFilter<"Course"> | string
    imageCoverPublicId?: StringWithAggregatesFilter<"Course"> | string
    description?: StringWithAggregatesFilter<"Course"> | string
    jobOpportunity?: StringWithAggregatesFilter<"Course"> | string
    entryRequirement?: StringWithAggregatesFilter<"Course"> | string
    packagingRule?: StringWithAggregatesFilter<"Course"> | string
    coreUnits?: StringWithAggregatesFilter<"Course"> | string
    electiveUnits?: StringWithAggregatesFilter<"Course"> | string
    link?: StringWithAggregatesFilter<"Course"> | string
    sectionId?: StringWithAggregatesFilter<"Course"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
  }

  export type UserReviewWhereInput = {
    AND?: UserReviewWhereInput | UserReviewWhereInput[]
    OR?: UserReviewWhereInput[]
    NOT?: UserReviewWhereInput | UserReviewWhereInput[]
    id?: StringFilter<"UserReview"> | string
    purchasedCourseId?: StringFilter<"UserReview"> | string
    userName?: StringFilter<"UserReview"> | string
    userImage?: StringNullableFilter<"UserReview"> | string | null
    reviewImage?: StringNullableFilter<"UserReview"> | string | null
    reviewText?: StringFilter<"UserReview"> | string
    givenStar?: IntFilter<"UserReview"> | number
    approved?: BoolFilter<"UserReview"> | boolean
    reviewDate?: DateTimeFilter<"UserReview"> | Date | string
    createdAt?: DateTimeFilter<"UserReview"> | Date | string
    updatedAt?: DateTimeFilter<"UserReview"> | Date | string
    purchasedCourse?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }

  export type UserReviewOrderByWithRelationInput = {
    id?: SortOrder
    purchasedCourseId?: SortOrder
    userName?: SortOrder
    userImage?: SortOrderInput | SortOrder
    reviewImage?: SortOrderInput | SortOrder
    reviewText?: SortOrder
    givenStar?: SortOrder
    approved?: SortOrder
    reviewDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    purchasedCourse?: CourseOrderByWithRelationInput
  }

  export type UserReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserReviewWhereInput | UserReviewWhereInput[]
    OR?: UserReviewWhereInput[]
    NOT?: UserReviewWhereInput | UserReviewWhereInput[]
    purchasedCourseId?: StringFilter<"UserReview"> | string
    userName?: StringFilter<"UserReview"> | string
    userImage?: StringNullableFilter<"UserReview"> | string | null
    reviewImage?: StringNullableFilter<"UserReview"> | string | null
    reviewText?: StringFilter<"UserReview"> | string
    givenStar?: IntFilter<"UserReview"> | number
    approved?: BoolFilter<"UserReview"> | boolean
    reviewDate?: DateTimeFilter<"UserReview"> | Date | string
    createdAt?: DateTimeFilter<"UserReview"> | Date | string
    updatedAt?: DateTimeFilter<"UserReview"> | Date | string
    purchasedCourse?: XOR<CourseScalarRelationFilter, CourseWhereInput>
  }, "id">

  export type UserReviewOrderByWithAggregationInput = {
    id?: SortOrder
    purchasedCourseId?: SortOrder
    userName?: SortOrder
    userImage?: SortOrderInput | SortOrder
    reviewImage?: SortOrderInput | SortOrder
    reviewText?: SortOrder
    givenStar?: SortOrder
    approved?: SortOrder
    reviewDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserReviewCountOrderByAggregateInput
    _avg?: UserReviewAvgOrderByAggregateInput
    _max?: UserReviewMaxOrderByAggregateInput
    _min?: UserReviewMinOrderByAggregateInput
    _sum?: UserReviewSumOrderByAggregateInput
  }

  export type UserReviewScalarWhereWithAggregatesInput = {
    AND?: UserReviewScalarWhereWithAggregatesInput | UserReviewScalarWhereWithAggregatesInput[]
    OR?: UserReviewScalarWhereWithAggregatesInput[]
    NOT?: UserReviewScalarWhereWithAggregatesInput | UserReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserReview"> | string
    purchasedCourseId?: StringWithAggregatesFilter<"UserReview"> | string
    userName?: StringWithAggregatesFilter<"UserReview"> | string
    userImage?: StringNullableWithAggregatesFilter<"UserReview"> | string | null
    reviewImage?: StringNullableWithAggregatesFilter<"UserReview"> | string | null
    reviewText?: StringWithAggregatesFilter<"UserReview"> | string
    givenStar?: IntWithAggregatesFilter<"UserReview"> | number
    approved?: BoolWithAggregatesFilter<"UserReview"> | boolean
    reviewDate?: DateTimeWithAggregatesFilter<"UserReview"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"UserReview"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserReview"> | Date | string
  }

  export type ResponseWhereInput = {
    AND?: ResponseWhereInput | ResponseWhereInput[]
    OR?: ResponseWhereInput[]
    NOT?: ResponseWhereInput | ResponseWhereInput[]
    id?: StringFilter<"Response"> | string
    name?: StringFilter<"Response"> | string
    phone?: StringFilter<"Response"> | string
    email?: StringFilter<"Response"> | string
    message?: StringNullableFilter<"Response"> | string | null
    interest?: StringNullableFilter<"Response"> | string | null
    createdAt?: DateTimeFilter<"Response"> | Date | string
    stage?: EnumResponseStageFilter<"Response"> | $Enums.ResponseStage
    notes?: NoteListRelationFilter
  }

  export type ResponseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    message?: SortOrderInput | SortOrder
    interest?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    stage?: SortOrder
    notes?: NoteOrderByRelationAggregateInput
  }

  export type ResponseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResponseWhereInput | ResponseWhereInput[]
    OR?: ResponseWhereInput[]
    NOT?: ResponseWhereInput | ResponseWhereInput[]
    name?: StringFilter<"Response"> | string
    phone?: StringFilter<"Response"> | string
    email?: StringFilter<"Response"> | string
    message?: StringNullableFilter<"Response"> | string | null
    interest?: StringNullableFilter<"Response"> | string | null
    createdAt?: DateTimeFilter<"Response"> | Date | string
    stage?: EnumResponseStageFilter<"Response"> | $Enums.ResponseStage
    notes?: NoteListRelationFilter
  }, "id">

  export type ResponseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    message?: SortOrderInput | SortOrder
    interest?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    stage?: SortOrder
    _count?: ResponseCountOrderByAggregateInput
    _max?: ResponseMaxOrderByAggregateInput
    _min?: ResponseMinOrderByAggregateInput
  }

  export type ResponseScalarWhereWithAggregatesInput = {
    AND?: ResponseScalarWhereWithAggregatesInput | ResponseScalarWhereWithAggregatesInput[]
    OR?: ResponseScalarWhereWithAggregatesInput[]
    NOT?: ResponseScalarWhereWithAggregatesInput | ResponseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Response"> | string
    name?: StringWithAggregatesFilter<"Response"> | string
    phone?: StringWithAggregatesFilter<"Response"> | string
    email?: StringWithAggregatesFilter<"Response"> | string
    message?: StringNullableWithAggregatesFilter<"Response"> | string | null
    interest?: StringNullableWithAggregatesFilter<"Response"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Response"> | Date | string
    stage?: EnumResponseStageWithAggregatesFilter<"Response"> | $Enums.ResponseStage
  }

  export type EligibilitySubmissionWhereInput = {
    AND?: EligibilitySubmissionWhereInput | EligibilitySubmissionWhereInput[]
    OR?: EligibilitySubmissionWhereInput[]
    NOT?: EligibilitySubmissionWhereInput | EligibilitySubmissionWhereInput[]
    id?: StringFilter<"EligibilitySubmission"> | string
    fullName?: StringFilter<"EligibilitySubmission"> | string
    email?: StringFilter<"EligibilitySubmission"> | string
    phoneNumber?: StringFilter<"EligibilitySubmission"> | string
    industry?: StringFilter<"EligibilitySubmission"> | string
    qualification?: StringFilter<"EligibilitySubmission"> | string
    yearsOfExperience?: IntFilter<"EligibilitySubmission"> | number
    stateLivedIn?: StringFilter<"EligibilitySubmission"> | string
    message?: StringNullableFilter<"EligibilitySubmission"> | string | null
    createdAt?: DateTimeFilter<"EligibilitySubmission"> | Date | string
    updatedAt?: DateTimeFilter<"EligibilitySubmission"> | Date | string
    notes?: NoteListRelationFilter
  }

  export type EligibilitySubmissionOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    industry?: SortOrder
    qualification?: SortOrder
    yearsOfExperience?: SortOrder
    stateLivedIn?: SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    notes?: NoteOrderByRelationAggregateInput
  }

  export type EligibilitySubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EligibilitySubmissionWhereInput | EligibilitySubmissionWhereInput[]
    OR?: EligibilitySubmissionWhereInput[]
    NOT?: EligibilitySubmissionWhereInput | EligibilitySubmissionWhereInput[]
    fullName?: StringFilter<"EligibilitySubmission"> | string
    email?: StringFilter<"EligibilitySubmission"> | string
    phoneNumber?: StringFilter<"EligibilitySubmission"> | string
    industry?: StringFilter<"EligibilitySubmission"> | string
    qualification?: StringFilter<"EligibilitySubmission"> | string
    yearsOfExperience?: IntFilter<"EligibilitySubmission"> | number
    stateLivedIn?: StringFilter<"EligibilitySubmission"> | string
    message?: StringNullableFilter<"EligibilitySubmission"> | string | null
    createdAt?: DateTimeFilter<"EligibilitySubmission"> | Date | string
    updatedAt?: DateTimeFilter<"EligibilitySubmission"> | Date | string
    notes?: NoteListRelationFilter
  }, "id">

  export type EligibilitySubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    industry?: SortOrder
    qualification?: SortOrder
    yearsOfExperience?: SortOrder
    stateLivedIn?: SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EligibilitySubmissionCountOrderByAggregateInput
    _avg?: EligibilitySubmissionAvgOrderByAggregateInput
    _max?: EligibilitySubmissionMaxOrderByAggregateInput
    _min?: EligibilitySubmissionMinOrderByAggregateInput
    _sum?: EligibilitySubmissionSumOrderByAggregateInput
  }

  export type EligibilitySubmissionScalarWhereWithAggregatesInput = {
    AND?: EligibilitySubmissionScalarWhereWithAggregatesInput | EligibilitySubmissionScalarWhereWithAggregatesInput[]
    OR?: EligibilitySubmissionScalarWhereWithAggregatesInput[]
    NOT?: EligibilitySubmissionScalarWhereWithAggregatesInput | EligibilitySubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EligibilitySubmission"> | string
    fullName?: StringWithAggregatesFilter<"EligibilitySubmission"> | string
    email?: StringWithAggregatesFilter<"EligibilitySubmission"> | string
    phoneNumber?: StringWithAggregatesFilter<"EligibilitySubmission"> | string
    industry?: StringWithAggregatesFilter<"EligibilitySubmission"> | string
    qualification?: StringWithAggregatesFilter<"EligibilitySubmission"> | string
    yearsOfExperience?: IntWithAggregatesFilter<"EligibilitySubmission"> | number
    stateLivedIn?: StringWithAggregatesFilter<"EligibilitySubmission"> | string
    message?: StringNullableWithAggregatesFilter<"EligibilitySubmission"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EligibilitySubmission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EligibilitySubmission"> | Date | string
  }

  export type NoteWhereInput = {
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    id?: StringFilter<"Note"> | string
    content?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    responseId?: StringNullableFilter<"Note"> | string | null
    eligibilitySubmissionId?: StringNullableFilter<"Note"> | string | null
    noteType?: EnumNoteTypeFilter<"Note"> | $Enums.NoteType
    response?: XOR<ResponseNullableScalarRelationFilter, ResponseWhereInput> | null
    eligibilitySubmission?: XOR<EligibilitySubmissionNullableScalarRelationFilter, EligibilitySubmissionWhereInput> | null
  }

  export type NoteOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    responseId?: SortOrderInput | SortOrder
    eligibilitySubmissionId?: SortOrderInput | SortOrder
    noteType?: SortOrder
    response?: ResponseOrderByWithRelationInput
    eligibilitySubmission?: EligibilitySubmissionOrderByWithRelationInput
  }

  export type NoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    content?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    responseId?: StringNullableFilter<"Note"> | string | null
    eligibilitySubmissionId?: StringNullableFilter<"Note"> | string | null
    noteType?: EnumNoteTypeFilter<"Note"> | $Enums.NoteType
    response?: XOR<ResponseNullableScalarRelationFilter, ResponseWhereInput> | null
    eligibilitySubmission?: XOR<EligibilitySubmissionNullableScalarRelationFilter, EligibilitySubmissionWhereInput> | null
  }, "id">

  export type NoteOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    responseId?: SortOrderInput | SortOrder
    eligibilitySubmissionId?: SortOrderInput | SortOrder
    noteType?: SortOrder
    _count?: NoteCountOrderByAggregateInput
    _max?: NoteMaxOrderByAggregateInput
    _min?: NoteMinOrderByAggregateInput
  }

  export type NoteScalarWhereWithAggregatesInput = {
    AND?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    OR?: NoteScalarWhereWithAggregatesInput[]
    NOT?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Note"> | string
    content?: StringWithAggregatesFilter<"Note"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Note"> | Date | string
    responseId?: StringNullableWithAggregatesFilter<"Note"> | string | null
    eligibilitySubmissionId?: StringNullableWithAggregatesFilter<"Note"> | string | null
    noteType?: EnumNoteTypeWithAggregatesFilter<"Note"> | $Enums.NoteType
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    description?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    recipients?: StringNullableListFilter<"Notification">
    readBy?: StringNullableListFilter<"Notification">
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    recipients?: SortOrder
    readBy?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    title?: StringFilter<"Notification"> | string
    description?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    recipients?: StringNullableListFilter<"Notification">
    readBy?: StringNullableListFilter<"Notification">
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    recipients?: SortOrder
    readBy?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    description?: StringWithAggregatesFilter<"Notification"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    recipients?: StringNullableListFilter<"Notification">
    readBy?: StringNullableListFilter<"Notification">
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    name?: StringFilter<"Payment"> | string
    qualification?: StringFilter<"Payment"> | string
    phoneNumber?: StringFilter<"Payment"> | string
    email?: StringFilter<"Payment"> | string
    source?: StringFilter<"Payment"> | string
    collegeName?: StringFilter<"Payment"> | string
    courseFee?: FloatFilter<"Payment"> | number
    paymentStatus?: StringFilter<"Payment"> | string
    payment?: FloatFilter<"Payment"> | number
    collegePayment?: FloatFilter<"Payment"> | number
    agentCommission?: FloatFilter<"Payment"> | number
    bankCommission?: FloatFilter<"Payment"> | number
    netProfit?: FloatFilter<"Payment"> | number
    enrollmentDate?: DateTimeFilter<"Payment"> | Date | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    additionalNote?: StringNullableFilter<"Payment"> | string | null
    parts?: PaymentPartListRelationFilter
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    qualification?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    source?: SortOrder
    collegeName?: SortOrder
    courseFee?: SortOrder
    paymentStatus?: SortOrder
    payment?: SortOrder
    collegePayment?: SortOrder
    agentCommission?: SortOrder
    bankCommission?: SortOrder
    netProfit?: SortOrder
    enrollmentDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    additionalNote?: SortOrderInput | SortOrder
    parts?: PaymentPartOrderByRelationAggregateInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    name?: StringFilter<"Payment"> | string
    qualification?: StringFilter<"Payment"> | string
    phoneNumber?: StringFilter<"Payment"> | string
    email?: StringFilter<"Payment"> | string
    source?: StringFilter<"Payment"> | string
    collegeName?: StringFilter<"Payment"> | string
    courseFee?: FloatFilter<"Payment"> | number
    paymentStatus?: StringFilter<"Payment"> | string
    payment?: FloatFilter<"Payment"> | number
    collegePayment?: FloatFilter<"Payment"> | number
    agentCommission?: FloatFilter<"Payment"> | number
    bankCommission?: FloatFilter<"Payment"> | number
    netProfit?: FloatFilter<"Payment"> | number
    enrollmentDate?: DateTimeFilter<"Payment"> | Date | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    additionalNote?: StringNullableFilter<"Payment"> | string | null
    parts?: PaymentPartListRelationFilter
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    qualification?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    source?: SortOrder
    collegeName?: SortOrder
    courseFee?: SortOrder
    paymentStatus?: SortOrder
    payment?: SortOrder
    collegePayment?: SortOrder
    agentCommission?: SortOrder
    bankCommission?: SortOrder
    netProfit?: SortOrder
    enrollmentDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    additionalNote?: SortOrderInput | SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    name?: StringWithAggregatesFilter<"Payment"> | string
    qualification?: StringWithAggregatesFilter<"Payment"> | string
    phoneNumber?: StringWithAggregatesFilter<"Payment"> | string
    email?: StringWithAggregatesFilter<"Payment"> | string
    source?: StringWithAggregatesFilter<"Payment"> | string
    collegeName?: StringWithAggregatesFilter<"Payment"> | string
    courseFee?: FloatWithAggregatesFilter<"Payment"> | number
    paymentStatus?: StringWithAggregatesFilter<"Payment"> | string
    payment?: FloatWithAggregatesFilter<"Payment"> | number
    collegePayment?: FloatWithAggregatesFilter<"Payment"> | number
    agentCommission?: FloatWithAggregatesFilter<"Payment"> | number
    bankCommission?: FloatWithAggregatesFilter<"Payment"> | number
    netProfit?: FloatWithAggregatesFilter<"Payment"> | number
    enrollmentDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    additionalNote?: StringNullableWithAggregatesFilter<"Payment"> | string | null
  }

  export type PaymentPartWhereInput = {
    AND?: PaymentPartWhereInput | PaymentPartWhereInput[]
    OR?: PaymentPartWhereInput[]
    NOT?: PaymentPartWhereInput | PaymentPartWhereInput[]
    id?: StringFilter<"PaymentPart"> | string
    amount?: FloatFilter<"PaymentPart"> | number
    paidAt?: DateTimeFilter<"PaymentPart"> | Date | string
    paymentId?: StringFilter<"PaymentPart"> | string
    payment?: XOR<PaymentScalarRelationFilter, PaymentWhereInput>
  }

  export type PaymentPartOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    paidAt?: SortOrder
    paymentId?: SortOrder
    payment?: PaymentOrderByWithRelationInput
  }

  export type PaymentPartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentPartWhereInput | PaymentPartWhereInput[]
    OR?: PaymentPartWhereInput[]
    NOT?: PaymentPartWhereInput | PaymentPartWhereInput[]
    amount?: FloatFilter<"PaymentPart"> | number
    paidAt?: DateTimeFilter<"PaymentPart"> | Date | string
    paymentId?: StringFilter<"PaymentPart"> | string
    payment?: XOR<PaymentScalarRelationFilter, PaymentWhereInput>
  }, "id">

  export type PaymentPartOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    paidAt?: SortOrder
    paymentId?: SortOrder
    _count?: PaymentPartCountOrderByAggregateInput
    _avg?: PaymentPartAvgOrderByAggregateInput
    _max?: PaymentPartMaxOrderByAggregateInput
    _min?: PaymentPartMinOrderByAggregateInput
    _sum?: PaymentPartSumOrderByAggregateInput
  }

  export type PaymentPartScalarWhereWithAggregatesInput = {
    AND?: PaymentPartScalarWhereWithAggregatesInput | PaymentPartScalarWhereWithAggregatesInput[]
    OR?: PaymentPartScalarWhereWithAggregatesInput[]
    NOT?: PaymentPartScalarWhereWithAggregatesInput | PaymentPartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentPart"> | string
    amount?: FloatWithAggregatesFilter<"PaymentPart"> | number
    paidAt?: DateTimeWithAggregatesFilter<"PaymentPart"> | Date | string
    paymentId?: StringWithAggregatesFilter<"PaymentPart"> | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    impersonatedUsers?: SessionCreateNestedManyWithoutImpersonatorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    impersonatedUsers?: SessionUncheckedCreateNestedManyWithoutImpersonatorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    impersonatedUsers?: SessionUpdateManyWithoutImpersonatorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    impersonatedUsers?: SessionUncheckedUpdateManyWithoutImpersonatorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AccountCreateInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
    impersonator?: UserCreateNestedOneWithoutImpersonatedUsersInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    impersonatedBy?: string | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
    impersonator?: UserUpdateOneWithoutImpersonatedUsersNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    impersonatedBy?: string | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VerificationCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionCreateInput = {
    id?: string
    title: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateInput = {
    id?: string
    title: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type SectionCreateManyInput = {
    id?: string
    title: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateInput = {
    id?: string
    title: string
    metaTitle: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    description: string
    jobOpportunity: string
    entryRequirement: string
    packagingRule: string
    coreUnits: string
    electiveUnits: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    section: SectionCreateNestedOneWithoutCoursesInput
    reviews?: UserReviewCreateNestedManyWithoutPurchasedCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    title: string
    metaTitle: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    description: string
    jobOpportunity: string
    entryRequirement: string
    packagingRule: string
    coreUnits: string
    electiveUnits: string
    link: string
    sectionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: UserReviewUncheckedCreateNestedManyWithoutPurchasedCourseInput
  }

  export type CourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaTitle?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    jobOpportunity?: StringFieldUpdateOperationsInput | string
    entryRequirement?: StringFieldUpdateOperationsInput | string
    packagingRule?: StringFieldUpdateOperationsInput | string
    coreUnits?: StringFieldUpdateOperationsInput | string
    electiveUnits?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    section?: SectionUpdateOneRequiredWithoutCoursesNestedInput
    reviews?: UserReviewUpdateManyWithoutPurchasedCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaTitle?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    jobOpportunity?: StringFieldUpdateOperationsInput | string
    entryRequirement?: StringFieldUpdateOperationsInput | string
    packagingRule?: StringFieldUpdateOperationsInput | string
    coreUnits?: StringFieldUpdateOperationsInput | string
    electiveUnits?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: UserReviewUncheckedUpdateManyWithoutPurchasedCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: string
    title: string
    metaTitle: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    description: string
    jobOpportunity: string
    entryRequirement: string
    packagingRule: string
    coreUnits: string
    electiveUnits: string
    link: string
    sectionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaTitle?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    jobOpportunity?: StringFieldUpdateOperationsInput | string
    entryRequirement?: StringFieldUpdateOperationsInput | string
    packagingRule?: StringFieldUpdateOperationsInput | string
    coreUnits?: StringFieldUpdateOperationsInput | string
    electiveUnits?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaTitle?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    jobOpportunity?: StringFieldUpdateOperationsInput | string
    entryRequirement?: StringFieldUpdateOperationsInput | string
    packagingRule?: StringFieldUpdateOperationsInput | string
    coreUnits?: StringFieldUpdateOperationsInput | string
    electiveUnits?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReviewCreateInput = {
    id?: string
    userName: string
    userImage?: string | null
    reviewImage?: string | null
    reviewText: string
    givenStar: number
    approved?: boolean
    reviewDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    purchasedCourse: CourseCreateNestedOneWithoutReviewsInput
  }

  export type UserReviewUncheckedCreateInput = {
    id?: string
    purchasedCourseId: string
    userName: string
    userImage?: string | null
    reviewImage?: string | null
    reviewText: string
    givenStar: number
    approved?: boolean
    reviewDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewText?: StringFieldUpdateOperationsInput | string
    givenStar?: IntFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasedCourse?: CourseUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type UserReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchasedCourseId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewText?: StringFieldUpdateOperationsInput | string
    givenStar?: IntFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReviewCreateManyInput = {
    id?: string
    purchasedCourseId: string
    userName: string
    userImage?: string | null
    reviewImage?: string | null
    reviewText: string
    givenStar: number
    approved?: boolean
    reviewDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewText?: StringFieldUpdateOperationsInput | string
    givenStar?: IntFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchasedCourseId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewText?: StringFieldUpdateOperationsInput | string
    givenStar?: IntFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseCreateInput = {
    id?: string
    name: string
    phone: string
    email: string
    message?: string | null
    interest?: string | null
    createdAt?: Date | string
    stage?: $Enums.ResponseStage
    notes?: NoteCreateNestedManyWithoutResponseInput
  }

  export type ResponseUncheckedCreateInput = {
    id?: string
    name: string
    phone: string
    email: string
    message?: string | null
    interest?: string | null
    createdAt?: Date | string
    stage?: $Enums.ResponseStage
    notes?: NoteUncheckedCreateNestedManyWithoutResponseInput
  }

  export type ResponseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    interest?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stage?: EnumResponseStageFieldUpdateOperationsInput | $Enums.ResponseStage
    notes?: NoteUpdateManyWithoutResponseNestedInput
  }

  export type ResponseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    interest?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stage?: EnumResponseStageFieldUpdateOperationsInput | $Enums.ResponseStage
    notes?: NoteUncheckedUpdateManyWithoutResponseNestedInput
  }

  export type ResponseCreateManyInput = {
    id?: string
    name: string
    phone: string
    email: string
    message?: string | null
    interest?: string | null
    createdAt?: Date | string
    stage?: $Enums.ResponseStage
  }

  export type ResponseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    interest?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stage?: EnumResponseStageFieldUpdateOperationsInput | $Enums.ResponseStage
  }

  export type ResponseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    interest?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stage?: EnumResponseStageFieldUpdateOperationsInput | $Enums.ResponseStage
  }

  export type EligibilitySubmissionCreateInput = {
    id?: string
    fullName: string
    email: string
    phoneNumber: string
    industry: string
    qualification: string
    yearsOfExperience: number
    stateLivedIn: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteCreateNestedManyWithoutEligibilitySubmissionInput
  }

  export type EligibilitySubmissionUncheckedCreateInput = {
    id?: string
    fullName: string
    email: string
    phoneNumber: string
    industry: string
    qualification: string
    yearsOfExperience: number
    stateLivedIn: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutEligibilitySubmissionInput
  }

  export type EligibilitySubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    qualification?: StringFieldUpdateOperationsInput | string
    yearsOfExperience?: IntFieldUpdateOperationsInput | number
    stateLivedIn?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutEligibilitySubmissionNestedInput
  }

  export type EligibilitySubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    qualification?: StringFieldUpdateOperationsInput | string
    yearsOfExperience?: IntFieldUpdateOperationsInput | number
    stateLivedIn?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutEligibilitySubmissionNestedInput
  }

  export type EligibilitySubmissionCreateManyInput = {
    id?: string
    fullName: string
    email: string
    phoneNumber: string
    industry: string
    qualification: string
    yearsOfExperience: number
    stateLivedIn: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EligibilitySubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    qualification?: StringFieldUpdateOperationsInput | string
    yearsOfExperience?: IntFieldUpdateOperationsInput | number
    stateLivedIn?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EligibilitySubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    qualification?: StringFieldUpdateOperationsInput | string
    yearsOfExperience?: IntFieldUpdateOperationsInput | number
    stateLivedIn?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    noteType: $Enums.NoteType
    response?: ResponseCreateNestedOneWithoutNotesInput
    eligibilitySubmission?: EligibilitySubmissionCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    responseId?: string | null
    eligibilitySubmissionId?: string | null
    noteType: $Enums.NoteType
  }

  export type NoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    noteType?: EnumNoteTypeFieldUpdateOperationsInput | $Enums.NoteType
    response?: ResponseUpdateOneWithoutNotesNestedInput
    eligibilitySubmission?: EligibilitySubmissionUpdateOneWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responseId?: NullableStringFieldUpdateOperationsInput | string | null
    eligibilitySubmissionId?: NullableStringFieldUpdateOperationsInput | string | null
    noteType?: EnumNoteTypeFieldUpdateOperationsInput | $Enums.NoteType
  }

  export type NoteCreateManyInput = {
    id?: string
    content: string
    createdAt?: Date | string
    responseId?: string | null
    eligibilitySubmissionId?: string | null
    noteType: $Enums.NoteType
  }

  export type NoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    noteType?: EnumNoteTypeFieldUpdateOperationsInput | $Enums.NoteType
  }

  export type NoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responseId?: NullableStringFieldUpdateOperationsInput | string | null
    eligibilitySubmissionId?: NullableStringFieldUpdateOperationsInput | string | null
    noteType?: EnumNoteTypeFieldUpdateOperationsInput | $Enums.NoteType
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    description: string
    createdAt?: Date | string
    type: $Enums.NotificationType
    recipients?: NotificationCreaterecipientsInput | string[]
    readBy?: NotificationCreatereadByInput | string[]
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    createdAt?: Date | string
    type: $Enums.NotificationType
    recipients?: NotificationCreaterecipientsInput | string[]
    readBy?: NotificationCreatereadByInput | string[]
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    recipients?: NotificationUpdaterecipientsInput | string[]
    readBy?: NotificationUpdatereadByInput | string[]
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    recipients?: NotificationUpdaterecipientsInput | string[]
    readBy?: NotificationUpdatereadByInput | string[]
  }

  export type NotificationCreateManyInput = {
    id?: string
    title: string
    description: string
    createdAt?: Date | string
    type: $Enums.NotificationType
    recipients?: NotificationCreaterecipientsInput | string[]
    readBy?: NotificationCreatereadByInput | string[]
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    recipients?: NotificationUpdaterecipientsInput | string[]
    readBy?: NotificationUpdatereadByInput | string[]
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    recipients?: NotificationUpdaterecipientsInput | string[]
    readBy?: NotificationUpdatereadByInput | string[]
  }

  export type PaymentCreateInput = {
    id?: string
    name: string
    qualification: string
    phoneNumber: string
    email: string
    source: string
    collegeName: string
    courseFee: number
    paymentStatus: string
    payment?: number
    collegePayment?: number
    agentCommission?: number
    bankCommission?: number
    netProfit?: number
    enrollmentDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    additionalNote?: string | null
    parts?: PaymentPartCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    name: string
    qualification: string
    phoneNumber: string
    email: string
    source: string
    collegeName: string
    courseFee: number
    paymentStatus: string
    payment?: number
    collegePayment?: number
    agentCommission?: number
    bankCommission?: number
    netProfit?: number
    enrollmentDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    additionalNote?: string | null
    parts?: PaymentPartUncheckedCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qualification?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    courseFee?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: StringFieldUpdateOperationsInput | string
    payment?: FloatFieldUpdateOperationsInput | number
    collegePayment?: FloatFieldUpdateOperationsInput | number
    agentCommission?: FloatFieldUpdateOperationsInput | number
    bankCommission?: FloatFieldUpdateOperationsInput | number
    netProfit?: FloatFieldUpdateOperationsInput | number
    enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalNote?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: PaymentPartUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qualification?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    courseFee?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: StringFieldUpdateOperationsInput | string
    payment?: FloatFieldUpdateOperationsInput | number
    collegePayment?: FloatFieldUpdateOperationsInput | number
    agentCommission?: FloatFieldUpdateOperationsInput | number
    bankCommission?: FloatFieldUpdateOperationsInput | number
    netProfit?: FloatFieldUpdateOperationsInput | number
    enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalNote?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: PaymentPartUncheckedUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentCreateManyInput = {
    id?: string
    name: string
    qualification: string
    phoneNumber: string
    email: string
    source: string
    collegeName: string
    courseFee: number
    paymentStatus: string
    payment?: number
    collegePayment?: number
    agentCommission?: number
    bankCommission?: number
    netProfit?: number
    enrollmentDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    additionalNote?: string | null
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qualification?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    courseFee?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: StringFieldUpdateOperationsInput | string
    payment?: FloatFieldUpdateOperationsInput | number
    collegePayment?: FloatFieldUpdateOperationsInput | number
    agentCommission?: FloatFieldUpdateOperationsInput | number
    bankCommission?: FloatFieldUpdateOperationsInput | number
    netProfit?: FloatFieldUpdateOperationsInput | number
    enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalNote?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qualification?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    courseFee?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: StringFieldUpdateOperationsInput | string
    payment?: FloatFieldUpdateOperationsInput | number
    collegePayment?: FloatFieldUpdateOperationsInput | number
    agentCommission?: FloatFieldUpdateOperationsInput | number
    bankCommission?: FloatFieldUpdateOperationsInput | number
    netProfit?: FloatFieldUpdateOperationsInput | number
    enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalNote?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentPartCreateInput = {
    id?: string
    amount: number
    paidAt?: Date | string
    payment: PaymentCreateNestedOneWithoutPartsInput
  }

  export type PaymentPartUncheckedCreateInput = {
    id?: string
    amount: number
    paidAt?: Date | string
    paymentId: string
  }

  export type PaymentPartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUpdateOneRequiredWithoutPartsNestedInput
  }

  export type PaymentPartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentId?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentPartCreateManyInput = {
    id?: string
    amount: number
    paidAt?: Date | string
    paymentId: string
  }

  export type PaymentPartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentPartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    banned?: SortOrder
    banReason?: SortOrder
    banExpires?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    banned?: SortOrder
    banReason?: SortOrder
    banExpires?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    banned?: SortOrder
    banReason?: SortOrder
    banExpires?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderIdAccountIdCompoundUniqueInput = {
    providerId: string
    accountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    impersonatedBy?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    impersonatedBy?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    impersonatedBy?: SortOrder
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CourseListRelationFilter = {
    every?: CourseWhereInput
    some?: CourseWhereInput
    none?: CourseWhereInput
  }

  export type CourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SectionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    metaDescription?: SortOrder
    index?: SortOrder
    imageSquareLink?: SortOrder
    imageSquarePublicId?: SortOrder
    imageCoverLink?: SortOrder
    imageCoverPublicId?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SectionAvgOrderByAggregateInput = {
    index?: SortOrder
  }

  export type SectionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    metaDescription?: SortOrder
    index?: SortOrder
    imageSquareLink?: SortOrder
    imageSquarePublicId?: SortOrder
    imageCoverLink?: SortOrder
    imageCoverPublicId?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SectionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    metaDescription?: SortOrder
    index?: SortOrder
    imageSquareLink?: SortOrder
    imageSquarePublicId?: SortOrder
    imageCoverLink?: SortOrder
    imageCoverPublicId?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SectionSumOrderByAggregateInput = {
    index?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SectionScalarRelationFilter = {
    is?: SectionWhereInput
    isNot?: SectionWhereInput
  }

  export type UserReviewListRelationFilter = {
    every?: UserReviewWhereInput
    some?: UserReviewWhereInput
    none?: UserReviewWhereInput
  }

  export type UserReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    index?: SortOrder
    imageSquareLink?: SortOrder
    imageSquarePublicId?: SortOrder
    imageCoverLink?: SortOrder
    imageCoverPublicId?: SortOrder
    description?: SortOrder
    jobOpportunity?: SortOrder
    entryRequirement?: SortOrder
    packagingRule?: SortOrder
    coreUnits?: SortOrder
    electiveUnits?: SortOrder
    link?: SortOrder
    sectionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    index?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    index?: SortOrder
    imageSquareLink?: SortOrder
    imageSquarePublicId?: SortOrder
    imageCoverLink?: SortOrder
    imageCoverPublicId?: SortOrder
    description?: SortOrder
    jobOpportunity?: SortOrder
    entryRequirement?: SortOrder
    packagingRule?: SortOrder
    coreUnits?: SortOrder
    electiveUnits?: SortOrder
    link?: SortOrder
    sectionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    index?: SortOrder
    imageSquareLink?: SortOrder
    imageSquarePublicId?: SortOrder
    imageCoverLink?: SortOrder
    imageCoverPublicId?: SortOrder
    description?: SortOrder
    jobOpportunity?: SortOrder
    entryRequirement?: SortOrder
    packagingRule?: SortOrder
    coreUnits?: SortOrder
    electiveUnits?: SortOrder
    link?: SortOrder
    sectionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    index?: SortOrder
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type UserReviewCountOrderByAggregateInput = {
    id?: SortOrder
    purchasedCourseId?: SortOrder
    userName?: SortOrder
    userImage?: SortOrder
    reviewImage?: SortOrder
    reviewText?: SortOrder
    givenStar?: SortOrder
    approved?: SortOrder
    reviewDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserReviewAvgOrderByAggregateInput = {
    givenStar?: SortOrder
  }

  export type UserReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    purchasedCourseId?: SortOrder
    userName?: SortOrder
    userImage?: SortOrder
    reviewImage?: SortOrder
    reviewText?: SortOrder
    givenStar?: SortOrder
    approved?: SortOrder
    reviewDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserReviewMinOrderByAggregateInput = {
    id?: SortOrder
    purchasedCourseId?: SortOrder
    userName?: SortOrder
    userImage?: SortOrder
    reviewImage?: SortOrder
    reviewText?: SortOrder
    givenStar?: SortOrder
    approved?: SortOrder
    reviewDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserReviewSumOrderByAggregateInput = {
    givenStar?: SortOrder
  }

  export type EnumResponseStageFilter<$PrismaModel = never> = {
    equals?: $Enums.ResponseStage | EnumResponseStageFieldRefInput<$PrismaModel>
    in?: $Enums.ResponseStage[] | ListEnumResponseStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResponseStage[] | ListEnumResponseStageFieldRefInput<$PrismaModel>
    not?: NestedEnumResponseStageFilter<$PrismaModel> | $Enums.ResponseStage
  }

  export type NoteListRelationFilter = {
    every?: NoteWhereInput
    some?: NoteWhereInput
    none?: NoteWhereInput
  }

  export type NoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResponseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    message?: SortOrder
    interest?: SortOrder
    createdAt?: SortOrder
    stage?: SortOrder
  }

  export type ResponseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    message?: SortOrder
    interest?: SortOrder
    createdAt?: SortOrder
    stage?: SortOrder
  }

  export type ResponseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    message?: SortOrder
    interest?: SortOrder
    createdAt?: SortOrder
    stage?: SortOrder
  }

  export type EnumResponseStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResponseStage | EnumResponseStageFieldRefInput<$PrismaModel>
    in?: $Enums.ResponseStage[] | ListEnumResponseStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResponseStage[] | ListEnumResponseStageFieldRefInput<$PrismaModel>
    not?: NestedEnumResponseStageWithAggregatesFilter<$PrismaModel> | $Enums.ResponseStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResponseStageFilter<$PrismaModel>
    _max?: NestedEnumResponseStageFilter<$PrismaModel>
  }

  export type EligibilitySubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    industry?: SortOrder
    qualification?: SortOrder
    yearsOfExperience?: SortOrder
    stateLivedIn?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EligibilitySubmissionAvgOrderByAggregateInput = {
    yearsOfExperience?: SortOrder
  }

  export type EligibilitySubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    industry?: SortOrder
    qualification?: SortOrder
    yearsOfExperience?: SortOrder
    stateLivedIn?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EligibilitySubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    industry?: SortOrder
    qualification?: SortOrder
    yearsOfExperience?: SortOrder
    stateLivedIn?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EligibilitySubmissionSumOrderByAggregateInput = {
    yearsOfExperience?: SortOrder
  }

  export type EnumNoteTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NoteType | EnumNoteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NoteType[] | ListEnumNoteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NoteType[] | ListEnumNoteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNoteTypeFilter<$PrismaModel> | $Enums.NoteType
  }

  export type ResponseNullableScalarRelationFilter = {
    is?: ResponseWhereInput | null
    isNot?: ResponseWhereInput | null
  }

  export type EligibilitySubmissionNullableScalarRelationFilter = {
    is?: EligibilitySubmissionWhereInput | null
    isNot?: EligibilitySubmissionWhereInput | null
  }

  export type NoteCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    responseId?: SortOrder
    eligibilitySubmissionId?: SortOrder
    noteType?: SortOrder
  }

  export type NoteMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    responseId?: SortOrder
    eligibilitySubmissionId?: SortOrder
    noteType?: SortOrder
  }

  export type NoteMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    responseId?: SortOrder
    eligibilitySubmissionId?: SortOrder
    noteType?: SortOrder
  }

  export type EnumNoteTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NoteType | EnumNoteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NoteType[] | ListEnumNoteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NoteType[] | ListEnumNoteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNoteTypeWithAggregatesFilter<$PrismaModel> | $Enums.NoteType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNoteTypeFilter<$PrismaModel>
    _max?: NestedEnumNoteTypeFilter<$PrismaModel>
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    recipients?: SortOrder
    readBy?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PaymentPartListRelationFilter = {
    every?: PaymentPartWhereInput
    some?: PaymentPartWhereInput
    none?: PaymentPartWhereInput
  }

  export type PaymentPartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    qualification?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    source?: SortOrder
    collegeName?: SortOrder
    courseFee?: SortOrder
    paymentStatus?: SortOrder
    payment?: SortOrder
    collegePayment?: SortOrder
    agentCommission?: SortOrder
    bankCommission?: SortOrder
    netProfit?: SortOrder
    enrollmentDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    additionalNote?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    courseFee?: SortOrder
    payment?: SortOrder
    collegePayment?: SortOrder
    agentCommission?: SortOrder
    bankCommission?: SortOrder
    netProfit?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    qualification?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    source?: SortOrder
    collegeName?: SortOrder
    courseFee?: SortOrder
    paymentStatus?: SortOrder
    payment?: SortOrder
    collegePayment?: SortOrder
    agentCommission?: SortOrder
    bankCommission?: SortOrder
    netProfit?: SortOrder
    enrollmentDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    additionalNote?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    qualification?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    source?: SortOrder
    collegeName?: SortOrder
    courseFee?: SortOrder
    paymentStatus?: SortOrder
    payment?: SortOrder
    collegePayment?: SortOrder
    agentCommission?: SortOrder
    bankCommission?: SortOrder
    netProfit?: SortOrder
    enrollmentDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    additionalNote?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    courseFee?: SortOrder
    payment?: SortOrder
    collegePayment?: SortOrder
    agentCommission?: SortOrder
    bankCommission?: SortOrder
    netProfit?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PaymentScalarRelationFilter = {
    is?: PaymentWhereInput
    isNot?: PaymentWhereInput
  }

  export type PaymentPartCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    paidAt?: SortOrder
    paymentId?: SortOrder
  }

  export type PaymentPartAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentPartMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    paidAt?: SortOrder
    paymentId?: SortOrder
  }

  export type PaymentPartMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    paidAt?: SortOrder
    paymentId?: SortOrder
  }

  export type PaymentPartSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutImpersonatorInput = {
    create?: XOR<SessionCreateWithoutImpersonatorInput, SessionUncheckedCreateWithoutImpersonatorInput> | SessionCreateWithoutImpersonatorInput[] | SessionUncheckedCreateWithoutImpersonatorInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutImpersonatorInput | SessionCreateOrConnectWithoutImpersonatorInput[]
    createMany?: SessionCreateManyImpersonatorInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutImpersonatorInput = {
    create?: XOR<SessionCreateWithoutImpersonatorInput, SessionUncheckedCreateWithoutImpersonatorInput> | SessionCreateWithoutImpersonatorInput[] | SessionUncheckedCreateWithoutImpersonatorInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutImpersonatorInput | SessionCreateOrConnectWithoutImpersonatorInput[]
    createMany?: SessionCreateManyImpersonatorInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutImpersonatorNestedInput = {
    create?: XOR<SessionCreateWithoutImpersonatorInput, SessionUncheckedCreateWithoutImpersonatorInput> | SessionCreateWithoutImpersonatorInput[] | SessionUncheckedCreateWithoutImpersonatorInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutImpersonatorInput | SessionCreateOrConnectWithoutImpersonatorInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutImpersonatorInput | SessionUpsertWithWhereUniqueWithoutImpersonatorInput[]
    createMany?: SessionCreateManyImpersonatorInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutImpersonatorInput | SessionUpdateWithWhereUniqueWithoutImpersonatorInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutImpersonatorInput | SessionUpdateManyWithWhereWithoutImpersonatorInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutImpersonatorNestedInput = {
    create?: XOR<SessionCreateWithoutImpersonatorInput, SessionUncheckedCreateWithoutImpersonatorInput> | SessionCreateWithoutImpersonatorInput[] | SessionUncheckedCreateWithoutImpersonatorInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutImpersonatorInput | SessionCreateOrConnectWithoutImpersonatorInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutImpersonatorInput | SessionUpsertWithWhereUniqueWithoutImpersonatorInput[]
    createMany?: SessionCreateManyImpersonatorInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutImpersonatorInput | SessionUpdateWithWhereUniqueWithoutImpersonatorInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutImpersonatorInput | SessionUpdateManyWithWhereWithoutImpersonatorInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutImpersonatedUsersInput = {
    create?: XOR<UserCreateWithoutImpersonatedUsersInput, UserUncheckedCreateWithoutImpersonatedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutImpersonatedUsersInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateOneWithoutImpersonatedUsersNestedInput = {
    create?: XOR<UserCreateWithoutImpersonatedUsersInput, UserUncheckedCreateWithoutImpersonatedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutImpersonatedUsersInput
    upsert?: UserUpsertWithoutImpersonatedUsersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutImpersonatedUsersInput, UserUpdateWithoutImpersonatedUsersInput>, UserUncheckedUpdateWithoutImpersonatedUsersInput>
  }

  export type CourseCreateNestedManyWithoutSectionInput = {
    create?: XOR<CourseCreateWithoutSectionInput, CourseUncheckedCreateWithoutSectionInput> | CourseCreateWithoutSectionInput[] | CourseUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSectionInput | CourseCreateOrConnectWithoutSectionInput[]
    createMany?: CourseCreateManySectionInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<CourseCreateWithoutSectionInput, CourseUncheckedCreateWithoutSectionInput> | CourseCreateWithoutSectionInput[] | CourseUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSectionInput | CourseCreateOrConnectWithoutSectionInput[]
    createMany?: CourseCreateManySectionInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CourseUpdateManyWithoutSectionNestedInput = {
    create?: XOR<CourseCreateWithoutSectionInput, CourseUncheckedCreateWithoutSectionInput> | CourseCreateWithoutSectionInput[] | CourseUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSectionInput | CourseCreateOrConnectWithoutSectionInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutSectionInput | CourseUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: CourseCreateManySectionInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutSectionInput | CourseUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutSectionInput | CourseUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<CourseCreateWithoutSectionInput, CourseUncheckedCreateWithoutSectionInput> | CourseCreateWithoutSectionInput[] | CourseUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSectionInput | CourseCreateOrConnectWithoutSectionInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutSectionInput | CourseUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: CourseCreateManySectionInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutSectionInput | CourseUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutSectionInput | CourseUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type SectionCreateNestedOneWithoutCoursesInput = {
    create?: XOR<SectionCreateWithoutCoursesInput, SectionUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: SectionCreateOrConnectWithoutCoursesInput
    connect?: SectionWhereUniqueInput
  }

  export type UserReviewCreateNestedManyWithoutPurchasedCourseInput = {
    create?: XOR<UserReviewCreateWithoutPurchasedCourseInput, UserReviewUncheckedCreateWithoutPurchasedCourseInput> | UserReviewCreateWithoutPurchasedCourseInput[] | UserReviewUncheckedCreateWithoutPurchasedCourseInput[]
    connectOrCreate?: UserReviewCreateOrConnectWithoutPurchasedCourseInput | UserReviewCreateOrConnectWithoutPurchasedCourseInput[]
    createMany?: UserReviewCreateManyPurchasedCourseInputEnvelope
    connect?: UserReviewWhereUniqueInput | UserReviewWhereUniqueInput[]
  }

  export type UserReviewUncheckedCreateNestedManyWithoutPurchasedCourseInput = {
    create?: XOR<UserReviewCreateWithoutPurchasedCourseInput, UserReviewUncheckedCreateWithoutPurchasedCourseInput> | UserReviewCreateWithoutPurchasedCourseInput[] | UserReviewUncheckedCreateWithoutPurchasedCourseInput[]
    connectOrCreate?: UserReviewCreateOrConnectWithoutPurchasedCourseInput | UserReviewCreateOrConnectWithoutPurchasedCourseInput[]
    createMany?: UserReviewCreateManyPurchasedCourseInputEnvelope
    connect?: UserReviewWhereUniqueInput | UserReviewWhereUniqueInput[]
  }

  export type SectionUpdateOneRequiredWithoutCoursesNestedInput = {
    create?: XOR<SectionCreateWithoutCoursesInput, SectionUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: SectionCreateOrConnectWithoutCoursesInput
    upsert?: SectionUpsertWithoutCoursesInput
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutCoursesInput, SectionUpdateWithoutCoursesInput>, SectionUncheckedUpdateWithoutCoursesInput>
  }

  export type UserReviewUpdateManyWithoutPurchasedCourseNestedInput = {
    create?: XOR<UserReviewCreateWithoutPurchasedCourseInput, UserReviewUncheckedCreateWithoutPurchasedCourseInput> | UserReviewCreateWithoutPurchasedCourseInput[] | UserReviewUncheckedCreateWithoutPurchasedCourseInput[]
    connectOrCreate?: UserReviewCreateOrConnectWithoutPurchasedCourseInput | UserReviewCreateOrConnectWithoutPurchasedCourseInput[]
    upsert?: UserReviewUpsertWithWhereUniqueWithoutPurchasedCourseInput | UserReviewUpsertWithWhereUniqueWithoutPurchasedCourseInput[]
    createMany?: UserReviewCreateManyPurchasedCourseInputEnvelope
    set?: UserReviewWhereUniqueInput | UserReviewWhereUniqueInput[]
    disconnect?: UserReviewWhereUniqueInput | UserReviewWhereUniqueInput[]
    delete?: UserReviewWhereUniqueInput | UserReviewWhereUniqueInput[]
    connect?: UserReviewWhereUniqueInput | UserReviewWhereUniqueInput[]
    update?: UserReviewUpdateWithWhereUniqueWithoutPurchasedCourseInput | UserReviewUpdateWithWhereUniqueWithoutPurchasedCourseInput[]
    updateMany?: UserReviewUpdateManyWithWhereWithoutPurchasedCourseInput | UserReviewUpdateManyWithWhereWithoutPurchasedCourseInput[]
    deleteMany?: UserReviewScalarWhereInput | UserReviewScalarWhereInput[]
  }

  export type UserReviewUncheckedUpdateManyWithoutPurchasedCourseNestedInput = {
    create?: XOR<UserReviewCreateWithoutPurchasedCourseInput, UserReviewUncheckedCreateWithoutPurchasedCourseInput> | UserReviewCreateWithoutPurchasedCourseInput[] | UserReviewUncheckedCreateWithoutPurchasedCourseInput[]
    connectOrCreate?: UserReviewCreateOrConnectWithoutPurchasedCourseInput | UserReviewCreateOrConnectWithoutPurchasedCourseInput[]
    upsert?: UserReviewUpsertWithWhereUniqueWithoutPurchasedCourseInput | UserReviewUpsertWithWhereUniqueWithoutPurchasedCourseInput[]
    createMany?: UserReviewCreateManyPurchasedCourseInputEnvelope
    set?: UserReviewWhereUniqueInput | UserReviewWhereUniqueInput[]
    disconnect?: UserReviewWhereUniqueInput | UserReviewWhereUniqueInput[]
    delete?: UserReviewWhereUniqueInput | UserReviewWhereUniqueInput[]
    connect?: UserReviewWhereUniqueInput | UserReviewWhereUniqueInput[]
    update?: UserReviewUpdateWithWhereUniqueWithoutPurchasedCourseInput | UserReviewUpdateWithWhereUniqueWithoutPurchasedCourseInput[]
    updateMany?: UserReviewUpdateManyWithWhereWithoutPurchasedCourseInput | UserReviewUpdateManyWithWhereWithoutPurchasedCourseInput[]
    deleteMany?: UserReviewScalarWhereInput | UserReviewScalarWhereInput[]
  }

  export type CourseCreateNestedOneWithoutReviewsInput = {
    create?: XOR<CourseCreateWithoutReviewsInput, CourseUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutReviewsInput
    connect?: CourseWhereUniqueInput
  }

  export type CourseUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<CourseCreateWithoutReviewsInput, CourseUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutReviewsInput
    upsert?: CourseUpsertWithoutReviewsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutReviewsInput, CourseUpdateWithoutReviewsInput>, CourseUncheckedUpdateWithoutReviewsInput>
  }

  export type NoteCreateNestedManyWithoutResponseInput = {
    create?: XOR<NoteCreateWithoutResponseInput, NoteUncheckedCreateWithoutResponseInput> | NoteCreateWithoutResponseInput[] | NoteUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutResponseInput | NoteCreateOrConnectWithoutResponseInput[]
    createMany?: NoteCreateManyResponseInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutResponseInput = {
    create?: XOR<NoteCreateWithoutResponseInput, NoteUncheckedCreateWithoutResponseInput> | NoteCreateWithoutResponseInput[] | NoteUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutResponseInput | NoteCreateOrConnectWithoutResponseInput[]
    createMany?: NoteCreateManyResponseInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type EnumResponseStageFieldUpdateOperationsInput = {
    set?: $Enums.ResponseStage
  }

  export type NoteUpdateManyWithoutResponseNestedInput = {
    create?: XOR<NoteCreateWithoutResponseInput, NoteUncheckedCreateWithoutResponseInput> | NoteCreateWithoutResponseInput[] | NoteUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutResponseInput | NoteCreateOrConnectWithoutResponseInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutResponseInput | NoteUpsertWithWhereUniqueWithoutResponseInput[]
    createMany?: NoteCreateManyResponseInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutResponseInput | NoteUpdateWithWhereUniqueWithoutResponseInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutResponseInput | NoteUpdateManyWithWhereWithoutResponseInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type NoteUncheckedUpdateManyWithoutResponseNestedInput = {
    create?: XOR<NoteCreateWithoutResponseInput, NoteUncheckedCreateWithoutResponseInput> | NoteCreateWithoutResponseInput[] | NoteUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutResponseInput | NoteCreateOrConnectWithoutResponseInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutResponseInput | NoteUpsertWithWhereUniqueWithoutResponseInput[]
    createMany?: NoteCreateManyResponseInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutResponseInput | NoteUpdateWithWhereUniqueWithoutResponseInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutResponseInput | NoteUpdateManyWithWhereWithoutResponseInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type NoteCreateNestedManyWithoutEligibilitySubmissionInput = {
    create?: XOR<NoteCreateWithoutEligibilitySubmissionInput, NoteUncheckedCreateWithoutEligibilitySubmissionInput> | NoteCreateWithoutEligibilitySubmissionInput[] | NoteUncheckedCreateWithoutEligibilitySubmissionInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutEligibilitySubmissionInput | NoteCreateOrConnectWithoutEligibilitySubmissionInput[]
    createMany?: NoteCreateManyEligibilitySubmissionInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutEligibilitySubmissionInput = {
    create?: XOR<NoteCreateWithoutEligibilitySubmissionInput, NoteUncheckedCreateWithoutEligibilitySubmissionInput> | NoteCreateWithoutEligibilitySubmissionInput[] | NoteUncheckedCreateWithoutEligibilitySubmissionInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutEligibilitySubmissionInput | NoteCreateOrConnectWithoutEligibilitySubmissionInput[]
    createMany?: NoteCreateManyEligibilitySubmissionInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type NoteUpdateManyWithoutEligibilitySubmissionNestedInput = {
    create?: XOR<NoteCreateWithoutEligibilitySubmissionInput, NoteUncheckedCreateWithoutEligibilitySubmissionInput> | NoteCreateWithoutEligibilitySubmissionInput[] | NoteUncheckedCreateWithoutEligibilitySubmissionInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutEligibilitySubmissionInput | NoteCreateOrConnectWithoutEligibilitySubmissionInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutEligibilitySubmissionInput | NoteUpsertWithWhereUniqueWithoutEligibilitySubmissionInput[]
    createMany?: NoteCreateManyEligibilitySubmissionInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutEligibilitySubmissionInput | NoteUpdateWithWhereUniqueWithoutEligibilitySubmissionInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutEligibilitySubmissionInput | NoteUpdateManyWithWhereWithoutEligibilitySubmissionInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type NoteUncheckedUpdateManyWithoutEligibilitySubmissionNestedInput = {
    create?: XOR<NoteCreateWithoutEligibilitySubmissionInput, NoteUncheckedCreateWithoutEligibilitySubmissionInput> | NoteCreateWithoutEligibilitySubmissionInput[] | NoteUncheckedCreateWithoutEligibilitySubmissionInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutEligibilitySubmissionInput | NoteCreateOrConnectWithoutEligibilitySubmissionInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutEligibilitySubmissionInput | NoteUpsertWithWhereUniqueWithoutEligibilitySubmissionInput[]
    createMany?: NoteCreateManyEligibilitySubmissionInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutEligibilitySubmissionInput | NoteUpdateWithWhereUniqueWithoutEligibilitySubmissionInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutEligibilitySubmissionInput | NoteUpdateManyWithWhereWithoutEligibilitySubmissionInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type ResponseCreateNestedOneWithoutNotesInput = {
    create?: XOR<ResponseCreateWithoutNotesInput, ResponseUncheckedCreateWithoutNotesInput>
    connectOrCreate?: ResponseCreateOrConnectWithoutNotesInput
    connect?: ResponseWhereUniqueInput
  }

  export type EligibilitySubmissionCreateNestedOneWithoutNotesInput = {
    create?: XOR<EligibilitySubmissionCreateWithoutNotesInput, EligibilitySubmissionUncheckedCreateWithoutNotesInput>
    connectOrCreate?: EligibilitySubmissionCreateOrConnectWithoutNotesInput
    connect?: EligibilitySubmissionWhereUniqueInput
  }

  export type EnumNoteTypeFieldUpdateOperationsInput = {
    set?: $Enums.NoteType
  }

  export type ResponseUpdateOneWithoutNotesNestedInput = {
    create?: XOR<ResponseCreateWithoutNotesInput, ResponseUncheckedCreateWithoutNotesInput>
    connectOrCreate?: ResponseCreateOrConnectWithoutNotesInput
    upsert?: ResponseUpsertWithoutNotesInput
    disconnect?: ResponseWhereInput | boolean
    delete?: ResponseWhereInput | boolean
    connect?: ResponseWhereUniqueInput
    update?: XOR<XOR<ResponseUpdateToOneWithWhereWithoutNotesInput, ResponseUpdateWithoutNotesInput>, ResponseUncheckedUpdateWithoutNotesInput>
  }

  export type EligibilitySubmissionUpdateOneWithoutNotesNestedInput = {
    create?: XOR<EligibilitySubmissionCreateWithoutNotesInput, EligibilitySubmissionUncheckedCreateWithoutNotesInput>
    connectOrCreate?: EligibilitySubmissionCreateOrConnectWithoutNotesInput
    upsert?: EligibilitySubmissionUpsertWithoutNotesInput
    disconnect?: EligibilitySubmissionWhereInput | boolean
    delete?: EligibilitySubmissionWhereInput | boolean
    connect?: EligibilitySubmissionWhereUniqueInput
    update?: XOR<XOR<EligibilitySubmissionUpdateToOneWithWhereWithoutNotesInput, EligibilitySubmissionUpdateWithoutNotesInput>, EligibilitySubmissionUncheckedUpdateWithoutNotesInput>
  }

  export type NotificationCreaterecipientsInput = {
    set: string[]
  }

  export type NotificationCreatereadByInput = {
    set: string[]
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type NotificationUpdaterecipientsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NotificationUpdatereadByInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PaymentPartCreateNestedManyWithoutPaymentInput = {
    create?: XOR<PaymentPartCreateWithoutPaymentInput, PaymentPartUncheckedCreateWithoutPaymentInput> | PaymentPartCreateWithoutPaymentInput[] | PaymentPartUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: PaymentPartCreateOrConnectWithoutPaymentInput | PaymentPartCreateOrConnectWithoutPaymentInput[]
    createMany?: PaymentPartCreateManyPaymentInputEnvelope
    connect?: PaymentPartWhereUniqueInput | PaymentPartWhereUniqueInput[]
  }

  export type PaymentPartUncheckedCreateNestedManyWithoutPaymentInput = {
    create?: XOR<PaymentPartCreateWithoutPaymentInput, PaymentPartUncheckedCreateWithoutPaymentInput> | PaymentPartCreateWithoutPaymentInput[] | PaymentPartUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: PaymentPartCreateOrConnectWithoutPaymentInput | PaymentPartCreateOrConnectWithoutPaymentInput[]
    createMany?: PaymentPartCreateManyPaymentInputEnvelope
    connect?: PaymentPartWhereUniqueInput | PaymentPartWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PaymentPartUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<PaymentPartCreateWithoutPaymentInput, PaymentPartUncheckedCreateWithoutPaymentInput> | PaymentPartCreateWithoutPaymentInput[] | PaymentPartUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: PaymentPartCreateOrConnectWithoutPaymentInput | PaymentPartCreateOrConnectWithoutPaymentInput[]
    upsert?: PaymentPartUpsertWithWhereUniqueWithoutPaymentInput | PaymentPartUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: PaymentPartCreateManyPaymentInputEnvelope
    set?: PaymentPartWhereUniqueInput | PaymentPartWhereUniqueInput[]
    disconnect?: PaymentPartWhereUniqueInput | PaymentPartWhereUniqueInput[]
    delete?: PaymentPartWhereUniqueInput | PaymentPartWhereUniqueInput[]
    connect?: PaymentPartWhereUniqueInput | PaymentPartWhereUniqueInput[]
    update?: PaymentPartUpdateWithWhereUniqueWithoutPaymentInput | PaymentPartUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: PaymentPartUpdateManyWithWhereWithoutPaymentInput | PaymentPartUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: PaymentPartScalarWhereInput | PaymentPartScalarWhereInput[]
  }

  export type PaymentPartUncheckedUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<PaymentPartCreateWithoutPaymentInput, PaymentPartUncheckedCreateWithoutPaymentInput> | PaymentPartCreateWithoutPaymentInput[] | PaymentPartUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: PaymentPartCreateOrConnectWithoutPaymentInput | PaymentPartCreateOrConnectWithoutPaymentInput[]
    upsert?: PaymentPartUpsertWithWhereUniqueWithoutPaymentInput | PaymentPartUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: PaymentPartCreateManyPaymentInputEnvelope
    set?: PaymentPartWhereUniqueInput | PaymentPartWhereUniqueInput[]
    disconnect?: PaymentPartWhereUniqueInput | PaymentPartWhereUniqueInput[]
    delete?: PaymentPartWhereUniqueInput | PaymentPartWhereUniqueInput[]
    connect?: PaymentPartWhereUniqueInput | PaymentPartWhereUniqueInput[]
    update?: PaymentPartUpdateWithWhereUniqueWithoutPaymentInput | PaymentPartUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: PaymentPartUpdateManyWithWhereWithoutPaymentInput | PaymentPartUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: PaymentPartScalarWhereInput | PaymentPartScalarWhereInput[]
  }

  export type PaymentCreateNestedOneWithoutPartsInput = {
    create?: XOR<PaymentCreateWithoutPartsInput, PaymentUncheckedCreateWithoutPartsInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutPartsInput
    connect?: PaymentWhereUniqueInput
  }

  export type PaymentUpdateOneRequiredWithoutPartsNestedInput = {
    create?: XOR<PaymentCreateWithoutPartsInput, PaymentUncheckedCreateWithoutPartsInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutPartsInput
    upsert?: PaymentUpsertWithoutPartsInput
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutPartsInput, PaymentUpdateWithoutPartsInput>, PaymentUncheckedUpdateWithoutPartsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumResponseStageFilter<$PrismaModel = never> = {
    equals?: $Enums.ResponseStage | EnumResponseStageFieldRefInput<$PrismaModel>
    in?: $Enums.ResponseStage[] | ListEnumResponseStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResponseStage[] | ListEnumResponseStageFieldRefInput<$PrismaModel>
    not?: NestedEnumResponseStageFilter<$PrismaModel> | $Enums.ResponseStage
  }

  export type NestedEnumResponseStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResponseStage | EnumResponseStageFieldRefInput<$PrismaModel>
    in?: $Enums.ResponseStage[] | ListEnumResponseStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResponseStage[] | ListEnumResponseStageFieldRefInput<$PrismaModel>
    not?: NestedEnumResponseStageWithAggregatesFilter<$PrismaModel> | $Enums.ResponseStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResponseStageFilter<$PrismaModel>
    _max?: NestedEnumResponseStageFilter<$PrismaModel>
  }

  export type NestedEnumNoteTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NoteType | EnumNoteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NoteType[] | ListEnumNoteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NoteType[] | ListEnumNoteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNoteTypeFilter<$PrismaModel> | $Enums.NoteType
  }

  export type NestedEnumNoteTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NoteType | EnumNoteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NoteType[] | ListEnumNoteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NoteType[] | ListEnumNoteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNoteTypeWithAggregatesFilter<$PrismaModel> | $Enums.NoteType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNoteTypeFilter<$PrismaModel>
    _max?: NestedEnumNoteTypeFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    impersonator?: UserCreateNestedOneWithoutImpersonatedUsersInput
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    impersonatedBy?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutImpersonatorInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutImpersonatorInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutImpersonatorInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutImpersonatorInput, SessionUncheckedCreateWithoutImpersonatorInput>
  }

  export type SessionCreateManyImpersonatorInputEnvelope = {
    data: SessionCreateManyImpersonatorInput | SessionCreateManyImpersonatorInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    impersonatedBy?: StringNullableFilter<"Session"> | string | null
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutImpersonatorInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutImpersonatorInput, SessionUncheckedUpdateWithoutImpersonatorInput>
    create: XOR<SessionCreateWithoutImpersonatorInput, SessionUncheckedCreateWithoutImpersonatorInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutImpersonatorInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutImpersonatorInput, SessionUncheckedUpdateWithoutImpersonatorInput>
  }

  export type SessionUpdateManyWithWhereWithoutImpersonatorInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutImpersonatorInput>
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    impersonatedUsers?: SessionCreateNestedManyWithoutImpersonatorInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    impersonatedUsers?: SessionUncheckedCreateNestedManyWithoutImpersonatorInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    impersonatedUsers?: SessionUpdateManyWithoutImpersonatorNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    impersonatedUsers?: SessionUncheckedUpdateManyWithoutImpersonatorNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    impersonatedUsers?: SessionCreateNestedManyWithoutImpersonatorInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    impersonatedUsers?: SessionUncheckedCreateNestedManyWithoutImpersonatorInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserCreateWithoutImpersonatedUsersInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutImpersonatedUsersInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutImpersonatedUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutImpersonatedUsersInput, UserUncheckedCreateWithoutImpersonatedUsersInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    impersonatedUsers?: SessionUpdateManyWithoutImpersonatorNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    impersonatedUsers?: SessionUncheckedUpdateManyWithoutImpersonatorNestedInput
  }

  export type UserUpsertWithoutImpersonatedUsersInput = {
    update: XOR<UserUpdateWithoutImpersonatedUsersInput, UserUncheckedUpdateWithoutImpersonatedUsersInput>
    create: XOR<UserCreateWithoutImpersonatedUsersInput, UserUncheckedCreateWithoutImpersonatedUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutImpersonatedUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutImpersonatedUsersInput, UserUncheckedUpdateWithoutImpersonatedUsersInput>
  }

  export type UserUpdateWithoutImpersonatedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutImpersonatedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CourseCreateWithoutSectionInput = {
    id?: string
    title: string
    metaTitle: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    description: string
    jobOpportunity: string
    entryRequirement: string
    packagingRule: string
    coreUnits: string
    electiveUnits: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: UserReviewCreateNestedManyWithoutPurchasedCourseInput
  }

  export type CourseUncheckedCreateWithoutSectionInput = {
    id?: string
    title: string
    metaTitle: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    description: string
    jobOpportunity: string
    entryRequirement: string
    packagingRule: string
    coreUnits: string
    electiveUnits: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: UserReviewUncheckedCreateNestedManyWithoutPurchasedCourseInput
  }

  export type CourseCreateOrConnectWithoutSectionInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutSectionInput, CourseUncheckedCreateWithoutSectionInput>
  }

  export type CourseCreateManySectionInputEnvelope = {
    data: CourseCreateManySectionInput | CourseCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithWhereUniqueWithoutSectionInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutSectionInput, CourseUncheckedUpdateWithoutSectionInput>
    create: XOR<CourseCreateWithoutSectionInput, CourseUncheckedCreateWithoutSectionInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutSectionInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutSectionInput, CourseUncheckedUpdateWithoutSectionInput>
  }

  export type CourseUpdateManyWithWhereWithoutSectionInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutSectionInput>
  }

  export type CourseScalarWhereInput = {
    AND?: CourseScalarWhereInput | CourseScalarWhereInput[]
    OR?: CourseScalarWhereInput[]
    NOT?: CourseScalarWhereInput | CourseScalarWhereInput[]
    id?: StringFilter<"Course"> | string
    title?: StringFilter<"Course"> | string
    metaTitle?: StringFilter<"Course"> | string
    metaDescription?: StringFilter<"Course"> | string
    index?: IntFilter<"Course"> | number
    imageSquareLink?: StringFilter<"Course"> | string
    imageSquarePublicId?: StringFilter<"Course"> | string
    imageCoverLink?: StringFilter<"Course"> | string
    imageCoverPublicId?: StringFilter<"Course"> | string
    description?: StringFilter<"Course"> | string
    jobOpportunity?: StringFilter<"Course"> | string
    entryRequirement?: StringFilter<"Course"> | string
    packagingRule?: StringFilter<"Course"> | string
    coreUnits?: StringFilter<"Course"> | string
    electiveUnits?: StringFilter<"Course"> | string
    link?: StringFilter<"Course"> | string
    sectionId?: StringFilter<"Course"> | string
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
  }

  export type SectionCreateWithoutCoursesInput = {
    id?: string
    title: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectionUncheckedCreateWithoutCoursesInput = {
    id?: string
    title: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectionCreateOrConnectWithoutCoursesInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutCoursesInput, SectionUncheckedCreateWithoutCoursesInput>
  }

  export type UserReviewCreateWithoutPurchasedCourseInput = {
    id?: string
    userName: string
    userImage?: string | null
    reviewImage?: string | null
    reviewText: string
    givenStar: number
    approved?: boolean
    reviewDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserReviewUncheckedCreateWithoutPurchasedCourseInput = {
    id?: string
    userName: string
    userImage?: string | null
    reviewImage?: string | null
    reviewText: string
    givenStar: number
    approved?: boolean
    reviewDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserReviewCreateOrConnectWithoutPurchasedCourseInput = {
    where: UserReviewWhereUniqueInput
    create: XOR<UserReviewCreateWithoutPurchasedCourseInput, UserReviewUncheckedCreateWithoutPurchasedCourseInput>
  }

  export type UserReviewCreateManyPurchasedCourseInputEnvelope = {
    data: UserReviewCreateManyPurchasedCourseInput | UserReviewCreateManyPurchasedCourseInput[]
    skipDuplicates?: boolean
  }

  export type SectionUpsertWithoutCoursesInput = {
    update: XOR<SectionUpdateWithoutCoursesInput, SectionUncheckedUpdateWithoutCoursesInput>
    create: XOR<SectionCreateWithoutCoursesInput, SectionUncheckedCreateWithoutCoursesInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutCoursesInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutCoursesInput, SectionUncheckedUpdateWithoutCoursesInput>
  }

  export type SectionUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionUncheckedUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReviewUpsertWithWhereUniqueWithoutPurchasedCourseInput = {
    where: UserReviewWhereUniqueInput
    update: XOR<UserReviewUpdateWithoutPurchasedCourseInput, UserReviewUncheckedUpdateWithoutPurchasedCourseInput>
    create: XOR<UserReviewCreateWithoutPurchasedCourseInput, UserReviewUncheckedCreateWithoutPurchasedCourseInput>
  }

  export type UserReviewUpdateWithWhereUniqueWithoutPurchasedCourseInput = {
    where: UserReviewWhereUniqueInput
    data: XOR<UserReviewUpdateWithoutPurchasedCourseInput, UserReviewUncheckedUpdateWithoutPurchasedCourseInput>
  }

  export type UserReviewUpdateManyWithWhereWithoutPurchasedCourseInput = {
    where: UserReviewScalarWhereInput
    data: XOR<UserReviewUpdateManyMutationInput, UserReviewUncheckedUpdateManyWithoutPurchasedCourseInput>
  }

  export type UserReviewScalarWhereInput = {
    AND?: UserReviewScalarWhereInput | UserReviewScalarWhereInput[]
    OR?: UserReviewScalarWhereInput[]
    NOT?: UserReviewScalarWhereInput | UserReviewScalarWhereInput[]
    id?: StringFilter<"UserReview"> | string
    purchasedCourseId?: StringFilter<"UserReview"> | string
    userName?: StringFilter<"UserReview"> | string
    userImage?: StringNullableFilter<"UserReview"> | string | null
    reviewImage?: StringNullableFilter<"UserReview"> | string | null
    reviewText?: StringFilter<"UserReview"> | string
    givenStar?: IntFilter<"UserReview"> | number
    approved?: BoolFilter<"UserReview"> | boolean
    reviewDate?: DateTimeFilter<"UserReview"> | Date | string
    createdAt?: DateTimeFilter<"UserReview"> | Date | string
    updatedAt?: DateTimeFilter<"UserReview"> | Date | string
  }

  export type CourseCreateWithoutReviewsInput = {
    id?: string
    title: string
    metaTitle: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    description: string
    jobOpportunity: string
    entryRequirement: string
    packagingRule: string
    coreUnits: string
    electiveUnits: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    section: SectionCreateNestedOneWithoutCoursesInput
  }

  export type CourseUncheckedCreateWithoutReviewsInput = {
    id?: string
    title: string
    metaTitle: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    description: string
    jobOpportunity: string
    entryRequirement: string
    packagingRule: string
    coreUnits: string
    electiveUnits: string
    link: string
    sectionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseCreateOrConnectWithoutReviewsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutReviewsInput, CourseUncheckedCreateWithoutReviewsInput>
  }

  export type CourseUpsertWithoutReviewsInput = {
    update: XOR<CourseUpdateWithoutReviewsInput, CourseUncheckedUpdateWithoutReviewsInput>
    create: XOR<CourseCreateWithoutReviewsInput, CourseUncheckedCreateWithoutReviewsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutReviewsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutReviewsInput, CourseUncheckedUpdateWithoutReviewsInput>
  }

  export type CourseUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaTitle?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    jobOpportunity?: StringFieldUpdateOperationsInput | string
    entryRequirement?: StringFieldUpdateOperationsInput | string
    packagingRule?: StringFieldUpdateOperationsInput | string
    coreUnits?: StringFieldUpdateOperationsInput | string
    electiveUnits?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    section?: SectionUpdateOneRequiredWithoutCoursesNestedInput
  }

  export type CourseUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaTitle?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    jobOpportunity?: StringFieldUpdateOperationsInput | string
    entryRequirement?: StringFieldUpdateOperationsInput | string
    packagingRule?: StringFieldUpdateOperationsInput | string
    coreUnits?: StringFieldUpdateOperationsInput | string
    electiveUnits?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteCreateWithoutResponseInput = {
    id?: string
    content: string
    createdAt?: Date | string
    noteType: $Enums.NoteType
    eligibilitySubmission?: EligibilitySubmissionCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateWithoutResponseInput = {
    id?: string
    content: string
    createdAt?: Date | string
    eligibilitySubmissionId?: string | null
    noteType: $Enums.NoteType
  }

  export type NoteCreateOrConnectWithoutResponseInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutResponseInput, NoteUncheckedCreateWithoutResponseInput>
  }

  export type NoteCreateManyResponseInputEnvelope = {
    data: NoteCreateManyResponseInput | NoteCreateManyResponseInput[]
    skipDuplicates?: boolean
  }

  export type NoteUpsertWithWhereUniqueWithoutResponseInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutResponseInput, NoteUncheckedUpdateWithoutResponseInput>
    create: XOR<NoteCreateWithoutResponseInput, NoteUncheckedCreateWithoutResponseInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutResponseInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutResponseInput, NoteUncheckedUpdateWithoutResponseInput>
  }

  export type NoteUpdateManyWithWhereWithoutResponseInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutResponseInput>
  }

  export type NoteScalarWhereInput = {
    AND?: NoteScalarWhereInput | NoteScalarWhereInput[]
    OR?: NoteScalarWhereInput[]
    NOT?: NoteScalarWhereInput | NoteScalarWhereInput[]
    id?: StringFilter<"Note"> | string
    content?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    responseId?: StringNullableFilter<"Note"> | string | null
    eligibilitySubmissionId?: StringNullableFilter<"Note"> | string | null
    noteType?: EnumNoteTypeFilter<"Note"> | $Enums.NoteType
  }

  export type NoteCreateWithoutEligibilitySubmissionInput = {
    id?: string
    content: string
    createdAt?: Date | string
    noteType: $Enums.NoteType
    response?: ResponseCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateWithoutEligibilitySubmissionInput = {
    id?: string
    content: string
    createdAt?: Date | string
    responseId?: string | null
    noteType: $Enums.NoteType
  }

  export type NoteCreateOrConnectWithoutEligibilitySubmissionInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutEligibilitySubmissionInput, NoteUncheckedCreateWithoutEligibilitySubmissionInput>
  }

  export type NoteCreateManyEligibilitySubmissionInputEnvelope = {
    data: NoteCreateManyEligibilitySubmissionInput | NoteCreateManyEligibilitySubmissionInput[]
    skipDuplicates?: boolean
  }

  export type NoteUpsertWithWhereUniqueWithoutEligibilitySubmissionInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutEligibilitySubmissionInput, NoteUncheckedUpdateWithoutEligibilitySubmissionInput>
    create: XOR<NoteCreateWithoutEligibilitySubmissionInput, NoteUncheckedCreateWithoutEligibilitySubmissionInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutEligibilitySubmissionInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutEligibilitySubmissionInput, NoteUncheckedUpdateWithoutEligibilitySubmissionInput>
  }

  export type NoteUpdateManyWithWhereWithoutEligibilitySubmissionInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutEligibilitySubmissionInput>
  }

  export type ResponseCreateWithoutNotesInput = {
    id?: string
    name: string
    phone: string
    email: string
    message?: string | null
    interest?: string | null
    createdAt?: Date | string
    stage?: $Enums.ResponseStage
  }

  export type ResponseUncheckedCreateWithoutNotesInput = {
    id?: string
    name: string
    phone: string
    email: string
    message?: string | null
    interest?: string | null
    createdAt?: Date | string
    stage?: $Enums.ResponseStage
  }

  export type ResponseCreateOrConnectWithoutNotesInput = {
    where: ResponseWhereUniqueInput
    create: XOR<ResponseCreateWithoutNotesInput, ResponseUncheckedCreateWithoutNotesInput>
  }

  export type EligibilitySubmissionCreateWithoutNotesInput = {
    id?: string
    fullName: string
    email: string
    phoneNumber: string
    industry: string
    qualification: string
    yearsOfExperience: number
    stateLivedIn: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EligibilitySubmissionUncheckedCreateWithoutNotesInput = {
    id?: string
    fullName: string
    email: string
    phoneNumber: string
    industry: string
    qualification: string
    yearsOfExperience: number
    stateLivedIn: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EligibilitySubmissionCreateOrConnectWithoutNotesInput = {
    where: EligibilitySubmissionWhereUniqueInput
    create: XOR<EligibilitySubmissionCreateWithoutNotesInput, EligibilitySubmissionUncheckedCreateWithoutNotesInput>
  }

  export type ResponseUpsertWithoutNotesInput = {
    update: XOR<ResponseUpdateWithoutNotesInput, ResponseUncheckedUpdateWithoutNotesInput>
    create: XOR<ResponseCreateWithoutNotesInput, ResponseUncheckedCreateWithoutNotesInput>
    where?: ResponseWhereInput
  }

  export type ResponseUpdateToOneWithWhereWithoutNotesInput = {
    where?: ResponseWhereInput
    data: XOR<ResponseUpdateWithoutNotesInput, ResponseUncheckedUpdateWithoutNotesInput>
  }

  export type ResponseUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    interest?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stage?: EnumResponseStageFieldUpdateOperationsInput | $Enums.ResponseStage
  }

  export type ResponseUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    interest?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stage?: EnumResponseStageFieldUpdateOperationsInput | $Enums.ResponseStage
  }

  export type EligibilitySubmissionUpsertWithoutNotesInput = {
    update: XOR<EligibilitySubmissionUpdateWithoutNotesInput, EligibilitySubmissionUncheckedUpdateWithoutNotesInput>
    create: XOR<EligibilitySubmissionCreateWithoutNotesInput, EligibilitySubmissionUncheckedCreateWithoutNotesInput>
    where?: EligibilitySubmissionWhereInput
  }

  export type EligibilitySubmissionUpdateToOneWithWhereWithoutNotesInput = {
    where?: EligibilitySubmissionWhereInput
    data: XOR<EligibilitySubmissionUpdateWithoutNotesInput, EligibilitySubmissionUncheckedUpdateWithoutNotesInput>
  }

  export type EligibilitySubmissionUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    qualification?: StringFieldUpdateOperationsInput | string
    yearsOfExperience?: IntFieldUpdateOperationsInput | number
    stateLivedIn?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EligibilitySubmissionUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    qualification?: StringFieldUpdateOperationsInput | string
    yearsOfExperience?: IntFieldUpdateOperationsInput | number
    stateLivedIn?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentPartCreateWithoutPaymentInput = {
    id?: string
    amount: number
    paidAt?: Date | string
  }

  export type PaymentPartUncheckedCreateWithoutPaymentInput = {
    id?: string
    amount: number
    paidAt?: Date | string
  }

  export type PaymentPartCreateOrConnectWithoutPaymentInput = {
    where: PaymentPartWhereUniqueInput
    create: XOR<PaymentPartCreateWithoutPaymentInput, PaymentPartUncheckedCreateWithoutPaymentInput>
  }

  export type PaymentPartCreateManyPaymentInputEnvelope = {
    data: PaymentPartCreateManyPaymentInput | PaymentPartCreateManyPaymentInput[]
    skipDuplicates?: boolean
  }

  export type PaymentPartUpsertWithWhereUniqueWithoutPaymentInput = {
    where: PaymentPartWhereUniqueInput
    update: XOR<PaymentPartUpdateWithoutPaymentInput, PaymentPartUncheckedUpdateWithoutPaymentInput>
    create: XOR<PaymentPartCreateWithoutPaymentInput, PaymentPartUncheckedCreateWithoutPaymentInput>
  }

  export type PaymentPartUpdateWithWhereUniqueWithoutPaymentInput = {
    where: PaymentPartWhereUniqueInput
    data: XOR<PaymentPartUpdateWithoutPaymentInput, PaymentPartUncheckedUpdateWithoutPaymentInput>
  }

  export type PaymentPartUpdateManyWithWhereWithoutPaymentInput = {
    where: PaymentPartScalarWhereInput
    data: XOR<PaymentPartUpdateManyMutationInput, PaymentPartUncheckedUpdateManyWithoutPaymentInput>
  }

  export type PaymentPartScalarWhereInput = {
    AND?: PaymentPartScalarWhereInput | PaymentPartScalarWhereInput[]
    OR?: PaymentPartScalarWhereInput[]
    NOT?: PaymentPartScalarWhereInput | PaymentPartScalarWhereInput[]
    id?: StringFilter<"PaymentPart"> | string
    amount?: FloatFilter<"PaymentPart"> | number
    paidAt?: DateTimeFilter<"PaymentPart"> | Date | string
    paymentId?: StringFilter<"PaymentPart"> | string
  }

  export type PaymentCreateWithoutPartsInput = {
    id?: string
    name: string
    qualification: string
    phoneNumber: string
    email: string
    source: string
    collegeName: string
    courseFee: number
    paymentStatus: string
    payment?: number
    collegePayment?: number
    agentCommission?: number
    bankCommission?: number
    netProfit?: number
    enrollmentDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    additionalNote?: string | null
  }

  export type PaymentUncheckedCreateWithoutPartsInput = {
    id?: string
    name: string
    qualification: string
    phoneNumber: string
    email: string
    source: string
    collegeName: string
    courseFee: number
    paymentStatus: string
    payment?: number
    collegePayment?: number
    agentCommission?: number
    bankCommission?: number
    netProfit?: number
    enrollmentDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    additionalNote?: string | null
  }

  export type PaymentCreateOrConnectWithoutPartsInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutPartsInput, PaymentUncheckedCreateWithoutPartsInput>
  }

  export type PaymentUpsertWithoutPartsInput = {
    update: XOR<PaymentUpdateWithoutPartsInput, PaymentUncheckedUpdateWithoutPartsInput>
    create: XOR<PaymentCreateWithoutPartsInput, PaymentUncheckedCreateWithoutPartsInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutPartsInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutPartsInput, PaymentUncheckedUpdateWithoutPartsInput>
  }

  export type PaymentUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qualification?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    courseFee?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: StringFieldUpdateOperationsInput | string
    payment?: FloatFieldUpdateOperationsInput | number
    collegePayment?: FloatFieldUpdateOperationsInput | number
    agentCommission?: FloatFieldUpdateOperationsInput | number
    bankCommission?: FloatFieldUpdateOperationsInput | number
    netProfit?: FloatFieldUpdateOperationsInput | number
    enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalNote?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentUncheckedUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    qualification?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    collegeName?: StringFieldUpdateOperationsInput | string
    courseFee?: FloatFieldUpdateOperationsInput | number
    paymentStatus?: StringFieldUpdateOperationsInput | string
    payment?: FloatFieldUpdateOperationsInput | number
    collegePayment?: FloatFieldUpdateOperationsInput | number
    agentCommission?: FloatFieldUpdateOperationsInput | number
    bankCommission?: FloatFieldUpdateOperationsInput | number
    netProfit?: FloatFieldUpdateOperationsInput | number
    enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalNote?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    impersonatedBy?: string | null
  }

  export type AccountCreateManyUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    idToken?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyImpersonatorInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    impersonator?: UserUpdateOneWithoutImpersonatedUsersNestedInput
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    impersonatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutImpersonatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutImpersonatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutImpersonatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateManySectionInput = {
    id?: string
    title: string
    metaTitle: string
    metaDescription: string
    index: number
    imageSquareLink: string
    imageSquarePublicId: string
    imageCoverLink: string
    imageCoverPublicId: string
    description: string
    jobOpportunity: string
    entryRequirement: string
    packagingRule: string
    coreUnits: string
    electiveUnits: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateWithoutSectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaTitle?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    jobOpportunity?: StringFieldUpdateOperationsInput | string
    entryRequirement?: StringFieldUpdateOperationsInput | string
    packagingRule?: StringFieldUpdateOperationsInput | string
    coreUnits?: StringFieldUpdateOperationsInput | string
    electiveUnits?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: UserReviewUpdateManyWithoutPurchasedCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutSectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaTitle?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    jobOpportunity?: StringFieldUpdateOperationsInput | string
    entryRequirement?: StringFieldUpdateOperationsInput | string
    packagingRule?: StringFieldUpdateOperationsInput | string
    coreUnits?: StringFieldUpdateOperationsInput | string
    electiveUnits?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: UserReviewUncheckedUpdateManyWithoutPurchasedCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutSectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    metaTitle?: StringFieldUpdateOperationsInput | string
    metaDescription?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    imageSquareLink?: StringFieldUpdateOperationsInput | string
    imageSquarePublicId?: StringFieldUpdateOperationsInput | string
    imageCoverLink?: StringFieldUpdateOperationsInput | string
    imageCoverPublicId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    jobOpportunity?: StringFieldUpdateOperationsInput | string
    entryRequirement?: StringFieldUpdateOperationsInput | string
    packagingRule?: StringFieldUpdateOperationsInput | string
    coreUnits?: StringFieldUpdateOperationsInput | string
    electiveUnits?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReviewCreateManyPurchasedCourseInput = {
    id?: string
    userName: string
    userImage?: string | null
    reviewImage?: string | null
    reviewText: string
    givenStar: number
    approved?: boolean
    reviewDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserReviewUpdateWithoutPurchasedCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewText?: StringFieldUpdateOperationsInput | string
    givenStar?: IntFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReviewUncheckedUpdateWithoutPurchasedCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewText?: StringFieldUpdateOperationsInput | string
    givenStar?: IntFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserReviewUncheckedUpdateManyWithoutPurchasedCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewImage?: NullableStringFieldUpdateOperationsInput | string | null
    reviewText?: StringFieldUpdateOperationsInput | string
    givenStar?: IntFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteCreateManyResponseInput = {
    id?: string
    content: string
    createdAt?: Date | string
    eligibilitySubmissionId?: string | null
    noteType: $Enums.NoteType
  }

  export type NoteUpdateWithoutResponseInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    noteType?: EnumNoteTypeFieldUpdateOperationsInput | $Enums.NoteType
    eligibilitySubmission?: EligibilitySubmissionUpdateOneWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateWithoutResponseInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibilitySubmissionId?: NullableStringFieldUpdateOperationsInput | string | null
    noteType?: EnumNoteTypeFieldUpdateOperationsInput | $Enums.NoteType
  }

  export type NoteUncheckedUpdateManyWithoutResponseInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibilitySubmissionId?: NullableStringFieldUpdateOperationsInput | string | null
    noteType?: EnumNoteTypeFieldUpdateOperationsInput | $Enums.NoteType
  }

  export type NoteCreateManyEligibilitySubmissionInput = {
    id?: string
    content: string
    createdAt?: Date | string
    responseId?: string | null
    noteType: $Enums.NoteType
  }

  export type NoteUpdateWithoutEligibilitySubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    noteType?: EnumNoteTypeFieldUpdateOperationsInput | $Enums.NoteType
    response?: ResponseUpdateOneWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateWithoutEligibilitySubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responseId?: NullableStringFieldUpdateOperationsInput | string | null
    noteType?: EnumNoteTypeFieldUpdateOperationsInput | $Enums.NoteType
  }

  export type NoteUncheckedUpdateManyWithoutEligibilitySubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    responseId?: NullableStringFieldUpdateOperationsInput | string | null
    noteType?: EnumNoteTypeFieldUpdateOperationsInput | $Enums.NoteType
  }

  export type PaymentPartCreateManyPaymentInput = {
    id?: string
    amount: number
    paidAt?: Date | string
  }

  export type PaymentPartUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentPartUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentPartUncheckedUpdateManyWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}