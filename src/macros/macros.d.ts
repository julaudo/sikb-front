declare module 'macros' {
    import RequireContext = __WebpackModuleApi.RequireContext;

    function requireContext2(path: string, deep?: boolean, filter?: RegExp, mode?: "sync" | "eager" | "weak" | "lazy" | "lazy-once"): RequireContext;
}
