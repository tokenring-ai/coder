declare module "bun:sqlite" {
  const mod: any;
  export = mod;
}

declare module "*.sql" {
  const sql: string;
  export default sql;
}
