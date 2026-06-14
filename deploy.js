import archiver from 'archiver';
import { createWriteStream } from 'fs';

const output = createWriteStream('YouTabMan.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => console.log('EXCELLENT'));
archive.on('error', (err) => console.error('oh no!', err));

archive.pipe(output);
archive.directory('dist/', false);
archive.finalize();
