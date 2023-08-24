import { join } from 'path';

export const PACKAGE_ROOT = join(__dirname, '..');

export const RUNTIME_PATH = join(PACKAGE_ROOT, 'src', 'runtime');

export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, 'template.html');

export const CLIENT_ENTRY_PATH = join(RUNTIME_PATH, 'client-entry.tsx');

export const SERVER_ENTRY_PATH = join(RUNTIME_PATH, 'ssr-entry.tsx');

export const PUBLIC_DIR = '.island/public';

export const MD_REGEX = /\.mdx?$/;

export const MASK_SPLITTER = '!!ISLAND!!';

export const CLIENT_OUTPUT = 'build';
