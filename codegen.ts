
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: ".sf",
  documents: "h",
  generates: {
    "_ge": {
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
