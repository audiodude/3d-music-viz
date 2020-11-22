import { read, MidiFile } from 'midifile-ts';

export function getMidi(): Promise<MidiFile> {
  return fetch('http://localhost:5000/midi/test.mid')
    .then((r: Response) => r.arrayBuffer())
    .then((buf: ArrayBuffer) => {
      return read(buf);
    });
}
