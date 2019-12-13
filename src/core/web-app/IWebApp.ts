export default interface IWebApp {
    setup(): void
    start(): Promise<void>
    stop(): Promise<void>
}
