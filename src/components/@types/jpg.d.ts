// Allow JPG's to be used as components and bundle them to optimize them

declare module "*.jpg" {
    const value: any;
    export default value;
}