import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import babel from '@rollup/plugin-babel';

// Client build configuration
const clientConfig = {
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
            jsx: "preserve"
        }),
        babel({
            babelHelpers: 'bundled',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            presets: [
                '@babel/preset-react'
            ]
        }),
        resolve({
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }),
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

// Server build configuration
const serverConfig = {
    input: 'server/index.ts',
    output: {
        file: 'dist/server.js',
        format: 'esm',
        sourcemap: true
    },
    external: ['ws', 'http'],
    plugins: [
        typescript({
            tsconfig: "server/tsconfig.json",
            compilerOptions: {
                target: "ESNext",
            }
        }),
        resolve({
            preferBuiltins: true
        }),
        commonjs()
    ]
};

export default [clientConfig, serverConfig];
