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
      external: ['@sveltejs/kit', 'svelte'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          svelte: 'Svelte',
					'@sveltejs/kit': 'kit',
        },
      },
    },
	}
});
