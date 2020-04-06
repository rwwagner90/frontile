// Directories
// root:
//   -> docs
//   -> app/componennts/*.md
//   -> app/componennts/**/demo/*.md
//
//
// frontile
//  docs
//    - install.md
//    - whatever.md
//  packages/
//    forms/
//      docs/
//        - install.md
//        - styles.md
//      addon/components/*/
//        - name.md
//        demo/
//          - demo1.md
//          - demo2.md

import glob from 'glob';
import fs from 'fs';
import path from 'path';
import unified from 'unified';
import parse from 'remark-parse';
import frontmatter from 'remark-frontmatter';
import hbs from 'remark-hbs';
import html from 'remark-html';
import stringify from 'remark-stringify';
import visit from 'unist-util-visit';
import YAML from 'yaml';
import { Node } from 'unist';

interface Content {
  file: string;
  ast: Node;
  rendered: string;
  metadata: unknown;
}

const projectRoot = '../../../';

const stack = unified()
  .use(parse)
  .use(stringify)
  .use(frontmatter, [{ type: 'yaml', marker: '-' }])
  .use(hbs)
  .use(html);

const contents: Content[] = [];

function visitor(file: string, ast: Node): void {
  let metadata = {};

  visit(ast, 'yaml', (node) => {
    metadata = YAML.parse(node.value as string);
  });

  contents.push({
    file,
    ast,
    metadata,
    rendered: stack.stringify(ast)
  });
}

glob(
  '{/**/docs/**/*.md,/**/addon/**/*.md}',
  {
    root: path.resolve(__dirname, projectRoot),
    ignore: [
      '/**/node_modules/**',
      '/**/.git/**',
      '/**/tmp/**',
      '/**/dist/**',
      '/packages/docs/**' // TODO: Make this configurable
    ]
  },
  function (er, files) {
    files.forEach((file) => {
      const ast = stack.parse(fs.readFileSync(file));
      visitor(file, ast);
    });
    console.log(contents);
  }
);
