// Allow SVG's to be used as components and bundle them to optimize them

declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}