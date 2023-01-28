// Allow JPEG's to be used as components and bundle them to optimize them

declare module "*.jpeg" {
    const value: any;
    export default value;
}