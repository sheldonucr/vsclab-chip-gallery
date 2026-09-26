window.DESIGNS = [
 {
  "slug": "orfs-nangate45-lenet5-htcr",
  "name": "LeNet-5 accelerator — HTC-R array",
  "blurb": "A complete LeNet-5 inference accelerator built around a precision-scalable hybrid temporal computing (HTC-R) array. One stored 8-bit weight set serves 4- and 8-bit activations without reconfiguration: at 4 bits a vector takes one clock, above that the array runs temporally and stops early. Buffers, sliding window, pooling, requantization and argmax are all on the die.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "nangate45",
  "pdkLabel": "FreePDK45 / Nangate45",
  "node": "45 nm",
  "pdkNote": "The Nangate Open Cell Library on FreePDK45. It is an academic platform rather than a manufacturable process, and has long served as a reference for EDA research and flow bring-up.",
  "head": [
   [
    "Die",
    "846 × 846 µm"
   ],
   [
    "Instances",
    "175,141"
   ],
   [
    "F<sub>max</sub>",
    "401.55 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "45 nm — FreePDK45 / Nangate45"
   ],
   [
    "Standard-cell library",
    "NangateOpenCellLibrary"
   ],
   [
    "Top module",
    "lenet_acc"
   ],
   [
    "Die size",
    "845.50 × 845.50 µm"
   ],
   [
    "Die area",
    "714,870 µm²"
   ],
   [
    "Core area",
    "710,666 µm²"
   ],
   [
    "Instances (excl. filler)",
    "175,141"
   ],
   [
    "Standard cells",
    "175,141"
   ],
   [
    "Sequential cells",
    "45,935"
   ],
   [
    "Tap cells",
    "3,318"
   ],
   [
    "Filler cells",
    "176,239"
   ],
   [
    "Total placed cells",
    "350,209"
   ],
   [
    "Cell area",
    "414,055 µm²"
   ],
   [
    "Core utilisation",
    "58.3 %"
   ],
   [
    "I/O pins",
    "171"
   ],
   [
    "Target clock",
    "2.5 ns (400.00 MHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "401.55 MHz"
   ],
   [
    "Setup WNS",
    "0.009678 ns"
   ],
   [
    "Setup TNS",
    "0 ns"
   ],
   [
    "Hold WNS",
    "0.01165 ns"
   ],
   [
    "Routed wirelength",
    "3,422,114 µm"
   ],
   [
    "Routed nets",
    "225,724"
   ],
   [
    "Vias",
    "1,135,618"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "32.7 mW measured — average over a 4-bit inference at 400 MHz (gate-level simulation)"
   ],
   [
    "GDS-II size",
    "138.9 MB"
   ],
   [
    "Function",
    "LeNet-5 inference for Fashion-MNIST — convolution, pooling, fully connected layers and argmax"
   ],
   [
    "Compute array",
    "16 × 16 weight-stationary HTC-R array — hybrid temporal computing with run-time precision: 16 stream bits per clock, one stored 8-bit weight set serving 3- to 8-bit activations, early termination and clock gating"
   ],
   [
    "What HTC-R is",
    "Hybrid temporal computing with run-time precision. A product is the number of 1s in the AND of two bitstreams: the activation as a thermometer code, 1 for its first x positions, and the weight with each of its bits repeated at binary-weighted positions (the top bit every second position, the next every fourth, and so on). Earlier HTC designs stepped through that stream one bit per clock; HTC-R counts 16 stream bits per clock in closed form, so each processing element is four AND gates and a 5-bit adder, with no multiplier. Because the weight stream visits the weight bits most-significant first, an n-bit activation only ever reads the top n bits of the stored weight: one 8-bit weight set serves every precision from 3 to 8 bits, and the activations alone set it — one clock per vector up to 4 bits, a few clocks with early termination above."
   ],
   [
    "On-chip storage",
    "Row-banked register-file activation buffers, a 5 × 5 × C sliding window and a 56-entry partial-sum buffer, clock-gated per word; weights off-core behind a 128-bit read port"
   ],
   [
    "Operating points",
    "4-bit, 4-bit with temporal oversampling, 8-bit — the same stored weights"
   ],
   [
    "Accuracy",
    "89.83 % / 90.14 % / 90.31 % on the 10,000 test images (hardware-exact integer model)"
   ],
   [
    "Energy per inference",
    "1.02 µJ / 1.17 µJ / 2.47 µJ — gate-level simulation of whole inferences on the routed netlist with extracted parasitics, including the weight-memory reads"
   ],
   [
    "Latency",
    "29.8 µs / 33.9 µs / 91.3 µs at 400 MHz"
   ],
   [
    "Verification",
    "RTL bit-exact against the integer model on 2,000 test images per operating point; every gate-level inference returns the model's class"
   ],
   [
    "Companion design",
    "Built twice with everything but the array identical — see the binary-array version"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-nangate45-lenet5-htcr/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-htcr/blocks.webp",
    "cap": "Block map — every placed cell coloured by the functional block it belongs to"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-htcr/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-htcr/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-htcr/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-htcr/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-htcr/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-htcr/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-htcr/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-htcr/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-htcr/cts_core_clock.webp",
    "cap": "Clock tree — core_clock"
   }
  ],
  "searchText": "lenet-5 accelerator — htc-r array a complete lenet-5 inference accelerator built around a precision-scalable hybrid temporal computing (htc-r) array. one stored 8-bit weight set serves 4- and 8-bit activations without reconfiguration: at 4 bits a vector takes one clock, above that the array runs temporally and stops early. buffers, sliding window, pooling, requantization and argmax are all on the die. openroad-flow-scripts (orfs) freepdk45 / nangate45 45 nm technology 45 nm — freepdk45 / nangate45 standard-cell library nangateopencelllibrary top module lenet_acc die size 845.50 × 845.50 µm die area 714,870 µm² core area 710,666 µm² instances (excl. filler) 175,141 standard cells 175,141 sequential cells 45,935 tap cells 3,318 filler cells 176,239 total placed cells 350,209 cell area 414,055 µm² core utilisation 58.3 % i/o pins 171 target clock 2.5 ns (400.00 mhz) achieved f<sub>max</sub> 401.55 mhz setup wns 0.009678 ns setup tns 0 ns hold wns 0.01165 ns routed wirelength 3,422,114 µm routed nets 225,724 vias 1,135,618 detailed-route drc 0 antenna-violating nets 0 total power 32.7 mw measured — average over a 4-bit inference at 400 mhz (gate-level simulation) gds-ii size 138.9 mb function lenet-5 inference for fashion-mnist — convolution, pooling, fully connected layers and argmax compute array 16 × 16 weight-stationary htc-r array — hybrid temporal computing with run-time precision: 16 stream bits per clock, one stored 8-bit weight set serving 3- to 8-bit activations, early termination and clock gating what htc-r is hybrid temporal computing with run-time precision. a product is the number of 1s in the and of two bitstreams: the activation as a thermometer code, 1 for its first x positions, and the weight with each of its bits repeated at binary-weighted positions (the top bit every second position, the next every fourth, and so on). earlier htc designs stepped through that stream one bit per clock; htc-r counts 16 stream bits per clock in closed form, so each processing element is four and gates and a 5-bit adder, with no multiplier. because the weight stream visits the weight bits most-significant first, an n-bit activation only ever reads the top n bits of the stored weight: one 8-bit weight set serves every precision from 3 to 8 bits, and the activations alone set it — one clock per vector up to 4 bits, a few clocks with early termination above. on-chip storage row-banked register-file activation buffers, a 5 × 5 × c sliding window and a 56-entry partial-sum buffer, clock-gated per word; weights off-core behind a 128-bit read port operating points 4-bit, 4-bit with temporal oversampling, 8-bit — the same stored weights accuracy 89.83 % / 90.14 % / 90.31 % on the 10,000 test images (hardware-exact integer model) energy per inference 1.02 µj / 1.17 µj / 2.47 µj — gate-level simulation of whole inferences on the routed netlist with extracted parasitics, including the weight-memory reads latency 29.8 µs / 33.9 µs / 91.3 µs at 400 mhz verification rtl bit-exact against the integer model on 2,000 test images per operating point; every gate-level inference returns the model's class companion design built twice with everything but the array identical — see the binary-array version"
 },
 {
  "slug": "orfs-nangate45-lenet5-binary",
  "name": "LeNet-5 accelerator — binary array",
  "blurb": "The same LeNet-5 accelerator built around a conventional 16 × 16 binary multiplier array: the baseline for the HTC-R version, with identical buffers, sliding window, pooling, requantization and control.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "nangate45",
  "pdkLabel": "FreePDK45 / Nangate45",
  "node": "45 nm",
  "pdkNote": "The Nangate Open Cell Library on FreePDK45. It is an academic platform rather than a manufacturable process, and has long served as a reference for EDA research and flow bring-up.",
  "head": [
   [
    "Die",
    "986 × 986 µm"
   ],
   [
    "Instances",
    "258,995"
   ],
   [
    "F<sub>max</sub>",
    "402.91 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "45 nm — FreePDK45 / Nangate45"
   ],
   [
    "Standard-cell library",
    "NangateOpenCellLibrary"
   ],
   [
    "Top module",
    "lenet_acc"
   ],
   [
    "Die size",
    "985.70 × 985.70 µm"
   ],
   [
    "Die area",
    "971,604 µm²"
   ],
   [
    "Core area",
    "966,525 µm²"
   ],
   [
    "Instances (excl. filler)",
    "258,995"
   ],
   [
    "Standard cells",
    "258,995"
   ],
   [
    "Sequential cells",
    "51,129"
   ],
   [
    "Tap cells",
    "4,220"
   ],
   [
    "Filler cells",
    "246,655"
   ],
   [
    "Total placed cells",
    "504,481"
   ],
   [
    "Cell area",
    "557,052 µm²"
   ],
   [
    "Core utilisation",
    "57.6 %"
   ],
   [
    "I/O pins",
    "171"
   ],
   [
    "Target clock",
    "2.5 ns (400.00 MHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "402.91 MHz"
   ],
   [
    "Setup WNS",
    "0.01805 ns"
   ],
   [
    "Setup TNS",
    "0 ns"
   ],
   [
    "Hold WNS",
    "-0.004851 ns"
   ],
   [
    "Routed wirelength",
    "4,553,788 µm"
   ],
   [
    "Routed nets",
    "329,165"
   ],
   [
    "Vias",
    "1,655,764"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "41.2 mW measured — average over a W4A4 inference at 400 MHz (gate-level simulation)"
   ],
   [
    "GDS-II size",
    "201.9 MB"
   ],
   [
    "Function",
    "LeNet-5 inference for Fashion-MNIST — convolution, pooling, fully connected layers and argmax"
   ],
   [
    "Compute array",
    "16 × 16 weight-stationary binary array — 8-bit sign-magnitude multipliers and adder trees, one input vector per clock"
   ],
   [
    "On-chip storage",
    "Row-banked register-file activation buffers, a 5 × 5 × C sliding window and a 56-entry partial-sum buffer, clock-gated per word; weights off-core behind a 128-bit read port"
   ],
   [
    "Operating points",
    "W4A4 (4-bit weights and activations) and W8A8"
   ],
   [
    "Accuracy",
    "90.51 % / 90.57 % on the 10,000 test images (hardware-exact integer model)"
   ],
   [
    "Energy per inference",
    "1.27 µJ / 1.53 µJ — gate-level simulation of whole inferences on the routed netlist with extracted parasitics, including the weight-memory reads"
   ],
   [
    "Latency",
    "29.8 µs at 400 MHz"
   ],
   [
    "Verification",
    "RTL bit-exact against the integer model on 2,000 test images per operating point; every gate-level inference returns the model's class"
   ],
   [
    "Companion design",
    "Built twice with everything but the array identical — see the HTC-R version"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-nangate45-lenet5-binary/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-binary/blocks.webp",
    "cap": "Block map — every placed cell coloured by the functional block it belongs to"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-binary/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-binary/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-binary/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-binary/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-binary/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-binary/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-binary/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-binary/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-nangate45-lenet5-binary/cts_core_clock.webp",
    "cap": "Clock tree — core_clock"
   }
  ],
  "searchText": "lenet-5 accelerator — binary array the same lenet-5 accelerator built around a conventional 16 × 16 binary multiplier array: the baseline for the htc-r version, with identical buffers, sliding window, pooling, requantization and control. openroad-flow-scripts (orfs) freepdk45 / nangate45 45 nm technology 45 nm — freepdk45 / nangate45 standard-cell library nangateopencelllibrary top module lenet_acc die size 985.70 × 985.70 µm die area 971,604 µm² core area 966,525 µm² instances (excl. filler) 258,995 standard cells 258,995 sequential cells 51,129 tap cells 4,220 filler cells 246,655 total placed cells 504,481 cell area 557,052 µm² core utilisation 57.6 % i/o pins 171 target clock 2.5 ns (400.00 mhz) achieved f<sub>max</sub> 402.91 mhz setup wns 0.01805 ns setup tns 0 ns hold wns -0.004851 ns routed wirelength 4,553,788 µm routed nets 329,165 vias 1,655,764 detailed-route drc 0 antenna-violating nets 0 total power 41.2 mw measured — average over a w4a4 inference at 400 mhz (gate-level simulation) gds-ii size 201.9 mb function lenet-5 inference for fashion-mnist — convolution, pooling, fully connected layers and argmax compute array 16 × 16 weight-stationary binary array — 8-bit sign-magnitude multipliers and adder trees, one input vector per clock on-chip storage row-banked register-file activation buffers, a 5 × 5 × c sliding window and a 56-entry partial-sum buffer, clock-gated per word; weights off-core behind a 128-bit read port operating points w4a4 (4-bit weights and activations) and w8a8 accuracy 90.51 % / 90.57 % on the 10,000 test images (hardware-exact integer model) energy per inference 1.27 µj / 1.53 µj — gate-level simulation of whole inferences on the routed netlist with extracted parasitics, including the weight-memory reads latency 29.8 µs at 400 mhz verification rtl bit-exact against the integer model on 2,000 test images per operating point; every gate-level inference returns the model's class companion design built twice with everything but the array identical — see the htc-r version"
 },
 {
  "slug": "orfs-nangate45-resnet20-htcr",
  "name": "ResNet-20 accelerator — HTC-R array",
  "blurb": "A complete ResNet-20 inference accelerator for CIFAR-10 built around a precision-scalable hybrid temporal computing (HTC-R) array. Feature maps live in twelve SRAM macros; 3 × 3 convolutions with zero padding and stride 2 are streamed from them, batch normalization and the residual additions are folded into requantization, and global average pooling, the classifier and argmax finish the network on chip.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "nangate45",
  "pdkLabel": "FreePDK45 / Nangate45",
  "node": "45 nm",
  "pdkNote": "The Nangate Open Cell Library on FreePDK45. It is an academic platform rather than a manufacturable process, and has long served as a reference for EDA research and flow bring-up.",
  "head": [
   [
    "Die",
    "1050 × 1050 µm"
   ],
   [
    "Instances",
    "153,447"
   ],
   [
    "F<sub>max</sub>",
    "403.20 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "45 nm — FreePDK45 / Nangate45"
   ],
   [
    "Standard-cell library",
    "NangateOpenCellLibrary"
   ],
   [
    "Top module",
    "resnet_acc"
   ],
   [
    "Die size",
    "1049.79 × 1049.79 µm"
   ],
   [
    "Die area",
    "1.102 mm² (1,102,050 µm²)"
   ],
   [
    "Core area",
    "1.097 mm² (1,096,910 µm²)"
   ],
   [
    "Instances (excl. filler)",
    "153,447"
   ],
   [
    "Standard cells",
    "153,435"
   ],
   [
    "Hard macros",
    "12"
   ],
   [
    "Sequential cells",
    "28,940"
   ],
   [
    "Tap cells",
    "5,935"
   ],
   [
    "Filler cells",
    "214,875"
   ],
   [
    "Total placed cells",
    "368,216"
   ],
   [
    "Cell area",
    "514,959 µm²"
   ],
   [
    "Core utilisation",
    "46.9 %"
   ],
   [
    "I/O pins",
    "294"
   ],
   [
    "Target clock",
    "2.5 ns (400.00 MHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "403.20 MHz"
   ],
   [
    "Setup WNS",
    "0.01984 ns"
   ],
   [
    "Setup TNS",
    "0 ns"
   ],
   [
    "Hold WNS",
    "0.001869 ns"
   ],
   [
    "Routed wirelength",
    "3,795,754 µm"
   ],
   [
    "Routed nets",
    "187,804"
   ],
   [
    "Vias",
    "954,900"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "62.4 mW measured — average over a 4-bit inference at 400 MHz (gate-level simulation)"
   ],
   [
    "GDS-II size",
    "121.6 MB"
   ],
   [
    "Function",
    "ResNet-20 inference for CIFAR-10 — 19 convolutions with residual blocks, global average pooling, classifier and argmax"
   ],
   [
    "Compute array",
    "16 × 16 weight-stationary HTC-R array — hybrid temporal computing with run-time precision: 16 stream bits per clock, one stored 8-bit weight set serving 3- to 8-bit activations, early termination and clock gating"
   ],
   [
    "What HTC-R is",
    "Hybrid temporal computing with run-time precision. A product is the number of 1s in the AND of two bitstreams: the activation as a thermometer code, 1 for its first x positions, and the weight with each of its bits repeated at binary-weighted positions (the top bit every second position, the next every fourth, and so on). Earlier HTC designs stepped through that stream one bit per clock; HTC-R counts 16 stream bits per clock in closed form, so each processing element is four AND gates and a 5-bit adder, with no multiplier. Because the weight stream visits the weight bits most-significant first, an n-bit activation only ever reads the top n bits of the stored weight: one 8-bit weight set serves every precision from 3 to 8 bits, and the activations alone set it — one clock per vector up to 4 bits, a few clocks with early termination above."
   ],
   [
    "On-chip storage",
    "Three 1024 × 128-bit activation buffers built from 12 fakeram45_1024x32 SRAM macros, clock-gated per buffer, and a 64-entry partial-sum buffer; weights off-core behind a 128-bit read port"
   ],
   [
    "Operating points",
    "4-bit, 4-bit with temporal oversampling, 8-bit — the same stored weights"
   ],
   [
    "Accuracy",
    "90.25 % / 90.97 % / 91.28 % on the 10,000 test images (hardware-exact integer model)"
   ],
   [
    "Energy per inference",
    "37.4 µJ / 43.0 µJ / 116.7 µJ — gate-level simulation of whole inferences on the routed netlist with extracted parasitics, including the weight-memory reads"
   ],
   [
    "Latency",
    "591 µs / 713 µs / 3,245 µs at 400 MHz"
   ],
   [
    "Verification",
    "RTL bit-exact against the integer model on 200 test images per operating point; every gate-level inference returns the model's class"
   ],
   [
    "SRAM macros",
    "fakeram45 models from the OpenROAD Nangate45 platform — abstracts without internal layout; the GDS-II rendering shows their outlines, pins and the power straps routed over them"
   ],
   [
    "Companion design",
    "Built twice with everything but the array identical — see the binary-array version"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-nangate45-resnet20-htcr/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-htcr/blocks.webp",
    "cap": "Block map — every placed cell coloured by the functional block it belongs to"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-htcr/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-htcr/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-htcr/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-htcr/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-htcr/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-htcr/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-htcr/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-htcr/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-htcr/cts_core_clock.webp",
    "cap": "Clock tree — core_clock"
   }
  ],
  "searchText": "resnet-20 accelerator — htc-r array a complete resnet-20 inference accelerator for cifar-10 built around a precision-scalable hybrid temporal computing (htc-r) array. feature maps live in twelve sram macros; 3 × 3 convolutions with zero padding and stride 2 are streamed from them, batch normalization and the residual additions are folded into requantization, and global average pooling, the classifier and argmax finish the network on chip. openroad-flow-scripts (orfs) freepdk45 / nangate45 45 nm technology 45 nm — freepdk45 / nangate45 standard-cell library nangateopencelllibrary top module resnet_acc die size 1049.79 × 1049.79 µm die area 1.102 mm² (1,102,050 µm²) core area 1.097 mm² (1,096,910 µm²) instances (excl. filler) 153,447 standard cells 153,435 hard macros 12 sequential cells 28,940 tap cells 5,935 filler cells 214,875 total placed cells 368,216 cell area 514,959 µm² core utilisation 46.9 % i/o pins 294 target clock 2.5 ns (400.00 mhz) achieved f<sub>max</sub> 403.20 mhz setup wns 0.01984 ns setup tns 0 ns hold wns 0.001869 ns routed wirelength 3,795,754 µm routed nets 187,804 vias 954,900 detailed-route drc 0 antenna-violating nets 0 total power 62.4 mw measured — average over a 4-bit inference at 400 mhz (gate-level simulation) gds-ii size 121.6 mb function resnet-20 inference for cifar-10 — 19 convolutions with residual blocks, global average pooling, classifier and argmax compute array 16 × 16 weight-stationary htc-r array — hybrid temporal computing with run-time precision: 16 stream bits per clock, one stored 8-bit weight set serving 3- to 8-bit activations, early termination and clock gating what htc-r is hybrid temporal computing with run-time precision. a product is the number of 1s in the and of two bitstreams: the activation as a thermometer code, 1 for its first x positions, and the weight with each of its bits repeated at binary-weighted positions (the top bit every second position, the next every fourth, and so on). earlier htc designs stepped through that stream one bit per clock; htc-r counts 16 stream bits per clock in closed form, so each processing element is four and gates and a 5-bit adder, with no multiplier. because the weight stream visits the weight bits most-significant first, an n-bit activation only ever reads the top n bits of the stored weight: one 8-bit weight set serves every precision from 3 to 8 bits, and the activations alone set it — one clock per vector up to 4 bits, a few clocks with early termination above. on-chip storage three 1024 × 128-bit activation buffers built from 12 fakeram45_1024x32 sram macros, clock-gated per buffer, and a 64-entry partial-sum buffer; weights off-core behind a 128-bit read port operating points 4-bit, 4-bit with temporal oversampling, 8-bit — the same stored weights accuracy 90.25 % / 90.97 % / 91.28 % on the 10,000 test images (hardware-exact integer model) energy per inference 37.4 µj / 43.0 µj / 116.7 µj — gate-level simulation of whole inferences on the routed netlist with extracted parasitics, including the weight-memory reads latency 591 µs / 713 µs / 3,245 µs at 400 mhz verification rtl bit-exact against the integer model on 200 test images per operating point; every gate-level inference returns the model's class sram macros fakeram45 models from the openroad nangate45 platform — abstracts without internal layout; the gds-ii rendering shows their outlines, pins and the power straps routed over them companion design built twice with everything but the array identical — see the binary-array version"
 },
 {
  "slug": "orfs-nangate45-resnet20-binary",
  "name": "ResNet-20 accelerator — binary array",
  "blurb": "The same ResNet-20 accelerator built around a conventional 16 × 16 binary multiplier array: the baseline for the HTC-R version, with the same twelve SRAM macros, streaming, requantization, pooling and control.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "nangate45",
  "pdkLabel": "FreePDK45 / Nangate45",
  "node": "45 nm",
  "pdkNote": "The Nangate Open Cell Library on FreePDK45. It is an academic platform rather than a manufacturable process, and has long served as a reference for EDA research and flow bring-up.",
  "head": [
   [
    "Die",
    "1190 × 1190 µm"
   ],
   [
    "Instances",
    "233,222"
   ],
   [
    "F<sub>max</sub>",
    "404.42 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "45 nm — FreePDK45 / Nangate45"
   ],
   [
    "Standard-cell library",
    "NangateOpenCellLibrary"
   ],
   [
    "Top module",
    "resnet_acc"
   ],
   [
    "Die size",
    "1189.87 × 1189.87 µm"
   ],
   [
    "Die area",
    "1.416 mm² (1,415,780 µm²)"
   ],
   [
    "Core area",
    "1.410 mm² (1,410,030 µm²)"
   ],
   [
    "Instances (excl. filler)",
    "233,222"
   ],
   [
    "Standard cells",
    "233,210"
   ],
   [
    "Hard macros",
    "12"
   ],
   [
    "Sequential cells",
    "34,902"
   ],
   [
    "Tap cells",
    "7,029"
   ],
   [
    "Filler cells",
    "322,303"
   ],
   [
    "Total placed cells",
    "555,421"
   ],
   [
    "Cell area",
    "660,236 µm²"
   ],
   [
    "Core utilisation",
    "46.8 %"
   ],
   [
    "I/O pins",
    "294"
   ],
   [
    "Target clock",
    "2.5 ns (400.00 MHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "404.42 MHz"
   ],
   [
    "Setup WNS",
    "0.02733 ns"
   ],
   [
    "Setup TNS",
    "0 ns"
   ],
   [
    "Hold WNS",
    "-0.009228 ns"
   ],
   [
    "Routed wirelength",
    "5,043,238 µm"
   ],
   [
    "Routed nets",
    "287,624"
   ],
   [
    "Vias",
    "1,427,373"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "78.3 mW measured — average over a W4A4 inference at 400 MHz (gate-level simulation)"
   ],
   [
    "GDS-II size",
    "181.5 MB"
   ],
   [
    "Function",
    "ResNet-20 inference for CIFAR-10 — 19 convolutions with residual blocks, global average pooling, classifier and argmax"
   ],
   [
    "Compute array",
    "16 × 16 weight-stationary binary array — 8-bit sign-magnitude multipliers and adder trees, one input vector per clock"
   ],
   [
    "On-chip storage",
    "Three 1024 × 128-bit activation buffers built from 12 fakeram45_1024x32 SRAM macros, clock-gated per buffer, and a 64-entry partial-sum buffer; weights off-core behind a 128-bit read port"
   ],
   [
    "Operating points",
    "W4A4 (4-bit weights and activations) and W8A8"
   ],
   [
    "Accuracy",
    "90.54 % / 91.70 % on the 10,000 test images (hardware-exact integer model)"
   ],
   [
    "Energy per inference",
    "46.9 µJ / 58.9 µJ — gate-level simulation of whole inferences on the routed netlist with extracted parasitics, including the weight-memory reads"
   ],
   [
    "Latency",
    "591 µs at 400 MHz"
   ],
   [
    "Verification",
    "RTL bit-exact against the integer model on 200 test images per operating point; every gate-level inference returns the model's class"
   ],
   [
    "SRAM macros",
    "fakeram45 models from the OpenROAD Nangate45 platform — abstracts without internal layout; the GDS-II rendering shows their outlines, pins and the power straps routed over them"
   ],
   [
    "Companion design",
    "Built twice with everything but the array identical — see the HTC-R version"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-nangate45-resnet20-binary/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-binary/blocks.webp",
    "cap": "Block map — every placed cell coloured by the functional block it belongs to"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-binary/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-binary/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-binary/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-binary/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-binary/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-binary/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-binary/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-binary/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-nangate45-resnet20-binary/cts_core_clock.webp",
    "cap": "Clock tree — core_clock"
   }
  ],
  "searchText": "resnet-20 accelerator — binary array the same resnet-20 accelerator built around a conventional 16 × 16 binary multiplier array: the baseline for the htc-r version, with the same twelve sram macros, streaming, requantization, pooling and control. openroad-flow-scripts (orfs) freepdk45 / nangate45 45 nm technology 45 nm — freepdk45 / nangate45 standard-cell library nangateopencelllibrary top module resnet_acc die size 1189.87 × 1189.87 µm die area 1.416 mm² (1,415,780 µm²) core area 1.410 mm² (1,410,030 µm²) instances (excl. filler) 233,222 standard cells 233,210 hard macros 12 sequential cells 34,902 tap cells 7,029 filler cells 322,303 total placed cells 555,421 cell area 660,236 µm² core utilisation 46.8 % i/o pins 294 target clock 2.5 ns (400.00 mhz) achieved f<sub>max</sub> 404.42 mhz setup wns 0.02733 ns setup tns 0 ns hold wns -0.009228 ns routed wirelength 5,043,238 µm routed nets 287,624 vias 1,427,373 detailed-route drc 0 antenna-violating nets 0 total power 78.3 mw measured — average over a w4a4 inference at 400 mhz (gate-level simulation) gds-ii size 181.5 mb function resnet-20 inference for cifar-10 — 19 convolutions with residual blocks, global average pooling, classifier and argmax compute array 16 × 16 weight-stationary binary array — 8-bit sign-magnitude multipliers and adder trees, one input vector per clock on-chip storage three 1024 × 128-bit activation buffers built from 12 fakeram45_1024x32 sram macros, clock-gated per buffer, and a 64-entry partial-sum buffer; weights off-core behind a 128-bit read port operating points w4a4 (4-bit weights and activations) and w8a8 accuracy 90.54 % / 91.70 % on the 10,000 test images (hardware-exact integer model) energy per inference 46.9 µj / 58.9 µj — gate-level simulation of whole inferences on the routed netlist with extracted parasitics, including the weight-memory reads latency 591 µs at 400 mhz verification rtl bit-exact against the integer model on 200 test images per operating point; every gate-level inference returns the model's class sram macros fakeram45 models from the openroad nangate45 platform — abstracts without internal layout; the gds-ii rendering shows their outlines, pins and the power straps routed over them companion design built twice with everything but the array identical — see the htc-r version"
 },
 {
  "slug": "orfs-asap7-aes-block",
  "name": "AES-128 cipher — hierarchical",
  "blurb": "aes_cipher_top assembled from hardened S-box and round-constant sub-blocks; 21 macros are placed and routed at the top level.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "asap7",
  "pdkLabel": "ASAP7 predictive PDK",
  "node": "7 nm",
  "pdkNote": "ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. It models a 7 nm process for academic use, and is a standard platform for research on FinFET-era place-and-route.",
  "head": [
   [
    "Die",
    "118 × 118 µm"
   ],
   [
    "Instances",
    "9,677"
   ],
   [
    "F<sub>max</sub>",
    "1.90 GHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "7 nm — ASAP7 predictive PDK"
   ],
   [
    "Standard-cell library",
    "asap7sc7p5t — 7.5-track FinFET"
   ],
   [
    "Top module",
    "aes_cipher_top"
   ],
   [
    "Die size",
    "118.17 × 118.17 µm"
   ],
   [
    "Die area",
    "13,965 µm²"
   ],
   [
    "Core area",
    "13,001 µm²"
   ],
   [
    "Instances (excl. filler)",
    "9,677"
   ],
   [
    "Standard cells",
    "9,656"
   ],
   [
    "Hard macros",
    "21"
   ],
   [
    "Sequential cells",
    "518"
   ],
   [
    "Tap cells",
    "4,215"
   ],
   [
    "Filler cells",
    "17,904"
   ],
   [
    "Total placed cells",
    "27,581"
   ],
   [
    "Cell area",
    "6,384 µm²"
   ],
   [
    "Core utilisation",
    "49.1 %"
   ],
   [
    "I/O pins",
    "390"
   ],
   [
    "Target clock",
    "450 ps (2.22 GHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "1.90 GHz"
   ],
   [
    "Setup WNS",
    "-77.06 ps"
   ],
   [
    "Setup TNS",
    "-3091 ps"
   ],
   [
    "Hold WNS",
    "14.16 ps"
   ],
   [
    "Routed wirelength",
    "47,534 µm"
   ],
   [
    "Routed nets",
    "5,858"
   ],
   [
    "Vias",
    "42,584"
   ],
   [
    "Routing layers",
    "M2 – M9"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "7.670 mW"
   ],
   [
    "GDS-II size",
    "10.4 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-asap7-aes-block/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block/cts_clk.webp",
    "cap": "Clock tree — clk"
   }
  ],
  "searchText": "aes-128 cipher — hierarchical aes_cipher_top assembled from hardened s-box and round-constant sub-blocks; 21 macros are placed and routed at the top level. openroad-flow-scripts (orfs) asap7 predictive pdk 7 nm technology 7 nm — asap7 predictive pdk standard-cell library asap7sc7p5t — 7.5-track finfet top module aes_cipher_top die size 118.17 × 118.17 µm die area 13,965 µm² core area 13,001 µm² instances (excl. filler) 9,677 standard cells 9,656 hard macros 21 sequential cells 518 tap cells 4,215 filler cells 17,904 total placed cells 27,581 cell area 6,384 µm² core utilisation 49.1 % i/o pins 390 target clock 450 ps (2.22 ghz) achieved f<sub>max</sub> 1.90 ghz setup wns -77.06 ps setup tns -3091 ps hold wns 14.16 ps routed wirelength 47,534 µm routed nets 5,858 vias 42,584 routing layers m2 – m9 detailed-route drc 0 antenna-violating nets 0 total power 7.670 mw gds-ii size 10.4 mb"
 },
 {
  "slug": "orfs-asap7-aes-block_aes_rcon",
  "name": "AES round-constant block",
  "blurb": "The aes_rcon sub-block of the hierarchical AES build, hardened on its own as a reusable macro.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "asap7",
  "pdkLabel": "ASAP7 predictive PDK",
  "node": "7 nm",
  "pdkNote": "ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. It models a 7 nm process for academic use, and is a standard platform for research on FinFET-era place-and-route.",
  "head": [
   [
    "Die",
    "9 × 9 µm"
   ],
   [
    "Instances",
    "141"
   ],
   [
    "F<sub>max</sub>",
    "5.04 GHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "7 nm — ASAP7 predictive PDK"
   ],
   [
    "Standard-cell library",
    "asap7sc7p5t — 7.5-track FinFET"
   ],
   [
    "Top module",
    "aes_cipher_top"
   ],
   [
    "Die size",
    "9.23 × 9.23 µm"
   ],
   [
    "Die area",
    "85 µm²"
   ],
   [
    "Core area",
    "25 µm²"
   ],
   [
    "Instances (excl. filler)",
    "141"
   ],
   [
    "Standard cells",
    "141"
   ],
   [
    "Sequential cells",
    "12"
   ],
   [
    "Tap cells",
    "36"
   ],
   [
    "Filler cells",
    "126"
   ],
   [
    "Total placed cells",
    "243"
   ],
   [
    "Cell area",
    "12 µm²"
   ],
   [
    "Core utilisation",
    "48.4 %"
   ],
   [
    "I/O pins",
    "36"
   ],
   [
    "Target clock",
    "380 ps (2.63 GHz) — derived from F<sub>max</sub> and slack"
   ],
   [
    "Achieved F<sub>max</sub>",
    "5.04 GHz"
   ],
   [
    "Setup WNS",
    "181.7 ps"
   ],
   [
    "Setup TNS",
    "0 ps"
   ],
   [
    "Hold WNS",
    "60.79 ps"
   ],
   [
    "Routed wirelength",
    "177 µm"
   ],
   [
    "Routed nets",
    "112"
   ],
   [
    "Vias",
    "649"
   ],
   [
    "Routing layers",
    "M2 – M9"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "0.098 mW"
   ],
   [
    "GDS-II size",
    "0.3 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_rcon/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_rcon/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_rcon/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_rcon/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_rcon/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_rcon/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_rcon/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_rcon/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_rcon/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_rcon/cts_clk.webp",
    "cap": "Clock tree — clk"
   }
  ],
  "searchText": "aes round-constant block the aes_rcon sub-block of the hierarchical aes build, hardened on its own as a reusable macro. openroad-flow-scripts (orfs) asap7 predictive pdk 7 nm technology 7 nm — asap7 predictive pdk standard-cell library asap7sc7p5t — 7.5-track finfet top module aes_cipher_top die size 9.23 × 9.23 µm die area 85 µm² core area 25 µm² instances (excl. filler) 141 standard cells 141 sequential cells 12 tap cells 36 filler cells 126 total placed cells 243 cell area 12 µm² core utilisation 48.4 % i/o pins 36 target clock 380 ps (2.63 ghz) — derived from f<sub>max</sub> and slack achieved f<sub>max</sub> 5.04 ghz setup wns 181.7 ps setup tns 0 ps hold wns 60.79 ps routed wirelength 177 µm routed nets 112 vias 649 routing layers m2 – m9 detailed-route drc 0 antenna-violating nets 0 total power 0.098 mw gds-ii size 0.3 mb"
 },
 {
  "slug": "orfs-asap7-aes-block_aes_sbox",
  "name": "AES S-box block",
  "blurb": "The aes_sbox substitution box, hardened as a macro and instantiated twenty times inside the top-level cipher.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "asap7",
  "pdkLabel": "ASAP7 predictive PDK",
  "node": "7 nm",
  "pdkNote": "ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. It models a 7 nm process for academic use, and is a standard platform for research on FinFET-era place-and-route.",
  "head": [
   [
    "Die",
    "17 × 17 µm"
   ],
   [
    "Instances",
    "722"
   ],
   [
    "F<sub>max</sub>",
    "2.69 GHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "7 nm — ASAP7 predictive PDK"
   ],
   [
    "Standard-cell library",
    "asap7sc7p5t — 7.5-track FinFET"
   ],
   [
    "Top module",
    "aes_cipher_top"
   ],
   [
    "Die size",
    "16.62 × 16.62 µm"
   ],
   [
    "Die area",
    "276 µm²"
   ],
   [
    "Core area",
    "156 µm²"
   ],
   [
    "Instances (excl. filler)",
    "722"
   ],
   [
    "Standard cells",
    "722"
   ],
   [
    "Tap cells",
    "92"
   ],
   [
    "Filler cells",
    "817"
   ],
   [
    "Total placed cells",
    "1,539"
   ],
   [
    "Cell area",
    "67 µm²"
   ],
   [
    "Core utilisation",
    "43.3 %"
   ],
   [
    "I/O pins",
    "18"
   ],
   [
    "Target clock",
    "380 ps (2.63 GHz) — derived from F<sub>max</sub> and slack"
   ],
   [
    "Achieved F<sub>max</sub>",
    "2.69 GHz"
   ],
   [
    "Setup WNS",
    "7.959 ps"
   ],
   [
    "Setup TNS",
    "0 ps"
   ],
   [
    "Hold WNS",
    "204.8 ps"
   ],
   [
    "Routed wirelength",
    "1,849 µm"
   ],
   [
    "Routed nets",
    "653"
   ],
   [
    "Vias",
    "5,929"
   ],
   [
    "Routing layers",
    "M2 – M9"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "0.262 mW"
   ],
   [
    "GDS-II size",
    "0.9 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_sbox/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_sbox/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_sbox/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_sbox/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_sbox/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_sbox/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_sbox/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_sbox/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-asap7-aes-block_aes_sbox/final_worst_path.webp",
    "cap": "Worst timing path"
   }
  ],
  "searchText": "aes s-box block the aes_sbox substitution box, hardened as a macro and instantiated twenty times inside the top-level cipher. openroad-flow-scripts (orfs) asap7 predictive pdk 7 nm technology 7 nm — asap7 predictive pdk standard-cell library asap7sc7p5t — 7.5-track finfet top module aes_cipher_top die size 16.62 × 16.62 µm die area 276 µm² core area 156 µm² instances (excl. filler) 722 standard cells 722 tap cells 92 filler cells 817 total placed cells 1,539 cell area 67 µm² core utilisation 43.3 % i/o pins 18 target clock 380 ps (2.63 ghz) — derived from f<sub>max</sub> and slack achieved f<sub>max</sub> 2.69 ghz setup wns 7.959 ps setup tns 0 ps hold wns 204.8 ps routed wirelength 1,849 µm routed nets 653 vias 5,929 routing layers m2 – m9 detailed-route drc 0 antenna-violating nets 0 total power 0.262 mw gds-ii size 0.9 mb"
 },
 {
  "slug": "orfs-asap7-aes-mbff",
  "name": "AES-128 cipher — multi-bit flip-flops",
  "blurb": "Flat AES with multi-bit flip-flop clustering enabled, which merges single-bit registers into banked cells to shrink the clock tree.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "asap7",
  "pdkLabel": "ASAP7 predictive PDK",
  "node": "7 nm",
  "pdkNote": "ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. It models a 7 nm process for academic use, and is a standard platform for research on FinFET-era place-and-route.",
  "head": [
   [
    "Die",
    "69 × 69 µm"
   ],
   [
    "Instances",
    "18,898"
   ],
   [
    "F<sub>max</sub>",
    "2.54 GHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "7 nm — ASAP7 predictive PDK"
   ],
   [
    "Standard-cell library",
    "asap7sc7p5t — 7.5-track FinFET"
   ],
   [
    "Top module",
    "aes_cipher_top"
   ],
   [
    "Die size",
    "69.20 × 69.20 µm"
   ],
   [
    "Die area",
    "4,789 µm²"
   ],
   [
    "Core area",
    "4,220 µm²"
   ],
   [
    "Instances (excl. filler)",
    "18,898"
   ],
   [
    "Standard cells",
    "18,898"
   ],
   [
    "Sequential cells",
    "562"
   ],
   [
    "Tap cells",
    "722"
   ],
   [
    "Filler cells",
    "21,489"
   ],
   [
    "Total placed cells",
    "40,387"
   ],
   [
    "Cell area",
    "2,003 µm²"
   ],
   [
    "Core utilisation",
    "47.5 %"
   ],
   [
    "I/O pins",
    "390"
   ],
   [
    "Target clock",
    "380 ps (2.63 GHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "2.54 GHz"
   ],
   [
    "Setup WNS",
    "-14.35 ps"
   ],
   [
    "Setup TNS",
    "-449.6 ps"
   ],
   [
    "Hold WNS",
    "9.752 ps"
   ],
   [
    "Routed wirelength",
    "67,622 µm"
   ],
   [
    "Routed nets",
    "18,681"
   ],
   [
    "Vias",
    "168,106"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "151.682 mW"
   ],
   [
    "GDS-II size",
    "20.4 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-asap7-aes-mbff/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-asap7-aes-mbff/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-asap7-aes-mbff/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-asap7-aes-mbff/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-asap7-aes-mbff/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-asap7-aes-mbff/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-asap7-aes-mbff/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-asap7-aes-mbff/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-asap7-aes-mbff/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-asap7-aes-mbff/cts_clk.webp",
    "cap": "Clock tree — clk"
   }
  ],
  "searchText": "aes-128 cipher — multi-bit flip-flops flat aes with multi-bit flip-flop clustering enabled, which merges single-bit registers into banked cells to shrink the clock tree. openroad-flow-scripts (orfs) asap7 predictive pdk 7 nm technology 7 nm — asap7 predictive pdk standard-cell library asap7sc7p5t — 7.5-track finfet top module aes_cipher_top die size 69.20 × 69.20 µm die area 4,789 µm² core area 4,220 µm² instances (excl. filler) 18,898 standard cells 18,898 sequential cells 562 tap cells 722 filler cells 21,489 total placed cells 40,387 cell area 2,003 µm² core utilisation 47.5 % i/o pins 390 target clock 380 ps (2.63 ghz) achieved f<sub>max</sub> 2.54 ghz setup wns -14.35 ps setup tns -449.6 ps hold wns 9.752 ps routed wirelength 67,622 µm routed nets 18,681 vias 168,106 detailed-route drc 0 antenna-violating nets 0 total power 151.682 mw gds-ii size 20.4 mb"
 },
 {
  "slug": "orfs-asap7-aes_lvt",
  "name": "AES-128 cipher — low-Vt",
  "blurb": "Flat AES implemented in the low-threshold-voltage cell flavour: faster switching, paid for in leakage.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "asap7",
  "pdkLabel": "ASAP7 predictive PDK",
  "node": "7 nm",
  "pdkNote": "ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. It models a 7 nm process for academic use, and is a standard platform for research on FinFET-era place-and-route.",
  "head": [
   [
    "Die",
    "69 × 69 µm"
   ],
   [
    "Instances",
    "16,800"
   ],
   [
    "F<sub>max</sub>",
    "2.73 GHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "7 nm — ASAP7 predictive PDK"
   ],
   [
    "Standard-cell library",
    "asap7sc7p5t — 7.5-track FinFET"
   ],
   [
    "Top module",
    "aes_cipher_top"
   ],
   [
    "Die size",
    "69.01 × 69.01 µm"
   ],
   [
    "Die area",
    "4,763 µm²"
   ],
   [
    "Core area",
    "4,210 µm²"
   ],
   [
    "Instances (excl. filler)",
    "16,800"
   ],
   [
    "Standard cells",
    "16,800"
   ],
   [
    "Sequential cells",
    "562"
   ],
   [
    "Tap cells",
    "722"
   ],
   [
    "Filler cells",
    "21,072"
   ],
   [
    "Total placed cells",
    "37,872"
   ],
   [
    "Cell area",
    "1,771 µm²"
   ],
   [
    "Core utilisation",
    "42.1 %"
   ],
   [
    "I/O pins",
    "390"
   ],
   [
    "Target clock",
    "360 ps (2.78 GHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "2.73 GHz"
   ],
   [
    "Setup WNS",
    "-6.244 ps"
   ],
   [
    "Setup TNS",
    "-17.79 ps"
   ],
   [
    "Hold WNS",
    "11.45 ps"
   ],
   [
    "Routed wirelength",
    "62,823 µm"
   ],
   [
    "Routed nets",
    "16,582"
   ],
   [
    "Vias",
    "152,500"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "187.320 mW"
   ],
   [
    "GDS-II size",
    "18.6 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-asap7-aes_lvt/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-asap7-aes_lvt/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-asap7-aes_lvt/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-asap7-aes_lvt/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-asap7-aes_lvt/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-asap7-aes_lvt/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-asap7-aes_lvt/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-asap7-aes_lvt/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-asap7-aes_lvt/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-asap7-aes_lvt/cts_clk.webp",
    "cap": "Clock tree — clk"
   }
  ],
  "searchText": "aes-128 cipher — low-vt flat aes implemented in the low-threshold-voltage cell flavour: faster switching, paid for in leakage. openroad-flow-scripts (orfs) asap7 predictive pdk 7 nm technology 7 nm — asap7 predictive pdk standard-cell library asap7sc7p5t — 7.5-track finfet top module aes_cipher_top die size 69.01 × 69.01 µm die area 4,763 µm² core area 4,210 µm² instances (excl. filler) 16,800 standard cells 16,800 sequential cells 562 tap cells 722 filler cells 21,072 total placed cells 37,872 cell area 1,771 µm² core utilisation 42.1 % i/o pins 390 target clock 360 ps (2.78 ghz) achieved f<sub>max</sub> 2.73 ghz setup wns -6.244 ps setup tns -17.79 ps hold wns 11.45 ps routed wirelength 62,823 µm routed nets 16,582 vias 152,500 detailed-route drc 0 antenna-violating nets 0 total power 187.320 mw gds-ii size 18.6 mb"
 },
 {
  "slug": "orfs-asap7-ethmac",
  "name": "Ethernet MAC",
  "blurb": "The OpenCores 10/100 Ethernet MAC — three asynchronous clock domains (Wishbone, transmit and receive), each with its own clock tree.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "asap7",
  "pdkLabel": "ASAP7 predictive PDK",
  "node": "7 nm",
  "pdkNote": "ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. It models a 7 nm process for academic use, and is a standard platform for research on FinFET-era place-and-route.",
  "head": [
   [
    "Die",
    "107 × 107 µm"
   ],
   [
    "Instances",
    "62,866"
   ],
   [
    "Clocks",
    "3 domains"
   ]
  ],
  "specs": [
   [
    "Technology",
    "7 nm — ASAP7 predictive PDK"
   ],
   [
    "Standard-cell library",
    "asap7sc7p5t — 7.5-track FinFET"
   ],
   [
    "Top module",
    "ethmac"
   ],
   [
    "Die size",
    "107.25 × 107.25 µm"
   ],
   [
    "Die area",
    "11,502 µm²"
   ],
   [
    "Core area",
    "10,616 µm²"
   ],
   [
    "Instances (excl. filler)",
    "62,866"
   ],
   [
    "Standard cells",
    "62,866"
   ],
   [
    "Sequential cells",
    "10,546"
   ],
   [
    "Tap cells",
    "1,528"
   ],
   [
    "Filler cells",
    "50,428"
   ],
   [
    "Total placed cells",
    "112,049"
   ],
   [
    "Cell area",
    "7,980 µm²"
   ],
   [
    "Core utilisation",
    "75.2 %"
   ],
   [
    "I/O pins",
    "218"
   ],
   [
    "Target clock",
    "300 ps (3.33 GHz), 1000 ps (1.00 GHz)"
   ],
   [
    "Clock domains",
    "3"
   ],
   [
    "Achieved F<sub>max</sub>",
    "mtx_clk_pad_i 3.27 GHz, mrx_clk_pad_i 2.31 GHz, wb_clk_i 1.52 GHz"
   ],
   [
    "Setup WNS",
    "-132.2 ps"
   ],
   [
    "Setup TNS",
    "-2372 ps"
   ],
   [
    "Hold WNS",
    "11.19 ps"
   ],
   [
    "Routed wirelength",
    "199,524 µm"
   ],
   [
    "Routed nets",
    "61,156"
   ],
   [
    "Vias",
    "554,903"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "112.316 mW"
   ],
   [
    "GDS-II size",
    "64.2 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-asap7-ethmac/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac/cts_mrx_clk_pad_i.webp",
    "cap": "Clock tree — mrx_clk_pad_i"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac/cts_mtx_clk_pad_i.webp",
    "cap": "Clock tree — mtx_clk_pad_i"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac/cts_wb_clk_i.webp",
    "cap": "Clock tree — wb_clk_i"
   }
  ],
  "searchText": "ethernet mac the opencores 10/100 ethernet mac — three asynchronous clock domains (wishbone, transmit and receive), each with its own clock tree. openroad-flow-scripts (orfs) asap7 predictive pdk 7 nm technology 7 nm — asap7 predictive pdk standard-cell library asap7sc7p5t — 7.5-track finfet top module ethmac die size 107.25 × 107.25 µm die area 11,502 µm² core area 10,616 µm² instances (excl. filler) 62,866 standard cells 62,866 sequential cells 10,546 tap cells 1,528 filler cells 50,428 total placed cells 112,049 cell area 7,980 µm² core utilisation 75.2 % i/o pins 218 target clock 300 ps (3.33 ghz), 1000 ps (1.00 ghz) clock domains 3 achieved f<sub>max</sub> mtx_clk_pad_i 3.27 ghz, mrx_clk_pad_i 2.31 ghz, wb_clk_i 1.52 ghz setup wns -132.2 ps setup tns -2372 ps hold wns 11.19 ps routed wirelength 199,524 µm routed nets 61,156 vias 554,903 detailed-route drc 0 antenna-violating nets 0 total power 112.316 mw gds-ii size 64.2 mb"
 },
 {
  "slug": "orfs-asap7-ethmac_lvt",
  "name": "Ethernet MAC — low-Vt",
  "blurb": "The same three-clock Ethernet MAC re-implemented with low-Vt cells and a larger die.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "asap7",
  "pdkLabel": "ASAP7 predictive PDK",
  "node": "7 nm",
  "pdkNote": "ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. It models a 7 nm process for academic use, and is a standard platform for research on FinFET-era place-and-route.",
  "head": [
   [
    "Die",
    "140 × 140 µm"
   ],
   [
    "Instances",
    "58,177"
   ],
   [
    "Clocks",
    "3 domains"
   ]
  ],
  "specs": [
   [
    "Technology",
    "7 nm — ASAP7 predictive PDK"
   ],
   [
    "Standard-cell library",
    "asap7sc7p5t — 7.5-track FinFET"
   ],
   [
    "Top module",
    "ethmac"
   ],
   [
    "Die size",
    "139.76 × 139.76 µm"
   ],
   [
    "Die area",
    "19,532 µm²"
   ],
   [
    "Core area",
    "18,393 µm²"
   ],
   [
    "Instances (excl. filler)",
    "58,177"
   ],
   [
    "Standard cells",
    "58,177"
   ],
   [
    "Sequential cells",
    "10,546"
   ],
   [
    "Tap cells",
    "2,264"
   ],
   [
    "Filler cells",
    "87,455"
   ],
   [
    "Total placed cells",
    "144,387"
   ],
   [
    "Cell area",
    "7,588 µm²"
   ],
   [
    "Core utilisation",
    "41.3 %"
   ],
   [
    "I/O pins",
    "218"
   ],
   [
    "Target clock",
    "300 ps (3.33 GHz), 1000 ps (1.00 GHz)"
   ],
   [
    "Clock domains",
    "3"
   ],
   [
    "Achieved F<sub>max</sub>",
    "mtx_clk_pad_i 3.48 GHz, mrx_clk_pad_i 3.06 GHz, wb_clk_i 1.46 GHz"
   ],
   [
    "Setup WNS",
    "-26.35 ps"
   ],
   [
    "Setup TNS",
    "-403.2 ps"
   ],
   [
    "Hold WNS",
    "19.92 ps"
   ],
   [
    "Routed wirelength",
    "219,078 µm"
   ],
   [
    "Routed nets",
    "55,712"
   ],
   [
    "Vias",
    "523,073"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "166.283 mW"
   ],
   [
    "GDS-II size",
    "64.6 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-asap7-ethmac_lvt/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac_lvt/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac_lvt/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac_lvt/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac_lvt/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac_lvt/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac_lvt/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac_lvt/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac_lvt/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac_lvt/cts_mrx_clk_pad_i.webp",
    "cap": "Clock tree — mrx_clk_pad_i"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac_lvt/cts_mtx_clk_pad_i.webp",
    "cap": "Clock tree — mtx_clk_pad_i"
   },
   {
    "src": "assets/img/orfs-asap7-ethmac_lvt/cts_wb_clk_i.webp",
    "cap": "Clock tree — wb_clk_i"
   }
  ],
  "searchText": "ethernet mac — low-vt the same three-clock ethernet mac re-implemented with low-vt cells and a larger die. openroad-flow-scripts (orfs) asap7 predictive pdk 7 nm technology 7 nm — asap7 predictive pdk standard-cell library asap7sc7p5t — 7.5-track finfet top module ethmac die size 139.76 × 139.76 µm die area 19,532 µm² core area 18,393 µm² instances (excl. filler) 58,177 standard cells 58,177 sequential cells 10,546 tap cells 2,264 filler cells 87,455 total placed cells 144,387 cell area 7,588 µm² core utilisation 41.3 % i/o pins 218 target clock 300 ps (3.33 ghz), 1000 ps (1.00 ghz) clock domains 3 achieved f<sub>max</sub> mtx_clk_pad_i 3.48 ghz, mrx_clk_pad_i 3.06 ghz, wb_clk_i 1.46 ghz setup wns -26.35 ps setup tns -403.2 ps hold wns 19.92 ps routed wirelength 219,078 µm routed nets 55,712 vias 523,073 detailed-route drc 0 antenna-violating nets 0 total power 166.283 mw gds-ii size 64.6 mb"
 },
 {
  "slug": "orfs-asap7-gcd-ccs",
  "name": "GCD accelerator — CCS timing",
  "blurb": "The same GCD datapath signed off against composite-current-source Liberty models instead of the simpler NLDM tables.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "asap7",
  "pdkLabel": "ASAP7 predictive PDK",
  "node": "7 nm",
  "pdkNote": "ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. It models a 7 nm process for academic use, and is a standard platform for research on FinFET-era place-and-route.",
  "head": [
   [
    "Die",
    "16 × 16 µm"
   ],
   [
    "Instances",
    "499"
   ],
   [
    "F<sub>max</sub>",
    "2.84 GHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "7 nm — ASAP7 predictive PDK"
   ],
   [
    "Standard-cell library",
    "asap7sc7p5t — 7.5-track FinFET"
   ],
   [
    "Top module",
    "gcd-ccs"
   ],
   [
    "Die size",
    "16.20 × 16.20 µm"
   ],
   [
    "Die area",
    "262 µm²"
   ],
   [
    "Core area",
    "197 µm²"
   ],
   [
    "Instances (excl. filler)",
    "499"
   ],
   [
    "Standard cells",
    "499"
   ],
   [
    "Sequential cells",
    "35"
   ],
   [
    "Tap cells",
    "104"
   ],
   [
    "Filler cells",
    "907"
   ],
   [
    "Total placed cells",
    "1,406"
   ],
   [
    "Cell area",
    "49 µm²"
   ],
   [
    "Core utilisation",
    "24.9 %"
   ],
   [
    "I/O pins",
    "56"
   ],
   [
    "Target clock",
    "310 ps (3.23 GHz) — derived from F<sub>max</sub> and slack"
   ],
   [
    "Achieved F<sub>max</sub>",
    "2.84 GHz"
   ],
   [
    "Setup WNS",
    "-42.09 ps"
   ],
   [
    "Setup TNS",
    "-307.7 ps"
   ],
   [
    "Hold WNS",
    "27.2 ps"
   ],
   [
    "Routed wirelength",
    "1,204 µm"
   ],
   [
    "Routed nets",
    "445"
   ],
   [
    "Vias",
    "3,373"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "0.913 mW"
   ],
   [
    "GDS-II size",
    "0.8 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-asap7-gcd-ccs/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-asap7-gcd-ccs/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-asap7-gcd-ccs/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-asap7-gcd-ccs/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-asap7-gcd-ccs/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-asap7-gcd-ccs/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-asap7-gcd-ccs/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-asap7-gcd-ccs/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-asap7-gcd-ccs/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-asap7-gcd-ccs/cts_core_clock.webp",
    "cap": "Clock tree — core_clock"
   }
  ],
  "searchText": "gcd accelerator — ccs timing the same gcd datapath signed off against composite-current-source liberty models instead of the simpler nldm tables. openroad-flow-scripts (orfs) asap7 predictive pdk 7 nm technology 7 nm — asap7 predictive pdk standard-cell library asap7sc7p5t — 7.5-track finfet top module gcd-ccs die size 16.20 × 16.20 µm die area 262 µm² core area 197 µm² instances (excl. filler) 499 standard cells 499 sequential cells 35 tap cells 104 filler cells 907 total placed cells 1,406 cell area 49 µm² core utilisation 24.9 % i/o pins 56 target clock 310 ps (3.23 ghz) — derived from f<sub>max</sub> and slack achieved f<sub>max</sub> 2.84 ghz setup wns -42.09 ps setup tns -307.7 ps hold wns 27.2 ps routed wirelength 1,204 µm routed nets 445 vias 3,373 detailed-route drc 0 antenna-violating nets 0 total power 0.913 mw gds-ii size 0.8 mb"
 },
 {
  "slug": "orfs-asap7-gcd",
  "name": "GCD accelerator",
  "blurb": "A Euclidean greatest-common-divisor datapath — the canonical small design used to shake out a flow end to end.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "asap7",
  "pdkLabel": "ASAP7 predictive PDK",
  "node": "7 nm",
  "pdkNote": "ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. It models a 7 nm process for academic use, and is a standard platform for research on FinFET-era place-and-route.",
  "head": [
   [
    "Die",
    "16 × 16 µm"
   ],
   [
    "Instances",
    "517"
   ],
   [
    "F<sub>max</sub>",
    "2.90 GHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "7 nm — ASAP7 predictive PDK"
   ],
   [
    "Standard-cell library",
    "asap7sc7p5t — 7.5-track FinFET"
   ],
   [
    "Top module",
    "gcd"
   ],
   [
    "Die size",
    "16.20 × 16.20 µm"
   ],
   [
    "Die area",
    "262 µm²"
   ],
   [
    "Core area",
    "197 µm²"
   ],
   [
    "Instances (excl. filler)",
    "517"
   ],
   [
    "Standard cells",
    "517"
   ],
   [
    "Sequential cells",
    "35"
   ],
   [
    "Tap cells",
    "104"
   ],
   [
    "Filler cells",
    "896"
   ],
   [
    "Total placed cells",
    "1,413"
   ],
   [
    "Cell area",
    "50 µm²"
   ],
   [
    "Core utilisation",
    "25.6 %"
   ],
   [
    "I/O pins",
    "56"
   ],
   [
    "Target clock",
    "310 ps (3.23 GHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "2.90 GHz"
   ],
   [
    "Setup WNS",
    "-34.66 ps"
   ],
   [
    "Setup TNS",
    "-237.7 ps"
   ],
   [
    "Hold WNS",
    "29.18 ps"
   ],
   [
    "Routed wirelength",
    "1,189 µm"
   ],
   [
    "Routed nets",
    "463"
   ],
   [
    "Vias",
    "3,393"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "0.902 mW"
   ],
   [
    "GDS-II size",
    "0.8 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-asap7-gcd/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-asap7-gcd/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-asap7-gcd/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-asap7-gcd/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-asap7-gcd/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-asap7-gcd/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-asap7-gcd/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-asap7-gcd/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-asap7-gcd/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-asap7-gcd/cts_core_clock.webp",
    "cap": "Clock tree — core_clock"
   }
  ],
  "searchText": "gcd accelerator a euclidean greatest-common-divisor datapath — the canonical small design used to shake out a flow end to end. openroad-flow-scripts (orfs) asap7 predictive pdk 7 nm technology 7 nm — asap7 predictive pdk standard-cell library asap7sc7p5t — 7.5-track finfet top module gcd die size 16.20 × 16.20 µm die area 262 µm² core area 197 µm² instances (excl. filler) 517 standard cells 517 sequential cells 35 tap cells 104 filler cells 896 total placed cells 1,413 cell area 50 µm² core utilisation 25.6 % i/o pins 56 target clock 310 ps (3.23 ghz) achieved f<sub>max</sub> 2.90 ghz setup wns -34.66 ps setup tns -237.7 ps hold wns 29.18 ps routed wirelength 1,189 µm routed nets 463 vias 3,393 detailed-route drc 0 antenna-violating nets 0 total power 0.902 mw gds-ii size 0.8 mb"
 },
 {
  "slug": "orfs-asap7-jpeg_lvt",
  "name": "JPEG encoder — low-Vt",
  "blurb": "A baseline JPEG encoder — DCT, quantisation and Huffman coding — built from low-Vt cells.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "asap7",
  "pdkLabel": "ASAP7 predictive PDK",
  "node": "7 nm",
  "pdkNote": "ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. It models a 7 nm process for academic use, and is a standard platform for research on FinFET-era place-and-route.",
  "head": [
   [
    "Die",
    "148 × 148 µm"
   ],
   [
    "Instances",
    "57,483"
   ],
   [
    "F<sub>max</sub>",
    "1.71 GHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "7 nm — ASAP7 predictive PDK"
   ],
   [
    "Standard-cell library",
    "asap7sc7p5t — 7.5-track FinFET"
   ],
   [
    "Top module",
    "jpeg_encoder"
   ],
   [
    "Die size",
    "148.09 × 148.09 µm"
   ],
   [
    "Die area",
    "21,930 µm²"
   ],
   [
    "Core area",
    "20,726 µm²"
   ],
   [
    "Instances (excl. filler)",
    "57,483"
   ],
   [
    "Standard cells",
    "57,483"
   ],
   [
    "Sequential cells",
    "4,383"
   ],
   [
    "Tap cells",
    "2,403"
   ],
   [
    "Filler cells",
    "93,525"
   ],
   [
    "Total placed cells",
    "150,942"
   ],
   [
    "Cell area",
    "6,367 µm²"
   ],
   [
    "Core utilisation",
    "30.7 %"
   ],
   [
    "I/O pins",
    "49"
   ],
   [
    "Target clock",
    "600 ps (1.67 GHz) — derived from F<sub>max</sub> and slack"
   ],
   [
    "Achieved F<sub>max</sub>",
    "1.71 GHz"
   ],
   [
    "Setup WNS",
    "14.77 ps"
   ],
   [
    "Setup TNS",
    "0 ps"
   ],
   [
    "Hold WNS",
    "23.47 ps"
   ],
   [
    "Routed wirelength",
    "166,511 µm"
   ],
   [
    "Routed nets",
    "62,788"
   ],
   [
    "Vias",
    "443,194"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "161.001 mW"
   ],
   [
    "GDS-II size",
    "57.2 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-asap7-jpeg_lvt/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-asap7-jpeg_lvt/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-asap7-jpeg_lvt/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-asap7-jpeg_lvt/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-asap7-jpeg_lvt/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-asap7-jpeg_lvt/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-asap7-jpeg_lvt/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-asap7-jpeg_lvt/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-asap7-jpeg_lvt/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-asap7-jpeg_lvt/cts_clk.webp",
    "cap": "Clock tree — clk"
   }
  ],
  "searchText": "jpeg encoder — low-vt a baseline jpeg encoder — dct, quantisation and huffman coding — built from low-vt cells. openroad-flow-scripts (orfs) asap7 predictive pdk 7 nm technology 7 nm — asap7 predictive pdk standard-cell library asap7sc7p5t — 7.5-track finfet top module jpeg_encoder die size 148.09 × 148.09 µm die area 21,930 µm² core area 20,726 µm² instances (excl. filler) 57,483 standard cells 57,483 sequential cells 4,383 tap cells 2,403 filler cells 93,525 total placed cells 150,942 cell area 6,367 µm² core utilisation 30.7 % i/o pins 49 target clock 600 ps (1.67 ghz) — derived from f<sub>max</sub> and slack achieved f<sub>max</sub> 1.71 ghz setup wns 14.77 ps setup tns 0 ps hold wns 23.47 ps routed wirelength 166,511 µm routed nets 62,788 vias 443,194 detailed-route drc 0 antenna-violating nets 0 total power 161.001 mw gds-ii size 57.2 mb"
 },
 {
  "slug": "orfs-asap7-mock-cpu",
  "name": "Mock CPU — two clock domains",
  "blurb": "A CPU-plus-uncore test vehicle with separate core and uncore clocks, used to exercise multi-domain clock-tree synthesis and timing closure.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "asap7",
  "pdkLabel": "ASAP7 predictive PDK",
  "node": "7 nm",
  "pdkNote": "ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. It models a 7 nm process for academic use, and is a standard platform for research on FinFET-era place-and-route.",
  "head": [
   [
    "Die",
    "130 × 130 µm"
   ],
   [
    "Instances",
    "41,885"
   ],
   [
    "Clocks",
    "2 domains"
   ]
  ],
  "specs": [
   [
    "Technology",
    "7 nm — ASAP7 predictive PDK"
   ],
   [
    "Standard-cell library",
    "asap7sc7p5t — 7.5-track FinFET"
   ],
   [
    "Top module",
    "mock_cpu"
   ],
   [
    "Die size",
    "130.02 × 130.02 µm"
   ],
   [
    "Die area",
    "16,905 µm²"
   ],
   [
    "Core area",
    "15,844 µm²"
   ],
   [
    "Instances (excl. filler)",
    "41,885"
   ],
   [
    "Standard cells",
    "41,885"
   ],
   [
    "Sequential cells",
    "18,680"
   ],
   [
    "Tap cells",
    "2,102"
   ],
   [
    "Filler cells",
    "59,116"
   ],
   [
    "Total placed cells",
    "100,938"
   ],
   [
    "Cell area",
    "6,918 µm²"
   ],
   [
    "Core utilisation",
    "43.7 %"
   ],
   [
    "I/O pins",
    "74"
   ],
   [
    "Target clock",
    "333 ps (3.00 GHz), 1000 ps (1.00 GHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "5.42 GHz — worst register-to-register path; this block's timing is closed at the SoC level, so it does not correspond to either SDC clock"
   ],
   [
    "Setup WNS",
    "-86.62 ps"
   ],
   [
    "Setup TNS",
    "-1884 ps"
   ],
   [
    "Hold WNS",
    "1e+42 ps"
   ],
   [
    "Routed wirelength",
    "47,204 µm"
   ],
   [
    "Routed nets",
    "39,160"
   ],
   [
    "Vias",
    "204,527"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "146.792 mW"
   ],
   [
    "GDS-II size",
    "29.7 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-asap7-mock-cpu/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-asap7-mock-cpu/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-asap7-mock-cpu/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-asap7-mock-cpu/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-asap7-mock-cpu/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-asap7-mock-cpu/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-asap7-mock-cpu/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-asap7-mock-cpu/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-asap7-mock-cpu/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-asap7-mock-cpu/cts_clk.webp",
    "cap": "Clock tree — clk"
   },
   {
    "src": "assets/img/orfs-asap7-mock-cpu/cts_clk_uncore.webp",
    "cap": "Clock tree — clk_uncore"
   }
  ],
  "searchText": "mock cpu — two clock domains a cpu-plus-uncore test vehicle with separate core and uncore clocks, used to exercise multi-domain clock-tree synthesis and timing closure. openroad-flow-scripts (orfs) asap7 predictive pdk 7 nm technology 7 nm — asap7 predictive pdk standard-cell library asap7sc7p5t — 7.5-track finfet top module mock_cpu die size 130.02 × 130.02 µm die area 16,905 µm² core area 15,844 µm² instances (excl. filler) 41,885 standard cells 41,885 sequential cells 18,680 tap cells 2,102 filler cells 59,116 total placed cells 100,938 cell area 6,918 µm² core utilisation 43.7 % i/o pins 74 target clock 333 ps (3.00 ghz), 1000 ps (1.00 ghz) achieved f<sub>max</sub> 5.42 ghz — worst register-to-register path; this block's timing is closed at the soc level, so it does not correspond to either sdc clock setup wns -86.62 ps setup tns -1884 ps hold wns 1e+42 ps routed wirelength 47,204 µm routed nets 39,160 vias 204,527 detailed-route drc 0 antenna-violating nets 0 total power 146.792 mw gds-ii size 29.7 mb"
 },
 {
  "slug": "orfs-asap7-riscv32i-mock-sram_fakeram7_256x32",
  "name": "SRAM macro — 256 × 32",
  "blurb": "A 256-word by 32-bit memory macro generated for the RV32I mock-SRAM design and hardened as a standalone block.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "asap7",
  "pdkLabel": "ASAP7 predictive PDK",
  "node": "7 nm",
  "pdkNote": "ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. It models a 7 nm process for academic use, and is a standard platform for research on FinFET-era place-and-route.",
  "head": [
   [
    "Die",
    "6 × 32 µm"
   ],
   [
    "Instances",
    "749"
   ],
   [
    "F<sub>max</sub>",
    "3.73 GHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "7 nm — ASAP7 predictive PDK"
   ],
   [
    "Standard-cell library",
    "asap7sc7p5t — 7.5-track FinFET"
   ],
   [
    "Top module",
    "riscv32i-mock-sram_fakeram7_256x32"
   ],
   [
    "Die size",
    "5.79 × 32.34 µm"
   ],
   [
    "Die area",
    "187 µm²"
   ],
   [
    "Core area",
    "113 µm²"
   ],
   [
    "Instances (excl. filler)",
    "749"
   ],
   [
    "Standard cells",
    "749"
   ],
   [
    "Sequential cells",
    "97"
   ],
   [
    "Tap cells",
    "224"
   ],
   [
    "Filler cells",
    "488"
   ],
   [
    "Total placed cells",
    "1,237"
   ],
   [
    "Cell area",
    "80 µm²"
   ],
   [
    "Core utilisation",
    "70.9 %"
   ],
   [
    "I/O pins",
    "77"
   ],
   [
    "Target clock",
    "239.8 ps (4.17 GHz) — derived from F<sub>max</sub> and slack"
   ],
   [
    "Achieved F<sub>max</sub>",
    "3.73 GHz"
   ],
   [
    "Setup WNS",
    "-28.64 ps"
   ],
   [
    "Setup TNS",
    "-2006 ps"
   ],
   [
    "Hold WNS",
    "46.07 ps"
   ],
   [
    "Routed wirelength",
    "1,069 µm"
   ],
   [
    "Routed nets",
    "562"
   ],
   [
    "Vias",
    "3,815"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "0.409 mW"
   ],
   [
    "GDS-II size",
    "0.7 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-asap7-riscv32i-mock-sram_fakeram7_256x32/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-asap7-riscv32i-mock-sram_fakeram7_256x32/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-asap7-riscv32i-mock-sram_fakeram7_256x32/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-asap7-riscv32i-mock-sram_fakeram7_256x32/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-asap7-riscv32i-mock-sram_fakeram7_256x32/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-asap7-riscv32i-mock-sram_fakeram7_256x32/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-asap7-riscv32i-mock-sram_fakeram7_256x32/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-asap7-riscv32i-mock-sram_fakeram7_256x32/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-asap7-riscv32i-mock-sram_fakeram7_256x32/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-asap7-riscv32i-mock-sram_fakeram7_256x32/cts_clk.webp",
    "cap": "Clock tree — clk"
   }
  ],
  "searchText": "sram macro — 256 × 32 a 256-word by 32-bit memory macro generated for the rv32i mock-sram design and hardened as a standalone block. openroad-flow-scripts (orfs) asap7 predictive pdk 7 nm technology 7 nm — asap7 predictive pdk standard-cell library asap7sc7p5t — 7.5-track finfet top module riscv32i-mock-sram_fakeram7_256x32 die size 5.79 × 32.34 µm die area 187 µm² core area 113 µm² instances (excl. filler) 749 standard cells 749 sequential cells 97 tap cells 224 filler cells 488 total placed cells 1,237 cell area 80 µm² core utilisation 70.9 % i/o pins 77 target clock 239.8 ps (4.17 ghz) — derived from f<sub>max</sub> and slack achieved f<sub>max</sub> 3.73 ghz setup wns -28.64 ps setup tns -2006 ps hold wns 46.07 ps routed wirelength 1,069 µm routed nets 562 vias 3,815 detailed-route drc 0 antenna-violating nets 0 total power 0.409 mw gds-ii size 0.7 mb"
 },
 {
  "slug": "orfs-gf180-aes-hybrid",
  "name": "AES-128 cipher — hybrid cell mix",
  "blurb": "AES built from a mixed standard-cell set, trading area against timing on the same process.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "gf180",
  "pdkLabel": "GlobalFoundries GF180MCU (open PDK)",
  "node": "180 nm",
  "pdkNote": "GF180MCU is GlobalFoundries' open-sourced 180 nm MCU process, a manufacturable foundry PDK. This platform is configured for 9-track cells, a 5-metal stack (5LM_1TM) and the 5.0 V power option.",
  "head": [
   [
    "Die",
    "1195 × 1195 µm"
   ],
   [
    "Instances",
    "19,510"
   ],
   [
    "F<sub>max</sub>",
    "245.73 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "180 nm — GlobalFoundries GF180MCU (open PDK)"
   ],
   [
    "Standard-cell library",
    "gf180mcu_fd_sc_mcu9t5v0 — 9-track, 5.0 V"
   ],
   [
    "Top module",
    "aes_cipher_top"
   ],
   [
    "Die size",
    "1194.93 × 1194.93 µm"
   ],
   [
    "Die area",
    "1.428 mm² (1,427,870 µm²)"
   ],
   [
    "Core area",
    "1.408 mm² (1,408,100 µm²)"
   ],
   [
    "Instances (excl. filler)",
    "19,510"
   ],
   [
    "Standard cells",
    "19,510"
   ],
   [
    "Sequential cells",
    "562"
   ],
   [
    "Tap cells",
    "797"
   ],
   [
    "Total placed cells",
    "19,243"
   ],
   [
    "Cell area",
    "671,965 µm²"
   ],
   [
    "Core utilisation",
    "47.7 %"
   ],
   [
    "I/O pins",
    "390"
   ],
   [
    "Target clock",
    "3 ns (333.33 MHz) — derived from F<sub>max</sub> and slack"
   ],
   [
    "Achieved F<sub>max</sub>",
    "245.73 MHz"
   ],
   [
    "Setup WNS",
    "-1.07 ns"
   ],
   [
    "Setup TNS",
    "-148.4 ns"
   ],
   [
    "Hold WNS",
    "0.1851 ns"
   ],
   [
    "Routed wirelength",
    "1,360,985 µm"
   ],
   [
    "Routed nets",
    "18,954"
   ],
   [
    "Vias",
    "120,924"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "12459.300 mW"
   ],
   [
    "GDS-II size",
    "32.6 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-gf180-aes-hybrid/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-gf180-aes-hybrid/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-gf180-aes-hybrid/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-gf180-aes-hybrid/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-gf180-aes-hybrid/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-gf180-aes-hybrid/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-gf180-aes-hybrid/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-gf180-aes-hybrid/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-gf180-aes-hybrid/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-gf180-aes-hybrid/cts_clk.webp",
    "cap": "Clock tree — clk"
   }
  ],
  "searchText": "aes-128 cipher — hybrid cell mix aes built from a mixed standard-cell set, trading area against timing on the same process. openroad-flow-scripts (orfs) globalfoundries gf180mcu (open pdk) 180 nm technology 180 nm — globalfoundries gf180mcu (open pdk) standard-cell library gf180mcu_fd_sc_mcu9t5v0 — 9-track, 5.0 v top module aes_cipher_top die size 1194.93 × 1194.93 µm die area 1.428 mm² (1,427,870 µm²) core area 1.408 mm² (1,408,100 µm²) instances (excl. filler) 19,510 standard cells 19,510 sequential cells 562 tap cells 797 total placed cells 19,243 cell area 671,965 µm² core utilisation 47.7 % i/o pins 390 target clock 3 ns (333.33 mhz) — derived from f<sub>max</sub> and slack achieved f<sub>max</sub> 245.73 mhz setup wns -1.07 ns setup tns -148.4 ns hold wns 0.1851 ns routed wirelength 1,360,985 µm routed nets 18,954 vias 120,924 detailed-route drc 0 antenna-violating nets 0 total power 12459.300 mw gds-ii size 32.6 mb"
 },
 {
  "slug": "orfs-gf180-aes",
  "name": "AES-128 cipher",
  "blurb": "A flat AES-128 cipher hardened on the open GF180MCU foundry process.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "gf180",
  "pdkLabel": "GlobalFoundries GF180MCU (open PDK)",
  "node": "180 nm",
  "pdkNote": "GF180MCU is GlobalFoundries' open-sourced 180 nm MCU process, a manufacturable foundry PDK. This platform is configured for 9-track cells, a 5-metal stack (5LM_1TM) and the 5.0 V power option.",
  "head": [
   [
    "Die",
    "1038 × 1038 µm"
   ],
   [
    "Instances",
    "20,963"
   ],
   [
    "F<sub>max</sub>",
    "256.89 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "180 nm — GlobalFoundries GF180MCU (open PDK)"
   ],
   [
    "Standard-cell library",
    "gf180mcu_fd_sc_mcu9t5v0 — 9-track, 5.0 V"
   ],
   [
    "Top module",
    "aes_cipher_top"
   ],
   [
    "Die size",
    "1037.67 × 1037.67 µm"
   ],
   [
    "Die area",
    "1.077 mm² (1,076,760 µm²)"
   ],
   [
    "Core area",
    "1.062 mm² (1,062,290 µm²)"
   ],
   [
    "Instances (excl. filler)",
    "20,963"
   ],
   [
    "Standard cells",
    "20,963"
   ],
   [
    "Sequential cells",
    "562"
   ],
   [
    "Tap cells",
    "1,030"
   ],
   [
    "Filler cells",
    "23,578"
   ],
   [
    "Total placed cells",
    "44,131"
   ],
   [
    "Cell area",
    "739,793 µm²"
   ],
   [
    "Core utilisation",
    "69.6 %"
   ],
   [
    "I/O pins",
    "390"
   ],
   [
    "Target clock",
    "3 ns (333.33 MHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "256.89 MHz"
   ],
   [
    "Setup WNS",
    "-0.8927 ns"
   ],
   [
    "Setup TNS",
    "-114.5 ns"
   ],
   [
    "Hold WNS",
    "0.1164 ns"
   ],
   [
    "Routed wirelength",
    "1,172,167 µm"
   ],
   [
    "Routed nets",
    "20,035"
   ],
   [
    "Vias",
    "121,502"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "14087.700 mW"
   ],
   [
    "GDS-II size",
    "37.5 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-gf180-aes/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-gf180-aes/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-gf180-aes/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-gf180-aes/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-gf180-aes/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-gf180-aes/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-gf180-aes/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-gf180-aes/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-gf180-aes/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-gf180-aes/cts_clk.webp",
    "cap": "Clock tree — clk"
   }
  ],
  "searchText": "aes-128 cipher a flat aes-128 cipher hardened on the open gf180mcu foundry process. openroad-flow-scripts (orfs) globalfoundries gf180mcu (open pdk) 180 nm technology 180 nm — globalfoundries gf180mcu (open pdk) standard-cell library gf180mcu_fd_sc_mcu9t5v0 — 9-track, 5.0 v top module aes_cipher_top die size 1037.67 × 1037.67 µm die area 1.077 mm² (1,076,760 µm²) core area 1.062 mm² (1,062,290 µm²) instances (excl. filler) 20,963 standard cells 20,963 sequential cells 562 tap cells 1,030 filler cells 23,578 total placed cells 44,131 cell area 739,793 µm² core utilisation 69.6 % i/o pins 390 target clock 3 ns (333.33 mhz) achieved f<sub>max</sub> 256.89 mhz setup wns -0.8927 ns setup tns -114.5 ns hold wns 0.1164 ns routed wirelength 1,172,167 µm routed nets 20,035 vias 121,502 detailed-route drc 0 antenna-violating nets 0 total power 14087.700 mw gds-ii size 37.5 mb"
 },
 {
  "slug": "orfs-gf180-ibex",
  "name": "Ibex RV32 CPU core",
  "blurb": "lowRISC's Ibex — a compact two-stage 32-bit RISC-V core — implemented on GF180MCU.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "gf180",
  "pdkLabel": "GlobalFoundries GF180MCU (open PDK)",
  "node": "180 nm",
  "pdkNote": "GF180MCU is GlobalFoundries' open-sourced 180 nm MCU process, a manufacturable foundry PDK. This platform is configured for 9-track cells, a 5-metal stack (5LM_1TM) and the 5.0 V power option.",
  "head": [
   [
    "Die",
    "1148 × 1148 µm"
   ],
   [
    "Instances",
    "14,947"
   ],
   [
    "F<sub>max</sub>",
    "98.67 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "180 nm — GlobalFoundries GF180MCU (open PDK)"
   ],
   [
    "Standard-cell library",
    "gf180mcu_fd_sc_mcu9t5v0 — 9-track, 5.0 V"
   ],
   [
    "Top module",
    "ibex_core"
   ],
   [
    "Die size",
    "1148.03 × 1148.03 µm"
   ],
   [
    "Die area",
    "1.318 mm² (1,317,960 µm²)"
   ],
   [
    "Core area",
    "1.305 mm² (1,305,070 µm²)"
   ],
   [
    "Instances (excl. filler)",
    "14,947"
   ],
   [
    "Standard cells",
    "14,947"
   ],
   [
    "Sequential cells",
    "1,939"
   ],
   [
    "Tap cells",
    "1,254"
   ],
   [
    "Filler cells",
    "23,180"
   ],
   [
    "Total placed cells",
    "37,651"
   ],
   [
    "Cell area",
    "697,378 µm²"
   ],
   [
    "Core utilisation",
    "53.4 %"
   ],
   [
    "I/O pins",
    "266"
   ],
   [
    "Target clock",
    "10 ns (100.00 MHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "98.67 MHz"
   ],
   [
    "Setup WNS",
    "-0.1347 ns"
   ],
   [
    "Setup TNS",
    "-0.3504 ns"
   ],
   [
    "Hold WNS",
    "0.07178 ns"
   ],
   [
    "Routed wirelength",
    "1,317,542 µm"
   ],
   [
    "Routed nets",
    "14,019"
   ],
   [
    "Vias",
    "110,262"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "650.325 mW"
   ],
   [
    "GDS-II size",
    "40.8 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-gf180-ibex/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-gf180-ibex/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-gf180-ibex/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-gf180-ibex/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-gf180-ibex/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-gf180-ibex/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-gf180-ibex/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-gf180-ibex/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-gf180-ibex/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-gf180-ibex/cts_core_clock.webp",
    "cap": "Clock tree — core_clock"
   }
  ],
  "searchText": "ibex rv32 cpu core lowrisc's ibex — a compact two-stage 32-bit risc-v core — implemented on gf180mcu. openroad-flow-scripts (orfs) globalfoundries gf180mcu (open pdk) 180 nm technology 180 nm — globalfoundries gf180mcu (open pdk) standard-cell library gf180mcu_fd_sc_mcu9t5v0 — 9-track, 5.0 v top module ibex_core die size 1148.03 × 1148.03 µm die area 1.318 mm² (1,317,960 µm²) core area 1.305 mm² (1,305,070 µm²) instances (excl. filler) 14,947 standard cells 14,947 sequential cells 1,939 tap cells 1,254 filler cells 23,180 total placed cells 37,651 cell area 697,378 µm² core utilisation 53.4 % i/o pins 266 target clock 10 ns (100.00 mhz) achieved f<sub>max</sub> 98.67 mhz setup wns -0.1347 ns setup tns -0.3504 ns hold wns 0.07178 ns routed wirelength 1,317,542 µm routed nets 14,019 vias 110,262 detailed-route drc 0 antenna-violating nets 0 total power 650.325 mw gds-ii size 40.8 mb"
 },
 {
  "slug": "orfs-gf180-uart-blocks",
  "name": "UART — hierarchical",
  "blurb": "A UART built hierarchically, with its receiver hardened separately and placed as a macro.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "gf180",
  "pdkLabel": "GlobalFoundries GF180MCU (open PDK)",
  "node": "180 nm",
  "pdkNote": "GF180MCU is GlobalFoundries' open-sourced 180 nm MCU process, a manufacturable foundry PDK. This platform is configured for 9-track cells, a 5-metal stack (5LM_1TM) and the 5.0 V power option.",
  "head": [
   [
    "Die",
    "430 × 430 µm"
   ],
   [
    "Instances",
    "633"
   ],
   [
    "F<sub>max</sub>",
    "229.74 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "180 nm — GlobalFoundries GF180MCU (open PDK)"
   ],
   [
    "Standard-cell library",
    "gf180mcu_fd_sc_mcu9t5v0 — 9-track, 5.0 V"
   ],
   [
    "Top module",
    "uart"
   ],
   [
    "Die size",
    "430.00 × 430.00 µm"
   ],
   [
    "Die area",
    "184,900 µm²"
   ],
   [
    "Core area",
    "167,346 µm²"
   ],
   [
    "Instances (excl. filler)",
    "633"
   ],
   [
    "Standard cells",
    "632"
   ],
   [
    "Hard macros",
    "1"
   ],
   [
    "Sequential cells",
    "35"
   ],
   [
    "Tap cells",
    "94"
   ],
   [
    "Filler cells",
    "1,240"
   ],
   [
    "Total placed cells",
    "1,613"
   ],
   [
    "Cell area",
    "61,601 µm²"
   ],
   [
    "Core utilisation",
    "36.8 %"
   ],
   [
    "I/O pins",
    "44"
   ],
   [
    "Target clock",
    "6 ns (166.67 MHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "229.74 MHz"
   ],
   [
    "Setup WNS",
    "1.647 ns"
   ],
   [
    "Setup TNS",
    "0 ns"
   ],
   [
    "Hold WNS",
    "0.4173 ns"
   ],
   [
    "Routed wirelength",
    "15,297 µm"
   ],
   [
    "Routed nets",
    "319"
   ],
   [
    "Vias",
    "1,861"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "43.902 mW"
   ],
   [
    "GDS-II size",
    "1.3 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-gf180-uart-blocks/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks/cts_clk.webp",
    "cap": "Clock tree — clk"
   }
  ],
  "searchText": "uart — hierarchical a uart built hierarchically, with its receiver hardened separately and placed as a macro. openroad-flow-scripts (orfs) globalfoundries gf180mcu (open pdk) 180 nm technology 180 nm — globalfoundries gf180mcu (open pdk) standard-cell library gf180mcu_fd_sc_mcu9t5v0 — 9-track, 5.0 v top module uart die size 430.00 × 430.00 µm die area 184,900 µm² core area 167,346 µm² instances (excl. filler) 633 standard cells 632 hard macros 1 sequential cells 35 tap cells 94 filler cells 1,240 total placed cells 1,613 cell area 61,601 µm² core utilisation 36.8 % i/o pins 44 target clock 6 ns (166.67 mhz) achieved f<sub>max</sub> 229.74 mhz setup wns 1.647 ns setup tns 0 ns hold wns 0.4173 ns routed wirelength 15,297 µm routed nets 319 vias 1,861 detailed-route drc 0 antenna-violating nets 0 total power 43.902 mw gds-ii size 1.3 mb"
 },
 {
  "slug": "orfs-gf180-uart-blocks_uart_rx",
  "name": "UART receiver block",
  "blurb": "The uart_rx sub-block of the hierarchical UART, hardened on its own.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "gf180",
  "pdkLabel": "GlobalFoundries GF180MCU (open PDK)",
  "node": "180 nm",
  "pdkNote": "GF180MCU is GlobalFoundries' open-sourced 180 nm MCU process, a manufacturable foundry PDK. This platform is configured for 9-track cells, a 5-metal stack (5LM_1TM) and the 5.0 V power option.",
  "head": [
   [
    "Die",
    "216 × 216 µm"
   ],
   [
    "Instances",
    "477"
   ],
   [
    "F<sub>max</sub>",
    "266.77 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "180 nm — GlobalFoundries GF180MCU (open PDK)"
   ],
   [
    "Standard-cell library",
    "gf180mcu_fd_sc_mcu9t5v0 — 9-track, 5.0 V"
   ],
   [
    "Top module",
    "uart"
   ],
   [
    "Die size",
    "216.06 × 216.06 µm"
   ],
   [
    "Die area",
    "46,682 µm²"
   ],
   [
    "Core area",
    "43,742 µm²"
   ],
   [
    "Instances (excl. filler)",
    "477"
   ],
   [
    "Standard cells",
    "477"
   ],
   [
    "Sequential cells",
    "44"
   ],
   [
    "Tap cells",
    "43"
   ],
   [
    "Filler cells",
    "780"
   ],
   [
    "Total placed cells",
    "1,175"
   ],
   [
    "Cell area",
    "15,769 µm²"
   ],
   [
    "Core utilisation",
    "36.0 %"
   ],
   [
    "I/O pins",
    "32"
   ],
   [
    "Target clock",
    "6 ns (166.67 MHz) — derived from F<sub>max</sub> and slack"
   ],
   [
    "Achieved F<sub>max</sub>",
    "266.77 MHz"
   ],
   [
    "Setup WNS",
    "2.252 ns"
   ],
   [
    "Setup TNS",
    "0 ns"
   ],
   [
    "Hold WNS",
    "0.4196 ns"
   ],
   [
    "Routed wirelength",
    "14,110 µm"
   ],
   [
    "Routed nets",
    "374"
   ],
   [
    "Vias",
    "2,268"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "45.810 mW"
   ],
   [
    "GDS-II size",
    "0.6 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-gf180-uart-blocks_uart_rx/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks_uart_rx/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks_uart_rx/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks_uart_rx/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks_uart_rx/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks_uart_rx/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks_uart_rx/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks_uart_rx/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks_uart_rx/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-gf180-uart-blocks_uart_rx/cts_clk.webp",
    "cap": "Clock tree — clk"
   }
  ],
  "searchText": "uart receiver block the uart_rx sub-block of the hierarchical uart, hardened on its own. openroad-flow-scripts (orfs) globalfoundries gf180mcu (open pdk) 180 nm technology 180 nm — globalfoundries gf180mcu (open pdk) standard-cell library gf180mcu_fd_sc_mcu9t5v0 — 9-track, 5.0 v top module uart die size 216.06 × 216.06 µm die area 46,682 µm² core area 43,742 µm² instances (excl. filler) 477 standard cells 477 sequential cells 44 tap cells 43 filler cells 780 total placed cells 1,175 cell area 15,769 µm² core utilisation 36.0 % i/o pins 32 target clock 6 ns (166.67 mhz) — derived from f<sub>max</sub> and slack achieved f<sub>max</sub> 266.77 mhz setup wns 2.252 ns setup tns 0 ns hold wns 0.4196 ns routed wirelength 14,110 µm routed nets 374 vias 2,268 detailed-route drc 0 antenna-violating nets 0 total power 45.810 mw gds-ii size 0.6 mb"
 },
 {
  "slug": "orfs-nangate45-aes",
  "name": "AES-128 cipher",
  "blurb": "A flat AES-128 cipher on the Nangate45 reference platform.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "nangate45",
  "pdkLabel": "FreePDK45 / Nangate45",
  "node": "45 nm",
  "pdkNote": "The Nangate Open Cell Library on FreePDK45. It is an academic platform rather than a manufacturable process, and has long served as a reference for EDA research and flow bring-up.",
  "head": [
   [
    "Die",
    "250 × 251 µm"
   ],
   [
    "Instances",
    "16,232"
   ],
   [
    "F<sub>max</sub>",
    "1.21 GHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "45 nm — FreePDK45 / Nangate45"
   ],
   [
    "Standard-cell library",
    "NangateOpenCellLibrary"
   ],
   [
    "Top module",
    "aes_cipher_top"
   ],
   [
    "Die size",
    "249.85 × 250.60 µm"
   ],
   [
    "Die area",
    "62,612 µm²"
   ],
   [
    "Core area",
    "52,785 µm²"
   ],
   [
    "Instances (excl. filler)",
    "16,232"
   ],
   [
    "Standard cells",
    "16,232"
   ],
   [
    "Sequential cells",
    "562"
   ],
   [
    "Tap cells",
    "411"
   ],
   [
    "Filler cells",
    "16,851"
   ],
   [
    "Total placed cells",
    "33,083"
   ],
   [
    "Cell area",
    "20,019 µm²"
   ],
   [
    "Core utilisation",
    "37.9 %"
   ],
   [
    "I/O pins",
    "390"
   ],
   [
    "Target clock",
    "0.82 ns (1.22 GHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "1.21 GHz"
   ],
   [
    "Setup WNS",
    "-0.005103 ns"
   ],
   [
    "Setup TNS",
    "-0.005377 ns"
   ],
   [
    "Hold WNS",
    "0.0102 ns"
   ],
   [
    "Routed wirelength",
    "236,109 µm"
   ],
   [
    "Routed nets",
    "16,564"
   ],
   [
    "Vias",
    "125,919"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "333.548 mW"
   ],
   [
    "GDS-II size",
    "14.7 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-nangate45-aes/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-nangate45-aes/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-nangate45-aes/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-nangate45-aes/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-nangate45-aes/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-nangate45-aes/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-nangate45-aes/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-nangate45-aes/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-nangate45-aes/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-nangate45-aes/cts_clk.webp",
    "cap": "Clock tree — clk"
   }
  ],
  "searchText": "aes-128 cipher a flat aes-128 cipher on the nangate45 reference platform. openroad-flow-scripts (orfs) freepdk45 / nangate45 45 nm technology 45 nm — freepdk45 / nangate45 standard-cell library nangateopencelllibrary top module aes_cipher_top die size 249.85 × 250.60 µm die area 62,612 µm² core area 52,785 µm² instances (excl. filler) 16,232 standard cells 16,232 sequential cells 562 tap cells 411 filler cells 16,851 total placed cells 33,083 cell area 20,019 µm² core utilisation 37.9 % i/o pins 390 target clock 0.82 ns (1.22 ghz) achieved f<sub>max</sub> 1.21 ghz setup wns -0.005103 ns setup tns -0.005377 ns hold wns 0.0102 ns routed wirelength 236,109 µm routed nets 16,564 vias 125,919 detailed-route drc 0 antenna-violating nets 0 total power 333.548 mw gds-ii size 14.7 mb"
 },
 {
  "slug": "orfs-nangate45-gcd",
  "name": "GCD accelerator",
  "blurb": "The GCD datapath on Nangate45 — the default target of the OpenROAD flow.",
  "family": "openroad",
  "familyLabel": "OpenROAD Flow Scripts",
  "tool": "OpenROAD-flow-scripts (ORFS)",
  "toolLine": "Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
  "pdkKey": "nangate45",
  "pdkLabel": "FreePDK45 / Nangate45",
  "node": "45 nm",
  "pdkNote": "The Nangate Open Cell Library on FreePDK45. It is an academic platform rather than a manufacturable process, and has long served as a reference for EDA research and flow bring-up.",
  "head": [
   [
    "Die",
    "35 × 35 µm"
   ],
   [
    "Instances",
    "631"
   ],
   [
    "F<sub>max</sub>",
    "1.95 GHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "45 nm — FreePDK45 / Nangate45"
   ],
   [
    "Standard-cell library",
    "NangateOpenCellLibrary"
   ],
   [
    "Top module",
    "gcd"
   ],
   [
    "Die size",
    "35.22 × 35.22 µm"
   ],
   [
    "Die area",
    "1,240 µm²"
   ],
   [
    "Core area",
    "1,065 µm²"
   ],
   [
    "Instances (excl. filler)",
    "631"
   ],
   [
    "Standard cells",
    "631"
   ],
   [
    "Sequential cells",
    "35"
   ],
   [
    "Tap cells",
    "46"
   ],
   [
    "Filler cells",
    "221"
   ],
   [
    "Total placed cells",
    "852"
   ],
   [
    "Cell area",
    "854 µm²"
   ],
   [
    "Core utilisation",
    "80.3 %"
   ],
   [
    "I/O pins",
    "54"
   ],
   [
    "Target clock",
    "0.46 ns (2.17 GHz)"
   ],
   [
    "Achieved F<sub>max</sub>",
    "1.95 GHz"
   ],
   [
    "Setup WNS",
    "-0.05392 ns"
   ],
   [
    "Setup TNS",
    "-0.4759 ns"
   ],
   [
    "Hold WNS",
    "0.04976 ns"
   ],
   [
    "Routed wirelength",
    "4,239 µm"
   ],
   [
    "Routed nets",
    "653"
   ],
   [
    "Vias",
    "3,500"
   ],
   [
    "Detailed-route DRC",
    "0"
   ],
   [
    "Antenna-violating nets",
    "0"
   ],
   [
    "Total power",
    "3.889 mW"
   ],
   [
    "GDS-II size",
    "0.5 MB"
   ]
  ],
  "images": [
   {
    "src": "assets/img/orfs-nangate45-gcd/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   },
   {
    "src": "assets/img/orfs-nangate45-gcd/final_all.webp",
    "cap": "Final layout — every mask layer"
   },
   {
    "src": "assets/img/orfs-nangate45-gcd/final_routing.webp",
    "cap": "Detailed routing"
   },
   {
    "src": "assets/img/orfs-nangate45-gcd/final_placement.webp",
    "cap": "Standard-cell placement"
   },
   {
    "src": "assets/img/orfs-nangate45-gcd/final_congestion.webp",
    "cap": "Global-routing congestion"
   },
   {
    "src": "assets/img/orfs-nangate45-gcd/final_clocks.webp",
    "cap": "Clock nets"
   },
   {
    "src": "assets/img/orfs-nangate45-gcd/final_ir_drop.webp",
    "cap": "Power-grid IR drop"
   },
   {
    "src": "assets/img/orfs-nangate45-gcd/final_resizer.webp",
    "cap": "Cells added by the resizer"
   },
   {
    "src": "assets/img/orfs-nangate45-gcd/final_worst_path.webp",
    "cap": "Worst timing path"
   },
   {
    "src": "assets/img/orfs-nangate45-gcd/cts_core_clock.webp",
    "cap": "Clock tree — core_clock"
   }
  ],
  "searchText": "gcd accelerator the gcd datapath on nangate45 — the default target of the openroad flow. openroad-flow-scripts (orfs) freepdk45 / nangate45 45 nm technology 45 nm — freepdk45 / nangate45 standard-cell library nangateopencelllibrary top module gcd die size 35.22 × 35.22 µm die area 1,240 µm² core area 1,065 µm² instances (excl. filler) 631 standard cells 631 sequential cells 35 tap cells 46 filler cells 221 total placed cells 852 cell area 854 µm² core utilisation 80.3 % i/o pins 54 target clock 0.46 ns (2.17 ghz) achieved f<sub>max</sub> 1.95 ghz setup wns -0.05392 ns setup tns -0.4759 ns hold wns 0.04976 ns routed wirelength 4,239 µm routed nets 653 vias 3,500 detailed-route drc 0 antenna-violating nets 0 total power 3.889 mw gds-ii size 0.5 mb"
 },
 {
  "family": "synopsys",
  "familyLabel": "Synopsys Fusion Compiler",
  "tool": "Synopsys Fusion Compiler X-2025.06-SP3",
  "toolLine": "Fusion Compiler — RTL-to-GDSII in a single engine: synthesis, floorplanning, placement, CTS, routing and sign-off timing",
  "pdkKey": "saed32",
  "pdkLabel": "Synopsys SAED32/28 nm EDK",
  "node": "32 nm",
  "pdkNote": "SAED32/28 nm is Synopsys' Educational Design Kit: a complete, academically licensed 32 nm technology with a 1P9M metal stack, three threshold-voltage flavours (RVT / LVT / HVT) and low-power SRAM macros. It is licensed for teaching and research use.",
  "slug": "fc-risc-core",
  "name": "RISC core with embedded SRAM",
  "blurb": "A RISC processor core hardened in Fusion Compiler with four SRAM macros placed around a central logic region. The finished layout shows the memories in the upper and right quadrants and the random logic packed into the lower-left.",
  "head": [
   [
    "Chip area",
    "104,386 µm²"
   ],
   [
    "Leaf cells",
    "8,286"
   ],
   [
    "Macros",
    "4 × SRAM"
   ]
  ],
  "specs": [
   [
    "Technology",
    "32 nm — Synopsys SAED32/28 nm EDK"
   ],
   [
    "Technology file",
    "saed32nm_1p9m.tf (1 poly, 9 metal), TLU+ Cmax / Cmin extraction models"
   ],
   [
    "Cell libraries",
    "saed32_rvt / saed32_lvt / saed32_hvt NDM, plus saed32_sram_lp SRAM macros"
   ],
   [
    "Top module",
    "risc_core"
   ],
   [
    "Chip area",
    "104,385.648 µm²"
   ],
   [
    "Core area",
    "91,862.128 µm²"
   ],
   [
    "Site-row area",
    "91,862.128 µm²"
   ],
   [
    "Total leaf cells",
    "8,286 — 70,608.401 µm²"
   ],
   [
    "Standard cells",
    "4,308 — 15,887.812 µm²"
   ],
   [
    "Hard macros",
    "4 — 51,184.683 µm² (SRAM)"
   ],
   [
    "Sequential cells",
    "490 — 55,341.971 µm²"
   ],
   [
    "Buffers / inverters",
    "1,034 — 2,986.446 µm²"
   ],
   [
    "Clock-gating cells",
    "19"
   ],
   [
    "Physical-only cells",
    "3,974 — 3,535.905 µm²"
   ],
   [
    "Flat nets",
    "5,147"
   ],
   [
    "Ports",
    "149"
   ],
   [
    "Design masters",
    "171"
   ],
   [
    "Placement blockages",
    "9 — 2,801.459 µm²"
   ],
   [
    "Clocks",
    "1 master clock, no generated clocks"
   ],
   [
    "Modes / corners",
    "func mode; corners ss_125c and ff_m40c (two scenarios)"
   ],
   [
    "Path groups",
    "7 (1 non-default)"
   ],
   [
    "Power domains",
    "1 domain, 1 voltage area"
   ],
   [
    "Total wire length",
    "135,460.53 µm"
   ],
   [
    "Wires",
    "51,792"
   ],
   [
    "Contacts",
    "54,010"
   ],
   [
    "Metal layers available",
    "71 tech layers in the technology file"
   ],
   [
    "Report date",
    "23 March 2026"
   ]
  ],
  "images": [
   {
    "src": "assets/img/fc-risc-core/layout.webp",
    "cap": "Finished layout — four SRAM macros and the routed core"
   },
   {
    "src": "assets/img/fc-risc-core/placement.webp",
    "cap": "Placement"
   },
   {
    "src": "assets/img/fc-risc-core/floorplan.webp",
    "cap": "Floorplan with macro placement"
   }
  ],
  "searchText": "risc core with embedded sram a risc processor core hardened in fusion compiler with four sram macros placed around a central logic region. the finished layout shows the memories in the upper and right quadrants and the random logic packed into the lower-left. synopsys fusion compiler x-2025.06-sp3 synopsys saed32/28 nm edk 32 nm technology 32 nm — synopsys saed32/28 nm edk technology file saed32nm_1p9m.tf (1 poly, 9 metal), tlu+ cmax / cmin extraction models cell libraries saed32_rvt / saed32_lvt / saed32_hvt ndm, plus saed32_sram_lp sram macros top module risc_core chip area 104,385.648 µm² core area 91,862.128 µm² site-row area 91,862.128 µm² total leaf cells 8,286 — 70,608.401 µm² standard cells 4,308 — 15,887.812 µm² hard macros 4 — 51,184.683 µm² (sram) sequential cells 490 — 55,341.971 µm² buffers / inverters 1,034 — 2,986.446 µm² clock-gating cells 19 physical-only cells 3,974 — 3,535.905 µm² flat nets 5,147 ports 149 design masters 171 placement blockages 9 — 2,801.459 µm² clocks 1 master clock, no generated clocks modes / corners func mode; corners ss_125c and ff_m40c (two scenarios) path groups 7 (1 non-default) power domains 1 domain, 1 voltage area total wire length 135,460.53 µm wires 51,792 contacts 54,010 metal layers available 71 tech layers in the technology file report date 23 march 2026"
 },
 {
  "family": "synopsys",
  "familyLabel": "Synopsys Fusion Compiler",
  "tool": "Synopsys Fusion Compiler X-2025.06-SP3",
  "toolLine": "Fusion Compiler — RTL-to-GDSII in a single engine: synthesis, floorplanning, placement, CTS, routing and sign-off timing",
  "pdkKey": "saed32",
  "pdkLabel": "Synopsys SAED32/28 nm EDK",
  "node": "32 nm",
  "pdkNote": "SAED32/28 nm is Synopsys' Educational Design Kit: a complete, academically licensed 32 nm technology with a 1P9M metal stack, three threshold-voltage flavours (RVT / LVT / HVT) and low-power SRAM macros. It is licensed for teaching and research use.",
  "slug": "fc-jpeg-encoder",
  "name": "JPEG encoder",
  "blurb": "A baseline JPEG encoder — the largest all-standard-cell design in the Fusion Compiler set at just over 25,000 leaf cells and 607 mm of routed wire. Closes timing at the slow corner; the fast corner still shows a small setup and hold residue.",
  "head": [
   [
    "Chip area",
    "124,900 µm²"
   ],
   [
    "Leaf cells",
    "25,461"
   ],
   [
    "Wire",
    "607 mm"
   ]
  ],
  "specs": [
   [
    "Technology",
    "32 nm — Synopsys SAED32/28 nm EDK"
   ],
   [
    "Cell libraries",
    "saed32_rvt / saed32_lvt / saed32_hvt NDM, plus saed32_sram_lp SRAM macros"
   ],
   [
    "Top module",
    "jpeg_encoder"
   ],
   [
    "Chip area",
    "124,899.574 µm²"
   ],
   [
    "Core area",
    "111,163.094 µm²"
   ],
   [
    "Total leaf cells",
    "25,461 — 97,293.185 µm²"
   ],
   [
    "Standard cells",
    "20,891 — 94,173.313 µm²"
   ],
   [
    "Hard macros",
    "none — fully standard-cell"
   ],
   [
    "Sequential cells",
    "4,335 — 36,770.062 µm²"
   ],
   [
    "Buffers / inverters",
    "5,762 — 20,775.255 µm²"
   ],
   [
    "Clock-gating cells",
    "76"
   ],
   [
    "Physical-only cells",
    "4,570 — 3,119.872 µm²"
   ],
   [
    "Flat nets",
    "25,338 (25,336 detail-routed)"
   ],
   [
    "Ports",
    "49"
   ],
   [
    "Design masters",
    "162"
   ],
   [
    "Modes / corners",
    "func mode; corners ss_125c and ff_m40c (two scenarios)"
   ],
   [
    "Setup WNS / TNS",
    "−0.30 ns / −8.74 ns at ff_m40c (143 violating endpoints); +0.26 ns clean at ss_125c"
   ],
   [
    "Hold WNS / TNS",
    "−0.45 ns / −5.42 ns (102 violating endpoints)"
   ],
   [
    "Total wire length",
    "607,456.06 µm"
   ],
   [
    "Wires",
    "238,606"
   ],
   [
    "Contacts",
    "241,808"
   ],
   [
    "Cell area (netlist)",
    "94,173.31 µm²"
   ],
   [
    "Peak memory",
    "978 MB"
   ],
   [
    "Report date",
    "16 April 2026"
   ]
  ],
  "images": [
   {
    "src": "assets/img/fc-jpeg-encoder/layout.webp",
    "cap": "Finished routed layout"
   },
   {
    "src": "assets/img/fc-jpeg-encoder/merged.webp",
    "cap": "Side-by-side flow stages"
   },
   {
    "src": "assets/img/fc-jpeg-encoder/placement.webp",
    "cap": "Placement"
   },
   {
    "src": "assets/img/fc-jpeg-encoder/floorplan.webp",
    "cap": "Floorplan"
   }
  ],
  "searchText": "jpeg encoder a baseline jpeg encoder — the largest all-standard-cell design in the fusion compiler set at just over 25,000 leaf cells and 607 mm of routed wire. closes timing at the slow corner; the fast corner still shows a small setup and hold residue. synopsys fusion compiler x-2025.06-sp3 synopsys saed32/28 nm edk 32 nm technology 32 nm — synopsys saed32/28 nm edk cell libraries saed32_rvt / saed32_lvt / saed32_hvt ndm, plus saed32_sram_lp sram macros top module jpeg_encoder chip area 124,899.574 µm² core area 111,163.094 µm² total leaf cells 25,461 — 97,293.185 µm² standard cells 20,891 — 94,173.313 µm² hard macros none — fully standard-cell sequential cells 4,335 — 36,770.062 µm² buffers / inverters 5,762 — 20,775.255 µm² clock-gating cells 76 physical-only cells 4,570 — 3,119.872 µm² flat nets 25,338 (25,336 detail-routed) ports 49 design masters 162 modes / corners func mode; corners ss_125c and ff_m40c (two scenarios) setup wns / tns −0.30 ns / −8.74 ns at ff_m40c (143 violating endpoints); +0.26 ns clean at ss_125c hold wns / tns −0.45 ns / −5.42 ns (102 violating endpoints) total wire length 607,456.06 µm wires 238,606 contacts 241,808 cell area (netlist) 94,173.31 µm² peak memory 978 mb report date 16 april 2026"
 },
 {
  "family": "synopsys",
  "familyLabel": "Synopsys Fusion Compiler",
  "tool": "Synopsys Fusion Compiler X-2025.06-SP3",
  "toolLine": "Fusion Compiler — RTL-to-GDSII in a single engine: synthesis, floorplanning, placement, CTS, routing and sign-off timing",
  "pdkKey": "saed32",
  "pdkLabel": "Synopsys SAED32/28 nm EDK",
  "node": "32 nm",
  "pdkNote": "SAED32/28 nm is Synopsys' Educational Design Kit: a complete, academically licensed 32 nm technology with a 1P9M metal stack, three threshold-voltage flavours (RVT / LVT / HVT) and low-power SRAM macros. It is licensed for teaching and research use.",
  "slug": "fc-aes-cipher",
  "name": "AES-128 cipher",
  "blurb": "An AES cipher top hardened in Fusion Compiler. Setup timing closes at both corners with positive slack; only a handful of hold endpoints remain, and the 390-port interface dominates the pin ring around the core.",
  "head": [
   [
    "Chip area",
    "40,353 µm²"
   ],
   [
    "Leaf cells",
    "9,999"
   ],
   [
    "Setup",
    "+0.07 ns"
   ]
  ],
  "specs": [
   [
    "Technology",
    "32 nm — Synopsys SAED32/28 nm EDK"
   ],
   [
    "Cell libraries",
    "saed32_rvt / saed32_lvt / saed32_hvt NDM, plus saed32_sram_lp SRAM macros"
   ],
   [
    "Top module",
    "aes_cipher_top"
   ],
   [
    "Chip area",
    "40,352.682 µm²"
   ],
   [
    "Core area",
    "32,717.482 µm²"
   ],
   [
    "Total leaf cells",
    "9,999 — 24,395.537 µm²"
   ],
   [
    "Standard cells",
    "8,437 — 23,332.706 µm²"
   ],
   [
    "Hard macros",
    "none — fully standard-cell"
   ],
   [
    "Sequential cells",
    "537 — 4,735.973 µm²"
   ],
   [
    "Buffers / inverters",
    "972 — 1,751.306 µm²"
   ],
   [
    "Clock-gating cells",
    "7"
   ],
   [
    "Physical-only cells",
    "1,562 — 1,062.830 µm²"
   ],
   [
    "Flat nets",
    "8,920 (8,918 detail-routed)"
   ],
   [
    "Ports",
    "390"
   ],
   [
    "Design masters",
    "89"
   ],
   [
    "Modes / corners",
    "func mode; corners ss_125c and ff_m40c (two scenarios)"
   ],
   [
    "Setup WNS / TNS",
    "+0.07 ns / 0.00 ns — timing met at both corners"
   ],
   [
    "Hold WNS / TNS",
    "−0.03 ns / −0.09 ns (7 violating endpoints)"
   ],
   [
    "Total wire length",
    "245,624.94 µm"
   ],
   [
    "Wires",
    "109,287"
   ],
   [
    "Contacts",
    "101,383"
   ],
   [
    "Peak memory",
    "804 MB"
   ],
   [
    "Report date",
    "16 April 2026"
   ]
  ],
  "images": [
   {
    "src": "assets/img/fc-aes-cipher/layout.webp",
    "cap": "Finished routed layout"
   },
   {
    "src": "assets/img/fc-aes-cipher/placement.webp",
    "cap": "Placement"
   },
   {
    "src": "assets/img/fc-aes-cipher/floorplan.webp",
    "cap": "Floorplan"
   }
  ],
  "searchText": "aes-128 cipher an aes cipher top hardened in fusion compiler. setup timing closes at both corners with positive slack; only a handful of hold endpoints remain, and the 390-port interface dominates the pin ring around the core. synopsys fusion compiler x-2025.06-sp3 synopsys saed32/28 nm edk 32 nm technology 32 nm — synopsys saed32/28 nm edk cell libraries saed32_rvt / saed32_lvt / saed32_hvt ndm, plus saed32_sram_lp sram macros top module aes_cipher_top chip area 40,352.682 µm² core area 32,717.482 µm² total leaf cells 9,999 — 24,395.537 µm² standard cells 8,437 — 23,332.706 µm² hard macros none — fully standard-cell sequential cells 537 — 4,735.973 µm² buffers / inverters 972 — 1,751.306 µm² clock-gating cells 7 physical-only cells 1,562 — 1,062.830 µm² flat nets 8,920 (8,918 detail-routed) ports 390 design masters 89 modes / corners func mode; corners ss_125c and ff_m40c (two scenarios) setup wns / tns +0.07 ns / 0.00 ns — timing met at both corners hold wns / tns −0.03 ns / −0.09 ns (7 violating endpoints) total wire length 245,624.94 µm wires 109,287 contacts 101,383 peak memory 804 mb report date 16 april 2026"
 },
 {
  "family": "synopsys",
  "familyLabel": "Synopsys Fusion Compiler",
  "tool": "Synopsys Fusion Compiler X-2025.06-SP3",
  "toolLine": "Fusion Compiler — RTL-to-GDSII in a single engine: synthesis, floorplanning, placement, CTS, routing and sign-off timing",
  "pdkKey": "saed32",
  "pdkLabel": "Synopsys SAED32/28 nm EDK",
  "node": "32 nm",
  "pdkNote": "SAED32/28 nm is Synopsys' Educational Design Kit: a complete, academically licensed 32 nm technology with a 1P9M metal stack, three threshold-voltage flavours (RVT / LVT / HVT) and low-power SRAM macros. It is licensed for teaching and research use.",
  "slug": "fc-cortex-m0",
  "name": "Arm Cortex-M0 DesignStart",
  "blurb": "An Arm Cortex-M0 DesignStart core (CORTEXM0DS) taken through Fusion Compiler design planning to a signed-off, fully routed block complete with an I/O pad ring and corner cells — the most complete full-chip floorplan in the collection.",
  "head": [
   [
    "Core",
    "Cortex-M0"
   ],
   [
    "Stage",
    "Routed"
   ],
   [
    "Chip",
    "Pad ring"
   ]
  ],
  "specs": [
   [
    "Design library",
    "CORTEXM0DS.dlib — block CORTEXM0DS/signoff.design"
   ],
   [
    "Tool",
    "Synopsys Fusion Compiler, Design Planning / BlockWindow"
   ],
   [
    "Core IP",
    "Arm Cortex-M0 DesignStart — a 32-bit Armv6-M processor"
   ],
   [
    "Flow stage reached",
    "Sign-off design view: placed, clock-tree-synthesised and fully routed"
   ],
   [
    "Physical features",
    "Peripheral I/O pad ring with corner cells, a dense multi-layer routed core, and power-ground regions around the block"
   ],
   [
    "Technology",
    "Not recorded in this design's source files. The other Fusion Compiler projects in this set target the Synopsys SAED32/28 nm EDK."
   ],
   [
    "Captured",
    "April 2026"
   ]
  ],
  "images": [
   {
    "src": "assets/img/fc-cortex-m0/layout.webp",
    "cap": "Routed core inside the I/O pad ring"
   },
   {
    "src": "assets/img/fc-cortex-m0/floorplan.webp",
    "cap": "Floorplan"
   },
   {
    "src": "assets/img/fc-cortex-m0/gui.webp",
    "cap": "The Fusion Compiler session that produced it"
   }
  ],
  "searchText": "arm cortex-m0 designstart an arm cortex-m0 designstart core (cortexm0ds) taken through fusion compiler design planning to a signed-off, fully routed block complete with an i/o pad ring and corner cells — the most complete full-chip floorplan in the collection. synopsys fusion compiler x-2025.06-sp3 synopsys saed32/28 nm edk 32 nm design library cortexm0ds.dlib — block cortexm0ds/signoff.design tool synopsys fusion compiler, design planning / blockwindow core ip arm cortex-m0 designstart — a 32-bit armv6-m processor flow stage reached sign-off design view: placed, clock-tree-synthesised and fully routed physical features peripheral i/o pad ring with corner cells, a dense multi-layer routed core, and power-ground regions around the block technology not recorded in this design's source files. the other fusion compiler projects in this set target the synopsys saed32/28 nm edk. captured april 2026"
 },
 {
  "family": "synopsys",
  "familyLabel": "Synopsys Fusion Compiler",
  "tool": "Synopsys Fusion Compiler X-2025.06-SP3",
  "toolLine": "Fusion Compiler — RTL-to-GDSII in a single engine: synthesis, floorplanning, placement, CTS, routing and sign-off timing",
  "pdkKey": "saed32",
  "pdkLabel": "Synopsys SAED32/28 nm EDK",
  "node": "32 nm",
  "pdkNote": "SAED32/28 nm is Synopsys' Educational Design Kit: a complete, academically licensed 32 nm technology with a 1P9M metal stack, three threshold-voltage flavours (RVT / LVT / HVT) and low-power SRAM macros. It is licensed for teaching and research use.",
  "slug": "fc-dual-ram",
  "name": "Dual-port RAM — 256 × 8",
  "blurb": "A 256-word by 8-bit dual-port RAM built entirely from standard-cell flip-flops — no compiled memory macro — so the whole 2 kbit array is 2,313 registers spread across the die. Independent read and write addresses let both ports work in the same cycle, and a synchronous reset clears the array. Setup closes at both corners; the critical path runs from the read address pins straight to the output register.",
  "head": [
   [
    "Memory",
    "256 × 8"
   ],
   [
    "Clock",
    "200 MHz"
   ],
   [
    "Die",
    "222 × 222 µm"
   ]
  ],
  "specs": [
   [
    "Technology",
    "32 nm — Synopsys SAED32/28 nm EDK"
   ],
   [
    "Technology file",
    "saed32nm_1p9m.tf (1 poly, 9 metal), TLU+ Cmax / Cmin extraction models"
   ],
   [
    "Cell libraries",
    "saed32_rvt / saed32_lvt / saed32_hvt NDM, plus saed32_sram_lp SRAM macros"
   ],
   [
    "Threshold flavours",
    "Predominantly HVT, with RVT and LVT where timing needed it"
   ],
   [
    "Top module",
    "dual_ram"
   ],
   [
    "Memory organisation",
    "256 words × 8 bits — 2 kbit, register-based, no SRAM macro"
   ],
   [
    "Ports",
    "clk, rst, wr_enb, rd_enb, wr_addr[7:0], rd_addr[7:0], data_in[7:0], data_out[7:0]"
   ],
   [
    "Architecture",
    "Independent read and write addresses, synchronous reset clearing the whole array"
   ],
   [
    "Clock",
    "clk, 5.000 ns period — 200 MHz, waveform {0 2.5}"
   ],
   [
    "Die size",
    "222.31 × 222.31 µm"
   ],
   [
    "Chip area",
    "49,422.625 µm²"
   ],
   [
    "Core area",
    "40,930.145 µm²"
   ],
   [
    "Total cell area",
    "26,803.30 µm²"
   ],
   [
    "Cell area with physical-only",
    "31,383.99 µm²"
   ],
   [
    "Core utilisation",
    "65.5 % (cell area over core area)"
   ],
   [
    "Cells",
    "4,872 — 2,559 combinational, 2,313 sequential, 1,061 buffer/inverter"
   ],
   [
    "Hard macros",
    "None — the array is built from flip-flops"
   ],
   [
    "Combinational area",
    "7,146.53 µm²"
   ],
   [
    "Noncombinational area",
    "19,656.77 µm²"
   ],
   [
    "Buffer/inverter area",
    "2,891.90 µm²"
   ],
   [
    "Placed instances incl. fill",
    "11,207"
   ],
   [
    "Nets",
    "4,902"
   ],
   [
    "Ports",
    "38"
   ],
   [
    "Cell references",
    "60"
   ],
   [
    "Modes / corners",
    "func mode; corners ss_125c and ff_m40c (two scenarios)"
   ],
   [
    "Setup WNS / TNS",
    "+0.29 ns / 0.00 ns at ff_m40c, +0.81 ns at ss_125c — met at both corners"
   ],
   [
    "Hold WNS / TNS",
    "−0.01 ns / −0.01 ns (2 violating endpoints)"
   ],
   [
    "Critical path",
    "rd_addr[3] input port → data_out_reg[5], slack +0.29 ns"
   ],
   [
    "Clock tree (post-CTS)",
    "2,056 sinks, 26 levels, 838 repeaters, 30,930 µm of clock wire"
   ],
   [
    "Clock latency / skew",
    "2.57 ns / 1.48 ns at ff_m40c; 2.17 ns / 1.24 ns at ss_125c"
   ],
   [
    "Routing layers",
    "M1 – M9"
   ],
   [
    "Open nets",
    "0 of 4,902"
   ],
   [
    "Detailed-route DRC",
    "0 after route_opt; 26 reported at sign-off, after metal fill"
   ],
   [
    "LVS",
    "M1 shorts reported among SHFILL3_HVT filler cells; the check stops after 20"
   ],
   [
    "Total power",
    "8.85 mW — 1.71 mW dynamic, 7.13 mW leakage at the slow 125 °C corner"
   ],
   [
    "Power by group",
    "Registers 80.5 %, clock network 13.0 %, combinational 6.6 %"
   ],
   [
    "GDS-II size",
    "7.1 MB"
   ],
   [
    "Run date",
    "21 September 2026"
   ]
  ],
  "images": [
   {
    "src": "assets/img/fc-dual-ram/gds.webp",
    "cap": "GDS-II tape-out database, rendered in KLayout"
   }
  ],
  "searchText": "dual-port ram — 256 × 8 a 256-word by 8-bit dual-port ram built entirely from standard-cell flip-flops — no compiled memory macro — so the whole 2 kbit array is 2,313 registers spread across the die. independent read and write addresses let both ports work in the same cycle, and a synchronous reset clears the array. setup closes at both corners; the critical path runs from the read address pins straight to the output register. synopsys fusion compiler x-2025.06-sp3 synopsys saed32/28 nm edk 32 nm technology 32 nm — synopsys saed32/28 nm edk technology file saed32nm_1p9m.tf (1 poly, 9 metal), tlu+ cmax / cmin extraction models cell libraries saed32_rvt / saed32_lvt / saed32_hvt ndm, plus saed32_sram_lp sram macros threshold flavours predominantly hvt, with rvt and lvt where timing needed it top module dual_ram memory organisation 256 words × 8 bits — 2 kbit, register-based, no sram macro ports clk, rst, wr_enb, rd_enb, wr_addr[7:0], rd_addr[7:0], data_in[7:0], data_out[7:0] architecture independent read and write addresses, synchronous reset clearing the whole array clock clk, 5.000 ns period — 200 mhz, waveform {0 2.5} die size 222.31 × 222.31 µm chip area 49,422.625 µm² core area 40,930.145 µm² total cell area 26,803.30 µm² cell area with physical-only 31,383.99 µm² core utilisation 65.5 % (cell area over core area) cells 4,872 — 2,559 combinational, 2,313 sequential, 1,061 buffer/inverter hard macros none — the array is built from flip-flops combinational area 7,146.53 µm² noncombinational area 19,656.77 µm² buffer/inverter area 2,891.90 µm² placed instances incl. fill 11,207 nets 4,902 ports 38 cell references 60 modes / corners func mode; corners ss_125c and ff_m40c (two scenarios) setup wns / tns +0.29 ns / 0.00 ns at ff_m40c, +0.81 ns at ss_125c — met at both corners hold wns / tns −0.01 ns / −0.01 ns (2 violating endpoints) critical path rd_addr[3] input port → data_out_reg[5], slack +0.29 ns clock tree (post-cts) 2,056 sinks, 26 levels, 838 repeaters, 30,930 µm of clock wire clock latency / skew 2.57 ns / 1.48 ns at ff_m40c; 2.17 ns / 1.24 ns at ss_125c routing layers m1 – m9 open nets 0 of 4,902 detailed-route drc 0 after route_opt; 26 reported at sign-off, after metal fill lvs m1 shorts reported among shfill3_hvt filler cells; the check stops after 20 total power 8.85 mw — 1.71 mw dynamic, 7.13 mw leakage at the slow 125 °c corner power by group registers 80.5 %, clock network 13.0 %, combinational 6.6 % gds-ii size 7.1 mb run date 21 september 2026"
 },
 {
  "family": "openlane",
  "familyLabel": "OpenLane",
  "tool": "OpenLane (OpenROAD-based RTL-to-GDSII wrapper)",
  "toolLine": "OpenLane drives Yosys, OpenROAD, Magic and KLayout as one push-button flow",
  "pdkKey": "sky130",
  "pdkLabel": "SkyWater SKY130 (OpenLane default)",
  "node": "130 nm",
  "pdkNote": "These runs use the OpenLane default PDK — SkyWater SKY130 with the sky130_fd_sc_hd high-density standard cells. SKY130 is a real, manufacturable open-source 130 nm process; the configurations here do not override the default, so the PDK is implied rather than pinned.",
  "slug": "ol-risc-core",
  "name": "RISC core",
  "blurb": "A RISC processor built from fourteen Verilog modules — ALU, control FSM, datapath, program counter, decoder, register file, hardware stack and a 128 × 16 SRAM — pushed through OpenLane to GDS-II. The power straps and the block outline of the register file are clearly visible in the layout.",
  "head": [
   [
    "Datapath",
    "64-bit"
   ],
   [
    "Instruction",
    "32-bit"
   ],
   [
    "Clock",
    "40 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "130 nm — SkyWater SKY130 (OpenLane default PDK)"
   ],
   [
    "Standard cells",
    "sky130_fd_sc_hd — high density"
   ],
   [
    "Top module",
    "risc_core"
   ],
   [
    "Clock",
    "25 ns period — 40 MHz, port <code>clk</code>"
   ],
   [
    "Instruction width",
    "32 bits"
   ],
   [
    "Datapath width",
    "64 bits (widened from the original 16-bit design)"
   ],
   [
    "Program counter",
    "8-bit"
   ],
   [
    "Status word",
    "11-bit PSW with zero, negative and carry flags"
   ],
   [
    "ALU opcode",
    "6-bit"
   ],
   [
    "Register file",
    "7-bit addressing, three ports (A, B, C), optionally RAM-backed"
   ],
   [
    "Memory",
    "sram128x16 — 128 words × 16 bits"
   ],
   [
    "Stack",
    "Hardware stack with its own FSM and full flag"
   ],
   [
    "DFT ports",
    "scan_en, test_mode"
   ],
   [
    "Source modules",
    "risc_core, alu, control, data_path, instrn_lat, prgrm_cnt, prgrm_cnt_top, prgrm_decode, prgrm_fsm, reg_file, stack_fsm, stack_mem, stack_top, sram128x16"
   ],
   [
    "Output",
    "risc_core.gds, inspected in KLayout"
   ],
   [
    "Run date",
    "February 2026"
   ]
  ],
  "images": [
   {
    "src": "assets/img/ol-risc-core/layout.webp",
    "cap": "Full die — power straps and the register-file block outline"
   },
   {
    "src": "assets/img/ol-risc-core/zoom.webp",
    "cap": "Zoomed into the standard-cell rows and local interconnect"
   }
  ],
  "searchText": "risc core a risc processor built from fourteen verilog modules — alu, control fsm, datapath, program counter, decoder, register file, hardware stack and a 128 × 16 sram — pushed through openlane to gds-ii. the power straps and the block outline of the register file are clearly visible in the layout. openlane (openroad-based rtl-to-gdsii wrapper) skywater sky130 (openlane default) 130 nm technology 130 nm — skywater sky130 (openlane default pdk) standard cells sky130_fd_sc_hd — high density top module risc_core clock 25 ns period — 40 mhz, port <code>clk</code> instruction width 32 bits datapath width 64 bits (widened from the original 16-bit design) program counter 8-bit status word 11-bit psw with zero, negative and carry flags alu opcode 6-bit register file 7-bit addressing, three ports (a, b, c), optionally ram-backed memory sram128x16 — 128 words × 16 bits stack hardware stack with its own fsm and full flag dft ports scan_en, test_mode source modules risc_core, alu, control, data_path, instrn_lat, prgrm_cnt, prgrm_cnt_top, prgrm_decode, prgrm_fsm, reg_file, stack_fsm, stack_mem, stack_top, sram128x16 output risc_core.gds, inspected in klayout run date february 2026"
 },
 {
  "family": "openlane",
  "familyLabel": "OpenLane",
  "tool": "OpenLane (OpenROAD-based RTL-to-GDSII wrapper)",
  "toolLine": "OpenLane drives Yosys, OpenROAD, Magic and KLayout as one push-button flow",
  "pdkKey": "sky130",
  "pdkLabel": "SkyWater SKY130 (OpenLane default)",
  "node": "130 nm",
  "pdkNote": "These runs use the OpenLane default PDK — SkyWater SKY130 with the sky130_fd_sc_hd high-density standard cells. SKY130 is a real, manufacturable open-source 130 nm process; the configurations here do not override the default, so the PDK is implied rather than pinned.",
  "slug": "ol-pm32",
  "name": "32 × 32 signed multiplier",
  "blurb": "A signed 32 × 32 multiplier built on a serial-parallel multiplier core (SPM), modelled on Atmel's AT6000 FPGA application notes. A three-state FSM sequences the shift-and-add iterations and raises <code>done</code> when the 64-bit product is ready.",
  "head": [
   [
    "Operands",
    "32 × 32 signed"
   ],
   [
    "Product",
    "64-bit"
   ],
   [
    "Clock",
    "40 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "130 nm — SkyWater SKY130 (OpenLane default PDK)"
   ],
   [
    "Standard cells",
    "sky130_fd_sc_hd — high density"
   ],
   [
    "Top module",
    "pm32 (instantiates spm)"
   ],
   [
    "Clock",
    "25 ns period — 40 MHz, port <code>clk</code>"
   ],
   [
    "Operands",
    "mc[31:0] × mp[31:0], signed"
   ],
   [
    "Product",
    "p[63:0]"
   ],
   [
    "Handshake",
    "start input, done output"
   ],
   [
    "Architecture",
    "Serial-parallel multiplier (SPM), parameterised SIZE = 32"
   ],
   [
    "Control",
    "Three-state FSM — IDLE, RUNNING, DONE — with an 8-bit iteration counter"
   ],
   [
    "Provenance",
    "SPM core after the Atmel AT6000 application notes DOC0529 / DOC0716, implemented by mshalan@aucegypt.edu (2016)"
   ],
   [
    "Source files",
    "pm32.v, spm.v"
   ],
   [
    "Run date",
    "February 2026"
   ]
  ],
  "images": [
   {
    "src": "assets/img/ol-pm32/layout.webp",
    "cap": "Routed layout in KLayout"
   }
  ],
  "searchText": "32 × 32 signed multiplier a signed 32 × 32 multiplier built on a serial-parallel multiplier core (spm), modelled on atmel's at6000 fpga application notes. a three-state fsm sequences the shift-and-add iterations and raises <code>done</code> when the 64-bit product is ready. openlane (openroad-based rtl-to-gdsii wrapper) skywater sky130 (openlane default) 130 nm technology 130 nm — skywater sky130 (openlane default pdk) standard cells sky130_fd_sc_hd — high density top module pm32 (instantiates spm) clock 25 ns period — 40 mhz, port <code>clk</code> operands mc[31:0] × mp[31:0], signed product p[63:0] handshake start input, done output architecture serial-parallel multiplier (spm), parameterised size = 32 control three-state fsm — idle, running, done — with an 8-bit iteration counter provenance spm core after the atmel at6000 application notes doc0529 / doc0716, implemented by mshalan@aucegypt.edu (2016) source files pm32.v, spm.v run date february 2026"
 },
 {
  "family": "openlane",
  "familyLabel": "OpenLane",
  "tool": "OpenLane (OpenROAD-based RTL-to-GDSII wrapper)",
  "toolLine": "OpenLane drives Yosys, OpenROAD, Magic and KLayout as one push-button flow",
  "pdkKey": "sky130",
  "pdkLabel": "SkyWater SKY130 (OpenLane default)",
  "node": "130 nm",
  "pdkNote": "These runs use the OpenLane default PDK — SkyWater SKY130 with the sky130_fd_sc_hd high-density standard cells. SKY130 is a real, manufacturable open-source 130 nm process; the configurations here do not override the default, so the PDK is implied rather than pinned.",
  "slug": "ol-cnn-3x3",
  "name": "CNN layer — 3 × 3 convolution",
  "blurb": "One complete convolutional-neural-network layer in hardware: a 3 × 3 convolution with a hard-coded Sobel-style kernel, followed by ReLU activation and 2 × 2 max pooling. Line buffers hold two image rows so a sliding 3 × 3 window can stream over the input one pixel per cycle.",
  "head": [
   [
    "Pipeline",
    "Conv→ReLU→Pool"
   ],
   [
    "Data",
    "8-bit fixed"
   ],
   [
    "Clock",
    "40 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "130 nm — SkyWater SKY130 (OpenLane default PDK)"
   ],
   [
    "Standard cells",
    "sky130_fd_sc_hd — high density"
   ],
   [
    "Top module",
    "cnn_layer"
   ],
   [
    "Clock",
    "25 ns period — 40 MHz, port <code>clk</code>"
   ],
   [
    "Data width",
    "8-bit fixed point (DATA_WIDTH = 8)"
   ],
   [
    "Image width",
    "8 pixels (IMG_WIDTH = 8, parameterised)"
   ],
   [
    "Stage 1",
    "3 × 3 convolution with two line buffers and a sliding-window register array"
   ],
   [
    "Kernel",
    "Hard-coded [[1,0,−1],[2,0,−2],[1,0,−1]] — a Sobel vertical-edge operator"
   ],
   [
    "MAC accumulator",
    "2·DATA_WIDTH + 4 bits, signed"
   ],
   [
    "Stage 2",
    "ReLU activation"
   ],
   [
    "Stage 3",
    "2 × 2 max pooling"
   ],
   [
    "Interface",
    "pixel_in / valid_in streaming in, pool_out / valid_out streaming out"
   ],
   [
    "Reset",
    "Active-low asynchronous (rst_n)"
   ],
   [
    "Variants",
    "Two configurations were run: one_cnn_layer3x3.v (shown) and a second one_cnn_layer.v build with no layout captured"
   ],
   [
    "Run date",
    "February 2026"
   ]
  ],
  "images": [
   {
    "src": "assets/img/ol-cnn-3x3/layout.webp",
    "cap": "Routed layout in KLayout"
   }
  ],
  "searchText": "cnn layer — 3 × 3 convolution one complete convolutional-neural-network layer in hardware: a 3 × 3 convolution with a hard-coded sobel-style kernel, followed by relu activation and 2 × 2 max pooling. line buffers hold two image rows so a sliding 3 × 3 window can stream over the input one pixel per cycle. openlane (openroad-based rtl-to-gdsii wrapper) skywater sky130 (openlane default) 130 nm technology 130 nm — skywater sky130 (openlane default pdk) standard cells sky130_fd_sc_hd — high density top module cnn_layer clock 25 ns period — 40 mhz, port <code>clk</code> data width 8-bit fixed point (data_width = 8) image width 8 pixels (img_width = 8, parameterised) stage 1 3 × 3 convolution with two line buffers and a sliding-window register array kernel hard-coded [[1,0,−1],[2,0,−2],[1,0,−1]] — a sobel vertical-edge operator mac accumulator 2·data_width + 4 bits, signed stage 2 relu activation stage 3 2 × 2 max pooling interface pixel_in / valid_in streaming in, pool_out / valid_out streaming out reset active-low asynchronous (rst_n) variants two configurations were run: one_cnn_layer3x3.v (shown) and a second one_cnn_layer.v build with no layout captured run date february 2026"
 },
 {
  "family": "openlane",
  "familyLabel": "OpenLane",
  "tool": "OpenLane (OpenROAD-based RTL-to-GDSII wrapper)",
  "toolLine": "OpenLane drives Yosys, OpenROAD, Magic and KLayout as one push-button flow",
  "pdkKey": "sky130",
  "pdkLabel": "SkyWater SKY130 (OpenLane default)",
  "node": "130 nm",
  "pdkNote": "These runs use the OpenLane default PDK — SkyWater SKY130 with the sky130_fd_sc_hd high-density standard cells. SKY130 is a real, manufacturable open-source 130 nm process; the configurations here do not override the default, so the PDK is implied rather than pinned.",
  "slug": "ol-riscv-alu",
  "name": "RISC-V 32-bit ALU",
  "blurb": "A single-cycle 32-bit arithmetic-logic unit covering the RV32I integer operations — add, subtract, the three shifts, signed and unsigned set-less-than, and the bitwise logic — with zero, overflow and carry-out flags. The layout shows a dense cell array with the 64 operand and result pins fanning out to the die edge.",
  "head": [
   [
    "Width",
    "32-bit"
   ],
   [
    "Operations",
    "10"
   ],
   [
    "Clock",
    "40 MHz"
   ]
  ],
  "specs": [
   [
    "Technology",
    "130 nm — SkyWater SKY130 (OpenLane default PDK)"
   ],
   [
    "Standard cells",
    "sky130_fd_sc_hd — high density"
   ],
   [
    "Top module",
    "riscv_alu_32bit"
   ],
   [
    "Clock",
    "25 ns period — 40 MHz, port <code>clk</code>"
   ],
   [
    "Operand width",
    "32 bits — operand_a, operand_b"
   ],
   [
    "Result width",
    "32 bits"
   ],
   [
    "Opcode",
    "4-bit alu_op, encoded from the RISC-V funct3 / funct7 fields"
   ],
   [
    "Operations",
    "ADD, SUB, SLL, SLT, SLTU, XOR, SRL, SRA, OR, AND"
   ],
   [
    "Flags",
    "zero, overflow (signed), carry_out"
   ],
   [
    "Arithmetic",
    "33-bit internal add and subtract paths for carry and borrow capture"
   ],
   [
    "Overflow detection",
    "Sign-comparison logic on the operands and the result"
   ],
   [
    "Output",
    "riscv_alu_32bit.gds, inspected in KLayout"
   ],
   [
    "Run date",
    "February 2026"
   ]
  ],
  "images": [
   {
    "src": "assets/img/ol-riscv-alu/layout.webp",
    "cap": "Routed layout with the pin ring fanning out to the die edge"
   }
  ],
  "searchText": "risc-v 32-bit alu a single-cycle 32-bit arithmetic-logic unit covering the rv32i integer operations — add, subtract, the three shifts, signed and unsigned set-less-than, and the bitwise logic — with zero, overflow and carry-out flags. the layout shows a dense cell array with the 64 operand and result pins fanning out to the die edge. openlane (openroad-based rtl-to-gdsii wrapper) skywater sky130 (openlane default) 130 nm technology 130 nm — skywater sky130 (openlane default pdk) standard cells sky130_fd_sc_hd — high density top module riscv_alu_32bit clock 25 ns period — 40 mhz, port <code>clk</code> operand width 32 bits — operand_a, operand_b result width 32 bits opcode 4-bit alu_op, encoded from the risc-v funct3 / funct7 fields operations add, sub, sll, slt, sltu, xor, srl, sra, or, and flags zero, overflow (signed), carry_out arithmetic 33-bit internal add and subtract paths for carry and borrow capture overflow detection sign-comparison logic on the operands and the result output riscv_alu_32bit.gds, inspected in klayout run date february 2026"
 }
];
