import { defineConfig } from 'vitest/config';
import { resolve } from 'path'

export default defineConfig({
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	build: {
		lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'DagDB',
      // the proper extensions will be added
      fileName: 'dag-db',
    },
		rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["@duckdb/duckdb-wasm"],
	}
  }
});
