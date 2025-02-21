import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";

export default {
    input: 'src/index.tsx',
    output: {
        file: 'dist/index.js',
        format: 'iife',
        name: 'whiteboard',
        sourcemap: true
    },
    plugins: [
        replace({
            preventAssignment: true,
            values: {
                'process.env.NODE_ENV': JSON.stringify('development')
            }
        }),
        typescript({
            tsconfig: "tsconfig.json",
            compilerOptions: {
                jsx: "react"
            }
        }),
        resolve(),
        commonjs(),
        postcss({
            extract: 'index.css',
            modules: false,
            config: true,
        }),
        copy({
            targets: [
                {src: "./public/**/*", dest: "dist"},
            ]
        })
    ]
};
