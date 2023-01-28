// Allow PNG's to be used as components and bundle them to optimize them

declare module "*.png" {
  const value: any;
  export default value;
}