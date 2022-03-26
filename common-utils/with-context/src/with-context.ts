
export const createCtx = <R>(prop: string, fn: () => R) => ({
    [prop]: fn()
});

export const createCtxAwait = <P, R>(prop: keyof P, fn: () => Promise<R>) =>
    fn().then(x => ({[prop]: x} as Record<keyof P, R>));

export const withCtxAwait = <Cout, Cin, R>(prop: keyof Cout, fn: (ctx: Cin) => PromiseLike<R>) => (ctx: Cin) =>
    fn(ctx)
        .then((x: R) => ({...ctx, ...{[prop]: x} as Record<keyof Cout, R>}));


export const withCtx = <X, T, R>(prop: keyof X, fn: (v: T) => R) => (ctx: T) => ({
    ...ctx,
    ...{[prop]: fn(ctx)} as Record<keyof X, R>
})

