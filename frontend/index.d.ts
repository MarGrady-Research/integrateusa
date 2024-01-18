declare module "*.module.css";
declare module "*.module.scss";
declare module "*.scss" {
  const content: { [key: string]: any };
  export = content;
}
