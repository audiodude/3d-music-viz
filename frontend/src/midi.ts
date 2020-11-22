import { read, MidiFile } from 'midifile-ts';

export function getMidi(): Promise<MidiFile> {
  return fetch('http://localhost:9000/static/test.mid')
    .then((r: Response) => r.arrayBuffer())
    .then((buf: ArrayBuffer) => {
      return read(buf);
    });
}
