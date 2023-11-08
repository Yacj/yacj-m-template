import path from 'node:path'
import process from 'node:process'
import Unocss from 'unocss/vite'
import type { PluginOption } from 'vite'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import visualizer from 'rollup-plugin-visualizer'
import Vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default function createVitePlugins(viteEnv: any, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    Vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: './src/types/auto-imports.d.ts',
      dirs: [
        './src/utils/composables/**',
      ],
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: './src/types/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      dirs: ['src/components'],
    }),
    // https://github.com/antfu/unocss
    Unocss(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: isBuild,
    }),
  ]
  if (isBuild) {
    vitePlugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as PluginOption,
    )
  }
  return vitePlugins
}
