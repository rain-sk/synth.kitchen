const aaa = {
  id: "c090f09e-77de-406a-b708-5f922d0c2b4c",
  name: "agile-able-attitude",
  slug: "agile-able-attitude-c090f09e",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 1 },
      },
      "94f09936-4ea8-4272-82d2-7f103d0c71bd": {
        name: "malicious-coordinated-clock",
        moduleKey: "94f09936-4ea8-4272-82d2-7f103d0c71bd",
        type: "CLOCK",
        state: { tempo: 120 },
      },
      "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf": {
        name: "lyrical-barbarous-envelope",
        moduleKey: "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf",
        type: "ENVELOPE",
        state: {
          gate: 0,
          attack: 100,
          decay: 1,
          sustain: 0,
          release: 0,
          peak: 100,
        },
      },
      "9701db09-b62d-4635-bafa-1fecb8c695a0": {
        name: "tall-mean-oscillator",
        moduleKey: "9701db09-b62d-4635-bafa-1fecb8c695a0",
        type: "OSCILLATOR",
        state: { frequency: 300, detune: 0, waveform: "square" },
      },
      "d3c65626-13b6-4fd0-96d7-cad136bd5b3f": {
        name: "private-true-sequencer",
        moduleKey: "d3c65626-13b6-4fd0-96d7-cad136bd5b3f",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: 1,
          step1: 1,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: 1,
          step6: 0,
          step7: 0,
        },
      },
      "bf28893b-fe9b-4385-9367-81d9deefec96": {
        name: "absent-habitual-vca",
        moduleKey: "bf28893b-fe9b-4385-9367-81d9deefec96",
        type: "VCA",
        state: {
          gate: 1,
          attack: 0,
          decay: 1,
          sustain: 1,
          release: 0.1,
          peak: 1,
        },
      },
      "c98da833-4498-478b-8a98-323fb400eb79": {
        name: "ritzy-distinct-filter",
        moduleKey: "c98da833-4498-478b-8a98-323fb400eb79",
        type: "FILTER",
        state: { frequency: 349, detune: 0, Q: 1, gain: 0, type: "lowpass" },
      },
      "50590d50-2888-4a2a-bffa-32e2c4bb2b92": {
        name: "measly-bizarre-gain",
        moduleKey: "50590d50-2888-4a2a-bffa-32e2c4bb2b92",
        type: "GAIN",
        state: { gain: 100 },
      },
    },
    modulePositions: {
      "0": [1964, 731],
      "94f09936-4ea8-4272-82d2-7f103d0c71bd": [394, 311],
      "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf": [781, 71],
      "9701db09-b62d-4635-bafa-1fecb8c695a0": [2058, 27],
      "d3c65626-13b6-4fd0-96d7-cad136bd5b3f": [805, 659],
      "bf28893b-fe9b-4385-9367-81d9deefec96": [1492, 776],
      "c98da833-4498-478b-8a98-323fb400eb79": [1527, 426],
      "50590d50-2888-4a2a-bffa-32e2c4bb2b92": [1528, 83],
    },
    connections: {
      "94f09936-4ea8-4272-82d2-7f103d0c71bd_1_0|d3c65626-13b6-4fd0-96d7-cad136bd5b3f_0_0":
        [
          {
            moduleKey: "94f09936-4ea8-4272-82d2-7f103d0c71bd",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d3c65626-13b6-4fd0-96d7-cad136bd5b3f",
            type: 0,
            channel: 0,
          },
        ],
      "d3c65626-13b6-4fd0-96d7-cad136bd5b3f_1_0|ae0fa3c1-7ca2-46a1-b138-b860e097f6cf_0_0":
        [
          {
            moduleKey: "d3c65626-13b6-4fd0-96d7-cad136bd5b3f",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf",
            type: 0,
            channel: 0,
          },
        ],
      "d3c65626-13b6-4fd0-96d7-cad136bd5b3f_1_0|bf28893b-fe9b-4385-9367-81d9deefec96_0_1":
        [
          {
            moduleKey: "d3c65626-13b6-4fd0-96d7-cad136bd5b3f",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "bf28893b-fe9b-4385-9367-81d9deefec96",
            type: 0,
            channel: 1,
          },
        ],
      "bf28893b-fe9b-4385-9367-81d9deefec96_1_0|0_0_0": [
        {
          moduleKey: "bf28893b-fe9b-4385-9367-81d9deefec96",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "9701db09-b62d-4635-bafa-1fecb8c695a0_1_0|c98da833-4498-478b-8a98-323fb400eb79_0_0":
        [
          {
            moduleKey: "9701db09-b62d-4635-bafa-1fecb8c695a0",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "c98da833-4498-478b-8a98-323fb400eb79",
            type: 0,
            channel: 0,
          },
        ],
      "c98da833-4498-478b-8a98-323fb400eb79_1_0|bf28893b-fe9b-4385-9367-81d9deefec96_0_0":
        [
          {
            moduleKey: "c98da833-4498-478b-8a98-323fb400eb79",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "bf28893b-fe9b-4385-9367-81d9deefec96",
            type: 0,
            channel: 0,
          },
        ],
      "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf_1_0|c98da833-4498-478b-8a98-323fb400eb79_frequency":
        [
          {
            moduleKey: "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "c98da833-4498-478b-8a98-323fb400eb79",
            name: "frequency",
          },
        ],
      "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf_1_0|9701db09-b62d-4635-bafa-1fecb8c695a0_frequency":
        [
          {
            moduleKey: "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "9701db09-b62d-4635-bafa-1fecb8c695a0",
            name: "frequency",
          },
        ],
      "50590d50-2888-4a2a-bffa-32e2c4bb2b92_1_0|9701db09-b62d-4635-bafa-1fecb8c695a0_frequency":
        [
          {
            moduleKey: "50590d50-2888-4a2a-bffa-32e2c4bb2b92",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "9701db09-b62d-4635-bafa-1fecb8c695a0",
            name: "frequency",
          },
        ],
      "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf_1_0|50590d50-2888-4a2a-bffa-32e2c4bb2b92_0_0":
        [
          {
            moduleKey: "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "50590d50-2888-4a2a-bffa-32e2c4bb2b92",
            type: 0,
            channel: 0,
          },
        ],
    },
  },
};

const nnn = {
  id: "36b2d091-41a0-43bd-a03f-efb660d5f44e",
  name: "nippy-numberless-nerve",
  slug: "nippy-numberless-nerve-36b2d091",
  state: {
    modules: {
      0: {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.45 },
      },
      "36088ccd-d2ec-4096-8acf-9c10621e4a01": {
        name: "dependent-nova-clock",
        moduleKey: "36088ccd-d2ec-4096-8acf-9c10621e4a01",
        type: "CLOCK",
        state: { tempo: 7800 },
      },
      "6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54": {
        name: "different-nippy-filter",
        moduleKey: "6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54",
        type: "FILTER",
        state: {
          frequency: 1400,
          detune: 0,
          Q: 0.25,
          gain: 0,
          type: "lowpass",
        },
      },
      "0af1e40b-3734-495f-8603-3d1d0ba5bbf7": {
        name: "acrid-gullible-clock",
        moduleKey: "0af1e40b-3734-495f-8603-3d1d0ba5bbf7",
        type: "CLOCK",
        state: { tempo: 7801 },
      },
      "7f44f633-84f3-447d-a9ff-44fa7d97bdec": {
        name: "caring-sleek-clock",
        moduleKey: "7f44f633-84f3-447d-a9ff-44fa7d97bdec",
        type: "CLOCK",
        state: { tempo: 7799 },
      },
      "846c44f7-6d85-49f1-bcf6-16fa91d8937e": {
        name: "foamy-weak-limiter",
        moduleKey: "846c44f7-6d85-49f1-bcf6-16fa91d8937e",
        type: "LIMITER",
        state: {},
      },
      "a948f2a6-ac8c-4f8a-8f3e-5f893a73d7a5": {
        name: "astonishing-evil-sequencer",
        moduleKey: "a948f2a6-ac8c-4f8a-8f3e-5f893a73d7a5",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: -3900,
          step1: 3900,
          step2: 0,
          step3: 7800,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "13d50ed7-ed30-449d-845b-e89dab6c2847": {
        name: "testy-exact-clock",
        moduleKey: "13d50ed7-ed30-449d-845b-e89dab6c2847",
        type: "CLOCK",
        state: { tempo: 132 },
      },
      "fcc86feb-daac-4b4c-abfe-aa90e6c57961": {
        name: "glamorous-paltry-oscillator",
        moduleKey: "fcc86feb-daac-4b4c-abfe-aa90e6c57961",
        type: "OSCILLATOR",
        state: { frequency: 880, detune: -200, waveform: "sine" },
      },
      "b583b7cb-fd77-4cf6-9479-a35f93237031": {
        name: "bold-festive-sequencer",
        moduleKey: "b583b7cb-fd77-4cf6-9479-a35f93237031",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: 0,
          step1: 0,
          step2: 0,
          step3: 400,
          step4: 490,
          step5: 90,
          step6: 0,
          step7: 200,
        },
      },
      "744bcf80-7543-4a69-a6b1-9b8318f6bd19": {
        name: "hurried-marvelous-filter",
        moduleKey: "744bcf80-7543-4a69-a6b1-9b8318f6bd19",
        type: "FILTER",
        state: { frequency: 10, detune: 0, Q: 0, gain: 0, type: "lowpass" },
      },
      "18170b62-5afa-4247-b1ed-c5e9b1a9f04f": {
        name: "adorable-handsome-filter",
        moduleKey: "18170b62-5afa-4247-b1ed-c5e9b1a9f04f",
        type: "FILTER",
        state: { frequency: 20, detune: 0, Q: 0, gain: 0, type: "lowpass" },
      },
      "7fd4b8c0-24d8-4293-bb6f-1a4e1a016efa": {
        name: "cosmic-adamant-vca",
        moduleKey: "7fd4b8c0-24d8-4293-bb6f-1a4e1a016efa",
        type: "VCA",
        state: {
          gate: 0.001,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.2,
          peak: 1,
        },
      },
      "2b4682fa-0219-4af2-af3a-ecd7079bd925": {
        name: "echo glitch",
        moduleKey: "2b4682fa-0219-4af2-af3a-ecd7079bd925",
        type: "OSCILLATOR",
        state: { frequency: 110, detune: -200, waveform: "sawtooth" },
      },
      "121cb261-5581-4207-b0c1-e7d84f167b85": {
        name: "temporary-drab-filter",
        moduleKey: "121cb261-5581-4207-b0c1-e7d84f167b85",
        type: "FILTER",
        state: { frequency: 350, detune: 0, Q: 0.5, gain: 0, type: "lowpass" },
      },
      "fe051c60-aeca-4701-9d41-5a39ace72085": {
        name: "giving-crabby-envelope",
        moduleKey: "fe051c60-aeca-4701-9d41-5a39ace72085",
        type: "ENVELOPE",
        state: {
          gate: 0.001,
          attack: 0.01,
          decay: 0,
          sustain: 1,
          release: 0.05,
          peak: 1200,
        },
      },
      "336aa2f1-3130-4cfd-a208-5bcc56398cc1": {
        name: "guided-ultra-delay",
        moduleKey: "336aa2f1-3130-4cfd-a208-5bcc56398cc1",
        type: "DELAY",
        state: { delayTime: 0.0195833333375 },
      },
      "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f": {
        name: "prompt-auspicious-gain",
        moduleKey: "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f",
        type: "GAIN",
        state: { gain: 0.2 },
      },
      "ab37a697-29b9-4f39-98fb-37dd6b45e99b": {
        name: "salty-spiffy-delay",
        moduleKey: "ab37a697-29b9-4f39-98fb-37dd6b45e99b",
        type: "DELAY",
        state: { delayTime: 0.08 },
      },
      "e04fe226-a1e9-40d5-99f2-cd1d6aab73ce": {
        name: "tacit-decorous-delay",
        moduleKey: "e04fe226-a1e9-40d5-99f2-cd1d6aab73ce",
        type: "DELAY",
        state: { delayTime: 0.039166666675 },
      },
      "3a12997d-197a-4f04-bec1-759bae8e0ccc": {
        name: "doting-timely-delay",
        moduleKey: "3a12997d-197a-4f04-bec1-759bae8e0ccc",
        type: "DELAY",
        state: { delayTime: 0.07833333335 },
      },
      "e4be0bbf-a68d-4e7d-841c-b2ba2ff8c7c7": {
        name: "cultured-big-pan",
        moduleKey: "e4be0bbf-a68d-4e7d-841c-b2ba2ff8c7c7",
        type: "PAN",
        state: { pan: -0.5 },
      },
      "50430340-e010-49d7-88ef-879ea47ac916": {
        name: "sparkling-proud-pan",
        moduleKey: "50430340-e010-49d7-88ef-879ea47ac916",
        type: "PAN",
        state: { pan: 0.5 },
      },
      "d66c6359-ddbc-4d2c-93a2-e8fc8ccfecfc": {
        name: "pale-didactic-gain",
        moduleKey: "d66c6359-ddbc-4d2c-93a2-e8fc8ccfecfc",
        type: "GAIN",
        state: { gain: 1 },
      },
      "1db6f66e-dee0-4461-bda1-63af731a4ff7": {
        name: "limber-rugged-limiter",
        moduleKey: "1db6f66e-dee0-4461-bda1-63af731a4ff7",
        type: "LIMITER",
        state: {},
      },
      "ff3a189f-bd92-48e2-9910-e3b95cc38e82": {
        name: "cosmic-ludicrous-sequencer",
        moduleKey: "ff3a189f-bd92-48e2-9910-e3b95cc38e82",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: 4,
          step1: 0,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "f2f79221-ce01-4835-955c-7061925810fe": {
        name: "steep-legal-clock",
        moduleKey: "f2f79221-ce01-4835-955c-7061925810fe",
        type: "CLOCK",
        state: { tempo: 264 },
      },
      "4bdd86ce-288d-4613-82b1-98dbf1694566": {
        name: "soggy-remarkable-filter",
        moduleKey: "4bdd86ce-288d-4613-82b1-98dbf1694566",
        type: "FILTER",
        state: { frequency: 2, detune: 0, Q: -10, gain: 0, type: "lowpass" },
      },
      "448eda2b-9944-429d-8688-0a9806c72791": {
        name: "phasey clock synth",
        moduleKey: "448eda2b-9944-429d-8688-0a9806c72791",
        type: "VCA",
        state: {
          gate: 0.01,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.4,
          peak: 0.4,
        },
      },
      "eba8a64f-a874-433d-88d5-538f15cfce3d": {
        name: "weary-untidy-clock",
        moduleKey: "eba8a64f-a874-433d-88d5-538f15cfce3d",
        type: "CLOCK",
        state: { tempo: 198 },
      },
      "891174ae-d0c1-4b66-92d8-6c30c1dce5a8": {
        name: "lucid-sophisticated-sequencer",
        moduleKey: "891174ae-d0c1-4b66-92d8-6c30c1dce5a8",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 1,
          step1: 1,
          step2: 1,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "9ae0f736-d465-4fb6-ae84-43a1209fa201": {
        name: "nauseating-icky-gain",
        moduleKey: "9ae0f736-d465-4fb6-ae84-43a1209fa201",
        type: "GAIN",
        state: { gain: 0 },
      },
      "be8d9a61-d632-4f8f-9db5-cae6926689d8": {
        name: "longing-wise-limiter",
        moduleKey: "be8d9a61-d632-4f8f-9db5-cae6926689d8",
        type: "LIMITER",
        state: {},
      },
      "e6769de7-14ac-4348-b2ca-99d8e130da77": {
        name: "eager-clear-gain",
        moduleKey: "e6769de7-14ac-4348-b2ca-99d8e130da77",
        type: "GAIN",
        state: { gain: 0.6 },
      },
      "0381fd84-e888-4c65-afd4-9de0958e2712": {
        name: "profuse-for-sequencer",
        moduleKey: "0381fd84-e888-4c65-afd4-9de0958e2712",
        type: "SEQUENCER",
        state: {
          steps: 5,
          step0: 1,
          step1: 0,
          step2: 1,
          step3: 1,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "3bccd226-42ec-47a6-bf7f-855ab3e30f8e": {
        name: "acoustic-silent-gain",
        moduleKey: "3bccd226-42ec-47a6-bf7f-855ab3e30f8e",
        type: "GAIN",
        state: { gain: 0 },
      },
      "19c2d019-8992-435d-afff-de5fac9b9d49": {
        name: "kick",
        moduleKey: "19c2d019-8992-435d-afff-de5fac9b9d49",
        type: "OSCILLATOR",
        state: { frequency: 55, detune: -200, waveform: "sine" },
      },
      "53b74f8c-3bcc-4c65-8e58-d0a1b76e40ec": {
        name: "nappy-plum-vca",
        moduleKey: "53b74f8c-3bcc-4c65-8e58-d0a1b76e40ec",
        type: "VCA",
        state: {
          gate: 0.0001,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.05,
          peak: 0.5,
        },
      },
      "4c88b901-23c1-4067-9748-bbc5dcde1ee5": {
        name: "painstaking-noble-envelope",
        moduleKey: "4c88b901-23c1-4067-9748-bbc5dcde1ee5",
        type: "ENVELOPE",
        state: {
          gate: 0.00005,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.025,
          peak: 2400,
        },
      },
      "473953b2-977f-4989-a5a5-d20d86d8ac56": {
        name: "boring-longing-gain",
        moduleKey: "473953b2-977f-4989-a5a5-d20d86d8ac56",
        type: "GAIN",
        state: { gain: 1 },
      },
      "ee9efcba-4a38-4be0-a543-40be198c17ba": {
        name: "separate-thriving-gain",
        moduleKey: "ee9efcba-4a38-4be0-a543-40be198c17ba",
        type: "GAIN",
        state: { gain: 0 },
      },
      "876b5599-ac37-4a4b-adce-3cadd8f5d86d": {
        name: "hulking-animated-sequencer",
        moduleKey: "876b5599-ac37-4a4b-adce-3cadd8f5d86d",
        type: "SEQUENCER",
        state: {
          steps: 3,
          step0: 1,
          step1: 1,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "5144b441-e024-455a-adc9-d000bf385933": {
        name: "uttermost-ample-pan",
        moduleKey: "5144b441-e024-455a-adc9-d000bf385933",
        type: "PAN",
        state: { pan: -0.5 },
      },
      "729bd5df-be78-473a-ad7b-dfe7f159e2b7": {
        name: "plastic-resilient-pan",
        moduleKey: "729bd5df-be78-473a-ad7b-dfe7f159e2b7",
        type: "PAN",
        state: { pan: 0.5 },
      },
      "13c810a0-6a78-4ab7-80a1-1f763810a8e0": {
        name: "capable-slippery-oscillator",
        moduleKey: "13c810a0-6a78-4ab7-80a1-1f763810a8e0",
        type: "OSCILLATOR",
        state: { frequency: 0.48, detune: 0, waveform: "sine" },
      },
      "68f148ca-e4c3-46bb-a09a-cf6043844484": {
        name: "sure-anxious-oscillator",
        moduleKey: "68f148ca-e4c3-46bb-a09a-cf6043844484",
        type: "OSCILLATOR",
        state: { frequency: 0.5, detune: 0, waveform: "sine" },
      },
      "de8f594e-7535-4a01-96e9-daa6012db465": {
        name: "zesty-jovial-oscillator",
        moduleKey: "de8f594e-7535-4a01-96e9-daa6012db465",
        type: "OSCILLATOR",
        state: { frequency: 0.05, detune: 0, waveform: "sine" },
      },
      "ee5be898-fb02-41ba-8ad9-2317bbdb8e6f": {
        name: "violet-zonked-gain",
        moduleKey: "ee5be898-fb02-41ba-8ad9-2317bbdb8e6f",
        type: "GAIN",
        state: { gain: 0.4 },
      },
      "fda1bed3-34b5-41aa-a858-3cef8c90bede": {
        name: "nice-superficial-gain",
        moduleKey: "fda1bed3-34b5-41aa-a858-3cef8c90bede",
        type: "GAIN",
        state: { gain: -0.3 },
      },
      "6ca372b2-8e40-4399-8678-1a92c5001795": {
        name: "accurate-breezy-delay",
        moduleKey: "6ca372b2-8e40-4399-8678-1a92c5001795",
        type: "DELAY",
        state: { delayTime: 0.23 },
      },
      "f95826ef-f814-4f8c-af54-db0a9db8f0d0": {
        name: "fluttering-sunset-noise",
        moduleKey: "f95826ef-f814-4f8c-af54-db0a9db8f0d0",
        type: "NOISE",
        state: {},
      },
      "92260e5b-2cd3-4445-91f9-2d859b07c76b": {
        name: "intelligent-handsomely-gain",
        moduleKey: "92260e5b-2cd3-4445-91f9-2d859b07c76b",
        type: "GAIN",
        state: { gain: 0.3 },
      },
      "71da48a3-130d-4d4f-9c17-26bec4a1999b": {
        name: "illustrious-unusual-oscillator",
        moduleKey: "71da48a3-130d-4d4f-9c17-26bec4a1999b",
        type: "OSCILLATOR",
        state: { frequency: 0.05, detune: 0, waveform: "sine" },
      },
      "21226ab6-c9aa-4cfa-87c8-448ad5ada93d": {
        name: "normal-humorous-gain",
        moduleKey: "21226ab6-c9aa-4cfa-87c8-448ad5ada93d",
        type: "GAIN",
        state: { gain: 0.3 },
      },
      "3964cd81-605b-4af4-a1b9-8d3cad889b8d": {
        name: "massive-flimsy-oscillator",
        moduleKey: "3964cd81-605b-4af4-a1b9-8d3cad889b8d",
        type: "OSCILLATOR",
        state: { frequency: 0.25, detune: 0, waveform: "sine" },
      },
      "1bdcabc2-b756-48ad-8abc-2100b10654e5": {
        name: "knotty-vague-gain",
        moduleKey: "1bdcabc2-b756-48ad-8abc-2100b10654e5",
        type: "GAIN",
        state: { gain: 2400 },
      },
      "b86a5150-0b52-4cc2-80c8-2df7a44fe665": {
        name: "peppy-sloppy-compressor",
        moduleKey: "b86a5150-0b52-4cc2-80c8-2df7a44fe665",
        type: "COMPRESSOR",
        state: {
          attack: 0.003,
          knee: 30,
          ratio: 12,
          release: 0.128,
          threshold: -24,
        },
      },
      "019a9d56-e01e-4dc0-81b5-fd25534cfd44": {
        name: "vagabond-ruddy-filter",
        moduleKey: "019a9d56-e01e-4dc0-81b5-fd25534cfd44",
        type: "FILTER",
        state: { frequency: 5600, detune: 0, Q: 1, gain: 0, type: "lowpass" },
      },
      "ff37b297-adfc-49c3-a4b0-41424ddc4054": {
        name: "quarrelsome-difficult-oscillator",
        moduleKey: "ff37b297-adfc-49c3-a4b0-41424ddc4054",
        type: "OSCILLATOR",
        state: { frequency: 0.02, detune: 0, waveform: "sine" },
      },
      "b30d7cb7-c5e2-4f7a-ae3d-05c745dc0cf1": {
        name: "dangerous-scenic-gain",
        moduleKey: "b30d7cb7-c5e2-4f7a-ae3d-05c745dc0cf1",
        type: "GAIN",
        state: { gain: 2400 },
      },
    },
    modulePositions: {
      "0": [4911, 2492],
      "36088ccd-d2ec-4096-8acf-9c10621e4a01": [2247, 799],
      "6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54": [4168, 2535],
      "0af1e40b-3734-495f-8603-3d1d0ba5bbf7": [2245, 621],
      "7f44f633-84f3-447d-a9ff-44fa7d97bdec": [2248, 971],
      "846c44f7-6d85-49f1-bcf6-16fa91d8937e": [4631, 2321],
      "a948f2a6-ac8c-4f8a-8f3e-5f893a73d7a5": [1406, 819],
      "13d50ed7-ed30-449d-845b-e89dab6c2847": [93, 108],
      "fcc86feb-daac-4b4c-abfe-aa90e6c57961": [1023, 2228],
      "b583b7cb-fd77-4cf6-9479-a35f93237031": [684, 1926],
      "744bcf80-7543-4a69-a6b1-9b8318f6bd19": [682, 2358],
      "18170b62-5afa-4247-b1ed-c5e9b1a9f04f": [1816, 871],
      "7fd4b8c0-24d8-4293-bb6f-1a4e1a016efa": [1413, 2148],
      "2b4682fa-0219-4af2-af3a-ecd7079bd925": [1024, 1999],
      "121cb261-5581-4207-b0c1-e7d84f167b85": [1414, 1859],
      "fe051c60-aeca-4701-9d41-5a39ace72085": [1414, 1531],
      "336aa2f1-3130-4cfd-a208-5bcc56398cc1": [2614, 2470],
      "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f": [2246, 2191],
      "ab37a697-29b9-4f39-98fb-37dd6b45e99b": [2276, 2955],
      "e04fe226-a1e9-40d5-99f2-cd1d6aab73ce": [2279, 2797],
      "3a12997d-197a-4f04-bec1-759bae8e0ccc": [2282, 2641],
      "e4be0bbf-a68d-4e7d-841c-b2ba2ff8c7c7": [2618, 2640],
      "50430340-e010-49d7-88ef-879ea47ac916": [2615, 2956],
      "d66c6359-ddbc-4d2c-93a2-e8fc8ccfecfc": [2625, 800],
      "1db6f66e-dee0-4461-bda1-63af731a4ff7": [3000, 2604],
      "ff3a189f-bd92-48e2-9910-e3b95cc38e82": [872, 2902],
      "f2f79221-ce01-4835-955c-7061925810fe": [505, 2931],
      "4bdd86ce-288d-4613-82b1-98dbf1694566": [1254, 2932],
      "448eda2b-9944-429d-8688-0a9806c72791": [2770, 1015],
      "eba8a64f-a874-433d-88d5-538f15cfce3d": [2089, 1265],
      "891174ae-d0c1-4b66-92d8-6c30c1dce5a8": [2640, 1385],
      "9ae0f736-d465-4fb6-ae84-43a1209fa201": [3151, 1257],
      "be8d9a61-d632-4f8f-9db5-cae6926689d8": [2986, 2301],
      "e6769de7-14ac-4348-b2ca-99d8e130da77": [3139, 2360],
      "0381fd84-e888-4c65-afd4-9de0958e2712": [684, 1415],
      "3bccd226-42ec-47a6-bf7f-855ab3e30f8e": [688, 1741],
      "19c2d019-8992-435d-afff-de5fac9b9d49": [2405, 3829],
      "53b74f8c-3bcc-4c65-8e58-d0a1b76e40ec": [2409, 4078],
      "4c88b901-23c1-4067-9748-bbc5dcde1ee5": [2044, 3931],
      "473953b2-977f-4989-a5a5-d20d86d8ac56": [184, 3791],
      "ee9efcba-4a38-4be0-a543-40be198c17ba": [3022, 3780],
      "876b5599-ac37-4a4b-adce-3cadd8f5d86d": [2403, 3533],
      "5144b441-e024-455a-adc9-d000bf385933": [3580, 1135],
      "729bd5df-be78-473a-ad7b-dfe7f159e2b7": [3942, 1305],
      "13c810a0-6a78-4ab7-80a1-1f763810a8e0": [3577, 873],
      "68f148ca-e4c3-46bb-a09a-cf6043844484": [3947, 1082],
      "de8f594e-7535-4a01-96e9-daa6012db465": [3929, 543],
      "ee5be898-fb02-41ba-8ad9-2317bbdb8e6f": [3956, 795],
      "fda1bed3-34b5-41aa-a858-3cef8c90bede": [3587, 687],
      "6ca372b2-8e40-4399-8678-1a92c5001795": [3366, 3571],
      "f95826ef-f814-4f8c-af54-db0a9db8f0d0": [2045, 3596],
      "92260e5b-2cd3-4445-91f9-2d859b07c76b": [2041, 3747],
      "71da48a3-130d-4d4f-9c17-26bec4a1999b": [2341, 1777],
      "21226ab6-c9aa-4cfa-87c8-448ad5ada93d": [2697, 1813],
      "3964cd81-605b-4af4-a1b9-8d3cad889b8d": [1940, 1524],
      "1bdcabc2-b756-48ad-8abc-2100b10654e5": [1972, 1803],
      "b86a5150-0b52-4cc2-80c8-2df7a44fe665": [4549, 2605],
      "019a9d56-e01e-4dc0-81b5-fd25534cfd44": [4432, 1723],
      "ff37b297-adfc-49c3-a4b0-41424ddc4054": [3761, 1792],
      "b30d7cb7-c5e2-4f7a-ae3d-05c745dc0cf1": [4097, 1820],
    },
    connections: {
      "6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54_1_0|846c44f7-6d85-49f1-bcf6-16fa91d8937e_0_0":
        [
          {
            moduleKey: "6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "846c44f7-6d85-49f1-bcf6-16fa91d8937e",
            type: 0,
            channel: 0,
          },
        ],
      "846c44f7-6d85-49f1-bcf6-16fa91d8937e_1_0|0_0_0": [
        {
          moduleKey: "846c44f7-6d85-49f1-bcf6-16fa91d8937e",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "13d50ed7-ed30-449d-845b-e89dab6c2847_1_0|a948f2a6-ac8c-4f8a-8f3e-5f893a73d7a5_0_0":
        [
          {
            moduleKey: "13d50ed7-ed30-449d-845b-e89dab6c2847",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "a948f2a6-ac8c-4f8a-8f3e-5f893a73d7a5",
            type: 0,
            channel: 0,
          },
        ],
      "13d50ed7-ed30-449d-845b-e89dab6c2847_1_0|b583b7cb-fd77-4cf6-9479-a35f93237031_0_0":
        [
          {
            moduleKey: "13d50ed7-ed30-449d-845b-e89dab6c2847",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b583b7cb-fd77-4cf6-9479-a35f93237031",
            type: 0,
            channel: 0,
          },
        ],
      "b583b7cb-fd77-4cf6-9479-a35f93237031_1_0|744bcf80-7543-4a69-a6b1-9b8318f6bd19_0_0":
        [
          {
            moduleKey: "b583b7cb-fd77-4cf6-9479-a35f93237031",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "744bcf80-7543-4a69-a6b1-9b8318f6bd19",
            type: 0,
            channel: 0,
          },
        ],
      "744bcf80-7543-4a69-a6b1-9b8318f6bd19_1_0|fcc86feb-daac-4b4c-abfe-aa90e6c57961_detune":
        [
          {
            moduleKey: "744bcf80-7543-4a69-a6b1-9b8318f6bd19",
            channel: 0,
            type: 1,
          },
          { moduleKey: "fcc86feb-daac-4b4c-abfe-aa90e6c57961", name: "detune" },
        ],
      "a948f2a6-ac8c-4f8a-8f3e-5f893a73d7a5_1_0|18170b62-5afa-4247-b1ed-c5e9b1a9f04f_0_0":
        [
          {
            moduleKey: "a948f2a6-ac8c-4f8a-8f3e-5f893a73d7a5",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "18170b62-5afa-4247-b1ed-c5e9b1a9f04f",
            type: 0,
            channel: 0,
          },
        ],
      "18170b62-5afa-4247-b1ed-c5e9b1a9f04f_1_0|7f44f633-84f3-447d-a9ff-44fa7d97bdec_tempo":
        [
          {
            moduleKey: "18170b62-5afa-4247-b1ed-c5e9b1a9f04f",
            type: 1,
            channel: 0,
          },
          { moduleKey: "7f44f633-84f3-447d-a9ff-44fa7d97bdec", name: "tempo" },
        ],
      "18170b62-5afa-4247-b1ed-c5e9b1a9f04f_1_0|36088ccd-d2ec-4096-8acf-9c10621e4a01_tempo":
        [
          {
            moduleKey: "18170b62-5afa-4247-b1ed-c5e9b1a9f04f",
            type: 1,
            channel: 0,
          },
          { moduleKey: "36088ccd-d2ec-4096-8acf-9c10621e4a01", name: "tempo" },
        ],
      "18170b62-5afa-4247-b1ed-c5e9b1a9f04f_1_0|0af1e40b-3734-495f-8603-3d1d0ba5bbf7_tempo":
        [
          {
            moduleKey: "18170b62-5afa-4247-b1ed-c5e9b1a9f04f",
            type: 1,
            channel: 0,
          },
          { moduleKey: "0af1e40b-3734-495f-8603-3d1d0ba5bbf7", name: "tempo" },
        ],
      "fcc86feb-daac-4b4c-abfe-aa90e6c57961_1_0|7fd4b8c0-24d8-4293-bb6f-1a4e1a016efa_0_0":
        [
          {
            moduleKey: "fcc86feb-daac-4b4c-abfe-aa90e6c57961",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7fd4b8c0-24d8-4293-bb6f-1a4e1a016efa",
            type: 0,
            channel: 0,
          },
        ],
      "744bcf80-7543-4a69-a6b1-9b8318f6bd19_1_0|2b4682fa-0219-4af2-af3a-ecd7079bd925_detune":
        [
          {
            moduleKey: "744bcf80-7543-4a69-a6b1-9b8318f6bd19",
            type: 1,
            channel: 0,
          },
          { moduleKey: "2b4682fa-0219-4af2-af3a-ecd7079bd925", name: "detune" },
        ],
      "2b4682fa-0219-4af2-af3a-ecd7079bd925_1_0|7fd4b8c0-24d8-4293-bb6f-1a4e1a016efa_0_0":
        [
          {
            moduleKey: "2b4682fa-0219-4af2-af3a-ecd7079bd925",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7fd4b8c0-24d8-4293-bb6f-1a4e1a016efa",
            type: 0,
            channel: 0,
          },
        ],
      "7fd4b8c0-24d8-4293-bb6f-1a4e1a016efa_1_0|121cb261-5581-4207-b0c1-e7d84f167b85_0_0":
        [
          {
            moduleKey: "7fd4b8c0-24d8-4293-bb6f-1a4e1a016efa",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "121cb261-5581-4207-b0c1-e7d84f167b85",
            type: 0,
            channel: 0,
          },
        ],
      "13d50ed7-ed30-449d-845b-e89dab6c2847_1_0|fe051c60-aeca-4701-9d41-5a39ace72085_0_0":
        [
          {
            moduleKey: "13d50ed7-ed30-449d-845b-e89dab6c2847",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "fe051c60-aeca-4701-9d41-5a39ace72085",
            type: 0,
            channel: 0,
          },
        ],
      "fe051c60-aeca-4701-9d41-5a39ace72085_1_0|121cb261-5581-4207-b0c1-e7d84f167b85_detune":
        [
          {
            moduleKey: "fe051c60-aeca-4701-9d41-5a39ace72085",
            channel: 0,
            type: 1,
          },
          { moduleKey: "121cb261-5581-4207-b0c1-e7d84f167b85", name: "detune" },
        ],
      "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f_1_0|336aa2f1-3130-4cfd-a208-5bcc56398cc1_0_0":
        [
          {
            moduleKey: "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "336aa2f1-3130-4cfd-a208-5bcc56398cc1",
            type: 0,
            channel: 0,
          },
        ],
      "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f_1_0|ab37a697-29b9-4f39-98fb-37dd6b45e99b_0_0":
        [
          {
            moduleKey: "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "ab37a697-29b9-4f39-98fb-37dd6b45e99b",
            type: 0,
            channel: 0,
          },
        ],
      "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f_1_0|e04fe226-a1e9-40d5-99f2-cd1d6aab73ce_0_0":
        [
          {
            moduleKey: "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "e04fe226-a1e9-40d5-99f2-cd1d6aab73ce",
            type: 0,
            channel: 0,
          },
        ],
      "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f_1_0|3a12997d-197a-4f04-bec1-759bae8e0ccc_0_0":
        [
          {
            moduleKey: "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "3a12997d-197a-4f04-bec1-759bae8e0ccc",
            type: 0,
            channel: 0,
          },
        ],
      "3a12997d-197a-4f04-bec1-759bae8e0ccc_1_0|e4be0bbf-a68d-4e7d-841c-b2ba2ff8c7c7_0_0":
        [
          {
            moduleKey: "3a12997d-197a-4f04-bec1-759bae8e0ccc",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "e4be0bbf-a68d-4e7d-841c-b2ba2ff8c7c7",
            type: 0,
            channel: 0,
          },
        ],
      "ab37a697-29b9-4f39-98fb-37dd6b45e99b_1_0|50430340-e010-49d7-88ef-879ea47ac916_0_0":
        [
          {
            moduleKey: "ab37a697-29b9-4f39-98fb-37dd6b45e99b",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "50430340-e010-49d7-88ef-879ea47ac916",
            type: 0,
            channel: 0,
          },
        ],
      "0af1e40b-3734-495f-8603-3d1d0ba5bbf7_1_0|d66c6359-ddbc-4d2c-93a2-e8fc8ccfecfc_0_0":
        [
          {
            moduleKey: "0af1e40b-3734-495f-8603-3d1d0ba5bbf7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d66c6359-ddbc-4d2c-93a2-e8fc8ccfecfc",
            type: 0,
            channel: 0,
          },
        ],
      "36088ccd-d2ec-4096-8acf-9c10621e4a01_1_0|d66c6359-ddbc-4d2c-93a2-e8fc8ccfecfc_0_0":
        [
          {
            moduleKey: "36088ccd-d2ec-4096-8acf-9c10621e4a01",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d66c6359-ddbc-4d2c-93a2-e8fc8ccfecfc",
            type: 0,
            channel: 0,
          },
        ],
      "7f44f633-84f3-447d-a9ff-44fa7d97bdec_1_0|d66c6359-ddbc-4d2c-93a2-e8fc8ccfecfc_0_0":
        [
          {
            moduleKey: "7f44f633-84f3-447d-a9ff-44fa7d97bdec",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d66c6359-ddbc-4d2c-93a2-e8fc8ccfecfc",
            type: 0,
            channel: 0,
          },
        ],
      "1db6f66e-dee0-4461-bda1-63af731a4ff7_1_0|ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f_0_0":
        [
          {
            moduleKey: "1db6f66e-dee0-4461-bda1-63af731a4ff7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f",
            type: 0,
            channel: 0,
          },
        ],
      "336aa2f1-3130-4cfd-a208-5bcc56398cc1_1_0|1db6f66e-dee0-4461-bda1-63af731a4ff7_0_0":
        [
          {
            moduleKey: "336aa2f1-3130-4cfd-a208-5bcc56398cc1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "1db6f66e-dee0-4461-bda1-63af731a4ff7",
            type: 0,
            channel: 0,
          },
        ],
      "50430340-e010-49d7-88ef-879ea47ac916_1_0|1db6f66e-dee0-4461-bda1-63af731a4ff7_0_0":
        [
          {
            moduleKey: "50430340-e010-49d7-88ef-879ea47ac916",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "1db6f66e-dee0-4461-bda1-63af731a4ff7",
            type: 0,
            channel: 0,
          },
        ],
      "e4be0bbf-a68d-4e7d-841c-b2ba2ff8c7c7_1_0|1db6f66e-dee0-4461-bda1-63af731a4ff7_0_0":
        [
          {
            moduleKey: "e4be0bbf-a68d-4e7d-841c-b2ba2ff8c7c7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "1db6f66e-dee0-4461-bda1-63af731a4ff7",
            type: 0,
            channel: 0,
          },
        ],
      "13d50ed7-ed30-449d-845b-e89dab6c2847_1_0|f2f79221-ce01-4835-955c-7061925810fe_0_0":
        [
          {
            moduleKey: "13d50ed7-ed30-449d-845b-e89dab6c2847",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "f2f79221-ce01-4835-955c-7061925810fe",
            channel: 0,
            type: 0,
          },
        ],
      "f2f79221-ce01-4835-955c-7061925810fe_1_0|ff3a189f-bd92-48e2-9910-e3b95cc38e82_0_0":
        [
          {
            moduleKey: "f2f79221-ce01-4835-955c-7061925810fe",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "ff3a189f-bd92-48e2-9910-e3b95cc38e82",
            type: 0,
            channel: 0,
          },
        ],
      "ff3a189f-bd92-48e2-9910-e3b95cc38e82_1_0|4bdd86ce-288d-4613-82b1-98dbf1694566_0_0":
        [
          {
            moduleKey: "ff3a189f-bd92-48e2-9910-e3b95cc38e82",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "4bdd86ce-288d-4613-82b1-98dbf1694566",
            type: 0,
            channel: 0,
          },
        ],
      "4bdd86ce-288d-4613-82b1-98dbf1694566_1_0|ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f_gain":
        [
          {
            moduleKey: "4bdd86ce-288d-4613-82b1-98dbf1694566",
            channel: 0,
            type: 1,
          },
          { moduleKey: "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f", name: "gain" },
        ],
      "891174ae-d0c1-4b66-92d8-6c30c1dce5a8_1_0|9ae0f736-d465-4fb6-ae84-43a1209fa201_gain":
        [
          {
            moduleKey: "891174ae-d0c1-4b66-92d8-6c30c1dce5a8",
            channel: 0,
            type: 1,
          },
          { moduleKey: "9ae0f736-d465-4fb6-ae84-43a1209fa201", name: "gain" },
        ],
      "eba8a64f-a874-433d-88d5-538f15cfce3d_1_0|891174ae-d0c1-4b66-92d8-6c30c1dce5a8_0_0":
        [
          {
            moduleKey: "eba8a64f-a874-433d-88d5-538f15cfce3d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "891174ae-d0c1-4b66-92d8-6c30c1dce5a8",
            type: 0,
            channel: 0,
          },
        ],
      "336aa2f1-3130-4cfd-a208-5bcc56398cc1_1_0|3a12997d-197a-4f04-bec1-759bae8e0ccc_0_0":
        [
          {
            moduleKey: "336aa2f1-3130-4cfd-a208-5bcc56398cc1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "3a12997d-197a-4f04-bec1-759bae8e0ccc",
            type: 0,
            channel: 0,
          },
        ],
      "336aa2f1-3130-4cfd-a208-5bcc56398cc1_1_0|e04fe226-a1e9-40d5-99f2-cd1d6aab73ce_0_0":
        [
          {
            moduleKey: "336aa2f1-3130-4cfd-a208-5bcc56398cc1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "e04fe226-a1e9-40d5-99f2-cd1d6aab73ce",
            type: 0,
            channel: 0,
          },
        ],
      "336aa2f1-3130-4cfd-a208-5bcc56398cc1_1_0|ab37a697-29b9-4f39-98fb-37dd6b45e99b_0_0":
        [
          {
            moduleKey: "336aa2f1-3130-4cfd-a208-5bcc56398cc1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "ab37a697-29b9-4f39-98fb-37dd6b45e99b",
            type: 0,
            channel: 0,
          },
        ],
      "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f_1_0|be8d9a61-d632-4f8f-9db5-cae6926689d8_0_0":
        [
          {
            moduleKey: "ed4b3f2b-5e7e-4865-aa24-e4ea532ee09f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "be8d9a61-d632-4f8f-9db5-cae6926689d8",
            type: 0,
            channel: 0,
          },
        ],
      "be8d9a61-d632-4f8f-9db5-cae6926689d8_1_0|e6769de7-14ac-4348-b2ca-99d8e130da77_0_0":
        [
          {
            moduleKey: "be8d9a61-d632-4f8f-9db5-cae6926689d8",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "e6769de7-14ac-4348-b2ca-99d8e130da77",
            channel: 0,
            type: 0,
          },
        ],
      "e6769de7-14ac-4348-b2ca-99d8e130da77_1_0|6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54_0_0":
        [
          {
            moduleKey: "e6769de7-14ac-4348-b2ca-99d8e130da77",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54",
            type: 0,
            channel: 0,
          },
        ],
      "13d50ed7-ed30-449d-845b-e89dab6c2847_1_0|3bccd226-42ec-47a6-bf7f-855ab3e30f8e_0_0":
        [
          {
            moduleKey: "13d50ed7-ed30-449d-845b-e89dab6c2847",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "3bccd226-42ec-47a6-bf7f-855ab3e30f8e",
            type: 0,
            channel: 0,
          },
        ],
      "3bccd226-42ec-47a6-bf7f-855ab3e30f8e_1_0|7fd4b8c0-24d8-4293-bb6f-1a4e1a016efa_0_1":
        [
          {
            moduleKey: "3bccd226-42ec-47a6-bf7f-855ab3e30f8e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7fd4b8c0-24d8-4293-bb6f-1a4e1a016efa",
            type: 0,
            channel: 1,
          },
        ],
      "0381fd84-e888-4c65-afd4-9de0958e2712_1_0|3bccd226-42ec-47a6-bf7f-855ab3e30f8e_gain":
        [
          {
            moduleKey: "0381fd84-e888-4c65-afd4-9de0958e2712",
            channel: 0,
            type: 1,
          },
          { moduleKey: "3bccd226-42ec-47a6-bf7f-855ab3e30f8e", name: "gain" },
        ],
      "13d50ed7-ed30-449d-845b-e89dab6c2847_1_0|0381fd84-e888-4c65-afd4-9de0958e2712_0_0":
        [
          {
            moduleKey: "13d50ed7-ed30-449d-845b-e89dab6c2847",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "0381fd84-e888-4c65-afd4-9de0958e2712",
            channel: 0,
            type: 0,
          },
        ],
      "d66c6359-ddbc-4d2c-93a2-e8fc8ccfecfc_1_0|448eda2b-9944-429d-8688-0a9806c72791_0_0":
        [
          {
            moduleKey: "d66c6359-ddbc-4d2c-93a2-e8fc8ccfecfc",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "448eda2b-9944-429d-8688-0a9806c72791",
            type: 0,
            channel: 0,
          },
        ],
      "121cb261-5581-4207-b0c1-e7d84f167b85_1_0|336aa2f1-3130-4cfd-a208-5bcc56398cc1_0_0":
        [
          {
            moduleKey: "121cb261-5581-4207-b0c1-e7d84f167b85",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "336aa2f1-3130-4cfd-a208-5bcc56398cc1",
            type: 0,
            channel: 0,
          },
        ],
      "4c88b901-23c1-4067-9748-bbc5dcde1ee5_1_0|19c2d019-8992-435d-afff-de5fac9b9d49_detune":
        [
          {
            moduleKey: "4c88b901-23c1-4067-9748-bbc5dcde1ee5",
            channel: 0,
            type: 1,
          },
          { moduleKey: "19c2d019-8992-435d-afff-de5fac9b9d49", name: "detune" },
        ],
      "19c2d019-8992-435d-afff-de5fac9b9d49_1_0|53b74f8c-3bcc-4c65-8e58-d0a1b76e40ec_0_0":
        [
          {
            moduleKey: "19c2d019-8992-435d-afff-de5fac9b9d49",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "53b74f8c-3bcc-4c65-8e58-d0a1b76e40ec",
            type: 0,
            channel: 0,
          },
        ],
      "473953b2-977f-4989-a5a5-d20d86d8ac56_1_0|53b74f8c-3bcc-4c65-8e58-d0a1b76e40ec_0_1":
        [
          {
            moduleKey: "473953b2-977f-4989-a5a5-d20d86d8ac56",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "53b74f8c-3bcc-4c65-8e58-d0a1b76e40ec",
            type: 0,
            channel: 1,
          },
        ],
      "13d50ed7-ed30-449d-845b-e89dab6c2847_1_0|473953b2-977f-4989-a5a5-d20d86d8ac56_0_0":
        [
          {
            moduleKey: "13d50ed7-ed30-449d-845b-e89dab6c2847",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "473953b2-977f-4989-a5a5-d20d86d8ac56",
            type: 0,
            channel: 0,
          },
        ],
      "53b74f8c-3bcc-4c65-8e58-d0a1b76e40ec_1_0|ee9efcba-4a38-4be0-a543-40be198c17ba_0_0":
        [
          {
            moduleKey: "53b74f8c-3bcc-4c65-8e58-d0a1b76e40ec",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "ee9efcba-4a38-4be0-a543-40be198c17ba",
            type: 0,
            channel: 0,
          },
        ],
      "876b5599-ac37-4a4b-adce-3cadd8f5d86d_1_0|ee9efcba-4a38-4be0-a543-40be198c17ba_gain":
        [
          {
            moduleKey: "876b5599-ac37-4a4b-adce-3cadd8f5d86d",
            channel: 0,
            type: 1,
          },
          { moduleKey: "ee9efcba-4a38-4be0-a543-40be198c17ba", name: "gain" },
        ],
      "473953b2-977f-4989-a5a5-d20d86d8ac56_1_0|876b5599-ac37-4a4b-adce-3cadd8f5d86d_0_0":
        [
          {
            moduleKey: "473953b2-977f-4989-a5a5-d20d86d8ac56",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "876b5599-ac37-4a4b-adce-3cadd8f5d86d",
            channel: 0,
            type: 0,
          },
        ],
      "473953b2-977f-4989-a5a5-d20d86d8ac56_1_0|4c88b901-23c1-4067-9748-bbc5dcde1ee5_0_0":
        [
          {
            moduleKey: "473953b2-977f-4989-a5a5-d20d86d8ac56",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "4c88b901-23c1-4067-9748-bbc5dcde1ee5",
            type: 0,
            channel: 0,
          },
        ],
      "ee9efcba-4a38-4be0-a543-40be198c17ba_1_0|6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54_0_0":
        [
          {
            moduleKey: "ee9efcba-4a38-4be0-a543-40be198c17ba",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54",
            type: 0,
            channel: 0,
          },
        ],
      "68f148ca-e4c3-46bb-a09a-cf6043844484_1_0|729bd5df-be78-473a-ad7b-dfe7f159e2b7_pan":
        [
          {
            moduleKey: "68f148ca-e4c3-46bb-a09a-cf6043844484",
            channel: 0,
            type: 1,
          },
          { moduleKey: "729bd5df-be78-473a-ad7b-dfe7f159e2b7", name: "pan" },
        ],
      "13c810a0-6a78-4ab7-80a1-1f763810a8e0_1_0|5144b441-e024-455a-adc9-d000bf385933_pan":
        [
          {
            moduleKey: "13c810a0-6a78-4ab7-80a1-1f763810a8e0",
            channel: 0,
            type: 1,
          },
          { moduleKey: "5144b441-e024-455a-adc9-d000bf385933", name: "pan" },
        ],
      "729bd5df-be78-473a-ad7b-dfe7f159e2b7_1_0|336aa2f1-3130-4cfd-a208-5bcc56398cc1_0_0":
        [
          {
            moduleKey: "729bd5df-be78-473a-ad7b-dfe7f159e2b7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "336aa2f1-3130-4cfd-a208-5bcc56398cc1",
            type: 0,
            channel: 0,
          },
        ],
      "5144b441-e024-455a-adc9-d000bf385933_1_0|336aa2f1-3130-4cfd-a208-5bcc56398cc1_0_0":
        [
          {
            moduleKey: "5144b441-e024-455a-adc9-d000bf385933",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "336aa2f1-3130-4cfd-a208-5bcc56398cc1",
            type: 0,
            channel: 0,
          },
        ],
      "de8f594e-7535-4a01-96e9-daa6012db465_1_0|ee5be898-fb02-41ba-8ad9-2317bbdb8e6f_0_0":
        [
          {
            moduleKey: "de8f594e-7535-4a01-96e9-daa6012db465",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "ee5be898-fb02-41ba-8ad9-2317bbdb8e6f",
            type: 0,
            channel: 0,
          },
        ],
      "ee5be898-fb02-41ba-8ad9-2317bbdb8e6f_1_0|68f148ca-e4c3-46bb-a09a-cf6043844484_frequency":
        [
          {
            moduleKey: "ee5be898-fb02-41ba-8ad9-2317bbdb8e6f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "68f148ca-e4c3-46bb-a09a-cf6043844484",
            name: "frequency",
          },
        ],
      "de8f594e-7535-4a01-96e9-daa6012db465_1_0|fda1bed3-34b5-41aa-a858-3cef8c90bede_0_0":
        [
          {
            moduleKey: "de8f594e-7535-4a01-96e9-daa6012db465",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "fda1bed3-34b5-41aa-a858-3cef8c90bede",
            type: 0,
            channel: 0,
          },
        ],
      "fda1bed3-34b5-41aa-a858-3cef8c90bede_1_0|13c810a0-6a78-4ab7-80a1-1f763810a8e0_frequency":
        [
          {
            moduleKey: "fda1bed3-34b5-41aa-a858-3cef8c90bede",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "13c810a0-6a78-4ab7-80a1-1f763810a8e0",
            name: "frequency",
          },
        ],
      "ee9efcba-4a38-4be0-a543-40be198c17ba_1_0|6ca372b2-8e40-4399-8678-1a92c5001795_0_0":
        [
          {
            moduleKey: "ee9efcba-4a38-4be0-a543-40be198c17ba",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6ca372b2-8e40-4399-8678-1a92c5001795",
            type: 0,
            channel: 0,
          },
        ],
      "6ca372b2-8e40-4399-8678-1a92c5001795_1_0|6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54_0_0":
        [
          {
            moduleKey: "6ca372b2-8e40-4399-8678-1a92c5001795",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54",
            type: 0,
            channel: 0,
          },
        ],
      "f95826ef-f814-4f8c-af54-db0a9db8f0d0_1_0|92260e5b-2cd3-4445-91f9-2d859b07c76b_0_0":
        [
          {
            moduleKey: "f95826ef-f814-4f8c-af54-db0a9db8f0d0",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "92260e5b-2cd3-4445-91f9-2d859b07c76b",
            type: 0,
            channel: 0,
          },
        ],
      "92260e5b-2cd3-4445-91f9-2d859b07c76b_1_0|53b74f8c-3bcc-4c65-8e58-d0a1b76e40ec_0_0":
        [
          {
            moduleKey: "92260e5b-2cd3-4445-91f9-2d859b07c76b",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "53b74f8c-3bcc-4c65-8e58-d0a1b76e40ec",
            type: 0,
            channel: 0,
          },
        ],
      "eba8a64f-a874-433d-88d5-538f15cfce3d_1_0|448eda2b-9944-429d-8688-0a9806c72791_0_1":
        [
          {
            moduleKey: "eba8a64f-a874-433d-88d5-538f15cfce3d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "448eda2b-9944-429d-8688-0a9806c72791",
            type: 0,
            channel: 1,
          },
        ],
      "9ae0f736-d465-4fb6-ae84-43a1209fa201_1_0|5144b441-e024-455a-adc9-d000bf385933_0_0":
        [
          {
            moduleKey: "9ae0f736-d465-4fb6-ae84-43a1209fa201",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "5144b441-e024-455a-adc9-d000bf385933",
            type: 0,
            channel: 0,
          },
        ],
      "448eda2b-9944-429d-8688-0a9806c72791_1_0|9ae0f736-d465-4fb6-ae84-43a1209fa201_0_0":
        [
          {
            moduleKey: "448eda2b-9944-429d-8688-0a9806c72791",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "9ae0f736-d465-4fb6-ae84-43a1209fa201",
            type: 0,
            channel: 0,
          },
        ],
      "9ae0f736-d465-4fb6-ae84-43a1209fa201_1_0|729bd5df-be78-473a-ad7b-dfe7f159e2b7_0_0":
        [
          {
            moduleKey: "9ae0f736-d465-4fb6-ae84-43a1209fa201",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "729bd5df-be78-473a-ad7b-dfe7f159e2b7",
            type: 0,
            channel: 0,
          },
        ],
      "71da48a3-130d-4d4f-9c17-26bec4a1999b_1_0|21226ab6-c9aa-4cfa-87c8-448ad5ada93d_0_0":
        [
          {
            moduleKey: "71da48a3-130d-4d4f-9c17-26bec4a1999b",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "21226ab6-c9aa-4cfa-87c8-448ad5ada93d",
            type: 0,
            channel: 0,
          },
        ],
      "21226ab6-c9aa-4cfa-87c8-448ad5ada93d_1_0|448eda2b-9944-429d-8688-0a9806c72791_release":
        [
          {
            moduleKey: "21226ab6-c9aa-4cfa-87c8-448ad5ada93d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "448eda2b-9944-429d-8688-0a9806c72791",
            name: "release",
          },
        ],
      "3964cd81-605b-4af4-a1b9-8d3cad889b8d_1_0|1bdcabc2-b756-48ad-8abc-2100b10654e5_0_0":
        [
          {
            moduleKey: "3964cd81-605b-4af4-a1b9-8d3cad889b8d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "1bdcabc2-b756-48ad-8abc-2100b10654e5",
            type: 0,
            channel: 0,
          },
        ],
      "1bdcabc2-b756-48ad-8abc-2100b10654e5_1_0|71da48a3-130d-4d4f-9c17-26bec4a1999b_detune":
        [
          {
            moduleKey: "1bdcabc2-b756-48ad-8abc-2100b10654e5",
            channel: 0,
            type: 1,
          },
          { moduleKey: "71da48a3-130d-4d4f-9c17-26bec4a1999b", name: "detune" },
        ],
      "6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54_1_0|b86a5150-0b52-4cc2-80c8-2df7a44fe665_0_0":
        [
          {
            moduleKey: "6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b86a5150-0b52-4cc2-80c8-2df7a44fe665",
            type: 0,
            channel: 0,
          },
        ],
      "b86a5150-0b52-4cc2-80c8-2df7a44fe665_1_0|0_0_0": [
        {
          moduleKey: "b86a5150-0b52-4cc2-80c8-2df7a44fe665",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "5144b441-e024-455a-adc9-d000bf385933_1_0|019a9d56-e01e-4dc0-81b5-fd25534cfd44_0_0":
        [
          {
            moduleKey: "5144b441-e024-455a-adc9-d000bf385933",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "019a9d56-e01e-4dc0-81b5-fd25534cfd44",
            type: 0,
            channel: 0,
          },
        ],
      "729bd5df-be78-473a-ad7b-dfe7f159e2b7_1_0|019a9d56-e01e-4dc0-81b5-fd25534cfd44_0_0":
        [
          {
            moduleKey: "729bd5df-be78-473a-ad7b-dfe7f159e2b7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "019a9d56-e01e-4dc0-81b5-fd25534cfd44",
            type: 0,
            channel: 0,
          },
        ],
      "019a9d56-e01e-4dc0-81b5-fd25534cfd44_1_0|6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54_0_0":
        [
          {
            moduleKey: "019a9d56-e01e-4dc0-81b5-fd25534cfd44",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "6fe7a7ea-5a2d-4cf7-96d8-1d07befaea54",
            channel: 0,
            type: 0,
          },
        ],
      "ff37b297-adfc-49c3-a4b0-41424ddc4054_1_0|b30d7cb7-c5e2-4f7a-ae3d-05c745dc0cf1_0_0":
        [
          {
            moduleKey: "ff37b297-adfc-49c3-a4b0-41424ddc4054",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b30d7cb7-c5e2-4f7a-ae3d-05c745dc0cf1",
            type: 0,
            channel: 0,
          },
        ],
      "b30d7cb7-c5e2-4f7a-ae3d-05c745dc0cf1_1_0|019a9d56-e01e-4dc0-81b5-fd25534cfd44_detune":
        [
          {
            moduleKey: "b30d7cb7-c5e2-4f7a-ae3d-05c745dc0cf1",
            channel: 0,
            type: 1,
          },
          { moduleKey: "019a9d56-e01e-4dc0-81b5-fd25534cfd44", name: "detune" },
        ],
    },
  },
};

const jjj = {
  id: "04f71b20-59d7-4c15-9c4c-c01380bc1d2f",
  name: "jovial-jumbled-jelly",
  slug: "jovial-jumbled-jelly-04f71b20",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.225 },
      },
      "691799df-65f5-44b1-91ba-31998d5a4db6": {
        name: "fixed-anxious-clock",
        moduleKey: "691799df-65f5-44b1-91ba-31998d5a4db6",
        type: "CLOCK",
        state: { tempo: 145 },
      },
      "1c978fa2-d3a1-46b6-b941-12c63d687aa7": {
        name: "capable-moldy-sequencer",
        moduleKey: "1c978fa2-d3a1-46b6-b941-12c63d687aa7",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: 0,
          step1: 0,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: 100,
          step6: 300,
          step7: 500,
        },
      },
      "0f5d9b0e-59a6-4833-a304-c9aad887ee83": {
        name: "festive-defective-oscillator",
        moduleKey: "0f5d9b0e-59a6-4833-a304-c9aad887ee83",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: 0, waveform: "square" },
      },
      "8794ec0d-c56b-47bb-8110-0175f8d7da5d": {
        name: "warlike-melted-vca",
        moduleKey: "8794ec0d-c56b-47bb-8110-0175f8d7da5d",
        type: "VCA",
        state: {
          gate: 0,
          attack: 0.0625,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 1,
        },
      },
      "70d4b5ec-d373-425e-a67f-53e87b2d25ed": {
        name: "rampant-noisy-oscillator",
        moduleKey: "70d4b5ec-d373-425e-a67f-53e87b2d25ed",
        type: "OSCILLATOR",
        state: { frequency: 220, detune: 0, waveform: "sawtooth" },
      },
      "b8957166-a68c-4861-8e8a-b05ab48c7e18": {
        name: "ignorant-regal-clock",
        moduleKey: "b8957166-a68c-4861-8e8a-b05ab48c7e18",
        type: "CLOCK",
        state: { tempo: 580 },
      },
      "b6b978fb-4e28-43e1-9704-a0b008abcd5c": {
        name: "spotty-gainful-filter",
        moduleKey: "b6b978fb-4e28-43e1-9704-a0b008abcd5c",
        type: "FILTER",
        state: { frequency: 2800, detune: 0, Q: 0.6, gain: 0, type: "lowpass" },
      },
      "d1e5f2f6-6352-4954-825b-04afd5a2b9f3": {
        name: "expensive-driven-sequencer",
        moduleKey: "d1e5f2f6-6352-4954-825b-04afd5a2b9f3",
        type: "SEQUENCER",
        state: {
          steps: 3,
          step0: 0.25,
          step1: 0.5,
          step2: 0.25,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "f4c4409b-b3ac-49d4-b45b-885e2eabba0f": {
        name: "crowded-royal-sequencer",
        moduleKey: "f4c4409b-b3ac-49d4-b45b-885e2eabba0f",
        type: "SEQUENCER",
        state: {
          steps: 2,
          step0: 400,
          step1: 0,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "58e483a3-88dc-44c4-a1b3-96894dd2936a": {
        name: "keen-hollow-clock",
        moduleKey: "58e483a3-88dc-44c4-a1b3-96894dd2936a",
        type: "CLOCK",
        state: { tempo: 9.0625 },
      },
      "4cea0c1a-78ac-4dcf-87a8-5650fd4f8f21": {
        name: "lacking-orange-envelope",
        moduleKey: "4cea0c1a-78ac-4dcf-87a8-5650fd4f8f21",
        type: "ENVELOPE",
        state: {
          gate: 0.01,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.2,
          peak: 2400,
        },
      },
      "3039dd18-f859-43a9-87d2-ee302c485225": {
        name: "miniature-private-oscillator",
        moduleKey: "3039dd18-f859-43a9-87d2-ee302c485225",
        type: "OSCILLATOR",
        state: { frequency: 880, detune: 5, waveform: "sawtooth" },
      },
      "6c98b4fe-417b-476b-9da6-a41e9dddbfac": {
        name: "materialistic-shivering-oscillator",
        moduleKey: "6c98b4fe-417b-476b-9da6-a41e9dddbfac",
        type: "OSCILLATOR",
        state: { frequency: 0, detune: 0, waveform: "sine" },
      },
      "45dafb49-2cf3-476f-a616-87cef2182a52": {
        name: "stable-teeny-gain",
        moduleKey: "45dafb49-2cf3-476f-a616-87cef2182a52",
        type: "GAIN",
        state: { gain: 150 },
      },
      "f381c9e3-6bbc-483a-8dd8-340216cac6a3": {
        name: "elated-adaptable-sequencer",
        moduleKey: "f381c9e3-6bbc-483a-8dd8-340216cac6a3",
        type: "SEQUENCER",
        state: {
          steps: 3,
          step0: 55,
          step1: 110,
          step2: 55,
          step3: 220,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
    },
    modulePositions: {
      "0": [2630, 1406],
      "691799df-65f5-44b1-91ba-31998d5a4db6": [539, 761],
      "1c978fa2-d3a1-46b6-b941-12c63d687aa7": [932, 720],
      "0f5d9b0e-59a6-4833-a304-c9aad887ee83": [1359, 1069],
      "8794ec0d-c56b-47bb-8110-0175f8d7da5d": [1831, 1455],
      "70d4b5ec-d373-425e-a67f-53e87b2d25ed": [1331, 1623],
      "b8957166-a68c-4861-8e8a-b05ab48c7e18": [1803, 829],
      "b6b978fb-4e28-43e1-9704-a0b008abcd5c": [2248, 1406],
      "d1e5f2f6-6352-4954-825b-04afd5a2b9f3": [1808, 1117],
      "f4c4409b-b3ac-49d4-b45b-885e2eabba0f": [540, 983],
      "58e483a3-88dc-44c4-a1b3-96894dd2936a": [63, 772],
      "4cea0c1a-78ac-4dcf-87a8-5650fd4f8f21": [2244, 1065],
      "3039dd18-f859-43a9-87d2-ee302c485225": [1342, 1361],
      "6c98b4fe-417b-476b-9da6-a41e9dddbfac": [1340, 627],
      "45dafb49-2cf3-476f-a616-87cef2182a52": [1352, 907],
      "f381c9e3-6bbc-483a-8dd8-340216cac6a3": [1312, 332],
    },
    connections: {
      "1c978fa2-d3a1-46b6-b941-12c63d687aa7_1_0|0f5d9b0e-59a6-4833-a304-c9aad887ee83_detune":
        [
          {
            moduleKey: "1c978fa2-d3a1-46b6-b941-12c63d687aa7",
            channel: 0,
            type: 1,
          },
          { moduleKey: "0f5d9b0e-59a6-4833-a304-c9aad887ee83", name: "detune" },
        ],
      "691799df-65f5-44b1-91ba-31998d5a4db6_1_0|1c978fa2-d3a1-46b6-b941-12c63d687aa7_0_0":
        [
          {
            moduleKey: "691799df-65f5-44b1-91ba-31998d5a4db6",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "1c978fa2-d3a1-46b6-b941-12c63d687aa7",
            type: 0,
            channel: 0,
          },
        ],
      "691799df-65f5-44b1-91ba-31998d5a4db6_1_0|8794ec0d-c56b-47bb-8110-0175f8d7da5d_0_1":
        [
          {
            moduleKey: "691799df-65f5-44b1-91ba-31998d5a4db6",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "8794ec0d-c56b-47bb-8110-0175f8d7da5d",
            channel: 1,
            type: 0,
          },
        ],
      "0f5d9b0e-59a6-4833-a304-c9aad887ee83_1_0|8794ec0d-c56b-47bb-8110-0175f8d7da5d_0_0":
        [
          {
            moduleKey: "0f5d9b0e-59a6-4833-a304-c9aad887ee83",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "8794ec0d-c56b-47bb-8110-0175f8d7da5d",
            channel: 0,
            type: 0,
          },
        ],
      "1c978fa2-d3a1-46b6-b941-12c63d687aa7_1_0|70d4b5ec-d373-425e-a67f-53e87b2d25ed_detune":
        [
          {
            moduleKey: "1c978fa2-d3a1-46b6-b941-12c63d687aa7",
            channel: 0,
            type: 1,
          },
          { moduleKey: "70d4b5ec-d373-425e-a67f-53e87b2d25ed", name: "detune" },
        ],
      "70d4b5ec-d373-425e-a67f-53e87b2d25ed_1_0|8794ec0d-c56b-47bb-8110-0175f8d7da5d_0_0":
        [
          {
            moduleKey: "70d4b5ec-d373-425e-a67f-53e87b2d25ed",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "8794ec0d-c56b-47bb-8110-0175f8d7da5d",
            type: 0,
            channel: 0,
          },
        ],
      "691799df-65f5-44b1-91ba-31998d5a4db6_1_0|b8957166-a68c-4861-8e8a-b05ab48c7e18_0_0":
        [
          {
            moduleKey: "691799df-65f5-44b1-91ba-31998d5a4db6",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "b8957166-a68c-4861-8e8a-b05ab48c7e18",
            type: 0,
            channel: 0,
          },
        ],
      "b8957166-a68c-4861-8e8a-b05ab48c7e18_1_0|8794ec0d-c56b-47bb-8110-0175f8d7da5d_0_1":
        [
          {
            moduleKey: "b8957166-a68c-4861-8e8a-b05ab48c7e18",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "8794ec0d-c56b-47bb-8110-0175f8d7da5d",
            type: 0,
            channel: 1,
          },
        ],
      "b8957166-a68c-4861-8e8a-b05ab48c7e18_1_0|d1e5f2f6-6352-4954-825b-04afd5a2b9f3_0_0":
        [
          {
            moduleKey: "b8957166-a68c-4861-8e8a-b05ab48c7e18",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d1e5f2f6-6352-4954-825b-04afd5a2b9f3",
            type: 0,
            channel: 0,
          },
        ],
      "d1e5f2f6-6352-4954-825b-04afd5a2b9f3_1_0|8794ec0d-c56b-47bb-8110-0175f8d7da5d_gate":
        [
          {
            moduleKey: "d1e5f2f6-6352-4954-825b-04afd5a2b9f3",
            channel: 0,
            type: 1,
          },
          { moduleKey: "8794ec0d-c56b-47bb-8110-0175f8d7da5d", name: "gate" },
        ],
      "58e483a3-88dc-44c4-a1b3-96894dd2936a_1_0|691799df-65f5-44b1-91ba-31998d5a4db6_0_0":
        [
          {
            moduleKey: "58e483a3-88dc-44c4-a1b3-96894dd2936a",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "691799df-65f5-44b1-91ba-31998d5a4db6",
            type: 0,
            channel: 0,
          },
        ],
      "58e483a3-88dc-44c4-a1b3-96894dd2936a_1_0|f4c4409b-b3ac-49d4-b45b-885e2eabba0f_0_0":
        [
          {
            moduleKey: "58e483a3-88dc-44c4-a1b3-96894dd2936a",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "f4c4409b-b3ac-49d4-b45b-885e2eabba0f",
            type: 0,
            channel: 0,
          },
        ],
      "f4c4409b-b3ac-49d4-b45b-885e2eabba0f_1_0|1c978fa2-d3a1-46b6-b941-12c63d687aa7_step 1":
        [
          {
            moduleKey: "f4c4409b-b3ac-49d4-b45b-885e2eabba0f",
            channel: 0,
            type: 1,
          },
          { moduleKey: "1c978fa2-d3a1-46b6-b941-12c63d687aa7", name: "step 1" },
        ],
      "8794ec0d-c56b-47bb-8110-0175f8d7da5d_1_0|b6b978fb-4e28-43e1-9704-a0b008abcd5c_0_0":
        [
          {
            moduleKey: "8794ec0d-c56b-47bb-8110-0175f8d7da5d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b6b978fb-4e28-43e1-9704-a0b008abcd5c",
            type: 0,
            channel: 0,
          },
        ],
      "b6b978fb-4e28-43e1-9704-a0b008abcd5c_1_0|0_0_0": [
        {
          moduleKey: "b6b978fb-4e28-43e1-9704-a0b008abcd5c",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "691799df-65f5-44b1-91ba-31998d5a4db6_1_0|4cea0c1a-78ac-4dcf-87a8-5650fd4f8f21_0_0":
        [
          {
            moduleKey: "691799df-65f5-44b1-91ba-31998d5a4db6",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "4cea0c1a-78ac-4dcf-87a8-5650fd4f8f21",
            type: 0,
            channel: 0,
          },
        ],
      "b8957166-a68c-4861-8e8a-b05ab48c7e18_1_0|4cea0c1a-78ac-4dcf-87a8-5650fd4f8f21_0_0":
        [
          {
            moduleKey: "b8957166-a68c-4861-8e8a-b05ab48c7e18",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "4cea0c1a-78ac-4dcf-87a8-5650fd4f8f21",
            type: 0,
            channel: 0,
          },
        ],
      "4cea0c1a-78ac-4dcf-87a8-5650fd4f8f21_1_0|b6b978fb-4e28-43e1-9704-a0b008abcd5c_detune":
        [
          {
            moduleKey: "4cea0c1a-78ac-4dcf-87a8-5650fd4f8f21",
            channel: 0,
            type: 1,
          },
          { moduleKey: "b6b978fb-4e28-43e1-9704-a0b008abcd5c", name: "detune" },
        ],
      "1c978fa2-d3a1-46b6-b941-12c63d687aa7_1_0|3039dd18-f859-43a9-87d2-ee302c485225_detune":
        [
          {
            moduleKey: "1c978fa2-d3a1-46b6-b941-12c63d687aa7",
            channel: 0,
            type: 1,
          },
          { moduleKey: "3039dd18-f859-43a9-87d2-ee302c485225", name: "detune" },
        ],
      "3039dd18-f859-43a9-87d2-ee302c485225_1_0|8794ec0d-c56b-47bb-8110-0175f8d7da5d_0_0":
        [
          {
            moduleKey: "3039dd18-f859-43a9-87d2-ee302c485225",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "8794ec0d-c56b-47bb-8110-0175f8d7da5d",
            type: 0,
            channel: 0,
          },
        ],
      "6c98b4fe-417b-476b-9da6-a41e9dddbfac_1_0|45dafb49-2cf3-476f-a616-87cef2182a52_0_0":
        [
          {
            moduleKey: "6c98b4fe-417b-476b-9da6-a41e9dddbfac",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "45dafb49-2cf3-476f-a616-87cef2182a52",
            type: 0,
            channel: 0,
          },
        ],
      "45dafb49-2cf3-476f-a616-87cef2182a52_1_0|0f5d9b0e-59a6-4833-a304-c9aad887ee83_detune":
        [
          {
            moduleKey: "45dafb49-2cf3-476f-a616-87cef2182a52",
            channel: 0,
            type: 1,
          },
          { moduleKey: "0f5d9b0e-59a6-4833-a304-c9aad887ee83", name: "detune" },
        ],
      "58e483a3-88dc-44c4-a1b3-96894dd2936a_1_0|f381c9e3-6bbc-483a-8dd8-340216cac6a3_0_0":
        [
          {
            moduleKey: "58e483a3-88dc-44c4-a1b3-96894dd2936a",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "f381c9e3-6bbc-483a-8dd8-340216cac6a3",
            type: 0,
            channel: 0,
          },
        ],
      "f381c9e3-6bbc-483a-8dd8-340216cac6a3_1_0|6c98b4fe-417b-476b-9da6-a41e9dddbfac_frequency":
        [
          {
            moduleKey: "f381c9e3-6bbc-483a-8dd8-340216cac6a3",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6c98b4fe-417b-476b-9da6-a41e9dddbfac",
            name: "frequency",
          },
        ],
      "f4c4409b-b3ac-49d4-b45b-885e2eabba0f_1_0|1c978fa2-d3a1-46b6-b941-12c63d687aa7_step 5":
        [
          {
            moduleKey: "f4c4409b-b3ac-49d4-b45b-885e2eabba0f",
            channel: 0,
            type: 1,
          },
          { moduleKey: "1c978fa2-d3a1-46b6-b941-12c63d687aa7", name: "step 5" },
        ],
      "f4c4409b-b3ac-49d4-b45b-885e2eabba0f_1_0|1c978fa2-d3a1-46b6-b941-12c63d687aa7_step 4":
        [
          {
            moduleKey: "f4c4409b-b3ac-49d4-b45b-885e2eabba0f",
            channel: 0,
            type: 1,
          },
          { moduleKey: "1c978fa2-d3a1-46b6-b941-12c63d687aa7", name: "step 4" },
        ],
      "f4c4409b-b3ac-49d4-b45b-885e2eabba0f_1_0|1c978fa2-d3a1-46b6-b941-12c63d687aa7_step 3":
        [
          {
            moduleKey: "f4c4409b-b3ac-49d4-b45b-885e2eabba0f",
            channel: 0,
            type: 1,
          },
          { moduleKey: "1c978fa2-d3a1-46b6-b941-12c63d687aa7", name: "step 3" },
        ],
      "f4c4409b-b3ac-49d4-b45b-885e2eabba0f_1_0|1c978fa2-d3a1-46b6-b941-12c63d687aa7_step 2":
        [
          {
            moduleKey: "f4c4409b-b3ac-49d4-b45b-885e2eabba0f",
            channel: 0,
            type: 1,
          },
          { moduleKey: "1c978fa2-d3a1-46b6-b941-12c63d687aa7", name: "step 2" },
        ],
    },
  },
};

const rrr = {
  id: "0ecd2784-5e5e-4bae-b391-f3ad6d151b6b",
  name: "recondite-rightful-reason",
  slug: "recondite-rightful-reason-0ecd2784",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.45 },
      },
      "5fca33af-400d-4af6-b4e9-eaad603708eb": {
        name: "colossal-tacky-clock",
        moduleKey: "5fca33af-400d-4af6-b4e9-eaad603708eb",
        type: "CLOCK",
        state: { tempo: 264 },
      },
      "cfb37724-61f6-4025-b3fe-95b61068bb98": {
        name: "labored-maniacal-oscillator",
        moduleKey: "cfb37724-61f6-4025-b3fe-95b61068bb98",
        type: "OSCILLATOR",
        state: { frequency: 110, detune: 0, waveform: "sine" },
      },
      "769cccc7-90cf-49be-818f-340991406339": {
        name: "somber-present-clock",
        moduleKey: "769cccc7-90cf-49be-818f-340991406339",
        type: "CLOCK",
        state: { tempo: 66 },
      },
      "4e54d539-e56d-4c78-b0e6-0a16170627bc": {
        name: "snugly-moaning-sequencer",
        moduleKey: "4e54d539-e56d-4c78-b0e6-0a16170627bc",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: 0,
          step1: -1200,
          step2: -1200,
          step3: -1200,
          step4: -1200,
          step5: -1200,
          step6: 0,
          step7: 0,
        },
      },
      "50edc6b2-550d-47c4-a0a8-e44949e67d08": {
        name: "wild-suave-vca",
        moduleKey: "50edc6b2-550d-47c4-a0a8-e44949e67d08",
        type: "VCA",
        state: {
          gate: 0.5,
          attack: 0.0001,
          decay: 0,
          sustain: 1,
          release: 0.2,
          peak: 1,
        },
      },
      "507472b7-40ee-4704-a9a6-29320711d101": {
        name: "ragged-toothsome-envelope",
        moduleKey: "507472b7-40ee-4704-a9a6-29320711d101",
        type: "ENVELOPE",
        state: {
          gate: 0.001,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.025,
          peak: 2400,
        },
      },
      "13a85187-72d0-4197-a245-72c652c0f89e": {
        name: "abhorrent-gutsy-filter",
        moduleKey: "13a85187-72d0-4197-a245-72c652c0f89e",
        type: "FILTER",
        state: { frequency: 350, detune: 0, Q: 0.5, gain: 0, type: "lowpass" },
      },
      "f67e2179-9b98-41ca-bb4e-66476f18b107": {
        name: "nosy-crazy-sequencer",
        moduleKey: "f67e2179-9b98-41ca-bb4e-66476f18b107",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: 400,
          step1: 0,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: 1000,
          step6: 700,
          step7: 0,
        },
      },
      "dad2461c-db63-47ad-835e-f8b8a9c09cc9": {
        name: "cooperative-futuristic-oscillator",
        moduleKey: "dad2461c-db63-47ad-835e-f8b8a9c09cc9",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: 5, waveform: "sawtooth" },
      },
      "786259d2-dcef-4018-ac73-eb45c1dfc7b0": {
        name: "brave-succinct-vca",
        moduleKey: "786259d2-dcef-4018-ac73-eb45c1dfc7b0",
        type: "VCA",
        state: {
          gate: 0.25,
          attack: 0.3,
          decay: 0,
          sustain: 1,
          release: 0,
          peak: 0.5,
        },
      },
      "cd181acc-5e47-4944-a9af-986838c77843": {
        name: "skillful-eight-clock",
        moduleKey: "cd181acc-5e47-4944-a9af-986838c77843",
        type: "CLOCK",
        state: { tempo: 132 },
      },
      "d5f25b1a-6c87-473c-88fc-ffac29b03fbd": {
        name: "faint-political-filter",
        moduleKey: "d5f25b1a-6c87-473c-88fc-ffac29b03fbd",
        type: "FILTER",
        state: { frequency: 350, detune: 0, Q: 1, gain: 0, type: "lowpass" },
      },
      "87ce788a-268a-46cf-b112-cd5e25ea6238": {
        name: "regal-magenta-oscillator",
        moduleKey: "87ce788a-268a-46cf-b112-cd5e25ea6238",
        type: "OSCILLATOR",
        state: { frequency: 0, detune: 0, waveform: "sine" },
      },
      "1f208b2b-5ac7-4e9c-b7fa-a70f0371e6b6": {
        name: "political-holistic-oscillator",
        moduleKey: "1f208b2b-5ac7-4e9c-b7fa-a70f0371e6b6",
        type: "OSCILLATOR",
        state: { frequency: 0.05, detune: 0, waveform: "sine" },
      },
      "2068a8d8-90b0-4ecb-9313-d977d216e324": {
        name: "silky-gifted-shift",
        moduleKey: "2068a8d8-90b0-4ecb-9313-d977d216e324",
        type: "SHIFT",
        state: { inputMin: -1, inputMax: 1, outputMin: 0.01, outputMax: 0.4 },
      },
      "cb5fa0cf-6e53-4bde-8988-37a2dc187a96": {
        name: "uneven-unused-shift",
        moduleKey: "cb5fa0cf-6e53-4bde-8988-37a2dc187a96",
        type: "SHIFT",
        state: { inputMin: -1, inputMax: 1, outputMin: 0, outputMax: 10 },
      },
      "b91021db-66d7-4b37-8900-de6044b43b66": {
        name: "motionless-abrupt-sequencer",
        moduleKey: "b91021db-66d7-4b37-8900-de6044b43b66",
        type: "SEQUENCER",
        state: {
          steps: 3,
          step0: 0,
          step1: -200,
          step2: -1200,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "c6b32d35-f2c3-4729-a160-75c18dddc1a7": {
        name: "unequaled-saucy-envelope",
        moduleKey: "c6b32d35-f2c3-4729-a160-75c18dddc1a7",
        type: "ENVELOPE",
        state: {
          gate: 1,
          attack: 0.15,
          decay: 0.3,
          sustain: 0,
          release: 0,
          peak: 2400,
        },
      },
      "8f4f05e8-1416-4b68-b285-842b9dfdadae": {
        name: "seemly-cynical-oscillator",
        moduleKey: "8f4f05e8-1416-4b68-b285-842b9dfdadae",
        type: "OSCILLATOR",
        state: { frequency: 880, detune: -5, waveform: "sine" },
      },
      "9109d7ca-4b15-4758-bd39-2fc29097169f": {
        name: "attractive-dry-clock",
        moduleKey: "9109d7ca-4b15-4758-bd39-2fc29097169f",
        type: "CLOCK",
        state: { tempo: 33 },
      },
      "9772ad4a-b25b-4066-9049-5987996b7597": {
        name: "wicked-obnoxious-noise",
        moduleKey: "9772ad4a-b25b-4066-9049-5987996b7597",
        type: "NOISE",
        state: {},
      },
      "2f519410-9315-44e3-b96e-2dff5771960d": {
        name: "anxious-rightful-oscillator",
        moduleKey: "2f519410-9315-44e3-b96e-2dff5771960d",
        type: "OSCILLATOR",
        state: { frequency: 110, detune: 0, waveform: "sine" },
      },
      "469440e2-e2c1-49f2-b33d-97fd10e77640": {
        name: "jealous-sudden-vca",
        moduleKey: "469440e2-e2c1-49f2-b33d-97fd10e77640",
        type: "VCA",
        state: {
          gate: 0.001,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 0.6,
        },
      },
      "6faf6daa-0bb6-44ef-a714-d508e3a1b666": {
        name: "imperfect-blushing-filter",
        moduleKey: "6faf6daa-0bb6-44ef-a714-d508e3a1b666",
        type: "FILTER",
        state: {
          frequency: 1400,
          detune: 0,
          Q: 0.125,
          gain: 0,
          type: "lowpass",
        },
      },
      "457215e4-0790-4ee9-968b-b778b1715d7c": {
        name: "majestic-talented-envelope",
        moduleKey: "457215e4-0790-4ee9-968b-b778b1715d7c",
        type: "ENVELOPE",
        state: {
          gate: 0.001,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.025,
          peak: 2400,
        },
      },
      "3d06c889-4e22-44fd-8b8d-5062459bc372": {
        name: "magenta-absorbed-sequencer",
        moduleKey: "3d06c889-4e22-44fd-8b8d-5062459bc372",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 0,
          step1: 0,
          step2: 1,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "e23ed37f-a3a8-4d38-949c-5e296c9f96f6": {
        name: "fast-clean-gain",
        moduleKey: "e23ed37f-a3a8-4d38-949c-5e296c9f96f6",
        type: "GAIN",
        state: { gain: 0 },
      },
      "58dd8faa-bbc3-454a-865d-ffc65d726edd": {
        name: "abhorrent-shrewd-delay",
        moduleKey: "58dd8faa-bbc3-454a-865d-ffc65d726edd",
        type: "DELAY",
        state: { delayTime: 0.22222 },
      },
      "1e735f80-0b42-4732-97ff-64bdae9bbedb": {
        name: "native-fluent-gain",
        moduleKey: "1e735f80-0b42-4732-97ff-64bdae9bbedb",
        type: "GAIN",
        state: { gain: 0 },
      },
      "0ce86c84-aed3-4ee2-a6fa-61beeb29f966": {
        name: "zesty-benevolent-delay",
        moduleKey: "0ce86c84-aed3-4ee2-a6fa-61beeb29f966",
        type: "DELAY",
        state: { delayTime: 0.22222 },
      },
      "aaabd2f5-993c-4c60-b6b2-03d74ba75580": {
        name: "light-exciting-pan",
        moduleKey: "aaabd2f5-993c-4c60-b6b2-03d74ba75580",
        type: "PAN",
        state: { pan: -0.7 },
      },
      "54548ae3-2b23-4da0-a975-a448d858abdc": {
        name: "expensive-gold-delay",
        moduleKey: "54548ae3-2b23-4da0-a975-a448d858abdc",
        type: "DELAY",
        state: { delayTime: 0.33333 },
      },
      "cd64ce5a-be9f-4dd1-a63e-d66496920fdb": {
        name: "terrible-try-pan",
        moduleKey: "cd64ce5a-be9f-4dd1-a63e-d66496920fdb",
        type: "PAN",
        state: { pan: 0.6 },
      },
      "764ac873-566e-44c8-be72-e055d62e3e1a": {
        name: "telling-pricey-oscillator",
        moduleKey: "764ac873-566e-44c8-be72-e055d62e3e1a",
        type: "OSCILLATOR",
        state: { frequency: 0.01, detune: 0, waveform: "sine" },
      },
      "5798cdca-bd36-4ae5-b493-25c35d16bc22": {
        name: "rude-jazzy-gain",
        moduleKey: "5798cdca-bd36-4ae5-b493-25c35d16bc22",
        type: "GAIN",
        state: { gain: 0 },
      },
      "b268d954-15d4-48c2-ba6b-d3e5d17b438c": {
        name: "bashful-careless-limiter",
        moduleKey: "b268d954-15d4-48c2-ba6b-d3e5d17b438c",
        type: "LIMITER",
        state: {},
      },
      "bff443c8-af18-422c-94a0-562bf8c0af9b": {
        name: "direful-sneaky-shift",
        moduleKey: "bff443c8-af18-422c-94a0-562bf8c0af9b",
        type: "SHIFT",
        state: { inputMin: -1, inputMax: 1, outputMin: 0.3, outputMax: 0.44 },
      },
      "9ef972bc-8160-4c9c-8527-bf627ba0fa84": {
        name: "breezy-gaudy-filter",
        moduleKey: "9ef972bc-8160-4c9c-8527-bf627ba0fa84",
        type: "FILTER",
        state: { frequency: 400, detune: 0, Q: 0.2, gain: 0, type: "highpass" },
      },
      "7b65f0b5-3f11-41b0-9f4f-38fb7ea595f2": {
        name: "rural-acrid-oscillator",
        moduleKey: "7b65f0b5-3f11-41b0-9f4f-38fb7ea595f2",
        type: "OSCILLATOR",
        state: { frequency: 0.03, detune: 0, waveform: "sine" },
      },
      "d8d233d1-1412-47d3-92a3-0c02c9bd9456": {
        name: "upset-ideal-gain",
        moduleKey: "d8d233d1-1412-47d3-92a3-0c02c9bd9456",
        type: "GAIN",
        state: { gain: 0 },
      },
      "c3e003f9-7e05-4106-91d5-283dc31edc33": {
        name: "bent-rich-oscillator",
        moduleKey: "c3e003f9-7e05-4106-91d5-283dc31edc33",
        type: "OSCILLATOR",
        state: { frequency: 0.0005, detune: 0, waveform: "sine" },
      },
      "814f96b9-e79a-4ebc-b9d7-19b80a6bf2ab": {
        name: "doubtful-lush-oscillator",
        moduleKey: "814f96b9-e79a-4ebc-b9d7-19b80a6bf2ab",
        type: "OSCILLATOR",
        state: { frequency: 0.4296875, detune: 0, waveform: "sine" },
      },
      "cc652dba-ed5c-4ffd-9ee2-20b56c4b1034": {
        name: "gentle-imported-gain",
        moduleKey: "cc652dba-ed5c-4ffd-9ee2-20b56c4b1034",
        type: "GAIN",
        state: { gain: 1200 },
      },
      "923f6ea9-60f0-4002-a3ff-573f4ff18a29": {
        name: "economic-slick-sequencer",
        moduleKey: "923f6ea9-60f0-4002-a3ff-573f4ff18a29",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 0.025,
          step1: 0.1,
          step2: 0.05,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
    },
    modulePositions: {
      "0": [2748, 823],
      "5fca33af-400d-4af6-b4e9-eaad603708eb": [569, 727],
      "cfb37724-61f6-4025-b3fe-95b61068bb98": [1343, 528],
      "769cccc7-90cf-49be-818f-340991406339": [103, 837],
      "4e54d539-e56d-4c78-b0e6-0a16170627bc": [934, 471],
      "50edc6b2-550d-47c4-a0a8-e44949e67d08": [1785, 810],
      "507472b7-40ee-4704-a9a6-29320711d101": [932, 134],
      "13a85187-72d0-4197-a245-72c652c0f89e": [2141, 813],
      "f67e2179-9b98-41ca-bb4e-66476f18b107": [971, 1745],
      "dad2461c-db63-47ad-835e-f8b8a9c09cc9": [1384, 1626],
      "786259d2-dcef-4018-ac73-eb45c1dfc7b0": [1872, 1845],
      "cd181acc-5e47-4944-a9af-986838c77843": [160, 1782],
      "d5f25b1a-6c87-473c-88fc-ffac29b03fbd": [2626, 1846],
      "87ce788a-268a-46cf-b112-cd5e25ea6238": [880, 2279],
      "1f208b2b-5ac7-4e9c-b7fa-a70f0371e6b6": [151, 2263],
      "2068a8d8-90b0-4ecb-9313-d977d216e324": [1255, 2297],
      "cb5fa0cf-6e53-4bde-8988-37a2dc187a96": [534, 2280],
      "b91021db-66d7-4b37-8900-de6044b43b66": [571, 1912],
      "c6b32d35-f2c3-4729-a160-75c18dddc1a7": [1798, 2193],
      "8f4f05e8-1416-4b68-b285-842b9dfdadae": [1386, 1889],
      "9109d7ca-4b15-4758-bd39-2fc29097169f": [127, 460],
      "9772ad4a-b25b-4066-9049-5987996b7597": [848, 1115],
      "2f519410-9315-44e3-b96e-2dff5771960d": [830, 1263],
      "469440e2-e2c1-49f2-b33d-97fd10e77640": [1275, 1265],
      "6faf6daa-0bb6-44ef-a714-d508e3a1b666": [2030, 1221],
      "457215e4-0790-4ee9-968b-b778b1715d7c": [456, 1154],
      "3d06c889-4e22-44fd-8b8d-5062459bc372": [1261, 941],
      "e23ed37f-a3a8-4d38-949c-5e296c9f96f6": [1685, 1304],
      "58dd8faa-bbc3-454a-865d-ffc65d726edd": [3536, 2320],
      "1e735f80-0b42-4732-97ff-64bdae9bbedb": [3904, 2317],
      "0ce86c84-aed3-4ee2-a6fa-61beeb29f966": [4302, 2208],
      "aaabd2f5-993c-4c60-b6b2-03d74ba75580": [4690, 2214],
      "54548ae3-2b23-4da0-a975-a448d858abdc": [4301, 2467],
      "cd64ce5a-be9f-4dd1-a63e-d66496920fdb": [4693, 2479],
      "764ac873-566e-44c8-be72-e055d62e3e1a": [4708, 2656],
      "5798cdca-bd36-4ae5-b493-25c35d16bc22": [5049, 2475],
      "b268d954-15d4-48c2-ba6b-d3e5d17b438c": [3597, 1909],
      "bff443c8-af18-422c-94a0-562bf8c0af9b": [3887, 2558],
      "9ef972bc-8160-4c9c-8527-bf627ba0fa84": [3797, 1975],
      "7b65f0b5-3f11-41b0-9f4f-38fb7ea595f2": [3506, 2570],
      "d8d233d1-1412-47d3-92a3-0c02c9bd9456": [3185, 1823],
      "c3e003f9-7e05-4106-91d5-283dc31edc33": [3187, 1598],
      "814f96b9-e79a-4ebc-b9d7-19b80a6bf2ab": [2944, 1327],
      "cc652dba-ed5c-4ffd-9ee2-20b56c4b1034": [3291, 1409],
      "923f6ea9-60f0-4002-a3ff-573f4ff18a29": [1873, 1550],
    },
    connections: {
      "769cccc7-90cf-49be-818f-340991406339_1_0|5fca33af-400d-4af6-b4e9-eaad603708eb_0_0":
        [
          {
            moduleKey: "769cccc7-90cf-49be-818f-340991406339",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "5fca33af-400d-4af6-b4e9-eaad603708eb",
            type: 0,
            channel: 0,
          },
        ],
      "5fca33af-400d-4af6-b4e9-eaad603708eb_1_0|4e54d539-e56d-4c78-b0e6-0a16170627bc_0_0":
        [
          {
            moduleKey: "5fca33af-400d-4af6-b4e9-eaad603708eb",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "4e54d539-e56d-4c78-b0e6-0a16170627bc",
            type: 0,
            channel: 0,
          },
        ],
      "4e54d539-e56d-4c78-b0e6-0a16170627bc_1_0|cfb37724-61f6-4025-b3fe-95b61068bb98_detune":
        [
          {
            moduleKey: "4e54d539-e56d-4c78-b0e6-0a16170627bc",
            channel: 0,
            type: 1,
          },
          { moduleKey: "cfb37724-61f6-4025-b3fe-95b61068bb98", name: "detune" },
        ],
      "cfb37724-61f6-4025-b3fe-95b61068bb98_1_0|50edc6b2-550d-47c4-a0a8-e44949e67d08_0_0":
        [
          {
            moduleKey: "cfb37724-61f6-4025-b3fe-95b61068bb98",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "50edc6b2-550d-47c4-a0a8-e44949e67d08",
            type: 0,
            channel: 0,
          },
        ],
      "769cccc7-90cf-49be-818f-340991406339_1_0|50edc6b2-550d-47c4-a0a8-e44949e67d08_0_1":
        [
          {
            moduleKey: "769cccc7-90cf-49be-818f-340991406339",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "50edc6b2-550d-47c4-a0a8-e44949e67d08",
            channel: 1,
            type: 0,
          },
        ],
      "507472b7-40ee-4704-a9a6-29320711d101_1_0|cfb37724-61f6-4025-b3fe-95b61068bb98_detune":
        [
          {
            moduleKey: "507472b7-40ee-4704-a9a6-29320711d101",
            channel: 0,
            type: 1,
          },
          { moduleKey: "cfb37724-61f6-4025-b3fe-95b61068bb98", name: "detune" },
        ],
      "769cccc7-90cf-49be-818f-340991406339_1_0|507472b7-40ee-4704-a9a6-29320711d101_0_0":
        [
          {
            moduleKey: "769cccc7-90cf-49be-818f-340991406339",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "507472b7-40ee-4704-a9a6-29320711d101",
            type: 0,
            channel: 0,
          },
        ],
      "50edc6b2-550d-47c4-a0a8-e44949e67d08_1_0|13a85187-72d0-4197-a245-72c652c0f89e_0_0":
        [
          {
            moduleKey: "50edc6b2-550d-47c4-a0a8-e44949e67d08",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "13a85187-72d0-4197-a245-72c652c0f89e",
            type: 0,
            channel: 0,
          },
        ],
      "13a85187-72d0-4197-a245-72c652c0f89e_1_0|0_0_0": [
        {
          moduleKey: "13a85187-72d0-4197-a245-72c652c0f89e",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "f67e2179-9b98-41ca-bb4e-66476f18b107_1_0|dad2461c-db63-47ad-835e-f8b8a9c09cc9_detune":
        [
          {
            moduleKey: "f67e2179-9b98-41ca-bb4e-66476f18b107",
            channel: 0,
            type: 1,
          },
          { moduleKey: "dad2461c-db63-47ad-835e-f8b8a9c09cc9", name: "detune" },
        ],
      "769cccc7-90cf-49be-818f-340991406339_1_0|cd181acc-5e47-4944-a9af-986838c77843_0_0":
        [
          {
            moduleKey: "769cccc7-90cf-49be-818f-340991406339",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "cd181acc-5e47-4944-a9af-986838c77843",
            type: 0,
            channel: 0,
          },
        ],
      "cd181acc-5e47-4944-a9af-986838c77843_1_0|786259d2-dcef-4018-ac73-eb45c1dfc7b0_0_1":
        [
          {
            moduleKey: "cd181acc-5e47-4944-a9af-986838c77843",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "786259d2-dcef-4018-ac73-eb45c1dfc7b0",
            type: 0,
            channel: 1,
          },
        ],
      "dad2461c-db63-47ad-835e-f8b8a9c09cc9_1_0|786259d2-dcef-4018-ac73-eb45c1dfc7b0_0_0":
        [
          {
            moduleKey: "dad2461c-db63-47ad-835e-f8b8a9c09cc9",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "786259d2-dcef-4018-ac73-eb45c1dfc7b0",
            type: 0,
            channel: 0,
          },
        ],
      "786259d2-dcef-4018-ac73-eb45c1dfc7b0_1_0|d5f25b1a-6c87-473c-88fc-ffac29b03fbd_0_0":
        [
          {
            moduleKey: "786259d2-dcef-4018-ac73-eb45c1dfc7b0",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d5f25b1a-6c87-473c-88fc-ffac29b03fbd",
            type: 0,
            channel: 0,
          },
        ],
      "d5f25b1a-6c87-473c-88fc-ffac29b03fbd_1_0|0_0_0": [
        {
          moduleKey: "d5f25b1a-6c87-473c-88fc-ffac29b03fbd",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "cd181acc-5e47-4944-a9af-986838c77843_1_0|f67e2179-9b98-41ca-bb4e-66476f18b107_0_0":
        [
          {
            moduleKey: "cd181acc-5e47-4944-a9af-986838c77843",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "f67e2179-9b98-41ca-bb4e-66476f18b107",
            type: 0,
            channel: 0,
          },
        ],
      "87ce788a-268a-46cf-b112-cd5e25ea6238_1_0|2068a8d8-90b0-4ecb-9313-d977d216e324_0_0":
        [
          {
            moduleKey: "87ce788a-268a-46cf-b112-cd5e25ea6238",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "2068a8d8-90b0-4ecb-9313-d977d216e324",
            type: 0,
            channel: 0,
          },
        ],
      "2068a8d8-90b0-4ecb-9313-d977d216e324_1_0|786259d2-dcef-4018-ac73-eb45c1dfc7b0_release":
        [
          {
            moduleKey: "2068a8d8-90b0-4ecb-9313-d977d216e324",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "786259d2-dcef-4018-ac73-eb45c1dfc7b0",
            name: "release",
          },
        ],
      "1f208b2b-5ac7-4e9c-b7fa-a70f0371e6b6_1_0|cb5fa0cf-6e53-4bde-8988-37a2dc187a96_0_0":
        [
          {
            moduleKey: "1f208b2b-5ac7-4e9c-b7fa-a70f0371e6b6",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "cb5fa0cf-6e53-4bde-8988-37a2dc187a96",
            type: 0,
            channel: 0,
          },
        ],
      "cb5fa0cf-6e53-4bde-8988-37a2dc187a96_1_0|87ce788a-268a-46cf-b112-cd5e25ea6238_frequency":
        [
          {
            moduleKey: "cb5fa0cf-6e53-4bde-8988-37a2dc187a96",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "87ce788a-268a-46cf-b112-cd5e25ea6238",
            name: "frequency",
          },
        ],
      "b91021db-66d7-4b37-8900-de6044b43b66_1_0|dad2461c-db63-47ad-835e-f8b8a9c09cc9_detune":
        [
          {
            moduleKey: "b91021db-66d7-4b37-8900-de6044b43b66",
            channel: 0,
            type: 1,
          },
          { moduleKey: "dad2461c-db63-47ad-835e-f8b8a9c09cc9", name: "detune" },
        ],
      "cd181acc-5e47-4944-a9af-986838c77843_1_0|c6b32d35-f2c3-4729-a160-75c18dddc1a7_0_0":
        [
          {
            moduleKey: "cd181acc-5e47-4944-a9af-986838c77843",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "c6b32d35-f2c3-4729-a160-75c18dddc1a7",
            channel: 0,
            type: 0,
          },
        ],
      "c6b32d35-f2c3-4729-a160-75c18dddc1a7_1_0|d5f25b1a-6c87-473c-88fc-ffac29b03fbd_detune":
        [
          {
            moduleKey: "c6b32d35-f2c3-4729-a160-75c18dddc1a7",
            channel: 0,
            type: 1,
          },
          { moduleKey: "d5f25b1a-6c87-473c-88fc-ffac29b03fbd", name: "detune" },
        ],
      "b91021db-66d7-4b37-8900-de6044b43b66_1_0|8f4f05e8-1416-4b68-b285-842b9dfdadae_detune":
        [
          {
            moduleKey: "b91021db-66d7-4b37-8900-de6044b43b66",
            type: 1,
            channel: 0,
          },
          { moduleKey: "8f4f05e8-1416-4b68-b285-842b9dfdadae", name: "detune" },
        ],
      "8f4f05e8-1416-4b68-b285-842b9dfdadae_1_0|786259d2-dcef-4018-ac73-eb45c1dfc7b0_0_0":
        [
          {
            moduleKey: "8f4f05e8-1416-4b68-b285-842b9dfdadae",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "786259d2-dcef-4018-ac73-eb45c1dfc7b0",
            type: 0,
            channel: 0,
          },
        ],
      "9109d7ca-4b15-4758-bd39-2fc29097169f_1_0|769cccc7-90cf-49be-818f-340991406339_0_0":
        [
          {
            moduleKey: "9109d7ca-4b15-4758-bd39-2fc29097169f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "769cccc7-90cf-49be-818f-340991406339",
            type: 0,
            channel: 0,
          },
        ],
      "9109d7ca-4b15-4758-bd39-2fc29097169f_1_0|b91021db-66d7-4b37-8900-de6044b43b66_0_0":
        [
          {
            moduleKey: "9109d7ca-4b15-4758-bd39-2fc29097169f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b91021db-66d7-4b37-8900-de6044b43b66",
            type: 0,
            channel: 0,
          },
        ],
      "9772ad4a-b25b-4066-9049-5987996b7597_1_0|469440e2-e2c1-49f2-b33d-97fd10e77640_0_0":
        [
          {
            moduleKey: "9772ad4a-b25b-4066-9049-5987996b7597",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "469440e2-e2c1-49f2-b33d-97fd10e77640",
            type: 0,
            channel: 0,
          },
        ],
      "2f519410-9315-44e3-b96e-2dff5771960d_1_0|469440e2-e2c1-49f2-b33d-97fd10e77640_0_0":
        [
          {
            moduleKey: "2f519410-9315-44e3-b96e-2dff5771960d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "469440e2-e2c1-49f2-b33d-97fd10e77640",
            type: 0,
            channel: 0,
          },
        ],
      "cd181acc-5e47-4944-a9af-986838c77843_1_0|469440e2-e2c1-49f2-b33d-97fd10e77640_0_1":
        [
          {
            moduleKey: "cd181acc-5e47-4944-a9af-986838c77843",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "469440e2-e2c1-49f2-b33d-97fd10e77640",
            channel: 1,
            type: 0,
          },
        ],
      "6faf6daa-0bb6-44ef-a714-d508e3a1b666_1_0|0_0_0": [
        {
          moduleKey: "6faf6daa-0bb6-44ef-a714-d508e3a1b666",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "cd181acc-5e47-4944-a9af-986838c77843_1_0|457215e4-0790-4ee9-968b-b778b1715d7c_0_0":
        [
          {
            moduleKey: "cd181acc-5e47-4944-a9af-986838c77843",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "457215e4-0790-4ee9-968b-b778b1715d7c",
            channel: 0,
            type: 0,
          },
        ],
      "457215e4-0790-4ee9-968b-b778b1715d7c_1_0|2f519410-9315-44e3-b96e-2dff5771960d_detune":
        [
          {
            moduleKey: "457215e4-0790-4ee9-968b-b778b1715d7c",
            channel: 0,
            type: 1,
          },
          { moduleKey: "2f519410-9315-44e3-b96e-2dff5771960d", name: "detune" },
        ],
      "3d06c889-4e22-44fd-8b8d-5062459bc372_1_0|e23ed37f-a3a8-4d38-949c-5e296c9f96f6_gain":
        [
          {
            moduleKey: "3d06c889-4e22-44fd-8b8d-5062459bc372",
            channel: 0,
            type: 1,
          },
          { moduleKey: "e23ed37f-a3a8-4d38-949c-5e296c9f96f6", name: "gain" },
        ],
      "469440e2-e2c1-49f2-b33d-97fd10e77640_1_0|e23ed37f-a3a8-4d38-949c-5e296c9f96f6_0_0":
        [
          {
            moduleKey: "469440e2-e2c1-49f2-b33d-97fd10e77640",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "e23ed37f-a3a8-4d38-949c-5e296c9f96f6",
            type: 0,
            channel: 0,
          },
        ],
      "e23ed37f-a3a8-4d38-949c-5e296c9f96f6_1_0|6faf6daa-0bb6-44ef-a714-d508e3a1b666_0_0":
        [
          {
            moduleKey: "e23ed37f-a3a8-4d38-949c-5e296c9f96f6",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6faf6daa-0bb6-44ef-a714-d508e3a1b666",
            type: 0,
            channel: 0,
          },
        ],
      "cd181acc-5e47-4944-a9af-986838c77843_1_0|3d06c889-4e22-44fd-8b8d-5062459bc372_0_0":
        [
          {
            moduleKey: "cd181acc-5e47-4944-a9af-986838c77843",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "3d06c889-4e22-44fd-8b8d-5062459bc372",
            channel: 0,
            type: 0,
          },
        ],
      "457215e4-0790-4ee9-968b-b778b1715d7c_1_0|6faf6daa-0bb6-44ef-a714-d508e3a1b666_detune":
        [
          {
            moduleKey: "457215e4-0790-4ee9-968b-b778b1715d7c",
            channel: 0,
            type: 1,
          },
          { moduleKey: "6faf6daa-0bb6-44ef-a714-d508e3a1b666", name: "detune" },
        ],
      "0ce86c84-aed3-4ee2-a6fa-61beeb29f966_1_0|aaabd2f5-993c-4c60-b6b2-03d74ba75580_0_0":
        [
          {
            moduleKey: "0ce86c84-aed3-4ee2-a6fa-61beeb29f966",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "aaabd2f5-993c-4c60-b6b2-03d74ba75580",
            channel: 0,
            type: 0,
          },
        ],
      "58dd8faa-bbc3-454a-865d-ffc65d726edd_1_0|1e735f80-0b42-4732-97ff-64bdae9bbedb_0_0":
        [
          {
            moduleKey: "58dd8faa-bbc3-454a-865d-ffc65d726edd",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "1e735f80-0b42-4732-97ff-64bdae9bbedb",
            type: 0,
            channel: 0,
          },
        ],
      "1e735f80-0b42-4732-97ff-64bdae9bbedb_1_0|0ce86c84-aed3-4ee2-a6fa-61beeb29f966_0_0":
        [
          {
            moduleKey: "1e735f80-0b42-4732-97ff-64bdae9bbedb",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "0ce86c84-aed3-4ee2-a6fa-61beeb29f966",
            type: 0,
            channel: 0,
          },
        ],
      "aaabd2f5-993c-4c60-b6b2-03d74ba75580_1_0|d5f25b1a-6c87-473c-88fc-ffac29b03fbd_0_0":
        [
          {
            moduleKey: "aaabd2f5-993c-4c60-b6b2-03d74ba75580",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d5f25b1a-6c87-473c-88fc-ffac29b03fbd",
            type: 0,
            channel: 0,
          },
        ],
      "1e735f80-0b42-4732-97ff-64bdae9bbedb_1_0|54548ae3-2b23-4da0-a975-a448d858abdc_0_0":
        [
          {
            moduleKey: "1e735f80-0b42-4732-97ff-64bdae9bbedb",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "54548ae3-2b23-4da0-a975-a448d858abdc",
            type: 0,
            channel: 0,
          },
        ],
      "54548ae3-2b23-4da0-a975-a448d858abdc_1_0|cd64ce5a-be9f-4dd1-a63e-d66496920fdb_0_0":
        [
          {
            moduleKey: "54548ae3-2b23-4da0-a975-a448d858abdc",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "cd64ce5a-be9f-4dd1-a63e-d66496920fdb",
            type: 0,
            channel: 0,
          },
        ],
      "764ac873-566e-44c8-be72-e055d62e3e1a_1_0|5798cdca-bd36-4ae5-b493-25c35d16bc22_gain":
        [
          {
            moduleKey: "764ac873-566e-44c8-be72-e055d62e3e1a",
            channel: 0,
            type: 1,
          },
          { moduleKey: "5798cdca-bd36-4ae5-b493-25c35d16bc22", name: "gain" },
        ],
      "cd64ce5a-be9f-4dd1-a63e-d66496920fdb_1_0|5798cdca-bd36-4ae5-b493-25c35d16bc22_0_0":
        [
          {
            moduleKey: "cd64ce5a-be9f-4dd1-a63e-d66496920fdb",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "5798cdca-bd36-4ae5-b493-25c35d16bc22",
            type: 0,
            channel: 0,
          },
        ],
      "5798cdca-bd36-4ae5-b493-25c35d16bc22_1_0|d5f25b1a-6c87-473c-88fc-ffac29b03fbd_0_0":
        [
          {
            moduleKey: "5798cdca-bd36-4ae5-b493-25c35d16bc22",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d5f25b1a-6c87-473c-88fc-ffac29b03fbd",
            type: 0,
            channel: 0,
          },
        ],
      "bff443c8-af18-422c-94a0-562bf8c0af9b_1_0|1e735f80-0b42-4732-97ff-64bdae9bbedb_gain":
        [
          {
            moduleKey: "bff443c8-af18-422c-94a0-562bf8c0af9b",
            channel: 0,
            type: 1,
          },
          { moduleKey: "1e735f80-0b42-4732-97ff-64bdae9bbedb", name: "gain" },
        ],
      "b268d954-15d4-48c2-ba6b-d3e5d17b438c_1_0|9ef972bc-8160-4c9c-8527-bf627ba0fa84_0_0":
        [
          {
            moduleKey: "b268d954-15d4-48c2-ba6b-d3e5d17b438c",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "9ef972bc-8160-4c9c-8527-bf627ba0fa84",
            type: 0,
            channel: 0,
          },
        ],
      "9ef972bc-8160-4c9c-8527-bf627ba0fa84_1_0|58dd8faa-bbc3-454a-865d-ffc65d726edd_0_0":
        [
          {
            moduleKey: "9ef972bc-8160-4c9c-8527-bf627ba0fa84",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "58dd8faa-bbc3-454a-865d-ffc65d726edd",
            type: 0,
            channel: 0,
          },
        ],
      "7b65f0b5-3f11-41b0-9f4f-38fb7ea595f2_1_0|bff443c8-af18-422c-94a0-562bf8c0af9b_0_0":
        [
          {
            moduleKey: "7b65f0b5-3f11-41b0-9f4f-38fb7ea595f2",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "bff443c8-af18-422c-94a0-562bf8c0af9b",
            type: 0,
            channel: 0,
          },
        ],
      "d5f25b1a-6c87-473c-88fc-ffac29b03fbd_1_0|d8d233d1-1412-47d3-92a3-0c02c9bd9456_0_0":
        [
          {
            moduleKey: "d5f25b1a-6c87-473c-88fc-ffac29b03fbd",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d8d233d1-1412-47d3-92a3-0c02c9bd9456",
            type: 0,
            channel: 0,
          },
        ],
      "c3e003f9-7e05-4106-91d5-283dc31edc33_1_0|d8d233d1-1412-47d3-92a3-0c02c9bd9456_gain":
        [
          {
            moduleKey: "c3e003f9-7e05-4106-91d5-283dc31edc33",
            channel: 0,
            type: 1,
          },
          { moduleKey: "d8d233d1-1412-47d3-92a3-0c02c9bd9456", name: "gain" },
        ],
      "d8d233d1-1412-47d3-92a3-0c02c9bd9456_1_0|b268d954-15d4-48c2-ba6b-d3e5d17b438c_0_0":
        [
          {
            moduleKey: "d8d233d1-1412-47d3-92a3-0c02c9bd9456",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b268d954-15d4-48c2-ba6b-d3e5d17b438c",
            type: 0,
            channel: 0,
          },
        ],
      "814f96b9-e79a-4ebc-b9d7-19b80a6bf2ab_1_0|cc652dba-ed5c-4ffd-9ee2-20b56c4b1034_0_0":
        [
          {
            moduleKey: "814f96b9-e79a-4ebc-b9d7-19b80a6bf2ab",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "cc652dba-ed5c-4ffd-9ee2-20b56c4b1034",
            type: 0,
            channel: 0,
          },
        ],
      "cc652dba-ed5c-4ffd-9ee2-20b56c4b1034_1_0|c3e003f9-7e05-4106-91d5-283dc31edc33_detune":
        [
          {
            moduleKey: "cc652dba-ed5c-4ffd-9ee2-20b56c4b1034",
            channel: 0,
            type: 1,
          },
          { moduleKey: "c3e003f9-7e05-4106-91d5-283dc31edc33", name: "detune" },
        ],
      "923f6ea9-60f0-4002-a3ff-573f4ff18a29_1_0|786259d2-dcef-4018-ac73-eb45c1dfc7b0_release":
        [
          {
            moduleKey: "923f6ea9-60f0-4002-a3ff-573f4ff18a29",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "786259d2-dcef-4018-ac73-eb45c1dfc7b0",
            name: "release",
          },
        ],
      "769cccc7-90cf-49be-818f-340991406339_1_0|923f6ea9-60f0-4002-a3ff-573f4ff18a29_0_0":
        [
          {
            moduleKey: "769cccc7-90cf-49be-818f-340991406339",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "923f6ea9-60f0-4002-a3ff-573f4ff18a29",
            channel: 0,
            type: 0,
          },
        ],
    },
  },
};

const sss = {
  id: "281f25f1-d6dd-44c6-b76e-79c4f4acb59c",
  name: "shy-sturdy-suit",
  slug: "shy-sturdy-suit-281f25f1",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.45 },
      },
      "3011cfeb-e9c1-4f79-9270-57709162c265": {
        name: "free-round-oscillator",
        moduleKey: "3011cfeb-e9c1-4f79-9270-57709162c265",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: -200, waveform: "sine" },
      },
      "aa296c01-fc38-4945-9541-10513f6bdc39": {
        name: "wise-malicious-oscillator",
        moduleKey: "aa296c01-fc38-4945-9541-10513f6bdc39",
        type: "OSCILLATOR",
        state: { frequency: 110, detune: -1200, waveform: "sine" },
      },
      "9467b533-c9ce-4a1e-8289-c3a9ce67a474": {
        name: "unaccountable-beneficial-gain",
        moduleKey: "9467b533-c9ce-4a1e-8289-c3a9ce67a474",
        type: "GAIN",
        state: { gain: 0 },
      },
      "c9c10948-358d-478a-9494-2f13857eee09": {
        name: "purple-vestal-oscillator",
        moduleKey: "c9c10948-358d-478a-9494-2f13857eee09",
        type: "OSCILLATOR",
        state: { frequency: 0, detune: 0, waveform: "sine" },
      },
      "f5d6b229-1d51-4206-8752-35a8fbe9501d": {
        name: "accidental-wasteful-shift",
        moduleKey: "f5d6b229-1d51-4206-8752-35a8fbe9501d",
        type: "SHIFT",
        state: { inputMin: -1, inputMax: 1, outputMin: 0.33, outputMax: 0.8 },
      },
      "8cf2c6f4-74cb-4118-a55a-2939350930bd": {
        name: "kaput-loud-delay",
        moduleKey: "8cf2c6f4-74cb-4118-a55a-2939350930bd",
        type: "DELAY",
        state: { delayTime: 0.2 },
      },
      "1924e02b-7782-4c2e-9433-6f2cf5ba2d61": {
        name: "absorbing-callous-gain",
        moduleKey: "1924e02b-7782-4c2e-9433-6f2cf5ba2d61",
        type: "GAIN",
        state: { gain: 0.5 },
      },
      "b5f621ea-4909-4179-931f-cdf3284c07ac": {
        name: "precious-salty-delay",
        moduleKey: "b5f621ea-4909-4179-931f-cdf3284c07ac",
        type: "DELAY",
        state: { delayTime: 0.1 },
      },
      "12d79fdc-f1db-4f47-923d-7ffdd4739f9e": {
        name: "peachy-afraid-delay",
        moduleKey: "12d79fdc-f1db-4f47-923d-7ffdd4739f9e",
        type: "DELAY",
        state: { delayTime: 0.01 },
      },
      "8cbe6256-1ea1-4af6-aa25-00cae16de6f0": {
        name: "full-quarrelsome-delay",
        moduleKey: "8cbe6256-1ea1-4af6-aa25-00cae16de6f0",
        type: "DELAY",
        state: { delayTime: 0.2 },
      },
      "7ee37d2f-ca73-493c-986f-bf8a6cfe6725": {
        name: "posh-verdant-gain",
        moduleKey: "7ee37d2f-ca73-493c-986f-bf8a6cfe6725",
        type: "GAIN",
        state: { gain: 0.2 },
      },
      "83d35fb2-81d9-48dc-8f4a-34ee409defd2": {
        name: "sordid-educated-filter",
        moduleKey: "83d35fb2-81d9-48dc-8f4a-34ee409defd2",
        type: "FILTER",
        state: { frequency: 165, detune: 0, Q: 0, gain: 0, type: "lowpass" },
      },
      "4be9d77b-acf4-46ec-84fc-803be91dd644": {
        name: "difficult-mighty-shift",
        moduleKey: "4be9d77b-acf4-46ec-84fc-803be91dd644",
        type: "SHIFT",
        state: { inputMin: -1, inputMax: 1, outputMin: 0, outputMax: 1200 },
      },
      "9db9ecc0-8953-42d2-a584-9629ed4f2de1": {
        name: "evil-crowded-clock",
        moduleKey: "9db9ecc0-8953-42d2-a584-9629ed4f2de1",
        type: "CLOCK",
        state: { tempo: 220 },
      },
      "405b8872-3aba-48bf-acd9-632a95e1ea83": {
        name: "dusty-agile-sequencer",
        moduleKey: "405b8872-3aba-48bf-acd9-632a95e1ea83",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: 880,
          step1: 440,
          step2: 660,
          step3: 440,
          step4: 55,
          step5: 440,
          step6: 27.5,
          step7: 110,
        },
      },
      "70c9b944-e8f4-463d-a8b8-970089483865": {
        name: "secret-direct-envelope",
        moduleKey: "70c9b944-e8f4-463d-a8b8-970089483865",
        type: "ENVELOPE",
        state: {
          gate: 0.01,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 1200,
        },
      },
      "56f59890-70b0-4465-a57e-df8ec370abb3": {
        name: "stable-shaggy-clock",
        moduleKey: "56f59890-70b0-4465-a57e-df8ec370abb3",
        type: "CLOCK",
        state: { tempo: 440 },
      },
      "056dc799-10b9-4a5b-9d13-39e0b7f3dc8d": {
        name: "erect-endurable-filter",
        moduleKey: "056dc799-10b9-4a5b-9d13-39e0b7f3dc8d",
        type: "FILTER",
        state: { frequency: 350, detune: 0, Q: 2, gain: 0, type: "highpass" },
      },
      "2b883b33-cf23-47e4-aad2-b92aa417dd93": {
        name: "unwritten-moaning-shift",
        moduleKey: "2b883b33-cf23-47e4-aad2-b92aa417dd93",
        type: "SHIFT",
        state: { inputMin: -1, inputMax: 1, outputMin: -1200, outputMax: 1200 },
      },
    },
    modulePositions: {
      "0": [3012, 459],
      "3011cfeb-e9c1-4f79-9270-57709162c265": [766, 38],
      "aa296c01-fc38-4945-9541-10513f6bdc39": [524, 998],
      "9467b533-c9ce-4a1e-8289-c3a9ce67a474": [760, 585.6666679382324],
      "c9c10948-358d-478a-9494-2f13857eee09": [391, 480.6666679382324],
      "f5d6b229-1d51-4206-8752-35a8fbe9501d": [349, 707.6666679382324],
      "8cf2c6f4-74cb-4118-a55a-2939350930bd": [1366, 1094.6666679382324],
      "1924e02b-7782-4c2e-9433-6f2cf5ba2d61": [849, 348.6666679382324],
      "b5f621ea-4909-4179-931f-cdf3284c07ac": [1733.3333129882812, 962],
      "12d79fdc-f1db-4f47-923d-7ffdd4739f9e": [1719.3333129882812, 1127],
      "8cbe6256-1ea1-4af6-aa25-00cae16de6f0": [1702.3333129882812, 1305],
      "7ee37d2f-ca73-493c-986f-bf8a6cfe6725": [
        2178.3333129882812, 1096.3333282470703,
      ],
      "83d35fb2-81d9-48dc-8f4a-34ee409defd2": [1293, 379],
      "4be9d77b-acf4-46ec-84fc-803be91dd644": [1666, 78],
      "9db9ecc0-8953-42d2-a584-9629ed4f2de1": [36, 33],
      "405b8872-3aba-48bf-acd9-632a95e1ea83": [411, 19],
      "70c9b944-e8f4-463d-a8b8-970089483865": [1278.6666870117188, 36],
      "56f59890-70b0-4465-a57e-df8ec370abb3": [39, 244],
      "056dc799-10b9-4a5b-9d13-39e0b7f3dc8d": [1049, 898.6666564941406],
      "2b883b33-cf23-47e4-aad2-b92aa417dd93": [
        1007.6666717529297, 1345.3333129882812,
      ],
    },
    connections: {
      "c9c10948-358d-478a-9494-2f13857eee09_1_0|f5d6b229-1d51-4206-8752-35a8fbe9501d_0_0":
        [
          {
            moduleKey: "c9c10948-358d-478a-9494-2f13857eee09",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "f5d6b229-1d51-4206-8752-35a8fbe9501d",
            type: 0,
            channel: 0,
          },
        ],
      "f5d6b229-1d51-4206-8752-35a8fbe9501d_1_0|9467b533-c9ce-4a1e-8289-c3a9ce67a474_gain":
        [
          {
            moduleKey: "f5d6b229-1d51-4206-8752-35a8fbe9501d",
            channel: 0,
            type: 1,
          },
          { moduleKey: "9467b533-c9ce-4a1e-8289-c3a9ce67a474", name: "gain" },
        ],
      "aa296c01-fc38-4945-9541-10513f6bdc39_1_0|9467b533-c9ce-4a1e-8289-c3a9ce67a474_0_0":
        [
          {
            moduleKey: "aa296c01-fc38-4945-9541-10513f6bdc39",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "9467b533-c9ce-4a1e-8289-c3a9ce67a474",
            type: 0,
            channel: 0,
          },
        ],
      "9467b533-c9ce-4a1e-8289-c3a9ce67a474_1_0|0_0_0": [
        {
          moduleKey: "9467b533-c9ce-4a1e-8289-c3a9ce67a474",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "3011cfeb-e9c1-4f79-9270-57709162c265_1_0|1924e02b-7782-4c2e-9433-6f2cf5ba2d61_0_0":
        [
          {
            moduleKey: "3011cfeb-e9c1-4f79-9270-57709162c265",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "1924e02b-7782-4c2e-9433-6f2cf5ba2d61",
            type: 0,
            channel: 0,
          },
        ],
      "8cf2c6f4-74cb-4118-a55a-2939350930bd_1_0|b5f621ea-4909-4179-931f-cdf3284c07ac_0_0":
        [
          {
            moduleKey: "8cf2c6f4-74cb-4118-a55a-2939350930bd",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b5f621ea-4909-4179-931f-cdf3284c07ac",
            type: 0,
            channel: 0,
          },
        ],
      "8cf2c6f4-74cb-4118-a55a-2939350930bd_1_0|12d79fdc-f1db-4f47-923d-7ffdd4739f9e_0_0":
        [
          {
            moduleKey: "8cf2c6f4-74cb-4118-a55a-2939350930bd",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "12d79fdc-f1db-4f47-923d-7ffdd4739f9e",
            type: 0,
            channel: 0,
          },
        ],
      "8cf2c6f4-74cb-4118-a55a-2939350930bd_1_0|8cbe6256-1ea1-4af6-aa25-00cae16de6f0_0_0":
        [
          {
            moduleKey: "8cf2c6f4-74cb-4118-a55a-2939350930bd",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "8cbe6256-1ea1-4af6-aa25-00cae16de6f0",
            type: 0,
            channel: 0,
          },
        ],
      "b5f621ea-4909-4179-931f-cdf3284c07ac_1_0|7ee37d2f-ca73-493c-986f-bf8a6cfe6725_0_0":
        [
          {
            moduleKey: "b5f621ea-4909-4179-931f-cdf3284c07ac",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7ee37d2f-ca73-493c-986f-bf8a6cfe6725",
            type: 0,
            channel: 0,
          },
        ],
      "12d79fdc-f1db-4f47-923d-7ffdd4739f9e_1_0|7ee37d2f-ca73-493c-986f-bf8a6cfe6725_0_0":
        [
          {
            moduleKey: "12d79fdc-f1db-4f47-923d-7ffdd4739f9e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7ee37d2f-ca73-493c-986f-bf8a6cfe6725",
            type: 0,
            channel: 0,
          },
        ],
      "8cbe6256-1ea1-4af6-aa25-00cae16de6f0_1_0|7ee37d2f-ca73-493c-986f-bf8a6cfe6725_0_0":
        [
          {
            moduleKey: "8cbe6256-1ea1-4af6-aa25-00cae16de6f0",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7ee37d2f-ca73-493c-986f-bf8a6cfe6725",
            type: 0,
            channel: 0,
          },
        ],
      "7ee37d2f-ca73-493c-986f-bf8a6cfe6725_1_0|8cf2c6f4-74cb-4118-a55a-2939350930bd_0_0":
        [
          {
            moduleKey: "7ee37d2f-ca73-493c-986f-bf8a6cfe6725",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "8cf2c6f4-74cb-4118-a55a-2939350930bd",
            type: 0,
            channel: 0,
          },
        ],
      "7ee37d2f-ca73-493c-986f-bf8a6cfe6725_1_0|0_0_0": [
        {
          moduleKey: "7ee37d2f-ca73-493c-986f-bf8a6cfe6725",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "1924e02b-7782-4c2e-9433-6f2cf5ba2d61_1_0|83d35fb2-81d9-48dc-8f4a-34ee409defd2_0_0":
        [
          {
            moduleKey: "1924e02b-7782-4c2e-9433-6f2cf5ba2d61",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "83d35fb2-81d9-48dc-8f4a-34ee409defd2",
            type: 0,
            channel: 0,
          },
        ],
      "83d35fb2-81d9-48dc-8f4a-34ee409defd2_1_0|0_0_0": [
        {
          moduleKey: "83d35fb2-81d9-48dc-8f4a-34ee409defd2",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "4be9d77b-acf4-46ec-84fc-803be91dd644_1_0|83d35fb2-81d9-48dc-8f4a-34ee409defd2_detune":
        [
          {
            moduleKey: "4be9d77b-acf4-46ec-84fc-803be91dd644",
            channel: 0,
            type: 1,
          },
          { moduleKey: "83d35fb2-81d9-48dc-8f4a-34ee409defd2", name: "detune" },
        ],
      "c9c10948-358d-478a-9494-2f13857eee09_1_0|4be9d77b-acf4-46ec-84fc-803be91dd644_0_0":
        [
          {
            moduleKey: "c9c10948-358d-478a-9494-2f13857eee09",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "4be9d77b-acf4-46ec-84fc-803be91dd644",
            type: 0,
            channel: 0,
          },
        ],
      "9db9ecc0-8953-42d2-a584-9629ed4f2de1_1_0|405b8872-3aba-48bf-acd9-632a95e1ea83_0_0":
        [
          {
            moduleKey: "9db9ecc0-8953-42d2-a584-9629ed4f2de1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "405b8872-3aba-48bf-acd9-632a95e1ea83",
            type: 0,
            channel: 0,
          },
        ],
      "405b8872-3aba-48bf-acd9-632a95e1ea83_1_0|c9c10948-358d-478a-9494-2f13857eee09_frequency":
        [
          {
            moduleKey: "405b8872-3aba-48bf-acd9-632a95e1ea83",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "c9c10948-358d-478a-9494-2f13857eee09",
            name: "frequency",
          },
        ],
      "9db9ecc0-8953-42d2-a584-9629ed4f2de1_1_0|70c9b944-e8f4-463d-a8b8-970089483865_0_0":
        [
          {
            moduleKey: "9db9ecc0-8953-42d2-a584-9629ed4f2de1",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "70c9b944-e8f4-463d-a8b8-970089483865",
            channel: 0,
            type: 0,
          },
        ],
      "70c9b944-e8f4-463d-a8b8-970089483865_1_0|83d35fb2-81d9-48dc-8f4a-34ee409defd2_detune":
        [
          {
            moduleKey: "70c9b944-e8f4-463d-a8b8-970089483865",
            channel: 0,
            type: 1,
          },
          { moduleKey: "83d35fb2-81d9-48dc-8f4a-34ee409defd2", name: "detune" },
        ],
      "9db9ecc0-8953-42d2-a584-9629ed4f2de1_1_0|56f59890-70b0-4465-a57e-df8ec370abb3_0_0":
        [
          {
            moduleKey: "9db9ecc0-8953-42d2-a584-9629ed4f2de1",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "56f59890-70b0-4465-a57e-df8ec370abb3",
            type: 0,
            channel: 0,
          },
        ],
      "56f59890-70b0-4465-a57e-df8ec370abb3_1_0|70c9b944-e8f4-463d-a8b8-970089483865_0_0":
        [
          {
            moduleKey: "56f59890-70b0-4465-a57e-df8ec370abb3",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "70c9b944-e8f4-463d-a8b8-970089483865",
            type: 0,
            channel: 0,
          },
        ],
      "9467b533-c9ce-4a1e-8289-c3a9ce67a474_1_0|056dc799-10b9-4a5b-9d13-39e0b7f3dc8d_0_0":
        [
          {
            moduleKey: "9467b533-c9ce-4a1e-8289-c3a9ce67a474",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "056dc799-10b9-4a5b-9d13-39e0b7f3dc8d",
            type: 0,
            channel: 0,
          },
        ],
      "056dc799-10b9-4a5b-9d13-39e0b7f3dc8d_1_0|8cf2c6f4-74cb-4118-a55a-2939350930bd_0_0":
        [
          {
            moduleKey: "056dc799-10b9-4a5b-9d13-39e0b7f3dc8d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "8cf2c6f4-74cb-4118-a55a-2939350930bd",
            type: 0,
            channel: 0,
          },
        ],
      "2b883b33-cf23-47e4-aad2-b92aa417dd93_1_0|056dc799-10b9-4a5b-9d13-39e0b7f3dc8d_detune":
        [
          {
            moduleKey: "2b883b33-cf23-47e4-aad2-b92aa417dd93",
            channel: 0,
            type: 1,
          },
          { moduleKey: "056dc799-10b9-4a5b-9d13-39e0b7f3dc8d", name: "detune" },
        ],
      "c9c10948-358d-478a-9494-2f13857eee09_1_0|2b883b33-cf23-47e4-aad2-b92aa417dd93_0_0":
        [
          {
            moduleKey: "c9c10948-358d-478a-9494-2f13857eee09",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "2b883b33-cf23-47e4-aad2-b92aa417dd93",
            type: 0,
            channel: 0,
          },
        ],
    },
  },
};

const ppp = {
  id: "34a5b61d-b47d-4437-b082-f2526d83ed80",
  name: "punchy-present-place",
  slug: "punchy-present-place-34a5b61d",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.45 },
      },
      "a2cae92e-a517-46dd-81d4-b7500ff66ec8": {
        name: "kick clock",
        moduleKey: "a2cae92e-a517-46dd-81d4-b7500ff66ec8",
        type: "CLOCK",
        state: { tempo: 120 },
      },
      "4c8ccf94-fba6-49a2-bce8-3b06e13b60f2": {
        name: "kick oscillator",
        moduleKey: "4c8ccf94-fba6-49a2-bce8-3b06e13b60f2",
        type: "OSCILLATOR",
        state: { frequency: 55, detune: 0, waveform: "sine" },
      },
      "5e7ec947-b9d0-4656-aeb1-71f6b1d7b721": {
        name: "kick amp",
        moduleKey: "5e7ec947-b9d0-4656-aeb1-71f6b1d7b721",
        type: "VCA",
        state: {
          gate: 0.001,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.05,
          peak: 1,
        },
      },
      "caf71688-c57a-42f1-81e0-ab06e808bbec": {
        name: "kick pitch",
        moduleKey: "caf71688-c57a-42f1-81e0-ab06e808bbec",
        type: "ENVELOPE",
        state: {
          gate: 0.001,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.05,
          peak: 2400,
        },
      },
      "96e01735-b010-4656-9cfe-9704d221d5a7": {
        name: "distortion input",
        moduleKey: "96e01735-b010-4656-9cfe-9704d221d5a7",
        type: "GAIN",
        state: { gain: 1 },
      },
      "3bfcf61b-2108-4749-94d0-52bc9de87073": {
        name: "overdrive 1",
        moduleKey: "3bfcf61b-2108-4749-94d0-52bc9de87073",
        type: "GAIN",
        state: { gain: 1 },
      },
      "edfdc129-8121-444f-a468-34069bd9c64e": {
        name: "overdrive 3",
        moduleKey: "edfdc129-8121-444f-a468-34069bd9c64e",
        type: "GAIN",
        state: { gain: 1 },
      },
      "3ebef0a9-a682-49ca-a58a-79bd5365a808": {
        name: "overdrive 2",
        moduleKey: "3ebef0a9-a682-49ca-a58a-79bd5365a808",
        type: "GAIN",
        state: { gain: 1 },
      },
      "b3df0f1a-114c-40af-9cd4-7a9018cdd3b2": {
        name: "brick-wall",
        moduleKey: "b3df0f1a-114c-40af-9cd4-7a9018cdd3b2",
        type: "LIMITER",
        state: {},
      },
    },
    modulePositions: {
      "0": [2834, 668],
      "a2cae92e-a517-46dd-81d4-b7500ff66ec8": [268, 637],
      "4c8ccf94-fba6-49a2-bce8-3b06e13b60f2": [763, 695],
      "5e7ec947-b9d0-4656-aeb1-71f6b1d7b721": [761, 917],
      "caf71688-c57a-42f1-81e0-ab06e808bbec": [762, 370],
      "96e01735-b010-4656-9cfe-9704d221d5a7": [1694, 670],
      "3bfcf61b-2108-4749-94d0-52bc9de87073": [2089, 505],
      "edfdc129-8121-444f-a468-34069bd9c64e": [2095, 823],
      "3ebef0a9-a682-49ca-a58a-79bd5365a808": [2090, 666],
      "b3df0f1a-114c-40af-9cd4-7a9018cdd3b2": [2473, 641],
    },
    connections: {
      "4c8ccf94-fba6-49a2-bce8-3b06e13b60f2_1_0|5e7ec947-b9d0-4656-aeb1-71f6b1d7b721_0_0":
        [
          {
            moduleKey: "4c8ccf94-fba6-49a2-bce8-3b06e13b60f2",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "5e7ec947-b9d0-4656-aeb1-71f6b1d7b721",
            type: 0,
            channel: 0,
          },
        ],
      "caf71688-c57a-42f1-81e0-ab06e808bbec_1_0|4c8ccf94-fba6-49a2-bce8-3b06e13b60f2_detune":
        [
          {
            moduleKey: "caf71688-c57a-42f1-81e0-ab06e808bbec",
            channel: 0,
            type: 1,
          },
          { moduleKey: "4c8ccf94-fba6-49a2-bce8-3b06e13b60f2", name: "detune" },
        ],
      "a2cae92e-a517-46dd-81d4-b7500ff66ec8_1_0|5e7ec947-b9d0-4656-aeb1-71f6b1d7b721_0_1":
        [
          {
            moduleKey: "a2cae92e-a517-46dd-81d4-b7500ff66ec8",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "5e7ec947-b9d0-4656-aeb1-71f6b1d7b721",
            type: 0,
            channel: 1,
          },
        ],
      "a2cae92e-a517-46dd-81d4-b7500ff66ec8_1_0|caf71688-c57a-42f1-81e0-ab06e808bbec_0_0":
        [
          {
            moduleKey: "a2cae92e-a517-46dd-81d4-b7500ff66ec8",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "caf71688-c57a-42f1-81e0-ab06e808bbec",
            type: 0,
            channel: 0,
          },
        ],
      "5e7ec947-b9d0-4656-aeb1-71f6b1d7b721_1_0|96e01735-b010-4656-9cfe-9704d221d5a7_0_0":
        [
          {
            moduleKey: "5e7ec947-b9d0-4656-aeb1-71f6b1d7b721",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "96e01735-b010-4656-9cfe-9704d221d5a7",
            type: 0,
            channel: 0,
          },
        ],
      "96e01735-b010-4656-9cfe-9704d221d5a7_1_0|3bfcf61b-2108-4749-94d0-52bc9de87073_0_0":
        [
          {
            moduleKey: "96e01735-b010-4656-9cfe-9704d221d5a7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "3bfcf61b-2108-4749-94d0-52bc9de87073",
            type: 0,
            channel: 0,
          },
        ],
      "96e01735-b010-4656-9cfe-9704d221d5a7_1_0|3bfcf61b-2108-4749-94d0-52bc9de87073_gain":
        [
          {
            moduleKey: "96e01735-b010-4656-9cfe-9704d221d5a7",
            channel: 0,
            type: 1,
          },
          { moduleKey: "3bfcf61b-2108-4749-94d0-52bc9de87073", name: "gain" },
        ],
      "96e01735-b010-4656-9cfe-9704d221d5a7_1_0|3ebef0a9-a682-49ca-a58a-79bd5365a808_0_0":
        [
          {
            moduleKey: "96e01735-b010-4656-9cfe-9704d221d5a7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "3ebef0a9-a682-49ca-a58a-79bd5365a808",
            type: 0,
            channel: 0,
          },
        ],
      "96e01735-b010-4656-9cfe-9704d221d5a7_1_0|3ebef0a9-a682-49ca-a58a-79bd5365a808_gain":
        [
          {
            moduleKey: "96e01735-b010-4656-9cfe-9704d221d5a7",
            channel: 0,
            type: 1,
          },
          { moduleKey: "3ebef0a9-a682-49ca-a58a-79bd5365a808", name: "gain" },
        ],
      "96e01735-b010-4656-9cfe-9704d221d5a7_1_0|edfdc129-8121-444f-a468-34069bd9c64e_0_0":
        [
          {
            moduleKey: "96e01735-b010-4656-9cfe-9704d221d5a7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "edfdc129-8121-444f-a468-34069bd9c64e",
            type: 0,
            channel: 0,
          },
        ],
      "96e01735-b010-4656-9cfe-9704d221d5a7_1_0|edfdc129-8121-444f-a468-34069bd9c64e_gain":
        [
          {
            moduleKey: "96e01735-b010-4656-9cfe-9704d221d5a7",
            channel: 0,
            type: 1,
          },
          { moduleKey: "edfdc129-8121-444f-a468-34069bd9c64e", name: "gain" },
        ],
      "3bfcf61b-2108-4749-94d0-52bc9de87073_1_0|b3df0f1a-114c-40af-9cd4-7a9018cdd3b2_0_0":
        [
          {
            moduleKey: "3bfcf61b-2108-4749-94d0-52bc9de87073",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b3df0f1a-114c-40af-9cd4-7a9018cdd3b2",
            type: 0,
            channel: 0,
          },
        ],
      "3ebef0a9-a682-49ca-a58a-79bd5365a808_1_0|b3df0f1a-114c-40af-9cd4-7a9018cdd3b2_0_0":
        [
          {
            moduleKey: "3ebef0a9-a682-49ca-a58a-79bd5365a808",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b3df0f1a-114c-40af-9cd4-7a9018cdd3b2",
            type: 0,
            channel: 0,
          },
        ],
      "edfdc129-8121-444f-a468-34069bd9c64e_1_0|b3df0f1a-114c-40af-9cd4-7a9018cdd3b2_0_0":
        [
          {
            moduleKey: "edfdc129-8121-444f-a468-34069bd9c64e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b3df0f1a-114c-40af-9cd4-7a9018cdd3b2",
            type: 0,
            channel: 0,
          },
        ],
      "b3df0f1a-114c-40af-9cd4-7a9018cdd3b2_1_0|0_0_0": [
        {
          moduleKey: "b3df0f1a-114c-40af-9cd4-7a9018cdd3b2",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
    },
  },
};

const fff = {
  id: "5758cf2b-0070-4948-89ca-ce826c8b7485",
  name: "futuristic-finicky-field",
  slug: "futuristic-finicky-field-5758cf2b",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.45 },
      },
      "b7b19f19-0c7b-42ab-8b01-af1f28047223": {
        name: "adjoining-literate-oscillator",
        moduleKey: "b7b19f19-0c7b-42ab-8b01-af1f28047223",
        type: "OSCILLATOR",
        state: { frequency: 468, detune: 0, waveform: "sawtooth" },
      },
      "edd2ee2c-aa8b-49ab-9386-749979464849": {
        name: "purring-grubby-oscillator",
        moduleKey: "edd2ee2c-aa8b-49ab-9386-749979464849",
        type: "OSCILLATOR",
        state: { frequency: 0.04, detune: 0, waveform: "sine" },
      },
      "823d2f73-5da0-4f58-b2ba-fe34a670345f": {
        name: "lively-long-gain",
        moduleKey: "823d2f73-5da0-4f58-b2ba-fe34a670345f",
        type: "GAIN",
        state: { gain: 10 },
      },
      "2066c8f1-9722-4f2c-9818-49de2d97c16e": {
        name: "billowy-solitary-oscillator",
        moduleKey: "2066c8f1-9722-4f2c-9818-49de2d97c16e",
        type: "OSCILLATOR",
        state: { frequency: 468, detune: -500, waveform: "sawtooth" },
      },
      "eb50358a-d7f7-43d0-8f18-2dc7c454d572": {
        name: "defiant-healthy-clock",
        moduleKey: "eb50358a-d7f7-43d0-8f18-2dc7c454d572",
        type: "CLOCK",
        state: { tempo: 145 },
      },
      "7311cbba-0a99-4a4b-8cf8-96054b51a4d3": {
        name: "honest-lavish-vca",
        moduleKey: "7311cbba-0a99-4a4b-8cf8-96054b51a4d3",
        type: "VCA",
        state: {
          gate: 0.001,
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.2,
          peak: 0.4,
        },
      },
      "0175bbf1-fd45-4a87-b719-6aa4638c3714": {
        name: "young-for-filter",
        moduleKey: "0175bbf1-fd45-4a87-b719-6aa4638c3714",
        type: "FILTER",
        state: { frequency: 350, detune: 0, Q: 2, gain: 9, type: "lowpass" },
      },
      "870075ac-488e-4af2-8633-6f519db435be": {
        name: "raspy-primo-envelope",
        moduleKey: "870075ac-488e-4af2-8633-6f519db435be",
        type: "ENVELOPE",
        state: {
          gate: 0.2,
          attack: 0.1,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 2400,
        },
      },
      "e15d6b3d-c602-4252-85a1-fa6aeaec4bb3": {
        name: "cosmic-present-oscillator",
        moduleKey: "e15d6b3d-c602-4252-85a1-fa6aeaec4bb3",
        type: "OSCILLATOR",
        state: { frequency: 468, detune: 303, waveform: "triangle" },
      },
      "f85608be-db93-47b8-ae51-477676570a05": {
        name: "pink-plucky-oscillator",
        moduleKey: "f85608be-db93-47b8-ae51-477676570a05",
        type: "OSCILLATOR",
        state: { frequency: 936, detune: -2, waveform: "triangle" },
      },
      "34182739-5a35-488c-b7ef-a025c398b4b1": {
        name: "tranquil-fixed-vca",
        moduleKey: "34182739-5a35-488c-b7ef-a025c398b4b1",
        type: "VCA",
        state: {
          gate: 0.99,
          attack: 0.35,
          decay: 0.1,
          sustain: 0,
          release: 0.1,
          peak: 0.5,
        },
      },
      "a0aa6eb2-9fe6-492f-8df6-4d7580976d1f": {
        name: "angry-usable-oscillator",
        moduleKey: "a0aa6eb2-9fe6-492f-8df6-4d7580976d1f",
        type: "OSCILLATOR",
        state: { frequency: 468, detune: 0, waveform: "sawtooth" },
      },
      "cc92e1f6-6035-451d-b267-457cdc2493a1": {
        name: "crabby-colorful-oscillator",
        moduleKey: "cc92e1f6-6035-451d-b267-457cdc2493a1",
        type: "OSCILLATOR",
        state: { frequency: 234, detune: 3, waveform: "square" },
      },
      "f344a1cd-8d5f-46cb-ab63-074055c81ff9": {
        name: "spectacular-rude-delay",
        moduleKey: "f344a1cd-8d5f-46cb-ab63-074055c81ff9",
        type: "DELAY",
        state: { delayTime: 0.1666 },
      },
      "e655c0d6-fa2e-463b-8504-d25977bb5aac": {
        name: "tropical-ceaseless-oscillator",
        moduleKey: "e655c0d6-fa2e-463b-8504-d25977bb5aac",
        type: "OSCILLATOR",
        state: { frequency: 0.171875, detune: 0, waveform: "sine" },
      },
      "db259ced-ea3d-4e53-a854-88c23d5b3821": {
        name: "highfalutin-nappy-shift",
        moduleKey: "db259ced-ea3d-4e53-a854-88c23d5b3821",
        type: "SHIFT",
        state: { inputMin: -1, inputMax: 1, outputMin: 0, outputMax: 1200 },
      },
      "abaedcba-0382-46ec-96ad-aa57a18dbf5f": {
        name: "voracious-acceptable-clock",
        moduleKey: "abaedcba-0382-46ec-96ad-aa57a18dbf5f",
        type: "CLOCK",
        state: { tempo: 20447 },
      },
      "743d40b9-e4fe-4364-acb5-a06e9e0d7347": {
        name: "fierce-wrong-filter",
        moduleKey: "743d40b9-e4fe-4364-acb5-a06e9e0d7347",
        type: "FILTER",
        state: { frequency: 5600, detune: 0, Q: 1, gain: 0, type: "lowpass" },
      },
      "7026018b-40bb-42c6-9572-5f645a446dc1": {
        name: "wandering-tranquil-clock",
        moduleKey: "7026018b-40bb-42c6-9572-5f645a446dc1",
        type: "CLOCK",
        state: { tempo: 20446 },
      },
      "016e621f-0366-4cee-88be-5a13766b0134": {
        name: "ardent-peaceful-oscillator",
        moduleKey: "016e621f-0366-4cee-88be-5a13766b0134",
        type: "OSCILLATOR",
        state: { frequency: 88, detune: 0, waveform: "square" },
      },
      "cef4aa9f-b109-4fa1-be6f-29aa2863380c": {
        name: "observant-ordinary-shift",
        moduleKey: "cef4aa9f-b109-4fa1-be6f-29aa2863380c",
        type: "SHIFT",
        state: { inputMin: -1, inputMax: 1, outputMin: 0, outputMax: 2400 },
      },
      "5e21c887-6b69-4d46-86d0-52daf251fe7e": {
        name: "mysterious-imported-sequencer",
        moduleKey: "5e21c887-6b69-4d46-86d0-52daf251fe7e",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 400,
          step1: 0,
          step2: 50,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
    },
    modulePositions: {
      "0": [2340, 1055],
      "b7b19f19-0c7b-42ab-8b01-af1f28047223": [431, 475],
      "edd2ee2c-aa8b-49ab-9386-749979464849": [63, 115],
      "823d2f73-5da0-4f58-b2ba-fe34a670345f": [83, 365],
      "2066c8f1-9722-4f2c-9818-49de2d97c16e": [409, 1540],
      "eb50358a-d7f7-43d0-8f18-2dc7c454d572": [619, 61],
      "7311cbba-0a99-4a4b-8cf8-96054b51a4d3": [1016, 610],
      "0175bbf1-fd45-4a87-b719-6aa4638c3714": [
        1409.6666870117188, 628.3333320617676,
      ],
      "870075ac-488e-4af2-8633-6f519db435be": [
        1318.6666870117188, 201.33333206176758,
      ],
      "e15d6b3d-c602-4252-85a1-fa6aeaec4bb3": [426, 1302.6666564941406],
      "f85608be-db93-47b8-ae51-477676570a05": [447, 1016],
      "34182739-5a35-488c-b7ef-a025c398b4b1": [
        932.3333339691162, 1285.3333129882812,
      ],
      "a0aa6eb2-9fe6-492f-8df6-4d7580976d1f": [56, 746],
      "cc92e1f6-6035-451d-b267-457cdc2493a1": [437, 749],
      "f344a1cd-8d5f-46cb-ab63-074055c81ff9": [896, 1103.3333129882812],
      "e655c0d6-fa2e-463b-8504-d25977bb5aac": [1404.3333129882812, 1039],
      "db259ced-ea3d-4e53-a854-88c23d5b3821": [
        1813.3333129882812, 1023.6666564941406,
      ],
      "abaedcba-0382-46ec-96ad-aa57a18dbf5f": [1810.6666564941406, 269],
      "743d40b9-e4fe-4364-acb5-a06e9e0d7347": [2391.6666870117188, 693],
      "7026018b-40bb-42c6-9572-5f645a446dc1": [2296.6666259765625, 315],
      "016e621f-0366-4cee-88be-5a13766b0134": [
        1807.6666259765625, 488.6666717529297,
      ],
      "cef4aa9f-b109-4fa1-be6f-29aa2863380c": [
        1940.6666259765625, 732.6666717529297,
      ],
      "5e21c887-6b69-4d46-86d0-52daf251fe7e": [2133, 13],
    },
    connections: {
      "edd2ee2c-aa8b-49ab-9386-749979464849_1_0|823d2f73-5da0-4f58-b2ba-fe34a670345f_0_0":
        [
          {
            moduleKey: "edd2ee2c-aa8b-49ab-9386-749979464849",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "823d2f73-5da0-4f58-b2ba-fe34a670345f",
            type: 0,
            channel: 0,
          },
        ],
      "823d2f73-5da0-4f58-b2ba-fe34a670345f_1_0|b7b19f19-0c7b-42ab-8b01-af1f28047223_detune":
        [
          {
            moduleKey: "823d2f73-5da0-4f58-b2ba-fe34a670345f",
            channel: 0,
            type: 1,
          },
          { moduleKey: "b7b19f19-0c7b-42ab-8b01-af1f28047223", name: "detune" },
        ],
      "eb50358a-d7f7-43d0-8f18-2dc7c454d572_1_0|7311cbba-0a99-4a4b-8cf8-96054b51a4d3_0_1":
        [
          {
            moduleKey: "eb50358a-d7f7-43d0-8f18-2dc7c454d572",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7311cbba-0a99-4a4b-8cf8-96054b51a4d3",
            type: 0,
            channel: 1,
          },
        ],
      "b7b19f19-0c7b-42ab-8b01-af1f28047223_1_0|7311cbba-0a99-4a4b-8cf8-96054b51a4d3_0_0":
        [
          {
            moduleKey: "b7b19f19-0c7b-42ab-8b01-af1f28047223",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7311cbba-0a99-4a4b-8cf8-96054b51a4d3",
            type: 0,
            channel: 0,
          },
        ],
      "7311cbba-0a99-4a4b-8cf8-96054b51a4d3_1_0|0175bbf1-fd45-4a87-b719-6aa4638c3714_0_0":
        [
          {
            moduleKey: "7311cbba-0a99-4a4b-8cf8-96054b51a4d3",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "0175bbf1-fd45-4a87-b719-6aa4638c3714",
            type: 0,
            channel: 0,
          },
        ],
      "eb50358a-d7f7-43d0-8f18-2dc7c454d572_1_0|870075ac-488e-4af2-8633-6f519db435be_0_0":
        [
          {
            moduleKey: "eb50358a-d7f7-43d0-8f18-2dc7c454d572",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "870075ac-488e-4af2-8633-6f519db435be",
            type: 0,
            channel: 0,
          },
        ],
      "870075ac-488e-4af2-8633-6f519db435be_1_0|0175bbf1-fd45-4a87-b719-6aa4638c3714_detune":
        [
          {
            moduleKey: "870075ac-488e-4af2-8633-6f519db435be",
            channel: 0,
            type: 1,
          },
          { moduleKey: "0175bbf1-fd45-4a87-b719-6aa4638c3714", name: "detune" },
        ],
      "f85608be-db93-47b8-ae51-477676570a05_1_0|7311cbba-0a99-4a4b-8cf8-96054b51a4d3_0_0":
        [
          {
            moduleKey: "f85608be-db93-47b8-ae51-477676570a05",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7311cbba-0a99-4a4b-8cf8-96054b51a4d3",
            type: 0,
            channel: 0,
          },
        ],
      "a0aa6eb2-9fe6-492f-8df6-4d7580976d1f_1_0|7311cbba-0a99-4a4b-8cf8-96054b51a4d3_0_0":
        [
          {
            moduleKey: "a0aa6eb2-9fe6-492f-8df6-4d7580976d1f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7311cbba-0a99-4a4b-8cf8-96054b51a4d3",
            type: 0,
            channel: 0,
          },
        ],
      "2066c8f1-9722-4f2c-9818-49de2d97c16e_1_0|34182739-5a35-488c-b7ef-a025c398b4b1_0_0":
        [
          {
            moduleKey: "2066c8f1-9722-4f2c-9818-49de2d97c16e",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "34182739-5a35-488c-b7ef-a025c398b4b1",
            type: 0,
            channel: 0,
          },
        ],
      "eb50358a-d7f7-43d0-8f18-2dc7c454d572_1_0|34182739-5a35-488c-b7ef-a025c398b4b1_0_1":
        [
          {
            moduleKey: "eb50358a-d7f7-43d0-8f18-2dc7c454d572",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "34182739-5a35-488c-b7ef-a025c398b4b1",
            type: 0,
            channel: 1,
          },
        ],
      "34182739-5a35-488c-b7ef-a025c398b4b1_1_0|0175bbf1-fd45-4a87-b719-6aa4638c3714_0_0":
        [
          {
            moduleKey: "34182739-5a35-488c-b7ef-a025c398b4b1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "0175bbf1-fd45-4a87-b719-6aa4638c3714",
            type: 0,
            channel: 0,
          },
        ],
      "cc92e1f6-6035-451d-b267-457cdc2493a1_1_0|7311cbba-0a99-4a4b-8cf8-96054b51a4d3_0_0":
        [
          {
            moduleKey: "cc92e1f6-6035-451d-b267-457cdc2493a1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7311cbba-0a99-4a4b-8cf8-96054b51a4d3",
            type: 0,
            channel: 0,
          },
        ],
      "e15d6b3d-c602-4252-85a1-fa6aeaec4bb3_1_0|34182739-5a35-488c-b7ef-a025c398b4b1_0_0":
        [
          {
            moduleKey: "e15d6b3d-c602-4252-85a1-fa6aeaec4bb3",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "34182739-5a35-488c-b7ef-a025c398b4b1",
            type: 0,
            channel: 0,
          },
        ],
      "eb50358a-d7f7-43d0-8f18-2dc7c454d572_1_0|f344a1cd-8d5f-46cb-ab63-074055c81ff9_0_0":
        [
          {
            moduleKey: "eb50358a-d7f7-43d0-8f18-2dc7c454d572",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "f344a1cd-8d5f-46cb-ab63-074055c81ff9",
            channel: 0,
            type: 0,
          },
        ],
      "f344a1cd-8d5f-46cb-ab63-074055c81ff9_1_0|34182739-5a35-488c-b7ef-a025c398b4b1_0_1":
        [
          {
            moduleKey: "f344a1cd-8d5f-46cb-ab63-074055c81ff9",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "34182739-5a35-488c-b7ef-a025c398b4b1",
            type: 0,
            channel: 1,
          },
        ],
      "db259ced-ea3d-4e53-a854-88c23d5b3821_1_0|0175bbf1-fd45-4a87-b719-6aa4638c3714_detune":
        [
          {
            moduleKey: "db259ced-ea3d-4e53-a854-88c23d5b3821",
            channel: 0,
            type: 1,
          },
          { moduleKey: "0175bbf1-fd45-4a87-b719-6aa4638c3714", name: "detune" },
        ],
      "e655c0d6-fa2e-463b-8504-d25977bb5aac_1_0|db259ced-ea3d-4e53-a854-88c23d5b3821_0_0":
        [
          {
            moduleKey: "e655c0d6-fa2e-463b-8504-d25977bb5aac",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "db259ced-ea3d-4e53-a854-88c23d5b3821",
            channel: 0,
            type: 0,
          },
        ],
      "abaedcba-0382-46ec-96ad-aa57a18dbf5f_1_0|743d40b9-e4fe-4364-acb5-a06e9e0d7347_0_0":
        [
          {
            moduleKey: "abaedcba-0382-46ec-96ad-aa57a18dbf5f",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "743d40b9-e4fe-4364-acb5-a06e9e0d7347",
            channel: 0,
            type: 0,
          },
        ],
      "743d40b9-e4fe-4364-acb5-a06e9e0d7347_1_0|0_0_0": [
        {
          moduleKey: "743d40b9-e4fe-4364-acb5-a06e9e0d7347",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "7026018b-40bb-42c6-9572-5f645a446dc1_1_0|743d40b9-e4fe-4364-acb5-a06e9e0d7347_0_0":
        [
          {
            moduleKey: "7026018b-40bb-42c6-9572-5f645a446dc1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "743d40b9-e4fe-4364-acb5-a06e9e0d7347",
            type: 0,
            channel: 0,
          },
        ],
      "016e621f-0366-4cee-88be-5a13766b0134_1_0|cef4aa9f-b109-4fa1-be6f-29aa2863380c_0_0":
        [
          {
            moduleKey: "016e621f-0366-4cee-88be-5a13766b0134",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "cef4aa9f-b109-4fa1-be6f-29aa2863380c",
            type: 0,
            channel: 0,
          },
        ],
      "cef4aa9f-b109-4fa1-be6f-29aa2863380c_1_0|743d40b9-e4fe-4364-acb5-a06e9e0d7347_detune":
        [
          {
            moduleKey: "cef4aa9f-b109-4fa1-be6f-29aa2863380c",
            channel: 0,
            type: 1,
          },
          { moduleKey: "743d40b9-e4fe-4364-acb5-a06e9e0d7347", name: "detune" },
        ],
      "0175bbf1-fd45-4a87-b719-6aa4638c3714_1_0|0_0_0": [
        {
          moduleKey: "0175bbf1-fd45-4a87-b719-6aa4638c3714",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "abaedcba-0382-46ec-96ad-aa57a18dbf5f_1_0|5e21c887-6b69-4d46-86d0-52daf251fe7e_0_0":
        [
          {
            moduleKey: "abaedcba-0382-46ec-96ad-aa57a18dbf5f",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "5e21c887-6b69-4d46-86d0-52daf251fe7e",
            type: 0,
            channel: 0,
          },
        ],
      "5e21c887-6b69-4d46-86d0-52daf251fe7e_1_0|7026018b-40bb-42c6-9572-5f645a446dc1_tempo":
        [
          {
            moduleKey: "5e21c887-6b69-4d46-86d0-52daf251fe7e",
            channel: 0,
            type: 1,
          },
          { moduleKey: "7026018b-40bb-42c6-9572-5f645a446dc1", name: "tempo" },
        ],
    },
  },
};

const ccc = {
  id: "5970f1e3-2929-44c4-a8c0-1773b3220f90",
  name: "cared-coherent-cellar",
  slug: "cared-coherent-cellar-5970f1e3",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.225 },
      },
      "7fc14d18-27c5-47fd-9e03-c52f1b77b36e": {
        name: "tender-faded-oscillator",
        moduleKey: "7fc14d18-27c5-47fd-9e03-c52f1b77b36e",
        type: "OSCILLATOR",
        state: { frequency: 220, detune: 0, waveform: "sawtooth" },
      },
      "e0a7e685-d247-43de-8731-c91e3a7741fd": {
        name: "quack-equable-clock",
        moduleKey: "e0a7e685-d247-43de-8731-c91e3a7741fd",
        type: "CLOCK",
        state: { tempo: 240 },
      },
      "9b33cd0f-ab9d-4193-8c66-33042df2366b": {
        name: "unequal-lackadaisical-sequencer",
        moduleKey: "9b33cd0f-ab9d-4193-8c66-33042df2366b",
        type: "SEQUENCER",
        state: {
          steps: 2,
          step0: 0,
          step1: 300,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "5cbfcf22-457a-4692-940d-dcffd2581937": {
        name: "actionable-pleasant-vca",
        moduleKey: "5cbfcf22-457a-4692-940d-dcffd2581937",
        type: "VCA",
        state: {
          gate: 0.5,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 0.5,
        },
      },
      "80adcbec-1e17-4e47-bf82-9c3f15db34d8": {
        name: "squeamish-astute-filter",
        moduleKey: "80adcbec-1e17-4e47-bf82-9c3f15db34d8",
        type: "FILTER",
        state: { frequency: 350, detune: 0, Q: 1, gain: 0, type: "lowpass" },
      },
      "607eeac7-c5ca-4a76-8262-477e33cee800": {
        name: "assorted-vengeful-envelope",
        moduleKey: "607eeac7-c5ca-4a76-8262-477e33cee800",
        type: "ENVELOPE",
        state: {
          gate: 0.32,
          attack: 0.05,
          decay: 0,
          sustain: 1,
          release: 0.05,
          peak: 2400,
        },
      },
      "6351f521-0044-4105-9952-a4274d827eed": {
        name: "available-voiceless-delay",
        moduleKey: "6351f521-0044-4105-9952-a4274d827eed",
        type: "DELAY",
        state: { delayTime: 0.2 },
      },
      "45606689-3bd0-46e6-be8d-890330671d99": {
        name: "embarrassed-first-gain",
        moduleKey: "45606689-3bd0-46e6-be8d-890330671d99",
        type: "GAIN",
        state: { gain: 0.4 },
      },
      "c6076f7d-6544-4d24-bb44-46da75b5dc85": {
        name: "stale-ceaseless-gain",
        moduleKey: "c6076f7d-6544-4d24-bb44-46da75b5dc85",
        type: "GAIN",
        state: { gain: 1 },
      },
      "c4526689-14c3-4022-80f9-a2fa78b457cf": {
        name: "ready-loutish-gain",
        moduleKey: "c4526689-14c3-4022-80f9-a2fa78b457cf",
        type: "GAIN",
        state: { gain: 1 },
      },
      "28dc56b4-3989-45b0-931f-e73b2fbda11b": {
        name: "undisturbed-lying-limiter",
        moduleKey: "28dc56b4-3989-45b0-931f-e73b2fbda11b",
        type: "LIMITER",
        state: {},
      },
      "ba94654e-4b21-44c5-af27-1799081675fc": {
        name: "grumpy-gainful-gain",
        moduleKey: "ba94654e-4b21-44c5-af27-1799081675fc",
        type: "GAIN",
        state: { gain: 1 },
      },
      "67550b0d-895e-4ea9-9881-df7818f5cdd2": {
        name: "driven-barbarous-sequencer",
        moduleKey: "67550b0d-895e-4ea9-9881-df7818f5cdd2",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: -1200,
          step1: -700,
          step2: 500,
          step3: 800,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "d9b0911c-04e2-4243-bc91-1e9e1a665f04": {
        name: "quack-miniature-oscillator",
        moduleKey: "d9b0911c-04e2-4243-bc91-1e9e1a665f04",
        type: "OSCILLATOR",
        state: { frequency: 110, detune: 0, waveform: "sawtooth" },
      },
      "1538135c-e1f7-4074-a8fd-f08d80ee8f56": {
        name: "lavish-rapid-clock",
        moduleKey: "1538135c-e1f7-4074-a8fd-f08d80ee8f56",
        type: "CLOCK",
        state: { tempo: 60 },
      },
      "afee7ca7-8358-400e-9fb7-11d4e2b0c4b9": {
        name: "ashamed-glistening-vca",
        moduleKey: "afee7ca7-8358-400e-9fb7-11d4e2b0c4b9",
        type: "VCA",
        state: {
          gate: 0.5,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.8,
          peak: 1,
        },
      },
      "bc8635c6-a4aa-41d1-bdd2-635ed6918f50": {
        name: "thriving-whimsical-filter",
        moduleKey: "bc8635c6-a4aa-41d1-bdd2-635ed6918f50",
        type: "FILTER",
        state: { frequency: 350, detune: 0, Q: 1, gain: 0, type: "lowpass" },
      },
    },
    modulePositions: {
      "0": [3326.5, 570.375],
      "7fc14d18-27c5-47fd-9e03-c52f1b77b36e": [1347, 217.375],
      "e0a7e685-d247-43de-8731-c91e3a7741fd": [751, 441.875],
      "9b33cd0f-ab9d-4193-8c66-33042df2366b": [890, 121.25],
      "5cbfcf22-457a-4692-940d-dcffd2581937": [1344, 431.375],
      "80adcbec-1e17-4e47-bf82-9c3f15db34d8": [1699, 557.375],
      "607eeac7-c5ca-4a76-8262-477e33cee800": [1320, 833],
      "6351f521-0044-4105-9952-a4274d827eed": [1729.25, 910.875],
      "45606689-3bd0-46e6-be8d-890330671d99": [2082, 833.375],
      "c6076f7d-6544-4d24-bb44-46da75b5dc85": [2482, 528.875],
      "c4526689-14c3-4022-80f9-a2fa78b457cf": [2480, 701.875],
      "28dc56b4-3989-45b0-931f-e73b2fbda11b": [3019.25, 583.625],
      "ba94654e-4b21-44c5-af27-1799081675fc": [2657, 899.875],
      "67550b0d-895e-4ea9-9881-df7818f5cdd2": [1109, 1212.25],
      "d9b0911c-04e2-4243-bc91-1e9e1a665f04": [1468, 1226.75],
      "1538135c-e1f7-4074-a8fd-f08d80ee8f56": [662, 678.875],
      "afee7ca7-8358-400e-9fb7-11d4e2b0c4b9": [1861, 1219.375],
      "bc8635c6-a4aa-41d1-bdd2-635ed6918f50": [2270.25, 1091.875],
    },
    connections: {
      "e0a7e685-d247-43de-8731-c91e3a7741fd_1_0|9b33cd0f-ab9d-4193-8c66-33042df2366b_0_0":
        [
          {
            moduleKey: "e0a7e685-d247-43de-8731-c91e3a7741fd",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "9b33cd0f-ab9d-4193-8c66-33042df2366b",
            channel: 0,
            type: 0,
          },
        ],
      "9b33cd0f-ab9d-4193-8c66-33042df2366b_1_0|7fc14d18-27c5-47fd-9e03-c52f1b77b36e_detune":
        [
          {
            moduleKey: "9b33cd0f-ab9d-4193-8c66-33042df2366b",
            channel: 0,
            type: 1,
          },
          { moduleKey: "7fc14d18-27c5-47fd-9e03-c52f1b77b36e", name: "detune" },
        ],
      "e0a7e685-d247-43de-8731-c91e3a7741fd_1_0|5cbfcf22-457a-4692-940d-dcffd2581937_0_1":
        [
          {
            moduleKey: "e0a7e685-d247-43de-8731-c91e3a7741fd",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "5cbfcf22-457a-4692-940d-dcffd2581937",
            channel: 1,
            type: 0,
          },
        ],
      "7fc14d18-27c5-47fd-9e03-c52f1b77b36e_1_0|5cbfcf22-457a-4692-940d-dcffd2581937_0_0":
        [
          {
            moduleKey: "7fc14d18-27c5-47fd-9e03-c52f1b77b36e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "5cbfcf22-457a-4692-940d-dcffd2581937",
            channel: 0,
            type: 0,
          },
        ],
      "5cbfcf22-457a-4692-940d-dcffd2581937_1_0|80adcbec-1e17-4e47-bf82-9c3f15db34d8_0_0":
        [
          {
            moduleKey: "5cbfcf22-457a-4692-940d-dcffd2581937",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "80adcbec-1e17-4e47-bf82-9c3f15db34d8",
            channel: 0,
            type: 0,
          },
        ],
      "e0a7e685-d247-43de-8731-c91e3a7741fd_1_0|607eeac7-c5ca-4a76-8262-477e33cee800_0_0":
        [
          {
            moduleKey: "e0a7e685-d247-43de-8731-c91e3a7741fd",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "607eeac7-c5ca-4a76-8262-477e33cee800",
            channel: 0,
            type: 0,
          },
        ],
      "607eeac7-c5ca-4a76-8262-477e33cee800_1_0|80adcbec-1e17-4e47-bf82-9c3f15db34d8_detune":
        [
          {
            moduleKey: "607eeac7-c5ca-4a76-8262-477e33cee800",
            channel: 0,
            type: 1,
          },
          { moduleKey: "80adcbec-1e17-4e47-bf82-9c3f15db34d8", name: "detune" },
        ],
      "80adcbec-1e17-4e47-bf82-9c3f15db34d8_1_0|6351f521-0044-4105-9952-a4274d827eed_0_0":
        [
          {
            moduleKey: "80adcbec-1e17-4e47-bf82-9c3f15db34d8",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6351f521-0044-4105-9952-a4274d827eed",
            channel: 0,
            type: 0,
          },
        ],
      "6351f521-0044-4105-9952-a4274d827eed_1_0|45606689-3bd0-46e6-be8d-890330671d99_0_0":
        [
          {
            moduleKey: "6351f521-0044-4105-9952-a4274d827eed",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "45606689-3bd0-46e6-be8d-890330671d99",
            channel: 0,
            type: 0,
          },
        ],
      "45606689-3bd0-46e6-be8d-890330671d99_1_0|6351f521-0044-4105-9952-a4274d827eed_0_0":
        [
          {
            moduleKey: "45606689-3bd0-46e6-be8d-890330671d99",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6351f521-0044-4105-9952-a4274d827eed",
            channel: 0,
            type: 0,
          },
        ],
      "80adcbec-1e17-4e47-bf82-9c3f15db34d8_1_0|c6076f7d-6544-4d24-bb44-46da75b5dc85_0_0":
        [
          {
            moduleKey: "80adcbec-1e17-4e47-bf82-9c3f15db34d8",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "c6076f7d-6544-4d24-bb44-46da75b5dc85",
            channel: 0,
            type: 0,
          },
        ],
      "45606689-3bd0-46e6-be8d-890330671d99_1_0|c6076f7d-6544-4d24-bb44-46da75b5dc85_0_0":
        [
          {
            moduleKey: "45606689-3bd0-46e6-be8d-890330671d99",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "c6076f7d-6544-4d24-bb44-46da75b5dc85",
            channel: 0,
            type: 0,
          },
        ],
      "80adcbec-1e17-4e47-bf82-9c3f15db34d8_1_0|c6076f7d-6544-4d24-bb44-46da75b5dc85_gain":
        [
          {
            moduleKey: "80adcbec-1e17-4e47-bf82-9c3f15db34d8",
            channel: 0,
            type: 1,
          },
          { moduleKey: "c6076f7d-6544-4d24-bb44-46da75b5dc85", name: "gain" },
        ],
      "45606689-3bd0-46e6-be8d-890330671d99_1_0|c6076f7d-6544-4d24-bb44-46da75b5dc85_gain":
        [
          {
            moduleKey: "45606689-3bd0-46e6-be8d-890330671d99",
            channel: 0,
            type: 1,
          },
          { moduleKey: "c6076f7d-6544-4d24-bb44-46da75b5dc85", name: "gain" },
        ],
      "80adcbec-1e17-4e47-bf82-9c3f15db34d8_1_0|c4526689-14c3-4022-80f9-a2fa78b457cf_0_0":
        [
          {
            moduleKey: "80adcbec-1e17-4e47-bf82-9c3f15db34d8",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "c4526689-14c3-4022-80f9-a2fa78b457cf",
            channel: 0,
            type: 0,
          },
        ],
      "80adcbec-1e17-4e47-bf82-9c3f15db34d8_1_0|c4526689-14c3-4022-80f9-a2fa78b457cf_gain":
        [
          {
            moduleKey: "80adcbec-1e17-4e47-bf82-9c3f15db34d8",
            channel: 0,
            type: 1,
          },
          { moduleKey: "c4526689-14c3-4022-80f9-a2fa78b457cf", name: "gain" },
        ],
      "45606689-3bd0-46e6-be8d-890330671d99_1_0|c4526689-14c3-4022-80f9-a2fa78b457cf_0_0":
        [
          {
            moduleKey: "45606689-3bd0-46e6-be8d-890330671d99",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "c4526689-14c3-4022-80f9-a2fa78b457cf",
            channel: 0,
            type: 0,
          },
        ],
      "45606689-3bd0-46e6-be8d-890330671d99_1_0|c4526689-14c3-4022-80f9-a2fa78b457cf_gain":
        [
          {
            moduleKey: "45606689-3bd0-46e6-be8d-890330671d99",
            channel: 0,
            type: 1,
          },
          { moduleKey: "c4526689-14c3-4022-80f9-a2fa78b457cf", name: "gain" },
        ],
      "c6076f7d-6544-4d24-bb44-46da75b5dc85_1_0|28dc56b4-3989-45b0-931f-e73b2fbda11b_0_0":
        [
          {
            moduleKey: "c6076f7d-6544-4d24-bb44-46da75b5dc85",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "28dc56b4-3989-45b0-931f-e73b2fbda11b",
            channel: 0,
            type: 0,
          },
        ],
      "c4526689-14c3-4022-80f9-a2fa78b457cf_1_0|28dc56b4-3989-45b0-931f-e73b2fbda11b_0_0":
        [
          {
            moduleKey: "c4526689-14c3-4022-80f9-a2fa78b457cf",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "28dc56b4-3989-45b0-931f-e73b2fbda11b",
            channel: 0,
            type: 0,
          },
        ],
      "28dc56b4-3989-45b0-931f-e73b2fbda11b_1_0|0_0_0": [
        {
          moduleKey: "28dc56b4-3989-45b0-931f-e73b2fbda11b",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", channel: 0, type: 0 },
      ],
      "ba94654e-4b21-44c5-af27-1799081675fc_1_0|28dc56b4-3989-45b0-931f-e73b2fbda11b_0_0":
        [
          {
            moduleKey: "ba94654e-4b21-44c5-af27-1799081675fc",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "28dc56b4-3989-45b0-931f-e73b2fbda11b",
            channel: 0,
            type: 0,
          },
        ],
      "1538135c-e1f7-4074-a8fd-f08d80ee8f56_1_0|e0a7e685-d247-43de-8731-c91e3a7741fd_0_0":
        [
          {
            moduleKey: "1538135c-e1f7-4074-a8fd-f08d80ee8f56",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "e0a7e685-d247-43de-8731-c91e3a7741fd",
            channel: 0,
            type: 0,
          },
        ],
      "1538135c-e1f7-4074-a8fd-f08d80ee8f56_1_0|67550b0d-895e-4ea9-9881-df7818f5cdd2_0_0":
        [
          {
            moduleKey: "1538135c-e1f7-4074-a8fd-f08d80ee8f56",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "67550b0d-895e-4ea9-9881-df7818f5cdd2",
            channel: 0,
            type: 0,
          },
        ],
      "67550b0d-895e-4ea9-9881-df7818f5cdd2_1_0|d9b0911c-04e2-4243-bc91-1e9e1a665f04_detune":
        [
          {
            moduleKey: "67550b0d-895e-4ea9-9881-df7818f5cdd2",
            channel: 0,
            type: 1,
          },
          { moduleKey: "d9b0911c-04e2-4243-bc91-1e9e1a665f04", name: "detune" },
        ],
      "d9b0911c-04e2-4243-bc91-1e9e1a665f04_1_0|afee7ca7-8358-400e-9fb7-11d4e2b0c4b9_0_0":
        [
          {
            moduleKey: "d9b0911c-04e2-4243-bc91-1e9e1a665f04",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "afee7ca7-8358-400e-9fb7-11d4e2b0c4b9",
            channel: 0,
            type: 0,
          },
        ],
      "1538135c-e1f7-4074-a8fd-f08d80ee8f56_1_0|afee7ca7-8358-400e-9fb7-11d4e2b0c4b9_0_1":
        [
          {
            moduleKey: "1538135c-e1f7-4074-a8fd-f08d80ee8f56",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "afee7ca7-8358-400e-9fb7-11d4e2b0c4b9",
            channel: 1,
            type: 0,
          },
        ],
      "afee7ca7-8358-400e-9fb7-11d4e2b0c4b9_1_0|bc8635c6-a4aa-41d1-bdd2-635ed6918f50_0_0":
        [
          {
            moduleKey: "afee7ca7-8358-400e-9fb7-11d4e2b0c4b9",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "bc8635c6-a4aa-41d1-bdd2-635ed6918f50",
            channel: 0,
            type: 0,
          },
        ],
      "bc8635c6-a4aa-41d1-bdd2-635ed6918f50_1_0|28dc56b4-3989-45b0-931f-e73b2fbda11b_0_0":
        [
          {
            moduleKey: "bc8635c6-a4aa-41d1-bdd2-635ed6918f50",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "28dc56b4-3989-45b0-931f-e73b2fbda11b",
            channel: 0,
            type: 0,
          },
        ],
      "bc8635c6-a4aa-41d1-bdd2-635ed6918f50_1_0|ba94654e-4b21-44c5-af27-1799081675fc_0_0":
        [
          {
            moduleKey: "bc8635c6-a4aa-41d1-bdd2-635ed6918f50",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "ba94654e-4b21-44c5-af27-1799081675fc",
            channel: 0,
            type: 0,
          },
        ],
      "bc8635c6-a4aa-41d1-bdd2-635ed6918f50_1_0|ba94654e-4b21-44c5-af27-1799081675fc_gain":
        [
          {
            moduleKey: "bc8635c6-a4aa-41d1-bdd2-635ed6918f50",
            channel: 0,
            type: 1,
          },
          { moduleKey: "ba94654e-4b21-44c5-af27-1799081675fc", name: "gain" },
        ],
    },
  },
};

const sss2 = {
  id: "5bfa4a63-8aad-49ee-8056-c89f38efd8ae",
  name: "short-swift-songs",
  slug: "short-swift-songs-5bfa4a63",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.125 },
      },
      "61a34a08-179e-493d-bd49-7de374508237": {
        name: "unwieldy-rosy-clock",
        moduleKey: "61a34a08-179e-493d-bd49-7de374508237",
        type: "CLOCK",
        state: { tempo: 132 },
      },
      "eb392a37-8a22-4bb1-8784-f4673507460d": {
        name: "tricky-sensitive-sequencer",
        moduleKey: "eb392a37-8a22-4bb1-8784-f4673507460d",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 0,
          step1: 500,
          step2: 700,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "93fc013a-45ca-43e5-8630-6f55a35f240c": {
        name: "benevolent-ablaze-oscillator",
        moduleKey: "93fc013a-45ca-43e5-8630-6f55a35f240c",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: 0, waveform: "sine" },
      },
      "4b6bfa9d-7e30-4df3-b82f-d3815fef5a98": {
        name: "amused-plausible-filter",
        moduleKey: "4b6bfa9d-7e30-4df3-b82f-d3815fef5a98",
        type: "FILTER",
        state: { frequency: 20, detune: 0, Q: 0, gain: 0, type: "lowpass" },
      },
      "7041a281-e5f7-47e2-a4fa-6287aeed8ffd": {
        name: "disturbed-cozy-sequencer",
        moduleKey: "7041a281-e5f7-47e2-a4fa-6287aeed8ffd",
        type: "SEQUENCER",
        state: {
          steps: 7,
          step0: 0,
          step1: 0,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 1,
          step7: 0,
        },
      },
      "d06a320a-1e72-4f43-86f0-3324622644be": {
        name: "modest-okay-clock",
        moduleKey: "d06a320a-1e72-4f43-86f0-3324622644be",
        type: "CLOCK",
        state: { tempo: 528 },
      },
      "3e577245-e29d-41ae-9509-23ca6f58f735": {
        name: "zonked-light-gain",
        moduleKey: "3e577245-e29d-41ae-9509-23ca6f58f735",
        type: "GAIN",
        state: { gain: 0 },
      },
      "491bfc7d-c2ee-4f4e-b696-cd71ee2f2b18": {
        name: "terrible-teal-oscillator",
        moduleKey: "491bfc7d-c2ee-4f4e-b696-cd71ee2f2b18",
        type: "OSCILLATOR",
        state: { frequency: 1760, detune: 0, waveform: "sawtooth" },
      },
      "dcabbae8-0d35-4152-901c-8c1e10293f58": {
        name: "unruly-sparkling-vca",
        moduleKey: "dcabbae8-0d35-4152-901c-8c1e10293f58",
        type: "VCA",
        state: {
          gate: 0.125,
          attack: 0,
          decay: 0,
          sustain: 0.5,
          release: 0.1,
          peak: 0.125,
        },
      },
      "6b6b6169-ebc6-4a3e-8197-3338327c1b16": {
        name: "divine-faded-oscillator",
        moduleKey: "6b6b6169-ebc6-4a3e-8197-3338327c1b16",
        type: "OSCILLATOR",
        state: { frequency: 27.5, detune: 0, waveform: "square" },
      },
      "9a3e88b5-2e0a-44db-9ff3-f52689bb0522": {
        name: "automatic-moral-gain",
        moduleKey: "9a3e88b5-2e0a-44db-9ff3-f52689bb0522",
        type: "GAIN",
        state: { gain: 1200 },
      },
      "8b59d116-0003-433a-b92b-846064647f14": {
        name: "haloed-fiery-oscillator",
        moduleKey: "8b59d116-0003-433a-b92b-846064647f14",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: 0, waveform: "sine" },
      },
      "cf203f0e-c993-40e1-ad2e-384dd2423c01": {
        name: "hollow-lazy-gain",
        moduleKey: "cf203f0e-c993-40e1-ad2e-384dd2423c01",
        type: "GAIN",
        state: { gain: 0.00390625 },
      },
    },
    modulePositions: {
      "0": [2758, 1020],
      "61a34a08-179e-493d-bd49-7de374508237": [237, 436],
      "eb392a37-8a22-4bb1-8784-f4673507460d": [998, 618],
      "93fc013a-45ca-43e5-8630-6f55a35f240c": [1953, 930],
      "4b6bfa9d-7e30-4df3-b82f-d3815fef5a98": [1404, 741],
      "7041a281-e5f7-47e2-a4fa-6287aeed8ffd": [1400, 73],
      "d06a320a-1e72-4f43-86f0-3324622644be": [285, 777],
      "3e577245-e29d-41ae-9509-23ca6f58f735": [1409, 498],
      "491bfc7d-c2ee-4f4e-b696-cd71ee2f2b18": [1904, 1351],
      "dcabbae8-0d35-4152-901c-8c1e10293f58": [1902, 1632],
      "6b6b6169-ebc6-4a3e-8197-3338327c1b16": [2016, 88],
      "9a3e88b5-2e0a-44db-9ff3-f52689bb0522": [2013, 314],
      "8b59d116-0003-433a-b92b-846064647f14": [2006, 484],
      "cf203f0e-c993-40e1-ad2e-384dd2423c01": [2007, 712],
    },
    connections: {
      "93fc013a-45ca-43e5-8630-6f55a35f240c_1_0|0_0_0": [
        {
          moduleKey: "93fc013a-45ca-43e5-8630-6f55a35f240c",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "61a34a08-179e-493d-bd49-7de374508237_1_0|eb392a37-8a22-4bb1-8784-f4673507460d_0_0":
        [
          {
            moduleKey: "61a34a08-179e-493d-bd49-7de374508237",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "eb392a37-8a22-4bb1-8784-f4673507460d",
            channel: 0,
            type: 0,
          },
        ],
      "eb392a37-8a22-4bb1-8784-f4673507460d_1_0|4b6bfa9d-7e30-4df3-b82f-d3815fef5a98_0_0":
        [
          {
            moduleKey: "eb392a37-8a22-4bb1-8784-f4673507460d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "4b6bfa9d-7e30-4df3-b82f-d3815fef5a98",
            type: 0,
            channel: 0,
          },
        ],
      "4b6bfa9d-7e30-4df3-b82f-d3815fef5a98_1_0|93fc013a-45ca-43e5-8630-6f55a35f240c_detune":
        [
          {
            moduleKey: "4b6bfa9d-7e30-4df3-b82f-d3815fef5a98",
            channel: 0,
            type: 1,
          },
          { moduleKey: "93fc013a-45ca-43e5-8630-6f55a35f240c", name: "detune" },
        ],
      "d06a320a-1e72-4f43-86f0-3324622644be_1_0|7041a281-e5f7-47e2-a4fa-6287aeed8ffd_0_0":
        [
          {
            moduleKey: "d06a320a-1e72-4f43-86f0-3324622644be",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7041a281-e5f7-47e2-a4fa-6287aeed8ffd",
            type: 0,
            channel: 0,
          },
        ],
      "7041a281-e5f7-47e2-a4fa-6287aeed8ffd_1_0|3e577245-e29d-41ae-9509-23ca6f58f735_gain":
        [
          {
            moduleKey: "7041a281-e5f7-47e2-a4fa-6287aeed8ffd",
            channel: 0,
            type: 1,
          },
          { moduleKey: "3e577245-e29d-41ae-9509-23ca6f58f735", name: "gain" },
        ],
      "eb392a37-8a22-4bb1-8784-f4673507460d_1_0|3e577245-e29d-41ae-9509-23ca6f58f735_0_0":
        [
          {
            moduleKey: "eb392a37-8a22-4bb1-8784-f4673507460d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "3e577245-e29d-41ae-9509-23ca6f58f735",
            type: 0,
            channel: 0,
          },
        ],
      "3e577245-e29d-41ae-9509-23ca6f58f735_1_0|93fc013a-45ca-43e5-8630-6f55a35f240c_detune":
        [
          {
            moduleKey: "3e577245-e29d-41ae-9509-23ca6f58f735",
            channel: 0,
            type: 1,
          },
          { moduleKey: "93fc013a-45ca-43e5-8630-6f55a35f240c", name: "detune" },
        ],
      "61a34a08-179e-493d-bd49-7de374508237_1_0|d06a320a-1e72-4f43-86f0-3324622644be_0_0":
        [
          {
            moduleKey: "61a34a08-179e-493d-bd49-7de374508237",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "d06a320a-1e72-4f43-86f0-3324622644be",
            type: 0,
            channel: 0,
          },
        ],
      "4b6bfa9d-7e30-4df3-b82f-d3815fef5a98_1_0|491bfc7d-c2ee-4f4e-b696-cd71ee2f2b18_detune":
        [
          {
            moduleKey: "4b6bfa9d-7e30-4df3-b82f-d3815fef5a98",
            channel: 0,
            type: 1,
          },
          { moduleKey: "491bfc7d-c2ee-4f4e-b696-cd71ee2f2b18", name: "detune" },
        ],
      "491bfc7d-c2ee-4f4e-b696-cd71ee2f2b18_1_0|dcabbae8-0d35-4152-901c-8c1e10293f58_0_0":
        [
          {
            moduleKey: "491bfc7d-c2ee-4f4e-b696-cd71ee2f2b18",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "dcabbae8-0d35-4152-901c-8c1e10293f58",
            type: 0,
            channel: 0,
          },
        ],
      "dcabbae8-0d35-4152-901c-8c1e10293f58_1_0|0_0_0": [
        {
          moduleKey: "dcabbae8-0d35-4152-901c-8c1e10293f58",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "d06a320a-1e72-4f43-86f0-3324622644be_1_0|dcabbae8-0d35-4152-901c-8c1e10293f58_0_1":
        [
          {
            moduleKey: "d06a320a-1e72-4f43-86f0-3324622644be",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "dcabbae8-0d35-4152-901c-8c1e10293f58",
            type: 0,
            channel: 1,
          },
        ],
      "6b6b6169-ebc6-4a3e-8197-3338327c1b16_1_0|9a3e88b5-2e0a-44db-9ff3-f52689bb0522_0_0":
        [
          {
            moduleKey: "6b6b6169-ebc6-4a3e-8197-3338327c1b16",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "9a3e88b5-2e0a-44db-9ff3-f52689bb0522",
            type: 0,
            channel: 0,
          },
        ],
      "eb392a37-8a22-4bb1-8784-f4673507460d_1_0|6b6b6169-ebc6-4a3e-8197-3338327c1b16_detune":
        [
          {
            moduleKey: "eb392a37-8a22-4bb1-8784-f4673507460d",
            channel: 0,
            type: 1,
          },
          { moduleKey: "6b6b6169-ebc6-4a3e-8197-3338327c1b16", name: "detune" },
        ],
      "3e577245-e29d-41ae-9509-23ca6f58f735_1_0|8b59d116-0003-433a-b92b-846064647f14_detune":
        [
          {
            moduleKey: "3e577245-e29d-41ae-9509-23ca6f58f735",
            channel: 0,
            type: 1,
          },
          { moduleKey: "8b59d116-0003-433a-b92b-846064647f14", name: "detune" },
        ],
      "4b6bfa9d-7e30-4df3-b82f-d3815fef5a98_1_0|8b59d116-0003-433a-b92b-846064647f14_detune":
        [
          {
            moduleKey: "4b6bfa9d-7e30-4df3-b82f-d3815fef5a98",
            channel: 0,
            type: 1,
          },
          { moduleKey: "8b59d116-0003-433a-b92b-846064647f14", name: "detune" },
        ],
      "9a3e88b5-2e0a-44db-9ff3-f52689bb0522_1_0|8b59d116-0003-433a-b92b-846064647f14_detune":
        [
          {
            moduleKey: "9a3e88b5-2e0a-44db-9ff3-f52689bb0522",
            channel: 0,
            type: 1,
          },
          { moduleKey: "8b59d116-0003-433a-b92b-846064647f14", name: "detune" },
        ],
      "8b59d116-0003-433a-b92b-846064647f14_1_0|cf203f0e-c993-40e1-ad2e-384dd2423c01_0_0":
        [
          {
            moduleKey: "8b59d116-0003-433a-b92b-846064647f14",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "cf203f0e-c993-40e1-ad2e-384dd2423c01",
            type: 0,
            channel: 0,
          },
        ],
      "cf203f0e-c993-40e1-ad2e-384dd2423c01_1_0|0_0_0": [
        {
          moduleKey: "cf203f0e-c993-40e1-ad2e-384dd2423c01",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
    },
  },
};

const ddd = {
  id: "6121e454-0e41-4aaf-ad9d-671c51d8b291",
  name: "delirious-distinct-ducks",
  slug: "delirious-distinct-ducks-6121e454",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.1125 },
      },
      "40e65091-9fd6-4507-baaa-61acdff5e64c": {
        name: "urbane-known-clock",
        moduleKey: "40e65091-9fd6-4507-baaa-61acdff5e64c",
        type: "CLOCK",
        state: { tempo: 132 },
      },
      "1c8dc60b-af39-4da3-8d15-b67382db263d": {
        name: "spry-waggish-sequencer",
        moduleKey: "1c8dc60b-af39-4da3-8d15-b67382db263d",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 0,
          step1: 0,
          step2: -700,
          step3: -400,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "ba376a83-8c88-4254-a611-d96159bad8e8": {
        name: "direful-loose-oscillator",
        moduleKey: "ba376a83-8c88-4254-a611-d96159bad8e8",
        type: "OSCILLATOR",
        state: { frequency: 880, detune: 6, waveform: "square" },
      },
      "1bc422e0-5db3-4fd3-8c68-34732458aedf": {
        name: "vast-stereotyped-vca",
        moduleKey: "1bc422e0-5db3-4fd3-8c68-34732458aedf",
        type: "VCA",
        state: {
          gate: 0.01,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.2,
          peak: 1,
        },
      },
      "1335ae29-23d8-4a2c-91c8-c829077d8ecb": {
        name: "slimy-gusty-oscillator",
        moduleKey: "1335ae29-23d8-4a2c-91c8-c829077d8ecb",
        type: "OSCILLATOR",
        state: { frequency: 110, detune: -5, waveform: "sawtooth" },
      },
      "1187c72a-9782-42e5-a56a-ab858d67568b": {
        name: "resilient-callous-limiter",
        moduleKey: "1187c72a-9782-42e5-a56a-ab858d67568b",
        type: "LIMITER",
        state: {},
      },
      "84f16ae5-fc3f-40db-855e-6dd5aa065ff9": {
        name: "sable-pithy-envelope",
        moduleKey: "84f16ae5-fc3f-40db-855e-6dd5aa065ff9",
        type: "ENVELOPE",
        state: {
          gate: 0.0078125,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.025,
          peak: -100,
        },
      },
      "5bc90924-55f2-4e3b-89a2-6e45cb5d2447": {
        name: "unusual-good-clock",
        moduleKey: "5bc90924-55f2-4e3b-89a2-6e45cb5d2447",
        type: "CLOCK",
        state: { tempo: 33 },
      },
      "abece72d-ef9c-4448-92ab-9ce8b46235d9": {
        name: "prime-dainty-oscillator",
        moduleKey: "abece72d-ef9c-4448-92ab-9ce8b46235d9",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: 2, waveform: "sine" },
      },
      "01b5c536-41fd-45b4-839d-c75e59b16819": {
        name: "tawdry-standing-sequencer",
        moduleKey: "01b5c536-41fd-45b4-839d-c75e59b16819",
        type: "SEQUENCER",
        state: {
          steps: 5,
          step0: 1,
          step1: 1,
          step2: 0,
          step3: 1,
          step4: 1,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "f26c1d7f-5696-479d-928d-a466b34e2fea": {
        name: "laughable-mellow-gain",
        moduleKey: "f26c1d7f-5696-479d-928d-a466b34e2fea",
        type: "GAIN",
        state: { gain: 0 },
      },
      "f473900c-5599-46cb-a545-ad7fb6b1dd8e": {
        name: "burly-giant-clock",
        moduleKey: "f473900c-5599-46cb-a545-ad7fb6b1dd8e",
        type: "CLOCK",
        state: { tempo: 528 },
      },
      "7a213088-d5c5-4411-92eb-7a7d2777d204": {
        name: "dry-adjoining-filter",
        moduleKey: "7a213088-d5c5-4411-92eb-7a7d2777d204",
        type: "FILTER",
        state: { frequency: 350, detune: 0, Q: 1, gain: 0, type: "lowpass" },
      },
      "0697c1d3-851e-4d25-a415-aa40248596d2": {
        name: "magnificent-guided-envelope",
        moduleKey: "0697c1d3-851e-4d25-a415-aa40248596d2",
        type: "ENVELOPE",
        state: {
          gate: 0.0625,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 2400,
        },
      },
    },
    modulePositions: {
      "0": [2520, 698],
      "40e65091-9fd6-4507-baaa-61acdff5e64c": [32, 608],
      "1c8dc60b-af39-4da3-8d15-b67382db263d": [667, 80],
      "ba376a83-8c88-4254-a611-d96159bad8e8": [1124, 106],
      "1bc422e0-5db3-4fd3-8c68-34732458aedf": [1555, 1086],
      "1335ae29-23d8-4a2c-91c8-c829077d8ecb": [958, 546],
      "1187c72a-9782-42e5-a56a-ab858d67568b": [1489, 487],
      "84f16ae5-fc3f-40db-855e-6dd5aa065ff9": [580, 420],
      "5bc90924-55f2-4e3b-89a2-6e45cb5d2447": [122, 269],
      "abece72d-ef9c-4448-92ab-9ce8b46235d9": [996, 327],
      "01b5c536-41fd-45b4-839d-c75e59b16819": [705, 1115],
      "f26c1d7f-5696-479d-928d-a466b34e2fea": [1186, 1091],
      "f473900c-5599-46cb-a545-ad7fb6b1dd8e": [48, 871],
      "7a213088-d5c5-4411-92eb-7a7d2777d204": [1999, 773],
      "0697c1d3-851e-4d25-a415-aa40248596d2": [697, 761],
    },
    connections: {
      "1335ae29-23d8-4a2c-91c8-c829077d8ecb_1_0|1187c72a-9782-42e5-a56a-ab858d67568b_0_0":
        [
          {
            moduleKey: "1335ae29-23d8-4a2c-91c8-c829077d8ecb",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "1187c72a-9782-42e5-a56a-ab858d67568b",
            type: 0,
            channel: 0,
          },
        ],
      "ba376a83-8c88-4254-a611-d96159bad8e8_1_0|1187c72a-9782-42e5-a56a-ab858d67568b_0_0":
        [
          {
            moduleKey: "ba376a83-8c88-4254-a611-d96159bad8e8",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "1187c72a-9782-42e5-a56a-ab858d67568b",
            type: 0,
            channel: 0,
          },
        ],
      "1187c72a-9782-42e5-a56a-ab858d67568b_1_0|1bc422e0-5db3-4fd3-8c68-34732458aedf_0_0":
        [
          {
            moduleKey: "1187c72a-9782-42e5-a56a-ab858d67568b",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "1bc422e0-5db3-4fd3-8c68-34732458aedf",
            type: 0,
            channel: 0,
          },
        ],
      "5bc90924-55f2-4e3b-89a2-6e45cb5d2447_1_0|40e65091-9fd6-4507-baaa-61acdff5e64c_0_0":
        [
          {
            moduleKey: "5bc90924-55f2-4e3b-89a2-6e45cb5d2447",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "40e65091-9fd6-4507-baaa-61acdff5e64c",
            type: 0,
            channel: 0,
          },
        ],
      "5bc90924-55f2-4e3b-89a2-6e45cb5d2447_1_0|84f16ae5-fc3f-40db-855e-6dd5aa065ff9_0_0":
        [
          {
            moduleKey: "5bc90924-55f2-4e3b-89a2-6e45cb5d2447",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "84f16ae5-fc3f-40db-855e-6dd5aa065ff9",
            type: 0,
            channel: 0,
          },
        ],
      "84f16ae5-fc3f-40db-855e-6dd5aa065ff9_1_0|ba376a83-8c88-4254-a611-d96159bad8e8_detune":
        [
          {
            moduleKey: "84f16ae5-fc3f-40db-855e-6dd5aa065ff9",
            channel: 0,
            type: 1,
          },
          { moduleKey: "ba376a83-8c88-4254-a611-d96159bad8e8", name: "detune" },
        ],
      "84f16ae5-fc3f-40db-855e-6dd5aa065ff9_1_0|1335ae29-23d8-4a2c-91c8-c829077d8ecb_detune":
        [
          {
            moduleKey: "84f16ae5-fc3f-40db-855e-6dd5aa065ff9",
            channel: 0,
            type: 1,
          },
          { moduleKey: "1335ae29-23d8-4a2c-91c8-c829077d8ecb", name: "detune" },
        ],
      "5bc90924-55f2-4e3b-89a2-6e45cb5d2447_1_0|1c8dc60b-af39-4da3-8d15-b67382db263d_0_0":
        [
          {
            moduleKey: "5bc90924-55f2-4e3b-89a2-6e45cb5d2447",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "1c8dc60b-af39-4da3-8d15-b67382db263d",
            type: 0,
            channel: 0,
          },
        ],
      "1c8dc60b-af39-4da3-8d15-b67382db263d_1_0|ba376a83-8c88-4254-a611-d96159bad8e8_detune":
        [
          {
            moduleKey: "1c8dc60b-af39-4da3-8d15-b67382db263d",
            channel: 0,
            type: 1,
          },
          { moduleKey: "ba376a83-8c88-4254-a611-d96159bad8e8", name: "detune" },
        ],
      "1c8dc60b-af39-4da3-8d15-b67382db263d_1_0|1335ae29-23d8-4a2c-91c8-c829077d8ecb_detune":
        [
          {
            moduleKey: "1c8dc60b-af39-4da3-8d15-b67382db263d",
            channel: 0,
            type: 1,
          },
          { moduleKey: "1335ae29-23d8-4a2c-91c8-c829077d8ecb", name: "detune" },
        ],
      "1c8dc60b-af39-4da3-8d15-b67382db263d_1_0|abece72d-ef9c-4448-92ab-9ce8b46235d9_detune":
        [
          {
            moduleKey: "1c8dc60b-af39-4da3-8d15-b67382db263d",
            channel: 0,
            type: 1,
          },
          { moduleKey: "abece72d-ef9c-4448-92ab-9ce8b46235d9", name: "detune" },
        ],
      "abece72d-ef9c-4448-92ab-9ce8b46235d9_1_0|1187c72a-9782-42e5-a56a-ab858d67568b_0_0":
        [
          {
            moduleKey: "abece72d-ef9c-4448-92ab-9ce8b46235d9",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "1187c72a-9782-42e5-a56a-ab858d67568b",
            type: 0,
            channel: 0,
          },
        ],
      "f26c1d7f-5696-479d-928d-a466b34e2fea_1_0|1bc422e0-5db3-4fd3-8c68-34732458aedf_0_1":
        [
          {
            moduleKey: "f26c1d7f-5696-479d-928d-a466b34e2fea",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "1bc422e0-5db3-4fd3-8c68-34732458aedf",
            channel: 1,
            type: 0,
          },
        ],
      "01b5c536-41fd-45b4-839d-c75e59b16819_1_0|f26c1d7f-5696-479d-928d-a466b34e2fea_gain":
        [
          {
            moduleKey: "01b5c536-41fd-45b4-839d-c75e59b16819",
            channel: 0,
            type: 1,
          },
          { moduleKey: "f26c1d7f-5696-479d-928d-a466b34e2fea", name: "gain" },
        ],
      "f473900c-5599-46cb-a545-ad7fb6b1dd8e_1_0|01b5c536-41fd-45b4-839d-c75e59b16819_0_0":
        [
          {
            moduleKey: "f473900c-5599-46cb-a545-ad7fb6b1dd8e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "01b5c536-41fd-45b4-839d-c75e59b16819",
            type: 0,
            channel: 0,
          },
        ],
      "40e65091-9fd6-4507-baaa-61acdff5e64c_1_0|f26c1d7f-5696-479d-928d-a466b34e2fea_0_0":
        [
          {
            moduleKey: "40e65091-9fd6-4507-baaa-61acdff5e64c",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "f26c1d7f-5696-479d-928d-a466b34e2fea",
            type: 0,
            channel: 0,
          },
        ],
      "f473900c-5599-46cb-a545-ad7fb6b1dd8e_1_0|f26c1d7f-5696-479d-928d-a466b34e2fea_0_0":
        [
          {
            moduleKey: "f473900c-5599-46cb-a545-ad7fb6b1dd8e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "f26c1d7f-5696-479d-928d-a466b34e2fea",
            type: 0,
            channel: 0,
          },
        ],
      "40e65091-9fd6-4507-baaa-61acdff5e64c_1_0|f473900c-5599-46cb-a545-ad7fb6b1dd8e_0_0":
        [
          {
            moduleKey: "40e65091-9fd6-4507-baaa-61acdff5e64c",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "f473900c-5599-46cb-a545-ad7fb6b1dd8e",
            type: 0,
            channel: 0,
          },
        ],
      "1bc422e0-5db3-4fd3-8c68-34732458aedf_1_0|7a213088-d5c5-4411-92eb-7a7d2777d204_0_0":
        [
          {
            moduleKey: "1bc422e0-5db3-4fd3-8c68-34732458aedf",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7a213088-d5c5-4411-92eb-7a7d2777d204",
            type: 0,
            channel: 0,
          },
        ],
      "7a213088-d5c5-4411-92eb-7a7d2777d204_1_0|0_0_0": [
        {
          moduleKey: "7a213088-d5c5-4411-92eb-7a7d2777d204",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "0697c1d3-851e-4d25-a415-aa40248596d2_1_0|7a213088-d5c5-4411-92eb-7a7d2777d204_detune":
        [
          {
            moduleKey: "0697c1d3-851e-4d25-a415-aa40248596d2",
            channel: 0,
            type: 1,
          },
          { moduleKey: "7a213088-d5c5-4411-92eb-7a7d2777d204", name: "detune" },
        ],
      "40e65091-9fd6-4507-baaa-61acdff5e64c_1_0|0697c1d3-851e-4d25-a415-aa40248596d2_0_0":
        [
          {
            moduleKey: "40e65091-9fd6-4507-baaa-61acdff5e64c",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "0697c1d3-851e-4d25-a415-aa40248596d2",
            type: 0,
            channel: 0,
          },
        ],
      "f473900c-5599-46cb-a545-ad7fb6b1dd8e_1_0|0697c1d3-851e-4d25-a415-aa40248596d2_0_0":
        [
          {
            moduleKey: "f473900c-5599-46cb-a545-ad7fb6b1dd8e",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "0697c1d3-851e-4d25-a415-aa40248596d2",
            type: 0,
            channel: 0,
          },
        ],
    },
  },
};

const ggg = {
  id: "6f36a14c-90bb-4b96-bf13-3c1e87b3b58a",
  name: "grouchy-gamy-giraffe",
  slug: "grouchy-gamy-giraffe-6f36a14c",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.45 },
      },
      "c2d8ca65-f9d8-49e7-a9ec-5fcb6b2d6cb7": {
        name: "distinct-troubled-clock",
        moduleKey: "c2d8ca65-f9d8-49e7-a9ec-5fcb6b2d6cb7",
        type: "CLOCK",
        state: { tempo: 15500 },
      },
      "87e1fd04-a346-4a20-949e-f74987b02625": {
        name: "wanted-bustling-clock",
        moduleKey: "87e1fd04-a346-4a20-949e-f74987b02625",
        type: "CLOCK",
        state: { tempo: 7650 },
      },
      "d96185b3-a6e3-4ab1-b9bb-2e5e5c1a80dd": {
        name: "canny-stingy-clock",
        moduleKey: "d96185b3-a6e3-4ab1-b9bb-2e5e5c1a80dd",
        type: "CLOCK",
        state: { tempo: 15360 },
      },
      "2d58a0d6-d017-45ab-bd1e-8c000eb4faef": {
        name: "abrasive-supreme-filter",
        moduleKey: "2d58a0d6-d017-45ab-bd1e-8c000eb4faef",
        type: "FILTER",
        state: { frequency: 350, detune: 0, Q: 1, gain: 0, type: "lowpass" },
      },
      "6abeaed9-2d19-44fb-9e97-1678f89f24d7": {
        name: "fixed-scandalous-sequencer",
        moduleKey: "6abeaed9-2d19-44fb-9e97-1678f89f24d7",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 2400,
          step1: 0,
          step2: -2400,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "28208a58-e4d6-4222-acc0-fd742b03ac63": {
        name: "temporary-green-clock",
        moduleKey: "28208a58-e4d6-4222-acc0-fd742b03ac63",
        type: "CLOCK",
        state: { tempo: 960 },
      },
      "7a367ce9-e1b5-4fe6-9c4c-f72301179fff": {
        name: "macabre-hallowed-filter",
        moduleKey: "7a367ce9-e1b5-4fe6-9c4c-f72301179fff",
        type: "FILTER",
        state: { frequency: 12.5, detune: 0, Q: 0, gain: 0, type: "lowpass" },
      },
      "c24840fb-8883-4bea-93d3-76add0fc4b90": {
        name: "uneven-orange-oscillator",
        moduleKey: "c24840fb-8883-4bea-93d3-76add0fc4b90",
        type: "OSCILLATOR",
        state: { frequency: 55, detune: 0, waveform: "sine" },
      },
      "d6b04d65-1936-4605-af0b-80727c71a1a3": {
        name: "long-super-vca",
        moduleKey: "d6b04d65-1936-4605-af0b-80727c71a1a3",
        type: "VCA",
        state: {
          gate: 0.0078125,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 1,
        },
      },
      "5564a2c7-e75b-49d4-bffd-3801e873c43f": {
        name: "top-few-envelope",
        moduleKey: "5564a2c7-e75b-49d4-bffd-3801e873c43f",
        type: "ENVELOPE",
        state: {
          gate: 0.0078125,
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.05,
          peak: 2400,
        },
      },
      "998db539-3f58-4ed8-9148-e37be2eb3099": {
        name: "symptomatic-defiant-clock",
        moduleKey: "998db539-3f58-4ed8-9148-e37be2eb3099",
        type: "CLOCK",
        state: { tempo: 480 },
      },
      "1c4d0cf5-06f4-4af2-b530-2350149cb0ca": {
        name: "unsuitable-noiseless-delay",
        moduleKey: "1c4d0cf5-06f4-4af2-b530-2350149cb0ca",
        type: "DELAY",
        state: { delayTime: 0.2 },
      },
      "fec4aa27-8b48-4332-8bb0-4ea1f1a23759": {
        name: "rough-new-gain",
        moduleKey: "fec4aa27-8b48-4332-8bb0-4ea1f1a23759",
        type: "GAIN",
        state: { gain: 0.2 },
      },
      "87716611-10dc-4b2a-a20e-4e1bd311a26a": {
        name: "plucky-whole-delay",
        moduleKey: "87716611-10dc-4b2a-a20e-4e1bd311a26a",
        type: "DELAY",
        state: { delayTime: 0.24 },
      },
      "e0d36ea0-362a-4dae-a2e9-b983d02a298e": {
        name: "salty-miscreant-delay",
        moduleKey: "e0d36ea0-362a-4dae-a2e9-b983d02a298e",
        type: "DELAY",
        state: { delayTime: 0.01 },
      },
      "d6c30539-59d8-4669-9bef-b9ee0e2c1247": {
        name: "like-unaccountable-gain",
        moduleKey: "d6c30539-59d8-4669-9bef-b9ee0e2c1247",
        type: "GAIN",
        state: { gain: 1 },
      },
      "0340f36d-127d-4705-ab17-e27ec880058b": {
        name: "impossible-recondite-filter",
        moduleKey: "0340f36d-127d-4705-ab17-e27ec880058b",
        type: "FILTER",
        state: { frequency: 880, detune: 0, Q: 8, gain: 0, type: "lowpass" },
      },
      "402b502c-7017-433d-a9a7-26b0c4079eb2": {
        name: "stupendous-novel-oscillator",
        moduleKey: "402b502c-7017-433d-a9a7-26b0c4079eb2",
        type: "OSCILLATOR",
        state: { frequency: 0.0537109375, detune: 0, waveform: "sine" },
      },
      "d01d35f2-671f-4ec3-8de4-27445bacddac": {
        name: "normal-hilarious-gain",
        moduleKey: "d01d35f2-671f-4ec3-8de4-27445bacddac",
        type: "GAIN",
        state: { gain: 2400 },
      },
      "f9555c2c-b5d6-460e-a18f-bf43af3da49a": {
        name: "equal-handsome-filter",
        moduleKey: "f9555c2c-b5d6-460e-a18f-bf43af3da49a",
        type: "FILTER",
        state: {
          frequency: 4200,
          detune: 0,
          Q: 0.0625,
          gain: 0,
          type: "lowpass",
        },
      },
      "abf0dd3e-ee64-4f8b-bbc1-22f5daec761f": {
        name: "fit-empty-oscillator",
        moduleKey: "abf0dd3e-ee64-4f8b-bbc1-22f5daec761f",
        type: "OSCILLATOR",
        state: { frequency: 55, detune: 10, waveform: "square" },
      },
      "06f16a12-0a5c-4524-85c1-50cffb60cab8": {
        name: "heavy-timely-gain",
        moduleKey: "06f16a12-0a5c-4524-85c1-50cffb60cab8",
        type: "GAIN",
        state: { gain: 0.3 },
      },
      "1dd45b15-4327-4ef5-8303-8f8967c286e7": {
        name: "gleaming-fierce-noise",
        moduleKey: "1dd45b15-4327-4ef5-8303-8f8967c286e7",
        type: "NOISE",
        state: {},
      },
      "4f6cfa8c-b8bb-4bbe-8353-89f25082028e": {
        name: "married-scary-gain",
        moduleKey: "4f6cfa8c-b8bb-4bbe-8353-89f25082028e",
        type: "GAIN",
        state: { gain: 0 },
      },
      "009fbd9c-8f05-4c36-9cf8-318f62d0002c": {
        name: "genial-limping-envelope",
        moduleKey: "009fbd9c-8f05-4c36-9cf8-318f62d0002c",
        type: "ENVELOPE",
        state: {
          gate: 0.0078125,
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 0,
        },
      },
      "63fb8d3a-0817-4d48-ac5d-e82b458a5be4": {
        name: "tearful-ethereal-oscillator",
        moduleKey: "63fb8d3a-0817-4d48-ac5d-e82b458a5be4",
        type: "OSCILLATOR",
        state: { frequency: 3, detune: 0, waveform: "sawtooth" },
      },
      "d7da3335-697c-4f4b-ac8e-871ee9bcd676": {
        name: "narrow-sudden-gain",
        moduleKey: "d7da3335-697c-4f4b-ac8e-871ee9bcd676",
        type: "GAIN",
        state: { gain: 0.5 },
      },
    },
    modulePositions: {
      "0": [1662, 1169],
      "c2d8ca65-f9d8-49e7-a9ec-5fcb6b2d6cb7": [76, 431],
      "87e1fd04-a346-4a20-949e-f74987b02625": [74, 202],
      "d96185b3-a6e3-4ab1-b9bb-2e5e5c1a80dd": [466, 191],
      "2d58a0d6-d017-45ab-bd1e-8c000eb4faef": [464, 673],
      "6abeaed9-2d19-44fb-9e97-1678f89f24d7": [56, 881],
      "28208a58-e4d6-4222-acc0-fd742b03ac63": [39, 636],
      "7a367ce9-e1b5-4fe6-9c4c-f72301179fff": [473, 1044],
      "c24840fb-8883-4bea-93d3-76add0fc4b90": [494, 1366],
      "d6b04d65-1936-4605-af0b-80727c71a1a3": [894, 1330],
      "5564a2c7-e75b-49d4-bffd-3801e873c43f": [417, 1840],
      "998db539-3f58-4ed8-9148-e37be2eb3099": [32, 1365],
      "1c4d0cf5-06f4-4af2-b530-2350149cb0ca": [2107, 564],
      "fec4aa27-8b48-4332-8bb0-4ea1f1a23759": [2110, 749],
      "87716611-10dc-4b2a-a20e-4e1bd311a26a": [2108, 401],
      "e0d36ea0-362a-4dae-a2e9-b983d02a298e": [2112, 239],
      "d6c30539-59d8-4669-9bef-b9ee0e2c1247": [1762, 416],
      "0340f36d-127d-4705-ab17-e27ec880058b": [1000, 395],
      "402b502c-7017-433d-a9a7-26b0c4079eb2": [884, 82],
      "d01d35f2-671f-4ec3-8de4-27445bacddac": [1273, 148],
      "f9555c2c-b5d6-460e-a18f-bf43af3da49a": [1270, 1322],
      "abf0dd3e-ee64-4f8b-bbc1-22f5daec761f": [199, 1590],
      "06f16a12-0a5c-4524-85c1-50cffb60cab8": [543, 1658],
      "1dd45b15-4327-4ef5-8303-8f8967c286e7": [904, 981],
      "4f6cfa8c-b8bb-4bbe-8353-89f25082028e": [920, 1141],
      "009fbd9c-8f05-4c36-9cf8-318f62d0002c": [790, 1848],
      "63fb8d3a-0817-4d48-ac5d-e82b458a5be4": [182, 2292],
      "d7da3335-697c-4f4b-ac8e-871ee9bcd676": [636, 2345],
    },
    connections: {
      "d96185b3-a6e3-4ab1-b9bb-2e5e5c1a80dd_1_0|2d58a0d6-d017-45ab-bd1e-8c000eb4faef_0_0":
        [
          {
            moduleKey: "d96185b3-a6e3-4ab1-b9bb-2e5e5c1a80dd",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "2d58a0d6-d017-45ab-bd1e-8c000eb4faef",
            channel: 0,
            type: 0,
          },
        ],
      "87e1fd04-a346-4a20-949e-f74987b02625_1_0|2d58a0d6-d017-45ab-bd1e-8c000eb4faef_0_0":
        [
          {
            moduleKey: "87e1fd04-a346-4a20-949e-f74987b02625",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "2d58a0d6-d017-45ab-bd1e-8c000eb4faef",
            type: 0,
            channel: 0,
          },
        ],
      "c2d8ca65-f9d8-49e7-a9ec-5fcb6b2d6cb7_1_0|2d58a0d6-d017-45ab-bd1e-8c000eb4faef_0_0":
        [
          {
            moduleKey: "c2d8ca65-f9d8-49e7-a9ec-5fcb6b2d6cb7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "2d58a0d6-d017-45ab-bd1e-8c000eb4faef",
            type: 0,
            channel: 0,
          },
        ],
      "28208a58-e4d6-4222-acc0-fd742b03ac63_1_0|6abeaed9-2d19-44fb-9e97-1678f89f24d7_0_0":
        [
          {
            moduleKey: "28208a58-e4d6-4222-acc0-fd742b03ac63",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6abeaed9-2d19-44fb-9e97-1678f89f24d7",
            type: 0,
            channel: 0,
          },
        ],
      "6abeaed9-2d19-44fb-9e97-1678f89f24d7_1_0|7a367ce9-e1b5-4fe6-9c4c-f72301179fff_0_0":
        [
          {
            moduleKey: "6abeaed9-2d19-44fb-9e97-1678f89f24d7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7a367ce9-e1b5-4fe6-9c4c-f72301179fff",
            type: 0,
            channel: 0,
          },
        ],
      "7a367ce9-e1b5-4fe6-9c4c-f72301179fff_1_0|2d58a0d6-d017-45ab-bd1e-8c000eb4faef_detune":
        [
          {
            moduleKey: "7a367ce9-e1b5-4fe6-9c4c-f72301179fff",
            channel: 0,
            type: 1,
          },
          { moduleKey: "2d58a0d6-d017-45ab-bd1e-8c000eb4faef", name: "detune" },
        ],
      "c24840fb-8883-4bea-93d3-76add0fc4b90_1_0|d6b04d65-1936-4605-af0b-80727c71a1a3_0_0":
        [
          {
            moduleKey: "c24840fb-8883-4bea-93d3-76add0fc4b90",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d6b04d65-1936-4605-af0b-80727c71a1a3",
            type: 0,
            channel: 0,
          },
        ],
      "5564a2c7-e75b-49d4-bffd-3801e873c43f_1_0|c24840fb-8883-4bea-93d3-76add0fc4b90_detune":
        [
          {
            moduleKey: "5564a2c7-e75b-49d4-bffd-3801e873c43f",
            channel: 0,
            type: 1,
          },
          { moduleKey: "c24840fb-8883-4bea-93d3-76add0fc4b90", name: "detune" },
        ],
      "998db539-3f58-4ed8-9148-e37be2eb3099_1_0|5564a2c7-e75b-49d4-bffd-3801e873c43f_0_0":
        [
          {
            moduleKey: "998db539-3f58-4ed8-9148-e37be2eb3099",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "5564a2c7-e75b-49d4-bffd-3801e873c43f",
            type: 0,
            channel: 0,
          },
        ],
      "998db539-3f58-4ed8-9148-e37be2eb3099_1_0|28208a58-e4d6-4222-acc0-fd742b03ac63_0_0":
        [
          {
            moduleKey: "998db539-3f58-4ed8-9148-e37be2eb3099",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "28208a58-e4d6-4222-acc0-fd742b03ac63",
            type: 0,
            channel: 0,
          },
        ],
      "1c4d0cf5-06f4-4af2-b530-2350149cb0ca_1_0|fec4aa27-8b48-4332-8bb0-4ea1f1a23759_0_0":
        [
          {
            moduleKey: "1c4d0cf5-06f4-4af2-b530-2350149cb0ca",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "fec4aa27-8b48-4332-8bb0-4ea1f1a23759",
            type: 0,
            channel: 0,
          },
        ],
      "87716611-10dc-4b2a-a20e-4e1bd311a26a_1_0|fec4aa27-8b48-4332-8bb0-4ea1f1a23759_0_0":
        [
          {
            moduleKey: "87716611-10dc-4b2a-a20e-4e1bd311a26a",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "fec4aa27-8b48-4332-8bb0-4ea1f1a23759",
            type: 0,
            channel: 0,
          },
        ],
      "fec4aa27-8b48-4332-8bb0-4ea1f1a23759_1_0|e0d36ea0-362a-4dae-a2e9-b983d02a298e_0_0":
        [
          {
            moduleKey: "fec4aa27-8b48-4332-8bb0-4ea1f1a23759",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "e0d36ea0-362a-4dae-a2e9-b983d02a298e",
            type: 0,
            channel: 0,
          },
        ],
      "e0d36ea0-362a-4dae-a2e9-b983d02a298e_1_0|87716611-10dc-4b2a-a20e-4e1bd311a26a_0_0":
        [
          {
            moduleKey: "e0d36ea0-362a-4dae-a2e9-b983d02a298e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "87716611-10dc-4b2a-a20e-4e1bd311a26a",
            type: 0,
            channel: 0,
          },
        ],
      "e0d36ea0-362a-4dae-a2e9-b983d02a298e_1_0|1c4d0cf5-06f4-4af2-b530-2350149cb0ca_0_0":
        [
          {
            moduleKey: "e0d36ea0-362a-4dae-a2e9-b983d02a298e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "1c4d0cf5-06f4-4af2-b530-2350149cb0ca",
            type: 0,
            channel: 0,
          },
        ],
      "fec4aa27-8b48-4332-8bb0-4ea1f1a23759_1_0|0_0_0": [
        {
          moduleKey: "fec4aa27-8b48-4332-8bb0-4ea1f1a23759",
          type: 1,
          channel: 0,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "d6c30539-59d8-4669-9bef-b9ee0e2c1247_1_0|1c4d0cf5-06f4-4af2-b530-2350149cb0ca_0_0":
        [
          {
            moduleKey: "d6c30539-59d8-4669-9bef-b9ee0e2c1247",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "1c4d0cf5-06f4-4af2-b530-2350149cb0ca",
            type: 0,
            channel: 0,
          },
        ],
      "d6c30539-59d8-4669-9bef-b9ee0e2c1247_1_0|87716611-10dc-4b2a-a20e-4e1bd311a26a_0_0":
        [
          {
            moduleKey: "d6c30539-59d8-4669-9bef-b9ee0e2c1247",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "87716611-10dc-4b2a-a20e-4e1bd311a26a",
            type: 0,
            channel: 0,
          },
        ],
      "998db539-3f58-4ed8-9148-e37be2eb3099_1_0|d6b04d65-1936-4605-af0b-80727c71a1a3_0_1":
        [
          {
            moduleKey: "998db539-3f58-4ed8-9148-e37be2eb3099",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "d6b04d65-1936-4605-af0b-80727c71a1a3",
            type: 0,
            channel: 1,
          },
        ],
      "2d58a0d6-d017-45ab-bd1e-8c000eb4faef_1_0|0340f36d-127d-4705-ab17-e27ec880058b_0_0":
        [
          {
            moduleKey: "2d58a0d6-d017-45ab-bd1e-8c000eb4faef",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "0340f36d-127d-4705-ab17-e27ec880058b",
            type: 0,
            channel: 0,
          },
        ],
      "0340f36d-127d-4705-ab17-e27ec880058b_1_0|0_0_0": [
        {
          moduleKey: "0340f36d-127d-4705-ab17-e27ec880058b",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "402b502c-7017-433d-a9a7-26b0c4079eb2_1_0|d01d35f2-671f-4ec3-8de4-27445bacddac_0_0":
        [
          {
            moduleKey: "402b502c-7017-433d-a9a7-26b0c4079eb2",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d01d35f2-671f-4ec3-8de4-27445bacddac",
            type: 0,
            channel: 0,
          },
        ],
      "d01d35f2-671f-4ec3-8de4-27445bacddac_1_0|0340f36d-127d-4705-ab17-e27ec880058b_detune":
        [
          {
            moduleKey: "d01d35f2-671f-4ec3-8de4-27445bacddac",
            channel: 0,
            type: 1,
          },
          { moduleKey: "0340f36d-127d-4705-ab17-e27ec880058b", name: "detune" },
        ],
      "0340f36d-127d-4705-ab17-e27ec880058b_1_0|d6c30539-59d8-4669-9bef-b9ee0e2c1247_0_0":
        [
          {
            moduleKey: "0340f36d-127d-4705-ab17-e27ec880058b",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d6c30539-59d8-4669-9bef-b9ee0e2c1247",
            type: 0,
            channel: 0,
          },
        ],
      "d6b04d65-1936-4605-af0b-80727c71a1a3_1_0|f9555c2c-b5d6-460e-a18f-bf43af3da49a_0_0":
        [
          {
            moduleKey: "d6b04d65-1936-4605-af0b-80727c71a1a3",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "f9555c2c-b5d6-460e-a18f-bf43af3da49a",
            type: 0,
            channel: 0,
          },
        ],
      "f9555c2c-b5d6-460e-a18f-bf43af3da49a_1_0|0_0_0": [
        {
          moduleKey: "f9555c2c-b5d6-460e-a18f-bf43af3da49a",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "5564a2c7-e75b-49d4-bffd-3801e873c43f_1_0|abf0dd3e-ee64-4f8b-bbc1-22f5daec761f_detune":
        [
          {
            moduleKey: "5564a2c7-e75b-49d4-bffd-3801e873c43f",
            type: 1,
            channel: 0,
          },
          { moduleKey: "abf0dd3e-ee64-4f8b-bbc1-22f5daec761f", name: "detune" },
        ],
      "abf0dd3e-ee64-4f8b-bbc1-22f5daec761f_1_0|06f16a12-0a5c-4524-85c1-50cffb60cab8_0_0":
        [
          {
            moduleKey: "abf0dd3e-ee64-4f8b-bbc1-22f5daec761f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "06f16a12-0a5c-4524-85c1-50cffb60cab8",
            type: 0,
            channel: 0,
          },
        ],
      "06f16a12-0a5c-4524-85c1-50cffb60cab8_1_0|d6b04d65-1936-4605-af0b-80727c71a1a3_0_0":
        [
          {
            moduleKey: "06f16a12-0a5c-4524-85c1-50cffb60cab8",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d6b04d65-1936-4605-af0b-80727c71a1a3",
            type: 0,
            channel: 0,
          },
        ],
      "1dd45b15-4327-4ef5-8303-8f8967c286e7_1_0|4f6cfa8c-b8bb-4bbe-8353-89f25082028e_0_0":
        [
          {
            moduleKey: "1dd45b15-4327-4ef5-8303-8f8967c286e7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "4f6cfa8c-b8bb-4bbe-8353-89f25082028e",
            type: 0,
            channel: 0,
          },
        ],
      "4f6cfa8c-b8bb-4bbe-8353-89f25082028e_1_0|d6b04d65-1936-4605-af0b-80727c71a1a3_0_0":
        [
          {
            moduleKey: "4f6cfa8c-b8bb-4bbe-8353-89f25082028e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d6b04d65-1936-4605-af0b-80727c71a1a3",
            type: 0,
            channel: 0,
          },
        ],
      "998db539-3f58-4ed8-9148-e37be2eb3099_1_0|009fbd9c-8f05-4c36-9cf8-318f62d0002c_0_0":
        [
          {
            moduleKey: "998db539-3f58-4ed8-9148-e37be2eb3099",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "009fbd9c-8f05-4c36-9cf8-318f62d0002c",
            channel: 0,
            type: 0,
          },
        ],
      "009fbd9c-8f05-4c36-9cf8-318f62d0002c_1_0|4f6cfa8c-b8bb-4bbe-8353-89f25082028e_gain":
        [
          {
            moduleKey: "009fbd9c-8f05-4c36-9cf8-318f62d0002c",
            channel: 0,
            type: 1,
          },
          { moduleKey: "4f6cfa8c-b8bb-4bbe-8353-89f25082028e", name: "gain" },
        ],
      "63fb8d3a-0817-4d48-ac5d-e82b458a5be4_1_0|d7da3335-697c-4f4b-ac8e-871ee9bcd676_0_0":
        [
          {
            moduleKey: "63fb8d3a-0817-4d48-ac5d-e82b458a5be4",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d7da3335-697c-4f4b-ac8e-871ee9bcd676",
            type: 0,
            channel: 0,
          },
        ],
      "d7da3335-697c-4f4b-ac8e-871ee9bcd676_1_0|009fbd9c-8f05-4c36-9cf8-318f62d0002c_peak":
        [
          {
            moduleKey: "d7da3335-697c-4f4b-ac8e-871ee9bcd676",
            channel: 0,
            type: 1,
          },
          { moduleKey: "009fbd9c-8f05-4c36-9cf8-318f62d0002c", name: "peak" },
        ],
    },
  },
};

const sss3 = {
  id: "9d274f44-8d2b-4aff-befb-e7c54bd61103",
  name: "square-spotty-story",
  slug: "square-spotty-story-9d274f44",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.45 },
      },
      "378ec741-1159-48d9-9433-58b7e5a700e9": {
        name: "average-inconclusive-clock",
        moduleKey: "378ec741-1159-48d9-9433-58b7e5a700e9",
        type: "CLOCK",
        state: { tempo: 120 },
      },
      "0c3f93f2-843b-4090-a418-14b559a37eb7": {
        name: "spicy-imported-sequencer",
        moduleKey: "0c3f93f2-843b-4090-a418-14b559a37eb7",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: 900,
          step1: 1100,
          step2: 700,
          step3: 0,
          step4: 900,
          step5: 800,
          step6: 700,
          step7: 440,
        },
      },
      "7a41ad7b-f428-42c3-962d-7530fc8f7ee5": {
        name: "rural-snotty-oscillator",
        moduleKey: "7a41ad7b-f428-42c3-962d-7530fc8f7ee5",
        type: "OSCILLATOR",
        state: { frequency: 0, detune: 0, waveform: "sine" },
      },
      "fd150261-4967-44a7-8de5-b5b38eb5fc7f": {
        name: "cold-quaint-vca",
        moduleKey: "fd150261-4967-44a7-8de5-b5b38eb5fc7f",
        type: "VCA",
        state: {
          gate: 0.1,
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 0,
        },
      },
      "58e436ac-d0c0-46bf-8980-7f983dc4d43f": {
        name: "boorish-unsuitable-sequencer",
        moduleKey: "58e436ac-d0c0-46bf-8980-7f983dc4d43f",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 4,
          step1: 4,
          step2: 4,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "3118f3b1-e57c-4986-a41a-a5c5b783afc2": {
        name: "driven-broad-filter",
        moduleKey: "3118f3b1-e57c-4986-a41a-a5c5b783afc2",
        type: "FILTER",
        state: { frequency: 1000, detune: 0, Q: 0.1, gain: 0, type: "lowpass" },
      },
      "0cbb0165-653e-40a4-85ff-ba4c143c7dfc": {
        name: "nutritious-amiable-sequencer",
        moduleKey: "0cbb0165-653e-40a4-85ff-ba4c143c7dfc",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 800,
          step1: 1000,
          step2: 300,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "f7e6c863-ea66-4922-9fa7-9f7abdd0b238": {
        name: "peachy-quixotic-clock",
        moduleKey: "f7e6c863-ea66-4922-9fa7-9f7abdd0b238",
        type: "CLOCK",
        state: { tempo: 480 },
      },
      "33db2408-eca3-4e49-9915-4d4a2be455f0": {
        name: "human-longing-clock",
        moduleKey: "33db2408-eca3-4e49-9915-4d4a2be455f0",
        type: "CLOCK",
        state: { tempo: 240 },
      },
      "cfd0d83d-6bfc-48f1-a1c0-daea3e3bc857": {
        name: "testy-vigorous-oscillator",
        moduleKey: "cfd0d83d-6bfc-48f1-a1c0-daea3e3bc857",
        type: "OSCILLATOR",
        state: { frequency: 55, detune: 0, waveform: "square" },
      },
      "1594a01e-1fbd-485b-9e8f-a430f5379b10": {
        name: "lewd-tall-envelope",
        moduleKey: "1594a01e-1fbd-485b-9e8f-a430f5379b10",
        type: "ENVELOPE",
        state: {
          gate: 0.01,
          attack: 0.01,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 2400,
        },
      },
      "abb2d26e-6519-4d45-b9cd-044f28a51403": {
        name: "flaky-reminiscent-vca",
        moduleKey: "abb2d26e-6519-4d45-b9cd-044f28a51403",
        type: "VCA",
        state: {
          gate: 0.25,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 4,
        },
      },
      "004fa668-3396-4448-8a4c-c0a5a71bed96": {
        name: "humdrum-redundant-midi_trigger",
        moduleKey: "004fa668-3396-4448-8a4c-c0a5a71bed96",
        type: "MIDI_TRIGGER",
        state: { input: "IAC Driver Bus 1", note: "all" },
      },
    },
    modulePositions: {
      "0": [1970, 222],
      "378ec741-1159-48d9-9433-58b7e5a700e9": [29, 525],
      "0c3f93f2-843b-4090-a418-14b559a37eb7": [551, 98],
      "7a41ad7b-f428-42c3-962d-7530fc8f7ee5": [950, 156],
      "fd150261-4967-44a7-8de5-b5b38eb5fc7f": [1300, 369],
      "58e436ac-d0c0-46bf-8980-7f983dc4d43f": [540, 534.6666679382324],
      "3118f3b1-e57c-4986-a41a-a5c5b783afc2": [1656, 474.33333587646484],
      "0cbb0165-653e-40a4-85ff-ba4c143c7dfc": [547, 871.3333358764648],
      "f7e6c863-ea66-4922-9fa7-9f7abdd0b238": [921, 394.33333587646484],
      "33db2408-eca3-4e49-9915-4d4a2be455f0": [114, 131],
      "cfd0d83d-6bfc-48f1-a1c0-daea3e3bc857": [549, 1232],
      "1594a01e-1fbd-485b-9e8f-a430f5379b10": [158, 1225.6666564941406],
      "abb2d26e-6519-4d45-b9cd-044f28a51403": [984, 1193.6666564941406],
      "004fa668-3396-4448-8a4c-c0a5a71bed96": [1536, 1110],
    },
    connections: {
      "378ec741-1159-48d9-9433-58b7e5a700e9_1_0|0c3f93f2-843b-4090-a418-14b559a37eb7_0_0":
        [
          {
            moduleKey: "378ec741-1159-48d9-9433-58b7e5a700e9",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "0c3f93f2-843b-4090-a418-14b559a37eb7",
            type: 0,
            channel: 0,
          },
        ],
      "0c3f93f2-843b-4090-a418-14b559a37eb7_1_0|7a41ad7b-f428-42c3-962d-7530fc8f7ee5_frequency":
        [
          {
            moduleKey: "0c3f93f2-843b-4090-a418-14b559a37eb7",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "7a41ad7b-f428-42c3-962d-7530fc8f7ee5",
            name: "frequency",
          },
        ],
      "7a41ad7b-f428-42c3-962d-7530fc8f7ee5_1_0|fd150261-4967-44a7-8de5-b5b38eb5fc7f_0_0":
        [
          {
            moduleKey: "7a41ad7b-f428-42c3-962d-7530fc8f7ee5",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "fd150261-4967-44a7-8de5-b5b38eb5fc7f",
            type: 0,
            channel: 0,
          },
        ],
      "58e436ac-d0c0-46bf-8980-7f983dc4d43f_1_0|fd150261-4967-44a7-8de5-b5b38eb5fc7f_peak":
        [
          {
            moduleKey: "58e436ac-d0c0-46bf-8980-7f983dc4d43f",
            type: 1,
            channel: 0,
          },
          { moduleKey: "fd150261-4967-44a7-8de5-b5b38eb5fc7f", name: "peak" },
        ],
      "fd150261-4967-44a7-8de5-b5b38eb5fc7f_1_0|3118f3b1-e57c-4986-a41a-a5c5b783afc2_0_0":
        [
          {
            moduleKey: "fd150261-4967-44a7-8de5-b5b38eb5fc7f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "3118f3b1-e57c-4986-a41a-a5c5b783afc2",
            type: 0,
            channel: 0,
          },
        ],
      "3118f3b1-e57c-4986-a41a-a5c5b783afc2_1_0|0_0_0": [
        {
          moduleKey: "3118f3b1-e57c-4986-a41a-a5c5b783afc2",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "0cbb0165-653e-40a4-85ff-ba4c143c7dfc_1_0|3118f3b1-e57c-4986-a41a-a5c5b783afc2_frequency":
        [
          {
            moduleKey: "0cbb0165-653e-40a4-85ff-ba4c143c7dfc",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "3118f3b1-e57c-4986-a41a-a5c5b783afc2",
            name: "frequency",
          },
        ],
      "378ec741-1159-48d9-9433-58b7e5a700e9_1_0|0cbb0165-653e-40a4-85ff-ba4c143c7dfc_0_0":
        [
          {
            moduleKey: "378ec741-1159-48d9-9433-58b7e5a700e9",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "0cbb0165-653e-40a4-85ff-ba4c143c7dfc",
            type: 0,
            channel: 0,
          },
        ],
      "f7e6c863-ea66-4922-9fa7-9f7abdd0b238_1_0|fd150261-4967-44a7-8de5-b5b38eb5fc7f_0_1":
        [
          {
            moduleKey: "f7e6c863-ea66-4922-9fa7-9f7abdd0b238",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "fd150261-4967-44a7-8de5-b5b38eb5fc7f",
            type: 0,
            channel: 1,
          },
        ],
      "378ec741-1159-48d9-9433-58b7e5a700e9_1_0|58e436ac-d0c0-46bf-8980-7f983dc4d43f_0_0":
        [
          {
            moduleKey: "378ec741-1159-48d9-9433-58b7e5a700e9",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "58e436ac-d0c0-46bf-8980-7f983dc4d43f",
            type: 0,
            channel: 0,
          },
        ],
      "378ec741-1159-48d9-9433-58b7e5a700e9_1_0|f7e6c863-ea66-4922-9fa7-9f7abdd0b238_0_0":
        [
          {
            moduleKey: "378ec741-1159-48d9-9433-58b7e5a700e9",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "f7e6c863-ea66-4922-9fa7-9f7abdd0b238",
            type: 0,
            channel: 0,
          },
        ],
      "378ec741-1159-48d9-9433-58b7e5a700e9_1_0|33db2408-eca3-4e49-9915-4d4a2be455f0_0_0":
        [
          {
            moduleKey: "378ec741-1159-48d9-9433-58b7e5a700e9",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "33db2408-eca3-4e49-9915-4d4a2be455f0",
            type: 0,
            channel: 0,
          },
        ],
      "33db2408-eca3-4e49-9915-4d4a2be455f0_1_0|0c3f93f2-843b-4090-a418-14b559a37eb7_0_0":
        [
          {
            moduleKey: "33db2408-eca3-4e49-9915-4d4a2be455f0",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "0c3f93f2-843b-4090-a418-14b559a37eb7",
            type: 0,
            channel: 0,
          },
        ],
      "378ec741-1159-48d9-9433-58b7e5a700e9_1_0|1594a01e-1fbd-485b-9e8f-a430f5379b10_0_0":
        [
          {
            moduleKey: "378ec741-1159-48d9-9433-58b7e5a700e9",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "1594a01e-1fbd-485b-9e8f-a430f5379b10",
            type: 0,
            channel: 0,
          },
        ],
      "1594a01e-1fbd-485b-9e8f-a430f5379b10_1_0|cfd0d83d-6bfc-48f1-a1c0-daea3e3bc857_detune":
        [
          {
            moduleKey: "1594a01e-1fbd-485b-9e8f-a430f5379b10",
            channel: 0,
            type: 1,
          },
          { moduleKey: "cfd0d83d-6bfc-48f1-a1c0-daea3e3bc857", name: "detune" },
        ],
      "378ec741-1159-48d9-9433-58b7e5a700e9_1_0|abb2d26e-6519-4d45-b9cd-044f28a51403_0_1":
        [
          {
            moduleKey: "378ec741-1159-48d9-9433-58b7e5a700e9",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "abb2d26e-6519-4d45-b9cd-044f28a51403",
            type: 0,
            channel: 1,
          },
        ],
      "cfd0d83d-6bfc-48f1-a1c0-daea3e3bc857_1_0|abb2d26e-6519-4d45-b9cd-044f28a51403_0_0":
        [
          {
            moduleKey: "cfd0d83d-6bfc-48f1-a1c0-daea3e3bc857",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "abb2d26e-6519-4d45-b9cd-044f28a51403",
            type: 0,
            channel: 0,
          },
        ],
      "abb2d26e-6519-4d45-b9cd-044f28a51403_1_0|3118f3b1-e57c-4986-a41a-a5c5b783afc2_0_0":
        [
          {
            moduleKey: "abb2d26e-6519-4d45-b9cd-044f28a51403",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "3118f3b1-e57c-4986-a41a-a5c5b783afc2",
            type: 0,
            channel: 0,
          },
        ],
    },
  },
};

const ggg2 = {
  id: "b399be52-af0c-4ce8-a9ed-a27038ded87d",
  name: "glorious-gnarly-geese",
  slug: "glorious-gnarly-geese-b399be52",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.45 },
      },
      "47222bd0-32f3-4c8e-992a-b445994d5814": {
        name: "phobic-chic-oscillator",
        moduleKey: "47222bd0-32f3-4c8e-992a-b445994d5814",
        type: "OSCILLATOR",
        state: { frequency: 110, detune: 0, waveform: "sawtooth" },
      },
      "6a2b9aa4-7d17-4ffd-9c18-ac035a1cd194": {
        name: "humble-big-sequencer",
        moduleKey: "6a2b9aa4-7d17-4ffd-9c18-ac035a1cd194",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: -1200,
          step1: -700,
          step2: 500,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "753c65ce-d44a-40bd-9cfc-6901700a93fc": {
        name: "outrageous-shallow-vca",
        moduleKey: "753c65ce-d44a-40bd-9cfc-6901700a93fc",
        type: "VCA",
        state: {
          gate: 0.25,
          attack: 0.01,
          decay: 0,
          sustain: 1,
          release: 0.4,
          peak: 0.6,
        },
      },
      "6545772f-d218-4c09-a984-c7e96867720b": {
        name: "picayune-united-clock",
        moduleKey: "6545772f-d218-4c09-a984-c7e96867720b",
        type: "CLOCK",
        state: { tempo: 30 },
      },
      "b640cf15-f741-46aa-91b0-d9da14ac59b1": {
        name: "subsequent-panoramic-clock",
        moduleKey: "b640cf15-f741-46aa-91b0-d9da14ac59b1",
        type: "CLOCK",
        state: { tempo: 240 },
      },
      "af864e6b-f35a-41bb-8e39-fc3a612c7d04": {
        name: "fiery-innate-sequencer",
        moduleKey: "af864e6b-f35a-41bb-8e39-fc3a612c7d04",
        type: "SEQUENCER",
        state: {
          steps: 6,
          step0: 300,
          step1: 200,
          step2: 500,
          step3: -700,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "1d1d2ab9-fbab-4200-9b09-249d4846df23": {
        name: "divine-imperfect-oscillator",
        moduleKey: "1d1d2ab9-fbab-4200-9b09-249d4846df23",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: -3, waveform: "triangle" },
      },
      "3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f": {
        name: "selfish-tops-vca",
        moduleKey: "3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f",
        type: "VCA",
        state: {
          gate: 0.5,
          attack: 0.025,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 0.2,
        },
      },
      "d241f967-4ab3-4448-ad2b-a6a3f4d4f3c3": {
        name: "unruly-hurried-filter",
        moduleKey: "d241f967-4ab3-4448-ad2b-a6a3f4d4f3c3",
        type: "FILTER",
        state: { frequency: 350, detune: 0, Q: 8, gain: 0, type: "lowpass" },
      },
      "69f97c9d-d645-4daa-91cf-7693a51ab04d": {
        name: "faithful-spiffy-envelope",
        moduleKey: "69f97c9d-d645-4daa-91cf-7693a51ab04d",
        type: "ENVELOPE",
        state: {
          gate: 0.125,
          attack: 0.0125,
          decay: 0,
          sustain: 1,
          release: 0.6,
          peak: 1200,
        },
      },
      "853a30de-6322-408c-aef4-054edee7cb82": {
        name: "resonant-silky-delay",
        moduleKey: "853a30de-6322-408c-aef4-054edee7cb82",
        type: "DELAY",
        state: { delayTime: 0.75 },
      },
      "675ec66b-8583-4b0b-bf26-94de62a05e29": {
        name: "snazzy-uttermost-delay",
        moduleKey: "675ec66b-8583-4b0b-bf26-94de62a05e29",
        type: "DELAY",
        state: { delayTime: 0.64 },
      },
      "99172fcb-26d7-4a3b-8acb-ee17db9ecdf6": {
        name: "cooing-saucy-gate",
        moduleKey: "99172fcb-26d7-4a3b-8acb-ee17db9ecdf6",
        type: "GATE",
        state: { gate: 0.5 },
      },
      "cdabbe23-d202-40d4-ac75-d14b4cd708ed": {
        name: "finicky-present-gain",
        moduleKey: "cdabbe23-d202-40d4-ac75-d14b4cd708ed",
        type: "GAIN",
        state: { gain: -700 },
      },
      "5aa2168a-a87b-4775-8b15-c123f33394b4": {
        name: "ardent-alert-filter",
        moduleKey: "5aa2168a-a87b-4775-8b15-c123f33394b4",
        type: "FILTER",
        state: { frequency: 10, detune: 0, Q: 1, gain: 0, type: "lowpass" },
      },
      "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def": {
        name: "petite-pale-gain",
        moduleKey: "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def",
        type: "GAIN",
        state: { gain: 0.3 },
      },
      "14df67b3-7b5d-47c7-847b-20d639889b3b": {
        name: "casual-adept-gain",
        moduleKey: "14df67b3-7b5d-47c7-847b-20d639889b3b",
        type: "GAIN",
        state: { gain: 1 },
      },
      "ba1046ef-1968-4532-80e9-1dbf0b6f479f": {
        name: "talented-snotty-gain",
        moduleKey: "ba1046ef-1968-4532-80e9-1dbf0b6f479f",
        type: "GAIN",
        state: { gain: 1 },
      },
      "334d2b10-c9e9-40f3-aa2c-7ce90d3216a7": {
        name: "super-busy-gain",
        moduleKey: "334d2b10-c9e9-40f3-aa2c-7ce90d3216a7",
        type: "GAIN",
        state: { gain: 1 },
      },
      "f8a2b559-5f3c-4182-b7ff-4fce08036d57": {
        name: "gruesome-dreamy-limiter",
        moduleKey: "f8a2b559-5f3c-4182-b7ff-4fce08036d57",
        type: "LIMITER",
        state: {},
      },
      "cc50151f-18a6-459d-bb3e-b49725ac1055": {
        name: "gusty-jazzy-oscillator",
        moduleKey: "cc50151f-18a6-459d-bb3e-b49725ac1055",
        type: "OSCILLATOR",
        state: { frequency: 220, detune: -5, waveform: "sawtooth" },
      },
      "6ac729ee-77b4-4fbc-a83f-80ea07d10785": {
        name: "vivacious-meek-oscillator",
        moduleKey: "6ac729ee-77b4-4fbc-a83f-80ea07d10785",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: 4, waveform: "sawtooth" },
      },
      "99b401ab-45be-4063-beb3-8968034a634b": {
        name: "honest-rugged-filter",
        moduleKey: "99b401ab-45be-4063-beb3-8968034a634b",
        type: "FILTER",
        state: { frequency: 350, detune: 0, Q: 0, gain: 0, type: "highpass" },
      },
      "ac131c63-f173-4db4-8778-c1667faa3e4a": {
        name: "fretful-skillful-filter",
        moduleKey: "ac131c63-f173-4db4-8778-c1667faa3e4a",
        type: "FILTER",
        state: { frequency: 1400, detune: 0, Q: 1, gain: 0, type: "lowpass" },
      },
      "8e2132d1-4c28-4b4a-937e-5e31920b8ca9": {
        name: "obsolete-royal-gain",
        moduleKey: "8e2132d1-4c28-4b4a-937e-5e31920b8ca9",
        type: "GAIN",
        state: { gain: 1200 },
      },
      "2d3cb8dc-5407-4739-b6b5-724819fd6f73": {
        name: "calm-macabre-delay",
        moduleKey: "2d3cb8dc-5407-4739-b6b5-724819fd6f73",
        type: "DELAY",
        state: { delayTime: 0.0000011 },
      },
      "dd529a9d-0e86-4afe-9919-94517314c78e": {
        name: "soggy-amused-oscillator",
        moduleKey: "dd529a9d-0e86-4afe-9919-94517314c78e",
        type: "OSCILLATOR",
        state: { frequency: 0, detune: 0, waveform: "sine" },
      },
      "19d16360-9b0d-48a8-9ae1-9560603d0bab": {
        name: "permissible-boss-sequencer",
        moduleKey: "19d16360-9b0d-48a8-9ae1-9560603d0bab",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 12.8,
          step1: 6.4,
          step2: 3.2,
          step3: 1.6,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "4b55e8e5-bdd7-490f-8583-231999ca74cd": {
        name: "simple-unequal-gain",
        moduleKey: "4b55e8e5-bdd7-490f-8583-231999ca74cd",
        type: "GAIN",
        state: { gain: 1 },
      },
      "48dbe866-ecd8-49fb-bcb3-0b2140448850": {
        name: "outstanding-mute-oscillator",
        moduleKey: "48dbe866-ecd8-49fb-bcb3-0b2140448850",
        type: "OSCILLATOR",
        state: { frequency: 12, detune: 0, waveform: "sine" },
      },
    },
    modulePositions: {
      "0": [4255, 1094],
      "47222bd0-32f3-4c8e-992a-b445994d5814": [1366, 1044],
      "6a2b9aa4-7d17-4ffd-9c18-ac035a1cd194": [930, 1303],
      "753c65ce-d44a-40bd-9cfc-6901700a93fc": [1711, 1225],
      "6545772f-d218-4c09-a984-c7e96867720b": [609, 1092],
      "b640cf15-f741-46aa-91b0-d9da14ac59b1": [846, 454],
      "af864e6b-f35a-41bb-8e39-fc3a612c7d04": [1197, 600],
      "1d1d2ab9-fbab-4200-9b09-249d4846df23": [1411, 292],
      "3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f": [1765, 515],
      "d241f967-4ab3-4448-ad2b-a6a3f4d4f3c3": [2066, 1217],
      "69f97c9d-d645-4daa-91cf-7693a51ab04d": [1690, 1593],
      "853a30de-6322-408c-aef4-054edee7cb82": [980, 1111],
      "675ec66b-8583-4b0b-bf26-94de62a05e29": [1004, 186],
      "99172fcb-26d7-4a3b-8acb-ee17db9ecdf6": [612, 1600],
      "cdabbe23-d202-40d4-ac75-d14b4cd708ed": [963, 1631],
      "5aa2168a-a87b-4775-8b15-c123f33394b4": [1318, 1687],
      "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def": [3131, 1029],
      "14df67b3-7b5d-47c7-847b-20d639889b3b": [3578, 879],
      "ba1046ef-1968-4532-80e9-1dbf0b6f479f": [3578, 1045],
      "334d2b10-c9e9-40f3-aa2c-7ce90d3216a7": [3576, 1211],
      "f8a2b559-5f3c-4182-b7ff-4fce08036d57": [4000, 1020],
      "cc50151f-18a6-459d-bb3e-b49725ac1055": [1313, 1323],
      "6ac729ee-77b4-4fbc-a83f-80ea07d10785": [1420, 40],
      "99b401ab-45be-4063-beb3-8968034a634b": [2194, 598],
      "ac131c63-f173-4db4-8778-c1667faa3e4a": [2791, 634],
      "8e2132d1-4c28-4b4a-937e-5e31920b8ca9": [2698, 373],
      "2d3cb8dc-5407-4739-b6b5-724819fd6f73": [2701, 212],
      "dd529a9d-0e86-4afe-9919-94517314c78e": [2351, 181],
      "19d16360-9b0d-48a8-9ae1-9560603d0bab": [1979, 71],
      "4b55e8e5-bdd7-490f-8583-231999ca74cd": [3155, 468],
      "48dbe866-ecd8-49fb-bcb3-0b2140448850": [3160, 208],
    },
    connections: {
      "47222bd0-32f3-4c8e-992a-b445994d5814_1_0|753c65ce-d44a-40bd-9cfc-6901700a93fc_0_0":
        [
          {
            moduleKey: "47222bd0-32f3-4c8e-992a-b445994d5814",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "753c65ce-d44a-40bd-9cfc-6901700a93fc",
            channel: 0,
            type: 0,
          },
        ],
      "6a2b9aa4-7d17-4ffd-9c18-ac035a1cd194_1_0|47222bd0-32f3-4c8e-992a-b445994d5814_detune":
        [
          {
            moduleKey: "6a2b9aa4-7d17-4ffd-9c18-ac035a1cd194",
            channel: 0,
            type: 1,
          },
          { moduleKey: "47222bd0-32f3-4c8e-992a-b445994d5814", name: "detune" },
        ],
      "6545772f-d218-4c09-a984-c7e96867720b_1_0|6a2b9aa4-7d17-4ffd-9c18-ac035a1cd194_0_0":
        [
          {
            moduleKey: "6545772f-d218-4c09-a984-c7e96867720b",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6a2b9aa4-7d17-4ffd-9c18-ac035a1cd194",
            channel: 0,
            type: 0,
          },
        ],
      "6545772f-d218-4c09-a984-c7e96867720b_1_0|753c65ce-d44a-40bd-9cfc-6901700a93fc_0_1":
        [
          {
            moduleKey: "6545772f-d218-4c09-a984-c7e96867720b",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "753c65ce-d44a-40bd-9cfc-6901700a93fc",
            channel: 1,
            type: 0,
          },
        ],
      "6545772f-d218-4c09-a984-c7e96867720b_1_0|b640cf15-f741-46aa-91b0-d9da14ac59b1_0_0":
        [
          {
            moduleKey: "6545772f-d218-4c09-a984-c7e96867720b",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b640cf15-f741-46aa-91b0-d9da14ac59b1",
            channel: 0,
            type: 0,
          },
        ],
      "b640cf15-f741-46aa-91b0-d9da14ac59b1_1_0|af864e6b-f35a-41bb-8e39-fc3a612c7d04_0_0":
        [
          {
            moduleKey: "b640cf15-f741-46aa-91b0-d9da14ac59b1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "af864e6b-f35a-41bb-8e39-fc3a612c7d04",
            channel: 0,
            type: 0,
          },
        ],
      "af864e6b-f35a-41bb-8e39-fc3a612c7d04_1_0|1d1d2ab9-fbab-4200-9b09-249d4846df23_detune":
        [
          {
            moduleKey: "af864e6b-f35a-41bb-8e39-fc3a612c7d04",
            channel: 0,
            type: 1,
          },
          { moduleKey: "1d1d2ab9-fbab-4200-9b09-249d4846df23", name: "detune" },
        ],
      "1d1d2ab9-fbab-4200-9b09-249d4846df23_1_0|3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f_0_0":
        [
          {
            moduleKey: "1d1d2ab9-fbab-4200-9b09-249d4846df23",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f",
            channel: 0,
            type: 0,
          },
        ],
      "b640cf15-f741-46aa-91b0-d9da14ac59b1_1_0|3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f_0_1":
        [
          {
            moduleKey: "b640cf15-f741-46aa-91b0-d9da14ac59b1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f",
            channel: 1,
            type: 0,
          },
        ],
      "753c65ce-d44a-40bd-9cfc-6901700a93fc_1_0|d241f967-4ab3-4448-ad2b-a6a3f4d4f3c3_0_0":
        [
          {
            moduleKey: "753c65ce-d44a-40bd-9cfc-6901700a93fc",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d241f967-4ab3-4448-ad2b-a6a3f4d4f3c3",
            channel: 0,
            type: 0,
          },
        ],
      "6545772f-d218-4c09-a984-c7e96867720b_1_0|69f97c9d-d645-4daa-91cf-7693a51ab04d_0_0":
        [
          {
            moduleKey: "6545772f-d218-4c09-a984-c7e96867720b",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "69f97c9d-d645-4daa-91cf-7693a51ab04d",
            channel: 0,
            type: 0,
          },
        ],
      "69f97c9d-d645-4daa-91cf-7693a51ab04d_1_0|d241f967-4ab3-4448-ad2b-a6a3f4d4f3c3_detune":
        [
          {
            moduleKey: "69f97c9d-d645-4daa-91cf-7693a51ab04d",
            channel: 0,
            type: 1,
          },
          { moduleKey: "d241f967-4ab3-4448-ad2b-a6a3f4d4f3c3", name: "detune" },
        ],
      "6545772f-d218-4c09-a984-c7e96867720b_1_0|853a30de-6322-408c-aef4-054edee7cb82_0_0":
        [
          {
            moduleKey: "6545772f-d218-4c09-a984-c7e96867720b",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "853a30de-6322-408c-aef4-054edee7cb82",
            channel: 0,
            type: 0,
          },
        ],
      "853a30de-6322-408c-aef4-054edee7cb82_1_0|6a2b9aa4-7d17-4ffd-9c18-ac035a1cd194_0_0":
        [
          {
            moduleKey: "853a30de-6322-408c-aef4-054edee7cb82",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6a2b9aa4-7d17-4ffd-9c18-ac035a1cd194",
            channel: 0,
            type: 0,
          },
        ],
      "853a30de-6322-408c-aef4-054edee7cb82_1_0|47222bd0-32f3-4c8e-992a-b445994d5814_detune":
        [
          {
            moduleKey: "853a30de-6322-408c-aef4-054edee7cb82",
            channel: 0,
            type: 1,
          },
          { moduleKey: "47222bd0-32f3-4c8e-992a-b445994d5814", name: "detune" },
        ],
      "853a30de-6322-408c-aef4-054edee7cb82_1_0|753c65ce-d44a-40bd-9cfc-6901700a93fc_0_1":
        [
          {
            moduleKey: "853a30de-6322-408c-aef4-054edee7cb82",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "753c65ce-d44a-40bd-9cfc-6901700a93fc",
            channel: 1,
            type: 0,
          },
        ],
      "853a30de-6322-408c-aef4-054edee7cb82_1_0|69f97c9d-d645-4daa-91cf-7693a51ab04d_0_0":
        [
          {
            moduleKey: "853a30de-6322-408c-aef4-054edee7cb82",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "69f97c9d-d645-4daa-91cf-7693a51ab04d",
            channel: 0,
            type: 0,
          },
        ],
      "b640cf15-f741-46aa-91b0-d9da14ac59b1_1_0|675ec66b-8583-4b0b-bf26-94de62a05e29_0_0":
        [
          {
            moduleKey: "b640cf15-f741-46aa-91b0-d9da14ac59b1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "675ec66b-8583-4b0b-bf26-94de62a05e29",
            channel: 0,
            type: 0,
          },
        ],
      "675ec66b-8583-4b0b-bf26-94de62a05e29_1_0|af864e6b-f35a-41bb-8e39-fc3a612c7d04_0_0":
        [
          {
            moduleKey: "675ec66b-8583-4b0b-bf26-94de62a05e29",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "af864e6b-f35a-41bb-8e39-fc3a612c7d04",
            channel: 0,
            type: 0,
          },
        ],
      "675ec66b-8583-4b0b-bf26-94de62a05e29_1_0|3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f_0_1":
        [
          {
            moduleKey: "675ec66b-8583-4b0b-bf26-94de62a05e29",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f",
            channel: 1,
            type: 0,
          },
        ],
      "99172fcb-26d7-4a3b-8acb-ee17db9ecdf6_1_0|cdabbe23-d202-40d4-ac75-d14b4cd708ed_0_0":
        [
          {
            moduleKey: "99172fcb-26d7-4a3b-8acb-ee17db9ecdf6",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "cdabbe23-d202-40d4-ac75-d14b4cd708ed",
            channel: 0,
            type: 0,
          },
        ],
      "6545772f-d218-4c09-a984-c7e96867720b_1_0|99172fcb-26d7-4a3b-8acb-ee17db9ecdf6_0_0":
        [
          {
            moduleKey: "6545772f-d218-4c09-a984-c7e96867720b",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "99172fcb-26d7-4a3b-8acb-ee17db9ecdf6",
            channel: 0,
            type: 0,
          },
        ],
      "cdabbe23-d202-40d4-ac75-d14b4cd708ed_1_0|5aa2168a-a87b-4775-8b15-c123f33394b4_0_0":
        [
          {
            moduleKey: "cdabbe23-d202-40d4-ac75-d14b4cd708ed",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "5aa2168a-a87b-4775-8b15-c123f33394b4",
            channel: 0,
            type: 0,
          },
        ],
      "5aa2168a-a87b-4775-8b15-c123f33394b4_1_0|47222bd0-32f3-4c8e-992a-b445994d5814_detune":
        [
          {
            moduleKey: "5aa2168a-a87b-4775-8b15-c123f33394b4",
            channel: 0,
            type: 1,
          },
          { moduleKey: "47222bd0-32f3-4c8e-992a-b445994d5814", name: "detune" },
        ],
      "ba1046ef-1968-4532-80e9-1dbf0b6f479f_1_0|f8a2b559-5f3c-4182-b7ff-4fce08036d57_0_0":
        [
          {
            moduleKey: "ba1046ef-1968-4532-80e9-1dbf0b6f479f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "f8a2b559-5f3c-4182-b7ff-4fce08036d57",
            channel: 0,
            type: 0,
          },
        ],
      "334d2b10-c9e9-40f3-aa2c-7ce90d3216a7_1_0|f8a2b559-5f3c-4182-b7ff-4fce08036d57_0_0":
        [
          {
            moduleKey: "334d2b10-c9e9-40f3-aa2c-7ce90d3216a7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "f8a2b559-5f3c-4182-b7ff-4fce08036d57",
            channel: 0,
            type: 0,
          },
        ],
      "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def_1_0|14df67b3-7b5d-47c7-847b-20d639889b3b_0_0":
        [
          {
            moduleKey: "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "14df67b3-7b5d-47c7-847b-20d639889b3b",
            channel: 0,
            type: 0,
          },
        ],
      "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def_1_0|14df67b3-7b5d-47c7-847b-20d639889b3b_gain":
        [
          {
            moduleKey: "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def",
            channel: 0,
            type: 1,
          },
          { moduleKey: "14df67b3-7b5d-47c7-847b-20d639889b3b", name: "gain" },
        ],
      "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def_1_0|ba1046ef-1968-4532-80e9-1dbf0b6f479f_0_0":
        [
          {
            moduleKey: "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "ba1046ef-1968-4532-80e9-1dbf0b6f479f",
            channel: 0,
            type: 0,
          },
        ],
      "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def_1_0|ba1046ef-1968-4532-80e9-1dbf0b6f479f_gain":
        [
          {
            moduleKey: "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def",
            channel: 0,
            type: 1,
          },
          { moduleKey: "ba1046ef-1968-4532-80e9-1dbf0b6f479f", name: "gain" },
        ],
      "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def_1_0|334d2b10-c9e9-40f3-aa2c-7ce90d3216a7_0_0":
        [
          {
            moduleKey: "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "334d2b10-c9e9-40f3-aa2c-7ce90d3216a7",
            channel: 0,
            type: 0,
          },
        ],
      "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def_1_0|334d2b10-c9e9-40f3-aa2c-7ce90d3216a7_gain":
        [
          {
            moduleKey: "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def",
            channel: 0,
            type: 1,
          },
          { moduleKey: "334d2b10-c9e9-40f3-aa2c-7ce90d3216a7", name: "gain" },
        ],
      "14df67b3-7b5d-47c7-847b-20d639889b3b_1_0|f8a2b559-5f3c-4182-b7ff-4fce08036d57_0_0":
        [
          {
            moduleKey: "14df67b3-7b5d-47c7-847b-20d639889b3b",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "f8a2b559-5f3c-4182-b7ff-4fce08036d57",
            channel: 0,
            type: 0,
          },
        ],
      "f8a2b559-5f3c-4182-b7ff-4fce08036d57_1_0|0_0_0": [
        {
          moduleKey: "f8a2b559-5f3c-4182-b7ff-4fce08036d57",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "6a2b9aa4-7d17-4ffd-9c18-ac035a1cd194_1_0|cc50151f-18a6-459d-bb3e-b49725ac1055_detune":
        [
          {
            moduleKey: "6a2b9aa4-7d17-4ffd-9c18-ac035a1cd194",
            channel: 0,
            type: 1,
          },
          { moduleKey: "cc50151f-18a6-459d-bb3e-b49725ac1055", name: "detune" },
        ],
      "cc50151f-18a6-459d-bb3e-b49725ac1055_1_0|753c65ce-d44a-40bd-9cfc-6901700a93fc_0_0":
        [
          {
            moduleKey: "cc50151f-18a6-459d-bb3e-b49725ac1055",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "753c65ce-d44a-40bd-9cfc-6901700a93fc",
            type: 0,
            channel: 0,
          },
        ],
      "af864e6b-f35a-41bb-8e39-fc3a612c7d04_1_0|6ac729ee-77b4-4fbc-a83f-80ea07d10785_detune":
        [
          {
            moduleKey: "af864e6b-f35a-41bb-8e39-fc3a612c7d04",
            channel: 0,
            type: 1,
          },
          { moduleKey: "6ac729ee-77b4-4fbc-a83f-80ea07d10785", name: "detune" },
        ],
      "6ac729ee-77b4-4fbc-a83f-80ea07d10785_1_0|3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f_0_0":
        [
          {
            moduleKey: "6ac729ee-77b4-4fbc-a83f-80ea07d10785",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f",
            type: 0,
            channel: 0,
          },
        ],
      "3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f_1_0|99b401ab-45be-4063-beb3-8968034a634b_0_0":
        [
          {
            moduleKey: "3c8adb7b-aa16-4e6f-9ff7-8f16547acf0f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "99b401ab-45be-4063-beb3-8968034a634b",
            type: 0,
            channel: 0,
          },
        ],
      "d241f967-4ab3-4448-ad2b-a6a3f4d4f3c3_1_0|5cdee607-4b4e-4ee1-b07c-06b7fbdc1def_0_0":
        [
          {
            moduleKey: "d241f967-4ab3-4448-ad2b-a6a3f4d4f3c3",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def",
            channel: 0,
            type: 0,
          },
        ],
      "99b401ab-45be-4063-beb3-8968034a634b_1_0|ac131c63-f173-4db4-8778-c1667faa3e4a_0_0":
        [
          {
            moduleKey: "99b401ab-45be-4063-beb3-8968034a634b",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "ac131c63-f173-4db4-8778-c1667faa3e4a",
            type: 0,
            channel: 0,
          },
        ],
      "ac131c63-f173-4db4-8778-c1667faa3e4a_1_0|5cdee607-4b4e-4ee1-b07c-06b7fbdc1def_0_0":
        [
          {
            moduleKey: "ac131c63-f173-4db4-8778-c1667faa3e4a",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "5cdee607-4b4e-4ee1-b07c-06b7fbdc1def",
            type: 0,
            channel: 0,
          },
        ],
      "8e2132d1-4c28-4b4a-937e-5e31920b8ca9_1_0|2d3cb8dc-5407-4739-b6b5-724819fd6f73_0_0":
        [
          {
            moduleKey: "8e2132d1-4c28-4b4a-937e-5e31920b8ca9",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "2d3cb8dc-5407-4739-b6b5-724819fd6f73",
            type: 0,
            channel: 0,
          },
        ],
      "dd529a9d-0e86-4afe-9919-94517314c78e_1_0|8e2132d1-4c28-4b4a-937e-5e31920b8ca9_0_0":
        [
          {
            moduleKey: "dd529a9d-0e86-4afe-9919-94517314c78e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "8e2132d1-4c28-4b4a-937e-5e31920b8ca9",
            type: 0,
            channel: 0,
          },
        ],
      "2d3cb8dc-5407-4739-b6b5-724819fd6f73_1_0|dd529a9d-0e86-4afe-9919-94517314c78e_detune":
        [
          {
            moduleKey: "2d3cb8dc-5407-4739-b6b5-724819fd6f73",
            channel: 0,
            type: 1,
          },
          { moduleKey: "dd529a9d-0e86-4afe-9919-94517314c78e", name: "detune" },
        ],
      "19d16360-9b0d-48a8-9ae1-9560603d0bab_1_0|dd529a9d-0e86-4afe-9919-94517314c78e_frequency":
        [
          {
            moduleKey: "19d16360-9b0d-48a8-9ae1-9560603d0bab",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "dd529a9d-0e86-4afe-9919-94517314c78e",
            name: "frequency",
          },
        ],
      "b640cf15-f741-46aa-91b0-d9da14ac59b1_1_0|19d16360-9b0d-48a8-9ae1-9560603d0bab_0_0":
        [
          {
            moduleKey: "b640cf15-f741-46aa-91b0-d9da14ac59b1",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "19d16360-9b0d-48a8-9ae1-9560603d0bab",
            channel: 0,
            type: 0,
          },
        ],
      "8e2132d1-4c28-4b4a-937e-5e31920b8ca9_1_0|4b55e8e5-bdd7-490f-8583-231999ca74cd_0_0":
        [
          {
            moduleKey: "8e2132d1-4c28-4b4a-937e-5e31920b8ca9",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "4b55e8e5-bdd7-490f-8583-231999ca74cd",
            type: 0,
            channel: 0,
          },
        ],
      "4b55e8e5-bdd7-490f-8583-231999ca74cd_1_0|ac131c63-f173-4db4-8778-c1667faa3e4a_detune":
        [
          {
            moduleKey: "4b55e8e5-bdd7-490f-8583-231999ca74cd",
            channel: 0,
            type: 1,
          },
          { moduleKey: "ac131c63-f173-4db4-8778-c1667faa3e4a", name: "detune" },
        ],
      "48dbe866-ecd8-49fb-bcb3-0b2140448850_1_0|4b55e8e5-bdd7-490f-8583-231999ca74cd_gain":
        [
          {
            moduleKey: "48dbe866-ecd8-49fb-bcb3-0b2140448850",
            channel: 0,
            type: 1,
          },
          { moduleKey: "4b55e8e5-bdd7-490f-8583-231999ca74cd", name: "gain" },
        ],
    },
  },
};

const aaa2 = {
  id: "c090f09e-77de-406a-b708-5f922d0c2b4c",
  name: "agile-able-attitude",
  slug: "agile-able-attitude-c090f09e",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 1 },
      },
      "94f09936-4ea8-4272-82d2-7f103d0c71bd": {
        name: "malicious-coordinated-clock",
        moduleKey: "94f09936-4ea8-4272-82d2-7f103d0c71bd",
        type: "CLOCK",
        state: { tempo: 140 },
      },
      "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf": {
        name: "lyrical-barbarous-envelope",
        moduleKey: "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf",
        type: "ENVELOPE",
        state: {
          gate: 0.1,
          attack: 0,
          decay: 0.1,
          sustain: 0,
          release: 0.1,
          peak: 2400,
        },
      },
      "9701db09-b62d-4635-bafa-1fecb8c695a0": {
        name: "tall-mean-oscillator",
        moduleKey: "9701db09-b62d-4635-bafa-1fecb8c695a0",
        type: "OSCILLATOR",
        state: { frequency: 10, detune: 0, waveform: "square" },
      },
      "d3c65626-13b6-4fd0-96d7-cad136bd5b3f": {
        name: "private-true-sequencer",
        moduleKey: "d3c65626-13b6-4fd0-96d7-cad136bd5b3f",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: 1,
          step1: 1,
          step2: 0,
          step3: 1,
          step4: 0,
          step5: 0,
          step6: 1,
          step7: 0,
        },
      },
      "bf28893b-fe9b-4385-9367-81d9deefec96": {
        name: "absent-habitual-vca",
        moduleKey: "bf28893b-fe9b-4385-9367-81d9deefec96",
        type: "VCA",
        state: {
          gate: 0.2,
          attack: 0,
          decay: 1,
          sustain: 0.1,
          release: 0.1,
          peak: 0,
        },
      },
      "c98da833-4498-478b-8a98-323fb400eb79": {
        name: "ritzy-distinct-filter",
        moduleKey: "c98da833-4498-478b-8a98-323fb400eb79",
        type: "FILTER",
        state: { frequency: 1396, detune: 0, Q: 2, gain: 0, type: "lowpass" },
      },
      "8cd23a08-a2bb-47fd-809a-89ab701dfc79": {
        name: "embarrassed-statuesque-gain",
        moduleKey: "8cd23a08-a2bb-47fd-809a-89ab701dfc79",
        type: "GAIN",
        state: { gain: 3 },
      },
      "8f1d10a3-890c-4151-80ad-5810b9cd972a": {
        name: "charming-harmonious-noise",
        moduleKey: "8f1d10a3-890c-4151-80ad-5810b9cd972a",
        type: "NOISE",
        state: {},
      },
      "a907b7d1-598c-4e55-9b27-3d461f279e55": {
        name: "utopian-obscene-sequencer",
        moduleKey: "a907b7d1-598c-4e55-9b27-3d461f279e55",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 0,
          step1: 1,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "26a3f0ee-6f33-4a81-9f49-1ea2241ebf69": {
        name: "expert-judicious-vca",
        moduleKey: "26a3f0ee-6f33-4a81-9f49-1ea2241ebf69",
        type: "VCA",
        state: {
          gate: 0.2,
          attack: 0,
          decay: 1,
          sustain: 0.1,
          release: 0.1,
          peak: 0,
        },
      },
      "2b8c1c52-b554-4cca-a6c7-40bbbdf12e04": {
        name: "abrasive-green-filter",
        moduleKey: "2b8c1c52-b554-4cca-a6c7-40bbbdf12e04",
        type: "FILTER",
        state: { frequency: 2800, detune: 0, Q: 4, gain: 0, type: "lowpass" },
      },
      "1dff4e67-e779-4a40-a094-916291e7ad1a": {
        name: "spiteful-defiant-sequencer",
        moduleKey: "1dff4e67-e779-4a40-a094-916291e7ad1a",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: 0,
          step1: 6,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: 8,
          step6: 36,
          step7: 0,
        },
      },
      "ca355888-0854-4263-9766-3ccbcf3dbfa5": {
        name: "curly-wet-oscillator",
        moduleKey: "ca355888-0854-4263-9766-3ccbcf3dbfa5",
        type: "OSCILLATOR",
        state: { frequency: 40, detune: 0, waveform: "square" },
      },
      "86c0bf6e-0740-4a5a-b305-cccef613d1a2": {
        name: "tearful-jazzy-vca",
        moduleKey: "86c0bf6e-0740-4a5a-b305-cccef613d1a2",
        type: "VCA",
        state: {
          gate: 0.5,
          attack: 0,
          decay: 0.1,
          sustain: 0.11,
          release: 1,
          peak: 1,
        },
      },
      "8181a1b5-4a2c-4649-8837-ac05842dd5a7": {
        name: "easy-alleged-filter",
        moduleKey: "8181a1b5-4a2c-4649-8837-ac05842dd5a7",
        type: "FILTER",
        state: { frequency: 640, detune: 0, Q: 1, gain: 0, type: "lowpass" },
      },
      "9d29c20e-de1d-440d-aac5-9f265d2358c7": {
        name: "empty-historical-delay",
        moduleKey: "9d29c20e-de1d-440d-aac5-9f265d2358c7",
        type: "DELAY",
        state: { delayTime: 0.2 },
      },
      "e2dd7500-5699-47a0-b9ea-f931d690db76": {
        name: "toothsome-cosmic-gain",
        moduleKey: "e2dd7500-5699-47a0-b9ea-f931d690db76",
        type: "GAIN",
        state: { gain: 0.2 },
      },
      "eb08548f-f3cb-4e17-9a95-18f1a3c5520a": {
        name: "deserted-sole-sequencer",
        moduleKey: "eb08548f-f3cb-4e17-9a95-18f1a3c5520a",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: 0,
          step1: 0,
          step2: 0,
          step3: 4,
          step4: 0,
          step5: 12,
          step6: 0,
          step7: 0,
        },
      },
      "cd5cb559-4d89-4849-ad87-6d0e20fa10f0": {
        name: "embarrassed-funny-oscillator",
        moduleKey: "cd5cb559-4d89-4849-ad87-6d0e20fa10f0",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: 0, waveform: "triangle" },
      },
      "e34a0dd0-9478-417c-abfc-a220cb3dbcf8": {
        name: "psychotic-acrid-sequencer",
        moduleKey: "e34a0dd0-9478-417c-abfc-a220cb3dbcf8",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 3,
          step1: 200,
          step2: 70,
          step3: -30,
          step4: 4,
          step5: 5,
          step6: 7,
          step7: 90,
        },
      },
      "64859d73-c6ba-4950-9083-d289ee3bc40f": {
        name: "dandy-different-filter",
        moduleKey: "64859d73-c6ba-4950-9083-d289ee3bc40f",
        type: "FILTER",
        state: { frequency: 350, detune: 0, Q: 1, gain: 0.3, type: "bandpass" },
      },
      "b74ac65d-2101-40e8-82f5-41c44698f310": {
        name: "irate-imperfect-vca",
        moduleKey: "b74ac65d-2101-40e8-82f5-41c44698f310",
        type: "VCA",
        state: {
          gate: 0.5,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 1,
        },
      },
      "9d336205-a048-4c4d-9ba6-f33d92d1a198": {
        name: "quick-private-gain",
        moduleKey: "9d336205-a048-4c4d-9ba6-f33d92d1a198",
        type: "GAIN",
        state: { gain: 0.5 },
      },
      "b15493d8-7794-42b3-b7de-f8a16fcaa536": {
        name: "deadpan-enthusiastic-clock",
        moduleKey: "b15493d8-7794-42b3-b7de-f8a16fcaa536",
        type: "CLOCK",
        state: { tempo: 17.5 },
      },
    },
    modulePositions: {
      "0": [2385, 759],
      "94f09936-4ea8-4272-82d2-7f103d0c71bd": [106, 553],
      "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf": [608, 117],
      "9701db09-b62d-4635-bafa-1fecb8c695a0": [1536, 166],
      "d3c65626-13b6-4fd0-96d7-cad136bd5b3f": [518, 660],
      "bf28893b-fe9b-4385-9367-81d9deefec96": [1976, 619],
      "c98da833-4498-478b-8a98-323fb400eb79": [1883, 310],
      "8cd23a08-a2bb-47fd-809a-89ab701dfc79": [1104, 132],
      "8f1d10a3-890c-4151-80ad-5810b9cd972a": [918, 526],
      "a907b7d1-598c-4e55-9b27-3d461f279e55": [877, 775],
      "26a3f0ee-6f33-4a81-9f49-1ea2241ebf69": [1409, 804],
      "2b8c1c52-b554-4cca-a6c7-40bbbdf12e04": [1799, 935],
      "1dff4e67-e779-4a40-a094-916291e7ad1a": [481, 1218],
      "ca355888-0854-4263-9766-3ccbcf3dbfa5": [926, 1501],
      "86c0bf6e-0740-4a5a-b305-cccef613d1a2": [1359, 1396],
      "8181a1b5-4a2c-4649-8837-ac05842dd5a7": [1912, 1464],
      "9d29c20e-de1d-440d-aac5-9f265d2358c7": [182, 1012],
      "e2dd7500-5699-47a0-b9ea-f931d690db76": [2174, 1095],
      "eb08548f-f3cb-4e17-9a95-18f1a3c5520a": [49, 1227],
      "cd5cb559-4d89-4849-ad87-6d0e20fa10f0": [1308, 1135],
      "e34a0dd0-9478-417c-abfc-a220cb3dbcf8": [872, 1173],
      "64859d73-c6ba-4950-9083-d289ee3bc40f": [1739, 1212],
      "b74ac65d-2101-40e8-82f5-41c44698f310": [2186, 1298],
      "9d336205-a048-4c4d-9ba6-f33d92d1a198": [2785, 1182],
      "b15493d8-7794-42b3-b7de-f8a16fcaa536": [68, 743],
    },
    connections: {
      "94f09936-4ea8-4272-82d2-7f103d0c71bd_1_0|d3c65626-13b6-4fd0-96d7-cad136bd5b3f_0_0":
        [
          {
            moduleKey: "94f09936-4ea8-4272-82d2-7f103d0c71bd",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d3c65626-13b6-4fd0-96d7-cad136bd5b3f",
            type: 0,
            channel: 0,
          },
        ],
      "bf28893b-fe9b-4385-9367-81d9deefec96_1_0|0_0_0": [
        {
          moduleKey: "bf28893b-fe9b-4385-9367-81d9deefec96",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "9701db09-b62d-4635-bafa-1fecb8c695a0_1_0|c98da833-4498-478b-8a98-323fb400eb79_0_0":
        [
          {
            moduleKey: "9701db09-b62d-4635-bafa-1fecb8c695a0",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "c98da833-4498-478b-8a98-323fb400eb79",
            type: 0,
            channel: 0,
          },
        ],
      "c98da833-4498-478b-8a98-323fb400eb79_1_0|bf28893b-fe9b-4385-9367-81d9deefec96_0_0":
        [
          {
            moduleKey: "c98da833-4498-478b-8a98-323fb400eb79",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "bf28893b-fe9b-4385-9367-81d9deefec96",
            type: 0,
            channel: 0,
          },
        ],
      "d3c65626-13b6-4fd0-96d7-cad136bd5b3f_1_0|bf28893b-fe9b-4385-9367-81d9deefec96_peak":
        [
          {
            moduleKey: "d3c65626-13b6-4fd0-96d7-cad136bd5b3f",
            channel: 0,
            type: 1,
          },
          { moduleKey: "bf28893b-fe9b-4385-9367-81d9deefec96", name: "peak" },
        ],
      "94f09936-4ea8-4272-82d2-7f103d0c71bd_1_0|ae0fa3c1-7ca2-46a1-b138-b860e097f6cf_0_0":
        [
          {
            moduleKey: "94f09936-4ea8-4272-82d2-7f103d0c71bd",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf",
            channel: 0,
            type: 0,
          },
        ],
      "94f09936-4ea8-4272-82d2-7f103d0c71bd_1_0|bf28893b-fe9b-4385-9367-81d9deefec96_0_1":
        [
          {
            moduleKey: "94f09936-4ea8-4272-82d2-7f103d0c71bd",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "bf28893b-fe9b-4385-9367-81d9deefec96",
            type: 0,
            channel: 1,
          },
        ],
      "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf_1_0|8cd23a08-a2bb-47fd-809a-89ab701dfc79_0_0":
        [
          {
            moduleKey: "ae0fa3c1-7ca2-46a1-b138-b860e097f6cf",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "8cd23a08-a2bb-47fd-809a-89ab701dfc79",
            channel: 0,
            type: 0,
          },
        ],
      "8cd23a08-a2bb-47fd-809a-89ab701dfc79_1_0|9701db09-b62d-4635-bafa-1fecb8c695a0_detune":
        [
          {
            moduleKey: "8cd23a08-a2bb-47fd-809a-89ab701dfc79",
            channel: 0,
            type: 1,
          },
          { moduleKey: "9701db09-b62d-4635-bafa-1fecb8c695a0", name: "detune" },
        ],
      "94f09936-4ea8-4272-82d2-7f103d0c71bd_1_0|a907b7d1-598c-4e55-9b27-3d461f279e55_0_0":
        [
          {
            moduleKey: "94f09936-4ea8-4272-82d2-7f103d0c71bd",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "a907b7d1-598c-4e55-9b27-3d461f279e55",
            channel: 0,
            type: 0,
          },
        ],
      "a907b7d1-598c-4e55-9b27-3d461f279e55_1_0|26a3f0ee-6f33-4a81-9f49-1ea2241ebf69_peak":
        [
          {
            moduleKey: "a907b7d1-598c-4e55-9b27-3d461f279e55",
            channel: 0,
            type: 1,
          },
          { moduleKey: "26a3f0ee-6f33-4a81-9f49-1ea2241ebf69", name: "peak" },
        ],
      "8f1d10a3-890c-4151-80ad-5810b9cd972a_1_0|26a3f0ee-6f33-4a81-9f49-1ea2241ebf69_0_0":
        [
          {
            moduleKey: "8f1d10a3-890c-4151-80ad-5810b9cd972a",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "26a3f0ee-6f33-4a81-9f49-1ea2241ebf69",
            type: 0,
            channel: 0,
          },
        ],
      "94f09936-4ea8-4272-82d2-7f103d0c71bd_1_0|26a3f0ee-6f33-4a81-9f49-1ea2241ebf69_0_1":
        [
          {
            moduleKey: "94f09936-4ea8-4272-82d2-7f103d0c71bd",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "26a3f0ee-6f33-4a81-9f49-1ea2241ebf69",
            channel: 1,
            type: 0,
          },
        ],
      "26a3f0ee-6f33-4a81-9f49-1ea2241ebf69_1_0|2b8c1c52-b554-4cca-a6c7-40bbbdf12e04_0_0":
        [
          {
            moduleKey: "26a3f0ee-6f33-4a81-9f49-1ea2241ebf69",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "2b8c1c52-b554-4cca-a6c7-40bbbdf12e04",
            channel: 0,
            type: 0,
          },
        ],
      "2b8c1c52-b554-4cca-a6c7-40bbbdf12e04_1_0|0_0_0": [
        {
          moduleKey: "2b8c1c52-b554-4cca-a6c7-40bbbdf12e04",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "1dff4e67-e779-4a40-a094-916291e7ad1a_1_0|ca355888-0854-4263-9766-3ccbcf3dbfa5_frequency":
        [
          {
            moduleKey: "1dff4e67-e779-4a40-a094-916291e7ad1a",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "ca355888-0854-4263-9766-3ccbcf3dbfa5",
            name: "frequency",
          },
        ],
      "94f09936-4ea8-4272-82d2-7f103d0c71bd_1_0|1dff4e67-e779-4a40-a094-916291e7ad1a_0_0":
        [
          {
            moduleKey: "94f09936-4ea8-4272-82d2-7f103d0c71bd",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "1dff4e67-e779-4a40-a094-916291e7ad1a",
            channel: 0,
            type: 0,
          },
        ],
      "ca355888-0854-4263-9766-3ccbcf3dbfa5_1_0|86c0bf6e-0740-4a5a-b305-cccef613d1a2_0_0":
        [
          {
            moduleKey: "ca355888-0854-4263-9766-3ccbcf3dbfa5",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "86c0bf6e-0740-4a5a-b305-cccef613d1a2",
            type: 0,
            channel: 0,
          },
        ],
      "94f09936-4ea8-4272-82d2-7f103d0c71bd_1_0|86c0bf6e-0740-4a5a-b305-cccef613d1a2_0_1":
        [
          {
            moduleKey: "94f09936-4ea8-4272-82d2-7f103d0c71bd",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "86c0bf6e-0740-4a5a-b305-cccef613d1a2",
            channel: 1,
            type: 0,
          },
        ],
      "86c0bf6e-0740-4a5a-b305-cccef613d1a2_1_0|8181a1b5-4a2c-4649-8837-ac05842dd5a7_0_0":
        [
          {
            moduleKey: "86c0bf6e-0740-4a5a-b305-cccef613d1a2",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "8181a1b5-4a2c-4649-8837-ac05842dd5a7",
            type: 0,
            channel: 0,
          },
        ],
      "8181a1b5-4a2c-4649-8837-ac05842dd5a7_1_0|0_0_0": [
        {
          moduleKey: "8181a1b5-4a2c-4649-8837-ac05842dd5a7",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "e2dd7500-5699-47a0-b9ea-f931d690db76_1_0|8181a1b5-4a2c-4649-8837-ac05842dd5a7_0_0":
        [
          {
            moduleKey: "e2dd7500-5699-47a0-b9ea-f931d690db76",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "8181a1b5-4a2c-4649-8837-ac05842dd5a7",
            type: 0,
            channel: 0,
          },
        ],
      "9d29c20e-de1d-440d-aac5-9f265d2358c7_1_0|eb08548f-f3cb-4e17-9a95-18f1a3c5520a_0_0":
        [
          {
            moduleKey: "9d29c20e-de1d-440d-aac5-9f265d2358c7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "eb08548f-f3cb-4e17-9a95-18f1a3c5520a",
            type: 0,
            channel: 0,
          },
        ],
      "eb08548f-f3cb-4e17-9a95-18f1a3c5520a_1_0|ca355888-0854-4263-9766-3ccbcf3dbfa5_frequency":
        [
          {
            moduleKey: "eb08548f-f3cb-4e17-9a95-18f1a3c5520a",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "ca355888-0854-4263-9766-3ccbcf3dbfa5",
            name: "frequency",
          },
        ],
      "94f09936-4ea8-4272-82d2-7f103d0c71bd_1_0|9d29c20e-de1d-440d-aac5-9f265d2358c7_0_0":
        [
          {
            moduleKey: "94f09936-4ea8-4272-82d2-7f103d0c71bd",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "9d29c20e-de1d-440d-aac5-9f265d2358c7",
            channel: 0,
            type: 0,
          },
        ],
      "9d29c20e-de1d-440d-aac5-9f265d2358c7_1_0|86c0bf6e-0740-4a5a-b305-cccef613d1a2_0_1":
        [
          {
            moduleKey: "9d29c20e-de1d-440d-aac5-9f265d2358c7",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "86c0bf6e-0740-4a5a-b305-cccef613d1a2",
            type: 0,
            channel: 1,
          },
        ],
      "e34a0dd0-9478-417c-abfc-a220cb3dbcf8_1_0|cd5cb559-4d89-4849-ad87-6d0e20fa10f0_frequency":
        [
          {
            moduleKey: "e34a0dd0-9478-417c-abfc-a220cb3dbcf8",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "cd5cb559-4d89-4849-ad87-6d0e20fa10f0",
            name: "frequency",
          },
        ],
      "cd5cb559-4d89-4849-ad87-6d0e20fa10f0_1_0|64859d73-c6ba-4950-9083-d289ee3bc40f_0_0":
        [
          {
            moduleKey: "cd5cb559-4d89-4849-ad87-6d0e20fa10f0",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "64859d73-c6ba-4950-9083-d289ee3bc40f",
            type: 0,
            channel: 0,
          },
        ],
      "94f09936-4ea8-4272-82d2-7f103d0c71bd_1_0|b74ac65d-2101-40e8-82f5-41c44698f310_0_1":
        [
          {
            moduleKey: "94f09936-4ea8-4272-82d2-7f103d0c71bd",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "b74ac65d-2101-40e8-82f5-41c44698f310",
            channel: 1,
            type: 0,
          },
        ],
      "64859d73-c6ba-4950-9083-d289ee3bc40f_1_0|b74ac65d-2101-40e8-82f5-41c44698f310_0_0":
        [
          {
            moduleKey: "64859d73-c6ba-4950-9083-d289ee3bc40f",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b74ac65d-2101-40e8-82f5-41c44698f310",
            type: 0,
            channel: 0,
          },
        ],
      "1dff4e67-e779-4a40-a094-916291e7ad1a_1_0|cd5cb559-4d89-4849-ad87-6d0e20fa10f0_detune":
        [
          {
            moduleKey: "1dff4e67-e779-4a40-a094-916291e7ad1a",
            type: 1,
            channel: 0,
          },
          { moduleKey: "cd5cb559-4d89-4849-ad87-6d0e20fa10f0", name: "detune" },
        ],
      "b74ac65d-2101-40e8-82f5-41c44698f310_1_0|9d336205-a048-4c4d-9ba6-f33d92d1a198_0_0":
        [
          {
            moduleKey: "b74ac65d-2101-40e8-82f5-41c44698f310",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "9d336205-a048-4c4d-9ba6-f33d92d1a198",
            type: 0,
            channel: 0,
          },
        ],
      "9d336205-a048-4c4d-9ba6-f33d92d1a198_1_0|0_0_0": [
        {
          moduleKey: "9d336205-a048-4c4d-9ba6-f33d92d1a198",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "b15493d8-7794-42b3-b7de-f8a16fcaa536_1_0|e34a0dd0-9478-417c-abfc-a220cb3dbcf8_0_0":
        [
          {
            moduleKey: "b15493d8-7794-42b3-b7de-f8a16fcaa536",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "e34a0dd0-9478-417c-abfc-a220cb3dbcf8",
            type: 0,
            channel: 0,
          },
        ],
    },
  },
};

const vvv = {
  id: "c0b3767e-fc57-4bf0-8759-55a0c46354db",
  name: "viable-vacuous-value",
  slug: "viable-vacuous-value-c0b3767e",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.45 },
      },
      "aa5d20d1-cabe-4b25-9a05-e3f3f216fddd": {
        name: "materialistic-pumped-oscillator",
        moduleKey: "aa5d20d1-cabe-4b25-9a05-e3f3f216fddd",
        type: "OSCILLATOR",
        state: { frequency: 110, detune: 2, waveform: "sawtooth" },
      },
      "a39b5434-3ef5-49d2-a8c2-3f89e9f9e3ed": {
        name: "internal-incredible-vca",
        moduleKey: "a39b5434-3ef5-49d2-a8c2-3f89e9f9e3ed",
        type: "VCA",
        state: {
          gate: 0.03125,
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 0.125,
        },
      },
      "4f622e9b-429a-4d39-bd52-867500827269": {
        name: "luxuriant-level-clock",
        moduleKey: "4f622e9b-429a-4d39-bd52-867500827269",
        type: "CLOCK",
        state: { tempo: 132 },
      },
      "a2406a69-f1aa-4433-8562-1e84f5b941d0": {
        name: "poised-zany-sequencer",
        moduleKey: "a2406a69-f1aa-4433-8562-1e84f5b941d0",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: 1200,
          step1: 600,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: -100,
          step6: 0,
          step7: 0,
        },
      },
      "c4213310-3842-4f2d-b81b-38093cdfc6a5": {
        name: "weary-moving-delay",
        moduleKey: "c4213310-3842-4f2d-b81b-38093cdfc6a5",
        type: "DELAY",
        state: { delayTime: 0.08 },
      },
      "3bea5d77-1fb2-4cdc-b4c6-71f9a42e9afa": {
        name: "screeching-private-clock",
        moduleKey: "3bea5d77-1fb2-4cdc-b4c6-71f9a42e9afa",
        type: "CLOCK",
        state: { tempo: 66 },
      },
      "62a6fa14-6d40-49bf-b568-04da699663ea": {
        name: "snowy-absent-sequencer",
        moduleKey: "62a6fa14-6d40-49bf-b568-04da699663ea",
        type: "SEQUENCER",
        state: {
          steps: 2,
          step0: 1,
          step1: 0,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "236b298c-a7b5-45f9-8d8c-9b83e1984847": {
        name: "wise-absent-gain",
        moduleKey: "236b298c-a7b5-45f9-8d8c-9b83e1984847",
        type: "GAIN",
        state: { gain: 0 },
      },
      "a5261068-4345-4fd0-86aa-9ce57a93b92d": {
        name: "premium-gainful-oscillator",
        moduleKey: "a5261068-4345-4fd0-86aa-9ce57a93b92d",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: -6, waveform: "triangle" },
      },
      "2f632b72-3cc7-4093-ad6c-a1f4f618fad9": {
        name: "loose-offbeat-oscillator",
        moduleKey: "2f632b72-3cc7-4093-ad6c-a1f4f618fad9",
        type: "OSCILLATOR",
        state: { frequency: 55, detune: 0, waveform: "square" },
      },
      "a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9": {
        name: "diligent-industrious-filter",
        moduleKey: "a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9",
        type: "FILTER",
        state: { frequency: 375, detune: 0, Q: 5, gain: 0, type: "lowpass" },
      },
      "a6b0d315-6186-424a-a42d-713db85958f7": {
        name: "last-military-envelope",
        moduleKey: "a6b0d315-6186-424a-a42d-713db85958f7",
        type: "ENVELOPE",
        state: {
          gate: 0.0625,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 2400,
        },
      },
    },
    modulePositions: {
      "0": [2301, 2026],
      "aa5d20d1-cabe-4b25-9a05-e3f3f216fddd": [1766, 324],
      "a39b5434-3ef5-49d2-a8c2-3f89e9f9e3ed": [991, 1998],
      "4f622e9b-429a-4d39-bd52-867500827269": [305, 393],
      "a2406a69-f1aa-4433-8562-1e84f5b941d0": [1006, 231],
      "c4213310-3842-4f2d-b81b-38093cdfc6a5": [992, 1466],
      "3bea5d77-1fb2-4cdc-b4c6-71f9a42e9afa": [7, 1195],
      "62a6fa14-6d40-49bf-b568-04da699663ea": [990, 1778],
      "236b298c-a7b5-45f9-8d8c-9b83e1984847": [990, 1622],
      "a5261068-4345-4fd0-86aa-9ce57a93b92d": [1722, 719],
      "2f632b72-3cc7-4093-ad6c-a1f4f618fad9": [2099, 512],
      "a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9": [1860, 1114],
      "a6b0d315-6186-424a-a42d-713db85958f7": [1297, 1076],
    },
    connections: {
      "a39b5434-3ef5-49d2-a8c2-3f89e9f9e3ed_1_0|0_0_0": [
        {
          moduleKey: "a39b5434-3ef5-49d2-a8c2-3f89e9f9e3ed",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "a2406a69-f1aa-4433-8562-1e84f5b941d0_1_0|aa5d20d1-cabe-4b25-9a05-e3f3f216fddd_detune":
        [
          {
            moduleKey: "a2406a69-f1aa-4433-8562-1e84f5b941d0",
            channel: 0,
            type: 1,
          },
          { moduleKey: "aa5d20d1-cabe-4b25-9a05-e3f3f216fddd", name: "detune" },
        ],
      "4f622e9b-429a-4d39-bd52-867500827269_1_0|a2406a69-f1aa-4433-8562-1e84f5b941d0_0_0":
        [
          {
            moduleKey: "4f622e9b-429a-4d39-bd52-867500827269",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "a2406a69-f1aa-4433-8562-1e84f5b941d0",
            type: 0,
            channel: 0,
          },
        ],
      "4f622e9b-429a-4d39-bd52-867500827269_1_0|c4213310-3842-4f2d-b81b-38093cdfc6a5_0_0":
        [
          {
            moduleKey: "4f622e9b-429a-4d39-bd52-867500827269",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "c4213310-3842-4f2d-b81b-38093cdfc6a5",
            type: 0,
            channel: 0,
          },
        ],
      "3bea5d77-1fb2-4cdc-b4c6-71f9a42e9afa_1_0|4f622e9b-429a-4d39-bd52-867500827269_0_0":
        [
          {
            moduleKey: "3bea5d77-1fb2-4cdc-b4c6-71f9a42e9afa",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "4f622e9b-429a-4d39-bd52-867500827269",
            type: 0,
            channel: 0,
          },
        ],
      "3bea5d77-1fb2-4cdc-b4c6-71f9a42e9afa_1_0|62a6fa14-6d40-49bf-b568-04da699663ea_0_0":
        [
          {
            moduleKey: "3bea5d77-1fb2-4cdc-b4c6-71f9a42e9afa",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "62a6fa14-6d40-49bf-b568-04da699663ea",
            type: 0,
            channel: 0,
          },
        ],
      "236b298c-a7b5-45f9-8d8c-9b83e1984847_1_0|a39b5434-3ef5-49d2-a8c2-3f89e9f9e3ed_0_1":
        [
          {
            moduleKey: "236b298c-a7b5-45f9-8d8c-9b83e1984847",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "a39b5434-3ef5-49d2-a8c2-3f89e9f9e3ed",
            type: 0,
            channel: 1,
          },
        ],
      "a2406a69-f1aa-4433-8562-1e84f5b941d0_1_0|a5261068-4345-4fd0-86aa-9ce57a93b92d_detune":
        [
          {
            moduleKey: "a2406a69-f1aa-4433-8562-1e84f5b941d0",
            channel: 0,
            type: 1,
          },
          { moduleKey: "a5261068-4345-4fd0-86aa-9ce57a93b92d", name: "detune" },
        ],
      "a2406a69-f1aa-4433-8562-1e84f5b941d0_1_0|2f632b72-3cc7-4093-ad6c-a1f4f618fad9_detune":
        [
          {
            moduleKey: "a2406a69-f1aa-4433-8562-1e84f5b941d0",
            type: 1,
            channel: 0,
          },
          { moduleKey: "2f632b72-3cc7-4093-ad6c-a1f4f618fad9", name: "detune" },
        ],
      "62a6fa14-6d40-49bf-b568-04da699663ea_1_0|236b298c-a7b5-45f9-8d8c-9b83e1984847_gain":
        [
          {
            moduleKey: "62a6fa14-6d40-49bf-b568-04da699663ea",
            channel: 0,
            type: 1,
          },
          { moduleKey: "236b298c-a7b5-45f9-8d8c-9b83e1984847", name: "gain" },
        ],
      "c4213310-3842-4f2d-b81b-38093cdfc6a5_1_0|236b298c-a7b5-45f9-8d8c-9b83e1984847_0_0":
        [
          {
            moduleKey: "c4213310-3842-4f2d-b81b-38093cdfc6a5",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "236b298c-a7b5-45f9-8d8c-9b83e1984847",
            type: 0,
            channel: 0,
          },
        ],
      "3bea5d77-1fb2-4cdc-b4c6-71f9a42e9afa_1_0|a39b5434-3ef5-49d2-a8c2-3f89e9f9e3ed_0_1":
        [
          {
            moduleKey: "3bea5d77-1fb2-4cdc-b4c6-71f9a42e9afa",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "a39b5434-3ef5-49d2-a8c2-3f89e9f9e3ed",
            type: 0,
            channel: 1,
          },
        ],
      "aa5d20d1-cabe-4b25-9a05-e3f3f216fddd_1_0|a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9_0_0":
        [
          {
            moduleKey: "aa5d20d1-cabe-4b25-9a05-e3f3f216fddd",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9",
            type: 0,
            channel: 0,
          },
        ],
      "a5261068-4345-4fd0-86aa-9ce57a93b92d_1_0|a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9_0_0":
        [
          {
            moduleKey: "a5261068-4345-4fd0-86aa-9ce57a93b92d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9",
            type: 0,
            channel: 0,
          },
        ],
      "2f632b72-3cc7-4093-ad6c-a1f4f618fad9_1_0|a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9_0_0":
        [
          {
            moduleKey: "2f632b72-3cc7-4093-ad6c-a1f4f618fad9",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9",
            type: 0,
            channel: 0,
          },
        ],
      "a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9_1_0|a39b5434-3ef5-49d2-a8c2-3f89e9f9e3ed_0_0":
        [
          {
            moduleKey: "a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "a39b5434-3ef5-49d2-a8c2-3f89e9f9e3ed",
            type: 0,
            channel: 0,
          },
        ],
      "a6b0d315-6186-424a-a42d-713db85958f7_1_0|a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9_detune":
        [
          {
            moduleKey: "a6b0d315-6186-424a-a42d-713db85958f7",
            channel: 0,
            type: 1,
          },
          { moduleKey: "a59b28a4-34bb-4b7e-a1f5-fde7f3fc8bb9", name: "detune" },
        ],
      "4f622e9b-429a-4d39-bd52-867500827269_1_0|a6b0d315-6186-424a-a42d-713db85958f7_0_0":
        [
          {
            moduleKey: "4f622e9b-429a-4d39-bd52-867500827269",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "a6b0d315-6186-424a-a42d-713db85958f7",
            channel: 0,
            type: 0,
          },
        ],
    },
  },
};

const sss4 = {
  id: "d2de57e2-621b-4dc1-ab70-35197ede464d",
  name: "stiff-sound-scent",
  slug: "stiff-sound-scent-d2de57e2",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.45 },
      },
      "34b7bf2e-72e9-4afc-892f-60361356e09c": {
        name: "wealthy-soggy-clock",
        moduleKey: "34b7bf2e-72e9-4afc-892f-60361356e09c",
        type: "CLOCK",
        state: { tempo: 1056 },
      },
      "d81f383b-dec9-44d5-a331-1ba81753a0e2": {
        name: "saucy-simple-sequencer",
        moduleKey: "d81f383b-dec9-44d5-a331-1ba81753a0e2",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 0,
          step1: 1200,
          step2: -500,
          step3: -700,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "f8a46a2a-db5d-435a-81fa-a9c52cac1626": {
        name: "trusty-mysterious-oscillator",
        moduleKey: "f8a46a2a-db5d-435a-81fa-a9c52cac1626",
        type: "OSCILLATOR",
        state: { frequency: 110, detune: 0, waveform: "triangle" },
      },
      "4dc04834-c783-43c9-8a15-09df9899ed39": {
        name: "painstaking-wary-vca",
        moduleKey: "4dc04834-c783-43c9-8a15-09df9899ed39",
        type: "VCA",
        state: {
          gate: 0.1,
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.8,
          peak: 0.5,
        },
      },
      "fa3d60a1-f682-4805-a465-afbf9a1fdbf8": {
        name: "loved-mammoth-pan",
        moduleKey: "fa3d60a1-f682-4805-a465-afbf9a1fdbf8",
        type: "PAN",
        state: { pan: -0.25 },
      },
      "b1dc70e1-55b3-431c-b985-acccadc31ec4": {
        name: "languid-verdant-pan",
        moduleKey: "b1dc70e1-55b3-431c-b985-acccadc31ec4",
        type: "PAN",
        state: { pan: 0.25 },
      },
      "cf7deeda-e8a9-4d1e-83f6-970cb34e7518": {
        name: "glorious-moral-delay",
        moduleKey: "cf7deeda-e8a9-4d1e-83f6-970cb34e7518",
        type: "DELAY",
        state: { delayTime: 0.16666666 },
      },
      "0c958737-c114-4843-a52c-0bace77fa369": {
        name: "harsh-tropical-oscillator",
        moduleKey: "0c958737-c114-4843-a52c-0bace77fa369",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: 0, waveform: "triangle" },
      },
      "7b50aa60-3cce-46f4-83d4-1981962cd7f8": {
        name: "gentle-frail-vca",
        moduleKey: "7b50aa60-3cce-46f4-83d4-1981962cd7f8",
        type: "VCA",
        state: {
          gate: 0.125,
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.7,
          peak: 1,
        },
      },
      "dfa97931-25d1-46db-adbb-c337f8c65982": {
        name: "reach-massive-delay",
        moduleKey: "dfa97931-25d1-46db-adbb-c337f8c65982",
        type: "DELAY",
        state: { delayTime: 0.16666666 },
      },
      "3b7a8cf3-25d9-48d2-8d26-2de1efb3529a": {
        name: "tasty-sudden-oscillator",
        moduleKey: "3b7a8cf3-25d9-48d2-8d26-2de1efb3529a",
        type: "OSCILLATOR",
        state: { frequency: 220, detune: 0, waveform: "triangle" },
      },
      "f14dd861-99dd-4c00-bb13-ef6462955a30": {
        name: "sincere-macabre-vca",
        moduleKey: "f14dd861-99dd-4c00-bb13-ef6462955a30",
        type: "VCA",
        state: {
          gate: 0.001,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.0125,
          peak: 1200,
        },
      },
      "2d5be3db-76d3-41ba-abf1-97f6c89a65dc": {
        name: "square-needed-delay",
        moduleKey: "2d5be3db-76d3-41ba-abf1-97f6c89a65dc",
        type: "DELAY",
        state: { delayTime: 0.05 },
      },
      "537abdab-9ec8-4aa0-be12-d34e4db2f3f5": {
        name: "glistening-boss-gain",
        moduleKey: "537abdab-9ec8-4aa0-be12-d34e4db2f3f5",
        type: "GAIN",
        state: { gain: 0 },
      },
      "5b1d4beb-97e6-4929-9c4a-01342a216de2": {
        name: "united-psychotic-delay",
        moduleKey: "5b1d4beb-97e6-4929-9c4a-01342a216de2",
        type: "DELAY",
        state: { delayTime: 0.05 },
      },
      "6f5defb4-185c-46d2-b21c-9aff722f3f7a": {
        name: "fantastic-unbiased-clock",
        moduleKey: "6f5defb4-185c-46d2-b21c-9aff722f3f7a",
        type: "CLOCK",
        state: { tempo: 132 },
      },
      "315f8cf6-4e88-42e1-b53e-4230d4994a9f": {
        name: "lean-healthy-sequencer",
        moduleKey: "315f8cf6-4e88-42e1-b53e-4230d4994a9f",
        type: "SEQUENCER",
        state: {
          steps: 2,
          step0: 0.22,
          step1: 0.22,
          step2: 0.44,
          step3: 0.22,
          step4: 0.44,
          step5: 0.3,
          step6: 0.2,
          step7: 0.77,
        },
      },
      "11507ca7-5a27-4a2b-91dc-f12310edab54": {
        name: "calculating-pacific-clock",
        moduleKey: "11507ca7-5a27-4a2b-91dc-f12310edab54",
        type: "CLOCK",
        state: { tempo: 22 },
      },
      "58f2b7e3-5721-44a2-b114-60061df8bd4c": {
        name: "gabby-ambiguous-sequencer",
        moduleKey: "58f2b7e3-5721-44a2-b114-60061df8bd4c",
        type: "SEQUENCER",
        state: {
          steps: 2,
          step0: 0,
          step1: 2,
          step2: 1,
          step3: 2,
          step4: 3,
          step5: 4,
          step6: 5,
          step7: 6,
        },
      },
      "f6dd6e51-8341-4c0f-be33-bb1712cdd6fe": {
        name: "forlorn-burly-limiter",
        moduleKey: "f6dd6e51-8341-4c0f-be33-bb1712cdd6fe",
        type: "LIMITER",
        state: {},
      },
      "659da035-abf8-4445-90c7-9c60e7fa6c39": {
        name: "chivalrous-utopian-filter",
        moduleKey: "659da035-abf8-4445-90c7-9c60e7fa6c39",
        type: "FILTER",
        state: { frequency: 700, detune: 0, Q: 4, gain: 0, type: "bandpass" },
      },
      "7c9e66b3-892d-4a76-acf9-f21cb46e87d4": {
        name: "telling-dandy-oscillator",
        moduleKey: "7c9e66b3-892d-4a76-acf9-f21cb46e87d4",
        type: "OSCILLATOR",
        state: { frequency: 0, detune: 0, waveform: "sine" },
      },
      "957279e1-a8f2-4452-a8c4-c1d974775653": {
        name: "scintillating-glib-gain",
        moduleKey: "957279e1-a8f2-4452-a8c4-c1d974775653",
        type: "GAIN",
        state: { gain: 0 },
      },
      "1c1b2b43-d84b-47f2-9a47-5706d7ca088d": {
        name: "obnoxious-auspicious-oscillator",
        moduleKey: "1c1b2b43-d84b-47f2-9a47-5706d7ca088d",
        type: "OSCILLATOR",
        state: { frequency: 0.02, detune: 0, waveform: "sine" },
      },
      "9c41f754-6e9d-43f5-b8cb-ed25c52fd0ec": {
        name: "ruddy-ready-shift",
        moduleKey: "9c41f754-6e9d-43f5-b8cb-ed25c52fd0ec",
        type: "SHIFT",
        state: { inputMin: -1, inputMax: 1, outputMin: 0, outputMax: 2400 },
      },
      "8cd4cc71-0111-4d30-bc46-f76f4ec62a44": {
        name: "early-lopsided-filter",
        moduleKey: "8cd4cc71-0111-4d30-bc46-f76f4ec62a44",
        type: "FILTER",
        state: { frequency: 330, detune: 0, Q: 0, gain: 0, type: "lowpass" },
      },
      "aa77fa49-ee1c-4ab8-85a7-16e51d3369d4": {
        name: "rightful-adroit-clock",
        moduleKey: "aa77fa49-ee1c-4ab8-85a7-16e51d3369d4",
        type: "CLOCK",
        state: { tempo: 33 },
      },
      "de5cd8ba-8efb-4360-b724-9e2ec71f0f2d": {
        name: "choice-magenta-clock",
        moduleKey: "de5cd8ba-8efb-4360-b724-9e2ec71f0f2d",
        type: "CLOCK",
        state: { tempo: 11 },
      },
      "d2f1ad8d-d38a-4efc-87a7-a0eb2bed4974": {
        name: "native-muddled-gain",
        moduleKey: "d2f1ad8d-d38a-4efc-87a7-a0eb2bed4974",
        type: "GAIN",
        state: { gain: 0.33 },
      },
      "ba353d4f-3545-4377-a9a7-5a21256f51e3": {
        name: "shrewd-vagabond-oscillator",
        moduleKey: "ba353d4f-3545-4377-a9a7-5a21256f51e3",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: 0, waveform: "sine" },
      },
      "65a78bb1-615b-40d7-b925-c3e9679ff709": {
        name: "nostalgic-mountainous-oscillator",
        moduleKey: "65a78bb1-615b-40d7-b925-c3e9679ff709",
        type: "OSCILLATOR",
        state: { frequency: 0.75, detune: 0, waveform: "sine" },
      },
      "40f9ef83-0785-4e1d-a656-c3bec2a5fba1": {
        name: "giant-gratis-shift",
        moduleKey: "40f9ef83-0785-4e1d-a656-c3bec2a5fba1",
        type: "SHIFT",
        state: {
          inputMin: -1,
          inputMax: 1,
          outputMin: 0,
          outputMax: 0.0537109375,
        },
      },
    },
    modulePositions: {
      "0": [4473, 594],
      "34b7bf2e-72e9-4afc-892f-60361356e09c": [139, 241],
      "d81f383b-dec9-44d5-a331-1ba81753a0e2": [616, 71],
      "f8a46a2a-db5d-435a-81fa-a9c52cac1626": [945, 313],
      "4dc04834-c783-43c9-8a15-09df9899ed39": [1275, 614],
      "fa3d60a1-f682-4805-a465-afbf9a1fdbf8": [2070, 295],
      "b1dc70e1-55b3-431c-b985-acccadc31ec4": [2187, 726],
      "cf7deeda-e8a9-4d1e-83f6-970cb34e7518": [1755, 595],
      "0c958737-c114-4843-a52c-0bace77fa369": [818, 941],
      "7b50aa60-3cce-46f4-83d4-1981962cd7f8": [1268, 1013],
      "dfa97931-25d1-46db-adbb-c337f8c65982": [1755, 809],
      "3b7a8cf3-25d9-48d2-8d26-2de1efb3529a": [89, 745],
      "f14dd861-99dd-4c00-bb13-ef6462955a30": [432, 1012],
      "2d5be3db-76d3-41ba-abf1-97f6c89a65dc": [2664, 834],
      "537abdab-9ec8-4aa0-be12-d34e4db2f3f5": [2666, 1007],
      "5b1d4beb-97e6-4929-9c4a-01342a216de2": [3036, 869],
      "6f5defb4-185c-46d2-b21c-9aff722f3f7a": [1888, 1271],
      "315f8cf6-4e88-42e1-b53e-4230d4994a9f": [2261, 1316],
      "11507ca7-5a27-4a2b-91dc-f12310edab54": [1428, 1722],
      "58f2b7e3-5721-44a2-b114-60061df8bd4c": [1867, 1468],
      "f6dd6e51-8341-4c0f-be33-bb1712cdd6fe": [3427, 952],
      "659da035-abf8-4445-90c7-9c60e7fa6c39": [3688, 536],
      "7c9e66b3-892d-4a76-acf9-f21cb46e87d4": [3733, 163],
      "957279e1-a8f2-4452-a8c4-c1d974775653": [3279, 545],
      "1c1b2b43-d84b-47f2-9a47-5706d7ca088d": [2544, 92],
      "9c41f754-6e9d-43f5-b8cb-ed25c52fd0ec": [2756, 391],
      "8cd4cc71-0111-4d30-bc46-f76f4ec62a44": [3686, 966],
      "aa77fa49-ee1c-4ab8-85a7-16e51d3369d4": [1513, 1383],
      "de5cd8ba-8efb-4360-b724-9e2ec71f0f2d": [1141, 1474],
      "d2f1ad8d-d38a-4efc-87a7-a0eb2bed4974": [4069, 582],
      "ba353d4f-3545-4377-a9a7-5a21256f51e3": [2841, 1347],
      "65a78bb1-615b-40d7-b925-c3e9679ff709": [2949, 13],
      "40f9ef83-0785-4e1d-a656-c3bec2a5fba1": [3334, 152],
    },
    connections: {
      "34b7bf2e-72e9-4afc-892f-60361356e09c_1_0|d81f383b-dec9-44d5-a331-1ba81753a0e2_0_0":
        [
          {
            moduleKey: "34b7bf2e-72e9-4afc-892f-60361356e09c",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d81f383b-dec9-44d5-a331-1ba81753a0e2",
            type: 0,
            channel: 0,
          },
        ],
      "d81f383b-dec9-44d5-a331-1ba81753a0e2_1_0|f8a46a2a-db5d-435a-81fa-a9c52cac1626_detune":
        [
          {
            moduleKey: "d81f383b-dec9-44d5-a331-1ba81753a0e2",
            channel: 0,
            type: 1,
          },
          { moduleKey: "f8a46a2a-db5d-435a-81fa-a9c52cac1626", name: "detune" },
        ],
      "34b7bf2e-72e9-4afc-892f-60361356e09c_1_0|4dc04834-c783-43c9-8a15-09df9899ed39_0_1":
        [
          {
            moduleKey: "34b7bf2e-72e9-4afc-892f-60361356e09c",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "4dc04834-c783-43c9-8a15-09df9899ed39",
            type: 0,
            channel: 1,
          },
        ],
      "f8a46a2a-db5d-435a-81fa-a9c52cac1626_1_0|4dc04834-c783-43c9-8a15-09df9899ed39_0_0":
        [
          {
            moduleKey: "f8a46a2a-db5d-435a-81fa-a9c52cac1626",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "4dc04834-c783-43c9-8a15-09df9899ed39",
            type: 0,
            channel: 0,
          },
        ],
      "4dc04834-c783-43c9-8a15-09df9899ed39_1_0|fa3d60a1-f682-4805-a465-afbf9a1fdbf8_0_0":
        [
          {
            moduleKey: "4dc04834-c783-43c9-8a15-09df9899ed39",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "fa3d60a1-f682-4805-a465-afbf9a1fdbf8",
            channel: 0,
            type: 0,
          },
        ],
      "4dc04834-c783-43c9-8a15-09df9899ed39_1_0|cf7deeda-e8a9-4d1e-83f6-970cb34e7518_0_0":
        [
          {
            moduleKey: "4dc04834-c783-43c9-8a15-09df9899ed39",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "cf7deeda-e8a9-4d1e-83f6-970cb34e7518",
            type: 0,
            channel: 0,
          },
        ],
      "cf7deeda-e8a9-4d1e-83f6-970cb34e7518_1_0|b1dc70e1-55b3-431c-b985-acccadc31ec4_0_0":
        [
          {
            moduleKey: "cf7deeda-e8a9-4d1e-83f6-970cb34e7518",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b1dc70e1-55b3-431c-b985-acccadc31ec4",
            type: 0,
            channel: 0,
          },
        ],
      "d81f383b-dec9-44d5-a331-1ba81753a0e2_1_0|0c958737-c114-4843-a52c-0bace77fa369_detune":
        [
          {
            moduleKey: "d81f383b-dec9-44d5-a331-1ba81753a0e2",
            channel: 0,
            type: 1,
          },
          { moduleKey: "0c958737-c114-4843-a52c-0bace77fa369", name: "detune" },
        ],
      "0c958737-c114-4843-a52c-0bace77fa369_1_0|7b50aa60-3cce-46f4-83d4-1981962cd7f8_0_0":
        [
          {
            moduleKey: "0c958737-c114-4843-a52c-0bace77fa369",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7b50aa60-3cce-46f4-83d4-1981962cd7f8",
            type: 0,
            channel: 0,
          },
        ],
      "34b7bf2e-72e9-4afc-892f-60361356e09c_1_0|7b50aa60-3cce-46f4-83d4-1981962cd7f8_0_1":
        [
          {
            moduleKey: "34b7bf2e-72e9-4afc-892f-60361356e09c",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7b50aa60-3cce-46f4-83d4-1981962cd7f8",
            type: 0,
            channel: 1,
          },
        ],
      "7b50aa60-3cce-46f4-83d4-1981962cd7f8_1_0|dfa97931-25d1-46db-adbb-c337f8c65982_0_0":
        [
          {
            moduleKey: "7b50aa60-3cce-46f4-83d4-1981962cd7f8",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "dfa97931-25d1-46db-adbb-c337f8c65982",
            type: 0,
            channel: 0,
          },
        ],
      "dfa97931-25d1-46db-adbb-c337f8c65982_1_0|fa3d60a1-f682-4805-a465-afbf9a1fdbf8_0_0":
        [
          {
            moduleKey: "dfa97931-25d1-46db-adbb-c337f8c65982",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "fa3d60a1-f682-4805-a465-afbf9a1fdbf8",
            type: 0,
            channel: 0,
          },
        ],
      "7b50aa60-3cce-46f4-83d4-1981962cd7f8_1_0|b1dc70e1-55b3-431c-b985-acccadc31ec4_0_0":
        [
          {
            moduleKey: "7b50aa60-3cce-46f4-83d4-1981962cd7f8",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b1dc70e1-55b3-431c-b985-acccadc31ec4",
            type: 0,
            channel: 0,
          },
        ],
      "3b7a8cf3-25d9-48d2-8d26-2de1efb3529a_1_0|f14dd861-99dd-4c00-bb13-ef6462955a30_0_0":
        [
          {
            moduleKey: "3b7a8cf3-25d9-48d2-8d26-2de1efb3529a",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "f14dd861-99dd-4c00-bb13-ef6462955a30",
            type: 0,
            channel: 0,
          },
        ],
      "34b7bf2e-72e9-4afc-892f-60361356e09c_1_0|f14dd861-99dd-4c00-bb13-ef6462955a30_0_1":
        [
          {
            moduleKey: "34b7bf2e-72e9-4afc-892f-60361356e09c",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "f14dd861-99dd-4c00-bb13-ef6462955a30",
            type: 0,
            channel: 1,
          },
        ],
      "f14dd861-99dd-4c00-bb13-ef6462955a30_1_0|0c958737-c114-4843-a52c-0bace77fa369_detune":
        [
          {
            moduleKey: "f14dd861-99dd-4c00-bb13-ef6462955a30",
            channel: 0,
            type: 1,
          },
          { moduleKey: "0c958737-c114-4843-a52c-0bace77fa369", name: "detune" },
        ],
      "b1dc70e1-55b3-431c-b985-acccadc31ec4_1_0|2d5be3db-76d3-41ba-abf1-97f6c89a65dc_0_0":
        [
          {
            moduleKey: "b1dc70e1-55b3-431c-b985-acccadc31ec4",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "2d5be3db-76d3-41ba-abf1-97f6c89a65dc",
            type: 0,
            channel: 0,
          },
        ],
      "fa3d60a1-f682-4805-a465-afbf9a1fdbf8_1_0|2d5be3db-76d3-41ba-abf1-97f6c89a65dc_0_0":
        [
          {
            moduleKey: "fa3d60a1-f682-4805-a465-afbf9a1fdbf8",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "2d5be3db-76d3-41ba-abf1-97f6c89a65dc",
            type: 0,
            channel: 0,
          },
        ],
      "2d5be3db-76d3-41ba-abf1-97f6c89a65dc_1_0|537abdab-9ec8-4aa0-be12-d34e4db2f3f5_0_0":
        [
          {
            moduleKey: "2d5be3db-76d3-41ba-abf1-97f6c89a65dc",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "537abdab-9ec8-4aa0-be12-d34e4db2f3f5",
            type: 0,
            channel: 0,
          },
        ],
      "537abdab-9ec8-4aa0-be12-d34e4db2f3f5_1_0|2d5be3db-76d3-41ba-abf1-97f6c89a65dc_0_0":
        [
          {
            moduleKey: "537abdab-9ec8-4aa0-be12-d34e4db2f3f5",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "2d5be3db-76d3-41ba-abf1-97f6c89a65dc",
            type: 0,
            channel: 0,
          },
        ],
      "2d5be3db-76d3-41ba-abf1-97f6c89a65dc_1_0|5b1d4beb-97e6-4929-9c4a-01342a216de2_0_0":
        [
          {
            moduleKey: "2d5be3db-76d3-41ba-abf1-97f6c89a65dc",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "5b1d4beb-97e6-4929-9c4a-01342a216de2",
            type: 0,
            channel: 0,
          },
        ],
      "5b1d4beb-97e6-4929-9c4a-01342a216de2_1_0|537abdab-9ec8-4aa0-be12-d34e4db2f3f5_0_0":
        [
          {
            moduleKey: "5b1d4beb-97e6-4929-9c4a-01342a216de2",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "537abdab-9ec8-4aa0-be12-d34e4db2f3f5",
            type: 0,
            channel: 0,
          },
        ],
      "6f5defb4-185c-46d2-b21c-9aff722f3f7a_1_0|315f8cf6-4e88-42e1-b53e-4230d4994a9f_0_0":
        [
          {
            moduleKey: "6f5defb4-185c-46d2-b21c-9aff722f3f7a",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "315f8cf6-4e88-42e1-b53e-4230d4994a9f",
            channel: 0,
            type: 0,
          },
        ],
      "315f8cf6-4e88-42e1-b53e-4230d4994a9f_1_0|537abdab-9ec8-4aa0-be12-d34e4db2f3f5_gain":
        [
          {
            moduleKey: "315f8cf6-4e88-42e1-b53e-4230d4994a9f",
            channel: 0,
            type: 1,
          },
          { moduleKey: "537abdab-9ec8-4aa0-be12-d34e4db2f3f5", name: "gain" },
        ],
      "11507ca7-5a27-4a2b-91dc-f12310edab54_1_0|58f2b7e3-5721-44a2-b114-60061df8bd4c_0_0":
        [
          {
            moduleKey: "11507ca7-5a27-4a2b-91dc-f12310edab54",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "58f2b7e3-5721-44a2-b114-60061df8bd4c",
            type: 0,
            channel: 0,
          },
        ],
      "58f2b7e3-5721-44a2-b114-60061df8bd4c_1_0|315f8cf6-4e88-42e1-b53e-4230d4994a9f_steps":
        [
          {
            moduleKey: "58f2b7e3-5721-44a2-b114-60061df8bd4c",
            channel: 0,
            type: 1,
          },
          { moduleKey: "315f8cf6-4e88-42e1-b53e-4230d4994a9f", name: "steps" },
        ],
      "537abdab-9ec8-4aa0-be12-d34e4db2f3f5_1_0|f6dd6e51-8341-4c0f-be33-bb1712cdd6fe_0_0":
        [
          {
            moduleKey: "537abdab-9ec8-4aa0-be12-d34e4db2f3f5",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "f6dd6e51-8341-4c0f-be33-bb1712cdd6fe",
            type: 0,
            channel: 0,
          },
        ],
      "f6dd6e51-8341-4c0f-be33-bb1712cdd6fe_1_0|659da035-abf8-4445-90c7-9c60e7fa6c39_0_0":
        [
          {
            moduleKey: "f6dd6e51-8341-4c0f-be33-bb1712cdd6fe",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "659da035-abf8-4445-90c7-9c60e7fa6c39",
            type: 0,
            channel: 0,
          },
        ],
      "7c9e66b3-892d-4a76-acf9-f21cb46e87d4_1_0|957279e1-a8f2-4452-a8c4-c1d974775653_0_0":
        [
          {
            moduleKey: "7c9e66b3-892d-4a76-acf9-f21cb46e87d4",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "957279e1-a8f2-4452-a8c4-c1d974775653",
            type: 0,
            channel: 0,
          },
        ],
      "957279e1-a8f2-4452-a8c4-c1d974775653_1_0|659da035-abf8-4445-90c7-9c60e7fa6c39_detune":
        [
          {
            moduleKey: "957279e1-a8f2-4452-a8c4-c1d974775653",
            channel: 0,
            type: 1,
          },
          { moduleKey: "659da035-abf8-4445-90c7-9c60e7fa6c39", name: "detune" },
        ],
      "1c1b2b43-d84b-47f2-9a47-5706d7ca088d_1_0|9c41f754-6e9d-43f5-b8cb-ed25c52fd0ec_0_0":
        [
          {
            moduleKey: "1c1b2b43-d84b-47f2-9a47-5706d7ca088d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "9c41f754-6e9d-43f5-b8cb-ed25c52fd0ec",
            type: 0,
            channel: 0,
          },
        ],
      "9c41f754-6e9d-43f5-b8cb-ed25c52fd0ec_1_0|957279e1-a8f2-4452-a8c4-c1d974775653_gain":
        [
          {
            moduleKey: "9c41f754-6e9d-43f5-b8cb-ed25c52fd0ec",
            channel: 0,
            type: 1,
          },
          { moduleKey: "957279e1-a8f2-4452-a8c4-c1d974775653", name: "gain" },
        ],
      "f6dd6e51-8341-4c0f-be33-bb1712cdd6fe_1_0|8cd4cc71-0111-4d30-bc46-f76f4ec62a44_0_0":
        [
          {
            moduleKey: "f6dd6e51-8341-4c0f-be33-bb1712cdd6fe",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "8cd4cc71-0111-4d30-bc46-f76f4ec62a44",
            type: 0,
            channel: 0,
          },
        ],
      "8cd4cc71-0111-4d30-bc46-f76f4ec62a44_1_0|0_0_0": [
        {
          moduleKey: "8cd4cc71-0111-4d30-bc46-f76f4ec62a44",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "de5cd8ba-8efb-4360-b724-9e2ec71f0f2d_1_0|aa77fa49-ee1c-4ab8-85a7-16e51d3369d4_0_0":
        [
          {
            moduleKey: "de5cd8ba-8efb-4360-b724-9e2ec71f0f2d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "aa77fa49-ee1c-4ab8-85a7-16e51d3369d4",
            type: 0,
            channel: 0,
          },
        ],
      "de5cd8ba-8efb-4360-b724-9e2ec71f0f2d_1_0|11507ca7-5a27-4a2b-91dc-f12310edab54_0_0":
        [
          {
            moduleKey: "de5cd8ba-8efb-4360-b724-9e2ec71f0f2d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "11507ca7-5a27-4a2b-91dc-f12310edab54",
            type: 0,
            channel: 0,
          },
        ],
      "aa77fa49-ee1c-4ab8-85a7-16e51d3369d4_1_0|6f5defb4-185c-46d2-b21c-9aff722f3f7a_0_0":
        [
          {
            moduleKey: "aa77fa49-ee1c-4ab8-85a7-16e51d3369d4",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6f5defb4-185c-46d2-b21c-9aff722f3f7a",
            type: 0,
            channel: 0,
          },
        ],
      "659da035-abf8-4445-90c7-9c60e7fa6c39_1_0|d2f1ad8d-d38a-4efc-87a7-a0eb2bed4974_0_0":
        [
          {
            moduleKey: "659da035-abf8-4445-90c7-9c60e7fa6c39",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "d2f1ad8d-d38a-4efc-87a7-a0eb2bed4974",
            type: 0,
            channel: 0,
          },
        ],
      "d2f1ad8d-d38a-4efc-87a7-a0eb2bed4974_1_0|0_0_0": [
        {
          moduleKey: "d2f1ad8d-d38a-4efc-87a7-a0eb2bed4974",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "65a78bb1-615b-40d7-b925-c3e9679ff709_1_0|40f9ef83-0785-4e1d-a656-c3bec2a5fba1_0_0":
        [
          {
            moduleKey: "65a78bb1-615b-40d7-b925-c3e9679ff709",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "40f9ef83-0785-4e1d-a656-c3bec2a5fba1",
            type: 0,
            channel: 0,
          },
        ],
      "40f9ef83-0785-4e1d-a656-c3bec2a5fba1_1_0|7c9e66b3-892d-4a76-acf9-f21cb46e87d4_frequency":
        [
          {
            moduleKey: "40f9ef83-0785-4e1d-a656-c3bec2a5fba1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "7c9e66b3-892d-4a76-acf9-f21cb46e87d4",
            name: "frequency",
          },
        ],
      "de5cd8ba-8efb-4360-b724-9e2ec71f0f2d_1_0|34b7bf2e-72e9-4afc-892f-60361356e09c_0_0":
        [
          {
            moduleKey: "de5cd8ba-8efb-4360-b724-9e2ec71f0f2d",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "34b7bf2e-72e9-4afc-892f-60361356e09c",
            type: 0,
            channel: 0,
          },
        ],
    },
  },
};

const lll = {
  id: "d8ca07ab-1bb4-4d92-9dc3-100058afbd62",
  name: "lewd-little-line",
  slug: "lewd-little-line-d8ca07ab",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.45 },
      },
      "71985317-348e-4402-9cb6-1905b8918eb6": {
        name: "murky-makeshift-oscillator",
        moduleKey: "71985317-348e-4402-9cb6-1905b8918eb6",
        type: "OSCILLATOR",
        state: { frequency: 1760, detune: 500, waveform: "sine" },
      },
      "8fd32b6d-bbe2-4835-95c7-d61e98a11594": {
        name: "violet-civil-noise",
        moduleKey: "8fd32b6d-bbe2-4835-95c7-d61e98a11594",
        type: "NOISE",
        state: {},
      },
      "6ee99d78-8307-4b67-b269-f55db59c2f18": {
        name: "exuberant-ancient-vca",
        moduleKey: "6ee99d78-8307-4b67-b269-f55db59c2f18",
        type: "VCA",
        state: {
          gate: 0.0001,
          attack: 0.01,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 0.5,
        },
      },
      "143b7c8b-173e-4d01-bafa-c596d51aecf6": {
        name: "painful-frequent-vca",
        moduleKey: "143b7c8b-173e-4d01-bafa-c596d51aecf6",
        type: "VCA",
        state: {
          gate: 0.0001,
          attack: 0,
          decay: 0,
          sustain: 1,
          release: 0.1,
          peak: 1,
        },
      },
      "bff011e7-3f4f-4c6d-a9e0-df8c93221351": {
        name: "imported-tested-clock",
        moduleKey: "bff011e7-3f4f-4c6d-a9e0-df8c93221351",
        type: "CLOCK",
        state: { tempo: 120 },
      },
      "4925a597-594b-4087-9260-ba5e30055552": {
        name: "amazing-wicked-oscillator",
        moduleKey: "4925a597-594b-4087-9260-ba5e30055552",
        type: "OSCILLATOR",
        state: { frequency: 880, detune: 300, waveform: "sawtooth" },
      },
      "b2f95d53-3f3c-4bdb-81a6-d962700d27d1": {
        name: "prompt-fine-delay",
        moduleKey: "b2f95d53-3f3c-4bdb-81a6-d962700d27d1",
        type: "DELAY",
        state: { delayTime: 0.25 },
      },
      "b31ad3d9-6d87-45a2-b09b-062dceb9e820": {
        name: "chilly-exuberant-sequencer",
        moduleKey: "b31ad3d9-6d87-45a2-b09b-062dceb9e820",
        type: "SEQUENCER",
        state: {
          steps: 4,
          step0: 200,
          step1: 300,
          step2: 0,
          step3: 0,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "5d09f77b-342b-46e5-88f4-e89c0db74bbe": {
        name: "toothsome-imperfect-clock",
        moduleKey: "5d09f77b-342b-46e5-88f4-e89c0db74bbe",
        type: "CLOCK",
        state: { tempo: 480 },
      },
    },
    modulePositions: {
      "0": [2375, 893],
      "71985317-348e-4402-9cb6-1905b8918eb6": [1212, 806],
      "8fd32b6d-bbe2-4835-95c7-d61e98a11594": [1228, 1130],
      "6ee99d78-8307-4b67-b269-f55db59c2f18": [1654, 1196],
      "143b7c8b-173e-4d01-bafa-c596d51aecf6": [1669, 606],
      "bff011e7-3f4f-4c6d-a9e0-df8c93221351": [1136, 134],
      "4925a597-594b-4087-9260-ba5e30055552": [838, 935],
      "b2f95d53-3f3c-4bdb-81a6-d962700d27d1": [1663, 990],
      "b31ad3d9-6d87-45a2-b09b-062dceb9e820": [756, 553.3333129882812],
      "5d09f77b-342b-46e5-88f4-e89c0db74bbe": [912, 357],
    },
    connections: {
      "71985317-348e-4402-9cb6-1905b8918eb6_1_0|143b7c8b-173e-4d01-bafa-c596d51aecf6_0_0":
        [
          {
            moduleKey: "71985317-348e-4402-9cb6-1905b8918eb6",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "143b7c8b-173e-4d01-bafa-c596d51aecf6",
            type: 0,
            channel: 0,
          },
        ],
      "bff011e7-3f4f-4c6d-a9e0-df8c93221351_1_0|143b7c8b-173e-4d01-bafa-c596d51aecf6_0_1":
        [
          {
            moduleKey: "bff011e7-3f4f-4c6d-a9e0-df8c93221351",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "143b7c8b-173e-4d01-bafa-c596d51aecf6",
            type: 0,
            channel: 1,
          },
        ],
      "8fd32b6d-bbe2-4835-95c7-d61e98a11594_1_0|6ee99d78-8307-4b67-b269-f55db59c2f18_0_0":
        [
          {
            moduleKey: "8fd32b6d-bbe2-4835-95c7-d61e98a11594",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "6ee99d78-8307-4b67-b269-f55db59c2f18",
            channel: 0,
            type: 0,
          },
        ],
      "6ee99d78-8307-4b67-b269-f55db59c2f18_1_0|0_0_0": [
        {
          moduleKey: "6ee99d78-8307-4b67-b269-f55db59c2f18",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "143b7c8b-173e-4d01-bafa-c596d51aecf6_1_0|0_0_0": [
        {
          moduleKey: "143b7c8b-173e-4d01-bafa-c596d51aecf6",
          type: 1,
          channel: 0,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "4925a597-594b-4087-9260-ba5e30055552_1_0|143b7c8b-173e-4d01-bafa-c596d51aecf6_0_0":
        [
          {
            moduleKey: "4925a597-594b-4087-9260-ba5e30055552",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "143b7c8b-173e-4d01-bafa-c596d51aecf6",
            type: 0,
            channel: 0,
          },
        ],
      "bff011e7-3f4f-4c6d-a9e0-df8c93221351_1_0|b2f95d53-3f3c-4bdb-81a6-d962700d27d1_0_0":
        [
          {
            moduleKey: "bff011e7-3f4f-4c6d-a9e0-df8c93221351",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b2f95d53-3f3c-4bdb-81a6-d962700d27d1",
            type: 0,
            channel: 0,
          },
        ],
      "b2f95d53-3f3c-4bdb-81a6-d962700d27d1_1_0|6ee99d78-8307-4b67-b269-f55db59c2f18_0_1":
        [
          {
            moduleKey: "b2f95d53-3f3c-4bdb-81a6-d962700d27d1",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "6ee99d78-8307-4b67-b269-f55db59c2f18",
            type: 0,
            channel: 1,
          },
        ],
      "bff011e7-3f4f-4c6d-a9e0-df8c93221351_1_0|6ee99d78-8307-4b67-b269-f55db59c2f18_0_1":
        [
          {
            moduleKey: "bff011e7-3f4f-4c6d-a9e0-df8c93221351",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "6ee99d78-8307-4b67-b269-f55db59c2f18",
            type: 0,
            channel: 1,
          },
        ],
      "bff011e7-3f4f-4c6d-a9e0-df8c93221351_1_0|5d09f77b-342b-46e5-88f4-e89c0db74bbe_0_0":
        [
          {
            moduleKey: "bff011e7-3f4f-4c6d-a9e0-df8c93221351",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "5d09f77b-342b-46e5-88f4-e89c0db74bbe",
            type: 0,
            channel: 0,
          },
        ],
      "5d09f77b-342b-46e5-88f4-e89c0db74bbe_1_0|b31ad3d9-6d87-45a2-b09b-062dceb9e820_0_0":
        [
          {
            moduleKey: "5d09f77b-342b-46e5-88f4-e89c0db74bbe",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "b31ad3d9-6d87-45a2-b09b-062dceb9e820",
            type: 0,
            channel: 0,
          },
        ],
      "bff011e7-3f4f-4c6d-a9e0-df8c93221351_1_0|b31ad3d9-6d87-45a2-b09b-062dceb9e820_0_0":
        [
          {
            moduleKey: "bff011e7-3f4f-4c6d-a9e0-df8c93221351",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "b31ad3d9-6d87-45a2-b09b-062dceb9e820",
            type: 0,
            channel: 0,
          },
        ],
      "b31ad3d9-6d87-45a2-b09b-062dceb9e820_1_0|71985317-348e-4402-9cb6-1905b8918eb6_detune":
        [
          {
            moduleKey: "b31ad3d9-6d87-45a2-b09b-062dceb9e820",
            channel: 0,
            type: 1,
          },
          { moduleKey: "71985317-348e-4402-9cb6-1905b8918eb6", name: "detune" },
        ],
      "b31ad3d9-6d87-45a2-b09b-062dceb9e820_1_0|4925a597-594b-4087-9260-ba5e30055552_detune":
        [
          {
            moduleKey: "b31ad3d9-6d87-45a2-b09b-062dceb9e820",
            channel: 0,
            type: 1,
          },
          { moduleKey: "4925a597-594b-4087-9260-ba5e30055552", name: "detune" },
        ],
    },
  },
};

const www = {
  id: "f9ba409c-78e2-483b-b50d-34739a72b80a",
  name: "wry-willing-weight",
  slug: "wry-willing-weight-f9ba409c",
  state: {
    modules: {
      "0": {
        name: "output",
        moduleKey: "0",
        type: "OUTPUT",
        state: { gain: 0.45 },
      },
      "75cf420a-ce7c-449b-aff0-c66be42d8a7a": {
        name: "muddled-special-oscillator",
        moduleKey: "75cf420a-ce7c-449b-aff0-c66be42d8a7a",
        type: "OSCILLATOR",
        state: { frequency: 440, detune: 0, waveform: "sawtooth" },
      },
      "b4e65ac6-f7c7-48cb-a149-7ef6dc125f83": {
        name: "clear-languid-oscillator",
        moduleKey: "b4e65ac6-f7c7-48cb-a149-7ef6dc125f83",
        type: "OSCILLATOR",
        state: { frequency: 55, detune: 0, waveform: "square" },
      },
      "5cfcdfca-67a2-459f-9e7a-b38ed0971452": {
        name: "abiding-zonked-shift",
        moduleKey: "5cfcdfca-67a2-459f-9e7a-b38ed0971452",
        type: "SHIFT",
        state: { inputMin: -1, inputMax: 1, outputMin: 0, outputMax: 1200 },
      },
      "abb46cad-4978-4ee2-876e-f43d9cffb12e": {
        name: "try-courageous-clock",
        moduleKey: "abb46cad-4978-4ee2-876e-f43d9cffb12e",
        type: "CLOCK",
        state: { tempo: 132 },
      },
      "42599f30-bd64-4fdc-8ece-5cbb54d83c73": {
        name: "attractive-wooden-sequencer",
        moduleKey: "42599f30-bd64-4fdc-8ece-5cbb54d83c73",
        type: "SEQUENCER",
        state: {
          steps: 8,
          step0: -1200,
          step1: 0,
          step2: -1200,
          step3: -1200,
          step4: 800,
          step5: 800,
          step6: 0,
          step7: 1200,
        },
      },
      "dba2362c-024b-4bfd-9b1e-e8908ddc9140": {
        name: "acidic-outrageous-filter",
        moduleKey: "dba2362c-024b-4bfd-9b1e-e8908ddc9140",
        type: "FILTER",
        state: { frequency: 40, detune: 0, Q: -10, gain: 0, type: "lowpass" },
      },
      "dfa15098-e8a9-4e9d-b408-d49a5a619291": {
        name: "posh-holistic-shift",
        moduleKey: "dfa15098-e8a9-4e9d-b408-d49a5a619291",
        type: "SHIFT",
        state: { inputMin: 0, inputMax: 1200, outputMin: -1, outputMax: 1 },
      },
      "ba973bdf-5ed6-46c2-af57-df8e254017d7": {
        name: "chic-cynical-filter",
        moduleKey: "ba973bdf-5ed6-46c2-af57-df8e254017d7",
        type: "FILTER",
        state: { frequency: 700, detune: 0, Q: 10, gain: 0, type: "lowpass" },
      },
      "31833d1c-7569-4e4c-bb9a-f78cdf306193": {
        name: "truthful-goofy-envelope",
        moduleKey: "31833d1c-7569-4e4c-bb9a-f78cdf306193",
        type: "ENVELOPE",
        state: {
          gate: 0.001,
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.2,
          peak: 1200,
        },
      },
      "add90859-76e6-40ab-a03e-84caa57b0365": {
        name: "sincere-glorious-sequencer",
        moduleKey: "add90859-76e6-40ab-a03e-84caa57b0365",
        type: "SEQUENCER",
        state: {
          steps: 5,
          step0: 1,
          step1: 1,
          step2: 0,
          step3: 1,
          step4: 0,
          step5: 0,
          step6: 0,
          step7: 0,
        },
      },
      "021a453a-173d-408b-afe6-1adcd53f320f": {
        name: "driven-tropical-gain",
        moduleKey: "021a453a-173d-408b-afe6-1adcd53f320f",
        type: "GAIN",
        state: { gain: 0 },
      },
      "152b3614-cd63-47a8-b0ab-0d4d152b906e": {
        name: "miniature-driven-vca",
        moduleKey: "152b3614-cd63-47a8-b0ab-0d4d152b906e",
        type: "VCA",
        state: {
          gate: 0.001,
          attack: 0.05,
          decay: 0.1,
          sustain: 0.5,
          release: 0.3,
          peak: 1,
        },
      },
    },
    modulePositions: {
      "0": [3347, 638],
      "75cf420a-ce7c-449b-aff0-c66be42d8a7a": [1898, 651],
      "b4e65ac6-f7c7-48cb-a149-7ef6dc125f83": [1690, 141],
      "5cfcdfca-67a2-459f-9e7a-b38ed0971452": [2042, 280],
      "abb46cad-4978-4ee2-876e-f43d9cffb12e": [391, 152],
      "42599f30-bd64-4fdc-8ece-5cbb54d83c73": [813, 124],
      "dba2362c-024b-4bfd-9b1e-e8908ddc9140": [1382, 590],
      "dfa15098-e8a9-4e9d-b408-d49a5a619291": [2445, 278],
      "ba973bdf-5ed6-46c2-af57-df8e254017d7": [2968, 637],
      "31833d1c-7569-4e4c-bb9a-f78cdf306193": [1574, 1158],
      "add90859-76e6-40ab-a03e-84caa57b0365": [1141, 947],
      "021a453a-173d-408b-afe6-1adcd53f320f": [1998, 995],
      "152b3614-cd63-47a8-b0ab-0d4d152b906e": [2368, 626],
    },
    connections: {
      "b4e65ac6-f7c7-48cb-a149-7ef6dc125f83_1_0|5cfcdfca-67a2-459f-9e7a-b38ed0971452_0_0":
        [
          {
            moduleKey: "b4e65ac6-f7c7-48cb-a149-7ef6dc125f83",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "5cfcdfca-67a2-459f-9e7a-b38ed0971452",
            type: 0,
            channel: 0,
          },
        ],
      "5cfcdfca-67a2-459f-9e7a-b38ed0971452_1_0|75cf420a-ce7c-449b-aff0-c66be42d8a7a_detune":
        [
          {
            moduleKey: "5cfcdfca-67a2-459f-9e7a-b38ed0971452",
            channel: 0,
            type: 1,
          },
          { moduleKey: "75cf420a-ce7c-449b-aff0-c66be42d8a7a", name: "detune" },
        ],
      "42599f30-bd64-4fdc-8ece-5cbb54d83c73_1_0|dba2362c-024b-4bfd-9b1e-e8908ddc9140_0_0":
        [
          {
            moduleKey: "42599f30-bd64-4fdc-8ece-5cbb54d83c73",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "dba2362c-024b-4bfd-9b1e-e8908ddc9140",
            type: 0,
            channel: 0,
          },
        ],
      "dba2362c-024b-4bfd-9b1e-e8908ddc9140_1_0|b4e65ac6-f7c7-48cb-a149-7ef6dc125f83_detune":
        [
          {
            moduleKey: "dba2362c-024b-4bfd-9b1e-e8908ddc9140",
            channel: 0,
            type: 1,
          },
          { moduleKey: "b4e65ac6-f7c7-48cb-a149-7ef6dc125f83", name: "detune" },
        ],
      "dba2362c-024b-4bfd-9b1e-e8908ddc9140_1_0|75cf420a-ce7c-449b-aff0-c66be42d8a7a_detune":
        [
          {
            moduleKey: "dba2362c-024b-4bfd-9b1e-e8908ddc9140",
            channel: 0,
            type: 1,
          },
          { moduleKey: "75cf420a-ce7c-449b-aff0-c66be42d8a7a", name: "detune" },
        ],
      "dba2362c-024b-4bfd-9b1e-e8908ddc9140_1_0|5cfcdfca-67a2-459f-9e7a-b38ed0971452_output-max":
        [
          {
            moduleKey: "dba2362c-024b-4bfd-9b1e-e8908ddc9140",
            type: 1,
            channel: 0,
          },
          {
            moduleKey: "5cfcdfca-67a2-459f-9e7a-b38ed0971452",
            name: "output-max",
          },
        ],
      "5cfcdfca-67a2-459f-9e7a-b38ed0971452_1_0|dfa15098-e8a9-4e9d-b408-d49a5a619291_0_0":
        [
          {
            moduleKey: "5cfcdfca-67a2-459f-9e7a-b38ed0971452",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "dfa15098-e8a9-4e9d-b408-d49a5a619291",
            type: 0,
            channel: 0,
          },
        ],
      "dfa15098-e8a9-4e9d-b408-d49a5a619291_1_0|ba973bdf-5ed6-46c2-af57-df8e254017d7_0_0":
        [
          {
            moduleKey: "dfa15098-e8a9-4e9d-b408-d49a5a619291",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "ba973bdf-5ed6-46c2-af57-df8e254017d7",
            type: 0,
            channel: 0,
          },
        ],
      "ba973bdf-5ed6-46c2-af57-df8e254017d7_1_0|0_0_0": [
        {
          moduleKey: "ba973bdf-5ed6-46c2-af57-df8e254017d7",
          channel: 0,
          type: 1,
        },
        { moduleKey: "0", type: 0, channel: 0 },
      ],
      "abb46cad-4978-4ee2-876e-f43d9cffb12e_1_0|31833d1c-7569-4e4c-bb9a-f78cdf306193_0_0":
        [
          {
            moduleKey: "abb46cad-4978-4ee2-876e-f43d9cffb12e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "31833d1c-7569-4e4c-bb9a-f78cdf306193",
            type: 0,
            channel: 0,
          },
        ],
      "add90859-76e6-40ab-a03e-84caa57b0365_1_0|021a453a-173d-408b-afe6-1adcd53f320f_gain":
        [
          {
            moduleKey: "add90859-76e6-40ab-a03e-84caa57b0365",
            channel: 0,
            type: 1,
          },
          { moduleKey: "021a453a-173d-408b-afe6-1adcd53f320f", name: "gain" },
        ],
      "31833d1c-7569-4e4c-bb9a-f78cdf306193_1_0|021a453a-173d-408b-afe6-1adcd53f320f_0_0":
        [
          {
            moduleKey: "31833d1c-7569-4e4c-bb9a-f78cdf306193",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "021a453a-173d-408b-afe6-1adcd53f320f",
            type: 0,
            channel: 0,
          },
        ],
      "021a453a-173d-408b-afe6-1adcd53f320f_1_0|ba973bdf-5ed6-46c2-af57-df8e254017d7_detune":
        [
          {
            moduleKey: "021a453a-173d-408b-afe6-1adcd53f320f",
            channel: 0,
            type: 1,
          },
          { moduleKey: "ba973bdf-5ed6-46c2-af57-df8e254017d7", name: "detune" },
        ],
      "75cf420a-ce7c-449b-aff0-c66be42d8a7a_1_0|152b3614-cd63-47a8-b0ab-0d4d152b906e_0_0":
        [
          {
            moduleKey: "75cf420a-ce7c-449b-aff0-c66be42d8a7a",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "152b3614-cd63-47a8-b0ab-0d4d152b906e",
            type: 0,
            channel: 0,
          },
        ],
      "152b3614-cd63-47a8-b0ab-0d4d152b906e_1_0|ba973bdf-5ed6-46c2-af57-df8e254017d7_0_0":
        [
          {
            moduleKey: "152b3614-cd63-47a8-b0ab-0d4d152b906e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "ba973bdf-5ed6-46c2-af57-df8e254017d7",
            type: 0,
            channel: 0,
          },
        ],
      "abb46cad-4978-4ee2-876e-f43d9cffb12e_1_0|42599f30-bd64-4fdc-8ece-5cbb54d83c73_0_0":
        [
          {
            moduleKey: "abb46cad-4978-4ee2-876e-f43d9cffb12e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "42599f30-bd64-4fdc-8ece-5cbb54d83c73",
            type: 0,
            channel: 0,
          },
        ],
      "abb46cad-4978-4ee2-876e-f43d9cffb12e_1_0|152b3614-cd63-47a8-b0ab-0d4d152b906e_0_1":
        [
          {
            moduleKey: "abb46cad-4978-4ee2-876e-f43d9cffb12e",
            channel: 0,
            type: 1,
          },
          {
            moduleKey: "152b3614-cd63-47a8-b0ab-0d4d152b906e",
            type: 0,
            channel: 1,
          },
        ],
    },
  },
};

export const patches = [
  aaa,
  nnn,
  jjj,
  rrr,
  sss,
  ppp,
  fff,
  ccc,
  sss2,
  ddd,
  ggg,
  sss3,
  ggg2,
  aaa2,
  vvv,
  sss4,
  lll,
  www,
];
