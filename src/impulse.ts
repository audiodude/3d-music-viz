import * as THREE from "three";
import { AnyEvent, Event, MidiFile, NoteOnEvent } from "midifile-ts";

export class Impulse {
  ticksPerSecond: number;
  elapsedTicks: number = 0;
  channelEvents: Event<"channel">[];
  nextDelta: number;
  on: boolean = false;

  constructor(
    private readonly midi: MidiFile,
    private readonly clock: THREE.Clock
  ) {
    this.ticksPerSecond = midi.header.ticksPerBeat * 2; // Hardcode 120 BPM.
    this.channelEvents = midi.tracks[0].filter((evt) => {
      return evt.type === "channel";
    }) as Event<"channel">[];
    this.nextDelta = this.channelEvents[0].deltaTime;
  }

  update(clockDelta: number) {
    if (this.channelEvents.length == 0) {
      return;
    }

    this.elapsedTicks += clockDelta * this.ticksPerSecond;
    if (this.elapsedTicks >= this.nextDelta) {
      this.elapsedTicks = 0;

      // Both NoteOnEvent and NoteOffEvent have the same fields, so just cast.
      const evt = this.channelEvents.shift() as NoteOnEvent;
      if (evt.subtype == "noteOn") {
        this.on = true;
      } else if (evt.subtype == "noteOff") {
        this.on = false;
      }
      const nextEvt = this.channelEvents[0];
      if (nextEvt) {
        this.nextDelta = nextEvt.deltaTime;
      }
    }
  }
}
